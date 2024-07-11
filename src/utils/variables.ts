import { Article } from "../classes/article.js";

let articles: Article[] = [];

function rewriteArticles(value: Article[]): Article[] {
  const valueToArticles = value.map(
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

  articles = valueToArticles;
  return articles;
}

export { articles, rewriteArticles };
