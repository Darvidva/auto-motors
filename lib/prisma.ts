import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

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
  const pool = new Pool({
    connectionString: getDatabaseUrl(),
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : undefined,
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
}

export async function getPrisma() {
  if (!globalThis.prismaClientSingleton) {
    globalThis.prismaClientSingleton = createPrismaClient();
  }

  return globalThis.prismaClientSingleton;
}