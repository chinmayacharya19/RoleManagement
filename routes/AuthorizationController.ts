import { Context } from "../Init";
import { Request, Response } from "express"
import AuthorizationService from "../services/AuthorizationService";
import { checkJwt } from "../middleware/checkJWT";
import { checkRole } from "../middleware/checkRoles";
import { Roles } from "../models/Enums";

class AuthorizationController {
    async registerRoutes(app: any, ctx: Context) {
        app.post("/register", async (req: Request, res: Response) => {
            await AuthorizationService.register(req, res)
        })
        app.post("/assignRole", [checkJwt, checkRole([Roles.CAPTAIN])], async (req: Request, res: Response) => {
            await AuthorizationService.assignRole(req, res)
        })
        app.post("/login", async (req: Request, res: Response) => {
            await AuthorizationService.login(req, res)
        })
        app.post("/logout", async (req: Request, res: Response) => {
            await AuthorizationService.logout(req, res)
        })
    }
}

export default new AuthorizationController()