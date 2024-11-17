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
    // Define the embeddings directory and file path
    this.embeddingsDir = path.join(__dirname, '..', 'embeddings');
    this.embeddingsFilePath = path.join(this.embeddingsDir, 'embeddings.json');
    this.embeddingsData = this.loadEmbeddings();
    this.openai = openai;
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

  async updateUserData(documents) {
    // documents: Array of { id, document, metadata }
    for (const doc of documents) {
      // Generate embedding for the document
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: doc.document,
      });
      const embedding = response.data[0].embedding;

      // Check if the document already exists
      const existingIndex = this.embeddingsData.findIndex(
        (item) => item.id === doc.id
      );

      const embeddingEntry = {
        id: doc.id,
        document: doc.document,
        metadata: doc.metadata,
        embedding: embedding,
      };

      if (existingIndex !== -1) {
        // Update existing entry
        this.embeddingsData[existingIndex] = embeddingEntry;
      } else {
        // Add new entry
        this.embeddingsData.push(embeddingEntry);
      }
    }

    // Save embeddings to file
    this.saveEmbeddings();

    // Emit an event indicating that embeddings have been updated
    this.emit('embeddingsUpdated', { documents });

    // Output the mappings
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
    // Generate embedding for the query text
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: queryText,
    });
    const queryEmbedding = response.data[0].embedding;

    // Compute similarity scores
    const similarities = this.embeddingsData.map((item) => {
      const similarity = this.cosineSimilarity(queryEmbedding, item.embedding);
      return { ...item, similarity };
    });

    // Sort by similarity score in descending order
    similarities.sort((a, b) => b.similarity - a.similarity);

    // Return the top K most similar documents
    const topDocuments = similarities.slice(0, topK);

    // Emit an event with the retrieved documents
    this.emit('documentsRetrieved', { queryText, topDocuments });

    return topDocuments;
  }
}

module.exports = EmbeddingService;
