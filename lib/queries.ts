import { getPrisma } from './prisma';
import { BusinessInfo, Stat, TeamMember } from '@/types';

const defaultBusinessInfo: BusinessInfo = {
  name: 'DX STAR EMPORIUM',
  tagline: 'Quality Vehicles and Equipment',
  phone: '+234 803 456 7890',
  whatsapp: '2348034567890',
  email: 'info@dxstaremporium.com',
  address: '15 Adeniran Ogunsanya Street, Surulere, Lagos, Nigeria',
  hours: [],
  socialMedia: [],
  heroImages: { home: '', inventory: '', about: '', contact: '' },
  teamMembers: [],
};

function parseArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function parseHeroImages(value: unknown): BusinessInfo['heroImages'] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return defaultBusinessInfo.heroImages;
  }

  const source = value as Record<string, unknown>;

  return {
    home: typeof source.home === 'string' ? source.home : '',
    inventory: typeof source.inventory === 'string' ? source.inventory : '',
    about: typeof source.about === 'string' ? source.about : '',
    contact: typeof source.contact === 'string' ? source.contact : '',
  };
}

export async function getBusinessSettings(): Promise<BusinessInfo> {
  const prisma = await getPrisma();
  const settings = await prisma.businessSettings.findFirst();

  if (!settings) {
    return defaultBusinessInfo;
  }

  return {
    name: settings.name,
    tagline: settings.tagline,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    email: settings.email,
    address: settings.address,
    hours: parseArray<BusinessInfo['hours'][number]>(settings.businessHours),
    socialMedia: parseArray(settings.socialMedia),
    heroImages: parseHeroImages(settings.heroImages),
    teamMembers: parseArray<TeamMember>(settings.teamMembers),
  };
}

export async function getListings() {
  const prisma = await getPrisma();
  return prisma.listing.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getListingBySlug(slug: string) {
  const prisma = await getPrisma();
  return prisma.listing.findFirst({
    where: { slug, published: true },
  });
}

export async function getFeaturedListings() {
  const prisma = await getPrisma();
  return prisma.listing.findMany({
    where: { featured: true, published: true },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });
}

export async function getRelatedListings(currentId: string, category: string) {
  const prisma = await getPrisma();
  return prisma.listing.findMany({
    where: {
      id: { not: currentId },
      category,
      published: true,
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });
}