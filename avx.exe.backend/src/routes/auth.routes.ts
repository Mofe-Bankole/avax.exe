import { FastifyInstance } from "fastify";
import * as prisma from "../database/prisma";
import { IUser } from "../types/types";
import logger from "../utils/logger";
import z from "zod";
import { issueSessionToken } from "../utils/sessionManagement.utils";
import { date } from "../utils/date.utils";
import { validateRequest } from "../middleware/AuthMiddleware";
import { token } from "morgan";
import app from "../../server";

const NewUser = z.object({
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

const LoginUser = z.object({
  walletAddress: z.string(),
});

export async function authRoutes(app: FastifyInstance) {
  // Register internal user
  app.post("/api/v1/auth/internal/signup", async (req : any, res) => {
    try {
      const user = req.body.params as IUser;
      console.log(user)
      if (!user) {
        return res
          .status(400)
          .send({ message: "Please supply Variables", success: false });
      }

      const new_user = NewUser.safeParse(user);

      if (!new_user.success) {
        return res.status(400).send({
          message: "Error parsing data",
          error: new_user.error.format(),
        });
      }

      const db_operation = await prisma.saveUser(new_user.data);

      if (db_operation.success) {
        logger.info("USER REGISTERED SUCCESSFULLY");
        return res.status(200).send({
          message: "User successfully Registered",
          greeting: "Welcome to Avax.exe , choose games you vibe with",
          success: true,
          info: "Please note that in order to recover your wallet , connecting your google account is advised",
          signinInfo:
            "You can sign in any time by simply connecting your wallet",
          avax_message: "Avx.exe will never ask you to supply your private key",
          date: date.format(),
        });
      }

      return res
        .status(500)
        .send({ message: "Signup Failed", error: db_operation.error ?? null , success : false});
    } catch (err) {
      logger.error(err, "Error during internal join");
      return res.status(500).send({ message: "Internal server error" , success : false});
    }
  });

  app.post(
    "/api/v1/profile/stats/me",
    { preHandler: app.authenticate },
    async (req, res) => {
      const validUser =await validateRequest(req , res);

      if (!validUser) {
        return res.status(401).send({ message: "Unauthorized", success: false });
      }
      const user = req.user as IUser;
      const userStats = await prisma.getUserStats(user.walletAddress);
      
      if (!userStats) {
        return res.status(404).send({ message: "User not found", success: false });
      }

      return res.status(200).send({
        data: userStats,
        message: "User Stats Retreived successfully",
        success: true,
        date: date.format(),
        client_hostname: req.hostname,
        client_ip: req.ip,
        authenticated: true,
        authorized: true,
        headers: req.headers,
      });
    },
  ); 

  app.post("/api/v1/auth/signin", async (req, res) => {
    let { walletaddr } = req.body as any;
    if (!walletaddr) {
      res.status(500).send({
        message:
          "Standard diversifier was not Defined | Wallet Address was not supplied",
        error: "Wallet as not supplied",
        success: false,
        date: date.format(),
      });

      logger.info("UNABLE TO REOLVE REQUEST");
    }

    try {
      let data = await prisma.getUser(walletaddr);

      const token = await issueSessionToken(
        data.user?.id as string,
        data.user?.role as string,
        data.user?.walletAddress as string
      );

      res.status(200).send({
        data: data?.user,
        message: "User Retreived successfully",
        success: true,
        error: null,
        date: date.format(),
        authenticated: true,
        authorized: true,
        session: token,
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to retreive user",
        error:
          error instanceof Error ? error.message : "Unknown Database Error",
        success: false,
        date: date.format(),
      });
    }
  });
}
