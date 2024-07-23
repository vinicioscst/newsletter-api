import { TArticleResponse } from "../lib/zod/article.schema.js";

interface IPaginationResponse {
  prevPage: null | number;
  nextPage: null | number;
  count: number;
  articles: TArticleResponse[];
}

interface IPaginationParams {
  page: number;
  perPage: number;
}

interface IQueryPagination {
  skip: number;
  take: number;
}

export { IPaginationResponse, IPaginationParams, IQueryPagination };
