import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

declare global {
  var prismaClientSingleton: PrismaClient | undefined;
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString || !connectionString.trim()) {
    throw new Error('DATABASE_URL is not configured');
  }

  const pool = new Pool({
    connectionString: connectionString.trim(),
    ssl: { rejectUnauthorized: false },
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