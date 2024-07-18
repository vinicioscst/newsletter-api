import { Request, Response, NextFunction } from "express";
import { AppError } from "../helpers/errors/appError.js";
import jsonwebtoken from "jsonwebtoken";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: "Missing token" });

  const token = authorization.split(" ")[1];
  if (!token) res.status(401).json({ message: "Missing token" });

  try {
    jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY!,
      (
        error: jsonwebtoken.VerifyErrors | null,
        decoded: string | jsonwebtoken.JwtPayload | undefined
      ) => {
        if (error) {
          res.status(401).json({ message: "Invalid token" });
        }

        res.locals.id = decoded?.sub;

        next();
      }
    );
  } catch (error) {
    console.log(error);

    if (error instanceof AppError) {
      throw new AppError(error.message, error.status);
    }
  }
}
