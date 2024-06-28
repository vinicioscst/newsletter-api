import { FastifyReply, FastifyRequest } from "fastify";
import {
  getArticlesService,
  getArticlesImagesService,
} from "../services/articles.service.js";
import { articles } from "../utils/variables.js";

async function getArticlesController(_: FastifyRequest, reply: FastifyReply) {
  const articles = await getArticlesService();
  reply.send(articles);
}

async function getArticlesImagesController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const articlesWithFormattedImages = await getArticlesImagesService(articles);
  reply.send(articlesWithFormattedImages);
}

export { getArticlesController, getArticlesImagesController };
