import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const _id = res.locals.jwtPayload._id;;

        //Get user role from the database
        let user = await User.findOne({_id: _id});
        if (!user) {
            return res.status(401).send({ "error": "Unauthorized" });
        }

        //Check if array of authorized roles includes the user's role
        if (roles.indexOf(user.role) > -1) next();
        else res.status(401).send();
    };
};