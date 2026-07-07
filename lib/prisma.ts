import { PrismaClient } from '@prisma/client';

declare global {
  var prismaClientSingleton: PrismaClient | undefined;
}

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured');
  }

  return databaseUrl;
}

function createPrismaClient() {
  process.env.DATABASE_URL = getDatabaseUrl();

  return new PrismaClient();
}

export async function getPrisma() {
  if (!globalThis.prismaClientSingleton) {
    globalThis.prismaClientSingleton = createPrismaClient();
  }

  return globalThis.prismaClientSingleton;
}