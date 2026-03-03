'use client'

import { Conversation } from '@/lib/chat-api'
import Image from 'next/image'
import { Users, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface ProfileFriendsProps {
  friends: Conversation[]
  isLoading: boolean
}

export function ProfileFriends({ friends, isLoading }: ProfileFriendsProps) {
  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold mb-6 text-foreground flex items-center gap-2">
          <Users className="w-5 h-5" />
          Friends
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-secondary/50 rounded-lg p-4 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-3" />
              <div className="h-4 bg-muted rounded w-20 mx-auto mb-2" />
              <div className="h-3 bg-muted rounded w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (friends.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-bold text-foreground mb-2">No Friends Yet</h2>
        <p className="text-muted-foreground mb-6">
          Start connecting with other Avalanche gamers to build your network.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Go to Chat
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold mb-6 text-foreground flex items-center gap-2">
        <Users className="w-5 h-5" />
        Friends ({friends.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {friends.map((friend) => (
          <Link
            key={friend.friendId}
            href={`/chat?friend=${friend.friendId}`}
            className="group"
          >
            <div className="bg-secondary/50 rounded-lg p-4 hover:bg-secondary/80 hover:border-primary/50 border border-border transition-all cursor-pointer h-full flex flex-col">
              {/* Avatar */}
              <div className="mb-3 flex justify-center">
                {friend.friendAvatar ? (
                  <Image
                    src={friend.friendAvatar}
                    alt={friend.friendName}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover border-2 border-border group-hover:border-primary/50 transition-colors"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-xl font-bold text-white border-2 border-border group-hover:border-primary/50 transition-colors">
                    {friend.friendName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="font-semibold text-center text-foreground truncate group-hover:text-primary transition-colors">
                {friend.friendName}
              </h3>

              {/* Last Message Preview */}
              {friend.lastMessage && (
                <p className="text-xs text-muted-foreground text-center mt-2 line-clamp-2">
                  {friend.lastMessage}
                </p>
              )}

              {/* Last Message Time */}
              {friend.lastMessageTime && (
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {formatTime(friend.lastMessageTime)}
                </p>
              )}

              {/* Unread Badge */}
              {friend.unreadCount && friend.unreadCount > 0 && (
                <div className="mt-3 pt-3 border-t border-border text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {friend.unreadCount > 99 ? '99+' : friend.unreadCount}
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function formatTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  const weeks = Math.floor(diff / 604800000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  if (weeks < 4) return `${weeks}w ago`

  return new Date(timestamp).toLocaleDateString()
}
