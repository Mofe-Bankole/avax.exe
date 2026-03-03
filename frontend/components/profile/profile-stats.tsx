'use client'

import { UserStats } from '@/lib/chat-api'
import { Trophy, Gamepad2, Target, Award, Zap, TrendingUp } from 'lucide-react'

interface ProfileStatsProps {
  stats: UserStats | null
  isLoading: boolean
}

export function ProfileStats({ stats, isLoading }: ProfileStatsProps) {
  const statItems = [
    {
      label: 'Rank',
      value: stats?.leaderboardRank ?? '--',
      suffix: '#',
      icon: Trophy,
      gradient: 'from-yellow-500/20 to-orange-500/10',
      accent: 'text-yellow-400',
    },
    {
      label: 'Games Played',
      value: stats?.totalGamesPlayed ?? 0,
      icon: Gamepad2,
      gradient: 'from-blue-500/20 to-cyan-500/10',
      accent: 'text-blue-400',
    },
    {
      label: 'Games Won',
      value: stats?.gamesWon ?? 0,
      icon: Target,
      gradient: 'from-green-500/20 to-emerald-500/10',
      accent: 'text-green-400',
    },
    {
      label: 'Total Score',
      value: stats?.totalScore ?? 0,
      icon: Zap,
      gradient: 'from-red-500/20 to-pink-500/10',
      accent: 'text-red-400',
    },
    {
      label: 'Achievements',
      value: stats?.achievementsUnlocked ?? 0,
      icon: Award,
      gradient: 'from-purple-500/20 to-violet-500/10',
      accent: 'text-purple-400',
    },
    {
      label: 'Win Rate',
      value: stats?.gamesWon && stats?.totalGamesPlayed 
        ? Math.round((stats.gamesWon / stats.totalGamesPlayed) * 100) 
        : 0,
      suffix: '%',
      icon: TrendingUp,
      gradient: 'from-cyan-500/20 to-blue-500/10',
      accent: 'text-cyan-400',
    },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-5 animate-pulse"
          >
            <div className="h-4 bg-muted rounded w-24 mb-3" />
            <div className="h-8 bg-muted rounded w-16" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statItems.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.gradient} border border-border/50 rounded-xl p-5 hover:border-border transition-all duration-300 group relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/0 to-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
                <Icon className={`w-4 h-4 ${stat.accent} opacity-70`} />
              </div>
              <p className={`text-3xl font-bold ${stat.accent}`}>
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                {stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
