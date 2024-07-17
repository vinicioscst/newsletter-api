import { NextFunction, Request, Response } from "express";
import { AppError } from "../helpers/appError.js";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  if (error instanceof AppError) {
    return res.status(error.status).send({ message: error.message });
  }

  return res.status(500).send({ error: error.message });
}
