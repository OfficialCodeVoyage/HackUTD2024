// test_chat.js

require('dotenv').config();
require('colors');

const readline = require('readline');
const { createService } = require('./serviceFactory'); // Use the service factory
const { vectorizeAllData } = require('./utils/data-vectorization');

const SERVICE_TYPE = process.env.SERVICE_TYPE || 'GptService';
const gptService = createService(SERVICE_TYPE);

let interactionCount = 0;

if (SERVICE_TYPE === 'RagService') {
  (async () => {
    await vectorizeAllData(gptService.embeddingService);
  })();
}

// Set up readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('You can start chatting with the assistant. Type "exit" to quit.');

const promptUser = () => {
  rl.question('You: ', async (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    console.log(`Interaction ${interactionCount} – You: ${input}`.yellow);

    // Handle the assistant's response
    gptService.once('gptreply', async (gptReply, icount) => {
      console.log(`Assistant: ${gptReply.partialResponse}`.green);
      interactionCount += 1;
      promptUser();
    });

    // Send input to the assistant
    await gptService.completion(input, interactionCount);
  });
};

promptUser();
