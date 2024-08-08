import { Request, Response, NextFunction } from "express";
import { searchUserForId } from "../helpers/searchUserForId.js";

export async function verifyUserById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> {
  const user = await searchUserForId(req.params.id);

  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  next();
}
