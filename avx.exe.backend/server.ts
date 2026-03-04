import Fastify from "fastify";
import logger from "./src/utils/logger";
import { fastifyJwt } from "@fastify/jwt";
import { authRoutes } from "./src/routes/auth.routes";
import { date } from "./src/utils/date.utils";
import { gameRoutes } from "./src/routes/games.routes";
import fastifyCors from "@fastify/cors";
import { Server } from "socket.io";
import http from "node:http"
import { getAllUsers, prisma } from "./src/database/prisma";
import { socketAuthMiddleware } from "./src/sockets/auth";
import { config } from "./src/config/config";
import { chatRoutes } from "./src/routes/chat.routes";
import { builderRoutes } from "./src/routes/builders.routes";

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
      return reply.code(401).send({ error: "Missing token" , success : false});
    }
    const token = auth.slice(7);
    const decoded = app.jwt.verify(token);
    request.user = decoded;
  } catch (err) {
    return reply.code(401).send({ error: "Invalid or expired token" });
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

/// ROUTES
app.register(authRoutes);
app.register(gameRoutes);
app.register(chatRoutes);
app.register(builderRoutes);

//// prehandlers
declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}

//// SOCKETS
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

avax_io.on("connection" , (socket) => {
  logger.info(`USER CONNECTED ${socket.id}`)

  socket.on("join_conversation" , (conversationId : string) => {
    const userId = socket.data.user.id;

    prisma.conversation.findUnique({where : {id : conversationId}}).then(convo => {
      if (convo && (convo.participantOneId === userId || convo.participantTwoId === userId)){
        socket.join(conversationId);
        logger.info(`${userId} JOINED convo ${conversationId}`)
      }
    })
  })

  socket.on("send_message", async ({ conversationId, content }: { conversationId: string; content: string }) => {
    const userId = socket.data.user.id;

    // Verify access (don't skip—security)
    const convo = await prisma.conversation.findUnique({ where: { id: conversationId } });
    if (!convo || (convo.participantOneId !== userId && convo.participantTwoId !== userId)) {
      return 
    }

    // Create message in DB
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId: userId,
        content,
      },
    });

    // Emit to the room (both users get it)
    avax_io.to(conversationId).emit("new_message", message);
  });

  socket.on("disconnect", () => {
    logger.info(`USER DISCONNECTED : ${socket.id}`);
  });
})

server.listen(4070, () => {
  logger.info(`Server listening at http://localhost:4070`);
});

server.on("error", (err) => {
  logger.error(err); // Use error level
  process.exit(1); // Critical, don't leave this out—crash gracefully
})

//// LISTENERS

app.listen({ port: Number(config.PORT) }, async function (err, address) {
  if (err) {
    logger.info(`${err}`);
  }
});

export default app;
