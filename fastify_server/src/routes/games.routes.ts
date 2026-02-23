<<<<<<< HEAD
import { app } from "../../server";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

app.post("/api/v1/games/update-score", async (req, res) => {
    const { wallet, score, gameId, signature } = req.body as any;

    // TODO: Verify signature against game's secretKey
    // For MVP demo, we'll log the attempt and update the database

    try {
        const updatedScore = await prisma.score.create({
            data: {
                value: score,
                userId: wallet, // Assuming wallet address is used as ID or link
                gameId: gameId,
            },
        });

        // Broadcast update via Socket.io
        (app as any).io.emit('leaderboard-update', updatedScore);

        return res.status(200).send({ success: true, data: updatedScore });
    } catch (error) {
        return res.status(500).send({ success: false, error: (error as Error).message });
    }
});
=======
import { FastifyInstance } from "fastify";

// import { app } from "../../server";
export async function fetchAllTitles(app : FastifyInstance) {
    app.get("/api/v1/avalanche/titles" , async(req , res) => {

    });
    app.get("/api/v1/avalanche/[game]" , async(req , res) => {});
    app.post("/api/v1/avalanche/title" , async(req , res) => {});
}
>>>>>>> origin/prisma_v1
