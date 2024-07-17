import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service.js";
import { AppError } from "../helpers/errors/appError.js";

export class UserController {
  private service: UserService;
  constructor() {
    this.service = new UserService();
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.service.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
