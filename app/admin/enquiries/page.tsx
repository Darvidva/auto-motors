'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Search,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  listing_id?: string;
  listing_name?: string;
  status: string;
  created_at: string;
  updated_at: string;
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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      let query = supabase.from('enquiries').select('*').order('created_at', { ascending: false });

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }

      const { data } = await query;
      setEnquiries(data || []);
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchEnquiries();
  };

  const openDetail = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setDetailOpen(true);
    // Mark as read if unread
    if (enquiry.status === 'Unread') {
      updateStatus(enquiry.id, 'Read');
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await supabase
        .from('enquiries')
        .update({ status })
        .eq('id', id);
      fetchEnquiries();
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
    } catch (err) {
      console.error('Error updating status:', err);
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
        <h1 className="font-display text-3xl font-bold text-brand-off-white">Enquiries</h1>
        <p className="text-brand-warm-grey mt-1">Customer messages and contact requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <Card className="bg-brand-card border-brand-border">
          <CardContent className="p-4">
            <p className="text-brand-warm-grey text-xs uppercase tracking-wider">Total</p>
            <p className="font-display text-2xl font-bold text-brand-off-white">{counts.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-brand-card border-brand-border cursor-pointer hover:border-brand-border/80" onClick={() => setStatusFilter('Unread')}>
          <CardContent className="p-4">
            <p className="text-red-400 text-xs uppercase tracking-wider">Unread</p>
            <p className="font-display text-2xl font-bold text-red-400">{counts.unread}</p>
          </CardContent>
        </Card>
        <Card className="bg-brand-card border-brand-border cursor-pointer hover:border-brand-border/80" onClick={() => setStatusFilter('Read')}>
          <CardContent className="p-4">
            <p className="text-blue-400 text-xs uppercase tracking-wider">Read</p>
            <p className="font-display text-2xl font-bold text-blue-400">{counts.read}</p>
          </CardContent>
        </Card>
        <Card className="bg-brand-card border-brand-border cursor-pointer hover:border-brand-border/80" onClick={() => setStatusFilter('Followed Up')}>
          <CardContent className="p-4">
            <p className="text-yellow-400 text-xs uppercase tracking-wider">Followed Up</p>
            <p className="font-display text-2xl font-bold text-yellow-400">{counts.followedUp}</p>
          </CardContent>
        </Card>
        <Card className="bg-brand-card border-brand-border cursor-pointer hover:border-brand-border/80" onClick={() => setStatusFilter('Resolved')}>
          <CardContent className="p-4">
            <p className="text-green-400 text-xs uppercase tracking-wider">Resolved</p>
            <p className="font-display text-2xl font-bold text-green-400">{counts.resolved}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-brand-card border-brand-border">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-brand-surface border-brand-border text-brand-off-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); fetchEnquiries(); }}>
              <SelectTrigger className="w-[180px] bg-brand-surface border-brand-border text-brand-off-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-brand-surface border-brand-border">
                <SelectItem value="">All Status</SelectItem>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} variant="outline" className="border-brand-border">
              <Search className="w-4 h-4" />
            </Button>
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
                  <TableHead className="text-brand-warm-grey">Contact</TableHead>
                  <TableHead className="text-brand-warm-grey">Message</TableHead>
                  <TableHead className="text-brand-warm-grey">Listing</TableHead>
                  <TableHead className="text-brand-warm-grey">Status</TableHead>
                  <TableHead className="text-brand-warm-grey">Date</TableHead>
                  <TableHead className="text-brand-warm-grey text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-brand-warm-grey py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : enquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-brand-warm-grey py-8">
                      No enquiries found
                    </TableCell>
                  </TableRow>
                ) : (
                  enquiries.map((enquiry) => (
                    <TableRow
                      key={enquiry.id}
                      className="border-brand-border cursor-pointer hover:bg-brand-surface/50"
                      onClick={() => openDetail(enquiry)}
                    >
                      <TableCell>
                        <div>
                          <p className="text-brand-off-white font-medium">{enquiry.name}</p>
                          <p className="text-brand-warm-grey text-sm">{enquiry.email}</p>
                          {enquiry.phone && (
                            <p className="text-brand-warm-grey text-xs">{enquiry.phone}</p>
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
                          <p className="text-brand-off-white text-sm">{enquiry.listing_name}</p>
                        ) : (
                          <span className="text-brand-warm-grey text-sm">General Enquiry</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[enquiry.status]}>
                          {enquiry.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-brand-warm-grey text-sm">
                        {formatDate(enquiry.created_at)}
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-brand-warm-grey">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-brand-surface border-brand-border">
                            {statuses.map((s) => (
                              <DropdownMenuItem
                                key={s}
                                onClick={() => updateStatus(enquiry.id, s)}
                                className="text-brand-off-white"
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
        <SheetContent className="bg-brand-card border-brand-border sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-brand-off-white">Enquiry Details</SheetTitle>
          </SheetHeader>

          {selectedEnquiry && (
            <div className="mt-6 space-y-6">
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                    <span className="text-brand-gold font-medium">
                      {selectedEnquiry.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-brand-off-white font-medium">{selectedEnquiry.name}</p>
                    <p className="text-brand-warm-grey text-sm">{selectedEnquiry.email}</p>
                  </div>
                </div>

                {selectedEnquiry.phone && (
                  <div className="flex items-center gap-3 text-brand-warm-grey">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${selectedEnquiry.phone}`} className="hover:text-brand-gold">
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-3 text-brand-warm-grey">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedEnquiry.created_at)}</span>
                </div>
              </div>

              {/* Status */}
              <div>
                <Label className="text-brand-off-white">Status</Label>
                <Select
                  value={selectedEnquiry.status}
                  onValueChange={(val) => updateStatus(selectedEnquiry.id, val)}
                >
                  <SelectTrigger className="bg-brand-surface border-brand-border text-brand-off-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-brand-surface border-brand-border">
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div>
                <Label className="text-brand-off-white">Message</Label>
                <div className="mt-2 p-4 bg-brand-surface rounded-lg border border-brand-border">
                  <p className="text-brand-grey whitespace-pre-wrap">
                    {selectedEnquiry.message}
                  </p>
                </div>
              </div>

              {/* Related Listing */}
              {selectedEnquiry.listing_id && (
                <div>
                  <Label className="text-brand-off-white">Related Listing</Label>
                  <Link
                    href={`/inventory/${selectedEnquiry.listing_id}`}
                    target="_blank"
                    className="mt-2 flex items-center gap-2 text-brand-gold hover:underline"
                  >
                    {selectedEnquiry.listing_name}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Quick Actions */}
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
