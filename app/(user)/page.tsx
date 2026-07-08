import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import CategoryBar from '@/components/home/CategoryBar';
import TrustSection from '@/components/home/TrustSection';
import FeaturedListings from '@/components/home/FeaturedListings';
import HowItWorks from '@/components/home/HowItWorks';
import CTABanner from '@/components/home/CTABanner';
import { getFeaturedListings, getBusinessSettings } from '@/lib/queries';
import { createPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Premium Vehicles & Machinery in Nigeria',
  description:
    'Browse premium cars, trucks, tractors, excavators, heavy machinery, and equipment from DX STAR EMPORIUM in Nigeria.',
  path: '/',
  keywords: [
    'premium vehicles Nigeria',
    'machinery dealer Lagos',
    'cars trucks tractors Nigeria',
    'heavy equipment for sale',
  ],
});

export default async function HomePage() {
  const [featuredListings, settings] = await Promise.all([
    getFeaturedListings(),
    getBusinessSettings(),
  ]);

  return (
    <>
      <HeroSection heroImage={settings.heroImages?.home} />
      <CategoryBar />
      <TrustSection />
      <FeaturedListings featuredListings={featuredListings as any} />
      <HowItWorks />
      <CTABanner />
    </>
  );
}
