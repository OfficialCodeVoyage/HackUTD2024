// services/embedding-service.js
require('dotenv').config();

const EventEmitter = require('events');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class EmbeddingService extends EventEmitter {
  constructor() {
    super();
    this.embeddingsDir = path.join(__dirname, '..', 'embeddings');
    this.embeddingsFilePath = path.join(this.embeddingsDir, 'embeddings.json');
    this.embeddingsData = this.loadEmbeddings();
    this.openai = openai;
    this.MAX_TOKENS = 7000;  // Model's token limit
  }

  ensureEmbeddingsDirExists() {
    if (!fs.existsSync(this.embeddingsDir)) {
      fs.mkdirSync(this.embeddingsDir, { recursive: true });
    }
  }

  loadEmbeddings() {
    this.ensureEmbeddingsDirExists();
    if (fs.existsSync(this.embeddingsFilePath)) {
      const data = fs.readFileSync(this.embeddingsFilePath, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  }

  saveEmbeddings() {
    this.ensureEmbeddingsDirExists();
    fs.writeFileSync(
      this.embeddingsFilePath,
      JSON.stringify(this.embeddingsData, null, 2)
    );
  }

  estimateTokens(text) {
    return text.split(' ').length;
  }

  chunkDocuments(documents, maxTokens) {
    const chunks = [];
    let currentChunk = [];
    let currentTokens = 0;

    for (const doc of documents) {
        const docTokens = this.estimateTokens(doc.document);

        // If a single document exceeds the max token limit, log and handle it separately
        if (docTokens > maxTokens) {
            console.warn(`Document ${doc.id} exceeds max token limit by itself (${docTokens} tokens).`);
            // Handle oversized single document (e.g., further split document if feasible)
            continue; // Skipping oversized documents for now
        }

        // If adding this document would exceed the max token limit, start a new chunk
        if (currentTokens + docTokens > maxTokens) {
            console.log(`Creating new chunk with ${currentTokens} tokens.`);
            chunks.push(currentChunk);
            currentChunk = [];
            currentTokens = 0;
        }

        currentChunk.push(doc);
        currentTokens += docTokens;
    }

    if (currentChunk.length > 0) {
        console.log(`Final chunk created with ${currentTokens} tokens.`);
        chunks.push(currentChunk);
    }

    return chunks;
}

  async updateUserData(documents) {
    const documentChunks = this.chunkDocuments(documents, this.MAX_TOKENS - 500); // Buffer to avoid token overflow

    for (const chunk of documentChunks) {
      const combinedInput = chunk.map(doc => doc.document).join(' ');

      if (this.estimateTokens(combinedInput) > this.MAX_TOKENS) {
        console.error('Chunk still exceeds token limit after chunking.');
        continue;
      }

      try {
        const response = await this.openai.embeddings.create({
          model: 'text-embedding-ada-002',
          input: combinedInput,
        });

        const embeddings = response.data.map(res => res.embedding);

        chunk.forEach((doc, index) => {
          const existingIndex = this.embeddingsData.findIndex(item => item.id === doc.id);
          const embeddingEntry = {
            id: doc.id,
            document: doc.document,
            metadata: doc.metadata,
            embedding: embeddings[index],
          };

          if (existingIndex !== -1) {
            this.embeddingsData[existingIndex] = embeddingEntry;
          } else {
            this.embeddingsData.push(embeddingEntry);
          }
        });

      } catch (error) {
        console.error('Error creating embedding:', error);
      }
    }

    this.saveEmbeddings();
    this.emit('embeddingsUpdated', { documents });
    console.log('Embeddings updated and saved.');
    console.log('Current Embeddings:', this.embeddingsData);
  }

  cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  }

  async retrieveRelevantDocuments(queryText, topK = 5) {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: queryText,
    });
    const queryEmbedding = response.data[0].embedding;

    const similarities = this.embeddingsData.map((item) => {
      const similarity = this.cosineSimilarity(queryEmbedding, item.embedding);
      return { ...item, similarity };
    });

    similarities.sort((a, b) => b.similarity - a.similarity);
    const topDocuments = similarities.slice(0, topK);

    this.emit('documentsRetrieved', { queryText, topDocuments });

    return topDocuments;
  }
}

module.exports = EmbeddingService;
