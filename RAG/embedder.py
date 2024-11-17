"""
Embeds documents from CSV files into a VectorDB using the OpenAI API
"""
import os
import pandas as pd
import openai
import chromadb
from chromadb.api.types import EmbeddingFunction, Documents, Embeddings

# Set your OpenAI API key
openai.api_key = "###"

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
    # Initialize the ChromaDB client
    client = chromadb.PersistentClient(path="./chromadb/test_db")

    # Create or get the collection
    collection_name = "transactions_collection"

    # Check if the collection exists before deleting
    if collection_name in [col.name for col in client.list_collections()]:
        print(f"Deleting existing collection: {collection_name}")
        client.delete_collection(collection_name)
    else:
        print(f"Collection {collection_name} does not exist. Proceeding to create a new one.")

    collection = client.create_collection(
        name=collection_name,
        embedding_function=OpenAIEmbeddingFunction()
    )

    # Process the CSV file
    csv_file = 'transactions.csv'
    print(f"Processing file: {csv_file}")
    try:
        df = pd.read_csv(csv_file)
    except FileNotFoundError:
        print(f"Error: File '{csv_file}' not found.")
        return
    except pd.errors.EmptyDataError:
        print(f"Error: File '{csv_file}' is empty.")
        return

    total_rows = len(df)
    print(f"Found {total_rows} rows in {csv_file}")

    # Embed and add data to the collection
    for idx, row in df.iterrows():
        document_id = f"{csv_file}_{idx}"
        document_text = f"{row['Description']} {row['Amount']} {row['Category']}"
        collection.add(
            documents=[document_text],
            metadatas=[{
                "Date": row['Date'],
                "Description": row['Description'],
                "Amount": float(row['Amount']),
                "Category": row['Category'],
                "Source": row['Source']
            }],
            ids=[document_id]
        )
        if (idx + 1) % 100 == 0 or (idx + 1) == total_rows:
            print(f"Processed {idx + 1}/{total_rows} rows")

    # Display sample documents
    print("Sample documents from the collection:")
    print(collection.peek())

if __name__ == "__main__":
    main()