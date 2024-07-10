import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError.js";

function handleErrors(
  error: Error,
  req: Request,
  rep: Response,
  next: NextFunction
): Response {
  if (error instanceof AppError) {
    return rep.status(error.status).send({ message: error.message });
  }

  return rep.status(500).send({ error: error.message });
}

export { handleErrors };
