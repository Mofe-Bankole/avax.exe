import { Conversation, Message, UserProfile, UserStats } from "./types";

const API_BASE = 'http://localhost:4070'

export interface User {
  id: string;
  username: string;
  avatar?: string;
  status?: "online" | "offline";
}

// Fetch all friends (accepted connections)
export async function getFriendsList(): Promise<Conversation[]> {
  try {
    const response = await fetch(`${API_BASE}/api/friends`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data || []
  } catch (error) {
    console.error('[v0] Failed to fetch friends list:', error)
    return []
  }
}

// Fetch messages for a specific conversation
export async function getMessages(
  conversationId: string,
  limit: number = 50
): Promise<Message[]> {
  try {
    const response = await fetch(
      `${API_BASE}/api/messages/${conversationId}?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data || []
  } catch (error) {
    console.error('[v0] Failed to fetch messages:', error)
    return []
  }
}

// Send a new message
export async function sendMessage(
  conversationId: string,
  text: string
): Promise<Message | null> {
  try {
    const response = await fetch(`${API_BASE}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationId,
        text,
        timestamp: Date.now(),
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('[v0] Failed to send message:', error)
    return null
  }
}

// Search friends
export async function searchFriends(query: string): Promise<Conversation[]> {
  try {
    const response = await fetch(`${API_BASE}/api/friends/search?q=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data || []
  } catch (error) {
    console.error('[v0] Failed to search friends:', error)
    return []
  }
}

// Mark conversation as read
export async function markAsRead(conversationId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/conversations/${conversationId}/read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.ok
  } catch (error) {
    console.error('[v0] Failed to mark as read:', error)
    return false
  }
}

// Profile-related interfaces


// Fetch user profile
export async function getUserProfile(userId?: string): Promise<UserProfile | null> {
  try {
    const endpoint = userId ? `/api/users/${userId}` : '/api/users/me'
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('[v0] Failed to fetch user profile:', error)
    return null
  }
}

// Fetch user stats
export async function getUserStats(userId?: string): Promise<UserStats | null> {
  try {
    const endpoint = userId ? `/api/users/${userId}/stats` : '/api/users/me/stats'
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('[v0] Failed to fetch user stats:', error)
    return null
  }
}
