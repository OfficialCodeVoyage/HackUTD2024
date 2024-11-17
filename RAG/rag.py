"""
Build and querying the RAG model using consistent embeddings.
"""
import openai
import chromadb
import json
from utils import OpenAIEmbeddingFunction

# Load OpenAI API key from credentials.json
def load_openai_api_key():
    with open("credentials.json", "r") as file:
        credentials = json.load(file)
        openai.api_key = credentials["openai_api"]["api_key"]

def rag_response(query, context):
    """
    Generate a response using GPT-3.5-turbo and the retrieved context.
    """
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant. Answer using the provided context."},
            {"role": "user", "content": f"Query: {query}. Context: {context}"}
        ]
    )
    return response['choices'][0]['message']['content']

def get_rag_context(query, client, num_docs=3):
    """
    Retrieve relevant context from the vector database for the given query.
    """
    # Use the existing collection with the corrected embedding function
    collection = client.get_collection(
        name="transactions_collection",
        embedding_function=OpenAIEmbeddingFunction()
    )

    # Embed the query using OpenAI's text-embedding-ada-002
    embedding_function = OpenAIEmbeddingFunction()
    query_embedding = embedding_function([query])[0]

    # Query the collection
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=num_docs
    )
    # Combine and clean up retrieved contexts
    contexts = [doc.replace("\n", " ") for doc in results['documents'][0]]
    return contexts

def main():
    # Load the OpenAI API key
    load_openai_api_key()

    # Initialize the ChromaDB client
    client = chromadb.PersistentClient(path="./chromadb/test_db")

    # Example queries
    queries = [
        "Total spending on groceries in the last month",
    ]

    for query in queries:
        # Retrieve contexts from the vector database
        contexts = get_rag_context(query, client)
        # Generate a RAG-based response using retrieved contexts
        ragged_response = rag_response(query, "; ".join(contexts))

        print(f"Query: {query}")
        print(f"RAG response: {ragged_response}")
        print("\n")

if __name__ == "__main__":
    main()
