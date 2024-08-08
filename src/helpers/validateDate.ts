import { TArticleFormat } from "../lib/zod/article.schema.js";
import { AppError } from "./errors/appError.js";

export function validateDate(articles: TArticleFormat[]): TArticleFormat[] {
  const formattedArticles = articles.map((article: TArticleFormat) => {
    return {
      ...article,
      publishedAt: validator(article.publishedAt || null),
    };
  });

  return formattedArticles;
}

function validator(publishedAt: Date | null): Date | null {
  try {
    if (publishedAt !== null) {
      return new Date(publishedAt);
    }
    return null;
  } catch (error) {
    throw new AppError("Não foi possível validar a data", 500);
  }
}
