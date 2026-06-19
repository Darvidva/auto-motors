require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter, log: ['info', 'warn', 'error'] });

async function main() {
  console.log('Start seeding...');

  // 1. Seed Business Settings
  const settings = await prisma.businessSettings.create({
    data: {
      name: 'DX STAR EMPORIUM',
      tagline: 'Quality Vehicles and Equipment',
      phone: '+234 803 456 7890',
      whatsapp: '2348034567890',
      email: 'info@dxstaremporium.com',
      address: '15 Adeniran Ogunsanya Street, Surulere, Lagos, Nigeria',
      businessHours: [
        { day: 'Monday', open: '09:00', close: '18:00', closed: false },
        { day: 'Tuesday', open: '09:00', close: '18:00', closed: false },
        { day: 'Wednesday', open: '09:00', close: '18:00', closed: false },
        { day: 'Thursday', open: '09:00', close: '18:00', closed: false },
        { day: 'Friday', open: '09:00', close: '18:00', closed: false },
        { day: 'Saturday', open: '10:00', close: '16:00', closed: false },
        { day: 'Sunday', open: '00:00', close: '00:00', closed: true },
      ],
      socialMedia: [
        { platform: 'Instagram', url: 'https://instagram.com/dxstaremporium' },
        { platform: 'Facebook', url: 'https://facebook.com/dxstaremporium' },
      ],
    },
  });
  console.log('Business Settings seeded:', settings.name);



  // 3. Seed initial Admin User
  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@dxstaremporium.com';
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'password123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('Admin user seeded:', admin.email);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
