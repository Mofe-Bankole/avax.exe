"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

type Mode = "signup" | "signin";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL; // change if needed

export default function Onboarding() {
  return (
    <div className="min-h-screen text-white main_body">
      <header className="sticky top-0 z-20 border-b border-neutral-800/70 backdrop-blur bg-black/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Logo + name */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight">
                avx<span className="avalanche">.exe</span>
              </span>
            </div>
          </div>

          {/* Navigation + actions */}
          <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
            <a
              href="#features"
              className="hover:text-red-400 transition duration-500"
            >
              Features
            </a>
            <a href="#leaderboards" className="hover:text-white">
              Leaderboards
            </a>
            <a href="#ai" className="hover:text-white">
              AI Suggestions
            </a>
            <a href="#social" className="hover:text-white">
              Social & Chat
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-14 md:pt-20 flex flex-col items-center">
        <div className="h-full text-6xl text-center mt-16 avalanche">
          #Welcome to Avx.exe Builder
        </div>
        <div className="px-5 py-5 mt-25 rounded-sm space-y-4 text-center border-spacing-0.5 border-white">
          <p className="text-xl">Sign up with your core wallet</p>
          <Button className="cursor-pointer w-full px-2 py-4">
            Connect Core Wallet
          </Button>
        </div>
      </main>
    </div>
  );
}
