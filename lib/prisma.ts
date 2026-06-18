// @ts-ignore: PrismaClient is generated dynamically and might show a cached IDE error
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

let cached: PrismaClient;

export async function getPrisma() {
  if (cached) return cached;
  
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  
  cached = new PrismaClient({ adapter });
  return cached;
}
