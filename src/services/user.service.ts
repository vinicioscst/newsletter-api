import { hash } from "bcrypt";
import { prisma } from "../database/prisma/prismaClient.js";
import { AppError } from "../helpers/errors/appError.js";
import {
  TUserCreate,
  UserCreateResponseSchema,
  TUserCreateResponse,
  UserResponseSchema,
  TUserResponse,
  TUserEdit,
} from "../lib/zod/user.schema.js";

export class UserService {
  constructor() {}

  async create(payload: TUserCreate): Promise<TUserCreateResponse> {
    payload.password = await hash(payload.password, 13);

    try {
      const user = await prisma.user.create({ data: payload });
      return UserCreateResponseSchema.parse(user);
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }

      throw new AppError("Was not possible to create an user", 500);
    }
  }

  async edit(userId: string, payload: TUserEdit): Promise<TUserResponse> {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...payload,
        },
      });

      return UserResponseSchema.parse(updatedUser);
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }

      throw new AppError("Was not possible to edit user", 500);
    }
  }

  update() {}
}
