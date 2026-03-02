import { Calendar, Trophy, Users, ArrowRight } from "lucide-react"

const tournaments = [
  {
    game: "Off The Grid",
    title: "OTG Season 3 Championship",
    date: "Mar 15, 2026",
    prize: "5,000 AVAX",
    players: "128 / 256",
    status: "Registering" as const,
  },
  {
    game: "Shrapnel",
    title: "Shrapnel Weekly Showdown",
    date: "Mar 8, 2026",
    prize: "1,200 AVAX",
    players: "64 / 64",
    status: "Full" as const,
  },
  {
    game: "DeFi Kingdoms",
    title: "DFK Heroes Arena",
    date: "Mar 22, 2026",
    prize: "2,500 AVAX",
    players: "45 / 128",
    status: "Registering" as const,
  },
  {
    game: "Pulsar",
    title: "Pulsar Invitational",
    date: "Apr 1, 2026",
    prize: "3,000 AVAX",
    players: "Coming soon",
    status: "Upcoming" as const,
  },
]

export default function TournamentSection() {
  return (
    <section id="tournaments" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-16">
        {/* Left - text + image */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
            <Trophy className="h-3.5 w-3.5" />
            Tournaments
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Compete for Avalanche rewards
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            Join tournaments hosted natively on avax.exe. Whether you{"'"}re a
            ranked grinder or a casual player, there{"'"}s a bracket waiting for
            you.
          </p>
          <div className="mt-2 overflow-hidden rounded-2xl border border-border shadow-2xl shadow-primary/5">
            <img
              src="/images/feature-tournaments.jpg"
              alt="Tournament bracket view on Avax.exe"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        {/* Right - tournament cards */}
        <div className="flex flex-1 flex-col gap-4">
          {tournaments.map((t, i) => (
            <div
              key={i}
              className="group cursor-pointer flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {t.game}
                </span>
                <StatusBadge status={t.status} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {t.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Trophy className="h-3.5 w-3.5" />
                  {t.prize}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {t.players}
                </span>
              </div>
              {t.status === "Registering" && (
                <button className="mt-1 flex w-fit items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80">
                  Register now
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatusBadge({ status }: { status: "Registering" | "Full" | "Upcoming" }) {
  const styles = {
    Registering: "border-green-500/30 bg-green-500/10 text-green-400",
    Full: "border-muted-foreground/30 bg-secondary text-muted-foreground",
    Upcoming: "border-primary/30 bg-primary/10 text-primary",
  }

  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  )
}
