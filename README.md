# RAG Based Chat-bot using Langchain, MongoDB Atlas, and SingleStore Kai

This project implements a Retrieval-Augmented Generation (RAG) chatbot using LangChain, MongoDB Atlas, and SingleStore Kai. It combines AI language generation with knowledge retrieval for more informative responses.

## Table of Contents

- [RAG Based Chat-bot using Langchain, MongoDB Atlas, and SingleStore Kai](#rag-based-chat-bot-using-langchain-mongodb-atlas-and-singlestore-kai)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Running the App Locally](#running-the-app-locally)
  - [Setting Up SingleStore Kai](#setting-up-singlestore-kai)
  - [Data Fetching in askinsights Page](#data-fetching-in-askinsights-page)

## Installation

To install the application, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/singlestore-labs/kai-rag
   cd MongoDB-RAG-Vercel
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the App Locally

To run the app locally:

1. Create a `.env` file in the root directory and add the following environment variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   MONGODB_URI=your_mongodb_uri
   SINGLESTORE_HOST=your_singlestore_host
   SINGLESTORE_PORT=your_singlestore_port
   SINGLESTORE_USER=your_singlestore_username
   SINGLESTORE_PASSWORD=your_singlestore_password
   SINGLESTORE_DATABASE=your_singlestore_database
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Setting Up SingleStore Kai

To set up SingleStore Kai:

1. Sign up for a SingleStore account at [https://www.singlestore.com/](https://www.singlestore.com/)
2. Create a new workspace only if you are using a credit based trial. If you signed up for a free tier the workspace and database will be created for you by default.
3. Next, create a database called "chatter" (or go to the db that was created for you) and create a vector index. To do this, open Kai shell of the workspace Kai lives, and run this command.
```db.createCollection(
    "training_data",
	{
		columns: [
			{ id: 'text', type: 'VARCHAR(5000) NOT NULL' },
			{ id: 'text_embedding', type: 'VECTOR(1536) NOT NULL' }
		],
		indexes: [
			{
				key: {
					text_embedding: 'vector'
				},
				name: 'vector_index',
				kaiIndexOptions: {
					index_type: 'IVF_FLAT',
					nlist: 5,
					nprobe: 1,
					metric_type: 'EUCLIDEAN_DISTANCE',
					dimensions: 1536,
				}
			}
		]
	}
)```
3. Obtain your connection credentials for Kai (host, port, username, password, database name)
4. Add these credentials to your `.env` file as shown in the [Running the App Locally](#running-the-app-locally) section

## Data Fetching in askinsights Page

The askinsights page fetches data from two sources:

1. MongoDB-compatible Vector Index:
   - Used for semantic search and retrieval of relevant text chunks
   - Implemented using MongoDB Atlas' vector search capabilities
   - The vector index is queried using the user's input to find similar text chunks

2. Structured Data Table:
   - Contains additional structured information about tickets and insights
   - Stored in SingleStore Kai
   - Accessed through a SQL query in the `/api/insights` endpoint

The process works as follows:

1. User submits a question on the askinsights page
2. The question is converted into a vector embedding
3. The vector embedding is used to search the MongoDB vector index for relevant text chunks
4. Simultaneously, structured data is fetched from SingleStore Kai using a SQL query
5. The relevant text chunks and structured data are combined to provide a comprehensive response
6. The combined information is sent to the language model (e.g., OpenAI's GPT) to generate the final response
7. The response is streamed back to the user interface

This approach allows the chatbot to leverage both unstructured text data (through vector search) and structured data (from SingleStore) to provide more accurate and insightful responses.


