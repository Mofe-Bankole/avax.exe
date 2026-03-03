import { FastifyInstance } from "fastify";
import * as prisma from "../database/prisma";
import { GameStudio, IUser } from "../types/types";
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
  app.post("/api/v1/auth/internal/signup", async (req: any, res) => {
    try {
      const user = req.body.params as IUser;
      console.log(user);
      if (!user) {
        return res
          .status(400)
          .send({ message: "Please supply Variables", success: false });
      }

      const new_user = NewUser.safeParse(user);
      const existing_user = await prisma.getUser(user.walletAddress);

      if (existing_user.success && existing_user.user) {
        return res
          .status(400)
          .send({ success: false, message: "USER ALREADY EXITS" });
      }
      if (!new_user.success) {
        return res.status(400).send({
          message: "Error parsing data",
          error: new_user.error.format(),
        });
      }

      const db_operation = await prisma.saveUser(new_user.data);

      if (db_operation.success && db_operation.user) {
        // Issue a session token for the newly created user so the
        // frontend can treat signup as an authenticated action.
        const sessionToken = await issueSessionToken(
          db_operation.user.id,
          db_operation.user.role ?? "PLAYER",
          db_operation.user.walletAddress,
        );

        logger.info("USER REGISTERED SUCCESSFULLY");
        return res.status(200).send({
          message: "User successfully Registered",
          greeting: "Welcome to Avax.exe , choose games you vibe with",
          info: "Please note that in order to recover your wallet , connecting your google account is advised",
          signinInfo:
            "You can sign in any time by simply connecting your wallet",
          avax_message: "Avx.exe will never ask you to supply your private key",
          date: date.format(),
          success: true,
          user: db_operation.user,
          session: {
            owner: db_operation.user,
            token: sessionToken,
          },
        });
      }

      return res
        .status(500)
        .send({
          message: "Signup Failed",
          error: db_operation.error ?? null,
          success: false,
        });
    } catch (err) {
      logger.error(err, "Error during internal join");
      return res
        .status(500)
        .send({ message: "Internal server error", success: false });
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
    const { walletaddr, walletAddress } = req.body as any;
    const resolvedWallet = walletaddr || walletAddress;

    if (!resolvedWallet) {
      logger.info("UNABLE TO RESOLVE REQUEST: Wallet Address missing");
      return res.status(400).send({
        message:
          "Standard diversifier was not Defined | Wallet Address was not supplied",
        error: "Wallet Address was not supplied",
        success: false,
        date: date.format(),
      });
    }

    try {
      const data = await prisma.getUser(resolvedWallet);

      if (!data.success || !data.user) {
        return res.status(404).send({
          message: "User not found",
          error: data.error ?? "User not found",
          success: false,
          date: date.format(),
        });
      }

      const token = await issueSessionToken(
        data.user.id as string,
        (data.user as any).role ?? "PLAYER",
        data.user.walletAddress as string,
      );

      return res.status(200).send({
        data: data.user,
        message: "User Retreived successfully",
        success: true,
        error: null,
        date: date.format(),
        authenticated: true,
        authorized: true,
        session: {
          owner: data.user,
          token,
        },
      });
    } catch (error) {
      return res.status(500).send({
        message: "Failed to retreive user",
        error:
          error instanceof Error ? error.message : "Unknown Database Error",
        success: false,
        date: date.format(),
      });
    }
  });
  
  
  app.post("/api/v1/builders/onboarding", async (req, res) => {
    let payload = req.body as GameStudio;

    const studio = await prisma.registerGameStudio(payload);

    if (studio.success) {
      res.status(200).send({
        message: "Studio registered successfully",
        success: true,
        statusCode: 200,
        greeting: "Welcome to Avax.exe",
        user: studio.user,
      });
    } else {
      res.status(400).send({
        message: "Failed to register studio",
        success: false,
        statusCode: 400,
        error: studio.error ?? "Unknown error",
      });
    }
  });

  // Simple builder "login" which just verifies the studio exists.
  app.post("/api/v1/builders/login", async (req, res) => {
    const payload = req.body as GameStudio;

    if (!payload.walletAddress) {
      return res.status(400).send({
        message: "Wallet address is required",
        success: false,
        statusCode: 400,
      });
    }

    try {
      const existing = await prisma.getUser(payload.walletAddress);
      if (!existing.success || !existing.user) {
        return res.status(404).send({
          message: "Studio not found",
          success: false,
          statusCode: 404,
        });
      }

      return res.status(200).send({
        message: "Studio login successful",
        success: true,
        statusCode: 200,
        greeting: "Welcome back to Avax.exe",
        user: existing.user,
      });
    } catch (error) {
      return res.status(500).send({
        message: "Failed to login studio",
        success: false,
        statusCode: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
}
