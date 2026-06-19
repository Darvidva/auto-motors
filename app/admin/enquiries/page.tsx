'use client';

import { useState, useMemo, useEffect } from 'react';
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Search,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  listing_id?: string | null;
  listing_name?: string | null;
  status: string;
  created_at: string;
}

const statuses = ['Unread', 'Read', 'Followed Up', 'Resolved'];

const statusColors: Record<string, string> = {
  'Unread': 'bg-red-900/30 text-red-400',
  'Read': 'bg-blue-900/30 text-blue-400',
  'Followed Up': 'bg-yellow-900/30 text-yellow-400',
  'Resolved': 'bg-green-900/30 text-green-400',
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/enquiries')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Map backend fields to the interface
          const mapped = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            message: item.message,
            listing_id: item.listingId,
            listing_name: item.listingName,
            status: item.status,
            created_at: item.createdAt,
          }));
          setEnquiries(mapped);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredEnquiries = useMemo(() => {
    let result = [...enquiries];

    if (search) {
      result = result.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      result = result.filter(e => e.status === statusFilter);
    }

    return result;
  }, [enquiries, search, statusFilter]);

  const openDetail = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setDetailOpen(true);
    if (enquiry.status === 'Unread') {
      updateStatus(enquiry.id, 'Read');
    }
  };

  const updateStatus = (id: string, status: string) => {
    setEnquiries(prev => prev.map(e =>
      e.id === id ? { ...e, status } : e
    ));
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const counts = {
    total: enquiries.length,
    unread: enquiries.filter(e => e.status === 'Unread').length,
    read: enquiries.filter(e => e.status === 'Read').length,
    followedUp: enquiries.filter(e => e.status === 'Followed Up').length,
    resolved: enquiries.filter(e => e.status === 'Resolved').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-brand-dark">Enquiries</h1>
        <p className="text-brand-mid-grey mt-1">Customer messages and contact requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <Card className="bg-white border-brand-border">
          <CardContent className="p-4">
            <p className="text-brand-mid-grey text-xs uppercase tracking-wider">Total</p>
            <p className="font-display text-2xl font-bold text-brand-dark">{counts.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-brand-border cursor-pointer hover:border-brand-border/80" onClick={() => setStatusFilter('Unread')}>
          <CardContent className="p-4">
            <p className="text-red-400 text-xs uppercase tracking-wider">Unread</p>
            <p className="font-display text-2xl font-bold text-red-400">{counts.unread}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-brand-border cursor-pointer hover:border-brand-border/80" onClick={() => setStatusFilter('Read')}>
          <CardContent className="p-4">
            <p className="text-blue-400 text-xs uppercase tracking-wider">Read</p>
            <p className="font-display text-2xl font-bold text-blue-400">{counts.read}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-brand-border cursor-pointer hover:border-brand-border/80" onClick={() => setStatusFilter('Followed Up')}>
          <CardContent className="p-4">
            <p className="text-yellow-400 text-xs uppercase tracking-wider">Followed Up</p>
            <p className="font-display text-2xl font-bold text-yellow-400">{counts.followedUp}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-brand-border cursor-pointer hover:border-brand-border/80" onClick={() => setStatusFilter('Resolved')}>
          <CardContent className="p-4">
            <p className="text-green-400 text-xs uppercase tracking-wider">Resolved</p>
            <p className="font-display text-2xl font-bold text-green-400">{counts.resolved}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white border-brand-border">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-brand-surface border-brand-border border-brand-border text-brand-dark"
              />
            </div>
            <Select value={statusFilter || '__all__'} onValueChange={(v) => setStatusFilter(v === '__all__' ? '' : v)}>
              <SelectTrigger className="w-[180px] bg-brand-surface border-brand-border border-brand-border text-brand-dark">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-brand-surface border-brand-border border-brand-border">
                <SelectItem value="__all__">All Status</SelectItem>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white border-brand-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-brand-border hover:bg-transparent">
                  <TableHead className="text-brand-mid-grey">Contact</TableHead>
                  <TableHead className="text-brand-mid-grey">Message</TableHead>
                  <TableHead className="text-brand-mid-grey">Listing</TableHead>
                  <TableHead className="text-brand-mid-grey">Status</TableHead>
                  <TableHead className="text-brand-mid-grey">Date</TableHead>
                  <TableHead className="text-brand-mid-grey text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-brand-mid-grey py-8">
                      No enquiries found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEnquiries.map((enquiry) => (
                    <TableRow
                      key={enquiry.id}
                      className="border-brand-border cursor-pointer hover:bg-brand-surface border-brand-border/50"
                      onClick={() => openDetail(enquiry)}
                    >
                      <TableCell>
                        <div>
                          <p className="text-brand-dark font-medium">{enquiry.name}</p>
                          <p className="text-brand-mid-grey text-sm">{enquiry.email}</p>
                          {enquiry.phone && (
                            <p className="text-brand-mid-grey text-xs">{enquiry.phone}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-brand-grey text-sm line-clamp-2 max-w-[300px]">
                          {enquiry.message}
                        </p>
                      </TableCell>
                      <TableCell>
                        {enquiry.listing_name ? (
                          <p className="text-brand-dark text-sm">{enquiry.listing_name}</p>
                        ) : (
                          <span className="text-brand-mid-grey text-sm">General Enquiry</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[enquiry.status]}>
                          {enquiry.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-brand-mid-grey text-sm">
                        {formatDate(enquiry.created_at)}
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-brand-mid-grey">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-brand-surface border-brand-border border-brand-border">
                            {statuses.map((s) => (
                              <DropdownMenuItem
                                key={s}
                                onClick={() => updateStatus(enquiry.id, s)}
                                className="text-brand-dark"
                              >
                                Mark as {s}
                              </DropdownMenuItem>
                            ))}
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

      {/* Detail Sheet */}
      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent className="bg-white border-brand-border sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-brand-dark">Enquiry Details</SheetTitle>
          </SheetHeader>

          {selectedEnquiry && (
            <div className="mt-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                    <span className="text-brand-gold font-medium">
                      {selectedEnquiry.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-brand-dark font-medium">{selectedEnquiry.name}</p>
                    <p className="text-brand-mid-grey text-sm">{selectedEnquiry.email}</p>
                  </div>
                </div>

                {selectedEnquiry.phone && (
                  <div className="flex items-center gap-3 text-brand-mid-grey">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${selectedEnquiry.phone}`} className="hover:text-brand-gold">
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-3 text-brand-mid-grey">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedEnquiry.created_at)}</span>
                </div>
              </div>

              <div>
                <Label className="text-brand-dark">Status</Label>
                <Select
                  value={selectedEnquiry.status}
                  onValueChange={(val) => updateStatus(selectedEnquiry.id, val)}
                >
                  <SelectTrigger className="bg-brand-surface border-brand-border border-brand-border text-brand-dark mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-brand-surface border-brand-border border-brand-border">
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-brand-dark">Message</Label>
                <div className="mt-2 p-4 bg-brand-surface border-brand-border rounded-lg border border-brand-border">
                  <p className="text-brand-grey whitespace-pre-wrap">
                    {selectedEnquiry.message}
                  </p>
                </div>
              </div>

              {selectedEnquiry.listing_name && (
                <div>
                  <Label className="text-brand-dark">Related Listing</Label>
                  <p className="mt-2 text-brand-gold">{selectedEnquiry.listing_name}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-brand-border">
                <Button
                  asChild
                  className="flex-1 bg-brand-gold text-brand-bg"
                >
                  <a href={`mailto:${selectedEnquiry.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Reply via Email
                  </a>
                </Button>
                {selectedEnquiry.phone && (
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-brand-border"
                  >
                    <a href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, '')}`}>
                      WhatsApp
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
