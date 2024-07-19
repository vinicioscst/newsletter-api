import { NextFunction, Request, Response } from "express";
import { ArticleService } from "../services/article.service.js";

export class ArticleController {
  private service: ArticleService;
  constructor() {
    this.service = new ArticleService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { topic } = req.query;
      const { id } = res.locals;

      const articles = await this.service.create(topic as string, id);

      res.status(201).json(articles);
    } catch (error) {
      next(error);
    }
  }
}
