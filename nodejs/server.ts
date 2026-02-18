import express from "express"
import Fastify from "fastify"
import logger from "./src/utils/logger"
import helmet from "helmet";

export const app = Fastify({logger : true})

app.listen({port : 4050}, function(err , address){
    if(err){
        logger.info(`${err}`)
    }
})