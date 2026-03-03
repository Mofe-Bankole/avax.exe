"use client";

import React from "react";
import Link from "next/link";
import { User, MessageSquare, Trophy, Home, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AVALANCHE_RED = "#E84142";

export default function DiscoveryHeader() {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
                {/* Logo and Search */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-black tracking-tighter text-white">
                            AVX<span style={{ color: AVALANCHE_RED }}>.EXE</span>
                        </span>
                    </Link>

                    <div className="hidden relative md:flex items-center">
                        <Search className="absolute left-3 h-4 w-4 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Search games, players..."
                            className="w-64 rounded-full border border-white/10 bg-white/5 py-1.5 pl-10 pr-4 text-xs text-white placeholder:text-neutral-600 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                        />
                    </div>
                </div>

                {/* Global Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    <NavButton icon={<Home className="h-4 w-4" />} label="Home" href="/dashboard" active />
                    <NavButton icon={<Trophy className="h-4 w-4" />} label="Arena" href="/leaderboards" />
                    <NavButton icon={<MessageSquare className="h-4 w-4" />} label="Chat" href="/chat" />
                </nav>

                {/* User Actions */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/chat"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white transition-all shadow-lg shadow-black/20 md:hidden"
                    >
                        <MessageSquare className="h-4 w-4" />
                    </Link>

                    <Link
                        href="/profile"
                        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-1 pr-3 py-1 hover:bg-white/10 transition-all active:scale-95"
                    >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-[10px] font-bold text-white shadow-lg shadow-red-500/20">
                            {user?.username?.[0]?.toUpperCase() || <User className="h-3 w-3" />}
                        </div>
                        <span className="text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors">
                            {user?.username || "Guest"}
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}

function NavButton({ icon, label, href, active = false }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${active
                    ? "bg-white/10 text-white"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
}
