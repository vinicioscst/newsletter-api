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

  async read(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const user = await this.service.read(req.params.userId);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const user = await this.service.update(req.params.userId, req.body);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async remove(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      await this.service.remove(req.params.userId);
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
