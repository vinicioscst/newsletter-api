import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma/prismaClient.js";
import { AppError } from "../helpers/errors/appError.js";

export async function verifyIfUserAlreadyExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await prisma.user.findFirst();

    if (user) {
      return res
        .status(403)
        .json({ message: "Not possible to create another user" });
    }

    next();
  } catch (error) {
    console.log(error);

    if (error instanceof AppError) {
      throw new AppError(error.message, error.status);
    }
  }
}
