import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export class UserController {
  private service: UserService;
  constructor() {
    this.service = new UserService();
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const user = await this.service.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async edit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const user = await this.service.edit(req.params.userId, req.body);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
