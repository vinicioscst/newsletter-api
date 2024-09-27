import { prisma } from '../database/prisma/prismaClient.js'
import { TUser } from '../lib/zod/user.schema.js'

export async function searchUserForId(id: string): Promise<TUser | null> {
  const user = await prisma.user.findFirst({
    where: {
      id,
      isActive: true
    }
  })

  return user
}
