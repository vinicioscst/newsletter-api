import bcryptjs from "bcryptjs";
import { prisma } from "../database/prisma/prismaClient.js";
import { AppError } from "../helpers/errors/appError.js";
import {
  TUserCreate,
  UserCreateResponseSchema,
  TUserCreateResponse,
  TUserResponse,
  TUserEdit,
  UserEditResponseSchema,
  UserResponseSchema,
  TUserEditResponse,
} from "../lib/zod/user.schema.js";

export class UserService {
  constructor() {}

  async create(payload: TUserCreate): Promise<TUserCreateResponse> {
    payload.password = await bcryptjs.hash(payload.password, 13);

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

  async read(userId: string): Promise<TUserResponse> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      return UserResponseSchema.parse(user);
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }

      throw new AppError("Was not possible to list user", 500);
    }
  }

  async update(userId: string, payload: TUserEdit): Promise<TUserEditResponse> {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...payload,
        },
      });

      return UserEditResponseSchema.parse(updatedUser);
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }

      throw new AppError("Was not possible to edit user", 500);
    }
  }

  async remove(userId: string): Promise<void> {
    try {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status);
      }

      throw new AppError("Was not possible to delete user", 500);
    }
  }
}
