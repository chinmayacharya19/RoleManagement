import { Request, Response } from "express"
import User from "../models/User"
import { Roles, OS, RolesPower } from "../models/Enums"
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthorizationService {
    async register(req: Request, res: Response) {
        try {
            let user = new User(req.body)
            user.role = Roles.UNASSIGNED
            let password = await bcrypt.hash(req.body.password, 11)
            user.password = password
            await user.save()
            res.send({ "message": "User Created" })
        }
        catch (err) {
            res.status(500).send({ "error": "Something failed", err })
        }
    }

    async assignRole(req: Request, res: Response) {
        let invokerId = res.locals.jwtPayload.id;
        if (req.body.role === Roles.CAPTAIN) {
            let captain = await User.findOne({ "role": Roles.CAPTAIN })
            if (captain) {
                return res.status(400).send({ "error": "Captain already exists" })
            }
        }
        if (req.body.role === Roles.CHIEF_ENGINEER) {
            let chiefEng = await User.findOne({ "role": Roles.CHIEF_ENGINEER })
            if (chiefEng) {
                return res.status(400).send({ "error": "Cheif Engineer already exists" })
            }
        }
        if (req.body.role === Roles.CHIEF_OFFICER) {
            let cheifOfficer = await User.findOne({ "role": Roles.CHIEF_OFFICER })
            if (cheifOfficer) {
                return res.status(400).send({ "error": "chiefOfficer already exists" })
            }
        }
        let invoker = await User.findOne({ id: invokerId })
        let user = await User.findOne({ id: req.body.id })
        // less is more powerful
        if (RolesPower[invoker.role] > +RolesPower[req.body.role]) {
            return res.status(401).send({ "error": "Your access is lesser than required" })
        }
        if (!user) {
            return res.status(404).send({ "error": "User not found" })
        }
        if (!Roles[req.body.role]) {
            return res.status(404).send({ "error": "Incorrect role" })
        }
        user.role = Roles[req.body.role]
        await user.save()
        return res.sendStatus(200)
    }

    async login(req: Request, res: Response) {
        let user = await User.findOne({ id: req.body.id })
        if (!user) {
            return res.status(404).send({ "error": "User not found" })
        }

        let passwordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCorrect) {
            return res.status(401).send({ "error": "Auth error" })
        }

        const token = jwt.sign({ id: user.id }, "=j)BapwJY^9q%pd", { expiresIn: "1h" });

        await User.updateOne({ id: user.id }, {
            $set: {
                device: req.body.device,
                os: req.body.os,
                isOnline: req.body.isOnline || true,
                ipAddress: req.body.ipAddress,
                macAddress: req.body.macAddress || "NO_MAC",
                lastOnlineAt: req.body.lastOnlineAt || new Date(),
                lastLoginToken: token
            }
        })

        //Send the jwt in the response
        res.send(token);
    }

    async logout(req: Request, res: Response) {
        let user = await User.findOne({ id: req.body.id })
        if (!user) {
            return res.status(404).send({ "error": "User not found" })
        }
        await User.updateOne({ id: user.id }, {
            $set: {
                lastLoginToken: "notexisting"
            }
        })
    }
}

export default new AuthorizationService()