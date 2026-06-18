let cached: any;

export async function getPrisma() {
  if (cached) return cached;
  const { PrismaClient } = await import('@prisma/client');
  cached = new PrismaClient();
  return cached;
}
