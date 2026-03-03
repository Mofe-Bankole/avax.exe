'use client'

import { useState, useEffect } from 'react'
import { getFriendsList, searchFriends, type Conversation } from '@/lib/chat-api'

interface FriendsListProps {
  selectedFriendId?: string
  onSelectFriend: (friendId: string) => void
}

export function FriendsList({ selectedFriendId, onSelectFriend }: FriendsListProps) {
  const [friends, setFriends] = useState<Conversation[]>([])
  const [filteredFriends, setFilteredFriends] = useState<Conversation[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'requests'>('all')

  useEffect(() => {
    loadFriends()
  }, [])

  const loadFriends = async () => {
    setIsLoading(true)
    const friendsList = await getFriendsList()
    setFriends(friendsList)
    setFilteredFriends(friendsList)
    setIsLoading(false)
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (query.trim() === '') {
      setFilteredFriends(friends)
      return
    }

    const results = await searchFriends(query)
    setFilteredFriends(results)
  }

  const displayFriends = activeTab === 'all' ? filteredFriends : []

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-xl font-bold text-sidebar-foreground mb-4">Chat</h2>

        {/* Search bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-sidebar-accent text-sidebar-foreground placeholder-sidebar-accent-foreground/50 rounded-full py-2 pl-4 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-sidebar-primary"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-sidebar-foreground text-sidebar'
                : 'bg-transparent text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'requests'
                ? 'bg-sidebar-foreground text-sidebar'
                : 'bg-transparent text-sidebar-foreground hover:bg-sidebar-accent'
            }`}
          >
            Requests
          </button>
        </div>
      </div>

      {/* Friends list */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-sidebar-accent-foreground/50">
            Loading conversations...
          </div>
        ) : displayFriends.length === 0 ? (
          <div className="p-4 text-center text-sidebar-accent-foreground/50">
            {searchQuery ? 'No results found' : 'No conversations yet'}
          </div>
        ) : (
          <div className="divide-y divide-sidebar-border">
            {displayFriends.map((friend) => (
              <button
                key={friend.friendId}
                onClick={() => onSelectFriend(friend.friendId)}
                className={`w-full text-left px-4 py-3 hover:bg-sidebar-accent transition-colors border-l-2 ${
                  selectedFriendId === friend.friendId
                    ? 'border-l-sidebar-primary bg-sidebar-accent'
                    : 'border-l-transparent'
                }`}
              >
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm">
                      {friend.friendName?.charAt(0).toUpperCase() || '?'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-sidebar-foreground truncate">
                        {friend.friendName}
                      </h3>
                      {friend.lastMessageTime && (
                        <span className="text-xs text-sidebar-accent-foreground/50 flex-shrink-0">
                          {formatTimeAgo(friend.lastMessageTime)}
                        </span>
                      )}
                    </div>
                    {friend.lastMessage && (
                      <p className="text-sm text-sidebar-accent-foreground/70 truncate">
                        {friend.lastMessage}
                      </p>
                    )}
                  </div>

                  {/* Unread indicator */}
                  {friend.unreadCount && friend.unreadCount > 0 && (
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-sidebar-primary"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function formatTimeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  const weeks = Math.floor(diff / 604800000)

  if (minutes < 1) return 'now'
  if (minutes < 60) return `${minutes}m`
  if (hours < 24) return `${hours}h`
  if (days < 7) return `${days}d`
  if (weeks < 4) return `${weeks}w`

  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
