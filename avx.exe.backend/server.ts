import Fastify from "fastify";
import logger from "./src/utils/logger";
import { ValidateEnv } from "./src/utils/validateEnv.utils";
import { fastifyJwt } from "@fastify/jwt";
import { authRoutes } from "./src/routes/auth.routes";
import fastifyOauth2 from "@fastify/oauth2";
import { date } from "./src/utils/date.utils";
import { gameRoutes } from "./src/routes/games.routes";
import fastifyCors from "@fastify/cors";
import { Server } from "socket.io";
import { avax_io } from "./src/sockets/index";
import { getAllUsers, prisma } from "./src/database/prisma";

const app = Fastify({ logger: true });

app.register(fastifyCors, {
  origin: "*",
  credentials: true,
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string,
});

app.decorate("authenticate", async (request: any, reply: any) => {
  try {
    const auth = request.headers.authorization;
    if (!auth?.startsWith("Bearer ")) {
      return reply.code(401).send({ error: "Missing token" });
    }
    const token = auth.slice(7);
    const decoded = app.jwt.verify(token);
    request.user = decoded;
  } catch (err) {
    return reply.code(401).send({ error: "Invalid or expired token" });
  }
});

app.listen({ port: 4070 }, async function (err, address) {
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
    ip: req.ip,
  });
});

app.get("*", (req, res) => {
  return res.status(404).send({
    success: false,
    error: "Route not found",
    date: date.format(),
    ip: req.ip,
    message: "This route does not have a handler",
  });
});

app.get("/api/v1/data/development/prisma/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).send({ users, success: true });
  } catch (error) {
    logger.error(error, "getAllUsers failed");
    return res.status(500).send({ error: "Failed to fetch users" });
  }
});
app.register(authRoutes);
app.register(gameRoutes);

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}

export default app;
