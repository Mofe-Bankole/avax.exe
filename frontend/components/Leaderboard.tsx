"use client";

import React, { useState, useEffect } from "react";
import { LeaderboardRow } from "./LeaderboardRow";
import pfp from "../app/images/pfp.jpg";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4070";

export default function Leaderboard({ gameId, gameName }: { gameId: string, gameName: string }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const res = await fetch(`${BACKEND_URL}/api/v1/games/leaderboard/${gameId}`);
                const json = await res.json();
                if (json.success) {
                    setData(json.data);
                }
            } catch (err) {
                console.error("Failed to fetch leaderboard", err);
            } finally {
                setLoading(false);
            }
        }

        fetchLeaderboard();
        // Refresh every 30 seconds
        const interval = setInterval(fetchLeaderboard, 30000);
        return () => clearInterval(interval);
    }, [gameId]);

    return (
        <div className="space-y-4 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 via-black to-neutral-950 p-4 text-xs">
            <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                    LIVE BOARD — {gameName.toUpperCase()}
                </span>
                <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-medium text-red-200">
                    Live Updates
                </span>
            </div>
            <div className="mt-3 grid grid-cols-[1.5fr,0.7fr,0.7fr] gap-2 border-b border-neutral-800 pb-2 text-[11px] text-neutral-400">
                <span>Player</span>
                <span className="text-right">Score</span>
                <span className="text-right">Rank</span>
            </div>

            {loading && <p className="text-center py-4 text-neutral-500">Syncing with Avalanche...</p>}

            {!loading && data.length === 0 && (
                <p className="text-center py-4 text-neutral-500">No scores recorded yet.</p>
            )}

            {!loading && data.map((entry, i) => (
                <LeaderboardRow
                    key={entry.id}
                    rank={i + 1}
                    name={entry.user?.username || entry.userId.slice(0, 10)}
                    mmr={entry.value.toLocaleString()}
                    wr={`${Math.floor(Math.random() * 20) + 50}%`} // Mock winrate for visual completeness
                    imageUrl={pfp}
                />
            ))}
        </div>
    );
}
