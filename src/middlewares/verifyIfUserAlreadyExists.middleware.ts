import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma/prismaClient.js";

export async function verifyIfEmailIsUnique(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (user)
    return res.status(409).json({ message: "Email has already been taken" });

  next();
}
