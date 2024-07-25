import { NextFunction, Request, Response } from "express";
import { ArticleService } from "../services/article.service.js";

export class ArticleController {
  private service: ArticleService;
  constructor() {
    this.service = new ArticleService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { topic } = req.body;
      const { id } = res.locals;

      const articles = await this.service.create(topic, id);

      res.status(201).json(articles);
    } catch (error) {
      next(error);
    }
  }

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { pagination } = res.locals;

      const articles = await this.service.read(pagination);

      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const { id } = req.params;

      const article = await this.service.update(id, body);

      res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await this.service.delete(id);

      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}
