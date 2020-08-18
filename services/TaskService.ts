import { Request, Response } from "express"
import User from "../models/User"
import WorkspaceTask from "../models/WorkspaceTask"
import { WorkspaceTaskType, WorkspaceTaskOperation, WorkspaceTaskState } from "../models/Enums";
import { v4 } from 'uuid';

class TaskService {
    async getAllTasks(req: Request, res: Response) {
        let tasks = await WorkspaceTask.find({})
        res.send(tasks)
    }
    async getAllTasksForMe(req: Request, res: Response) {
        let invokerId = res.locals.jwtPayload._id;
        let tasks = await WorkspaceTask.find({ user: invokerId })
        res.send(tasks)
    }
    async getTaskByIdForMe(req: Request, res: Response) {
        let invokerId = res.locals.jwtPayload._id;;
        let task = await WorkspaceTask.find({ id: req.params.id, user: invokerId })
        res.send(task)
    }
    async updateTaskById(req: Request, res: Response) {
        let invokerId = res.locals.jwtPayload._id;
        let task = await WorkspaceTask.findOne({ id: req.body.id }).populate("user").exec()
        if (!task) {
            return res.send({ "error": "Task not found" })
        }
        if (task.user && task.user._id && task.user._id.toString() !== invokerId) {
            return res.send({ "error": "Not your task you can't modify" })
        }

        let obj: any = {}
        if (req.body.taskTemplateId) {
            obj.taskTemplateId = req.body.taskTemplateId
        }
        if (req.body.title) {
            obj.title = req.body.title
        }
        if (req.body.type) {
            if (!WorkspaceTaskType[req.body.type]) {
                return res.send({ "error": "Incorrect type" })
            }
            obj.type = WorkspaceTaskType[req.body.type]
        }
        if (req.body.operation) {
            if (!WorkspaceTaskOperation[req.body.operation]) {
                return res.send({ "error": "Incorrect task operation" })
            }
            obj.operation = WorkspaceTaskOperation[req.body.operation]
        }
        if (req.body.outputData) {
            obj.outputData = req.body.outputData || {}
        }
        if (req.body.state) {
            if (!WorkspaceTaskState[req.body.state]) {
                return res.send({ "error": "Incorrect task state" })
            }
            obj.state = WorkspaceTaskState[req.body.state]
        }

        await WorkspaceTask.update({ id: req.body.id }, {
            $set: obj
        })
        res.send({ "message": "Task updated" })
    }
    async createTask(req: Request, res: Response) {
        let invokerId = res.locals.jwtPayload._id;;
        let invoker = await User.findOne({ _id: invokerId })
        let task = await WorkspaceTask.insertMany([{
            id: v4(),
            user: invoker,
            taskTemplateId: req.body.taskTemplateId,
            title: req.body.title,
            type: WorkspaceTaskType[req.body.type],
            operation: WorkspaceTaskOperation[req.body.operation],
            outputData: req.body.outputData || {},
            state: WorkspaceTaskState[req.body.state]
        }])
        res.send(task)
    }
}

export default new TaskService()