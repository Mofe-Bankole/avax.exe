// frontend/app/page.tsx
import ContentButton from "@/components/ContentButton";
import Header from "@/components/Header";
import React from "react";

const AVALANCHE_RED = "#E84142";
const AVALANCHE_DARK = "#050608";
const AVALANCHE_DARK_CARD = "#111318";
const AVALANCHE_BORDER = "#1F222A";

export default function Home() {
  return (
    <div
      className="min-h-screen text-white main_body"
    >
      {/* Header */}
    <Header/>
      {/* Hero – centered above the fold */}
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-14 md:pt-20">
        <section className="flex flex-col items-center justify-center gap-10 text-center md:min-h-[60vh]">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
            Built for Avalanche gamers, creators & communities
          </div>

          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              Your social command center for{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FF8B8B 0%, #E84142 35%, #FFFFFF 80%)",
                }}
              >
                Avalanche games
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm text-neutral-300 md:text-base">
              avax.exe is the **home base for players of Avalanche‑powered
              worlds** like Off The Grid, Shrapnel, and DeFi Kingdoms. Discover
              new games, climb cross‑game leaderboards, chat with squads, and
              let AI surface the next session you&apos;ll fall in love with.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 pt-2 md:flex-row md:gap-4">
              {/* <button
                className="w-full rounded-full px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-red-500/40 md:w-auto"
                style={{
                  background:
                    "linear-gradient(135deg, #FF6767 0%, #E84142 40%, #FFB199 100%)",
                }}
              >
                Start as an Avalanche player
              </button> */}
              <ContentButton >Start as an Avalanche Player</ContentButton>
              <button className="w-full rounded-full border border-neutral-700 bg-neutral-950/60 px-6 py-3 text-sm font-medium text-neutral-100 hover:border-neutral-500 hover:bg-neutral-900 md:w-auto">
                I&apos;m a game studio / builder
              </button>
            </div>

            <p className="text-xs text-neutral-500">
              No gas needed to explore. Connect your Core or EVM wallet when
              you&apos;re ready to claim your name and start climbing.
            </p>
          </div>

          {/* Quick stat strip */}
          <div className="grid w-full gap-4 rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-950/90 via-black/80 to-neutral-950/90 p-4 text-left md:grid-cols-3 md:p-6">
            <StatPill
              label="Avalanche games tracked"
              value="50+"
              caption="From tactical shooters to on‑chain RPGs"
            />
            <StatPill
              label="Cross‑game stats"
              value="1 profile"
              caption="Show off your skill across the ecosystem"
            />
            <StatPill
              label="Realtime social"
              value="Squads & global chat"
              caption="Find teammates before queueing"
            />
          </div>
        </section>

        {/* Feature grid */}
        <section
          id="features"
          className="mt-20 space-y-8 border-t border-neutral-900 pt-12"
        >
          <SectionLabel>Everything in one Avalanche‑native hub</SectionLabel>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Discover, compete, connect — without leaving the Avalanche universe.
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Discovery feed"
              accent="Discovery"
              description="Scroll a curated feed of Avalanche games, clips, events and updates. No more hunting through random links and Telegram threads."
            >
              <ul className="space-y-1 text-xs text-neutral-300">
                <li>– Trending titles, tournaments and new seasons</li>
                <li>– Tags for genre, tempo and platform</li>
                <li>– Deep links into official game docs & socials</li>
              </ul>
            </FeatureCard>

            <FeatureCard
              title="Cross‑game leaderboards"
              accent="Rankings"
              description="Track your progress across Off The Grid, Shrapnel, DeFi Kingdoms and more with one clean, Avalanche‑styled leaderboard."
            >
              <ul className="space-y-1 text-xs text-neutral-300">
                <li>– Global rankings plus friends‑only views</li>
                <li>– Seasonal ladders and game‑specific boards</li>
                <li>– Highlights for streaks, clutch plays & streak resets</li>
              </ul>
            </FeatureCard>

            <FeatureCard
              title="Social & squads"
              accent="Social"
              description="Profiles, follows and real‑time chat, so you actually know who you just queued with — and how sweaty they play."
            >
              <ul className="space-y-1 text-xs text-neutral-300">
                <li>– Global lobby, per‑game rooms and private DMs</li>
                <li>– Player cards with stats & favorite loadouts</li>
                <li>– Status: grinding ranked, chilling, LFG</li>
              </ul>
            </FeatureCard>
          </div>
        </section>

        {/* AI Suggestions */}
        <section
          id="ai"
          className="mt-20 space-y-8 rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/10 via-black to-black/95 p-6 md:p-10"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-4">
              <SectionLabel tone="red">AI‑assisted game discovery</SectionLabel>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Let our AI co‑pilot line up your next Avalanche session.
              </h2>
              <p className="text-sm text-neutral-200 md:text-base">
                avax.exe learns how you play, which communities you vibe with,
                and how sweaty your average night looks. Then it suggests
                matches, events and new worlds that actually fit your energy —
                not just what&apos;s loud on Twitter.
              </p>
              <ul className="space-y-2 text-sm text-neutral-200">
                <li>– Tailored picks based on game time, genres & intensity</li>
                <li>– Quick summaries so you can decide in seconds</li>
                <li>– &ldquo;Warm‑up,&rdquo; &ldquo;Sweat,&rdquo; and
                  &nbsp;&ldquo;Chill farm&rdquo; recommendation modes
                </li>
              </ul>
            </div>

            <div className="mt-4 w-full max-w-md rounded-2xl border border-red-500/40 bg-black/60 p-4 text-left shadow-[0_0_50px_rgba(232,65,66,0.3)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                Live suggestion preview
              </p>
              <div className="mt-3 space-y-3 text-sm">
                <div className="rounded-xl bg-neutral-900/80 p-3">
                  <p className="text-xs text-neutral-400">For you</p>
                  <p className="mt-1 font-medium text-neutral-50">
                    &ldquo;Queue 3 tactical rounds in Off The Grid, then wind
                    down in DeFi Kingdoms to farm in peace.&rdquo;
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <MiniPill label="Prefers squads" />
                  <MiniPill label="High APM / FPS" />
                  <MiniPill label="Enjoys on‑chain progression" />
                  <MiniPill label="GMT +1 evenings" />
                </div>
                <button className="mt-3 w-full rounded-full border border-red-400/70 bg-red-500/20 px-3 py-2 text-xs font-semibold text-red-100 hover:bg-red-500/40">
                  Ask avax.exe what to play tonight
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboards & social section */}
        <section
          id="leaderboards"
          className="mt-20 grid gap-10 md:grid-cols-[1.2fr,1fr]"
        >
          <div className="space-y-4">
            <SectionLabel>Leaderboards that actually feel good to look at</SectionLabel>
            <h2 className="text-2xl font-semibold md:text-3xl">
              Clean rankings, zero spreadsheets, all Avalanche.
            </h2>
            <p className="text-sm text-neutral-300 md:text-base">
              We take raw stats from Avalanche games and present them in a
              single, beautiful view. Filter by game, season, region, or just
              peek at how your crew is doing against the rest of the network.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-200">
              <li>– Global, regional and friends‑only boards</li>
              <li>– Badges for top percentile, clutch streaks & event wins</li>
              <li>– Designed to match Avalanche&apos;s visual language</li>
            </ul>
          </div>

          <div className="space-y-4 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 via-black to-neutral-950 p-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                LIVE BOARD — OFF THE GRID
              </span>
              <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-medium text-red-200">
                Season 2 • Ranked
              </span>
            </div>
            <div className="mt-3 grid grid-cols-[1.5fr,0.7fr,0.7fr] gap-2 border-b border-neutral-800 pb-2 text-[11px] text-neutral-400">
              <span>Player</span>
              <span className="text-right">MMR</span>
              <span className="text-right">Winrate</span>
            </div>
            <LeaderboardRow rank={1} name="0xGridMaster" mmr="2,431" wr="68%" />
            <LeaderboardRow rank={2} name="NovaFragger" mmr="2,210" wr="64%" />
            <LeaderboardRow rank={3} name="ShrapnelStorm" mmr="2,098" wr="61%" />
            <LeaderboardRow rank={12} name="you.core.avax" mmr="1,621" wr="55%" highlight />
          </div>
        </section>

        {/* Social & chat */}
        <section id="social" className="mt-20 space-y-8 border-t border-neutral-900 pt-12">
          <SectionLabel>Chat, squads & notifications</SectionLabel>
          <h2 className="text-2xl font-semibold md:text-3xl">
            Never solo‑queue into silence again.
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 text-sm text-neutral-300">
              <p>
                avax.exe gives Avalanche players a shared lobby. Hang in the
                global chat, drop into per‑game rooms, or DM teammates when
                you&apos;re ready to run it back. Lightweight notifications keep
                you in the loop without spamming your phone.
              </p>
              <ul className="space-y-2">
                <li>– Global & per‑game chat rooms with message history</li>
                <li>– Simple presence: online, in‑match, AFK</li>
                <li>– Notifications when friends climb, queue or go live</li>
              </ul>
            </div>

            <div className="space-y-3 rounded-2xl border border-neutral-800 bg-black/80 p-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-neutral-100">#global‑avax</span>
                <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] text-green-300">
                  1,248 online
                </span>
              </div>
              <div className="space-y-2 text-[11px] text-neutral-200">
                <p>
                  <span className="font-semibold text-neutral-50">
                    shrapnel_mint
                  </span>{" "}
                  <span className="text-neutral-500">•</span>{" "}
                  queueing customs, LFG for 3 more 🧨
                </p>
                <p>
                  <span className="font-semibold text-neutral-50">
                    defi_king
                  </span>{" "}
                  <span className="text-neutral-500">•</span>{" "}
                  need one more for AVAX farming run 🌾
                </p>
                <p>
                  <span className="font-semibold text-red-300">
                    you.core.avax
                  </span>{" "}
                  <span className="text-neutral-500">•</span>{" "}
                  anyone down for Off The Grid ranked in 10?
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-[11px] text-neutral-500">
                <span className="flex-1">Message #global‑avax…</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium text-black"
                  style={{ backgroundColor: AVALANCHE_RED }}
                >
                  Send
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Builder / dev callout */}
        <section className="mt-20 space-y-6 rounded-3xl border border-neutral-800 bg-gradient-to-r from-black via-neutral-900 to-black p-6 md:flex md:items-center md:justify-between md:space-y-0 md:p-8">
          <div className="max-w-xl space-y-3">
            <SectionLabel tone="subtle">For Avalanche builders</SectionLabel>
            <h2 className="text-xl font-semibold md:text-2xl">
              Plug your game into a social layer that already feels native.
            </h2>
            <p className="text-sm text-neutral-300">
              Add your Avalanche game to avax.exe to reach players who are
              already exploring, chatting and theory‑crafting on‑chain. We&apos;ll
              surface your leaderboards, events and patch notes in an interface
              they already know.
            </p>
          </div>
          <button className="mt-4 w-full rounded-full border border-red-500/70 bg-red-500/20 px-5 py-2.5 text-sm font-semibold text-red-100 hover:bg-red-500/35 md:mt-0 md:w-auto">
            List my game on avax.exe
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-black/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
          <span>
            avax.exe is an independent Avalanche‑native social hub for gamers.
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-neutral-600">Soon:</span>
            <span className="rounded-full border border-neutral-700 px-3 py-1 text-[11px] text-neutral-200">
              iOS companion
            </span>
            <span className="rounded-full border border-neutral-700 px-3 py-1 text-[11px] text-neutral-200">
              Android companion
            </span>
            <span className="rounded-full border border-neutral-700 px-3 py-1 text-[11px] text-neutral-200">
              Creator tools
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Small presentational components */

