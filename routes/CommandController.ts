import { Context } from "../Init";
import { Request, Response } from "express"
import CommandService from "../services/CommandService";
import { checkJwt } from "../middleware/checkJWT";

class CommandController {
    async registerRoutes(app: any, ctx: Context) {
        app.get("/command/:id", [checkJwt], async (req: Request, res: Response) => {
            await CommandService.getTaskCommandsByIdForMe(req, res)
        })
        app.get("/command", [checkJwt], async (req: Request, res: Response) => {
            await CommandService.getAllTaskCommandsForMe(req, res)
        })
        app.post("/command", [checkJwt], async (req: Request, res: Response) => {
            await CommandService.createTaskCommand(req, res)
        })
        app.put("/command", [checkJwt], async (req: Request, res: Response) => {
            await CommandService.updateTaskCommandStateById(req, res)
        })
    }
}

export default new CommandController()