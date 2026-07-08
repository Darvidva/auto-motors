import type { Metadata } from 'next';
import { getBusinessSettings } from '@/lib/queries';
import { createPageMetadata } from '@/lib/seo';
import AboutPageClient from './AboutPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'About Us',
  description:
    'Learn more about DX STAR EMPORIUM, our experience, and our commitment to quality vehicles and machinery in Nigeria.',
  path: '/about',
  keywords: [
    'about DX STAR EMPORIUM',
    'vehicle dealer Nigeria',
    'machinery company Lagos',
  ],
});

export default async function AboutPage() {
  const settings = await getBusinessSettings();

  return <AboutPageClient heroImage={settings.heroImages?.about} teamMembers={settings.teamMembers} />;
}
