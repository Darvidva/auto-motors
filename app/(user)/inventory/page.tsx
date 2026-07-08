import type { Metadata } from 'next';
import { getListings, getBusinessSettings } from '@/lib/queries';
import { createPageMetadata } from '@/lib/seo';
import InventoryPageClient from './InventoryPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Inventory',
  description:
    'Explore available cars, trucks, tractors, excavators, heavy machinery, and equipment from DX STAR EMPORIUM.',
  path: '/inventory',
  keywords: [
    'vehicle inventory Nigeria',
    'cars for sale Lagos',
    'trucks and machinery inventory',
    'equipment listings Nigeria',
  ],
});

export default async function InventoryPage() {
  const [listings, settings] = await Promise.all([
    getListings(),
    getBusinessSettings(),
  ]);
  return <InventoryPageClient initialListings={listings} heroImage={settings.heroImages?.inventory} />;
}
