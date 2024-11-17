// services/rag-service.js

require('colors');
const EventEmitter = require('events');
const OpenAI = require('openai'); // Import OpenAI directly
const tools = require('../functions/function-manifest');
const EmbeddingService = require('./embedding-service');
require('dotenv').config(); // Load environment variables

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize available functions
const availableFunctions = {};
tools.forEach((tool) => {
  let functionName = tool.function.name;
  availableFunctions[functionName] = require(`../functions/${functionName}`);
});

class RagService extends EventEmitter {
  constructor() {
    super();
    this.userContext = [
      { role: 'system', content: 'You are a banking assistant who is helping a man named john_brown.You have a youthful and cheery personality. Keep your responses as brief as possible but make every attempt to keep the caller on the phone without being rude. Don\'t ask more than 1 question at a time. Don\'t make assumptions about what values to plug into functions. Ask for clarification if a user request is ambiguous. Speak out all prices to include the currency. Please help them decide between the airpods, airpods pro and airpods max by asking questions like \'Do you prefer headphones that go in your ear or over the ear?\'. If they are trying to choose between the airpods and airpods pro try asking them if they need noise canceling. Once you know which model they would like ask them how many they would like to purchase and try to get them to place an order. You must add a \'•\' symbol every 5 to 10 words at natural pauses where your response can be split for text to speech. Do not use emojis.' },
      { role: 'assistant', content: 'Hello! How can I help you today?' },
    ];
    this.partialResponseIndex = 0;

    // Initialize EmbeddingService
    this.embeddingService = new EmbeddingService();

    // Assign OpenAI instance
    this.openai = openai;

    // Listen for embeddings update events if needed
    this.embeddingService.on('embeddingsUpdated', ({ documents }) => {
      console.log('Embeddings updated for documents:', documents.map((doc) => doc.id));
    });
  }

  setCallSid(callSid) {
    this.userContext.push({ role: 'system', content: `callSid: ${callSid}` });
  }

  validateFunctionArgs(args) {
    try {
      return JSON.parse(args);
    } catch (error) {
      console.log('Warning: Invalid function arguments:', args);
      return {};
    }
  }

  updateUserContext(name, role, text) {
    if (name !== 'user') {
      this.userContext.push({ role, name, content: text });
    } else {
      this.userContext.push({ role, content: text });
    }
  }

  async completion(text, interactionCount, role = 'user', name = 'user') {
    // Update user context with the user's input
    this.updateUserContext(name, role, text);

    // Retrieve relevant documents from EmbeddingService
    const retrievedDocuments = await this.embeddingService.retrieveRelevantDocuments(text);

    // Prepare the context to include in the prompt
    const context = retrievedDocuments.map((doc) => doc.document).join('\n');

    // Augment the user context with the retrieved documents
    if (context) {
      this.userContext.push({
        role: 'system',
        content: `The following information might be helpful:\n${context}`,
      });
    }

    // Call the OpenAI API with the augmented context
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: this.userContext,
        functions: tools.map((tool) => tool.function),
        function_call: 'auto',
      });

      const assistantMessage = response.choices[0].message;

      // Handle function calls or regular messages
      if (assistantMessage.function_call) {
        // Handle function call
        await this.handleFunctionCall(assistantMessage, interactionCount);
      } else {
        // Add assistant's response to user context
        this.userContext.push({ role: 'assistant', content: assistantMessage.content });

        // Emit the assistant's reply
        this.emit(
          'gptreply',
          {
            partialResponseIndex: this.partialResponseIndex,
            partialResponse: assistantMessage.content.trim(),
          },
          interactionCount
        );

        this.partialResponseIndex++;
      }
    } catch (error) {
      console.error('Error during OpenAI API call:', error);
    }
  }

  async handleFunctionCall(assistantMessage, interactionCount) {
    const functionName = assistantMessage.function_call.name;
    const functionArgs = assistantMessage.function_call.arguments;

    const functionToCall = availableFunctions[functionName];
    const validatedArgs = this.validateFunctionArgs(functionArgs);

    // Say a pre-configured message from the function manifest before running the function.
    const toolData = tools.find((tool) => tool.function.name === functionName);
    const say = toolData.function.say;

    this.emit(
      'gptreply',
      {
        partialResponseIndex: null,
        partialResponse: say,
      },
      interactionCount
    );

    let functionResponse = await functionToCall(validatedArgs);

    // Update user context with the function's response
    this.updateUserContext(functionName, 'function', functionResponse);

    // Recurse into the completion method with the function's response
    await this.completion(functionResponse, interactionCount, 'function', functionName);
  }
}

module.exports = { RagService };
