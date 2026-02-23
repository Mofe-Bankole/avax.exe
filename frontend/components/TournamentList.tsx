"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4070";

export default function TournamentList() {
    const { address, isConnected } = useAccount();
    const [tournaments, setTournaments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submittingId, setSubmittingId] = useState<string | null>(null);
    const [proofText, setProofText] = useState("");

    useEffect(() => {
        async function fetchTournaments() {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/tournaments`);
                if (res.data.success) {
                    setTournaments(res.data.tournaments);
                }
            } catch (err) {
                console.error("Failed to fetch tournaments", err);
            } finally {
                setLoading(false);
            }
        }
        fetchTournaments();
    }, []);

    const submitProof = async (tournamentId: string) => {
        if (!address || !proofText.trim()) return;

        setSubmittingId(tournamentId);
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/tournaments/${tournamentId}/submit`, {
                userId: address,
                proofText: proofText.trim(),
            });

            if (res.data.success) {
                alert("Proof submitted successfully! Awaiting review.");
                setProofText("");
            }
        } catch (err: any) {
            const message = err.response?.data?.message || "Submission failed";
            alert(message);
        } finally {
            setSubmittingId(null);
        }
    };

    if (loading) return <div className="text-neutral-500 text-sm animate-pulse">Scanning Avalanche Tournaments...</div>;

    if (tournaments.length === 0) return (
        <div className="rounded-2xl border border-neutral-800 bg-black/40 p-10 text-center">
            <p className="text-neutral-500 text-sm italic">No active tournaments found. Game on, soon.</p>
        </div>
    );

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tournaments.map((t) => (
                <div key={t.id} className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 transition-all hover:border-red-500/50 hover:bg-neutral-900">
                    <div className="mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">{t.game?.name || "Discovery"}</span>
                        <h3 className="mt-1 text-lg font-bold text-neutral-100">{t.title}</h3>
                        <p className="mt-2 text-xs text-neutral-400 line-clamp-2">{t.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] mb-4">
                        <div className="space-y-1">
                            <p className="text-neutral-500 uppercase font-medium">Reward</p>
                            <p className="text-neutral-100 font-bold">{t.reward || "Glory"}</p>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-neutral-500 uppercase font-medium">Ends In</p>
                            <p className="text-neutral-100">{new Date(t.endsAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {isConnected ? (
                        <div className="space-y-3 pt-4 border-t border-neutral-800">
                            <input
                                type="text"
                                placeholder="Paste link/score proof..."
                                className="w-full rounded-lg border border-neutral-800 bg-black px-3 py-2 text-[11px] text-neutral-200 outline-none focus:border-red-500/50"
                                value={submittingId === t.id ? proofText : ""}
                                onChange={(e) => {
                                    setSubmittingId(t.id);
                                    setProofText(e.target.value);
                                }}
                            />
                            <button
                                onClick={() => submitProof(t.id)}
                                disabled={submittingId === t.id && !proofText.trim()}
                                className="w-full rounded-full bg-red-500/20 border border-red-500/50 py-2 text-[11px] font-bold text-red-100 transition-all hover:bg-red-500/40 disabled:opacity-50"
                            >
                                {submittingId === t.id ? "Submitting..." : "Submit Proof"}
                            </button>
                        </div>
                    ) : (
                        <div className="pt-4 border-t border-neutral-800 text-center">
                            <p className="text-[10px] text-neutral-500 italic">Connect wallet to join</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
