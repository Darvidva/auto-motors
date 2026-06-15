'use client';

import { Listing } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

interface InfoPanelProps {
  listing: Listing;
}

export default function InfoPanel({ listing }: InfoPanelProps) {
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

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/" className="text-brand-warm-grey hover:text-brand-gold transition-colors">
          <Home className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4 text-brand-border" />
        <Link href="/inventory" className="text-brand-warm-grey hover:text-brand-gold transition-colors">
          Inventory
        </Link>
        <ChevronRight className="w-4 h-4 text-brand-border" />
        <span className="text-brand-gold truncate max-w-[150px]">{listing.name}</span>
      </nav>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="gold">{listing.category}</Badge>
        <Badge variant={listing.condition === 'New' ? 'default' : 'secondary'}>
          {listing.condition}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-off-white">
        {listing.name}
      </h1>

      {/* Price */}
      <p className="font-accent text-3xl sm:text-4xl font-bold text-brand-gold">
        {formatPrice(listing.price)}
      </p>

      <Separator className="bg-brand-border" />

      {/* Quick Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-brand-warm-grey">Year</span>
          <span className="text-lg text-brand-off-white font-medium">{listing.year}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-brand-warm-grey">
            {listing.mileage !== undefined ? 'Mileage' : 'Hours'}
          </span>
          <span className="text-lg text-brand-off-white font-medium">{getUsageLabel()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-brand-warm-grey">Transmission</span>
          <span className="text-lg text-brand-off-white font-medium">{listing.transmission}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-brand-warm-grey">Fuel Type</span>
          <span className="text-lg text-brand-off-white font-medium">{listing.fuelType}</span>
        </div>
      </div>

      {/* Summary Description */}
      <p className="text-brand-warm-grey leading-relaxed">
        {listing.description.substring(0, 200)}...
      </p>
    </div>
  );
}
