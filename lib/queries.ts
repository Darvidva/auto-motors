import { getPrisma } from './prisma';
import { BusinessInfo, Stat, TeamMember } from '@/types';

export async function getBusinessSettings() {
  const prisma = await getPrisma();
  const settings = await prisma.businessSettings.findFirst();

  if (!settings) {
    return {
      name: 'DX STAR EMPORIUM',
      tagline: 'Quality Vehicles and Equipment',
      phone: '+234 803 456 7890',
      whatsapp: '2348034567890',
      email: 'info@dxstaremporium.com',
      address: '15 Adeniran Ogunsanya Street, Surulere, Lagos, Nigeria',
      hours: [],
      socialMedia: [],
      heroImages: { home: '', inventory: '', about: '', contact: '' } as Record<string, string>,
      teamMembers: [],
    };
  }

  return {
    name: settings.name,
    tagline: settings.tagline,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    email: settings.email,
    address: settings.address,
    hours: (settings.businessHours as any) || [],
    socialMedia: (settings.socialMedia as any) || [],
    heroImages: (settings.heroImages as any) || { home: '', inventory: '', about: '', contact: '' },
    teamMembers: (settings.teamMembers as any) || [],
  };
}

export async function getListings() {
  const prisma = await getPrisma();
  return prisma.listing.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function getListingBySlug(slug: string) {
  const prisma = await getPrisma();
  return prisma.listing.findUnique({
    where: { slug }
  });
}

export async function getFeaturedListings() {
  const prisma = await getPrisma();
  return prisma.listing.findMany({
    where: { featured: true, published: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getRelatedListings(currentId: string, category: string) {
  const prisma = await getPrisma();
  return prisma.listing.findMany({
    where: {
      id: { not: currentId },
      category: category as any,
      published: true,
    },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });
}
