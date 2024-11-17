require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

console.log('OpenAI Exports:', require('openai'));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

(async () => {
  try {
    const response = await openai.listModels();
    console.log('List of Models:', response.data);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
  }
})();