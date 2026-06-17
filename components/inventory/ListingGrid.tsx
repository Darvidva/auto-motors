'use client';

import { Listing } from '@/types';
import ListingCard from '@/components/shared/ListingCard';
import { SearchX, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface ListingGridProps {
  listings: Listing[];
  viewMode: 'grid' | 'list';
  onResetFilters: () => void;
}

export default function ListingGrid({ listings, viewMode, onResetFilters }: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-surface flex items-center justify-center mb-6">
          <SearchX className="w-8 h-8 text-brand-mid-grey" />
        </div>
        <h3 className="font-display text-2xl text-brand-dark mb-2">
          No listings match your filters
        </h3>
        <p className="text-brand-mid-grey mb-6 max-w-md">
          Try adjusting your search criteria or browse our complete inventory.
        </p>
        <Button
          onClick={onResetFilters}
          className="bg-brand-gold text-white hover:bg-brand-gold-dark rounded-md"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset Filters
        </Button>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <Link
          key={listing.id}
          href={`/inventory/${listing.slug}`}
          className="flex flex-col sm:flex-row bg-white border border-brand-border rounded-lg overflow-hidden group hover:border-brand-gold hover:shadow-md transition-all duration-300"
        >
          <div className="relative w-full sm:w-80 h-48 sm:h-auto flex-shrink-0">
            <Image
              src={listing.images[0]}
              alt={listing.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 320px"
            />
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <span className="px-2 py-1 text-xs font-semibold bg-brand-gold text-white rounded">
                {listing.category}
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-brand-surface text-brand-dark rounded">
                {listing.condition}
              </span>
            </div>
          </div>

          <div className="flex-1 p-6">
            <h3 className="font-display text-xl sm:text-2xl text-brand-dark mb-2 group-hover:text-brand-gold transition-colors">
              {listing.name}
            </h3>
            <p className="text-brand-mid-grey text-sm mb-4 line-clamp-2 max-w-xl">
              {listing.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-brand-mid-grey mb-4">
              <span>{listing.year}</span>
              <span className="w-px h-4 bg-brand-border-dark" />
              <span>{listing.mileage ? `${listing.mileage.toLocaleString()} km` : listing.hoursUsed ? `${listing.hoursUsed.toLocaleString()} hrs` : ''}</span>
              <span className="w-px h-4 bg-brand-border-dark" />
              <span>{listing.fuelType}</span>
              <span className="w-px h-4 bg-brand-border-dark" />
              <span>{listing.transmission}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-accent text-2xl sm:text-3xl font-bold text-brand-gold">
                ₦{listing.price.toLocaleString()}
              </p>
              <Button
                variant="ghost"
                className="text-brand-gold hover:text-brand-gold-dark group/btn"
              >
                View Details
                <svg
                  className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
