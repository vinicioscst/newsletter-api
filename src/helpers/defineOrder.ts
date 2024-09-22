import { TArticleDefineOrder } from '../lib/zod/article.schema.js'

export function defineOrder(order: string): TArticleDefineOrder {
  switch (order) {
    case 'MaisRecente':
      return {
        createdAt: 'asc'
      }
      break
    case 'MaisAntigo':
      return {
        createdAt: 'desc'
      }
      break
    case 'A-Z':
      return {
        title: 'asc'
      }
      break
    case 'Z-A':
      return {
        title: 'desc'
      }
      break
    default:
      return {
        createdAt: 'desc'
      }
      break
  }
}
