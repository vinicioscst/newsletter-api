import { NextFunction, Request, Response } from 'express'
import { BaseRouter } from './base.router.js'
import { UserController } from '../controllers/user.controller.js'
import { validateRequestBody } from '../middlewares/validateRequestBody.middleware.js'
import { userCreateSchema, userEditSchema } from '../lib/zod/user.schema.js'
import { verifyUserById } from '../middlewares/verifyUserById.middleware.js'
import { validateToken } from '../middlewares/validateToken.middleware.js'
import { verifyIfUserAlreadyExists } from '../middlewares/verifyIfUserAlreadyExists.js'
import { verifyUserByEmail } from '../middlewares/verifyUserByEmail.middleware.js'

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController)
  }

  routes(): void {
    this.router.post(
      '/user',
      verifyIfUserAlreadyExists,
      verifyUserByEmail,
      validateRequestBody(userCreateSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.create(req, res, next)
      }
    )

    this.router.get(
      '/user/:id',
      validateToken,
      verifyUserById,
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.read(req, res, next)
      }
    )

    this.router.patch(
      '/user/:id',
      validateToken,
      verifyUserById,
      validateRequestBody(userEditSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.update(req, res, next)
      }
    )

    this.router.delete(
      '/user/:id',
      validateToken,
      verifyUserById,
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.remove(req, res, next)
      }
    )
  }
}
