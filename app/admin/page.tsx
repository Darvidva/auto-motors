'use client';

import { listings, mockEnquiries } from '@/lib/placeholder-data';
import { Card, CardContent } from '@/components/ui/card';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Mail, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = {
    totalListings: listings.length,
    publishedListings: listings.filter(l => l.published).length,
    totalEnquiries: mockEnquiries.length,
    unreadEnquiries: mockEnquiries.filter(e => e.status === 'Unread').length,
    totalValue: listings.reduce((sum, l) => sum + l.price, 0),
  };

  const recentEnquiries = mockEnquiries.slice(0, 5);
  const recentListings = listings.slice(0, 5);

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-brand-dark">Dashboard</h1>
        <p className="text-brand-mid-grey mt-1">Welcome to DX STAR EMPORIUM admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-brand-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-mid-grey text-sm font-medium">Total Listings</p>
                <p className="font-display text-3xl font-bold text-brand-dark mt-1">
                  {stats.totalListings}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                <Car className="w-6 h-6 text-brand-gold" />
              </div>
            </div>
            <p className="text-brand-mid-grey text-xs mt-3">
              {stats.publishedListings} published
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-brand-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-mid-grey text-sm font-medium">Total Enquiries</p>
                <p className="font-display text-3xl font-bold text-brand-dark mt-1">
                  {stats.totalEnquiries}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <p className="text-red-500 text-xs mt-3 font-medium">
              {stats.unreadEnquiries} unread
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-brand-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-mid-grey text-sm font-medium">Inventory Value</p>
                <p className="font-display text-2xl font-bold text-brand-dark mt-1">
                  {formatPrice(stats.totalValue)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-brand-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-mid-grey text-sm font-medium">Published</p>
                <p className="font-display text-3xl font-bold text-brand-dark mt-1">
                  {Math.round((stats.publishedListings / (stats.totalListings || 1)) * 100)}%
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
        <Card className="bg-white border-brand-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-brand-dark flex items-center gap-2">
              <Mail className="w-5 h-5 text-brand-gold" />
              Recent Enquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentEnquiries.length === 0 ? (
              <p className="text-brand-mid-grey text-center py-8">No enquiries yet</p>
            ) : (
              <div className="space-y-3">
                {recentEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="bg-brand-surface rounded-lg p-4 border border-brand-border"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-brand-dark font-medium">{enquiry.name}</p>
                        <p className="text-brand-mid-grey text-sm">{enquiry.email}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          enquiry.status === 'Unread'
                            ? 'bg-red-100 text-red-600'
                            : enquiry.status === 'Read'
                            ? 'bg-blue-100 text-blue-600'
                            : enquiry.status === 'Followed Up'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-600'
                        }`}
                      >
                        {enquiry.status}
                      </span>
                    </div>
                    <p className="text-brand-mid-grey text-sm mt-2 line-clamp-2">
                      {enquiry.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Listings */}
        <Card className="bg-white border-brand-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-brand-dark flex items-center gap-2">
              <Car className="w-5 h-5 text-brand-gold" />
              Recent Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentListings.length === 0 ? (
              <p className="text-brand-mid-grey text-center py-8">No listings yet</p>
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
                      <p className="text-brand-dark font-medium truncate">{listing.name}</p>
                      <p className="text-brand-gold text-sm font-semibold">{formatPrice(listing.price)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          listing.published
                            ? 'bg-green-100 text-green-600'
                            : 'bg-brand-border text-brand-mid-grey'
                        }`}
                      >
                        {listing.published ? 'Published' : 'Draft'}
                      </span>
                      {listing.featured && (
                        <span className="text-xs text-brand-gold font-medium">Featured</span>
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
