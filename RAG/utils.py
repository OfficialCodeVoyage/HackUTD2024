# backend/utils.py

import openai
from chromadb.api.types import EmbeddingFunction

class OpenAIEmbeddingFunction(EmbeddingFunction):
    """
    Custom embedding function that complies with ChromaDB requirements.
    """
    def __init__(self, model_name: str = "text-embedding-ada-002"):
        self.model_name = model_name

    def __call__(self, input):
        response = openai.Embedding.create(
            input=input,
            model=self.model_name
        )
        return [item["embedding"] for item in response["data"]]
