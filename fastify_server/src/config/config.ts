import { Config } from "../types/types";
import dotenv from "dotenv";
dotenv.config();

export const config: Config = {
  PORT: process.env.PORT,
  NODE: {
    enviroment: process.env.NODE_ENV,
    version: "24.0.0",
    build: "v1",
  },
  avalanche: {
    mainnet_rpc: process.env.AVALANCHE_MAINNET_RPC,
    testnet_rpc: process.env.AVALANCHE_TESTNET_RPC,
  },
  postgres : {
    connection_string : process.env.DATABASE_URL as string
  }
};
