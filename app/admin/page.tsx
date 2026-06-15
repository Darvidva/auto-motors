'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Mail, Eye, TrendingUp, DollarSign } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Stats {
  totalListings: number;
  publishedListings: number;
  totalEnquiries: number;
  unreadEnquiries: number;
  totalValue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalListings: 0,
    publishedListings: 0,
    totalEnquiries: 0,
    unreadEnquiries: 0,
    totalValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [recentListings, setRecentListings] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch listings count
        const { count: totalListings } = await supabase
          .from('listings')
          .select('*', { count: 'exact', head: true });

        const { count: publishedListings } = await supabase
          .from('listings')
          .select('*', { count: 'exact', head: true })
          .eq('published', true);

        // Fetch enquiries count
        const { count: totalEnquiries } = await supabase
          .from('enquiries')
          .select('*', { count: 'exact', head: true });

        const { count: unreadEnquiries } = await supabase
          .from('enquiries')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Unread');

        // Fetch total value
        const { data: listingsData } = await supabase
          .from('listings')
          .select('price');

        const totalValue = listingsData?.reduce((sum, l) => sum + (l.price || 0), 0) || 0;

        // Fetch recent enquiries
        const { data: enquiries } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        // Fetch recent listings
        const { data: listings } = await supabase
          .from('listings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          totalListings: totalListings || 0,
          publishedListings: publishedListings || 0,
          totalEnquiries: totalEnquiries || 0,
          unreadEnquiries: unreadEnquiries || 0,
          totalValue,
        });
        setRecentEnquiries(enquiries || []);
        setRecentListings(listings || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-brand-off-white">Dashboard</h1>
        <p className="text-brand-warm-grey mt-1">Welcome to DX STAR EMPORIUM admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-brand-card border-brand-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-warm-grey text-sm">Total Listings</p>
                <p className="font-display text-3xl font-bold text-brand-off-white mt-1">
                  {loading ? '...' : stats.totalListings}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                <Car className="w-6 h-6 text-brand-gold" />
              </div>
            </div>
            <p className="text-brand-warm-grey text-xs mt-3">
              {stats.publishedListings} published
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-card border-brand-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-warm-grey text-sm">Total Enquiries</p>
                <p className="font-display text-3xl font-bold text-brand-off-white mt-1">
                  {loading ? '...' : stats.totalEnquiries}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-red-400 text-xs mt-3">
              {stats.unreadEnquiries} unread
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-card border-brand-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-warm-grey text-sm">Inventory Value</p>
                <p className="font-display text-2xl font-bold text-brand-off-white mt-1">
                  {loading ? '...' : formatPrice(stats.totalValue)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-brand-card border-brand-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-warm-grey text-sm">Published</p>
                <p className="font-display text-3xl font-bold text-brand-off-white mt-1">
                  {loading ? '...' : Math.round((stats.publishedListings / (stats.totalListings || 1)) * 100)}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-brand-gold" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <Card className="bg-brand-card border-brand-border">
          <CardHeader>
            <CardTitle className="text-brand-off-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-brand-gold" />
              Recent Enquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-brand-surface h-16 rounded-lg" />
                ))}
              </div>
            ) : recentEnquiries.length === 0 ? (
              <p className="text-brand-warm-grey text-center py-8">No enquiries yet</p>
            ) : (
              <div className="space-y-3">
                {recentEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="bg-brand-surface rounded-lg p-4 border border-brand-border"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-brand-off-white font-medium">{enquiry.name}</p>
                        <p className="text-brand-warm-grey text-sm">{enquiry.email}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          enquiry.status === 'Unread'
                            ? 'bg-red-900/30 text-red-400'
                            : enquiry.status === 'Read'
                            ? 'bg-blue-900/30 text-blue-400'
                            : enquiry.status === 'Followed Up'
                            ? 'bg-yellow-900/30 text-yellow-400'
                            : 'bg-green-900/30 text-green-400'
                        }`}
                      >
                        {enquiry.status}
                      </span>
                    </div>
                    <p className="text-brand-warm-grey text-sm mt-2 line-clamp-2">
                      {enquiry.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Listings */}
        <Card className="bg-brand-card border-brand-border">
          <CardHeader>
            <CardTitle className="text-brand-off-white flex items-center gap-2">
              <Car className="w-5 h-5 text-brand-gold" />
              Recent Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-brand-surface h-16 rounded-lg" />
                ))}
              </div>
            ) : recentListings.length === 0 ? (
              <p className="text-brand-warm-grey text-center py-8">No listings yet</p>
            ) : (
              <div className="space-y-3">
                {recentListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-brand-surface rounded-lg p-4 border border-brand-border flex items-center gap-4"
                  >
                    <div className="w-16 h-12 bg-brand-border rounded overflow-hidden flex-shrink-0">
                      {listing.images?.[0] && (
                        <img
                          src={listing.images[0]}
                          alt={listing.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-brand-off-white font-medium truncate">{listing.name}</p>
                      <p className="text-brand-warm-grey text-sm">{formatPrice(listing.price)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          listing.published
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-brand-border text-brand-warm-grey'
                        }`}
                      >
                        {listing.published ? 'Published' : 'Draft'}
                      </span>
                      {listing.featured && (
                        <span className="text-xs text-brand-gold">Featured</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
