import { config } from "../config/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import logger from "../utils/logger";
import { IUser } from "../types/types";

const connectionString =
  config.postgres?.connection_string ||
  process.env.DATABASE_URL

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });

prisma.$connect()
  .then(() => logger.info("PRISMA CONNECTED SUCCESSFULLY"))
  .catch((err) => logger.error(err, "PRISMA CONNECTION FAILED"));

export async function saveUser(model: IUser) :  Promise<any>{
    // Generate a complex unique ID using date, time, and random bytes
    const id = [
        Date.now(), // milliseconds since epoch
        process.hrtime.bigint().toString(), // nanosecond precision
        Math.floor(Math.random() * 1e8).toString(36) // random base36 segment for more uniqueness
    ].join("_");

    const user = await prisma.user.create({ data: { username: model.username, id: id, email :  model.email , avatar : model.avatar, bio : model.bio , walletAddress : model.walletAddress} });
    logger.info("USER CREATED");

    if (!user){
        return {
            success : false,
            action : "insert",
            date : Date.now.toString()
        }
    }
    
    return {
        success : true,
        action : "insert",
        date : Date.now.toString()
    }
}

export async function getAllUsers() {
  return prisma.user.findMany()
}

export function editUser() { }
export function deleteUser() { }
export function addFriend() { }
export function addAvalancheSupportedTitle() { }
export function getAvalancheSupportedTitles() { }
export function registerGameStudio() { }
export function registerTournament() { }
export function deleteTournament() { }
export function addUserCatalouge() { }
export function addCommunity() { }
export function addCommunityPost() { }
export function addPost() { }
export function registerSuppliedUserToCommunity() { }
export function verifyCommunity() { }