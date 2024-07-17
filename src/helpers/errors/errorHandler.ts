import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "./appError.js";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  if (error instanceof AppError) {
    return res.status(error.status).json({ error: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ error: error.flatten().fieldErrors });
  }

  return res.status(500).json({ error: error.message });
}
