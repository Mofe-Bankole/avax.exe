"use client";

import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAccount } from "wagmi";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4070";

export default function Chat() {
    const { address, isConnected } = useAccount();
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [hub, setHub] = useState<any>(null);
    const socketRef = useRef<Socket | null>(null);

    // 1. Fetch Global Hub and Message History
    useEffect(() => {
        const initChat = async () => {
            try {
                // Get Hub
                const hubRes = await axios.get(`${BACKEND_URL}/api/v1/social/hubs/global`);
                const globalHub = hubRes.data.hub;
                setHub(globalHub);

                // Get Messages
                const msgRes = await axios.get(`${BACKEND_URL}/api/v1/social/hubs/${globalHub.id}/messages`);
                setMessages(msgRes.data.messages);

                // 2. Connect Socket and Join Hub Room
                socketRef.current = io(BACKEND_URL);
                socketRef.current.emit("join-conversation", globalHub.id);

                socketRef.current.on("message", (message: any) => {
                    setMessages((prev) => [...prev, message]);
                });
            } catch (error) {
                console.error("Chat initialization failed:", error);
            }
        };

        initChat();

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (!input.trim() || !socketRef.current || !hub || !address) return;

        const payload = {
            hubId: hub.id,
            senderId: address,
            content: input.trim(),
        };

        socketRef.current.emit("message", payload);
        setInput("");
    };

    return (
        <div className="space-y-3 rounded-2xl border border-neutral-800 bg-black/80 p-4 text-xs h-[400px] flex flex-col">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="font-semibold text-neutral-100 italic"># {hub?.name || "loading..."}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${socketRef.current?.connected ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}`}>
                    {socketRef.current?.connected ? "Live" : "Connecting..."}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 text-[11px] text-neutral-200 py-2 scrollbar-hide">
                {messages.length === 0 && (
                    <p className="text-neutral-500 text-center mt-10">Welcome to the Avalanche. No messages yet.</p>
                )}
                {messages.map((msg, i) => (
                    <div key={msg.id || i} className="group">
                        <span className={`font-semibold ${msg.senderId === address ? "text-red-500" : "text-neutral-50"}`}>
                            {msg.sender?.username || msg.senderId.slice(0, 6)}:
                        </span>{" "}
                        <span className="text-neutral-200">{msg.content}</span>
                        <span className="ml-2 text-[8px] text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-2 flex justify-between gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-[11px] text-neutral-500">
                <input
                    type="text"
                    placeholder={isConnected ? `Message #${hub?.name || "global"}` : "Connect wallet to chat"}
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
