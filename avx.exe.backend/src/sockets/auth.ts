import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import logger from "../utils/logger";

export const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error : NO TOKEN PROVIDED"));
  }
  try {
    const decoded = jwt.verify(token, config.jwt_secret);
    socket.data.user = decoded;
    next()
  } catch (err) {
    logger.info(`Error : ${err}`);
    next(new Error("Authentication error : NO TOKEN PROVIDED"));
  }
};
