'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { stats } from '@/lib/placeholder-data';

// Animated Number component
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
    <span ref={ref} className="font-accent text-2xl sm:text-3xl font-bold text-brand-off-white">
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export default function HeroSection() {
  // TODO: Connect to backend API — GET /api/hero-content
  const heroStats = stats;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Premium vehicles and machinery"
          fill
          className="object-cover animate-ken-burns"
          priority
          sizes="100vw"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-transparent" />
      </div>

      {/* Spotlight Effect */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          {/* Pre-title */}
          <p className="text-brand-gold text-xs tracking-[0.25em] uppercase mb-4 opacity-0 animate-fade-up">
            DX STAR EMPORIUM — Premium Vehicles & Machinery
          </p>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-brand-off-white leading-tight mb-6 opacity-0 animate-fade-up animation-delay-100">
            Built for Work.
            <br />
            <span className="text-brand-gold">Built to Last.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-brand-warm-grey leading-relaxed mb-8 max-w-lg opacity-0 animate-fade-up animation-delay-200">
            Quality cars, trucks, tractors, and heavy machinery in Nigeria. Every product
            verified. Transparent pricing. Direct contact only.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 opacity-0 animate-fade-up animation-delay-300">
            <Button
              asChild
              className="btn-gold px-8 py-6 text-base relative overflow-hidden shimmer-effect"
            >
              <Link href="/inventory">
                Browse Inventory
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-brand-off-white hover:text-brand-gold hover:bg-transparent group"
            >
              <Link href="/about">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 opacity-0 animate-fade-up animation-delay-300">
            {heroStats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-3">
                {index > 0 && (
                  <Separator
                    orientation="vertical"
                    className="h-10 w-px bg-brand-border hidden sm:block"
                  />
                )}
                <div className="text-center sm:text-left">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  <p className="text-xs text-brand-warm-grey uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-brand-warm-grey">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-gold/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
