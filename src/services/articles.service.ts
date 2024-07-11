import { Article } from "../classes/article.js";
import { standardizeData } from "../utils/prompts.js";
import { formatGeminiResponse } from "../utils/regex.js";
import { getXMLData } from "../utils/rss.js";
import { validateImageURL } from "../utils/validateImageURL.js";
import { parseXML } from "../utils/parseXML.js";
import { defineEndpoint } from "../utils/defineEndpoint.js";
import { rewriteArticles } from "../utils/variables.js";

async function getArticlesService(topic: string): Promise<Article[]> {
  const apiUrl = defineEndpoint(topic);
  const xmlData = await getXMLData(apiUrl);
  const parsedData = await parseXML(xmlData);
  const standardizedData = await standardizeData(parsedData.slice(0, 10));
  const formattedData = formatGeminiResponse(standardizedData);
  const articles = rewriteArticles(formattedData);

  return articles;
}

async function getArticlesImagesService(payload: Article[]): Promise<Article[]> {
  const adjustedArticlesPromises = payload.map(async (article) => {
    return {
      ...article,
      image: await validateImageURL(article.image, article.topic),
    };
  });

  const adjustedArticles = await Promise.all(adjustedArticlesPromises);
  const articles = rewriteArticles(adjustedArticles);

  return articles;
}

export { getArticlesService, getArticlesImagesService };
