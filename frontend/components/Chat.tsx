"use client";

import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAccount } from "wagmi";

const SOCKET_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4070";

export default function Chat() {
    const { address, isConnected } = useAccount();
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io(SOCKET_URL);

        socketRef.current.on("message", (message: any) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (!input.trim() || !socketRef.current) return;

        const message = {
            text: input,
            sender: address || "Anonymous",
            timestamp: new Date().toISOString(),
        };

        socketRef.current.emit("message", message);
        setInput("");
    };

    return (
        <div className="space-y-3 rounded-2xl border border-neutral-800 bg-black/80 p-4 text-xs h-[400px] flex flex-col">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="font-semibold text-neutral-100">#global‑avax</span>
                <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] text-green-300">
                    Connected
                </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 text-[11px] text-neutral-200 py-2 scrollbar-hide">
                {messages.length === 0 && (
                    <p className="text-neutral-500 text-center mt-10">No messages yet. Start the conversation!</p>
                )}
                {messages.map((msg, i) => (
                    <p key={i}>
                        <span className={`font-semibold ${msg.sender === address ? "text-red-500" : "text-neutral-50"}`}>
                            {msg.sender.slice(0, 6)}...{msg.sender.slice(-4)}
                        </span>{" "}
                        <span className="text-neutral-500">•</span>{" "}
                        {msg.text}
                    </p>
                ))}
            </div>

            <div className="mt-2 flex justify-between gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-[11px] text-neutral-500">
                <input
                    type="text"
                    placeholder={isConnected ? "Message #global-avax" : "Connect wallet to chat"}
                    className="w-full bg-transparent outline-none text-neutral-50 disabled:cursor-not-allowed"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    disabled={!isConnected}
                />
                <button
                    onClick={sendMessage}
                    disabled={!isConnected || !input.trim()}
                    className="rounded-full px-3 py-1 text-[10px] font-medium text-black disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#E84142" }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
