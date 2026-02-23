import { FastifyInstance } from "fastify";
import * as prisma from "../database/prisma";
import { IUser } from "../types/types";
import logger from "../utils/logger";
import z from "zod";
import { issueSessionToken } from "../utils/sessionManagement.utils";
import { validateRequest } from "../middleware/AuthMiddleware";

const NewUser = z.object({
  username: z.string(),
  email: z.string(),
  avatar: z.string(),
  bio: z.string(),
  walletAddress: z.string(),
});

const LogInUser = z.object({
  username : z.string(),
  password : z.string()
})

export async function authRoutes(app: FastifyInstance) {
  // Get all users
  app.get("/users", async (req, res) => {
    try {
      const users = await prisma.getAllUsers();
      return res.status(200).send({ users, message: "Users have been Returned" });
    } catch (error) {
      logger.error(error, "getAllUsers failed");
      return res.status(500).send({ error: "Failed to fetch users" });
    }
  });

  // Register internal user
  app.post("/api/v1/auth/internal/signup", async (req, res) => {
    try {
      const user = req.body as IUser;

      if (!user) {
        return res.status(400).send({ message: "Please supply Variables", success: false });
      }

      const new_user = NewUser.safeParse(user);

      if (!new_user.success) {
        return res.status(400).send({ message: "Error parsing data", error: new_user.error.format() });
      }

      const db_operation = await prisma.saveUser(new_user.data);

      if (db_operation.success) {
        logger.info("USER REGISTERED SUCCESSFULLY");
        return res.status(200).send({
          message: "User successfully Registered",
          greeting: "Welcome to Avax.exe , choose games you vibe with",
          success : true,
          date : Date.now().toString()
        });
      }

      return res.status(500).send({ message: "Signup Failed", error: db_operation.error ?? null });
    } catch (err) {
      logger.error(err, "Error during internal join");
      return res.status(500).send({ message: "Internal server error" });
    }
  });

  app.post("/api/v1/auth/internal/signin", async(req , res) => {
    let user = req.body;

    const login_user = LogInUser.safeParse(user);

    const db_user = await 

  })

  app.get("/api/v1/profile/me" , async (req , res) {
    
  })
}
