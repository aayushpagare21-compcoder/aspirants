"use server";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { NeonPostgres } from "@langchain/community/vectorstores/neon";
import * as dotenv from "dotenv";
dotenv.config();
const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: "Questions Embeddings",
  apiKey: process.env.GEMINI_API_KEY!,
});
export async function getVectorStore() {
  // Initialize a NeonPostgres instance to store embedding vectors
  const vectorStore = await NeonPostgres.initialize(embeddings, {
    connectionString: process.env.DATABASE_URL!,
  });

  return vectorStore;
}
