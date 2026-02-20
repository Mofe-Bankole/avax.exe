import Fastify from "fastify";
import socketio from "@fastify/socket.io";
import logger from "./src/utils/logger";
import { ValidateEnv } from "./src/utils/validateEnv";

export const app = Fastify({ logger: true });

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

    socket.on("message", (data) => {
      // Handle real-time chat messages
      app.io.emit("message", data);
    });

    socket.on("disconnect", () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });
});

app.listen({ port: 4070 }, function (err, address) {
  if (err) {
    logger.info(`${err}`);
  }
});

