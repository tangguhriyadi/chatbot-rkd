import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  DistanceStrategy,
  PGVectorStore,
} from "@langchain/community/vectorstores/pgvector";
import { schema } from "./schema";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PoolConfig } from "pg";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-3-small",
});

const client = postgres(process.env.DATABASE_URL);

export const config = {
  postgresConnectionOptions: {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  } as PoolConfig,
  tableName: "collection_dataset",
  columns: {
    idColumnName: "id",
    vectorColumnName: "vector",
    contentColumnName: "content",
    metadataColumnName: "metadata",
  },
  distanceStrategy: "cosine" as DistanceStrategy,
};

export const vectorStore = PGVectorStore.initialize(embeddings, config);

export const db = drizzle(client, { schema });
