import { NextFunction, Request, Response } from "express";
import { BaseRouter } from "./base.router.js";
import { UserController } from "../controllers/user.controller.js";
import { validateRequestBody } from "../middlewares/validateRequestBody.middleware.js";
import { userCreateSchema, userEditSchema } from "../lib/zod/user.schema.js";
import { verifyUserById } from "../middlewares/verifyUserById.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";
import { verifyIfUserAlreadyExists } from "../middlewares/verifyIfUserAlreadyExists.js";

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.post(
      "/user",
      verifyIfUserAlreadyExists,
      validateRequestBody(userCreateSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.create(req, res, next);
      }
    );

    this.router.get(
      "/user/:userId",
      validateToken,
      verifyUserById,
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.read(req, res, next);
      }
    );

    this.router.patch(
      "/user/:userId",
      validateToken,
      verifyUserById,
      validateRequestBody(userEditSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.update(req, res, next);
      }
    );

    this.router.delete(
      "/user/:userId",
      validateToken,
      verifyUserById,
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.remove(req, res, next);
      }
    );
  }
}
