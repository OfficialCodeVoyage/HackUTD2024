// services/gpt-service.js

require('colors');
const EventEmitter = require('events');
const OpenAI = require('openai');
const tools = require('../functions/function-manifest');
const { fetchExpenseData } = require('./rag-service'); // Import fetchExpenseData function

const openai = new OpenAI();
openai.apiKey = process.env.OPENAI_API_KEY;

class GptService extends EventEmitter {
    constructor() { // Defines the goals of the GPT-3 Model
        super();
        this.userContext = [
            { role: 'system', content: 'You are a banking assistant who can help with customer expenses and transactions.' },
            { role: 'assistant', content: 'Hello! How can I help you today?' },
        ];
        this.partialResponseIndex = 0;
    }

    /*
    This file defines the things that should happen when the user interact with the assistant.

    Implementing RAG responses:
    TODO: Retrieve additional user data through the embedding matrix 
    TODO: Augment the prompt with the data retrieved
    TODO: Use the augmented prompt to generate a response
    */

    /** ALWAYS PULL DATA FROM THE EMBEDDED MATRIX
     * @param {string} text - The user input text.
     * @returns {boolean} - True if the query is related to expenses.
     */
    shouldUseRag(text) { //YES you should
        const expenseKeywords = ["expenses", "spending", "transactions", "total spent", "expenditure", "cost", "money", "spent", "last week"];
        return expenseKeywords.some(keyword => text.toLowerCase().includes(keyword));
    }

    /**
     * Processes the user's input, and if expense-related, uses fetchExpenseData to get a response.
     * @param {string} text - The user's input text.
     * @param {number} interactionCount - Counter for the interaction.
     * @param {string} role - The role of the user or assistant.
     * @param {string} name - The name of the user or assistant.
     */
    async completion(text, interactionCount, role = 'user', name = 'user') {
      this.updateUserContext(name, role, text);
  
      // Force RAG to be triggered for every query temporarily for testing
      console.log("RAG Force-Triggered for query:", text);
  
      try {
          // Use fetchExpenseData to handle the RAG workflow
          const ragResponse = await fetchExpenseData(text);
          console.log("RAG Response Retrieved:", ragResponse);
  
          this.updateUserContext("RAG", "function", ragResponse);
          await this.completion(ragResponse, interactionCount, "function", "RAG");
          return;
      } catch (error) {
          console.error("Error during RAG process:", error);
      }
  
      // (Commented out regular response processing for testing)
      // const stream = await openai.chat.completions.create({
      //     model: 'gpt-4-1106-preview',
      //     messages: this.userContext,
      //     tools: tools,
      //     stream: true,
      // });
  
      // Regular response handling...
  }

    updateUserContext(name, role, text) {
        this.userContext.push({ role, name, content: text });
    }
}

module.exports = { GptService };
