// utils/data-vectorization.js

const fs = require('fs');
const path = require('path');

async function vectorizeAllData(embeddingService) {
  const dataDir = path.join(__dirname, '..', 'data');
  const files = fs.readdirSync(dataDir);

  const userDocuments = [];

  files.forEach((file) => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(dataDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      // Process accounts
      if (data.accounts) {
        data.accounts.forEach((account) => {
          const accountInfo = `Account Type: ${account.type}\nAccount Number: ${account.accountNumber}\nOpen Date: ${account.openDate}`;
          const transactions = account.transactions
            .map((tx) => `Date: ${tx.date}, Description: ${tx.description}, Amount: ${tx.amount}`)
            .join('\n');
          const documentContent = `${accountInfo}\nTransactions:\n${transactions}`;
          userDocuments.push({
            id: `account_${account.accountNumber}`,
            document: documentContent,
            metadata: { type: 'account', accountType: account.type, userId: data.id }
          });
        });
      }

      // Process credit cards
      if (data.creditCards) {
        data.creditCards.forEach((card) => {
          const cardInfo = `Credit Card Number: ${card.cardNumber}\nOpen Date: ${card.openDate}\nBalance: ${card.balance}`;
          const transactions = card.transactions
            .map((tx) => `Date: ${tx.date}, Description: ${tx.description}, Amount: ${tx.amount}`)
            .join('\n');
          const documentContent = `${cardInfo}\nTransactions:\n${transactions}`;
          userDocuments.push({
            id: `card_${card.cardNumber}`,
            document: documentContent,
            metadata: { type: 'creditCard', userId: data.id }
          });
        });
      }

      // Process other data types as needed
    }
  });

  // Update embeddings using the provided embeddingService
  await embeddingService.updateUserData(userDocuments);
}

module.exports = { vectorizeAllData };
