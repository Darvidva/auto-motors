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
    if (listing.mileage !== undefined && listing.mileage !== null) {
      return `${Number(listing.mileage).toLocaleString()} km`;
    }
    if (listing.hoursUsed !== undefined && listing.hoursUsed !== null) {
      return `${Number(listing.hoursUsed).toLocaleString()} hrs`;
    }
    return 'N/A';
  };

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/" className="text-brand-mid-grey hover:text-brand-gold transition-colors">
          <Home className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4 text-brand-border-dark" />
        <Link href="/inventory" className="text-brand-mid-grey hover:text-brand-gold transition-colors">
          Inventory
        </Link>
        <ChevronRight className="w-4 h-4 text-brand-border-dark" />
        <span className="text-brand-gold truncate max-w-[150px] font-medium">{listing.name}</span>
      </nav>

      <div className="flex flex-wrap gap-2">
        <Badge variant="gold">{listing.category}</Badge>
        <Badge variant={listing.condition === 'New' ? 'default' : 'secondary'}>
          {listing.condition}
        </Badge>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark">
        {listing.name}
      </h1>

      <p className="font-accent text-3xl sm:text-4xl font-bold text-brand-gold">
        {formatPrice(listing.price)}
      </p>

      <Separator className="bg-brand-border" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-brand-mid-grey">Year</span>
          <span className="text-lg text-brand-dark font-medium">{listing.year}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-brand-mid-grey">
            {listing.mileage !== undefined && listing.mileage !== null ? 'Mileage' : 'Hours'}
          </span>
          <span className="text-lg text-brand-dark font-medium">{getUsageLabel()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-brand-mid-grey">Transmission</span>
          <span className="text-lg text-brand-dark font-medium">{listing.transmission}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider text-brand-mid-grey">Fuel Type</span>
          <span className="text-lg text-brand-dark font-medium">{listing.fuelType}</span>
        </div>
      </div>

      <p className="text-brand-mid-grey leading-relaxed">
        {listing.description.substring(0, 200)}...
      </p>
    </div>
  );
}
