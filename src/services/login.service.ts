import bcryptjs from "bcryptjs";
import { AppError } from "../helpers/errors/appError.js";
import { searchForEmail } from "../helpers/searchForEmail.js";
import { TUser, TUserLogin } from "../lib/zod/user.schema.js";
import jsonwebtoken from "jsonwebtoken";

export class LoginService {
  constructor() {}

  async login(payload: TUserLogin): Promise<{ id: string; token: string }> {
    try {
      const user: TUser | null = await searchForEmail(payload.email, true);
      if (!user) throw new AppError("Credenciais inválidas", 401);

      const passwordsMatch = await bcryptjs.compare(
        payload.password,
        user.password
      );
      if (!passwordsMatch) throw new AppError("Credenciais inválidas", 401);

      const token: string = jsonwebtoken.sign(
        {
          name: user.name,
        },
        process.env.SECRET_KEY!,
        { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
      );

      return { id: user.id, token };
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }

      throw new AppError("Não foi possível fazer login", 500);
    }
  }
}
