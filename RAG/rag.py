"""
Build and query the RAG model using consistent embeddings.
"""
import openai
import chromadb
from utils import OpenAIEmbeddingFunction
import json

def load_openai_api_key():
    with open("credentials.json", "r") as file:
        credentials = json.load(file)
        openai.api_key = credentials["openai_api"]["api_key"]

def get_rag_context(query, client, num_docs=3):
    """
    Retrieve relevant context from the vector database for the given query.
    """
    collection = client.get_collection(
        name="transactions_collection",
        embedding_function=OpenAIEmbeddingFunction(model_name="text-embedding-ada-002")
    )
    embedding_function = OpenAIEmbeddingFunction(model_name="text-embedding-ada-002")
    query_embedding = embedding_function([query])[0]

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=num_docs
    )
    return [doc.replace("\n", " ") for doc in results['documents'][0]]

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

def main():
    load_openai_api_key()
    client = chromadb.PersistentClient(path="./chromadb/test_db")

    queries = [
        "largest spending category",
        "total spending for food",
    ]

    for query in queries:
        contexts = get_rag_context(query, client)
        response = rag_response(query, "; ".join(contexts))
        print(f"Query: {query}")
        print(f"RAG response: {response}\n")

if __name__ == "__main__":
    main()
