"use client";

import { useEffect, useState } from "react";
import { getUserProfile, getUserStats, getFriendsList } from "@/lib/chat-api";
import {
  type UserProfile,
  type UserStats,
  type Conversation,
} from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileStats } from "@/components/profile/profile-stats";
import { ProfileFriends } from "@/components/profile/profile-friends";

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [friends, setFriends] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [profileData, statsData, friendsData] = await Promise.all([
          getUserProfile(),
          getUserStats(),
          getFriendsList(),
        ]);

        if (!profileData) {
          setError("Failed to load profile. Please try again.");
          return;
        }

        setUser(profileData);
        setStats(statsData);
        setFriends(friendsData || []);
      } catch (err) {
        console.error("[v0] Error fetching profile:", err);
        setError("An error occurred while loading your profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-secondary/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link
            href="/chat"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <h1 className="text-xl font-bold text-foreground flex-1">
            My Profile
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">
        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4 text-destructive">
            {error}
          </div>
        )}

        {/* Profile Header */}
        <ProfileHeader user={user} isLoading={isLoading} />

        {/* Stats */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Statistics
          </h2>
          <ProfileStats stats={stats} isLoading={isLoading} />
        </section>

        {/* Friends List */}
        <section>
          <ProfileFriends friends={friends} isLoading={isLoading} />
        </section>
      </div>
    </main>
  );
}
