import pandas as pd
import matplotlib.pyplot as plt
import plotly.express as px

# Load the generated files
file_2d = "embeddings_2d.csv"
file_3d = "embeddings_3d.csv"

df_2d = pd.read_csv(file_2d)
df_3d = pd.read_csv(file_3d)

# 2D Visualization with Matplotlib
def plot_2d_embeddings(data):
    plt.figure(figsize=(10, 8))
    for category in data["Category"].unique():
        subset = data[data["Category"] == category]
        plt.scatter(subset["x"], subset["y"], label=category, alpha=0.7)
    plt.title("2D Visualization of Embeddings")
    plt.xlabel("Dimension 1")
    plt.ylabel("Dimension 2")
    plt.legend()
    plt.show()

# 3D Visualization with Plotly
def plot_3d_embeddings(data):
    fig = px.scatter_3d(
        data,
        x="x",
        y="y",
        z="z",
        color="Category",
        hover_data=["Document"],
        title="3D Visualization of Embeddings"
    )
    fig.show()

# Visualize 2D
print("Visualizing 2D embeddings...")
plot_2d_embeddings(df_2d)

# Visualize 3D
print("Visualizing 3D embeddings...")
plot_3d_embeddings(df_3d)
