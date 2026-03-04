import { FastifyPluginAsync } from "fastify";
import { FastifyInstance } from "fastify/types/instance";

export const LeaderBoardRoutes: FastifyPluginAsync = (
  app: FastifyInstance,
): Promise<void> => {
  app.get("/api/v1/tournaments/details", async (req, res) => {});
  app.post("/api/v1/tournaments/submit", async (req, res) => {});
  app.post("/api/v1/tournaments/studio/create", async (req, res) => {});
  app.get(
    "/api/v1/tournaments/studio/storage/tournaments",
    async (req, res) => {},
  );
  app.get(
    "/api/v1/tournaments/studio/storage/tournaments/winners",
    async (req, res) => {},
  );
  app.get(
    "/api/v1/tournaments/studio/storage/tournaments/:tournamentId/info",
    async (req, res) => {},
  );
  app.get(
    "/api/v1/tournaments/studio/storage/tournaments/upcoming",
    async (req, res) => {},
  );
};
