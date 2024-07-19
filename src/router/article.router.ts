import { NextFunction, Request, Response } from "express";
import { ArticleController } from "../controllers/article.controller.js";
import { BaseRouter } from "./base.router.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

export class ArticleRouter extends BaseRouter<ArticleController> {
  constructor() {
    super(ArticleController);
  }

  routes(): void {
    this.router.get(
      "/articles/generate",
      validateToken,
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.create(req, res, next);
      }
    );
  }
}
