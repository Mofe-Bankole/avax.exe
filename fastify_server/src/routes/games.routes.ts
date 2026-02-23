import { FastifyInstance } from "fastify";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function gameRoutes(app: FastifyInstance) {
    // Score Updates
    app.post("/api/v1/games/update-score", async (req, res) => {
        const { wallet, score, gameId, signature } = req.body as any;

        // TODO: Verify signature against game's secretKey
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

    // Leaderboard
    app.get("/api/v1/games/leaderboard/:gameId", async (req, res) => {
        const { gameId } = req.params as any;

        try {
            const leaderboard = await (prisma as any).score.findMany({
                where: { gameId },
                include: { user: true },
                orderBy: { value: "desc" },
                take: 10,
            });

            return res.status(200).send({ success: true, data: leaderboard });
        } catch (error) {
            return res.status(500).send({ success: false, error: (error as Error).message });
        }
    });

    // Avalanche Titles (from prisma_v1)
    app.get("/api/v1/avalanche/titles", async (req, res) => {
        // Implementation here if needed
    });
    app.get("/api/v1/avalanche/[game]", async (req, res) => { });
    app.post("/api/v1/avalanche/title", async (req, res) => { });
}
