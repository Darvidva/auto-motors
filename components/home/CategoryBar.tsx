'use client';

import Link from 'next/link';
import {
  Car,
  Truck,
  Leaf,
  HardHat,
  Cog,
  Package,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { categories } from '@/lib/placeholder-data';
import { Category } from '@/types';

const iconMap: Record<Category, React.ComponentType<{ className?: string }>> = {
  Cars: Car,
  Trucks: Truck,
  Tractors: Leaf,
  Excavators: HardHat,
  'Heavy Machinery': Cog,
  Equipment: Package,
};

export default function CategoryBar() {
  // TODO: Connect to backend API — GET /api/categories

  return (
    <section className="bg-brand-bg py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex overflow-x-auto gap-4 pb-2 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 sm:gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.name];
            return (
              <Link
                key={category.slug}
                href={`/inventory?category=${category.slug}`}
                className="block min-w-[140px] sm:min-w-0 flex-shrink-0"
              >
                <Card className="bg-brand-card border-brand-border p-4 sm:p-6 flex flex-col items-center text-center group hover:border-brand-gold transition-colors duration-200">
                  <div className="w-12 h-12 rounded-full bg-brand-surface flex items-center justify-center mb-3 group-hover:bg-brand-gold/10 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h3 className="font-display text-sm sm:text-base text-brand-off-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-brand-warm-grey">
                    {category.listingCount} {category.listingCount === 1 ? 'listing' : 'listings'}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
