import { standardizeData } from "../helpers/geminiPrompts.js";
import { formatGeminiResponse } from "../helpers/formatGeminiResponse.js";
import { getXMLData } from "../helpers/getXMLData.js";
import { parseXML } from "../helpers/parseXML.js";
import { defineEndpoint } from "../helpers/defineEndpoint.js";
import { validateImageURL } from "../helpers/validateImageURL.js";
import { prisma } from "../database/prisma/prismaClient.js";
import { includeUserId } from "../helpers/includeUserId.js";
import { articleCreateSchema } from "../lib/zod/article.schema.js";
import { AppError } from "../helpers/errors/appError.js";

export class ArticleService {
  constructor() {}

  async create(topic: string, userId: string) {
    try {
      const apiUrl = defineEndpoint(topic);
      const articlesXML = await getXMLData(apiUrl);
      const parsedArticles = await parseXML(articlesXML);
      const standardizedArticles = await standardizeData(
        parsedArticles.slice(0, 10)
      );
      const formattedData = formatGeminiResponse(standardizedArticles);
      const articlesWithValidImages = await validateImageURL(formattedData);
      const articlesWithUserId = includeUserId(articlesWithValidImages, userId);

      const articles = await prisma.article.createMany({
        data: articlesWithUserId,
        skipDuplicates: true,
      });

      return articles;
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }
    }
  }
}
