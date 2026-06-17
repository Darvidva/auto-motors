'use client';

import { Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { businessInfo } from '@/lib/placeholder-data';

interface ContactBlockProps {
  listingName: string;
  listingId: string;
}

export default function ContactBlock({ listingName }: ContactBlockProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${listingName} listed on your website.`
  );

  return (
    <div className="bg-brand-surface border border-brand-gold/40 rounded-xl p-6">
      <h3 className="font-display text-xl text-brand-dark mb-2">
        Interested in this listing?
      </h3>
      <p className="text-brand-mid-grey text-sm mb-6">
        Get in touch through your preferred method. We respond within 24 hours.
      </p>

      {/* Contact Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Call Button */}
        <Button
          asChild
          className="flex-1 bg-brand-gold text-white hover:bg-brand-gold-dark rounded-md h-12"
        >
          <a href={`tel:${businessInfo.phone.replace(/\s/g, '')}`}>
            <Phone className="w-5 h-5 mr-2" />
            Call Us
          </a>
        </Button>

        {/* WhatsApp Button */}
        <Button
          asChild
          variant="outline"
          className="flex-1 bg-transparent border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white rounded-md h-12"
        >
          <a
            href={`https://wa.me/${businessInfo.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </a>
        </Button>
      </div>

      {/* Contact Details */}
      <div className="space-y-3 pt-4 border-t border-brand-border">
        <a
          href={`tel:${businessInfo.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-2 text-sm text-brand-mid-grey hover:text-brand-gold transition-colors"
        >
          <Phone className="w-4 h-4 text-brand-gold" />
          {businessInfo.phone}
        </a>
        <a
          href={`mailto:${businessInfo.email}`}
          className="flex items-center gap-2 text-sm text-brand-mid-grey hover:text-brand-gold transition-colors"
        >
          <Mail className="w-4 h-4 text-brand-gold" />
          {businessInfo.email}
        </a>
      </div>
    </div>
  );
}
