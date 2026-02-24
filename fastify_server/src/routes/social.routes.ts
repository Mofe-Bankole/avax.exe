import { FastifyInstance } from "fastify";
import * as prisma from "../database/prisma";
import logger from "../utils/logger";

export async function socialRoutes(app: FastifyInstance) {
    // Get/Create a conversation between two users
    app.post("/api/v1/social/conversations", async (req, res) => {
        const { participantOneId, participantTwoId } = req.body as { participantOneId: string, participantTwoId: string };

        if (!participantOneId || !participantTwoId) {
            return res.status(400).send({ message: "Participant IDs are required", success: false });
        }

        try {
            const conversation = await prisma.getOrCreateConversation(participantOneId, participantTwoId);
            return res.status(200).send({ conversation, success: true });
        } catch (error) {
            logger.error(error, "getOrCreateConversation failed");
            return res.status(500).send({ error: "Failed to manage conversation", success: false });
        }
    });

    // Get message history for a conversation
    app.get("/api/v1/social/messages/:conversationId", async (req, res) => {
        const { conversationId } = req.params as { conversationId: string };

        try {
            const messages = await prisma.getConversationMessages(conversationId);
            return res.status(200).send({ messages, success: true });
        } catch (error) {
            logger.error(error, "getConversationMessages failed");
            return res.status(500).send({ error: "Failed to fetch messages", success: false });
        }
    });

    // --- HUB ENDPOINTS ---

    // Get the global hub
    app.get("/api/v1/social/hubs/global", async (req, res) => {
        try {
            const hub = await prisma.getOrCreateHub("global-avax", true);
            return res.status(200).send({ hub, success: true });
        } catch (error) {
            logger.error(error, "getGlobalHub failed");
            return res.status(500).send({ error: "Failed to fetch global hub", success: false });
        }
    });

    // Get message history for a hub
    app.get("/api/v1/social/hubs/:hubId/messages", async (req, res) => {
        const { hubId } = req.params as { hubId: string };
        try {
            const messages = await prisma.getHubMessages(hubId);
            return res.status(200).send({ messages, success: true });
        } catch (error) {
            logger.error(error, "getHubMessages failed");
            return res.status(500).send({ error: "Failed to fetch hub messages", success: false });
        }
    });
}
