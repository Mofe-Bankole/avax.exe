import express from "express"
import logger from "./src/logging/logger"
import helmet from "helmet";

const app = express();

app.use(helmet())
app.use(express.urlencoded())
app.use(express.json());

app.listen(4050, () => {
    logger.info("SERVER RUNNING ON PORT 4050")
})
