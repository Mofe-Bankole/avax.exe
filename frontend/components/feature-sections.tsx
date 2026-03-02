import { Compass, BarChart3, MessageSquare, Sparkles } from "lucide-react"

type FeatureRowProps = {
  tag: string
  title: string
  description: string
  bullets: string[]
  imageSrc: string
  imageAlt: string
  reverse?: boolean
  icon: React.ReactNode
}

function FeatureRow({
  tag,
  title,
  description,
  bullets,
  imageSrc,
  imageAlt,
  reverse = false,
  icon,
}: FeatureRowProps) {
  return (
    <div
      className={`flex flex-col items-center gap-12 lg:gap-16 ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      {/* Text side */}
      <div className="flex flex-1 flex-col gap-6">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
          {icon}
          {tag}
        </div>
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        <ul className="flex flex-col gap-3">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Image side */}
      <div className="flex-1">
        <div className="overflow-hidden rounded-2xl border border-border shadow-2xl shadow-primary/5">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default function FeatureSections() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      {/* Section intro */}
      <div className="mb-20 max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
          Everything in one Avalanche-native hub
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Discover, compete, connect — without leaving the{" "}
          <span className="text-primary">Avalanche Universe</span>
        </h2>
      </div>

      {/* Alternating feature rows */}
      <div className="flex flex-col gap-32">
        {/* 1 - Discovery */}
        <FeatureRow
          icon={<Compass className="h-3.5 w-3.5" />}
          tag="Discovery"
          title="A curated feed of Avalanche games, clips, events and updates"
          description="No more hunting through random links and Telegram threads. Scroll a unified feed of everything happening in the Avalanche gaming ecosystem."
          bullets={[
            "Trending titles, tournaments and new seasons at a glance",
            "Filter by genre, tempo and platform — find your perfect session",
            "Deep links straight into official game docs and socials",
          ]}
          imageSrc="/images/feature-discovery.jpg"
          imageAlt="Avax.exe discovery feed showing Avalanche game cards"
        />

        {/* 2 - Leaderboards (reversed) */}
        <FeatureRow
          icon={<BarChart3 className="h-3.5 w-3.5" />}
          tag="Rankings"
          title="Cross-game leaderboards that actually feel good to look at"
          description="We take raw stats from Avalanche games and present them in a single, beautiful view. Filter by game, season, region, or just peek at how your crew stacks up."
          bullets={[
            "Global, regional and friends-only boards",
            "Badges for top percentile, clutch streaks and event wins",
            "Seasonal ladders and game-specific rankings",
          ]}
          imageSrc="/images/feature-leaderboard.jpg"
          imageAlt="Avax.exe cross-game leaderboard with player rankings"
          reverse
        />

        {/* 3 - Chat & Social */}
        <FeatureRow
          icon={<MessageSquare className="h-3.5 w-3.5" />}
          tag="Social"
          title="Never solo-queue into silence again"
          description="avax.exe gives Avalanche players a shared lobby. Hang in the global chat, drop into per-game rooms, or DM teammates when you're ready to run it back."
          bullets={[
            "Global lobby, per-game chat rooms and private DMs",
            "Player cards with stats, favorite loadouts and history",
            "Presence statuses: grinding ranked, chilling, or LFG",
          ]}
          imageSrc="/images/feature-chat.jpg"
          imageAlt="Avax.exe chat interface with game rooms and messages"
        />

        {/* 4 - AI Discovery (reversed) */}
        <FeatureRow
          icon={<Sparkles className="h-3.5 w-3.5" />}
          tag="AI Co-Pilot"
          title="Let our AI line up your next Avalanche session"
          description="avax.exe learns how you play, which communities you vibe with, and how sweaty your average night looks. Then it suggests matches, events and new worlds that actually fit your energy."
          bullets={[
            "Tailored picks based on game time, genres and intensity",
            "Quick summaries so you can decide in seconds",
            "Warm-up, Sweat, and Chill Farm recommendation modes",
          ]}
          imageSrc="/images/feature-ai.jpg"
          imageAlt="Avax.exe AI game recommendation interface"
          reverse
        />
      </div>
    </section>
  )
}
