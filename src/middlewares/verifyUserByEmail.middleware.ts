import { Request, Response, NextFunction } from 'express'
import { searchForEmail } from '../helpers/searchForEmail.js'

export async function verifyUserByEmail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> {
  const user = await searchForEmail(req.body.email)

  if (user) {
    return res.status(409).json({ message: 'Email já está em uso' })
  }

  next()
}
