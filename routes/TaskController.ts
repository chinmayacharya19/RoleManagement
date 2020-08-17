import { Context } from "../Init";
import { Request, Response } from "express"
import { checkJwt } from "../middleware/checkJWT";
import TaskService from "../services/TaskService";


class TaskController {
    async registerRoutes(app: any, ctx: Context) {
        app.get("/task/:id", [checkJwt], async (req: Request, res: Response) => {
            await TaskService.getTaskByIdForMe(req, res)
        })
        app.get("/task", [checkJwt], async (req: Request, res: Response) => {
            await TaskService.getAllTasksForMe(req, res)
        })
        app.post("/task", [checkJwt], async (req: Request, res: Response) => {
            await TaskService.createTask(req, res)
        })
        app.put("/task", [checkJwt], async (req: Request, res: Response) => {
            await TaskService.updateTaskById(req, res)
        })
    }
}

export default new TaskController()