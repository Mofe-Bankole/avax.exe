"use client";

import React from "react";
import { BuilderSignupForm } from "@/components/builder/builder-signup-form";

export default function BuilderOnboardingPage() {
  return (
    <div className="min-h-screen text-white main_body">
      <header className="sticky top-0 z-20 border-b border-neutral-800/70 backdrop-blur bg-black/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight">
                avx<span className="avalanche">.exe</span>
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-14 md:pt-20 flex flex-col items-center">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            Avalanche builder onboarding
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight avalanche">
            #Welcome to Avx.exe Builder
          </h1>
          <p className="mt-3 text-sm md:text-base text-neutral-300 max-w-xl mx-auto">
            Share your studio details, socials, and wallet once. We&apos;ll use
            this to power your presence across tournaments, leaderboards, and
            discovery.
          </p>
        </div>
        <div className="w-full max-w-3xl">
          <BuilderSignupForm />
        </div>
      </main>
    </div>
  );
}
