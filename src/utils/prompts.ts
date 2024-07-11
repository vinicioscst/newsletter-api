import { GoogleGenerativeAI } from "@google/generative-ai";
import { IResponseArticle } from "../interfaces/interfaces.js";
import { AppError } from "../errors/appError.js";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function standardizeData(
  responseArray: IResponseArticle[]
): Promise<string> {
  try {
    const prompt = `Analyze the objects in the JSON array below and, based on the field names, return a JSON array with the following structure:

    - id (Generate a UUID type id)
    - title (The news headline, using UTF-8 charset)
    - topic (The news main subject. Must be in Portuguese)
    - publishedAt (The publication date)
    - source (The name of the website where the news was published)
    - url (The news reference link)
    - image (The news reference image link. Sometimes available on description field)

    The array: 
    ${JSON.stringify(responseArray)}
    `;

    const result = await model.generateContent(prompt);

    if (result.response.text() === undefined) throw new Error();

    return result.response.text();
  } catch (error) {
    throw new AppError("Was not possible to collect response fields", 500);
  }
}

export { standardizeData };