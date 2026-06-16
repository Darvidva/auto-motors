'use client';

import { useState, useMemo } from 'react';
import { listings as allListings } from '@/lib/placeholder-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Listing } from '@/types';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  Image as ImageIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const categories = ['Cars', 'Trucks', 'Tractors', 'Excavators', 'Heavy Machinery', 'Equipment'];
const conditions = ['New', 'Used'];
const transmissions = ['Automatic', 'Manual', 'N/A'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'N/A'];
const driveSystems = ['2WD', '4WD', 'AWD', '6x6', 'N/A'];

export default function AdminListingsPage() {
  const [listings, setListings] = useState<Listing[]>(allListings);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Cars',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: null as number | null,
    hoursUsed: null as number | null,
    transmission: 'Automatic' as 'Automatic' | 'Manual' | 'N/A',
    fuelType: 'Diesel' as 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'N/A',
    driveSystem: '4WD' as string,
    condition: 'Used' as 'New' | 'Used',
    color: '',
    description: '',
    specifications: {} as Record<string, string>,
    features: [] as string[],
    images: [] as string[],
    featured: false,
    published: false,
  });

  const filteredListings = useMemo(() => {
    let result = [...listings];

    if (search) {
      result = result.filter(l =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.brand.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (categoryFilter) {
      result = result.filter(l => l.category === categoryFilter);
    }
    if (statusFilter === 'published') {
      result = result.filter(l => l.published);
    } else if (statusFilter === 'draft') {
      result = result.filter(l => !l.published);
    }

    return result;
  }, [listings, search, categoryFilter, statusFilter]);

  const openEditDialog = (listing?: Listing) => {
    if (listing) {
      setSelectedListing(listing);
      setFormData({
        name: listing.name,
        slug: listing.slug,
        category: listing.category,
        brand: listing.brand,
        model: listing.model,
        year: listing.year,
        price: listing.price,
        mileage: listing.mileage ?? null,
        hoursUsed: listing.hoursUsed ?? null,
        transmission: listing.transmission,
        fuelType: listing.fuelType,
        driveSystem: listing.driveSystem,
        condition: listing.condition,
        color: listing.color,
        description: listing.description,
        specifications: listing.specifications,
        features: listing.features,
        images: listing.images,
        featured: listing.featured,
        published: listing.published,
      });
    } else {
      setSelectedListing(null);
      setFormData({
        name: '',
        slug: '',
        category: 'Cars',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: 0,
        mileage: null,
        hoursUsed: null,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        driveSystem: '4WD',
        condition: 'Used',
        color: '',
        description: '',
        specifications: {},
        features: [],
        images: [],
        featured: false,
        published: false,
      });
    }
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      if (selectedListing) {
        setListings(prev => prev.map(l =>
          l.id === selectedListing.id
            ? {
                ...l,
                ...formData,
                slug,
                category: formData.category as any,
                mileage: formData.mileage ?? undefined,
                hoursUsed: formData.hoursUsed ?? undefined,
              }
            : l
        ));
      } else {
        const newListing: Listing = {
          id: Date.now().toString(),
          slug,
          name: formData.name,
          category: formData.category as any,
          brand: formData.brand,
          model: formData.model,
          year: formData.year,
          price: formData.price,
          mileage: formData.mileage ?? undefined,
          hoursUsed: formData.hoursUsed ?? undefined,
          transmission: formData.transmission,
          fuelType: formData.fuelType,
          driveSystem: formData.driveSystem,
          condition: formData.condition,
          color: formData.color,
          description: formData.description,
          specifications: formData.specifications,
          features: formData.features,
          images: formData.images,
          featured: formData.featured,
          published: formData.published,
          createdAt: new Date().toISOString(),
        };
        setListings(prev => [newListing, ...prev]);
      }

      setEditDialogOpen(false);
      setSaving(false);
    }, 500);
  };

  const handleDelete = () => {
    if (!selectedListing) return;
    setSaving(true);
    setTimeout(() => {
      setListings(prev => prev.filter(l => l.id !== selectedListing.id));
      setDeleteDialogOpen(false);
      setSaving(false);
    }, 300);
  };

  const togglePublished = (listing: Listing) => {
    setListings(prev => prev.map(l =>
      l.id === listing.id ? { ...l, published: !l.published } : l
    ));
  };

  const toggleFeatured = (listing: Listing) => {
    setListings(prev => prev.map(l =>
      l.id === listing.id ? { ...l, featured: !l.featured } : l
    ));
  };

  const formatPrice = (price: number) => `₦${price?.toLocaleString() || 0}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-off-white">Listings</h1>
          <p className="text-brand-warm-grey mt-1">Manage vehicles and machinery inventory</p>
        </div>
        <Button
          onClick={() => openEditDialog()}
          className="bg-brand-gold text-brand-bg hover:bg-brand-gold-light"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Listing
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-brand-card border-brand-border">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search listings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-brand-surface border-brand-border text-brand-off-white"
              />
            </div>
            <Select value={categoryFilter || '__all__'} onValueChange={(v) => setCategoryFilter(v === '__all__' ? '' : v)}>
              <SelectTrigger className="w-[180px] bg-brand-surface border-brand-border text-brand-off-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-brand-surface border-brand-border">
                <SelectItem value="__all__">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter || '__all__'} onValueChange={(v) => setStatusFilter(v === '__all__' ? '' : v)}>
              <SelectTrigger className="w-[180px] bg-brand-surface border-brand-border text-brand-off-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-brand-surface border-brand-border">
                <SelectItem value="__all__">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-brand-card border-brand-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-brand-border hover:bg-transparent">
                  <TableHead className="text-brand-warm-grey">Listing</TableHead>
                  <TableHead className="text-brand-warm-grey">Category</TableHead>
                  <TableHead className="text-brand-warm-grey">Price</TableHead>
                  <TableHead className="text-brand-warm-grey">Status</TableHead>
                  <TableHead className="text-brand-warm-grey text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredListings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-brand-warm-grey py-8">
                      No listings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredListings.map((listing) => (
                    <TableRow key={listing.id} className="border-brand-border">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-12 bg-brand-surface rounded overflow-hidden flex-shrink-0">
                            {listing.images?.[0] ? (
                              <img src={listing.images[0]} alt={listing.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-brand-warm-grey" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-brand-off-white font-medium">{listing.name}</p>
                            <p className="text-brand-warm-grey text-sm">{listing.year} • {listing.brand}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-brand-off-white">{listing.category}</TableCell>
                      <TableCell className="text-brand-gold font-medium">{formatPrice(listing.price)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Badge
                            variant={listing.published ? 'default' : 'secondary'}
                            className={listing.published ? 'bg-green-600' : 'bg-brand-surface text-brand-warm-grey'}
                          >
                            {listing.published ? 'Published' : 'Draft'}
                          </Badge>
                          {listing.featured && (
                            <Badge className="bg-brand-gold text-brand-bg">Featured</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-brand-warm-grey">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-brand-surface border-brand-border">
                            <DropdownMenuItem onClick={() => openEditDialog(listing)} className="text-brand-off-white">
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => togglePublished(listing)} className="text-brand-off-white">
                              {listing.published ? 'Unpublish' : 'Publish'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleFeatured(listing)} className="text-brand-off-white">
                              {listing.featured ? 'Unfeature' : 'Feature'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => { setSelectedListing(listing); setDeleteDialogOpen(true); }}
                              className="text-red-400"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-brand-card border-brand-border">
          <DialogHeader>
            <DialogTitle className="text-brand-off-white">
              {selectedListing ? 'Edit Listing' : 'Add New Listing'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-4">
              <div>
                <Label className="text-brand-off-white">Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-brand-surface border-brand-border text-brand-off-white mt-2"
                  placeholder="e.g., Toyota Land Cruiser 300"
                />
              </div>

              <div>
                <Label className="text-brand-off-white">Slug</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="bg-brand-surface border-brand-border text-brand-off-white mt-2"
                  placeholder="auto-generated if empty"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-brand-off-white">Category *</Label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                    <SelectTrigger className="bg-brand-surface border-brand-border text-brand-off-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-surface border-brand-border">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-brand-off-white">Condition</Label>
                  <Select value={formData.condition} onValueChange={(val: any) => setFormData({ ...formData, condition: val })}>
                    <SelectTrigger className="bg-brand-surface border-brand-border text-brand-off-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-surface border-brand-border">
                      {conditions.map((cond) => (
                        <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-brand-off-white">Brand *</Label>
                  <Input
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="bg-brand-surface border-brand-border text-brand-off-white mt-2"
                    placeholder="e.g., Toyota"
                  />
                </div>

                <div>
                  <Label className="text-brand-off-white">Model *</Label>
                  <Input
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="bg-brand-surface border-brand-border text-brand-off-white mt-2"
                    placeholder="e.g., Land Cruiser"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-brand-off-white">Year *</Label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="bg-brand-surface border-brand-border text-brand-off-white mt-2"
                  />
                </div>

                <div>
                  <Label className="text-brand-off-white">Price (₦) *</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    className="bg-brand-surface border-brand-border text-brand-off-white mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-brand-off-white">Mileage (km)</Label>
                  <Input
                    type="number"
                    value={formData.mileage ?? ''}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value ? parseInt(e.target.value) : null })}
                    className="bg-brand-surface border-brand-border text-brand-off-white mt-2"
                    placeholder="For vehicles"
                  />
                </div>

                <div>
                  <Label className="text-brand-off-white">Hours Used</Label>
                  <Input
                    type="number"
                    value={formData.hoursUsed ?? ''}
                    onChange={(e) => setFormData({ ...formData, hoursUsed: e.target.value ? parseInt(e.target.value) : null })}
                    className="bg-brand-surface border-brand-border text-brand-off-white mt-2"
                    placeholder="For machinery"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-brand-off-white">Transmission</Label>
                  <Select value={formData.transmission} onValueChange={(val: any) => setFormData({ ...formData, transmission: val })}>
                    <SelectTrigger className="bg-brand-surface border-brand-border text-brand-off-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-surface border-brand-border">
                      {transmissions.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-brand-off-white">Fuel Type</Label>
                  <Select value={formData.fuelType} onValueChange={(val: any) => setFormData({ ...formData, fuelType: val })}>
                    <SelectTrigger className="bg-brand-surface border-brand-border text-brand-off-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-surface border-brand-border">
                      {fuelTypes.map((f) => (
                        <SelectItem key={f} value={f}>{f}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-brand-off-white">Drive System</Label>
                  <Select value={formData.driveSystem} onValueChange={(val) => setFormData({ ...formData, driveSystem: val })}>
                    <SelectTrigger className="bg-brand-surface border-brand-border text-brand-off-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-surface border-brand-border">
                      {driveSystems.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-brand-off-white">Color</Label>
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="bg-brand-surface border-brand-border text-brand-off-white mt-2"
                  placeholder="e.g., Pearl White"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-brand-off-white">Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-brand-surface border-brand-border text-brand-off-white min-h-[120px] mt-2"
                  placeholder="Detailed description..."
                />
              </div>

              <div>
                <Label className="text-brand-off-white">Images (URLs, one per line)</Label>
                <Textarea
                  value={formData.images.join('\n')}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value.split('\n').filter(Boolean) })}
                  className="bg-brand-surface border-brand-border text-brand-off-white min-h-[80px] mt-2"
                  placeholder="https://images.pexels.com/..."
                />
              </div>

              <div>
                <Label className="text-brand-off-white">Features (one per line)</Label>
                <Textarea
                  value={formData.features?.join('\n') || ''}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n').filter(Boolean) })}
                  className="bg-brand-surface border-brand-border text-brand-off-white min-h-[80px] mt-2"
                  placeholder="GPS Navigation&#10;Reverse Camera"
                />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label className="text-brand-off-white">Published</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label className="text-brand-off-white">Featured</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="border-brand-border text-brand-warm-grey"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-brand-gold text-brand-bg hover:bg-brand-gold-light"
            >
              {saving ? 'Saving...' : 'Save Listing'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-brand-card border-brand-border">
          <DialogHeader>
            <DialogTitle className="text-brand-off-white">Delete Listing</DialogTitle>
          </DialogHeader>
          <p className="text-brand-warm-grey">
            Are you sure you want to delete &quot;{selectedListing?.name}&quot;? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-brand-border text-brand-warm-grey"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={saving}
              className="bg-red-600 hover:bg-red-700"
            >
              {saving ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
