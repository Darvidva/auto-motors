import { notFound } from 'next/navigation';
import ListingDetailClient from './listing-client';
import { getListingBySlug, getRelatedListings, getBusinessSettings } from '@/lib/queries';

interface ListingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const [relatedListings, businessInfo] = await Promise.all([
    getRelatedListings(listing.id, listing.category),
    getBusinessSettings(),
  ]);

  return <ListingDetailClient listing={listing as any} relatedListings={relatedListings as any} businessInfo={businessInfo} />;
}
