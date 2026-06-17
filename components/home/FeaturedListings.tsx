'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ListingCard from '@/components/shared/ListingCard';
import { featuredListings } from '@/lib/placeholder-data';

export default function FeaturedListings() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-brand-surface py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-3">
              Handpicked for You
            </h2>
            <div className="w-16 h-0.5 bg-brand-gold" />
          </div>

          <div className="hidden lg:flex gap-2 mt-6 sm:mt-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('left')}
              className="border border-brand-border hover:border-brand-gold hover:text-brand-gold rounded-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('right')}
              className="border border-brand-border hover:border-brand-gold hover:text-brand-gold rounded-md"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          className="sm:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
        >
          {featuredListings.map((listing) => (
            <div
              key={listing.id}
              className="min-w-[280px] flex-shrink-0 snap-start"
            >
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white rounded-md px-8"
          >
            <Link href="/inventory">Browse All Listings</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
