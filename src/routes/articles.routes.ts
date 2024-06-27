import {
  FastifyInstance,
  HookHandlerDoneFunction,
  InjectOptions,
} from "fastify";

function articleRoutes(
  fastify: FastifyInstance,
  _: any,
  done: HookHandlerDoneFunction
) {
  fastify.get("/articles", (_, reply) => {
    reply.send("Hello World!");
  });

  fastify.get("/articles/images", (_, reply) => {
    reply.send("Hello World com imagens!");
  });

  done();
}

export { articleRoutes };
