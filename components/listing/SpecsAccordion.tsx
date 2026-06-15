'use client';

import { Listing } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface SpecsAccordionProps {
  listing: Listing;
}

export default function SpecsAccordion({ listing }: SpecsAccordionProps) {
  return (
    <Accordion type="multiple" defaultValue={['overview', 'specifications']} className="w-full">
      {/* Overview */}
      <AccordionItem value="overview">
        <AccordionTrigger className="text-lg font-display font-semibold">
          Overview
        </AccordionTrigger>
        <AccordionContent className="text-base leading-relaxed">
          {listing.description}
        </AccordionContent>
      </AccordionItem>

      {/* Specifications */}
      <AccordionItem value="specifications">
        <AccordionTrigger className="text-lg font-display font-semibold">
          Specifications
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {Object.entries(listing.specifications).map(([key, value], index) => (
              <div
                key={key}
                className={`flex justify-between py-3 px-4 ${
                  index % 2 === 0 ? 'bg-brand-card' : 'bg-brand-surface'
                }`}
              >
                <span className="text-brand-warm-grey">{key}</span>
                <span className="text-brand-off-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Condition & History */}
      <AccordionItem value="condition">
        <AccordionTrigger className="text-lg font-display font-semibold">
          Condition & History
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-brand-warm-grey">Condition</span>
              <Badge variant={listing.condition === 'New' ? 'default' : 'secondary'}>
                {listing.condition}
              </Badge>
            </div>
            {listing.mileage !== undefined && (
              <div className="flex justify-between">
                <span className="text-brand-warm-grey">Mileage</span>
                <span className="text-brand-off-white">{listing.mileage.toLocaleString()} km</span>
              </div>
            )}
            {listing.hoursUsed !== undefined && (
              <div className="flex justify-between">
                <span className="text-brand-warm-grey">Operating Hours</span>
                <span className="text-brand-off-white">{listing.hoursUsed.toLocaleString()} hrs</span>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Features & Extras */}
      {listing.features.length > 0 && (
        <AccordionItem value="features">
          <AccordionTrigger className="text-lg font-display font-semibold">
            Features & Extras
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {listing.features.map((feature) => (
                <Badge
                  key={feature}
                  variant="gold"
                  className="px-3 py-1"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Location & Viewing */}
      <AccordionItem value="location">
        <AccordionTrigger className="text-lg font-display font-semibold">
          Location & Viewing
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <p className="text-brand-warm-grey text-sm mb-1">Address</p>
              <p className="text-brand-off-white">1234 Industrial Way, Commerce City, CA 90210</p>
            </div>
            <div>
              <p className="text-brand-warm-grey text-sm mb-1">Hours</p>
              <p className="text-brand-off-white">Mon-Fri 9:00 AM - 6:00 PM, Sat 10:00 AM - 4:00 PM</p>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-brand-surface relative">
              {/* Placeholder for Google Maps embed */}
              <div className="absolute inset-0 flex items-center justify-center text-brand-warm-grey">
                <p>Google Maps embed will be displayed here</p>
              </div>
            </div>
            <p className="text-brand-warm-grey text-sm">
              Appointment recommended. Contact us to schedule a viewing.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
