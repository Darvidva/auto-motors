import type { Metadata } from 'next';
import { getBusinessSettings } from '@/lib/queries';
import { createPageMetadata } from '@/lib/seo';
import ContactPageClient from './ContactPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact Us',
  description:
    'Contact DX STAR EMPORIUM for vehicle and machinery enquiries, pricing, availability, and inspections in Nigeria.',
  path: '/contact',
  keywords: [
    'contact vehicle dealer Nigeria',
    'DX STAR EMPORIUM contact',
    'machinery enquiries Lagos',
  ],
});

export default async function ContactPage() {
  const businessInfo = await getBusinessSettings();
  return <ContactPageClient businessInfo={businessInfo} heroImage={businessInfo.heroImages?.contact} />;
}
