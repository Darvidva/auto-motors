'use client';

import ListingCard from '@/components/shared/ListingCard';
import { listings } from '@/lib/placeholder-data';
import { Listing } from '@/types';

interface RelatedListingsProps {
  currentListingId: string;
  category: string;
}

export default function RelatedListings({ currentListingId, category }: RelatedListingsProps) {
  const relatedListings = listings
    .filter(
      (listing: Listing) =>
        listing.id !== currentListingId &&
        listing.category === category &&
        listing.published
    )
    .slice(0, 3);

  if (relatedListings.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 sm:mt-16">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-dark mb-6">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedListings.map((listing: Listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
