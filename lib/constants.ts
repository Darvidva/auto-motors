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
    title: 'Clear Listing Details',
    description:
      'We post the key information buyers usually ask for, so you can quickly tell what fits your needs.',
  },
  {
    id: '2',
    icon: 'Eye',
    title: 'Straightforward Pricing',
    description:
      'The listed price is the starting point of the conversation, without vague wording or unnecessary pressure.',
  },
  {
    id: '3',
    icon: 'Globe',
    title: 'Stock for Different Jobs',
    description:
      'From everyday cars to work trucks and site equipment, we keep options for both personal and business use.',
  },
  {
    id: '4',
    icon: 'Phone',
    title: 'Easy to Reach Us',
    description:
      'You can call, send a WhatsApp message or email us directly and get a real response from our team.',
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
