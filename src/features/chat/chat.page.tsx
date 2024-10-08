"use client";
import { Input, Button } from "antd";
import { useChat } from "ai/react";
import { useRef, useEffect } from "react";

const formatResponse = (text: string) => {
    // Split the text by \n for new lines
    return text.split("\n").map((line, index) => {
        // Replace **text** with <strong>text</strong> for bold
        const formattedLine = line.split(/(\*\*[^*]+\*\*)/).map((part, idx) => {
            if (/^\*\*[^*]+\*\*$/.test(part)) {
                // Remove ** and wrap with <strong>
                return <strong key={idx}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });

        return (
            <p key={index}>
                {formattedLine}
                {index < text.length - 1 && <br />}
            </p>
        );
    });
};

export function Chat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } =
        useChat({
            api: "api/chat",
            onError: (e) => {
                // eslint-disable-next-line no-console
                console.log(e);
            },
        });
    const chatParent = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const domNode = chatParent.current;
        if (domNode) {
            domNode.scrollTop = domNode.scrollHeight;
        }
    });

    return (
        <div className="flex flex-col w-full h-screen max-h-dvh">
            <header className="p-4 border-b w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold">Chat RKD</h1>
            </header>

            <section className="container px-0 pb-4 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
                <ul
                    ref={chatParent}
                    className="h-1 p-4 flex-grow bg-zinc-50 rounded-lg overflow-y-auto flex flex-col gap-4"
                >
                    <li className="flex flex-row-reverse">
                        <div className="rounded-xl p-4 shadow-md flex max-w-3/4 bg-zinc-100">
                            <p className="text-primary">
                                Hello there ! Can I help you ?
                            </p>
                        </div>
                    </li>
                    {messages.map((m, index) => (
                        <div key={index}>
                            {m.role === "user" ? (
                                <li key={m.id} className="flex flex-row">
                                    <div className="rounded-xl p-4 shadow-md flex">
                                        <p className="text-primary">
                                            {m.content}
                                        </p>
                                    </div>
                                </li>
                            ) : (
                                <li
                                    key={m.id}
                                    className="flex flex-row-reverse"
                                >
                                    <div className="rounded-xl p-4 shadow-md flex w-3/4">
                                        <p className="text-primar">
                                            {formatResponse(m.content)}
                                        </p>
                                    </div>
                                </li>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <li className="flex flex-row-reverse">
                            <div className="rounded-xl p-4 shadow-md flex max-w-3/4">
                                <p className="text-primary">Lagi mikir...</p>
                            </div>
                        </li>
                    )}
                </ul>
            </section>

            <section className="p-4">
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full max-w-3xl mx-auto items-center"
                >
                    <Input
                        className="flex-1 min-h-[40px]"
                        placeholder="Type your question here..."
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                    />
                    <Button
                        variant="solid"
                        color="primary"
                        size="large"
                        className="ml-2"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </form>
            </section>
        </div>
    );
}
