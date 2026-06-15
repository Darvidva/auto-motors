'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Background Beams Effect Component
function BackgroundBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand-gold/20 to-transparent" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-brand-gold/20 to-transparent" />
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
    </div>
  );
}

export default function CTABanner() {
  // TODO: Connect to backend API — GET /api/cta-content

  return (
    <section className="relative bg-brand-bg py-20 sm:py-28 overflow-hidden">
      {/* Background Beams */}
      <BackgroundBeams />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-off-white mb-6 max-w-2xl mx-auto">
          Ready to Find What You Need?
        </h2>
        <p className="text-brand-warm-grey text-base sm:text-lg mb-8 max-w-lg mx-auto">
          Browse our complete inventory of premium vehicles and machinery.
        </p>
        <Button
          asChild
          className="btn-gold px-10 py-7 text-base relative overflow-hidden shimmer-effect rounded-md"
        >
          <Link href="/inventory">
            Browse All Listings
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
