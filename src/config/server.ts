import "dotenv/config";
import cors from "@fastify/cors";
import Fastify from "fastify";
import { articleRoutes } from "../routes/articles.routes.js";
import fastifyExpress from "@fastify/express";
import { handleErrors } from "../middlewares/handleErrors.js";

const fastify = Fastify();
await fastify.register(fastifyExpress);

await fastify.register(cors, {
  origin: ["http://localhost:8000", "https://newsletter-vue.vercel.app"],
});

await fastify.register(articleRoutes, { prefix: "/api" });

fastify.use(handleErrors);

fastify.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
