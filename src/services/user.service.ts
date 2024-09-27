import bcryptjs from 'bcryptjs'
import { prisma } from '../database/prisma/prismaClient.js'
import { AppError } from '../helpers/errors/appError.js'
import {
  TUserCreate,
  UserCreateResponseSchema,
  TUserCreateResponse,
  TUserResponse,
  TUserEdit,
  UserEditResponseSchema,
  UserResponseSchema,
  TUserEditResponse,
  TUserDeleteResponse,
  UserDeleteResponseSchema
} from '../lib/zod/user.schema.js'

export class UserService {
  constructor() {}

  async create(payload: TUserCreate): Promise<TUserCreateResponse> {
    payload.password = await bcryptjs.hash(payload.password, 13)

    try {
      const user = await prisma.user.create({ data: payload })
      return UserCreateResponseSchema.parse(user)
    } catch (error) {
      console.log(error)

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status)
      }

      throw new AppError('Não foi possível criar um usuário', 500)
    }
  }

  async read(userId: string): Promise<TUserResponse> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: userId
        }
      })

      return UserResponseSchema.parse(user)
    } catch (error) {
      console.log(error)

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status)
      }

      throw new AppError('Não foi possível listar usuário', 500)
    }
  }

  async update(userId: string, payload: TUserEdit): Promise<TUserEditResponse> {
    try {
      if (payload.password)
        payload.password = await bcryptjs.hash(payload.password, 13)

      const updatedUser = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          ...payload
        }
      })

      return UserEditResponseSchema.parse(updatedUser)
    } catch (error) {
      console.log(error)

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status)
      }

      throw new AppError('Não foi possível editar usuário', 500)
    }
  }

  async remove(userId: string): Promise<TUserDeleteResponse> {
    try {
      const user = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          isActive: false,
          deactivatedAt: new Date()
        }
      })

      return UserDeleteResponseSchema.parse(user)
    } catch (error) {
      console.log(error)

      if (error instanceof AppError) {
        throw new AppError(error.message, error.status)
      }

      throw new AppError('Não foi possível deletar usuário', 500)
    }
  }
}
