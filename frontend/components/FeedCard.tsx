"use client";

import React from "react";
import { Play, MessageCircle, Share2, MoreHorizontal, Trophy, Zap } from "lucide-react";
import { FeedItem } from "@/hooks/useDiscoveryData";

const AVALANCHE_RED = "#E84142";

export default function FeedCard({ item }: { item: FeedItem }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-neutral-900/50 to-black/80 p-px transition-all hover:border-red-500/30">
            <div className="relative overflow-hidden rounded-[15px] bg-neutral-950 p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center border border-white/10">
                            <span className="text-[10px] font-bold text-neutral-400">{item.author[0]}</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white leading-none">{item.author}</p>
                            <p className="text-[10px] text-neutral-500 mt-1">{item.timestamp}</p>
                        </div>
                    </div>
                    <button className="text-neutral-500 hover:text-white transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="space-y-3">
                    <p className="text-sm text-neutral-200 leading-relaxed tabular-nums">
                        {item.description}
                    </p>

                    {/* Visual Placeholder for MVP */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/5">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {item.type === 'clip' && <Play className="h-8 w-8 text-white/20 fill-white/10" />}
                            {item.type === 'announcement' && <Zap className="h-8 w-8 text-red-500/20 fill-red-500/10" />}
                            {item.type === 'tournament' && <Trophy className="h-8 w-8 text-yellow-500/20 fill-yellow-500/10" />}
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${item.type === 'tournament' ? 'bg-yellow-500/20 text-yellow-500' :
                                    item.type === 'announcement' ? 'bg-red-500/20 text-red-500' :
                                        'bg-blue-500/20 text-blue-500'
                                }`}>
                                {item.type}
                            </span>
                        </div>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight">{item.title}</h3>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-4">
                        <ActionButton icon={<MessageCircle className="h-4 w-4" />} count="24" />
                        <ActionButton icon={<Share2 className="h-4 w-4" />} />
                    </div>

                    <button
                        className="rounded-full px-4 py-1.5 text-[11px] font-bold text-black transition-all hover:opacity-90 active:scale-95"
                        style={{ backgroundColor: AVALANCHE_RED }}
                    >
                        {item.type === 'tournament' ? 'Register' : 'View Core'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function ActionButton({ icon, count }: { icon: React.ReactNode, count?: string }) {
    return (
        <button className="flex items-center gap-1.5 text-neutral-500 hover:text-white transition-all">
            {icon}
            {count && <span className="text-[11px] font-medium">{count}</span>}
        </button>
    );
}
