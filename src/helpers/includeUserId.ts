import { TArticleFormat } from '../lib/zod/article.schema.js'

export function includeUserId(articles: TArticleFormat[], userId: string) {
  const articlesWithUserId = articles.map((article: TArticleFormat) => {
    return {
      ...article,
      userId
    }
  })

  return articlesWithUserId
}
