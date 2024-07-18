import { Request, Response, NextFunction } from "express";
import { searchForId } from "../helpers/searchForId.js";

export async function verifyUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await searchForId(req.params.userId);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.locals.foundUser = user;

  next();
}
