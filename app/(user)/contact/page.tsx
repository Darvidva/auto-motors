import { getBusinessSettings } from '@/lib/queries';
import ContactPageClient from './ContactPageClient';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const businessInfo = await getBusinessSettings();
  return <ContactPageClient businessInfo={businessInfo} heroImage={businessInfo.heroImages?.contact} />;
}
