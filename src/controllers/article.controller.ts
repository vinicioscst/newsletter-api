import { Request, Response } from "express";
import {
  getArticlesService,
  getArticlesImagesService,
} from "../services/articles.service.js";
import { articles } from "../utils/variables.js";

export class ArticleController {
  async getArticles(req: Request, res: Response) {
    const { topic } = req.query;
    const articles = await getArticlesService(topic as string);
    res.status(201).json(articles);
  }

  async getArticlesWithFormattedImages(req: Request, res: Response) {
    const formattedArticles = await getArticlesImagesService(articles);
    res.status(200).json(formattedArticles);
  }
}
