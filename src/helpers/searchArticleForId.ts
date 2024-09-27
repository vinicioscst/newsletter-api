import { prisma } from '../database/prisma/prismaClient.js'
import { TArticleResponse } from '../lib/zod/article.schema.js'

export async function searchArticleForId(
  id: string
): Promise<TArticleResponse | null> {
  const article = await prisma.article.findFirst({
    where: {
      id
    }
  })

  return article
}
