import { FastifyInstance, HookHandlerDoneFunction } from "fastify";
import {
  getArticlesController,
  getArticlesImagesController,
} from "../controllers/articles.controller.js";

function articleRoutes(
  fastify: FastifyInstance,
  _: any,
  done: HookHandlerDoneFunction
) {
  fastify.get("/articles", async (_, reply) => {
    await getArticlesController(_, reply);
  });

  fastify.get("/articles/images", async (_, reply) => {
    await getArticlesImagesController(_, reply);
  });

  done();
}

export { articleRoutes };
