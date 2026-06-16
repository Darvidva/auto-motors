'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { listings as allListings } from '@/lib/placeholder-data';
import FilterBar from '@/components/inventory/FilterBar';
import ListingGrid from '@/components/inventory/ListingGrid';
import { Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function InventoryPage() {
  // TODO: Connect to backend API — GET /api/listings

  const [filters, setFilters] = useState<Record<string, string | number | undefined>>({ sortBy: 'newest' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredListings = useMemo(() => {
    let result = [...allListings];

    // Filter by search
    if (filters.search) {
      const searchTerm = filters.search.toString().toLowerCase();
      result = result.filter(
        (listing) =>
          listing.name.toLowerCase().includes(searchTerm) ||
          listing.brand.toLowerCase().includes(searchTerm) ||
          listing.model.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by category
    if (filters.category) {
      const categorySearch = filters.category.toString().replace(/-/g, ' ').toLowerCase();
      result = result.filter(
        (listing) => listing.category.toLowerCase() === categorySearch
      );
    }

    // Filter by condition
    if (filters.condition) {
      result = result.filter(
        (listing) => listing.condition.toLowerCase() === filters.condition
      );
    }

    // Filter by brand
    if (filters.brand) {
      result = result.filter(
        (listing) => listing.brand.toLowerCase() === filters.brand
      );
    }

    // Filter by price range
    if (filters.minPrice) {
      result = result.filter((listing) => listing.price >= (filters.minPrice as number));
    }
    if (filters.maxPrice) {
      result = result.filter((listing) => listing.price <= (filters.maxPrice as number));
    }

    // Filter by fuel type
    if (filters.fuelType) {
      result = result.filter(
        (listing) => listing.fuelType.toLowerCase() === filters.fuelType
      );
    }

    // Filter by transmission
    if (filters.transmission) {
      result = result.filter(
        (listing) => listing.transmission.toLowerCase() === filters.transmission
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    // Only show published listings
    result = result.filter((listing) => listing.published);

    return result;
  }, [filters]);

  const handleFilterChange = (newFilters: Record<string, string | number | undefined>) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters({ sortBy: 'newest' });
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Page Header */}
      <div className="relative h-[40vh] sm:h-[45vh] flex items-center justify-center">
        <Image
          src="https://images.pexels.com/photos/34875545/pexels-photo-34875545.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Inventory"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-bg/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-off-white mb-4">
            Our Inventory
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="text-brand-warm-grey hover:text-brand-gold transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 text-brand-border" />
            <span className="text-brand-gold">Inventory</span>
          </nav>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        onFilterChange={handleFilterChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={filteredListings.length}
      />

      {/* Listing Grid/List */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ListingGrid
          listings={filteredListings}
          viewMode={viewMode}
          onResetFilters={resetFilters}
        />

        {/* Load More */}
        {filteredListings.length > 0 && filteredListings.length >= 9 && (
          <div className="mt-10 text-center">
            <button className="px-8 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-bg transition-colors duration-200 rounded-md font-medium">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
