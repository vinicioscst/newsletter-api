import { NextFunction, Request, Response } from "express";
import { BaseRouter } from "./base.router.js";
import { UserController } from "../controllers/user.controller.js";
import { validateRequestBody } from "../middlewares/validateRequestBody.middleware.js";
import { userCreateSchema } from "../lib/zod/user.schema.js";
import { verifyIfEmailIsUnique } from "../middlewares/verifyIfUserAlreadyExists.middleware.js";

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes() {
    this.router.post(
      "/user/create",
      validateRequestBody(userCreateSchema),
      verifyIfEmailIsUnique,
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.createUser(req, res, next);
      }
    );
  }
}
