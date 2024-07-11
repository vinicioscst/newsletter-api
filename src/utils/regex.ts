import { Article } from "../classes/article.js";
import { AppError } from "../errors/appError.js";

function formatGeminiResponse(response: string): Article[] {
  const regex = /\[(.*?)\]/s;
  try {
    const format = regex.exec(response);
    if (format === null) throw new Error();

    return JSON.parse(format[0]);
  } catch (error) {
    throw new AppError("Was not possible to format response", 500);
  }
}

export { formatGeminiResponse };
