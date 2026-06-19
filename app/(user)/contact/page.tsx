import { getBusinessSettings } from '@/lib/queries';
import ContactPageClient from './ContactPageClient';

export default async function ContactPage() {
  const businessInfo = await getBusinessSettings();

  return <ContactPageClient businessInfo={businessInfo} heroImage={businessInfo.heroImages?.contact} />;
}
