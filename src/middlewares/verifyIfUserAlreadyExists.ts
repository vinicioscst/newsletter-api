import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma/prismaClient.js";
import { AppError } from "../helpers/errors/appError.js";

export async function verifyIfUserAlreadyExists(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> {
  try {
    const user = await prisma.user.findFirst({ where: { isActive: true } });

    if (user) {
      return res
        .status(403)
        .json({ message: "Não foi possível criar outro usuário" });
    }

    next();
  } catch (error) {
    console.log(error);

    if (error instanceof AppError) {
      throw new AppError(error.message, error.status);
    }
  }
}
