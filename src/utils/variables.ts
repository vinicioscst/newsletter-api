import { Article } from "../model/article.js";

let articles: Article[] = [];

function rewriteArticles(value: Article[] | Promise<Article>[]) {
  articles = value as Article[];
  return articles;
}

export { articles, rewriteArticles };
