export type Config = {
  PORT: string | undefined;
  NODE: {
    enviroment: string | undefined;
    version?: string;
    build?: string;
  };
  avalanche: {
    mainnet_rpc: string | undefined;
    testnet_rpc: string | undefined;
  }
  postgres : {
    connection_string : string;
  };
  max_requests : string
  window_ms : string
};

// Prisma schema based on the provided TypeScript types

//////////////////////
// USER
//////////////////////

export interface IUser {
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  walletAddress : string
}

//////////////////////
// SOCIALS
//////////////////////

export type SocialPlatform =
  | "X"
  | "GOOGLE"
  | "SPOTIFY"
  | "LINKEDIN"
  | "DISCORD"
  | "GITHUB";

export interface ISocial {
  id: string;
  platform: SocialPlatform;
  url: string;
  userId: string;
}

//////////////////////
// FRIENDS
//////////////////////

export type FriendStatus = "PENDING" | "ACCEPTED" | "BLOCKED";

export interface IFriend {
  id: string;
  senderId: string;
  receiverId: string;
  status: FriendStatus;
  createdAt: Date;
}

//////////////////////
// DIRECT CHAT
//////////////////////

export interface IDirectConversation {
  id: string;
  userOneId: string;
  userTwoId: string;
  createdAt: Date;
}

export interface IDirectMessage {
  id: string;
  content: string;
  conversationId: string;
  senderId: string;
  createdAt: Date;
  edited: boolean;
}

//////////////////////
// ROOMS
//////////////////////

export type RoomType = "PUBLIC" | "PRIVATE" | "TOURNAMENT";
export type RoomRole = "ADMIN" | "MODERATOR" | "MEMBER";

export interface IChatRoom {
  id: string;
  name: string;
  description?: string;
  type: RoomType;
  createdAt: Date;
}

export interface IRoomMessage {
  id: string;
  content: string;
  senderId: string;
  roomId: string;
  createdAt: Date;
  edited: boolean;
}

//////////////////////
// TOURNAMENTS
//////////////////////

export interface ITournament {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface ITournamentParticipant {
  id: string;
  userId: string;
  tournamentId: string;
}
//////////////////////
// GAMES
//////////////////////

export interface IGame {
  id: string;
  title: string;
  description?: string;
  studio?: string;
  releaseDate?: Date;
  coverUrl?: string;
  createdAt: Date;
}

export interface IUserGame {
  id: string;
  userId: string;
  gameId: string;
  addedAt: Date;
  skillLevel?: number;
}

export interface ITag {
  id: string;
  name: string;
  color?: string;
}

export interface IGameTag {
  id: string;
  gameId: string;
  tagId: string;
}