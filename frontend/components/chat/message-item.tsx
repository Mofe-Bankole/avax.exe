'use client'

import { type Message } from '@/lib/chat-api'

interface MessageItemProps {
  message: Message
  isCurrentUser: boolean
}

export function MessageItem({ message, isCurrentUser }: MessageItemProps) {
  return (
    <div
      className={`flex gap-2 mb-4 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isCurrentUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-card-foreground'
          }`}
        >
          {isCurrentUser ? 'You' : message.senderName?.charAt(0).toUpperCase() || '?'}
        </div>
      </div>

      {/* Message bubble */}
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2 rounded-lg max-w-xs word-wrap ${
            isCurrentUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-card-foreground'
          }`}
        >
          <p className="text-sm">{message.text}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  )
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()

  // If today, show time
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  // If yesterday
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  }

  // If within last week, show day
  const oneWeekAgo = new Date(now)
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  if (date > oneWeekAgo) {
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  // Otherwise show date
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
