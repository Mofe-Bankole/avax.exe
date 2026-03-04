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
