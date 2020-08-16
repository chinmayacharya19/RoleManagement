import { Context } from "../Init";
import { Request, Response } from "express"


class TaskController {
    async registerRoutes(app: any, ctx: Context) {
        app.get("/task", async(req: Request, res: Response) => {
        })
        app.post("/task", async(req: Request, res: Response) => {
        })
        app.put("/task", async(req: Request, res: Response) => {
        })
    }
}

export default new TaskController()