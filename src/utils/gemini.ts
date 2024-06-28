import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

async function generateArticles() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Me mostre as 10 notícias mais importantes do Brasil dos últimos 7 dias. As retorne formatadas em JSON como um array de objetos, tendo os seguintes campos:
    - id (O id da notícia, do tipo UUID)
    - title (O título da notícia)
    - topic (O tema da notícia)
    - headline (A chamada da notícia)
    - publishedAt (A data da publicação no formato ISO)
    - source (O nome do site onde a notícia foi veiculada)
    - url (O link da notícia)
    - image (O link da imagem da notícia)
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
}

export { generateArticles };
