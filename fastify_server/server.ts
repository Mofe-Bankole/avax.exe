import Fastify from "fastify";
import socketio from "@fastify/socket.io";
import logger from "./src/utils/logger";
import { ValidateEnv } from "./src/utils/validateEnv";
import { authRoutes } from "./src/routes/auth.routes";
import { gameRoutes } from "./src/routes/games.routes";
import { socialRoutes } from "./src/routes/social.routes";
import { tournamentRoutes } from "./src/routes/tournament.routes";
import * as prisma from "./src/database/prisma";

const app = Fastify({ logger: true });
const date = Intl.DateTimeFormat("EN-NG", { hour: "2-digit", minute: "2-digit", second: "2-digit" })

// Register Socket.io
app.register(socketio, {
  cors: {
    origin: "*", // Adjust for production
  },
});

app.ready((err) => {
  if (err) throw err;

  app.io.on("connection", (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on("join-conversation", (conversationId: string) => {
      socket.join(conversationId);
      logger.info(`Socket ${socket.id} joined conversation: ${conversationId}`);
    });

    socket.on("message", async (data: { conversationId?: string, hubId?: string, senderId: string, content: string }) => {
      const { conversationId, hubId, senderId, content } = data;

      try {
        if (hubId) {
          const savedMessage = await prisma.saveHubMessage(hubId, senderId, content);
          app.io.to(hubId).emit("message", savedMessage);
        } else if (conversationId) {
          const savedMessage = await prisma.saveMessage(conversationId, senderId, content);
          app.io.to(conversationId).emit("message", savedMessage);
        }
      } catch (error) {
        logger.error(error, "Failed to save/emit socket message");
      }
    });

    socket.on("disconnect", () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });
});

app.listen({ port: 4070 }, async function (err, address) {
  if (err) {
    logger.info(`${err}`);
  }

  // Initialize Global Hub
  try {
    const globalHub = await prisma.getOrCreateHub("global-avax", true);
    logger.info(`Global Hub initialized: ${globalHub.id}`);
  } catch (error) {
    logger.error(error, "Failed to initialize Global Hub");
  }
});

app.get("/api/v1/health", (req, res) => {
  return res.status(200).send({
    success: true,
    message: "Avax.exe Health Route",
    date: date.format(),
    build: "v1",
    ip: req.ip
  })
})

app.register(authRoutes)
app.register(gameRoutes)
app.register(socialRoutes)
app.register(tournamentRoutes)
app.printRoutes()

export default app;
