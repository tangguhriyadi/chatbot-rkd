import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config, db } from "../../../db";

export const dynamic = "force-dynamic";

// API GET
export async function GET() {
    try {
        const query = sql`SELECT * FROM collection`;
        const collections = await db.execute(query);

        return NextResponse.json({ message: "success", data: collections });
    } catch {
        return NextResponse.json({ message: "error" }, { status: 500 });
    }
}

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    model: "text-embedding-3-small",
});

// API POST
export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const collectionName = formData.get("name") as string;

    if (!file) {
        return NextResponse.json(
            { message: "No file uploaded" },
            { status: 400 }
        );
    }

    try {
        // Read the file buffer
        const buffer = await file.arrayBuffer();

        // Convert the buffer to a Buffer instance for pdf2json
        const pdfBuffer = Buffer.from(buffer);

        const blob = new Blob([pdfBuffer], { type: "application/pdf" });

        const loader = new WebPDFLoader(blob, {
            parsedItemSeparator: "",
        });

        const docs = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 100,
        });

        const splitDocs = await textSplitter.splitDocuments(docs);

        await PGVectorStore.fromDocuments(splitDocs, embeddings, {
            ...config,
            collectionName: collectionName,
            collectionTableName: "collection",
            collectionMetadata: {
                name: file.name,
                size: file.size,
                type: file.type,
            },
        });

        return NextResponse.json({ message: "success" });
    } catch {
        return NextResponse.json(
            { message: "Error processing PDF" },
            { status: 500 }
        );
    }
}
