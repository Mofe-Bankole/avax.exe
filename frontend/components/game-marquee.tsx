"use client"

const items = [
  "Off The Grid",
  "Shrapnel",
  "DeFi Kingdoms",
  "Pulsar",
  "Beam",
  "MapleStory Universe",
  "Merit Circle",
  "TSM",
  "GUNZ",
  "Highrise",
  "Bikerz"
]

export default function GameMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-card/50 py-5">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex animate-marquee gap-8">
        {[...items, ...items].map((game, i) => (
          <span
            key={i}
            className="flex-shrink-0 whitespace-nowrap text-sm font-semibold uppercase tracking-widest text-muted-foreground/50"
          >
            {game}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
