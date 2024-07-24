import { Request, Response, NextFunction } from "express";
import { searchUserForId } from "../helpers/searchUserForId.js";

export async function verifyUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await searchUserForId(req.params.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.locals.foundUser = user;

  next();
}
