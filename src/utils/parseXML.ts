import { AxiosResponse } from "axios";
import { Parser } from "xml2js";
import { IResponseArticle } from "../interfaces/interfaces.js";
import { AppError } from "../errors/appError.js";

async function parseXML(response: AxiosResponse): Promise<IResponseArticle[]> {
  const parser = new Parser();
  try {
    const parsedData = await parser.parseStringPromise(response);
    if (parsedData === undefined) throw new Error();

    return parsedData.rss.channel[0].item;
  } catch (error) {
    throw new AppError("Was not possible to parse data", 500);
  }
}

export { parseXML };
