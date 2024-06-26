import "dotenv/config";
import cors from "@fastify/cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Fastify from "fastify";

const fastify = Fastify();
await fastify.register(cors, {
  origin: ["http://localhost:8000", "https://newsletter-vue.vercel.app"],
});

fastify.get("/api/articles", async function (_, reply) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Me mostre as 10 notícias mais importantes do Brasil dos últimos 7 dias. As retorne formatadas em JSON como um array de objetos, tendo os seguintes campos:
    - title (O título da notícia)
    - topic (O tema da notícia)
    - headline (A chamada da notícia)
    - publishedAt (A data da publicação no formato ISO)
    - source (O nome do site onde a notícia foi veiculada)
    - url (O link da notícia)`;

    const result = await model.generateContent(prompt);
    const articles = result.response.text();

    const formatted = JSON.parse(
      articles.split("```")[1].slice(4, articles.length)
    );
    console.log(typeof formatted);
    reply.send({ type: typeof formatted, response: formatted });
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
