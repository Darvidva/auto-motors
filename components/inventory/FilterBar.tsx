'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal, X, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { filterOptions } from '@/lib/placeholder-data';

interface FilterBarProps {
  onFilterChange: (filters: Record<string, string | number | undefined>) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalCount: number;
}

export default function FilterBar({
  onFilterChange,
  viewMode,
  onViewModeChange,
  totalCount,
}: FilterBarProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [fuelType, setFuelType] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Build filter object from current state
  const buildFilterObject = useCallback(() => ({
    search,
    category,
    condition,
    brand,
    minPrice: minPrice ? parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
    fuelType,
    transmission,
    sortBy,
  }), [search, category, condition, brand, minPrice, maxPrice, fuelType, transmission, sortBy]);

  // Auto-apply filters when any filter changes (except search which requires Enter)
  useEffect(() => {
    const filters = buildFilterObject();
    onFilterChange(filters);
  }, [category, condition, brand, minPrice, maxPrice, fuelType, transmission, sortBy, buildFilterObject, onFilterChange]);

  // Apply search on Enter key
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFilterChange(buildFilterObject());
    }
  };

  const activeFilters = [];
  if (search) activeFilters.push({ key: 'search', label: 'Search', value: search });
  if (category) activeFilters.push({ key: 'category', label: 'Category', value: category });
  if (condition) activeFilters.push({ key: 'condition', label: 'Condition', value: condition });
  if (brand) activeFilters.push({ key: 'brand', label: 'Brand', value: brand });
  if (minPrice) activeFilters.push({ key: 'minPrice', label: 'Min Price', value: `₦${minPrice}` });
  if (maxPrice) activeFilters.push({ key: 'maxPrice', label: 'Max Price', value: `₦${maxPrice}` });
  if (fuelType) activeFilters.push({ key: 'fuelType', label: 'Fuel', value: fuelType });
  if (transmission) activeFilters.push({ key: 'transmission', label: 'Transmission', value: transmission });

  const clearFilter = (key: string) => {
    switch (key) {
      case 'search': setSearch(''); break;
      case 'category': setCategory(''); break;
      case 'condition': setCondition(''); break;
      case 'brand': setBrand(''); break;
      case 'minPrice': setMinPrice(''); break;
      case 'maxPrice': setMaxPrice(''); break;
      case 'fuelType': setFuelType(''); break;
      case 'transmission': setTransmission(''); break;
    }
  };

  const clearAllFilters = () => {
    setSearch('');
    setCategory('');
    setCondition('');
    setBrand('');
    setMinPrice('');
    setMaxPrice('');
    setFuelType('');
    setTransmission('');
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-sm font-medium text-brand-warm-grey mb-2 block">Search</label>
        <Input
          placeholder="Search by name, brand, model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-brand-surface border-brand-border text-brand-off-white placeholder:text-brand-warm-grey"
          onKeyDown={handleSearchKeyDown}
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-brand-warm-grey mb-2 block">Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="bg-brand-surface border-brand-border text-brand-off-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-brand-surface border-brand-border">
            <SelectItem value="">All Categories</SelectItem>
            {filterOptions.categories.map((cat) => (
              <SelectItem key={cat} value={cat.toLowerCase().replace(/ /g, '-')}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Condition */}
      <div>
        <label className="text-sm font-medium text-brand-warm-grey mb-2 block">Condition</label>
        <Select value={condition} onValueChange={setCondition}>
          <SelectTrigger className="bg-brand-surface border-brand-border text-brand-off-white">
            <SelectValue placeholder="All Conditions" />
          </SelectTrigger>
          <SelectContent className="bg-brand-surface border-brand-border">
            <SelectItem value="">All Conditions</SelectItem>
            {filterOptions.conditions.map((cond) => (
              <SelectItem key={cond} value={cond.toLowerCase()}>
                {cond}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand */}
      <div>
        <label className="text-sm font-medium text-brand-warm-grey mb-2 block">Brand / Make</label>
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger className="bg-brand-surface border-brand-border text-brand-off-white">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent className="bg-brand-surface border-brand-border">
            <SelectItem value="">All Brands</SelectItem>
            {filterOptions.brands.map((b) => (
              <SelectItem key={b} value={b.toLowerCase()}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium text-brand-warm-grey mb-2 block">Price Range (₦)</label>
        <div className="flex gap-3">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="bg-brand-surface border-brand-border text-brand-off-white"
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="bg-brand-surface border-brand-border text-brand-off-white"
          />
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="text-sm font-medium text-brand-warm-grey mb-2 block">Fuel / Power</label>
        <Select value={fuelType} onValueChange={setFuelType}>
          <SelectTrigger className="bg-brand-surface border-brand-border text-brand-off-white">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent className="bg-brand-surface border-brand-border">
            <SelectItem value="">All Types</SelectItem>
            {filterOptions.fuelTypes.map((ft) => (
              <SelectItem key={ft} value={ft.toLowerCase()}>
                {ft === 'N/A' ? 'Not Specified' : ft}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transmission */}
      <div>
        <label className="text-sm font-medium text-brand-warm-grey mb-2 block">Transmission</label>
        <Select value={transmission} onValueChange={setTransmission}>
          <SelectTrigger className="bg-brand-surface border-brand-border text-brand-off-white">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="bg-brand-surface border-brand-border">
            <SelectItem value="">All</SelectItem>
            {filterOptions.transmissions.map((t) => (
              <SelectItem key={t} value={t.toLowerCase()}>
                {t === 'N/A' ? 'Not Specified' : t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mobile Apply Button */}
      <div className="lg:hidden">
        <Button
          onClick={() => {
            onFilterChange(buildFilterObject());
            setMobileOpen(false);
          }}
          className="w-full bg-brand-gold text-brand-bg hover:bg-brand-gold-light rounded-md"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="sticky top-20 z-40 bg-brand-card border-b border-brand-border backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop Filters */}
        <div className="hidden lg:flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-warm-grey" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-brand-surface border-brand-border text-brand-off-white h-10"
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-brand-surface border-brand-border text-brand-off-white h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-brand-surface border-brand-border">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="h-8 bg-brand-border" />

          {/* Quick Filters */}
          <Button
            variant={category === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategory('')}
            className={cn(
              'rounded-md',
              category === '' ? 'bg-brand-gold text-brand-bg' : 'border-brand-border text-brand-warm-grey hover:text-brand-gold'
            )}
          >
            All
          </Button>
          {filterOptions.categories.slice(0, 4).map((cat) => (
            <Button
              key={cat}
              variant={category === cat.toLowerCase().replace(/ /g, '-') ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategory(category === cat.toLowerCase().replace(/ /g, '-') ? '' : cat.toLowerCase().replace(/ /g, '-'))}
              className={cn(
                'rounded-md',
                category === cat.toLowerCase().replace(/ /g, '-') ? 'bg-brand-gold text-brand-bg' : 'border-brand-border text-brand-warm-grey hover:text-brand-gold'
              )}
            >
              {cat}
            </Button>
          ))}

          <div className="flex-1" />

          {/* View Toggle */}
          <div className="flex gap-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onViewModeChange('grid')}
              className={cn(
                'h-10 w-10 rounded-md',
                viewMode === 'grid' ? 'bg-brand-gold text-brand-bg' : 'text-brand-warm-grey hover:text-brand-gold'
              )}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onViewModeChange('list')}
              className={cn(
                'h-10 w-10 rounded-md',
                viewMode === 'list' ? 'bg-brand-gold text-brand-bg' : 'text-brand-warm-grey hover:text-brand-gold'
              )}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="flex lg:hidden items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-warm-grey" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-brand-surface border-brand-border text-brand-off-white h-10"
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-brand-border text-brand-warm-grey hover:text-brand-gold rounded-md">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge className="ml-2 bg-brand-gold text-brand-bg">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="bg-brand-card border-brand-border h-[85vh] overflow-y-auto"
            >
              <SheetHeader className="flex-row items-center justify-between">
                <SheetTitle className="text-brand-off-white">
                  Filters & Sort
                </SheetTitle>
                {activeFilters.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { clearAllFilters(); }}
                    className="text-brand-warm-grey hover:text-brand-gold"
                  >
                    Clear All
                  </Button>
                )}
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
              <div className="sticky bottom-0 mt-6 pt-4 bg-brand-card border-t border-brand-border">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      clearAllFilters();
                    }}
                    className="flex-1 border-brand-border text-brand-warm-grey"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={() => {
                      onFilterChange(buildFilterObject());
                      setMobileOpen(false);
                    }}
                    className="flex-1 bg-brand-gold text-brand-bg hover:bg-brand-gold-light"
                  >
                    Show {totalCount} Results
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge
                key={filter.key}
                variant="outline"
                className="border-brand-gold text-brand-gold pr-1 cursor-pointer hover:bg-brand-gold/10"
                onClick={() => clearFilter(filter.key)}
              >
                {filter.label}: {filter.value}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-brand-warm-grey hover:text-brand-gold"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-3 text-sm text-brand-warm-grey">
          {totalCount} {totalCount === 1 ? 'listing' : 'listings'} found
        </div>
      </div>
    </div>
  );
}
