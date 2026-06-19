import { notFound } from 'next/navigation';
import ListingDetailClient from './listing-client';
import { getListingBySlug, getListings, getRelatedListings, getBusinessSettings } from '@/lib/queries';

interface ListingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all listings
export async function generateStaticParams() {
  const listings = await getListings();
  return listings.map((listing) => ({
    slug: listing.slug,
  }));
}

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
