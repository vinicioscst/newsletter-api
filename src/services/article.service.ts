import { prisma } from "../database/prisma/prismaClient.js";
import {
  articleArraySchema,
  articleResponseSchema,
  TArticleCreateArray,
  TArticleEdit,
  TArticleDefineOrder,
  TArticleResponse,
  TArticleSearchQuery,
  TArticleTopics,
  TArticle,
} from "../lib/zod/article.schema.js";
import { AppError } from "../helpers/errors/appError.js";
import { IPaginationParams, IPaginationResponse } from "../types/pagination.js";
import { createQueryPagination } from "../helpers/createQueryPagination.js";
import { createAndFormatArticles } from "../helpers/createAndFormatArticles.js";
import { imageValidator } from "../helpers/validateImageURL.js";

export class ArticleService {
  constructor() {}

  async create(
    topic: string,
    userId: string
  ): Promise<{ count: number } | undefined> {
    try {
      const data = (await createAndFormatArticles(
        topic,
        userId
      )) as TArticleCreateArray;

      const articles = await prisma.article.createMany({
        data,
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

  async read(
    { page, perPage }: IPaginationParams,
    search: TArticleSearchQuery,
    ordernation: TArticleDefineOrder
  ): Promise<IPaginationResponse | undefined> {
    try {
      const { skip, take } = createQueryPagination(page, perPage);
      const [articles, count] = await prisma.$transaction([
        prisma.article.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: search,
                },
              },
              {
                topic: {
                  contains: search,
                },
              },
            ],
          },
          orderBy: ordernation,
          skip,
          take,
        }),
        prisma.article.count({
          where: {
            OR: [
              {
                title: {
                  contains: search,
                },
              },
              {
                topic: {
                  contains: search,
                },
              },
            ],
          },
        }),
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

  async readTopics(): Promise<TArticleTopics | undefined> {
    try {
      const topics = await prisma.article.findMany({
        select: {
          topic: true,
        },
        distinct: ["topic"],
      });

      return topics;
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }
    }
  }

  async update(
    articleId: string,
    payload: TArticleEdit,
    foundArticle: TArticle
  ): Promise<TArticleResponse | undefined> {
    if (payload.image === null || payload.image) {
      payload.image = await imageValidator(payload.image, payload.topic!);
    }

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

  async delete(articleId: string): Promise<void> {
    try {
      await prisma.article.delete({
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
