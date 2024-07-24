import { prisma } from "../database/prisma/prismaClient.js";
import { TArticle } from "../lib/zod/article.schema.js";

export async function searchArticleForId(id: string): Promise<TArticle | null> {
  const article = await prisma.article.findFirst({
    where: {
      id,
    },
  });

  return article;
}
