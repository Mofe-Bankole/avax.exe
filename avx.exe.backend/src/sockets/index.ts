import { createServer } from "http";
import { Server } from "socket.io";
import app from "../../server";
import http from "http";
import logger from "../utils/logger";
import { socketAuthMiddleware } from "./auth";

const server = http.createServer(app.server);

export const avax_io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

avax_io.on("connection", (socket) => {
  logger.info("A USER CONNECTED");
});

avax_io.use(socketAuthMiddleware);
