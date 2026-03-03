'use client'

import { useState } from 'react'
import { sendMessage, type Message, type Conversation } from '@/lib/chat-api'

interface ChatInputProps {
  selectedFriend?: Conversation
  onMessageSent?: (message: Message) => void
  isLoading?: boolean
}

export function ChatInput({ selectedFriend, onMessageSent, isLoading }: ChatInputProps) {
  const [messageText, setMessageText] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!messageText.trim() || !selectedFriend || isSending) {
      return
    }

    setIsSending(true)

    const message = await sendMessage(selectedFriend.id, messageText.trim())

    if (message) {
      setMessageText('')
      onMessageSent?.(message)
    }

    setIsSending(false)
  }

  if (!selectedFriend) {
    return null
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="px-6 py-4 border-t border-border bg-background"
    >
      <div className="flex gap-3 items-end">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Aa"
          disabled={isLoading || isSending}
          className="flex-1 bg-input text-foreground placeholder-muted-foreground rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!messageText.trim() || isSending || isLoading}
          className="flex-shrink-0 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {isSending ? (
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
            </svg>
          )}
        </button>
      </div>
    </form>
  )
}
