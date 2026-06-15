import { notFound } from 'next/navigation';
import ListingDetailClient from './listing-client';
import { listings } from '@/lib/placeholder-data';

// TODO: Connect to backend API — GET /api/listings/[slug]

interface ListingPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all listings
export async function generateStaticParams() {
  return listings.map((listing) => ({
    slug: listing.slug,
  }));
}

export default function ListingPage({ params }: ListingPageProps) {
  const listing = listings.find((l) => l.slug === params.slug);

  if (!listing) {
    notFound();
  }

  return <ListingDetailClient listing={listing} />;
}
