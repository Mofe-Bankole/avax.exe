import { FastifyInstance } from "fastify";
import {
  addAvalancheSupportedTitle,
  fetchAllTitles,
  prisma,
} from "../database/prisma";

export async function gameRoutes(app: FastifyInstance) {
  // Avalanche Titles (from prisma_v1)
  app.get("/api/v1/avalanche/titles", async (req, res) => {
    try {
      const titles = await fetchAllTitles();
      return res.status(200).send({ data: titles, success: true, error: null });
    } catch (error) {
      return res
        .status(404)
        .send({ data: null, success: false, error: "Unable to fetch Titles" });
    }
  });

  app.post("/api/v1/avalanche/add", async (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Missing request body",
        error: "Missing request body",
      });
    }
    let game = req.body as any;
    try {
      const added = await addAvalancheSupportedTitle(game);

      return res.status(200).send({ data: added, success: true, error: null });
    } catch (error) {
      return res.status(400).send({
        data: null,
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown database error",
      });
    }
  });

  // app.post("/api/v1/avalanche/title/:name", async (req, res) => {});
}
