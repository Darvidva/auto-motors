import { PrismaClient } from '@prisma/client';

declare global {
  var prismaClientSingleton: PrismaClient | undefined;
}

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl || !databaseUrl.trim()) {
    throw new Error('DATABASE_URL is not configured');
  }

  return databaseUrl.trim();
}

function createPrismaClient() {
  getDatabaseUrl();

  return new PrismaClient({});
}

export async function getPrisma() {
  if (!globalThis.prismaClientSingleton) {
    globalThis.prismaClientSingleton = createPrismaClient();
  }

  return globalThis.prismaClientSingleton;
}