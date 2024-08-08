import { GoogleGenerativeAI } from "@google/generative-ai";
import { AppError } from "./errors/appError.js";
import { IResponseArticle } from "../types/xmlResponse.js";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function standardizeData(
  responseArray: IResponseArticle[]
): Promise<string> {
  try {
    const prompt = `Analyze the objects in the JSON array below and, based on the field names, return a JSON array with the following structure:

    - id (Generate a UUID type id)
    - title (The 'description' field in each object. Must use UTF-8 charset. Cannot be null)
    - topic (The news main subject. Must be in Portuguese)
    - subtopic (Related to the main subject. Example: E-Sports is a subtopic of Games. Must be in Portuguese)
    - content (Based on the title, search about the content and create an small description about the article. Must be in portuguese and use UTF-8 charset)
    - publishedAt (The publication date in ISO format)
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
    throw new AppError("Não foi possível coletar os campos das notícias", 500);
  }
}
