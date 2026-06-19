import HeroSection from '@/components/home/HeroSection';
import CategoryBar from '@/components/home/CategoryBar';
import TrustSection from '@/components/home/TrustSection';
import FeaturedListings from '@/components/home/FeaturedListings';
import HowItWorks from '@/components/home/HowItWorks';
import CTABanner from '@/components/home/CTABanner';
import { getFeaturedListings, getBusinessSettings } from '@/lib/queries';

export const dynamic = 'force-dynamic';

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
