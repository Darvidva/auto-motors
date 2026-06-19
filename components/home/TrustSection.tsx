'use client';

import { ShieldCheck, Eye, Globe, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { trustPoints } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Eye,
  Globe,
  Phone,
};

export default function TrustSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
            Why Choose Us
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustPoints.map((point) => {
            const Icon = iconMap[point.icon] || ShieldCheck;
            return (
              <Card
                key={point.id}
                className="bg-brand-card border-brand-border p-6 lg:p-8 flex flex-col items-center text-center group hover:border-brand-gold hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-brand-surface flex items-center justify-center mb-4 group-hover:bg-brand-gold/10 transition-colors duration-200">
                  <Icon className="w-7 h-7 text-brand-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-dark mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-brand-mid-grey leading-relaxed">
                  {point.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
