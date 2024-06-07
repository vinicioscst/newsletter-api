import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Fastify from "fastify";

const fastify = Fastify();


// uma rota para noticias
// uma rota para imagens das noticias

fastify.get("/api/articles", async function (_, reply) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Me mostre as 15 notícias mais importantes do Brasil dos últimos 7 dias. Retorne as notícias em um array de objetos tendo os seguintes campos:
    - title (O nome da matéria)
    - description (Me devolva o subtítulo da matéria. Se não houver, preencha com null)
    - publishedAt (A data da publicação no formato ISO)
    - source (O nome do site onde a matéria foi veiculada)
    - url (O link da matéria)s
    - image (A imagem utilizada na matéria)`;

    const result = await model.generateContent(prompt);
    const articles = result.response.text();

    reply.send(articles);
  } catch (error) {
    console.log(error);
  }
});

fastify.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
