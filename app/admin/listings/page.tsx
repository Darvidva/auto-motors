'use client';

import { useState, useMemo } from 'react';
import { listings as allListings } from '@/lib/placeholder-data';
import { listingSchema } from '@/lib/validations';
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
import ImageUpload from '@/components/admin/ImageUpload';
import FeatureTagsInput from '@/components/admin/FeatureTagsInput';
import { BarLoader } from '@/components/ui/bar-loader';

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
    interiorColor: '',
    bodyType: '',
    engineCapacity: '',
    vin: '',
    serviceHistory: '',
    numberOfKeys: null as number | null,
    description: '',
    features: [] as string[],
    images: [] as string[],
    featured: false,
    published: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const openEditDialog = (listing?: Listing) => {
    setFormErrors({});
    if (listing) {
      setSelectedListing(listing);
      setFormData({
        name: listing.name,
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
        interiorColor: listing.interiorColor || '',
        bodyType: listing.bodyType || '',
        engineCapacity: listing.engineCapacity || '',
        vin: listing.vin || '',
        serviceHistory: listing.serviceHistory || '',
        numberOfKeys: listing.numberOfKeys ?? null,
        description: listing.description,
        features: listing.features || [],
        images: listing.images || [],
        featured: listing.featured,
        published: listing.published,
      });
    } else {
      setSelectedListing(null);
      setFormData({
        name: '',
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
        interiorColor: '',
        bodyType: '',
        engineCapacity: '',
        vin: '',
        serviceHistory: '',
        numberOfKeys: null,
        description: '',
        features: [],
        images: [],
        featured: false,
        published: false,
      });
    }
    setEditDialogOpen(true);
  };

  const validateForm = (): boolean => {
    const result = listingSchema.safeParse(formData);
    if (result.success) {
      setFormErrors({});
      return true;
    }
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    setFormErrors(fieldErrors);
    return false;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    setSaving(true);
    setTimeout(() => {
      const slug = generateSlug(formData.name);

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
                numberOfKeys: formData.numberOfKeys ?? undefined,
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
          interiorColor: formData.interiorColor,
          bodyType: formData.bodyType,
          engineCapacity: formData.engineCapacity,
          vin: formData.vin,
          serviceHistory: formData.serviceHistory,
          numberOfKeys: formData.numberOfKeys ?? undefined,
          description: formData.description,
          specifications: {},
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
          <h1 className="font-display text-3xl font-bold text-brand-dark">Listings</h1>
          <p className="text-brand-mid-grey mt-1">Manage vehicles and machinery inventory</p>
        </div>
        <Button
          onClick={() => openEditDialog()}
          className="bg-brand-gold text-white hover:bg-brand-gold-dark"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Listing
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white border-brand-border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search listings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white border-brand-border text-brand-dark"
              />
            </div>
            <Select value={categoryFilter || '__all__'} onValueChange={(v) => setCategoryFilter(v === '__all__' ? '' : v)}>
              <SelectTrigger className="w-[180px] bg-white border-brand-border text-brand-dark">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-white border-brand-border">
                <SelectItem value="__all__">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter || '__all__'} onValueChange={(v) => setStatusFilter(v === '__all__' ? '' : v)}>
              <SelectTrigger className="w-[180px] bg-white border-brand-border text-brand-dark">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-brand-border">
                <SelectItem value="__all__">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white border-brand-border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-brand-border hover:bg-transparent">
                  <TableHead className="text-brand-mid-grey">Listing</TableHead>
                  <TableHead className="text-brand-mid-grey">Category</TableHead>
                  <TableHead className="text-brand-mid-grey">Price</TableHead>
                  <TableHead className="text-brand-mid-grey">Status</TableHead>
                  <TableHead className="text-brand-mid-grey text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredListings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-brand-mid-grey py-8">
                      No listings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredListings.map((listing) => (
                    <TableRow key={listing.id} className="border-brand-border">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-12 bg-brand-surface border-brand-border rounded overflow-hidden flex-shrink-0">
                            {listing.images?.[0] ? (
                              <img src={listing.images[0]} alt={listing.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-brand-mid-grey" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-brand-dark font-medium">{listing.name}</p>
                            <p className="text-brand-mid-grey text-sm">{listing.year} • {listing.brand}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-brand-dark">{listing.category}</TableCell>
                      <TableCell className="text-brand-gold font-semibold">{formatPrice(listing.price)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Badge
                            variant={listing.published ? 'default' : 'secondary'}
                            className={listing.published ? 'bg-green-100 text-green-700' : 'bg-brand-surface text-brand-mid-grey'}
                          >
                            {listing.published ? 'Published' : 'Draft'}
                          </Badge>
                          {listing.featured && (
                            <Badge className="bg-brand-gold/10 text-brand-gold border border-brand-gold/20">Featured</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-brand-mid-grey">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white border-brand-border">
                            <DropdownMenuItem onClick={() => openEditDialog(listing)} className="text-brand-dark">
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => togglePublished(listing)} className="text-brand-dark">
                              {listing.published ? 'Unpublish' : 'Publish'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleFeatured(listing)} className="text-brand-dark">
                              {listing.featured ? 'Unfeature' : 'Feature'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => { setSelectedListing(listing); setDeleteDialogOpen(true); }}
                              className="text-red-500"
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-brand-border">
          <DialogHeader>
            <DialogTitle className="text-brand-dark text-xl">
              {selectedListing ? 'Edit Listing' : 'Add New Listing'}
            </DialogTitle>
            <p className="text-brand-mid-grey text-sm">
              {selectedListing ? 'Update the details below.' : 'Fill in the details to add a new listing.'}
            </p>
          </DialogHeader>

          <div className="py-4 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-brand-dark border-b border-brand-border pb-2">Basic Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-brand-dark-grey">Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`bg-white mt-1.5 ${formErrors.name ? 'border-red-400' : 'border-brand-border'} text-brand-dark`}
                    placeholder="e.g., Toyota Land Cruiser 300"
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <Label className="text-brand-dark-grey">Category *</Label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                    <SelectTrigger className="bg-white border-brand-border text-brand-dark mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-brand-border">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-brand-dark-grey">Brand *</Label>
                  <Input
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className={`bg-white mt-1.5 ${formErrors.brand ? 'border-red-400' : 'border-brand-border'} text-brand-dark`}
                    placeholder="e.g., Toyota"
                  />
                  {formErrors.brand && <p className="text-red-500 text-xs mt-1">{formErrors.brand}</p>}
                </div>

                <div>
                  <Label className="text-brand-dark-grey">Model *</Label>
                  <Input
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className={`bg-white mt-1.5 ${formErrors.model ? 'border-red-400' : 'border-brand-border'} text-brand-dark`}
                    placeholder="e.g., Land Cruiser"
                  />
                  {formErrors.model && <p className="text-red-500 text-xs mt-1">{formErrors.model}</p>}
                </div>

                <div>
                  <Label className="text-brand-dark-grey">Year *</Label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
                    className="bg-white border-brand-border text-brand-dark mt-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-brand-dark-grey">Price (₦) *</Label>
                  <Input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    className={`bg-white mt-1.5 ${formErrors.price ? 'border-red-400' : 'border-brand-border'} text-brand-dark`}
                    placeholder="e.g., 85000000"
                  />
                  {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
                </div>

                <div>
                  <Label className="text-brand-dark-grey">Condition</Label>
                  <Select value={formData.condition} onValueChange={(val: any) => setFormData({ ...formData, condition: val })}>
                    <SelectTrigger className="bg-white border-brand-border text-brand-dark mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-brand-border">
                      {conditions.map((cond) => (
                        <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-brand-dark-grey">Color (Exterior)</Label>
                  <Input
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="bg-white border-brand-border text-brand-dark mt-1.5"
                    placeholder="e.g., Pearl White"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-brand-dark-grey">Interior Color</Label>
                  <Input
                    value={formData.interiorColor}
                    onChange={(e) => setFormData({ ...formData, interiorColor: e.target.value })}
                    className="bg-white border-brand-border text-brand-dark mt-1.5"
                    placeholder="e.g., Beige Leather"
                  />
                </div>

                <div>
                  <Label className="text-brand-dark-grey">Body Type</Label>
                  <Input
                    value={formData.bodyType}
                    onChange={(e) => setFormData({ ...formData, bodyType: e.target.value })}
                    className="bg-white border-brand-border text-brand-dark mt-1.5"
                    placeholder="e.g., SUV, Sedan, Tractor"
                  />
                </div>

                <div>
                  <Label className="text-brand-dark-grey">Engine Capacity</Label>
                  <Input
                    value={formData.engineCapacity}
                    onChange={(e) => setFormData({ ...formData, engineCapacity: e.target.value })}
                    className="bg-white border-brand-border text-brand-dark mt-1.5"
                    placeholder="e.g., 3.5L V6"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-brand-dark-grey">VIN (Vehicle ID Number)</Label>
                  <Input
                    value={formData.vin}
                    onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                    className="bg-white border-brand-border text-brand-dark mt-1.5"
                    placeholder="e.g., 1HGCM82633A..."
                  />
                </div>

                <div>
                  <Label className="text-brand-dark-grey">Service History</Label>
                  <Input
                    value={formData.serviceHistory}
                    onChange={(e) => setFormData({ ...formData, serviceHistory: e.target.value })}
                    className="bg-white border-brand-border text-brand-dark mt-1.5"
                    placeholder="e.g., Full Dealership History"
                  />
                </div>

                <div>
                  <Label className="text-brand-dark-grey">Number of Keys</Label>
                  <Input
                    type="number"
                    value={formData.numberOfKeys ?? ''}
                    onChange={(e) => setFormData({ ...formData, numberOfKeys: e.target.value ? parseInt(e.target.value) : null })}
                    className="bg-white border-brand-border text-brand-dark mt-1.5"
                    placeholder="e.g., 2"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-4">
              <h3 className="font-medium text-brand-dark border-b border-brand-border pb-2">Vehicle / Machinery Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-brand-dark-grey">Mileage (km)</Label>
                  <Input
                    type="number"
                    value={formData.mileage ?? ''}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value ? parseInt(e.target.value) : null })}
                    className="bg-white border-brand-border text-brand-dark mt-1.5"
                    placeholder="For vehicles"
                  />
                </div>

                <div>
                  <Label className="text-brand-dark-grey">Hours Used</Label>
                  <Input
                    type="number"
                    value={formData.hoursUsed ?? ''}
                    onChange={(e) => setFormData({ ...formData, hoursUsed: e.target.value ? parseInt(e.target.value) : null })}
                    className="bg-white border-brand-border text-brand-dark mt-1.5"
                    placeholder="For machinery"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-brand-dark-grey">Transmission</Label>
                  <Select value={formData.transmission} onValueChange={(val: any) => setFormData({ ...formData, transmission: val })}>
                    <SelectTrigger className="bg-white border-brand-border text-brand-dark mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-brand-border">
                      {transmissions.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-brand-dark-grey">Fuel Type</Label>
                  <Select value={formData.fuelType} onValueChange={(val: any) => setFormData({ ...formData, fuelType: val })}>
                    <SelectTrigger className="bg-white border-brand-border text-brand-dark mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-brand-border">
                      {fuelTypes.map((f) => (
                        <SelectItem key={f} value={f}>{f}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-brand-dark-grey">Drive System</Label>
                  <Select value={formData.driveSystem} onValueChange={(val) => setFormData({ ...formData, driveSystem: val })}>
                    <SelectTrigger className="bg-white border-brand-border text-brand-dark mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-brand-border">
                      {driveSystems.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-3">
              <h3 className="font-medium text-brand-dark border-b border-brand-border pb-2">Photos *</h3>
              <ImageUpload
                images={formData.images}
                onChange={(images) => setFormData({ ...formData, images })}
                maxImages={5}
              />
              {formErrors.images && <p className="text-red-500 text-xs">{formErrors.images}</p>}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-medium text-brand-dark border-b border-brand-border pb-2">Description *</h3>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`bg-white ${formErrors.description ? 'border-red-400' : 'border-brand-border'} text-brand-dark min-h-[100px]`}
                placeholder="Write a detailed description of the vehicle or machinery..."
              />
              {formErrors.description && <p className="text-red-500 text-xs">{formErrors.description}</p>}
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-medium text-brand-dark border-b border-brand-border pb-2">Features</h3>
              <FeatureTagsInput
                features={formData.features}
                onChange={(features) => setFormData({ ...formData, features })}
                placeholder="e.g., GPS Navigation, Reverse Camera"
              />
            </div>

            {/* Status */}
            <div className="flex items-center gap-6 pt-4 border-t border-brand-border">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label className="text-brand-dark-grey">Publish immediately</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label className="text-brand-dark-grey">Mark as featured</Label>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="border-brand-border text-brand-mid-grey"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-brand-gold text-white hover:bg-brand-gold-dark"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <BarLoader size="sm" color="bg-white" />
                  Saving…
                </span>
              ) : selectedListing ? 'Update Listing' : 'Add Listing'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white border-brand-border">
          <DialogHeader>
            <DialogTitle className="text-brand-dark">Delete Listing</DialogTitle>
          </DialogHeader>
          <p className="text-brand-mid-grey">
            Are you sure you want to delete &quot;{selectedListing?.name}&quot;? This cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-brand-border text-brand-mid-grey"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={saving}
              className="bg-red-500 hover:bg-red-600"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <BarLoader size="sm" color="bg-white" />
                  Deleting…
                </span>
              ) : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
