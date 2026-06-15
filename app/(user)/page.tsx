import HeroSection from '@/components/home/HeroSection';
import CategoryBar from '@/components/home/CategoryBar';
import TrustSection from '@/components/home/TrustSection';
import FeaturedListings from '@/components/home/FeaturedListings';
import HowItWorks from '@/components/home/HowItWorks';
import CTABanner from '@/components/home/CTABanner';

export default function HomePage() {
  // TODO: Connect to backend API — GET /api/homepage-content

  return (
    <>
      <HeroSection />
      <CategoryBar />
      <TrustSection />
      <FeaturedListings />
      <HowItWorks />
      <CTABanner />
    </>
  );
}
