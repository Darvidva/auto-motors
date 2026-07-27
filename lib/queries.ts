import { unstable_cache } from 'next/cache';
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

function logPublicQueryError(queryName: string, error: unknown) {
  console.error(`[public-query:${queryName}]`, error);
}

async function _getBusinessSettings(): Promise<BusinessInfo> {
  try {
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
  } catch (error) {
    logPublicQueryError('getBusinessSettings', error);
    return defaultBusinessInfo;
  }
}

export const getBusinessSettings = unstable_cache(
  _getBusinessSettings,
  ['settings'],
  { tags: ['settings'], revalidate: 3600 }
);

async function _getListings() {
  try {
    const prisma = await getPrisma();
    const listings = await prisma.listing.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
    return listings.map(l => ({ ...l, price: Number(l.price) }));
  } catch (error) {
    logPublicQueryError('getListings', error);
    return [];
  }
}

export const getListings = unstable_cache(
  _getListings,
  ['listings'],
  { tags: ['listings'], revalidate: 3600 }
);

async function _getListingBySlug(slug: string) {
  try {
    const prisma = await getPrisma();
    const listing = await prisma.listing.findFirst({
      where: { slug, published: true },
    });
    return listing ? { ...listing, price: Number(listing.price) } : null;
  } catch (error) {
    logPublicQueryError('getListingBySlug', error);
    return null;
  }
}

export function getListingBySlug(slug: string) {
  return unstable_cache(
    () => _getListingBySlug(slug),
    [`listing-${slug}`],
    { tags: ['listings', `listing-${slug}`], revalidate: 3600 }
  )();
}

async function _getFeaturedListings() {
  try {
    const prisma = await getPrisma();
    const listings = await prisma.listing.findMany({
      where: { featured: true, published: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
    });
    return listings.map(l => ({ ...l, price: Number(l.price) }));
  } catch (error) {
    logPublicQueryError('getFeaturedListings', error);
    return [];
  }
}

export const getFeaturedListings = unstable_cache(
  _getFeaturedListings,
  ['listings-featured'],
  { tags: ['listings'], revalidate: 3600 }
);

async function _getRelatedListings(currentId: string, category: string) {
  try {
    const prisma = await getPrisma();
    const listings = await prisma.listing.findMany({
      where: {
        id: { not: currentId },
        category,
        published: true,
      },
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
    return listings.map(l => ({ ...l, price: Number(l.price) }));
  } catch (error) {
    logPublicQueryError('getRelatedListings', error);
    return [];
  }
}

export function getRelatedListings(currentId: string, category: string) {
  return unstable_cache(
    () => _getRelatedListings(currentId, category),
    [`related-${currentId}-${category}`],
    { tags: ['listings'], revalidate: 3600 }
  )();
}

