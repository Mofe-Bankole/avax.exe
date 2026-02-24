import { FastifyInstance } from "fastify";
import * as prisma from "../database/prisma";
import { IUser } from "../types/types";
import logger from "../utils/logger";
import z from "zod";
import { issueSessionToken } from "../utils/sessionManagement.utils";
import { validateRequest } from "../middleware/AuthMiddleware";
import { date } from "../utils/date.utils";

const NewUser = z.object({
  username: z.string(),
  email: z.string(),
  avatar: z.string(),
  bio: z.string(),
  walletAddress: z.string(),
});

const LoginUser = z.object({
  walletAddress: z.string(),
})

export async function authRoutes(app: FastifyInstance) {
  // Get all users
  app.get("/api/v1/data/development/prisma/users", async (req, res) => {
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
          success: true,
          info: "Please note that in order to recover your wallet , connecting your google account is advised",
          signinInfo: "You can sign in by connecting your wallet",
          date: Date.now().toString()
        });
      }

      return res.status(500).send({ message: "Signup Failed", error: db_operation.error ?? null });
    } catch (err) {
      logger.error(err, "Error during internal join");
      return res.status(500).send({ message: "Internal server error" });
    }
  });

  app.get("/api/v1/profile/me", async (req, res) => {

  })

  app.get("/api/v1/dev/:walletaddr", async (req, res) => {
    let { walletaddr } = req.params as any;

    if (!walletaddr) {
      res.status(500).send({ message: "Standard diversifier was not Defined | Wallet Address was not supplied", error: "Wallet as not supplied", success: false, date: date.format() })
      logger.info("UNABLE TO REOLVE REQUEST")
    }
    console.log(walletaddr);

    try {
      let user = await prisma.getUser(walletaddr);
      res.status(200).send({data : user?.user, message : "User Retreived successfully" , success : true , error : null , date : date.format() , client_hostname : req.hostname, client_ip : req.ip , authenticated : true , authorized : true , headers : req.headers})
    } catch (error) {
      res.status(500).send({ message: "Failed to retreive user", error: error instanceof Error ? error.message : "Unknown Database Error", success: false, date: date.format() })
    }
  })

  app.get("/api/v1/signin/:walletaddr", async (req, res) => {
    let { walletaddr } = req.params as any;

    if (!walletaddr) {
      res.status(500).send({ message: "Standard diversifier was not Defined | Wallet Address was not supplied", error: "Wallet as not supplied", success: false, date: date.format() })
      logger.info("UNABLE TO REOLVE REQUEST");
    }
    console.log(walletaddr);
    
    try {
      let data = await prisma.getUser(walletaddr);
    
      const token = await issueSessionToken(data.user?.id as string, data.user?.role as string)
      res.status(200).send({data : data?.user, message : "User Retreived successfully" , success : true , error : null , date : date.format() , client_hostname : req.hostname, client_ip : req.ip , authenticated : true , authorized : true , headers : req.headers , sessionToken : token})
    } catch (error) {
      res.status(500).send({ message: "Failed to retreive user", error: error instanceof Error ? error.message : "Unknown Database Error", success: false, date: date.format() })
    }
  })
}
