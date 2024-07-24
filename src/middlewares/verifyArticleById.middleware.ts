import { Request, Response, NextFunction } from "express";
import { searchArticleForId } from "../helpers/searchArticleForId.js";

export async function verifyArticleById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const article = await searchArticleForId(req.params.id);

  if (!article) return res.status(404).json({ message: "Article not found" });

  res.locals.foundArticle = article;

  next();
}
