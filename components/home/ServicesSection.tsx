'use client';

import { Car, HardHat, Ship, Cog } from 'lucide-react';
import { Card } from '@/components/ui/card';

const services = [
  {
    icon: Car,
    title: 'Car Sales',
    description: 'High-quality everyday cars, SUVs, and commercial vehicles. Sourced from trusted manufacturers, thoroughly inspected, and certified for Nigerian roads.',
  },
  {
    icon: HardHat,
    title: 'Construction Machinery',
    description: 'Selling of premium construction machinery including excavators, tractors, loaders, bulldozers, and site equipment tailored for heavy-duty work.',
  },
  {
    icon: Ship,
    title: 'Shipping Services',
    description: 'Safe, reliable shipping and customs clearing logistics. Handling the safe transit and delivery of your vehicles and machines to any destination in Nigeria.',
  },
  {
    icon: Cog,
    title: 'Other Machines',
    description: 'Sourcing, sales, and supply of industrial, agricultural, and specialized machines to keep your business or project running efficiently.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-brand-surface py-16 sm:py-24 border-b border-brand-border">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-brand-gold text-xs tracking-[0.25em] uppercase mb-3 font-semibold">
            What We Do
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
            Our Core Services
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="bg-white border-brand-border p-6 lg:p-8 flex flex-col items-start group hover:border-brand-gold hover:shadow-lg transition-all duration-300 rounded-lg relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-surface flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6 text-brand-gold group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-brand-mid-grey leading-relaxed">
                  {service.description}
                </p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-all duration-500 pointer-events-none" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
