import { FastifyInstance } from "fastify";
import * as prisma from "../database/prisma";
import logger from "../utils/logger";

export async function tournamentRoutes(app: FastifyInstance) {
    // List all tournaments
    app.get("/api/v1/tournaments", async (req, res) => {
        try {
            const tournaments = await prisma.getAllTournaments();
            return res.status(200).send({ tournaments, success: true });
        } catch (error) {
            logger.error(error, "getAllTournaments failed");
            return res.status(500).send({ error: "Failed to fetch tournaments", success: false });
        }
    });

    // Get a single tournament with submissions
    app.get("/api/v1/tournaments/:id", async (req, res) => {
        const { id } = req.params as { id: string };
        try {
            const tournament = await prisma.getTournamentById(id);
            if (!tournament) {
                return res.status(404).send({ message: "Tournament not found", success: false });
            }
            return res.status(200).send({ tournament, success: true });
        } catch (error) {
            logger.error(error, "getTournamentById failed");
            return res.status(500).send({ error: "Failed to fetch tournament", success: false });
        }
    });

    // Submit proof of play
    app.post("/api/v1/tournaments/:id/submit", async (req, res) => {
        const { id: tournamentId } = req.params as { id: string };
        const { userId, proofText } = req.body as { userId: string, proofText: string };

        if (!userId || !proofText) {
            return res.status(400).send({ message: "User ID and proof text are required", success: false });
        }

        try {
            const submission = await prisma.createSubmission(tournamentId, userId, proofText);
            return res.status(201).send({ submission, success: true });
        } catch (error) {
            logger.error(error, "createSubmission failed");
            // Check for unique constraint violation (User already submitted)
            if ((error as any).code === 'P2002') {
                return res.status(409).send({ message: "You have already submitted for this tournament", success: false });
            }
            return res.status(500).send({ error: "Failed to create submission", success: false });
        }
    });

    // Update submission status (Studio only - simplified for MVP)
    app.patch("/api/v1/submissions/:id/status", async (req, res) => {
        const { id } = req.params as { id: string };
        const { status } = req.body as { status: 'APPROVED' | 'REJECTED' };

        if (!status || !['APPROVED', 'REJECTED'].includes(status)) {
            return res.status(400).send({ message: "Valid status (APPROVED/REJECTED) is required", success: false });
        }

        try {
            const updatedSubmission = await prisma.updateSubmissionStatus(id, status);
            return res.status(200).send({ submission: updatedSubmission, success: true });
        } catch (error) {
            logger.error(error, "updateSubmissionStatus failed");
            return res.status(500).send({ error: "Failed to update submission status", success: false });
        }
    });
}
