"""
Utility function for embedding using the OpenAI API.
"""
import openai
import json
from chromadb.api.types import EmbeddingFunction, Documents, Embeddings

# Load OpenAI API key from a secure source (credentials.json)
def load_openai_api_key():
    with open("credentials.json", "r") as file:
        credentials = json.load(file)
        openai.api_key = credentials["openai_api"]["api_key"]

class OpenAIEmbeddingFunction(EmbeddingFunction):
    """
    Custom embedding function that complies with the updated ChromaDB EmbeddingFunction interface.
    """
    def __init__(self, model_name: str = "text-embedding-ada-002"):
        self.model_name = model_name
        load_openai_api_key()

    def __call__(self, input: Documents) -> Embeddings:
        response = openai.Embedding.create(
            input=input,
            model=self.model_name
        )
        embeddings = [item['embedding'] for item in response['data']]
        return embeddings
