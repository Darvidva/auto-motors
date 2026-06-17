'use client';

import { Listing } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface SpecsAccordionProps {
  listing: Listing;
}

export default function SpecsAccordion({ listing }: SpecsAccordionProps) {
  return (
    <Accordion type="multiple" defaultValue={['overview', 'specifications']} className="w-full">
      <AccordionItem value="overview">
        <AccordionTrigger className="text-lg font-display font-semibold text-brand-dark">
          Overview
        </AccordionTrigger>
        <AccordionContent className="text-base leading-relaxed text-brand-mid-grey">
          {listing.description}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="specifications">
        <AccordionTrigger className="text-lg font-display font-semibold text-brand-dark">
          Specifications
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 rounded-lg overflow-hidden border border-brand-border">
            {Object.entries(listing.specifications).map(([key, value], index) => (
              <div
                key={key}
                className={`flex justify-between py-3 px-4 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-brand-surface'
                }`}
              >
                <span className="text-brand-mid-grey">{key}</span>
                <span className="text-brand-dark font-medium">{value}</span>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="condition">
        <AccordionTrigger className="text-lg font-display font-semibold text-brand-dark">
          Condition & History
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-brand-mid-grey">Condition</span>
              <Badge variant={listing.condition === 'New' ? 'default' : 'secondary'}>
                {listing.condition}
              </Badge>
            </div>
            {listing.mileage !== undefined && (
              <div className="flex justify-between">
                <span className="text-brand-mid-grey">Mileage</span>
                <span className="text-brand-dark">{listing.mileage.toLocaleString()} km</span>
              </div>
            )}
            {listing.hoursUsed !== undefined && (
              <div className="flex justify-between">
                <span className="text-brand-mid-grey">Operating Hours</span>
                <span className="text-brand-dark">{listing.hoursUsed.toLocaleString()} hrs</span>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      {listing.features.length > 0 && (
        <AccordionItem value="features">
          <AccordionTrigger className="text-lg font-display font-semibold text-brand-dark">
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

      <AccordionItem value="location">
        <AccordionTrigger className="text-lg font-display font-semibold text-brand-dark">
          Location & Viewing
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <p className="text-brand-mid-grey text-sm mb-1">Address</p>
              <p className="text-brand-dark">1234 Industrial Way, Commerce City, CA 90210</p>
            </div>
            <div>
              <p className="text-brand-mid-grey text-sm mb-1">Hours</p>
              <p className="text-brand-dark">Mon-Fri 9:00 AM - 6:00 PM, Sat 10:00 AM - 4:00 PM</p>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-brand-surface relative">
              <div className="absolute inset-0 flex items-center justify-center text-brand-mid-grey">
                <p>Google Maps embed will be displayed here</p>
              </div>
            </div>
            <p className="text-brand-mid-grey text-sm">
              Appointment recommended. Contact us to schedule a viewing.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
