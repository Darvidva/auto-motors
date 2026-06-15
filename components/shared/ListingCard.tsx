'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calculator, Gauge, Fuel, Cog } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Listing } from '@/types';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const getUsageLabel = () => {
    if (listing.mileage !== undefined) {
      return `${listing.mileage.toLocaleString()} km`;
    }
    if (listing.hoursUsed !== undefined) {
      return `${listing.hoursUsed.toLocaleString()} hrs`;
    }
    return 'N/A';
  };

  const UsageIcon = listing.mileage !== undefined ? Gauge : Calculator;

  return (
    <Card className="bg-brand-card border-brand-border overflow-hidden group transition-all duration-300 hover:border-brand-gold hover:-translate-y-1.5">
      <Link href={`/inventory/${listing.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-brand-surface">
          <Image
            src={listing.images[0]}
            alt={listing.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Category Badge */}
          <Badge
            variant="gold"
            className="absolute top-3 left-3 z-10"
          >
            {listing.category}
          </Badge>
          {/* Condition Badge */}
          <Badge
            variant={listing.condition === 'New' ? 'default' : 'secondary'}
            className="absolute top-3 right-3 z-10"
          >
            {listing.condition}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Listing Name */}
          <h3 className="font-display text-lg text-brand-off-white mb-2 line-clamp-1">
            {listing.name}
          </h3>

          {/* Quick Specs */}
          <div className="flex items-center gap-3 text-sm text-brand-warm-grey mb-3">
            <span>{listing.year}</span>
            <span className="w-1 h-1 rounded-full bg-brand-border" />
            <span className="flex items-center gap-1">
              <UsageIcon className="w-3.5 h-3.5" />
              {getUsageLabel()}
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-border" />
            <span className="flex items-center gap-1">
              <Fuel className="w-3.5 h-3.5" />
              {listing.fuelType}
            </span>
          </div>

          {/* Price */}
          <p className="font-accent text-2xl font-bold text-brand-gold mb-4">
            {formatPrice(listing.price)}
          </p>

          {/* View Details Button */}
          <Button
            variant="ghost"
            className="w-full text-brand-warm-grey hover:text-brand-gold hover:bg-brand-gold/10 border border-brand-border hover:border-brand-gold rounded-md"
          >
            View Details
          </Button>
        </div>
      </Link>
    </Card>
  );
}
