import * as prisma from "./src/database/prisma";
import Fastify from "fastify";
import logger from "./src/utils/logger";
import { ValidateEnv } from "./src/utils/validateEnv.utils";
import {fastifyJwt} from "@fastify/jwt"
import { authRoutes } from "./src/routes/auth.routes";
import fastifyOauth2 from "@fastify/oauth2";
import { date } from "./src/utils/date.utils";
import { gameRoutes } from "./src/routes/games.routes";


const app = Fastify({ logger: true });
// const date = Intl.DateTimeFormat("EN-NG" , {hour : "2-digit" , minute : "2-digit" , second : "2-digit"});

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
    ip: req.ip
  })
})

app.register(authRoutes)
app.register(gameRoutes)
export default app;
