import { FastifyInstance } from "fastify";

// import { app } from "../../server";
export async function fetchAllTitles(app : FastifyInstance) {
    app.get("/api/v1/avalanche/titles" , async(req , res) => {
        
    });
    app.get("/api/v1/avalanche/title" ,  async(req , res) => {});
    app.post("/api/v1/avalanche/title/info" , async(req , res) => {});
    app.post("/api/v1/avalanche/title/stats" , async(req , res) => {})
}
