import {
  TrustPoint,
  CategoryInfo,
  Stat,
} from '@/types';

// ─── Static UI Constants ────────────────────────────────────────────────────
// These are branding/marketing data that do not need to live in the database.

export const trustPoints: TrustPoint[] = [
  {
    id: '1',
    icon: 'ShieldCheck',
    title: 'Verified Listings',
    description:
      'Every vehicle and machine goes through a quality check before listing.',
  },
  {
    id: '2',
    icon: 'Eye',
    title: 'Transparent Pricing',
    description:
      'No hidden fees, no pressure. What you see is the price.',
  },
  {
    id: '3',
    icon: 'Globe',
    title: 'Wide Selection',
    description:
      'Cars, trucks, tractors, and heavy machinery — all in one place.',
  },
  {
    id: '4',
    icon: 'Phone',
    title: 'Direct Contact',
    description:
      'Talk to us directly — call, WhatsApp, or email. No middlemen.',
  },
];

export const stats: Stat[] = [
  { label: 'Years in Business', value: 10, suffix: '+' },
  { label: 'Units Sold', value: 1000, suffix: '+' },
  { label: 'Happy Clients', value: 750, suffix: '+' },
];

export const categories: CategoryInfo[] = [
  { name: 'Cars', slug: 'cars', icon: 'Car', listingCount: 0 },
  { name: 'Trucks', slug: 'trucks', icon: 'Truck', listingCount: 0 },
  { name: 'Tractors', slug: 'tractors', icon: 'Tractor', listingCount: 0 },
  { name: 'Excavators', slug: 'excavators', icon: 'HardHat', listingCount: 0 },
  { name: 'Heavy Machinery', slug: 'heavy-machinery', icon: 'Cog', listingCount: 0 },
  { name: 'Equipment', slug: 'equipment', icon: 'Package', listingCount: 0 },
];

export const brands = [
  'Toyota',
  'Ford',
  'Mercedes-Benz',
  'BMW',
  'Lexus',
  'Honda',
  'John Deere',
  'Caterpillar',
  'Kubota',
  'Hitachi',
  'Volvo',
  'JCB',
];

export const filterOptions = {
  categories: categories.map((c) => c.name),
  conditions: ['New', 'Used'] as const,
  brands,
  fuelTypes: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'N/A'] as const,
  transmissions: ['Automatic', 'Manual', 'N/A'] as const,
  priceRange: {
    min: 10000000,
    max: 500000000,
  },
  yearRange: {
    min: 2015,
    max: new Date().getFullYear(),
  },
};
