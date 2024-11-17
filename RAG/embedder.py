import os
import pandas as pd
import openai
import chromadb
from chromadb.api.types import EmbeddingFunction, Documents, Embeddings
import json

def load_openai_api_key():
    with open("credentials.json", "r") as file:
        credentials = json.load(file)
        openai.api_key = credentials["openai_api"]["api_key"]

class OpenAIEmbeddingFunction(EmbeddingFunction):
    def __init__(self, model_name: str = "text-embedding-ada-002"):
        self.model_name = model_name

    def __call__(self, input: Documents) -> Embeddings:
        response = openai.Embedding.create(
            input=input,
            model=self.model_name
        )
        embeddings = [item['embedding'] for item in response['data']]
        return embeddings

def main():
    # Load the OpenAI API key
    load_openai_api_key()

    # Initialize the ChromaDB client
    client = chromadb.PersistentClient(path="./chromadb/test_db")

    # Create or get the collection
    collection_name = "transactions_collection"
    if collection_name in [col.name for col in client.list_collections()]:
        collection = client.get_collection(name=collection_name)
    else:
        collection = client.create_collection(
            name=collection_name,
            embedding_function=OpenAIEmbeddingFunction()
        )

    # List of CSV files to process
    csv_files = ['amex.csv', 'discover.csv']

    # Process each CSV file
    for csv_file in csv_files:
        # Read the CSV file into a DataFrame
        try:
            df = pd.read_csv(csv_file)
        except FileNotFoundError:
            print(f"Error: File '{csv_file}' not found.")
            continue
        except pd.errors.EmptyDataError:
            print(f"Error: File '{csv_file}' is empty.")
            continue
        except Exception as e:
            print(f"An error occurred while reading '{csv_file}': {e}")
            continue

        # Ensure the DataFrame has the required columns
        required_columns = {'Date', 'Description', 'Amount', 'Category', 'Source'}
        if not required_columns.issubset(df.columns):
            print(f"Error: Missing required columns in {csv_file}")
            continue

        # Iterate over each row in the DataFrame
        for idx, row in df.iterrows():
            document_id = f"{csv_file}_{idx}"
            # Concatenate relevant fields to form the text for embedding
            document_text = f"{row['Description']} {row['Amount']} {row['Category']}"

            # Add the document to the collection with valid metadata
            collection.add(
                documents=[document_text],
                metadatas=[{
                    "Date": row['Date'],  # Ensure metadata values are valid types
                    "Description": row['Description'],
                    "Amount": float(row['Amount']),
                    "Category": row['Category'],
                    "Source": row['Source']
                }],
                ids=[document_id]
            )

    # Display the first few documents in the collection
    print("Sample documents from the collection:")
    print(collection.peek())

if __name__ == "__main__":
    main()