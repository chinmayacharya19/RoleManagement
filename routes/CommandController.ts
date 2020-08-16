import { Context } from "../Init";
import { Request, Response } from "express"
import CommandService from "../services/CommandService";

class CommandController {
    async registerRoutes(app: any, ctx: Context) {
        app.get("/command", async(req: Request, res: Response) => {
        })
        app.post("/command", async(req: Request, res: Response) => {
        })
        app.put("/command", async(req: Request, res: Response) => {
        })
    }
}

export default new CommandController()