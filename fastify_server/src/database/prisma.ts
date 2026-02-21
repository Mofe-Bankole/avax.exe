import { config } from "../config/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import logger from "../utils/logger";
import { IUser } from "../types/types";

// Use pg adapter for direct TCP connection to local PostgreSQL. Do not use
// @prisma/adapter-ppg — that one is for Prisma Postgres (HTTP) only.
const connectionString =
  config.postgres?.connection_string ||
  process.env.DATABASE_URL

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });

prisma.$connect()
  .then(() => logger.info("PRISMA CONNECTED SUCCESSFULLY"))
  .catch((err) => logger.error(err, "PRISMA CONNECTION FAILED"));

export async function saveUser(model: IUser) :  Promise<any>{
    const user = await prisma.user.create({ data: { username: model.username, id: model.id, email :  model.email , avatarUrl : model.avatarUrl, bio : model.bio } });
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
  return prisma.user.findFirst()
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