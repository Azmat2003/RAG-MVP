// 1.
// npm install @pinecone-database/pinecone

// 2. 
// npm install @pinecone-database/pinecone --legacy-peer-deps

// import { Pinecone } from "@pinecone-database/pinecone";
import {pineconeIndex as index} from '../config/pinecone.js';

// // 1. Setting up client
// const pinecone = new Pinecone({
//   apiKey: process.env.PINECONE_API_KEY,
// });


// // 2. host
// const index = pinecone.index({
//   host: process.env.PINECONE_INDEX_HOST,
// });

export const storeVectors = async ({
  documentId,
  fileName,
  chunks,
  embeddings,
}) => {
  if (chunks.length !== embeddings.length) {
    throw new Error("Chunks and embeddings count mismatch");
  }

  // 1. Prepare vector records
  const vectors = chunks.map((chunk, i) => ({
    id: `${documentId}-${i}`,
    values: embeddings[i],
    metadata: {
      documentId,
      fileName,
      chunkIndex: i,
      text: chunk,
    },
  }));

  // 2. Store vectors in batches
  const BATCH_SIZE = 100;

  for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
    const batch = vectors.slice(i, i + BATCH_SIZE);

    // update + insert
    await index.upsert({
      records: batch,
      // namespace: "documents",
    });
  }

  return {
    storedCount: vectors.length,
  };
};