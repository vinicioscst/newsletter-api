import { Article } from "../model/article.js";
import { generateArticles } from "../utils/gemini.js";
import { formatResponse } from "../utils/regex.js";
import { rewriteArticles } from "../utils/variables.js";
import { verifyImageURL } from "../utils/verifyImageURL.js";

async function getArticlesService() {
  const requestArticles = await generateArticles();
  if (requestArticles) {
    const formattedResponse = formatResponse(requestArticles);
    const formattedArticles = formattedResponse.map(
      (article) =>
        new Article(
          article.id,
          article.title,
          article.topic,
          article.headline,
          article.publishedAt,
          article.source,
          article.url,
          article.image
        )
    );

    return rewriteArticles(formattedArticles);
  }
}

async function getArticlesImagesService(articles: Article[]) {
  const formattedArticles = articles.map(async (article) => {
    return {
      ...article,
      image: await verifyImageURL(article.image, article.topic),
    };
  });

  return formattedArticles;
}

export { getArticlesService, getArticlesImagesService };
