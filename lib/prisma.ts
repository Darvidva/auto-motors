import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

declare global {
  var prismaClientSingleton: PrismaClient | undefined;
  var prismaPoolSingleton: Pool | undefined;
}

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl || !databaseUrl.trim()) {
    throw new Error('DATABASE_URL is not configured');
  }

  return databaseUrl.trim();
}

function getPool() {
  if (!globalThis.prismaPoolSingleton) {
    globalThis.prismaPoolSingleton = new Pool({
      connectionString: getDatabaseUrl(),
    });
  }

  return globalThis.prismaPoolSingleton;
}

function createPrismaClient() {
  const adapter = new PrismaPg(getPool());

  return new PrismaClient({ adapter });
}

export async function getPrisma() {
  if (!globalThis.prismaClientSingleton) {
    globalThis.prismaClientSingleton = createPrismaClient();
  }

  return globalThis.prismaClientSingleton;
}