type StatPillProps = {
  label: string;
  value: string;
  caption: string;
};

function StatPill({ label, value, caption }: StatPillProps) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-black/80 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-neutral-400">{caption}</p>
    </div>
  );
}

type FeatureCardProps = {
  title: string;
  accent: string;
  description: string;
  children?: React.ReactNode;
};

function FeatureCard({ title, accent, description, children }: FeatureCardProps) {
  return (
    <div
      className="flex h-full flex-col justify-between rounded-2xl border p-4"
      style={{ borderColor: AVALANCHE_BORDER, backgroundColor: AVALANCHE_DARK_CARD }}
    >
      <div className="space-y-3">
        <span className="inline-flex rounded-full bg-red-500/20 px-2 py-0.5 text-[11px] font-medium text-red-200">
          {accent}
        </span>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-neutral-300">{description}</p>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

type LeaderboardRowProps = {
  rank: number;
  name: string;
  mmr: string;
  wr: string;
  highlight?: boolean;
};

function LeaderboardRow({ rank, name, mmr, wr, highlight }: LeaderboardRowProps) {
  return (
    <div
      className={`grid grid-cols-[1.5fr,0.7fr,0.7fr] items-center gap-2 rounded-xl px-3 py-2 ${
        highlight
          ? "bg-red-500/15 text-red-50 border border-red-500/50"
          : "text-neutral-200 hover:bg-neutral-900/70"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
            highlight ? "bg-red-500/80 text-black" : "bg-neutral-900 text-neutral-200"
          }`}
        >
          {rank}
        </span>
        <span className="truncate text-xs font-medium">{name}</span>
      </div>
      <span className="text-right text-xs">{mmr}</span>
      <span className="text-right text-xs">{wr}</span>
    </div>
  );
}

type SectionLabelProps = {
  children: React.ReactNode;
  tone?: "red" | "subtle";
};

function SectionLabel({ children, tone = "subtle" }: SectionLabelProps) {
  const base = "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em]";
  if (tone === "red") {
    return (
      <span className={`${base} bg-red-500/10 text-red-300 border border-red-500/40`}>
        {children}
      </span>
    );
  }
  return (
    <span className={`${base} bg-neutral-900 text-neutral-400 border border-neutral-800`}>
      {children}
    </span>
  );
}

type MiniPillProps = { label: string };

function MiniPill({ label }: MiniPillProps) {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-black/80 px-2 py-1 text-[10px] text-neutral-200 border border-red-500/40">
      {label}
    </span>
  );
}