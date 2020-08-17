import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import User from "../models/User";

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    let token = <string>req.headers["authorization"];
    let jwtPayload;

    token = token ? token.substr("Bearer ".length, token.length) : ''
    //Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(token, "=j)BapwJY^9q%pd");
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send({"error": "Token not verifyable"});
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { _id } = jwtPayload;
    const newToken = jwt.sign({ _id }, "=j)BapwJY^9q%pd", {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);

    let user = await User.findOne({ "_id": _id })
    if (user) {
        if (user.lastLoginToken !== token) {
            res.status(401).send({"error": "Token mismatch already loggedin from another device. please relogin from this device, previous device will be autologged out"});
            return;
        }
    }


    //Call the next middleware or controller
    next();
};