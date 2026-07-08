'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { stats } from '@/lib/constants';

import { useState, useEffect, useRef } from 'react';

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref} className="font-accent text-4xl sm:text-5xl font-bold text-brand-gold">
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export default function AboutPageClient({ heroImage, teamMembers }: { heroImage?: string; teamMembers?: any[] }) {
  const aboutStats = stats;
  const aboutTeam = teamMembers || [];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center">
        <Image
          src={heroImage || "/images/hero/about.jpg"}
          alt="About Us"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark mb-4">
            Our Story
          </h1>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto" />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-dark-grey text-lg leading-relaxed mb-6">
            DX STAR EMPORIUM started in Lagos with a clear focus: help customers find
            dependable vehicles and machinery without the usual guesswork. From private
            buyers to business owners, people come to us for stock they can inspect,
            ask questions about and buy with confidence.
          </p>
          <p className="text-brand-dark-grey text-lg leading-relaxed mb-6">
            We keep the process straightforward. Accurate listing details, honest
            conversations and practical support matter more than sales talk. When a
            customer is spending on a car, truck or machine, the information should be
            clear from the start.
          </p>
          <p className="text-brand-dark-grey text-lg leading-relaxed mb-12">
            That approach still shapes how we work today. Whether someone needs a
            family car, a work truck or equipment for a project site, we take time to
            understand the need and point them to the right options. Our Surulere
            showroom is where many of those conversations begin.
          </p>

          {/* Mission Quote */}
          <div className="bg-brand-surface border-l-4 border-brand-gold p-8 rounded-r-lg mb-16">
            <blockquote className="font-display text-2xl sm:text-3xl italic text-brand-dark leading-relaxed">
              &ldquo;We don&apos;t just sell machines. We help Nigerians build their
              lives, their businesses, and their futures.&rdquo;
            </blockquote>
            <p className="text-brand-gold mt-4 font-medium">
              Adewale Okonkwo, Founder
            </p>
          </div>
        </div>

        {/* Stats Section */}
        {aboutStats.length > 0 && (
          <div className="bg-brand-surface rounded-xl p-8 sm:p-12 mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
              {aboutStats.map((stat) => (
                <div key={stat.label}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  <p className="text-sm uppercase tracking-wider text-brand-mid-grey mt-2 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Section */}
        {aboutTeam.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-dark text-center mb-4">
              Meet the Team
            </h2>
            <div className="w-16 h-0.5 bg-brand-gold mx-auto mb-12" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutTeam.map((member) => (
                <Card
                  key={member.name}
                  className="bg-white border-brand-border p-6 group hover:border-brand-gold hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-brand-surface group-hover:ring-brand-gold/20 transition-all">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="128px"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-display text-xl font-semibold text-brand-dark mb-1">
                      {member.name}
                    </h3>
                    <p className="text-brand-gold text-sm mb-4 font-medium">{member.role}</p>
                    <p className="text-brand-mid-grey text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
