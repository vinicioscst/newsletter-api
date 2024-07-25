import { prisma } from "../database/prisma/prismaClient.js";
import { TUser } from "../lib/zod/user.schema.js";

export async function searchForEmail(
  email: string,
  addIsActive?: boolean
): Promise<TUser | null> {
  let whereConfig: { email: string; isActive?: boolean | undefined } = {
    email: email,
  };

  if (addIsActive) whereConfig = { ...whereConfig, isActive: true };

  const user = await prisma.user.findFirst({
    where: whereConfig,
  });

  return user;
}
