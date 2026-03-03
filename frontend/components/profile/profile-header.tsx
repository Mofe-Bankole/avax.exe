'use client'

import { UserProfile } from '@/lib/chat-api'
import Image from 'next/image'
import { Copy, Check, Zap, Trophy, Users, Flame } from 'lucide-react'
import { useState } from 'react'

interface ProfileHeaderProps {
  user: UserProfile | null
  isLoading: boolean
}

export function ProfileHeader({ user, isLoading }: ProfileHeaderProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
        <div className="lg:col-span-1 bg-card rounded-2xl h-96 border border-border" />
        <div className="lg:col-span-2 space-y-4">
          <div className="h-24 bg-card rounded-xl border border-border" />
          <div className="h-24 bg-card rounded-xl border border-border" />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center text-muted-foreground">Failed to load profile</div>
    )
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Profile Card */}
      <div className="lg:col-span-1">
        <div className="bg-card rounded-2xl p-6 border border-border overflow-hidden relative h-fit">
          {/* Accent gradient */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-500/5 to-transparent rounded-full -ml-16 -mb-16" />

          {/* Avatar Container */}
          <div className="relative mb-6 flex justify-center">
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden ring-2 ring-red-500/20">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.username}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-500/30 to-red-600/20 flex items-center justify-center">
                  <span className="text-5xl font-bold text-red-500/80">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* User Name & Badge */}
          <div className="text-center mb-4 relative z-10">
            <h2 className="text-2xl font-bold text-foreground mb-1">{user.username}</h2>
            {user.role && (
              <div className="inline-block px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-xs font-semibold text-red-400">
                {user.role}
              </div>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-sm text-muted-foreground text-center mb-4 relative z-10">
              {user.bio}
            </p>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-4" />

          {/* Member Since */}
          <div className="text-center mb-4 relative z-10">
            <p className="text-xs text-muted-foreground mb-1">Member Since</p>
            <p className="text-sm font-semibold text-foreground">{memberSince}</p>
          </div>

          {/* Copyable Info */}
          <div className="space-y-2 relative z-10">
            {/* Email */}
            <div
              className="p-3 rounded-xl bg-background/50 hover:bg-background/80 transition-colors cursor-pointer group"
              onClick={() => copyToClipboard(user.email, 'email')}
            >
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-foreground truncate">{user.email}</p>
                {copiedField === 'email' ? (
                  <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 ml-2" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 ml-2" />
                )}
              </div>
            </div>

            {/* Wallet */}
            <div
              className="p-3 rounded-xl bg-background/50 hover:bg-background/80 transition-colors cursor-pointer group"
              onClick={() => copyToClipboard(user.walletAddress, 'wallet')}
            >
              <p className="text-xs text-muted-foreground mb-1">Wallet</p>
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono font-medium text-foreground truncate">
                  {user.walletAddress.slice(0, 10)}...{user.walletAddress.slice(-8)}
                </p>
                {copiedField === 'wallet' ? (
                  <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 ml-2" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 ml-2" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Stats Cards */}
      <div className="lg:col-span-2 space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={Trophy}
            label="Leaderboard Rank"
            value="#42"
            change="+5 this month"
            gradient="from-yellow-500/20 to-orange-500/10"
          />
          <StatCard
            icon={Zap}
            label="Games Played"
            value="142"
            change="+12 this season"
            gradient="from-purple-500/20 to-blue-500/10"
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={Flame}
            label="Win Rate"
            value="68%"
            change="+4% improvement"
            gradient="from-red-500/20 to-pink-500/10"
          />
          <StatCard
            icon={Users}
            label="Friends"
            value="24"
            change="2 new this week"
            gradient="from-cyan-500/20 to-blue-500/10"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  gradient,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  change: string
  gradient: string
}) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-xl p-4 border border-border/50 backdrop-blur-sm hover:border-border transition-colors relative overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/0 to-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
        <p className="text-xs text-muted-foreground">{change}</p>
      </div>
    </div>
  )
}
}
