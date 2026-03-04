import { StaticImageData } from "next/image";

export type LeaderboardRowProps = {
  rank: number;
  name: string;
  mmr: string;
  wr: string;
  highlight?: boolean;
  imageUrl: StaticImageData;
};

export type User = {
  username: string;
  id: string;
  walletAddress: string;
  email: string;
  avatar?: string;
  bio?: string;
};

export type StatPillProps = {
  label: string;
  value: string;
  caption: string;
};

export type FeatureCardProps = {
  title: string;
  accent: string;
  description: string;
  children?: React.ReactNode;
};

export type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  error?: string;
  signIn: (walletAddress: string) => Promise<Session>;
  signUp: (params: SignUp) => Promise<{ success: boolean; message: string }>;
  signOut: () => Promise<void>;
  user: unknown;
};

export type Session = {
  owner: User;
  token: string;
};
export type SignUp = {
  username: string;
  walletAddress: string;
  email: string;
  avatar?: string;
  bio?: string;
};

export type LoginInput = {
  walletAddress: string;
};

export interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: number;
  senderName?: string;
  senderAvatar?: string;
}

export interface Conversation {
  id: string;
  friendId: string;
  friendName: string;
  friendAvatar?: string;
  lastMessage?: string;
  lastMessageTime?: number;
  unreadCount?: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  walletAddress: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  studioName?: string;
  studioDescription?: string;
  studioBannerUrl?: string;
  studioLogoUrl?: string;
  studioWebsite?: string;
  studioTwitter?: string;
  studioInstagram?: string;
  studioDiscord?: string;
  isVerified: boolean;
}

export interface UserStats {
  totalGamesPlayed?: number;
  leaderboardRank?: number;
  gamesWon?: number;
  totalScore?: number;
  achievementsUnlocked?: number;
  friendsCount?: number;
}
