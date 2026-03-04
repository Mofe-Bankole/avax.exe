 "use client";

import Navbar from "@/components/navbar";
import { useAuth } from "@/context/AuthContext";

export default function DashboardFeedPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-16">
          <div className="border border-dashed border-border rounded-2xl p-8 text-center space-y-4">
            <h1 className="text-2xl font-semibold">
              You&apos;re not logged in
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in with your wallet to see the profile you created during
              onboarding.
            </p>
            <a
              href="/onboard/gamer/login"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Go to login
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
              Your profile
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Welcome back,{" "}
              <span className="text-red-500">
                {user.username || "player"}
              </span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              This is the profile you shared with avax.exe during signup. You
              can use it across games, tournaments, and social features.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card/60 p-6 md:p-8 flex flex-col md:flex-row gap-8">
            {/* Avatar on the left */}
            <div className="flex-shrink-0 flex items-start justify-center md:justify-start">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center">
                {user.avatar ? (
                  // Avatar is a string URL; use img src directly
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatar}
                    alt={user.username ?? "Avatar"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl md:text-4xl font-bold text-red-500">
                    {(user.username || user.walletAddress || "A")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Details on the right */}
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {user.username || "Unnamed player"}
                </h2>
                {user.bio && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {user.bio}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <DetailRow label="Email" value={user.email ?? "Not provided"} />
                <DetailRow
                  label="Wallet"
                  value={
                    user.walletAddress
                      ? `${user.walletAddress.slice(
                          0,
                          10,
                        )}...${user.walletAddress.slice(-8)}`
                      : "Not connected"
                  }
                  mono
                />
                <DetailRow
                  label="Role"
                  value={(user as any).role ?? "PLAYER"}
                  pill
                />
                <DetailRow
                  label="User ID"
                  value={user.id ?? "—"}
                  mono
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
  pill,
}: {
  label: string;
  value: string;
  mono?: boolean;
  pill?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      {pill ? (
        <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium">
          {value}
        </span>
      ) : (
        <p
          className={`text-sm text-foreground ${
            mono ? "font-mono truncate" : ""
          }`}
        >
          {value}
        </p>
      )}
    </div>
  );
}

