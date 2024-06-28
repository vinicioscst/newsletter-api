import { Article } from "../model/article.js";

function formatResponse(response: string): Article[] {
  const regex = /\[(.*?)\]/s;
  const format = regex.exec(response);

  if (format) return JSON.parse(format[0]);

  throw Error("Não foi possível formatar a resposta");
}

export { formatResponse };
