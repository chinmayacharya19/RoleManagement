import { Request, Response } from "express"
import User from "../models/User"

class CommandService {
    async register(req: Request, res: Response) {
        new User(req.body)
    }
}

export default new CommandService()