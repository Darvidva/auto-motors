import { getBusinessSettings } from '@/lib/queries';
import AboutPageClient from './AboutPageClient';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const settings = await getBusinessSettings();

  return <AboutPageClient heroImage={settings.heroImages?.about} teamMembers={settings.teamMembers} />;
}
