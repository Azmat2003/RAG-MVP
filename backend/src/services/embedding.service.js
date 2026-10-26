// 1.
// npm install @langchain/core @langchain/google-genai

// 2.
// npm install @langchain/core @langchain/google-genai --legacy-peer-deps


// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { embeddingModel } from "../config/gemini.js";

export const generateEmbeddings = async (chunks) => {
  return await embeddingModel.embedDocuments(chunks);
};