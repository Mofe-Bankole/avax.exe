import logger from "./logger";

export function ValidateEnv() {
  const missing = []
  if (process.env.PORT) missing.push("PORT");
  if (process.env.NODE_ENV) missing.push("PORT");
  if (process.env.AVALANCE_MAINNET_RPC_URL) missing.push("AVALANCE_MAINNET_RPC_URL");
  if (process.env.AVALANCE_TESTNET_RPC_URL) missing.push("AVALANCE_TESTNET_RPC_URL");
  if (process.env.JWT_SECRET) missing.push("JWT_SECRET");

  if (missing.length > 0){
    console.log(`MISSING ENV VARS ${missing.join(",")}`)
  }else{
    logger.info(`ALL VARS SUPPLIED AND LOADED`)
  }
}
