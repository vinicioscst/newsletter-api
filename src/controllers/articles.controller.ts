import { FastifyReply, FastifyRequest } from "fastify";
import {
  getArticlesService,
  getArticlesImagesService,
} from "../services/articles.service.js";
import { articles } from "../utils/variables.js";
import { RequestQuery } from "../interfaces/interfaces.js";

async function getArticlesController(
  request: FastifyRequest<{ Querystring: RequestQuery }>,
  reply: FastifyReply
) {
  const { topic } = request.query;
  const articles = await getArticlesService(topic);
  reply.send(articles);
}

async function getArticlesImagesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const articlesWithFormattedImages = await getArticlesImagesService(articles);
  reply.send(articlesWithFormattedImages);
}

export { getArticlesController, getArticlesImagesController };
