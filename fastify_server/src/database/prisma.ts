import { config } from "../config/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import logger from "../utils/logger";
import { IUser } from "../types/types";

const connectionString =
  config.postgres?.connection_string || process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });

prisma
  .$connect()
  .then(() => logger.info("PRISMA CONNECTED SUCCESSFULLY"))
  .catch((err) => logger.error(err, "PRISMA CONNECTION FAILED"));

export async function saveUser(model: IUser): Promise<any> {
  // Generates a complex unique ID using date, time, and random bytes
  const id = [
    Date.now(), // milliseconds since epoch
    process.hrtime.bigint().toString(), // nanosecond precision
    Math.floor(Math.random() * 1e8).toString(36), // random base36 segment for more uniqueness
  ].join("_");

  const user = await prisma.user.create({
    data: {
      username: model.username,
      id: id,
      email: model.email,
      avatar: model.avatar,
      bio: model.bio,
      walletAddress: model.walletAddress,
    },
  });
  logger.info("USER CREATED SUCCESSFULLY");

  if (!user) {
    return {
      success: false,
      action: "insert",
      date: Date.now.toString(),
    };
  }

  return {
    success: true,
    action: "insert",
    date: Date.now.toString(),
  };
}

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function getUser(walletaddr: string) {
  if (!walletaddr) {
    return {
      success: "false",
      user: null,
      error: "Wallet Address not supplied",
    };
  }

  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        walletAddress: walletaddr,
      },
    });

    return {
      success: true,
      user,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      user: null,
      error: error instanceof Error ? error.message : "Unknown database error",
    };
  }
}

// --- SOCIAL HELPERS (Sprint 1) ---

export async function getOrCreateConversation(
  participantOneId: string,
  participantTwoId: string,
) {
  // Sort IDs to ensure uniqueness in the pair
  const [p1, p2] = [participantOneId, participantTwoId].sort();

  let conversation = await prisma.conversation.findUnique({
    where: {
      participantOneId_participantTwoId: {
        participantOneId: p1,
        participantTwoId: p2,
      },
    },
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        participantOneId: p1,
        participantTwoId: p2,
      },
    });
  }

  return conversation;
}

export async function saveMessage(
  conversationId: string,
  senderId: string,
  content: string,
) {
  try {
    if (!conversationId || !senderId || !content) {
      return {
        info: "FAILED TO CREATE MESSAGE",
        success: false,
        error: "Variable(s) was not supplied",
      };
    }
    prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
      },
    });
    return {
      info: "MESSAGE CREATED",
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      info: "FAILED TO CREATE MESSAGE",
      success: false,
      error: error instanceof Error ? error.message : "UNKNOWN DATABASE ERROR",
    };
  }
}

export async function fetchAllTitles() {
  return prisma.game.findMany();
}

export async function getConversationMessages(conversationId: string) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    include: { sender: true },
  });
}

// --- TOURNAMENT HELPERS (Sprint 3) ---

export async function getAllTournaments() {
  return prisma.tournament.findMany({
    include: { game: true, studio: true },
  });
}

export async function getTournamentById(id: string) {
  return prisma.tournament.findUnique({
    where: { id },
    include: {
      game: true,
      studio: true,
      submissions: { include: { user: true } },
    },
  });
}

export async function createSubmission(
  tournamentId: string,
  userId: string,
  proofText: string,
) {
  return prisma.submission.create({
    data: {
      tournamentId,
      userId,
      proofText,
    },
  });
}

export async function updateSubmissionStatus(
  id: string,
  status: "APPROVED" | "REJECTED",
) {
  return prisma.submission.update({
    where: { id },
    data: { status },
  });
}

export function editUser() {}
export function deleteUser() {}
export function addFriend() {}
export async function addAvalancheSupportedTitle(game: {
  id: string;
  name: string;
  description: string;
  studioId: string;
  images: string[];
  coverImage: string;
  logo: string;
}) {
  const gameExists = await prisma.game.findUnique({ where: { id: game.id } });
  if (gameExists) {
    return Promise.resolve();
  }
  return prisma.game.create({
    data: {
      id: game.id,
      name: game.name,
      description: game.description,
      coverUrl: game.coverImage,
      studioId: game.studioId,
      images: game.images,
      logo: game.logo,
    },
  });
}
export function getAvalancheSupportedTitles() {}
export function registerGameStudio() {}
export function registerTournament() {}
export function deleteTournament() {}
export function addUserCatalouge() {}
export function addCommunity() {}
export function addCommunityPost() {}
export function addPost() {}
export function registerSuppliedUserToCommunity() {}
export function verifyCommunity() {}
