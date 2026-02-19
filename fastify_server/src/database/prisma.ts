import { config } from "../config/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPostgresAdapter } from "@prisma/adapter-ppg";

const adapter = new PrismaPostgresAdapter({connectionString : config.postgres.connection_string})
export const prisma  = new PrismaClient({adapter})
    

export function saveUser(){}
export function editUser(){}
export function deleteUser(){}
export function addFriend(){}
export function addAvalancheSupportedTitle(){}
export function getAvalancheSupportedTitles(){}
export function registerGameStudio(){}
export function registerTournament(){}
export function deleteTournament(){}
export function addUserCatalouge(){}
export function addCommunity(){}
export function addCommunityPost(){}
export function addPost(){}
export function registerSuppliedUserToCommunity(){}
export function verifyCommunity(){}