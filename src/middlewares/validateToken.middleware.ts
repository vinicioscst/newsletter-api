import { Request, Response, NextFunction } from 'express'
import { AppError } from '../helpers/errors/appError.js'
import jsonwebtoken from 'jsonwebtoken'

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> {
  const { authorization } = req.headers
  if (!authorization) return res.status(401).json({ message: 'Token ausente' })

  const token = authorization.split(' ')[1]
  if (!token) res.status(401).json({ message: 'Token ausente' })

  try {
    jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY!,
      (
        error: jsonwebtoken.VerifyErrors | null,
        decoded: string | jsonwebtoken.JwtPayload | undefined
      ) => {
        if (error) {
          return res.status(401).json({ message: 'Token inválido' })
        }

        res.locals.id = decoded?.sub

        next()
      }
    )
  } catch (error) {
    console.log(error)

    if (error instanceof AppError) {
      throw new AppError(error.message, error.status)
    }
  }
}
