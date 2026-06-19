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
  businessInfo?: any;
}

export default function SpecsAccordion({ listing, businessInfo }: SpecsAccordionProps) {
  const address = businessInfo?.address || '15 Adeniran Ogunsanya Street, Surulere, Lagos, Nigeria';
  const hours = businessInfo?.hours || [];
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
              <div className="flex justify-between py-3 px-4 bg-white">
                <span className="text-brand-mid-grey">Exterior Color</span>
                <span className="text-brand-dark font-medium">{listing.color}</span>
              </div>
              {listing.interiorColor && (
                <div className="flex justify-between py-3 px-4 bg-brand-surface">
                  <span className="text-brand-mid-grey">Interior Color</span>
                  <span className="text-brand-dark font-medium">{listing.interiorColor}</span>
                </div>
              )}
              {listing.bodyType && (
                <div className="flex justify-between py-3 px-4 bg-white">
                  <span className="text-brand-mid-grey">Body Type</span>
                  <span className="text-brand-dark font-medium">{listing.bodyType}</span>
                </div>
              )}
              {listing.engineCapacity && (
                <div className="flex justify-between py-3 px-4 bg-brand-surface">
                  <span className="text-brand-mid-grey">Engine Capacity</span>
                  <span className="text-brand-dark font-medium">{listing.engineCapacity}</span>
                </div>
              )}
              {listing.vin && (
                <div className="flex justify-between py-3 px-4 bg-white">
                  <span className="text-brand-mid-grey">VIN</span>
                  <span className="text-brand-dark font-medium font-mono text-sm">{listing.vin}</span>
                </div>
              )}
            {Object.entries(listing.specifications).map(([key, value], index) => (
              <div
                key={key}
                className={`flex justify-between py-3 px-4 ${
                  index % 2 === 1 ? 'bg-white' : 'bg-brand-surface'
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
            <div className="flex justify-between border-b border-brand-border pb-3">
              <span className="text-brand-mid-grey">Condition</span>
              <Badge variant={listing.condition === 'New' ? 'default' : 'secondary'}>
                {listing.condition}
              </Badge>
            </div>
            {listing.serviceHistory && (
              <div className="flex justify-between border-b border-brand-border pb-3">
                <span className="text-brand-mid-grey">Service History</span>
                <span className="text-brand-dark font-medium">{listing.serviceHistory}</span>
              </div>
            )}
            {listing.numberOfKeys != null && (
              <div className="flex justify-between border-b border-brand-border pb-3">
                <span className="text-brand-mid-grey">Keys Included</span>
                <span className="text-brand-dark">{listing.numberOfKeys}</span>
              </div>
            )}
            {listing.mileage !== null && listing.mileage !== undefined && (
              <div className="flex justify-between">
                <span className="text-brand-mid-grey">Mileage</span>
                <span className="text-brand-dark">{Number(listing.mileage).toLocaleString()} km</span>
              </div>
            )}
            {listing.hoursUsed !== null && listing.hoursUsed !== undefined && (
              <div className="flex justify-between">
                <span className="text-brand-mid-grey">Operating Hours</span>
                <span className="text-brand-dark">{Number(listing.hoursUsed).toLocaleString()} hrs</span>
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
              <p className="text-brand-dark">{address}</p>
            </div>
            {hours.length > 0 && (
            <div>
              <p className="text-brand-mid-grey text-sm mb-1">Hours</p>
              <p className="text-brand-dark">
                {hours.find((h: any) => !h.closed)?.open} - {hours.find((h: any) => !h.closed)?.close} (Contact for details)
              </p>
            </div>
            )}
            <div className="aspect-video rounded-lg overflow-hidden bg-brand-surface relative border border-brand-border">
              <iframe
                title="Dealership Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              />
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
