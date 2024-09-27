import { prisma } from '../database/prisma/prismaClient.js'
import bcryptjs from 'bcryptjs'
import { AppError } from './errors/appError.js'

export async function verifyUsersToBeDeleted() {
  try {
    console.log('Verifying users to be deleted...')

    const users = await prisma.user.findMany({
      where: {
        isActive: false,
        deactivatedAt: {
          lte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    })

    for (const user of users) {
      const hashedEmail = await bcryptjs.hash(user.email, 13)
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: hashedEmail,
          deletedAt: new Date()
        }
      })
    }

    if (users.length > 0) {
      console.log('User(s) deleted with success')
    }
  } catch (error) {
    console.log(error)

    if (error instanceof AppError) {
      throw new AppError(error.message, error.status)
    }

    throw new AppError(
      'Não foi possível verificar usuário(s) para ser(em) deletado(s)',
      500
    )
  }
}
