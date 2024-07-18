import { Request, Response, NextFunction } from "express";
import { searchForEmail } from "../helpers/searchForEmail.js";

export async function verifyUserByEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await searchForEmail(req.body.email);

  if (user)
    return res.status(409).json({ message: "Email has already been taken" });

  next();
}
