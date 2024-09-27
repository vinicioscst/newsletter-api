import { AxiosResponse } from 'axios'
import { Parser } from 'xml2js'
import { AppError } from './errors/appError.js'
import { IResponseArticle } from '../types/xmlResponse.js'

export async function parseXML(
  response: AxiosResponse
): Promise<IResponseArticle[]> {
  const parser = new Parser()
  try {
    const parsedData = await parser.parseStringPromise(response)
    if (parsedData === undefined) throw new Error()

    return parsedData.rss.channel[0].item
  } catch (error) {
    throw new AppError('Não foi possível converter os dados', 500)
  }
}
