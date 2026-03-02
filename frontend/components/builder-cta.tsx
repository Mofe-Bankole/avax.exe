import {
  ArrowRight,
  Code2,
  BarChart3,
  MessageSquare,
  Shield,
} from "lucide-react";

export default function BuilderCTA() {
  return (
    <section id="builders" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-background to-card">
        <div className="flex flex-col gap-12 p-8 md:p-14 lg:flex-row lg:items-center lg:gap-16">
          {/* Left text */}
          <div className="flex flex-1 flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <Code2 className="h-3.5 w-3.5" />
              For Avalanche builders
            </div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Plug your game into a social layer that already feels native
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              Add your Avalanche game to avax.exe to reach players who are
              already exploring, chatting and theory-crafting on-chain. We{"'"}
              ll surface your leaderboards, events and patch notes in an
              interface they already know.
            </p>
            <a
              href="#"
              className="group mt-2 flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(232,65,66,0.3)]"
            >
              List my game on avax.exe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Right - feature grid */}
          <div className="grid flex-1 grid-cols-2 gap-4">
            <BuilderFeature
              icon={<BarChart3 className="h-5 w-5 text-primary" />}
              title="Leaderboard API"
              description="Push your game stats into cross-game rankings with a simple API call."
            />
            <BuilderFeature
              icon={<MessageSquare className="h-5 w-5 text-primary" />}
              title="Chat SDK"
              description="Embed avax.exe chat rooms or overlays directly in your game client."
            />
            <BuilderFeature
              icon={<Shield className="h-5 w-5 text-primary" />}
              title="Wallet Auth"
              description="Leverage our wallet-based auth so players connect with one click."
            />
            <BuilderFeature
              icon={<Code2 className="h-5 w-5 text-primary" />}
              title="Bot Framework"
              description="Build custom bots for your community with stats, drops and alerts."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BuilderFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="cursor-pointer flex flex-col gap-3 rounded-xl border border-border bg-card p-5 hover:border hover:border-red-500 transition duration-300">
      {icon}
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
