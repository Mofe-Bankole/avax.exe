// routes/friends.ts
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { Prisma } from '../generated/prisma'

export default async function friendsRoutes(fastify: FastifyInstance) {
  fastify.get('/api/v1/friends', {
    onRequest: [fastify.authenticate], // ← requires JWT / logged in user

    schema: {
      response: {
        200: z.object({
          success: z.literal(true),
          friends: z.array(
            z.object({
              id: z.string(),
              username: z.string(),
              walletAddress: z.string(),
              avatar: z.string().nullable(),
              bio: z.string().nullable(),
              // Optional: last message preview, last active, etc.
              lastMessageAt: z.date().nullable().optional(),
              unreadCount: z.number().optional(),
            })
          ),
          count: z.number(),
        }),
        401: z.object({ success: z.literal(false), error: z.string() }),
      },
    },
  }, async (request, reply) => {
    // @ts-expect-error – jwtVerify adds user to request
    const currentUserId = request.user.sub

    try {
      // Find all conversations where current user is participant A or B
      const conversations = await Prisma.conversation.findMany({
        where: {
          OR: [
            { participantOneId: currentUserId },
            { participantTwoId: currentUserId },
          ],
        },
        select: {
          id: true,
          createdAt: true,
          participantOne: {
            select: {
              id: true,
              username: true,
              walletAddress: true,
              avatar: true,
              bio: true,
            },
          },
          participantTwo: {
            select: {
              id: true,
              username: true,
              walletAddress: true,
              avatar: true,
              bio: true,
            },
          },
          messages: {
            // Optional: get the most recent message timestamp
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: { createdAt: true },
          },
        },
        orderBy: [
          // Sort by most recent message (if any), fallback to conversation creation
          { messages: { _max: { createdAt: 'desc' } } },
          { createdAt: 'desc' },
        ],
      })

      // Transform to flat friend list + remove self
      const friends = conversations
        .map((conv) => {
          const other =
            conv.participantOne.id === currentUserId
              ? conv.participantTwo
              : conv.participantOne

          return {
            id: other.id,
            username: other.username,
            walletAddress: other.walletAddress,
            avatar: other.avatar,
            bio: other.bio,
            lastMessageAt: conv.messages[0]?.createdAt ?? conv.createdAt,
          }
        })
        // Optional: filter out invalid/empty entries
        .filter((f) => f.id !== currentUserId)

      return {
        success: true,
        friends,
        count: friends.length,
      }
    } catch (err) {
      fastify.log.error(err)
      reply.code(500).send({
        success: false,
        error: 'Failed to fetch friends',
      })
    }
  })
}