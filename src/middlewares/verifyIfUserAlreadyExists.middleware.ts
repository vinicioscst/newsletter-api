import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma/prismaClient.js";
import { searchForEmail } from "../helpers/searchForEmail.js";

export async function verifyIfEmailIsUnique(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await searchForEmail(req.body.email);

  if (user)
    return res.status(409).json({ message: "Email has already been taken" });

  next();
}
