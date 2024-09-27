import { Request, Response, NextFunction } from 'express'
import { LoginService } from '../services/login.service.js'

export class LoginController {
  private service: LoginService

  constructor() {
    this.service = new LoginService()
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const token = await this.service.login(req.body)
      return res.status(200).json(token)
    } catch (error) {
      next(error)
    }
  }
}
