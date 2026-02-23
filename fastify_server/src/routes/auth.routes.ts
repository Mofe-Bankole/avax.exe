import { FastifyInstance } from "fastify";
import * as prisma from "../database/prisma";
import { IUser, } from "../types/types";
import logger from "../utils/logger";


import z from "zod";

const NewUser = z.object({
  username : z.string(),
  email : z.string(),
  avatar : z.string(),
  bio : z.string(),
  walletAddress : z.string()
})

export async function authRoutes(app : FastifyInstance) {
  app.get("/users", async (req, res) => {
    try {
      const users = await prisma.getAllUsers();
      return res.status(200).send({users : users , message : "Users have been Returned"})
    } catch (error) {
      logger.error(error, "getAllUsers failed");
      return res.status(500).send({ error: "Failed to fetch users" });
    }
  });
  
  app.post("/api/v1/auth/internal/join", async (req , res) => {
    let user  = req.body as IUser;

    if (!user){
      res.status(500).send({message : "Please supply Variables" , success : false})
    }
    const new_user = NewUser.safeParse(user)

    if(!new_user.success){
      return res.status(400).send({message : "Error parsing data" , error : new_user.error})
    }

  
   const db_operation =  prisma.saveUser(user);
  
    if ((await db_operation).success){
      return res.status(200).send({message : "User successfully Registered" , greeting  : "Welcome to Avax.exe , choose games you vibe with"})
    }
  
    logger.info("User registered successfully")
  });
  
  app.post("/api/v1/auth/external/x-auth", async (req, res) => {});

  app.post("/api/v1/auth/external/google-auth", async (req, res) => {});

  app.post("/api/v1/auth/signout", async (req, res) => {});
}
