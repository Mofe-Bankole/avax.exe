import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  const AVALANCHE_RED = "#E84142";

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-800/70 backdrop-blur bg-black/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo + name */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight">
              avx<span style={{ color: AVALANCHE_RED }}>.exe</span>
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

        <div className="flex items-center gap-3">
          <Button variant={"secondary"} className="cursor-pointer cta-button">
            <Link href={"/signup"}>Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
