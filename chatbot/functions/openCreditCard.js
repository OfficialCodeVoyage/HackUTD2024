async function openCreditCard(functionArgs) {
  let firstName = functionArgs.firstName;
  let lastName = functionArgs.lastName;
  let annualIncome = functionArgs.annualIncome;
  let zipCode = functionArgs.zipCode;
  console.log('GPT -> called openCreditCard function');
    return JSON.stringify({ success: true });
}

module.exports = openCreditCard;