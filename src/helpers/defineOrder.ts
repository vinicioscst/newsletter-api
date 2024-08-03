import { TArticleDefineOrder } from "../lib/zod/article.schema.js";

export function defineOrder(order: string): TArticleDefineOrder {
  switch (order) {
    case "MaisRecente":
      return {
        publishedAt: "desc",
      };
      break;
    case "MaisAntigo":
      return {
        publishedAt: "asc",
      };
      break;
    case "A-Z":
      return {
        title: "asc",
      };
      break;
    case "Z-A":
      return {
        title: "desc",
      };
      break;
    default:
      return {
        publishedAt: "desc",
      };
      break;
  }
}
