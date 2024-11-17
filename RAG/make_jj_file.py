import csv
import json

# Load the existing JSON data
with open('john_brown_data.json', 'r') as json_file:
    data = json.load(json_file)

# Read the CSV file
with open('transactions.csv', 'r') as csv_file:
    csv_reader = csv.reader(csv_file)
    next(csv_reader)  # Skip the header row
    transactions = []
    for row in csv_reader:
        date, description, amount, category, source = row
        transactions.append({
            "date": date,
            "description": description,
            "amount": float(amount)
        })

# Append transactions to the appropriate account
for transaction in transactions:
    # Assuming all transactions go to the checking account for simplicity
    for account in data['accounts']:
        if account['type'] == 'checking':
            account['transactions'].append(transaction)

# Save the updated JSON data back to the file
with open('john_brown_data.json', 'w') as json_file:
    json.dump(data, json_file, indent=2)