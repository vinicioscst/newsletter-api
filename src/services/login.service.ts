import { compare } from "bcryptjs";
import { AppError } from "../helpers/errors/appError.js";
import { searchForEmail } from "../helpers/searchForEmail.js";
import { TUser, TUserLogin } from "../lib/zod/user.schema.js";
import jsonwebtoken from "jsonwebtoken";

export class LoginService {
  constructor() {}

  async login(payload: TUserLogin) {
    try {
      const user: TUser | null = await searchForEmail(payload.email);
      if (!user) throw new AppError("Invalid credentials", 401);

      const passwordsMatch = await compare(payload.password, user.password);
      if (!passwordsMatch) throw new AppError("Invalid credentials", 401);

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

      throw new AppError("Was not possible to log in", 500);
    }
  }
}
