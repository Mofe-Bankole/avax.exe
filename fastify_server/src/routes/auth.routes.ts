// import { app } from "../../server";
import { FastifyInstance } from "fastify";
import app from "../../server";
import * as prisma from "../database/prisma";
import { IUser, } from "../types/types";
import logger from "../utils/logger";

export async function authRoutes(app : FastifyInstance) {
  app.get("/users", async (req, res) => {
    try {
      const users = await prisma.getAllUsers();
      return users;
    } catch (error) {
      logger.error(error, "getAllUsers failed");
      return res.status(500).send({ error: "Failed to fetch users" });
    }
  });
  
  app.post("/api/v1/auth/internal/join", async (req , res) => {
    let user : IUser = req.body as IUser;
    if (!user){
        res.status(500)
        return {"message" : "Please supply Variables" , "success" : false}
    }
  
   const db_operation =  prisma.saveUser(user);
  
    if ((await db_operation).success){
      return {"message" : "user created successfully" ,"date" : Date.now.toString()}
    }
  
    logger.info("User registered successfully")
  });
  
  app.post("/api/v1/auth/external/x-auth", async (req, res) => {});

  app.post("/api/v1/auth/external/google-auth", async (req, res) => {});

  app.post("/api/v1/auth/signout", async (req, res) => {});

  app.get("/api/v1/health" , (req , res) => {
    return {
      "success" : false,
      'uptime' : "several",
      "source" :  process.env.OPERATING_SYSTEM,
    }
  })
}
