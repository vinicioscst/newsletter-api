import { Request, Response, NextFunction } from 'express'
import { LoginController } from '../controllers/login.controller.js'
import { userLoginSchema } from '../lib/zod/user.schema.js'
import { validateRequestBody } from '../middlewares/validateRequestBody.middleware.js'
import { BaseRouter } from './base.router.js'

export class LoginRouter extends BaseRouter<LoginController> {
  constructor() {
    super(LoginController)
  }

  routes(): void {
    this.router.post(
      '/login',
      validateRequestBody(userLoginSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.login(req, res, next)
      }
    )
  }
}
