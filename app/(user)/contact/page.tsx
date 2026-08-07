import type { Metadata } from 'next';
import { getBusinessSettings } from '@/lib/queries';
import { createPageMetadata } from '@/lib/seo';
import ContactPageClient from './ContactPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact Us',
  description:
    'Contact DX STAR EMPORIUM for inquiries on car sales, selling of construction machinery, shipping, and other machines in Nigeria.',
  path: '/contact',
  keywords: [
    'contact DX STAR EMPORIUM',
    'car sales enquiries Nigeria',
    'construction machinery inquiries Lagos',
    'shipping services contact Nigeria',
  ],
});

export default async function ContactPage() {
  const businessInfo = await getBusinessSettings();
  return <ContactPageClient businessInfo={businessInfo} heroImage={businessInfo.heroImages?.contact} />;
}
