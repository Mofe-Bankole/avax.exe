import { ArrowRight } from "lucide-react"

const footerLinks = {
  Platform: [
    { label: "Features", href: "#features" },
    { label: "Leaderboards", href: "#leaderboards" },
    { label: "Tournaments", href: "#tournaments" },
    { label: "AI Discovery", href: "#ai" },
  ],
  Builders: [
    { label: "SDK Docs", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Bot Framework", href: "#" },
    { label: "List Your Game", href: "#" },
  ],
  Community: [
    { label: "Discord", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Newsletter", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      {/* Final CTA */}
      <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          The Avalanche gaming community starts here
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Join the growing network of players, guilds and studios building on Avalanche. Your next session is one click away.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(232,65,66,0.3)]"
          >
            Launch avax.exe
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#"
            className="flex items-center gap-2 rounded-full border border-border bg-secondary px-7 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:border-muted-foreground/40"
          >
            Read the docs
          </a>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 md:flex-row md:justify-between">
          {/* Logo col */}
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <span className="text-xs font-bold text-primary-foreground">A</span>
              </div>
              <span className="text-base font-bold text-foreground">
                avax<span className="text-primary">.exe</span>
              </span>
            </a>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              An independent Avalanche-native social hub for gamers. Built for the ecosystem, by the ecosystem.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] text-muted-foreground">
                iOS companion soon
              </span>
              <span className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] text-muted-foreground">
                Android companion soon
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <p className="text-xs text-muted-foreground">
            2026 avax.exe. Not affiliated with Ava Labs.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
