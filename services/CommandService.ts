import { Request, Response } from "express"
import User from "../models/User"
import TaskCommand from "../models/Command"
import { v4 } from "uuid"
import { TaskCommandState, TaskCommandTaskType, TaskCommandType, RolesPower } from "../models/Enums"
import { ESRCH } from "constants"

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
        let invokerId = res.locals.jwtPayload._id;
        let invoker = await User.findOne({ _id: invokerId })
        let taskCommand = await TaskCommand.findOne({ id: req.body.id }).populate("to").exec()
        if (!taskCommand) {
            return res.send({ "error": "Command not found" })
        }
        if (taskCommand.to.id.toString() !== invokerId) {
            return res.send({ "error": "you cant command yourself" })
        }
        if (!TaskCommandState[req.body.state]) {
            return res.send({ "error": "Incorrect command state" })
        }
          // smaller is powerful
          if (RolesPower[invoker.role] > RolesPower[taskCommand.to.role]) {
            return res.send({ "error": "You can't assign command a user more powerful than you" })
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
        let invoker = await User.findOne({ _id: invokerId })
        let to = await User.findOne({ id: req.body.to })

        if (!req.body.to) {
            return res.send({ "error": "Must specify to" })
        }
        if (!to) {
            return res.send({ "error": "To user must exist" })
        }
        if (invoker.id === to.id) {
            return res.send({ "error": "from and to should not be same" })
        }
        // smaller is powerful
        if (RolesPower[invoker.role] > RolesPower[to.role]) {
            return res.send({ "error": "You can't assign command a user more powerful than you" })
        }
        if (!req.body.workspaceTaskId) {
            return res.send({ "error": "Workspace id mandetory" })
        }
        if (!TaskCommandState[req.body.state]) {
            return res.send({ "error": "Incorrect command state" })
        }
        if (!TaskCommandType[req.body.type]) {
            return res.send({ "error": "Incorrect command type" })
        }
        if (!TaskCommandTaskType[req.body.taskType]) {
            return res.send({ "error": "Incorrect command task type" })
        }

        await TaskCommand.insertMany([{
            id: v4(),
            state: TaskCommandState[req.body.state],
            createdAt: new Date(),
            updatedAt: new Date(),
            from: invoker,
            to: to,
            type: TaskCommandState[req.body.type],
            task: {
                taskTemplateId: req.body.taskTemplateId,
                title: req.body.title,
                type: TaskCommandTaskType[req.body.taskType]
            }
        }])
        return res.send({ "message": "Command created" })
    }
}

export default new CommandService()