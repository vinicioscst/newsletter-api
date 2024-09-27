import { NextFunction, Request, Response } from 'express'
import { ArticleController } from '../controllers/article.controller.js'
import { BaseRouter } from './base.router.js'
import { validateToken } from '../middlewares/validateToken.middleware.js'
import { validateRequestBody } from '../middlewares/validateRequestBody.middleware.js'
import {
  articleEditSchema,
  articleGenerateSchema
} from '../lib/zod/article.schema.js'
import { setPagination } from '../middlewares/setPagination.middleware.js'
import { verifyArticleById } from '../middlewares/verifyArticleById.middleware.js'

export class ArticleRouter extends BaseRouter<ArticleController> {
  constructor() {
    super(ArticleController)
  }

  routes(): void {
    this.router.post(
      '/articles',
      validateToken,
      validateRequestBody(articleGenerateSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.create(req, res, next)
      }
    )

    this.router.get(
      '/articles',
      setPagination,
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.read(req, res, next)
      }
    )

    this.router.get(
      '/articles/topics',
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.readTopics(req, res, next)
      }
    )

    this.router.patch(
      '/articles/:id',
      validateToken,
      verifyArticleById,
      validateRequestBody(articleEditSchema),
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.update(req, res, next)
      }
    )

    this.router.delete(
      '/articles/:id',
      validateToken,
      verifyArticleById,
      async (req: Request, res: Response, next: NextFunction) => {
        await this.controller.delete(req, res, next)
      }
    )
  }
}
