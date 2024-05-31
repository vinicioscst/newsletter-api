import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/api/articles", async function (_, reply) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Colete as notícias mais importantes do dia de hoje, ${new Date()}, no Brasil e me devolva as 15 primeiras. Devolva apenas notícias reais e de portais e jornais relevantes.
    A reposta precisa estar como um array de objetos em Javascript transformado em string através do método stringify do JSON, tendo os objetos os seguintes campos:
    - title (O nome da matéria)
    - description (Me devolva o subtítulo da matéria. Se não houver, preencha com null)
    - publishedAt (A data da publicação no formato ISO)
    - source (O nome do site onde a matéria foi veiculada)
    - url (O link da matéria. Pegue o link diretamente do site, e não do Google)
    - image (A imagem utilizada na matéria. Pegue a imagem diretamente do site, e não do Google)`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const articles = JSON.parse(response.text().slice(7, -3));

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
