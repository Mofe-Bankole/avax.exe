import { ArrowRight, Gamepad2, Users, Trophy } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with subtle image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
      </div>

      {/* Subtle red glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Built for Avalanche gamers, by Avalanche
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Your social command center for{" "}
            <span className="bg-gradient-to-r from-primary via-[#ff6b6b] to-foreground bg-clip-text text-transparent">
              Avalanche gaming
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Discover games, climb cross-game leaderboards, chat with your squad,
            and let AI surface your next session. One unified hub for every
            Avalanche-powered world.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="/onboard/gamer/connect"
              className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(232,65,66,0.3)]"
            >
              Start as a Player
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#builders"
              className="flex items-center gap-2 rounded-full border border-border bg-secondary px-7 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:border-muted-foreground/40 hover:bg-secondary/80"
            >
              {"I'm a builder / game studio"}
            </a>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            No gas needed to explore. Connect your Core or EVM wallet when
            you're ready.
          </p>
        </div>

        {/* Stats strip */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          <StatCard
            icon={<Gamepad2 className="h-5 w-5 text-primary" />}
            value="50+"
            label="Avalanche games tracked"
            caption="From tactical shooters to on-chain RPGs"
          />
          <StatCard
            icon={<Users className="h-5 w-5 text-primary" />}
            value="1 profile"
            label="Cross-game identity"
            caption="Show off your skill across the entire ecosystem"
          />
          <StatCard
            icon={<Trophy className="h-5 w-5 text-primary" />}
            value="Realtime"
            label="Squads & global chat"
            caption="Find teammates before queueing up"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
  caption,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  caption: string;
}) {
  return (
    <div className="flex flex-col gap-2 bg-card p-6 md:p-8">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-2xl font-bold text-foreground">{value}</span>
      </div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{caption}</p>
    </div>
  );
}
