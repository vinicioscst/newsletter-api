import { AppError } from "../errors/appError.js";

async function validateImageURL(
  image: string | null,
  topic: string
): Promise<string> {
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

export { validateImageURL };
