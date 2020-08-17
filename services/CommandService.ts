import { Request, Response } from "express"
import User from "../models/User"
import TaskCommand from "../models/Command"
import { v4 } from "uuid"
import { TaskCommandState } from "../models/Enums"

class CommandService {
    async getAllTaskCommands(req: Request, res: Response) {
        let taskCommands = await TaskCommand.find({})
        res.send(taskCommands)
    }
    async getAllTaskCommandsForMe(req: Request, res: Response) {
        let invokerId = res.locals.jwtPayload._id;;
        let taskCommands = await TaskCommand.find({ from: invokerId })
        res.send(taskCommands)
    }
    async getTaskCommandsByIdForMe(req: Request, res: Response) {
        let invokerId = res.locals.jwtPayload._id;;
        let taskCommand = await TaskCommand.find({ id: req.params.id, from: invokerId })
        res.send(taskCommand)
    }
    async updateTaskCommandStateById(req: Request, res: Response) {
        let invokerId = res.locals.jwtPayload._id;;
        let taskCommand = await TaskCommand.findOne({ id: req.body.id })
        if (!taskCommand) {
            return { "error": "Task not found" }
        }
        if (taskCommand.to.id !== invokerId) {
            return { "error": "you cant command yourself" }
        }

        await TaskCommand.update({
            id: req.body.id
        }, {
            $set: {
                state: TaskCommandState[req.body.state],
                updatedAt: new Date(),
            }
        })

        res.send({ "message": "Command state updated" })
    }
    async createTaskCommand(req: Request, res: Response) {
        let invokerId = res.locals.jwtPayload._id;;
        let invoker = await User.findOne({ id: invokerId })
        let to = await User.findOne({ id: req.body.to })

        await TaskCommand.insertMany([{
            id: v4(),
            state: TaskCommandState[req.body.state],
            createdAt: new Date(),
            updatedAt: new Date(),
            from: invoker,
            to: to,
            type: req.body.type,
            task: req.body.workspaceTaskId
        }])
    }
}

export default new CommandService()