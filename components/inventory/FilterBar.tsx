'use client';

import { useState, useEffect, useRef } from 'react';
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
import { filterOptions } from '@/lib/constants';

interface FilterBarProps {
  onFilterChange: (filters: Record<string, string | number | undefined>) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalCount: number;
}

const ALL = '__all__';

function toSelectVal(v: string) { return v || ALL; }
function fromSelectVal(v: string) { return v === ALL ? '' : v; }

export default function FilterBar({
  onFilterChange,
  viewMode,
  onViewModeChange,
  totalCount,
}: FilterBarProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [mobileOpen, setMobileOpen] = useState(false);

  const onFilterChangeRef = useRef(onFilterChange);
  onFilterChangeRef.current = onFilterChange;

  const buildFilters = () => ({
    search,
    category,
    condition,
    brand,
    minPrice: minPrice ? parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
    fuelType,
    transmission,
    sortBy,
  });

  useEffect(() => {
    onFilterChangeRef.current(buildFilters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, condition, brand, minPrice, maxPrice, fuelType, transmission, sortBy]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onFilterChangeRef.current(buildFilters());
  };

  const activeFilters = [
    ...(search ? [{ key: 'search', label: 'Search', value: search }] : []),
    ...(category ? [{ key: 'category', label: 'Category', value: category }] : []),
    ...(condition ? [{ key: 'condition', label: 'Condition', value: condition }] : []),
    ...(brand ? [{ key: 'brand', label: 'Brand', value: brand }] : []),
    ...(minPrice ? [{ key: 'minPrice', label: 'Min Price', value: `₦${minPrice}` }] : []),
    ...(maxPrice ? [{ key: 'maxPrice', label: 'Max Price', value: `₦${maxPrice}` }] : []),
    ...(fuelType ? [{ key: 'fuelType', label: 'Fuel', value: fuelType }] : []),
    ...(transmission ? [{ key: 'transmission', label: 'Transmission', value: transmission }] : []),
  ];

  const clearFilter = (key: string) => {
    const map: Record<string, () => void> = {
      search: () => setSearch(''),
      category: () => setCategory(''),
      condition: () => setCondition(''),
      brand: () => setBrand(''),
      minPrice: () => setMinPrice(''),
      maxPrice: () => setMaxPrice(''),
      fuelType: () => setFuelType(''),
      transmission: () => setTransmission(''),
    };
    map[key]?.();
  };

  const clearAllFilters = () => {
    setSearch(''); setCategory(''); setCondition(''); setBrand('');
    setMinPrice(''); setMaxPrice(''); setFuelType(''); setTransmission('');
  };

  const filterPanelContent = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-brand-dark-grey mb-2 block">Search</label>
        <Input
          placeholder="Search by name, brand, model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white border-brand-border text-brand-dark placeholder:text-brand-mid-grey"
          onKeyDown={handleSearchKeyDown}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-brand-dark-grey mb-2 block">Category</label>
        <Select value={toSelectVal(category)} onValueChange={(v) => setCategory(fromSelectVal(v))}>
          <SelectTrigger className="bg-white border-brand-border text-brand-dark">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-white border-brand-border">
            <SelectItem value={ALL}>All Categories</SelectItem>
            {filterOptions.categories.map((cat) => (
              <SelectItem key={cat} value={cat.toLowerCase().replace(/ /g, '-')}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-brand-dark-grey mb-2 block">Condition</label>
        <Select value={toSelectVal(condition)} onValueChange={(v) => setCondition(fromSelectVal(v))}>
          <SelectTrigger className="bg-white border-brand-border text-brand-dark">
            <SelectValue placeholder="All Conditions" />
          </SelectTrigger>
          <SelectContent className="bg-white border-brand-border">
            <SelectItem value={ALL}>All Conditions</SelectItem>
            {filterOptions.conditions.map((cond) => (
              <SelectItem key={cond} value={cond.toLowerCase()}>{cond}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-brand-dark-grey mb-2 block">Brand / Make</label>
        <Select value={toSelectVal(brand)} onValueChange={(v) => setBrand(fromSelectVal(v))}>
          <SelectTrigger className="bg-white border-brand-border text-brand-dark">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent className="bg-white border-brand-border">
            <SelectItem value={ALL}>All Brands</SelectItem>
            {filterOptions.brands.map((b) => (
              <SelectItem key={b} value={b.toLowerCase()}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-brand-dark-grey mb-2 block">Price Range (₦)</label>
        <div className="flex gap-3">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="bg-white border-brand-border text-brand-dark"
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="bg-white border-brand-border text-brand-dark"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-brand-dark-grey mb-2 block">Fuel / Power</label>
        <Select value={toSelectVal(fuelType)} onValueChange={(v) => setFuelType(fromSelectVal(v))}>
          <SelectTrigger className="bg-white border-brand-border text-brand-dark">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent className="bg-white border-brand-border">
            <SelectItem value={ALL}>All Types</SelectItem>
            {filterOptions.fuelTypes.map((ft) => (
              <SelectItem key={ft} value={ft.toLowerCase()}>
                {ft === 'N/A' ? 'Not Specified' : ft}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-brand-dark-grey mb-2 block">Transmission</label>
        <Select value={toSelectVal(transmission)} onValueChange={(v) => setTransmission(fromSelectVal(v))}>
          <SelectTrigger className="bg-white border-brand-border text-brand-dark">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="bg-white border-brand-border">
            <SelectItem value={ALL}>All</SelectItem>
            {filterOptions.transmissions.map((t) => (
              <SelectItem key={t} value={t.toLowerCase()}>
                {t === 'N/A' ? 'Not Specified' : t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="sticky top-20 z-40 bg-white border-b border-brand-border shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop Filters */}
        <div className="hidden lg:flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mid-grey" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white border-brand-border text-brand-dark h-10"
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-white border-brand-border text-brand-dark h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-brand-border">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="h-8 bg-brand-border" />

          <Button
            variant={category === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategory('')}
            className={cn(
              'rounded-md',
              category === '' ? 'bg-brand-gold text-white hover:bg-brand-gold-dark' : 'border-brand-border text-brand-mid-grey hover:text-brand-gold hover:border-brand-gold'
            )}
          >
            All
          </Button>
          {filterOptions.categories.slice(0, 4).map((cat) => {
            const val = cat.toLowerCase().replace(/ /g, '-');
            return (
              <Button
                key={cat}
                variant={category === val ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategory(category === val ? '' : val)}
                className={cn(
                  'rounded-md',
                  category === val ? 'bg-brand-gold text-white hover:bg-brand-gold-dark' : 'border-brand-border text-brand-mid-grey hover:text-brand-gold hover:border-brand-gold'
                )}
              >
                {cat}
              </Button>
            );
          })}

          <div className="flex-1" />

          <div className="flex gap-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onViewModeChange('grid')}
              className={cn('h-10 w-10 rounded-md', viewMode === 'grid' ? 'bg-brand-gold text-white' : 'text-brand-mid-grey hover:text-brand-gold')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onViewModeChange('list')}
              className={cn('h-10 w-10 rounded-md', viewMode === 'list' ? 'bg-brand-gold text-white' : 'text-brand-mid-grey hover:text-brand-gold')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="flex lg:hidden items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mid-grey" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white border-brand-border text-brand-dark h-10"
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-brand-border text-brand-mid-grey hover:text-brand-gold rounded-md">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge className="ml-2 bg-brand-gold text-white">{activeFilters.length}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-white border-brand-border h-[85vh] overflow-y-auto">
              <SheetHeader className="flex-row items-center justify-between">
                <SheetTitle className="text-brand-dark">Filters & Sort</SheetTitle>
                {activeFilters.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-brand-mid-grey hover:text-brand-gold">
                    Clear All
                  </Button>
                )}
              </SheetHeader>
              <div className="mt-6">{filterPanelContent}</div>
              <div className="sticky bottom-0 mt-6 pt-4 bg-white border-t border-brand-border">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="flex-1 border-brand-border text-brand-mid-grey"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={() => { onFilterChangeRef.current(buildFilters()); setMobileOpen(false); }}
                    className="flex-1 bg-brand-gold text-white hover:bg-brand-gold-dark"
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
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs text-brand-mid-grey hover:text-brand-gold">
              Clear All
            </Button>
          </div>
        )}

        <div className="mt-3 text-sm text-brand-mid-grey">
          {totalCount} {totalCount === 1 ? 'listing' : 'listings'} found
        </div>
      </div>
    </div>
  );
}
