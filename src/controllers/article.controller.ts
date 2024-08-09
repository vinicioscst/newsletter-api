import { NextFunction, Request, Response } from "express";
import { ArticleService } from "../services/article.service.js";
import {
  articleOrderQuerySchema,
  articleSearchQuerySchema,
} from "../lib/zod/article.schema.js";
import { defineOrder } from "../helpers/defineOrder.js";

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
      const { search, orderBy } = req.query;

      let parsedSearch = articleSearchQuerySchema.parse(search);
      if (parsedSearch === undefined) parsedSearch = "";

      const parsedOrder = articleOrderQuerySchema.parse(orderBy);
      const order = defineOrder(parsedOrder);

      const articles = await this.service.read(pagination, parsedSearch, order);

      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }

  async readTopics(req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await this.service.readTopics();

      res.status(200).json(topics);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const { id } = req.params;
      const { article } = res.locals;

      const editedArticle = await this.service.update(id, body, article);

      res.status(200).json(editedArticle);
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
