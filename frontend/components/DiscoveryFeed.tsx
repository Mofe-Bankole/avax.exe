"use client";

import React from "react";
import { useDiscoveryData } from "@/hooks/useDiscoveryData";
import FeedCard from "./FeedCard";
import { Sparkles, TrendingUp, Calendar } from "lucide-react";

export default function DiscoveryFeed() {
    const { data, loading, error } = useDiscoveryData();

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
            </div>
        );
    }

    if (error && !data.feed.length) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
                <p className="text-neutral-400">Unable to load discovery data.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Feed Section */}
            <div className="lg:col-span-2 space-y-6">
                <SectionHeader icon={<Sparkles className="h-4 w-4 text-blue-400" />} title="Discovery Feed" />
                <div className="grid gap-6">
                    {data.feed.map((item) => (
                        <FeedCard key={item.id} item={item} />
                    ))}
                </div>
            </div>

            {/* Sidebar: Trending & Tournaments (Handled at same level) */}
            <div className="space-y-10">
                {/* Trending */}
                <div className="space-y-6">
                    <SectionHeader icon={<TrendingUp className="h-4 w-4 text-red-500" />} title="Trending Now" />
                    <div className="grid gap-4">
                        {data.trending.map((item) => (
                            <FeedCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* Upcoming Tournaments */}
                <div className="space-y-6">
                    <SectionHeader icon={<Calendar className="h-4 w-4 text-yellow-500" />} title="Live Tournaments" />
                    <div className="grid gap-4">
                        {data.tournaments.map((item) => (
                            <FeedCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <div className="flex items-center gap-2 px-1">
            {icon}
            <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                {title}
            </h2>
        </div>
    );
}
