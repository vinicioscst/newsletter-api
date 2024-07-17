import { hash } from "bcrypt";
import { prisma } from "../database/prisma/prismaClient.js";
import { AppError } from "../helpers/errors/appError.js";
import {
  TUserCreate,
  UserResponseSchema,
  TUserCreateResponse,
} from "../lib/zod/user.schema.js";

export class UserService {
  constructor() {}

  async create(payload: TUserCreate): Promise<TUserCreateResponse> {
    payload.password = await hash(payload.password, 13);

    try {
      const user = await prisma.user.create({ data: payload });
      return UserResponseSchema.parse(user);
    } catch (error) {
      console.log(error);
      throw new AppError("Was not possible to create an user", 500);
    }
  }

  update() {}
}
