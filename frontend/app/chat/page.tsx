"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ConnectSocket } from "@/services/SocketService";
import { getMessages, startConversation } from "@/services/ChatService";

type Message = {
  id?: string;
  senderId: string;
  content: string;
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const participantId = searchParams.get("participantId");

  const [convoId, setConvoId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const socket = ConnectSocket();

  useEffect(() => {
    if (!participantId) return;

    async function initChat() {
      try {
        const id = await startConversation(participantId as string);
        setConvoId(id);
        const history = await getMessages(id);
        setMessages(history ?? []);

        if (socket) {
          socket.emit("join_conversation", id);
          socket.on("new_message", (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
          });
        }
      } catch (err) {
        console.error("Chat init error:", err);
      }
    }

    void initChat();

    return () => {
      if (socket) socket.off("new_message");
    };
  }, [participantId, socket]);

  const sendMessage = () => {
    if (!socket || !convoId || !input.trim()) return;
    socket.emit("send_message", { conversationId: convoId, content: input });
    setInput("");
  };

  // If no participantId supplied, show helpful hint inside the app layout
  if (!participantId) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <section className="space-y-4">
            <h1 className="text-2xl font-semibold">Direct Messages</h1>
            <div className="rounded-2xl border border-dashed border-border/70 p-6 bg-card">
              <p className="text-sm text-muted-foreground">
                Add a{" "}
                <code className="font-mono px-1 py-0.5 bg-neutral-900 rounded">
                  ?participantId=USER_ID
                </code>{" "}
                query parameter to start a direct message with another user.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <section className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
              Direct messages
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Conversation with{" "}
              <span className="font-mono text-red-400">{participantId}</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl mt-2">
              Keep your chat conversations private. Messages appear in real-time
              while connected to the backend socket.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-card p-6 space-y-4">
            <div className="flex flex-col gap-3 h-[50vh] overflow-y-auto p-3 border rounded-md bg-neutral-950/60">
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No messages yet.
                </p>
              ) : (
                messages.map((msg: Message) => (
                  <div
                    key={msg.id ?? `${msg.senderId}-${Math.random()}`}
                    className={`flex items-start gap-3 ${
                      msg.senderId === participantId ? "justify-start" : ""
                    }`}
                  >
                    <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-xs font-semibold text-neutral-300">
                      {String(msg.senderId ?? "?")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {msg.senderId}
                      </div>
                      <div className="text-sm">{msg.content}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-md px-3 py-2 bg-background border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground disabled:opacity-50"
                disabled={!input.trim() || !convoId}
              >
                Send
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
