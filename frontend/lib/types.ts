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
  avatar: string;
  bio: string;
  role: string;
  studioName: string;
  socials: [];
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
  signUp: (walletAddress: string) => Promise<string>;
  signOut: () => Promise<void>;
};

export type Session = {
  owner: User;
  token: string;
};

export type LoginInput = {
  walletAddress: string;
};
