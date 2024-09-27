import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export function validateRequestBody(
  schema: z.AnyZodObject
): (req: Request, res: Response, next: NextFunction) => void {
  return function (req: Request, res: Response, next: NextFunction): void {
    req.body = schema.parse(req.body)
    return next()
  }
}
