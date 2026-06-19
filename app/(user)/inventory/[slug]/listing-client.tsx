'use client';

import ImageGallery from '@/components/listing/ImageGallery';
import InfoPanel from '@/components/listing/InfoPanel';
import ContactBlock from '@/components/listing/ContactBlock';
import SpecsAccordion from '@/components/listing/SpecsAccordion';
import RelatedListings from '@/components/listing/RelatedListings';
import { Listing } from '@/types';

interface ListingDetailClientProps {
  listing: Listing;
  relatedListings?: Listing[];
  businessInfo?: any;
}

export default function ListingDetailClient({ listing, relatedListings = [], businessInfo }: ListingDetailClientProps) {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Gallery */}
          <div className="order-1 lg:order-1">
            <ImageGallery images={listing.images} alt={listing.name} />
          </div>

          {/* Right - Info Panel */}
          <div className="order-2 lg:order-2 space-y-6">
            <InfoPanel listing={listing} />

            <ContactBlock
              listingName={listing.name}
              listingId={listing.id}
              businessInfo={businessInfo}
            />
          </div>
        </div>

        {/* Separator */}
        <div className="my-8 sm:my-12 border-t border-brand-border" />

        {/* Accordion Details */}
        <div className="max-w-4xl">
          <SpecsAccordion listing={listing} businessInfo={businessInfo} />
        </div>

        {/* Related Listings */}
        <RelatedListings
          relatedListings={relatedListings}
        />
      </div>
    </div>
  );
}
