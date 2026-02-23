import Fastify from "fastify";
import socketio from "@fastify/socket.io";
import logger from "./src/utils/logger";
import { ValidateEnv } from "./src/utils/validateEnv";
import { authRoutes } from "./src/routes/auth.routes";
import { gameRoutes } from "./src/routes/games.routes";

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
app.printRoutes()

export default app;
