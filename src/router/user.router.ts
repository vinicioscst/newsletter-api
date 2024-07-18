import { NextFunction, Request, Response } from "express";
import { BaseRouter } from "./base.router.js";
import { UserController } from "../controllers/user.controller.js";
import { validateRequestBody } from "../middlewares/validateRequestBody.middleware.js";
import { userCreateSchema, userEditSchema } from "../lib/zod/user.schema.js";
import { verifyUserByEmail } from "../middlewares/verifyUserByEmail.middleware.js";
import { verifyUserById } from "../middlewares/verifyUserById.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.post(
      "/user/create",
      verifyUserByEmail,
      validateRequestBody(userCreateSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.createUser(req, res, next);
      }
    );

    this.router.patch(
      "/user/:userId",
      validateToken,
      verifyUserById,
      validateRequestBody(userEditSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.editUser(req, res, next);
      }
    );
  }
}
