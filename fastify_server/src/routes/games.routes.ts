import { FastifyInstance } from "fastify";
import { fetchAllTitles, prisma } from "../database/prisma";



export async function gameRoutes(app: FastifyInstance) {
    // Avalanche Titles (from prisma_v1)
    app.get("/api/v1/avalanche/titles", async (req, res) => {
        try {
            const titles = await fetchAllTitles()
            return res.status(200).send({data : titles , success : true , error : null})
        } catch (error) {
            return res.status(404).send({data : null, success : false , error : "Unable to fetch Titles" })
            
        }
    });
    app.get("/api/v1/avalanche/add", async (req, res) => { 
      let game = req.body as any;
      
      
    });
    app.post("/api/v1/avalanche/title", async (req, res) => { });
}
