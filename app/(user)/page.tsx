import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import CategoryBar from '@/components/home/CategoryBar';
import ServicesSection from '@/components/home/ServicesSection';
import TrustSection from '@/components/home/TrustSection';
import FeaturedListings from '@/components/home/FeaturedListings';
import HowItWorks from '@/components/home/HowItWorks';
import CTABanner from '@/components/home/CTABanner';
import { getFeaturedListings, getBusinessSettings } from '@/lib/queries';
import { createPageMetadata } from '@/lib/seo';


export const metadata: Metadata = createPageMetadata({
  title: 'Car Sales, Construction Machinery & Shipping in Nigeria',
  description:
    'Discover DX STAR EMPORIUM: your trusted source for premium car sales, selling of construction machinery, shipping, and other machines in Nigeria.',
  path: '/',
  keywords: [
    'car sales Nigeria',
    'construction machinery Lagos',
    'shipping services Nigeria',
    'heavy machines Lagos',
    'other machines for sale',
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
      <ServicesSection />
      <FeaturedListings featuredListings={featuredListings as any} />
      <TrustSection />
      <HowItWorks />
      <CTABanner />
    </>
  );
}
