import { PrismaClient } from "@prisma/client";

export class PrismaClientBootstrap {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaClientBootstrap.instance) {
      PrismaClientBootstrap.instance = new PrismaClient();
    }

    console.log("Database connected");

    return PrismaClientBootstrap.instance;
  }
}

export const prisma = PrismaClientBootstrap.getInstance();
