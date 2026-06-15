'use client';

import { Search, Phone, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Browse Our Inventory',
    description: 'Explore our curated selection of vehicles and machinery.',
  },
  {
    number: '02',
    icon: Phone,
    title: 'Contact Us',
    description: 'Call, WhatsApp, or email — we respond within 24 hours.',
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Inspect & Close',
    description: 'Visit us, inspect the product, and close the deal.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-bg py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-off-white mb-4">
            How It Works
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto" />
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-brand-border border-dashed" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center">
                {/* Step Card */}
                <Card className="bg-brand-card border-brand-border p-6 lg:p-8 text-center relative z-10 w-full">
                  {/* Step Number */}
                  <span className="font-accent text-5xl font-bold text-brand-gold/20 absolute top-4 left-4">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-brand-surface flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-brand-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold text-brand-off-white mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-brand-warm-grey leading-relaxed">
                    {step.description}
                  </p>
                </Card>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex md:hidden justify-center my-4 text-brand-gold">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
