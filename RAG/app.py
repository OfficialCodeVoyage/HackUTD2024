# backend/app.py

import json
import openai
import chromadb
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from utils import OpenAIEmbeddingFunction
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# =========================
# CORS Configuration
# =========================

# List of allowed origins; adjust if your frontend runs on a different host or port
origins = [
    "http://localhost:3000",  # Example: React frontend
    "http://localhost:8000",  # If frontend runs on port 8000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allows requests from these origins
    allow_credentials=True,
    allow_methods=["*"],              # Allows all HTTP methods
    allow_headers=["*"],              # Allows all headers
)

# =========================
# Load OpenAI API Key
# =========================

def load_openai_api_key():
    try:
        with open("credentials.json", "r") as file:
            credentials = json.load(file)
            openai.api_key = credentials["openai_api"]["api_key"]
    except Exception as e:
        print("Error loading OpenAI API key:", e)
        raise e

load_openai_api_key()

# =========================
# Initialize ChromaDB Client
# =========================

client = chromadb.PersistentClient(path="./chromadb/test_db")
collection = client.get_or_create_collection(
    name="transactions_collection",
    embedding_function=OpenAIEmbeddingFunction(model_name="text-embedding-ada-002")
)

# =========================
# Pydantic Models
# =========================

class EmbedRequest(BaseModel):
    text: str

class EmbedResponse(BaseModel):
    embedding: List[float]

class QueryRequest(BaseModel):
    embedding: List[float]
    n_results: int = 3

class QueryResponse(BaseModel):
    results: List[str]

class RagResponseRequest(BaseModel):
    text: str

class RagResponseResponse(BaseModel):
    response: str

# =========================
# API Endpoints
# =========================

@app.post("/embed", response_model=EmbedResponse)
def embed_text(request: EmbedRequest):
    """
    Endpoint to get embedding for a given text.
    """
    try:
        embedding_function = OpenAIEmbeddingFunction(model_name="text-embedding-ada-002")
        embedding = embedding_function([request.text])[0]
        return EmbedResponse(embedding=embedding)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query", response_model=QueryResponse)
def query_documents(request: QueryRequest):
    """
    Endpoint to query relevant documents based on embedding.
    """
    try:
        results = collection.query(
            query_embeddings=[request.embedding],
            n_results=request.n_results
        )
        documents = results['documents'][0]  # Assuming single query
        return QueryResponse(results=documents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/rag_response", response_model=RagResponseResponse)
def rag_response_endpoint(request: RagResponseRequest):
    """
    Optional: Endpoint to handle complete RAG response.
    """
    try:
        # Step 1: Get embedding
        embedding_function = OpenAIEmbeddingFunction(model_name="text-embedding-ada-002")
        embedding = embedding_function([request.text])[0]

        # Step 2: Query relevant documents
        results = collection.query(
            query_embeddings=[embedding],
            n_results=3
        )
        contexts = [doc.replace("\n", " ") for doc in results['documents'][0]]

        # Step 3: Generate response using GPT
        context_string = "; ".join(contexts)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful banking assistant."},
                {"role": "user", "content": f"Query: {request.text}. Context: {context_string}"}
            ]
        )
        return RagResponseResponse(response=response['choices'][0]['message']['content'])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
