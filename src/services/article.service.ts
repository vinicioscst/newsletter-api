import { standardizeData } from "../helpers/geminiPrompts.js";
import { formatGeminiResponse } from "../helpers/formatGeminiResponse.js";
import { getXMLData } from "../helpers/getXMLData.js";
import { parseXML } from "../helpers/parseXML.js";
import { defineEndpoint } from "../helpers/defineEndpoint.js";
import { validateImageURL } from "../helpers/validateImageURL.js";
import { prisma } from "../database/prisma/prismaClient.js";
import { includeUserId } from "../helpers/includeUserId.js";
import {
  articleArraySchema,
  articleResponseSchema,
  TArticleEdit,
  TArticleResponse,
} from "../lib/zod/article.schema.js";
import { AppError } from "../helpers/errors/appError.js";
import { IPaginationParams, IPaginationResponse } from "../types/pagination.js";
import { createQueryPagination } from "../helpers/createQueryPagination.js";

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

  async read({
    page,
    perPage,
  }: IPaginationParams): Promise<IPaginationResponse | undefined> {
    try {
      const { skip, take } = createQueryPagination(page, perPage);
      const [articles, count] = await prisma.$transaction([
        prisma.article.findMany({
          skip,
          take,
        }),
        prisma.article.count(),
      ]);

      return {
        prevPage: page <= 1 ? null : page - 1,
        nextPage: count - (page - 1) * perPage <= perPage ? null : page + 1,
        count,
        articles: articleArraySchema.parse(articles),
      };
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }
    }
  }

  async update(
    articleId: string,
    payload: TArticleEdit
  ): Promise<TArticleResponse | undefined> {
    try {
      const editedArticle = await prisma.article.update({
        where: {
          id: articleId,
        },
        data: payload,
      });

      return articleResponseSchema.parse(editedArticle);
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }
    }
  }

  async delete(articleId: string) {
    try {
      return await prisma.article.delete({
        where: {
          id: articleId,
        },
      });
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }
    }
  }
}
