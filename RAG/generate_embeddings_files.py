import numpy as np
import pandas as pd
from sklearn.manifold import TSNE
import chromadb

# Initialize ChromaDB client
client = chromadb.PersistentClient(path="./chromadb/test_db")

# Retrieve data from the collection
collection = client.get_collection(name="transactions_collection")
data = collection.peek()  # Retrieve sample data from the collection

# Extract embeddings, documents, and metadata
embeddings = np.array(data["embeddings"])
documents = data["documents"]
categories = [metadata.get("Category", "Unknown") for metadata in data["metadatas"]]

# Check if embeddings are available
if embeddings.size == 0:
    print("No embeddings found in the database. Ensure the database is populated.")
else:
    # Adjust perplexity based on dataset size
    perplexity = min(30, len(embeddings) - 1)

    # 2D Visualization Data
    tsne_2d = TSNE(n_components=2, random_state=42, perplexity=perplexity)
    reduced_2d = tsne_2d.fit_transform(embeddings)

    # 3D Visualization Data
    tsne_3d = TSNE(n_components=3, random_state=42, perplexity=perplexity)
    reduced_3d = tsne_3d.fit_transform(embeddings)

    # Create DataFrames for 2D and 3D visualization
    df_2d = pd.DataFrame(reduced_2d, columns=["x", "y"])
    df_2d["Category"] = categories
    df_2d["Document"] = documents

    df_3d = pd.DataFrame(reduced_3d, columns=["x", "y", "z"])
    df_3d["Category"] = categories
    df_3d["Document"] = documents

    # Save as CSV files
    df_2d.to_csv("embeddings_2d.csv", index=False)
    df_3d.to_csv("embeddings_3d.csv", index=False)

    print("Files created successfully:")
    print(" - embeddings_2d.csv")
    print(" - embeddings_3d.csv")
