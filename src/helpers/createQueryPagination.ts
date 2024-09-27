import { IQueryPagination } from '../types/pagination.js'

export function createQueryPagination(
  page: number,
  perPage: number
): IQueryPagination {
  const pagination = {
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage)
  }

  return pagination
}
