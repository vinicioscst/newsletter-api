import { Request, Response } from "express";
import { ArticleController } from "../controllers/article.controller.js";
import { BaseRouter } from "./router.js";

export class ArticleRouter extends BaseRouter<ArticleController> {
  constructor() {
    super(ArticleController);
  }

  routes() {
    this.router.get("/articles", async (req: Request, res: Response) => {
      await this.controller.getArticles(req, res);
    });

    this.router.get("/articles/images", async (req: Request, res: Response) => {
      await this.controller.getArticles(req, res);
    });
  }
}
