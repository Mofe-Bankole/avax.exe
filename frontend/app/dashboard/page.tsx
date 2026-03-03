"use client";

import React, { useEffect } from "react";
import DiscoveryHeader from "@/components/DiscoveryHeader";
import DiscoveryFeed from "@/components/DiscoveryFeed";
import { AuthProvider } from "@/context/AuthContext";
import gsap from "gsap";

export default function DashboardPage() {
    useEffect(() => {
        // Premium entry animation
        const tl = gsap.timeline();
        tl.fromTo(
            ".dashboard-fade-in",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power4.out" }
        );
    }, []);

    return (
        <AuthProvider>
            <div className="min-h-screen bg-black text-white selection:bg-red-500/30">
                {/* Navigation */}
                <DiscoveryHeader />

                {/* Main Content */}
                <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
                    {/* Hero/Welcome Section */}
                    <div className="mb-12 dashboard-fade-in">
                        <h1 className="text-3xl font-black tracking-tighter md:text-5xl lg:text-6xl">
                            COMMAND <span className="text-neutral-500 tracking-normal font-light">CENTER</span>
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm text-neutral-400 md:text-base leading-relaxed">
                            Connect your Squad. Track your Ranks. Own the Avalanche Universe.
                            Your dashboard for everything happening in <span className="text-white font-bold">AVX.EXE</span>.
                        </p>
                    </div>

                    {/* Discovery Grid */}
                    <div className="dashboard-fade-in">
                        <DiscoveryFeed />
                    </div>
                </main>

                {/* Background Decorative Elements */}
                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-red-600/5 blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/5 blur-[120px]" />
                </div>
            </div>
        </AuthProvider>
    );
}
