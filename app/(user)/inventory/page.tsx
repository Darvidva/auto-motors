import { getListings, getBusinessSettings } from '@/lib/queries';
import InventoryPageClient from './InventoryPageClient';

export const dynamic = 'force-dynamic';

export default async function InventoryPage() {
  const [listings, settings] = await Promise.all([
    getListings(),
    getBusinessSettings(),
  ]);
  return <InventoryPageClient initialListings={listings} heroImage={settings.heroImages?.inventory} />;
}
