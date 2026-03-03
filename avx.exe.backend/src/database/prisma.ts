import { config } from "../config/config";
import { Prisma, PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import logger from "../utils/logger";
import { EditProfileInput, IUser } from "../types/types";

const connectionString =
  config.postgres?.connection_string || process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });

prisma
  .$connect()
  .then(() => logger.info("PRISMA CONNECTED SUCCESSFULLY"))
  .catch((err) => logger.error(err, "PRISMA CONNECTION FAILED"));

export async function editProfile(data: EditProfileInput) {
  const { walletAddress, ...updateFields } = data;
  try {
    const updatedUser = await prisma.user.update({
      where: { walletAddress },
      data: {
          username: updateFields.username,
          avatar: updateFields.avatar,
          bio: updateFields.bio,
          studioName: updateFields.studioName,
          studioDescription: updateFields.studioDescription,
          studioBannerUrl: updateFields.studioBannerUrl,
          studioLogoUrl: updateFields.studioLogoUrl,
          studioWebsite: updateFields.studioWebsite,
          studioTwitter: updateFields.studioTwitter,
          studioInstagram: updateFields.studioInstagram,
          studioDiscord: updateFields.studioDiscord,
        },
        select: {
          id: true,
          walletAddress: true,
          username: true,
          avatar: true,
          bio: true,
          role: true,
          studioName: true,
          studioDescription: true,
          studioBannerUrl: true,
          studioLogoUrl: true,
          studioWebsite: true,
          studioTwitter: true,
          studioInstagram: true,
          studioDiscord: true,
          isVerified: true,
          updatedAt: true,
        },
      });
  
      return { success: true, user: updatedUser };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          // unique constraint failed (most likely username)
          return { success: false, error: "Username already taken" };
        }
      }
      console.error("editProfile failed:", error);
      return { success: false, error: "Failed to update profile" };
    }
}

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
    console.log(user)
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

export async function startConversation({
  userId1,
  userId2,
}: {
  userId1: string;
  userId2: string;
}) {
  // Sort IDs so order doesn't matter (prevents duplicate convos)
  const [participantOneId, participantTwoId] = [userId1, userId2].sort();

  try {
    // Try to find existing conversation first (idempotent)
    let conversation = await prisma.conversation.findUnique({
      where: {
        participantOneId_participantTwoId: {
          participantOneId,
          participantTwoId,
        },
      },
      include: {
        participantOne: { select: { id: true, username: true, avatar: true } },
        participantTwo: { select: { id: true, username: true, avatar: true } },
      },
    });

    if (!conversation) {
      // Create new one
      conversation = await prisma.conversation.create({
        data: {
          participantOneId,
          participantTwoId,
        },
        include: {
          participantOne: { select: { id: true, username: true, avatar: true } },
          participantTwo: { select: { id: true, username: true, avatar: true } },
        },
      });
    }

    return { success: true, conversation };
  } catch (error) {
    console.error("startConversation failed:", error);
    return { success: false, error: "Could not start conversation" };
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

export async function saveMessage({
  conversationId,
  senderId,
  content,
}: {
  conversationId: string;
  senderId: string;
  content: string;
}) {
  if (!content.trim()) {
    return { success: false, error: "Message Content cannot be empty" };
  }

  try {
    // Optional: verify sender is actually part of the conversation
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: {
        participantOneId: true,
        participantTwoId: true,
      },
    });

    if (!conversation) {
      return { success: false, error: "Conversation not found" };
    }

    if (
      senderId !== conversation.participantOneId &&
      senderId !== conversation.participantTwoId
    ) {
      return { success: false, error: "Not a participant in this conversation" };
    }

    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        content: content.trim(),
      },
      include: {
        sender: {
          select: { id: true, username: true, avatar: true },
        },
      },
    });

    return { success: true, message };
  } catch (error) {
    console.error("saveMessage failed:", error);
    return { success: false, error: "Failed to send message" };
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
      // id: game.id,
      images: game.images,
      coverUrl: game.coverImage,
      logo: game.logo,
      studioId: game.studioId,
      name: game.name,
      description: game.description,
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

export async function getUserStats(walletAddress: string) {

  if(!walletAddress){
    return {
      user : null,
      success : false ,
      error : "Wallet Address not Supplied"
    }
  }
  const user = await prisma.user.findFirst({
    where: { walletAddress },
    include: {
      conversationsA: {
        include: {
          participantTwo: {
            select: { id: true, username: true, avatar: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 20,              
      },
      conversationsB: {
        include: {
          participantOne: {
            select: { id: true, username: true, avatar: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  });
  

  return {
    user : user,
    success : true,
    error : null
  };
}