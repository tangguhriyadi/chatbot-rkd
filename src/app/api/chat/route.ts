import {
    Message as VercelChatMessage,
    StreamingTextResponse,
    createStreamDataTransformer,
} from "ai";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { vectorStore } from "../../../db";
export const dynamic = "force-dynamic";

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are a helpful assistant named Reka, and must answer all questions.
  
  Answer the question based on the following context and chat history, if you dont't find the answer in the context, please answer anything you know by saying "**external resource**: " at the first line, otherwise dont say that, then continue with your answer:
  <context>
    {context}
  </context>
  ==============================
  <chat_history>
    {chat_history}
  </chat_history>
  
  Question: {question}
  `;

export async function POST(req: Request) {
    try {
        // Extract the `messages` from the body of the request
        const { messages } = await req.json();

        const formattedPreviousMessages = messages
            .slice(0, -1)
            .map(formatMessage);

        const currentMessageContent = messages[messages.length - 1].content;

        const promptTemplate = PromptTemplate.fromTemplate(TEMPLATE);

        const model = new ChatOpenAI({
            apiKey: process.env.OPENAI_API_KEY!,
            model: "gpt-4o-mini",
            temperature: 0.2,
            streaming: true,
        });

        const store = await vectorStore;

        const retriever = store.asRetriever({
            k: 3,
            searchType: "similarity",
        });

        /**
         * Chat models stream message chunks rather than bytes, so this
         * output parser handles serialization and encoding.
         */
        const parser = new HttpResponseOutputParser();

        const chain = RunnableSequence.from([
            {
                question: (input) => input.question,
                chat_history: (input) => input.chat_history,
                // eslint-disable-next-line
                context: async (input: any) => {
                    const docs = await retriever.invoke(input.question);
                    return formatDocumentsAsString(docs);
                },
            },
            promptTemplate,
            model,
            parser,
        ]);

        // Convert the response into a friendly text-stream
        const stream = await chain.stream({
            chat_history: formattedPreviousMessages.join("\n"),
            question: currentMessageContent,
        });

        // Respond with the stream
        return new StreamingTextResponse(
            stream.pipeThrough(createStreamDataTransformer())
        );
        // eslint-disable-next-line
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: e.status ?? 500 });
    }
}
