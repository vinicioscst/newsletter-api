import { AppError } from "../helpers/errors/appError.js";
import { TArticleFormat } from "../lib/zod/article.schema.js";

export async function validateImageURL(
  articles: TArticleFormat[]
): Promise<TArticleFormat[]> {
  const formattedArticles = await Promise.all(
    articles.map(async (article: TArticleFormat) => {
      return {
        ...article,
        image: await validator(article.image || null, article.topic),
      };
    })
  );

  return formattedArticles;
}

async function validator(image: string | null, topic: string): Promise<string> {
  try {
    if (image !== null) {
      const fetchStatus = (await fetch(image)).status;
      if (fetchStatus !== 200) {
        return `https://via.placeholder.com/600x400/263238?text=${topic}`;
      }
      return image;
    }
    return `https://via.placeholder.com/600x400/263238?text=${topic}`;
  } catch (error) {
    throw new AppError("Was not possible to fetch image", 500);
  }
}
