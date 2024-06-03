import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/api/articles", async function (_, reply) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  const todayDate = new Date();
  const lastWeekDate = new Date();
  lastWeekDate.setDate(todayDate.getDate() - 7);
  const today = `${todayDate.getDate()}-${
    todayDate.getMonth() + 1
  }-${todayDate.getFullYear()}`;
  const lastWeek = `${lastWeekDate.getDate()}-${
    lastWeekDate.getMonth() + 1
  }-${lastWeekDate.getFullYear()}`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Colete no Google Notícias as notícias mais importantes do Brasil publicadas de ${lastWeek} a ${today} me devolva as 15 primeiras. Responda com notícias reais e listadas como um array de objetos (as notícias) no Javascript, tendo os objetos os seguintes campos:
    - title (O nome da matéria)
    - description (Me devolva o subtítulo da matéria. Se não houver, preencha com null)
    - publishedAt (A data da publicação no formato ISO)
    - source (O nome do site onde a matéria foi veiculada)
    - url (O link da matéria)
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
