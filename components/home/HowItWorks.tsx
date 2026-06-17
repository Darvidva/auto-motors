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
    <section className="bg-brand-surface py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
            How It Works
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto" />
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-brand-border-dark border-dashed" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center">
                <Card className="bg-white border-brand-border p-6 lg:p-8 text-center relative z-10 w-full shadow-sm hover:shadow-md transition-shadow duration-200">
                  <span className="font-accent text-5xl font-bold text-brand-gold/15 absolute top-4 left-4">
                    {step.number}
                  </span>

                  <div className="w-14 h-14 rounded-full bg-brand-surface flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-brand-gold" />
                  </div>

                  <h3 className="font-display text-xl font-semibold text-brand-dark mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-brand-mid-grey leading-relaxed">
                    {step.description}
                  </p>
                </Card>

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
