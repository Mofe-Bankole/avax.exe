"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { FriendsList } from "@/components/chat/friends-list";
import { ChatWindow } from "@/components/chat/chat-window";
import { ChatInput } from "@/components/chat/chat-input";
import { type Conversation, type Message } from "@/lib/chat-api";

export default function ChatPage() {
  const [selectedFriend, setSelectedFriend] = useState<Conversation>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [friendsData, setFriendsData] = useState<Map<string, Conversation>>(
    new Map(),
  );
  const friendsRef = useRef<Conversation[]>([]);

  const handleSelectFriend = useCallback(
    (friendId: string) => {
      // Look up friend from cached data
      const friend =
        friendsData.get(friendId) ||
        friendsRef.current.find((f) => f.friendId === friendId);

      if (friend) {
        setSelectedFriend(friend);
      } else {
        // Fallback: create basic friend object
        const newFriend: Conversation = {
          id: friendId,
          friendId: friendId,
          friendName: "Friend",
        };
        setSelectedFriend(newFriend);
      }
    },
    [friendsData],
  );

  const handleNewMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const handleFriendsLoaded = useCallback((friends: Conversation[]) => {
    friendsRef.current = friends;
    const friendsMap = new Map<string, Conversation>();
    friends.forEach((f) => friendsMap.set(f.friendId, f));
    setFriendsData(friendsMap);
  }, []);

  return (
    <div className="h-screen flex bg-background">
      {/* Friends Sidebar - 320px fixed width on desktop, full width on mobile when selected */}
      <div className="w-full md:w-80 flex-shrink-0 flex flex-col border-r border-border">
        <FriendsList
          selectedFriendId={selectedFriend?.friendId}
          onSelectFriend={handleSelectFriend}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {selectedFriend ? (
          <>
            <ChatWindow
              selectedFriend={selectedFriend}
              currentUserId="current-user"
              onNewMessage={handleNewMessage}
            />
            <ChatInput
              selectedFriend={selectedFriend}
              onMessageSent={handleNewMessage}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Start Conversation
              </h3>
              <p className="text-muted-foreground max-w-sm">
                Choose from your existing conversations, or start a new one.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Friends Drawer - shown on mobile */}
      {/* This would be a modal/drawer on mobile, for now just showing desktop layout */}
    </div>
  );
}
