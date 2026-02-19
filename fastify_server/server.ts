import Fastify from "fastify";
import logger from "./src/utils/logger";
import { ValidateEnv } from "./src/utils/validateEnv";

export const app = Fastify({ logger: true });

app.listen({ port: 4070 }, function (err, address) {
  if (err) {
    logger.info(`${err}`);
  }
});

