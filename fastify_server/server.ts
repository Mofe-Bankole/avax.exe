import Fastify from "fastify";
import logger from "./src/utils/logger";
import { ValidateEnv } from "./src/utils/validateEnv";
import {fastifyJwt} from "@fastify/jwt"
import { authRoutes } from "./src/routes/auth.routes";
import fastifyOauth2 from "@fastify/oauth2";
import { Request } from "express";

const app = Fastify({ logger: true });

app.register(fastifyJwt , {
    secret : process.env.JWT_SECRET as string
})
app.decorate("authenticate" , async function (req : any, res : any) {
  try {
    await req.jwtVerify()
  } catch (error) {
    await res.status(200).send({
      message : "AUTHENENTICATION ERROR",
      success : false,
      error : error
    })
  }
})

app.register(fastifyOauth2, {
  name: "googleOauth2",
  scope: ["profile", "email"],
  credentials: {
    client: {
      id: String(process.env.GOOGLE_CLIENT_ID),
      secret: String(process.env.GOOGLE_CLIENT_SECRET)
    }
  },
  callbackUri : "http://localhost:4070/api/v1/auth/login"
});

const date = Intl.DateTimeFormat("EN-NG" , {hour : "2-digit" , minute : "2-digit" , second : "2-digit"})
app.listen({ port: 4070 }, function (err, address) {
  if (err) {
    logger.info(`${err}`);
  }
});

app.get("/api/v1/health" , (req , res) => {
  return res.status(200).send({
    success : true,
    message : "Avax.exe Health Route",
    date : date.format(),
    build : "v1",
    ip : req.ip
  })
})

app.register(authRoutes)
app.printRoutes()

export default app;
