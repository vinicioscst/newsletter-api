import { Article } from "../classes/article.js";

let articles: Article[] = [];

function rewriteArticles(payload: Article[]): Article[] {
  const payloadToArticles = payload.map(
    (article) =>
      new Article(
        article.id,
        article.title,
        article.topic,
        article.publishedAt,
        article.source,
        article.url,
        article.image
      )
  );

  articles = payloadToArticles;
  return articles;
}

export { articles, rewriteArticles };
