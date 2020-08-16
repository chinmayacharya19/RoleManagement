import { Context } from '../Init'
import AuthorizationController from './AuthorizationController'
import CommandController from './CommandController'
import TaskController from './TaskController'

class MainController {
    registerRoutes(app: any, ctx: Context) {
        AuthorizationController.registerRoutes(app, ctx)
        CommandController.registerRoutes(app, ctx)
        TaskController.registerRoutes(app, ctx)
    }
}

export default new MainController()