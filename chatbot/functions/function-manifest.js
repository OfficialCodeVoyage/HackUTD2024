// function-manifest.js

// create metadata for all the available functions to pass to completions API
const tools = [
  {
    type: 'function',
    function: {
      name: 'openCreditCard',
      say: 'To open a credit card account, we need to collect some information from you. Let\'s get started.',
      description: 'Opens a credit card account for the customer.',
      parameters: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            description: 'The first name of the customer',
          },
          lastName: {
            type: 'string',
            description: 'The last name of the customer',
          },
          annualIncome: {
            type: 'integer',
            description: 'The annual income of the customer',
          },
          zipCode: {
            type: 'string',
            description: 'The zip code of the customer',
          },
        },
        required: ['firstName', 'lastName', 'annualIncome', 'zipCode'],
      },
      returns: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Whether or not the credit card account was successfully opened'
          }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'transferCall',
      say: 'One moment while I transfer your call.',
      description: 'Transfers the customer to a live agent in case they request help from a real person.',
      parameters: {
        type: 'object',
        properties: {
          callSid: {
            type: 'string',
            description: 'The unique identifier for the active phone call.',
          },
        },
        required: ['callSid'],
      },
      returns: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Whether or not the customer call was successfully transferred'
          },
        }
      }
    },
  },
];

module.exports = tools;
