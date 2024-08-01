import { prisma } from "../database/prisma/prismaClient.js";
import {
  articleArraySchema,
  articleResponseSchema,
  TArticleCreateArray,
  TArticleEdit,
  TArticleResponse,
  TArticleTopics,
} from "../lib/zod/article.schema.js";
import { AppError } from "../helpers/errors/appError.js";
import { IPaginationParams, IPaginationResponse } from "../types/pagination.js";
import { createQueryPagination } from "../helpers/createQueryPagination.js";
import { createAndFormatArticles } from "../helpers/createAndFormatArticles.js";

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
    title: string | undefined
  ): Promise<IPaginationResponse | undefined> {
    try {
      const { skip, take } = createQueryPagination(page, perPage);
      const [articles, count] = await prisma.$transaction([
        prisma.article.findMany({
          where: {
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
          orderBy: {
            publishedAt: "desc",
          },
          skip,
          take,
        }),
        prisma.article.count({
          where: {
            title: {
              contains: title,
            },
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
