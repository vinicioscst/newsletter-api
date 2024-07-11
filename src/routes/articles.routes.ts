import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import {
  getArticlesController,
  getArticlesImagesController,
} from "../controllers/articles.controller.js";
import { RequestQuery } from "../interfaces/interfaces.js";

function articleRoutes(
  fastify: FastifyInstance,
  _: any,
  done: HookHandlerDoneFunction
) {
  fastify.get(
    "/articles",
    async (
      request: FastifyRequest<{ Querystring: RequestQuery }>,
      reply: FastifyReply
    ) => {
      await getArticlesController(request, reply);
    }
  );

  fastify.get(
    "/articles/images",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getArticlesImagesController(request, reply);
    }
  );

  done();
}

export { articleRoutes };
