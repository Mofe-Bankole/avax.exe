 "use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileStats } from "@/components/profile/profile-stats";
import { type UserProfile, type UserStats } from "@/lib/chat-api";
import { useAuth } from "@/context/AuthContext";

type AvalancheTitle = {
  id: string;
  name: string;
  description?: string;
  coverUrl?: string;
  logo?: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4070";

export default function DashboardFeedPage() {
  const { session } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [titles, setTitles] = useState<AvalancheTitle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch profile + lightweight stats from the backend stats endpoint
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
        if (session?.token) {
          headers["Authorization"] = `Bearer ${session.token}`;
        }

        const statsRes = await fetch(`${API_BASE}/api/v1/profile/stats/me`, {
          method: "POST",
          headers,
        });

        if (statsRes.ok) {
          const statsJson = await statsRes.json();
          const userFromApi =
            statsJson.data?.user ?? statsJson.data?.userStats?.user;
          if (userFromApi) {
            setUserProfile(userFromApi as UserProfile);
          }
        }

        // Fetch Avalanche titles for the main feed rail
        const titlesRes = await fetch(`${API_BASE}/api/v1/avalanche/titles`);
        console.log(tit)
        if (titlesRes.ok) {
          const titlesJson = await titlesRes.json();
          setTitles(titlesJson.data ?? []);
        }
      } catch (err) {
        console.error("Failed to load dashboard feed", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [session?.token]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero / Heading */}
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            Personalized feed
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Your Avalanche <span className="text-red-500">feed</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
            Jump back into your sessions, explore supported titles, and keep up
            with what&apos;s happening on avax.exe.
          </p>
        </section>

        {/* Profile overview */}
        <section>
          <ProfileHeader user={userProfile} isLoading={loading} />
          <div className="mt-8">
            <ProfileStats stats={userStats} isLoading={loading} />
          </div>
        </section>

        {/* Avalanche game feed */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Avalanche Titles</h2>
            <p className="text-xs text-muted-foreground">
              Pulled live from your avax.exe backend
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {titles.map((game) => (
              <div
                key={game.id}
                className="group relative rounded-2xl border border-neutral-800 bg-neutral-950/80 overflow-hidden hover:border-red-500/60 transition-colors"
              >
                {game.coverUrl && (
                  <div
                    className="h-32 w-full bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity"
                    style={{ backgroundImage: `url(${game.coverUrl})` }}
                  />
                )}
                <div className="p-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-red-400/80">
                    Avalanche title
                  </p>
                  <h3 className="text-lg font-semibold truncate">
                    {game.name}
                  </h3>
                  {game.description && (
                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {game.description}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {!loading && titles.length === 0 && (
              <div className="col-span-full border border-dashed border-border/70 rounded-2xl p-8 text-center text-sm text-muted-foreground">
                No Avalanche titles registered yet. Add games via the backend
                to see them appear in this feed.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}