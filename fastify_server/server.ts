import Fastify from "fastify";
import logger from "./src/utils/logger";
import { ValidateEnv } from "./src/utils/validateEnv";
import { authRoutes } from "./src/routes/auth.routes";


const app = Fastify({ logger: true });
// ValidateEnv()
app.listen({ port: 4070 }, function (err, address) {
  if (err) {
    logger.info(`${err}`);
  }
});

app.register(authRoutes)
app.printRoutes()

export default app;
