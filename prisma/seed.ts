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

  // 2. Seed an initial Listing
  const listing = await prisma.listing.create({
    data: {
      slug: 'toyota-land-cruiser-300-2023',
      name: 'Toyota Land Cruiser 300',
      category: 'Cars',
      brand: 'Toyota',
      model: 'Land Cruiser',
      year: 2023,
      price: 85000000,
      mileage: 150,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      driveSystem: '4WD',
      condition: 'New',
      color: 'Pearl White',
      interiorColor: 'Beige Leather',
      bodyType: 'SUV',
      engineCapacity: '3.5L Twin-Turbo V6',
      description: 'Brand new Toyota Land Cruiser 300 series. Top of the line specification with full premium options.',
      features: ['Leather Seats', 'Sunroof', '360 Camera', 'CoolBox', 'JBL Sound System'],
      images: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000',
      ],
      featured: true,
      published: true,
    },
  });
  console.log('Listing seeded:', listing.name);

  // 3. Seed initial Admin User
  const hashedPassword = await bcrypt.hash('password123', 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@dxstaremporium.com' },
    update: {},
    create: {
      email: 'admin@dxstaremporium.com',
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
