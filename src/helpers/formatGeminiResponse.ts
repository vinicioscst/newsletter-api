import { TArticleFormat } from "../lib/zod/article.schema.js";
import { AppError } from "./errors/appError.js";

export function formatGeminiResponse(response: string): TArticleFormat[] {
  const regex = /\[(.*?)\]/s;
  try {
    const format = regex.exec(response);
    if (format === null) throw new Error();

    return JSON.parse(format[0]);
  } catch (error) {
    throw new AppError("Não foi possível formatar a resposta da IA", 500);
  }
}
