import {
  articleCreateArraySchema,
  TArticleCreateArray,
} from "../lib/zod/article.schema.js";
import { defineEndpoint } from "./defineEndpoint.js";
import { AppError } from "./errors/appError.js";
import { formatGeminiResponse } from "./formatGeminiResponse.js";
import { standardizeData } from "./geminiPrompts.js";
import { getXMLData } from "./getXMLData.js";
import { includeUserId } from "./includeUserId.js";
import { parseXML } from "./parseXML.js";
import { validateDate } from "./validateDate.js";
import { validateImageURL } from "./validateImageURL.js";

export async function createAndFormatArticles(
  topic: string,
  userId: string
): Promise<TArticleCreateArray | undefined> {
  try {
    const apiUrl = defineEndpoint(topic);
    const articlesXML = await getXMLData(apiUrl);
    const parsedArticles = await parseXML(articlesXML);
    const standardizedArticles = await standardizeData(
      parsedArticles.slice(0, 10)
    );
    const formattedData = formatGeminiResponse(standardizedArticles);
    const articlesWithValidImages = await validateImageURL(formattedData);
    const articlesWithValidDates = await validateDate(articlesWithValidImages);
    const articlesWithUserId = includeUserId(articlesWithValidDates, userId);

    const data = articleCreateArraySchema.parse(articlesWithUserId);

    return data;
  } catch (error) {
    console.log(error);

    if (error instanceof AppError) {
      throw new AppError(error.message, error.status);
    }
  }
}
