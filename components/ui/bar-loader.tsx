'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BarLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Override bar color — pass a Tailwind bg class like 'bg-brand-gold' */
  color?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export function BarLoader({
  className,
  color = 'bg-brand-gold',
  size = 'md',
  ...props
}: BarLoaderProps) {
  const sizeMap = {
    sm: { bar: 'w-1 h-5', gap: 'gap-0.5' },
    md: { bar: 'w-1.5 h-8', gap: 'gap-1' },
    lg: { bar: 'w-2 h-12', gap: 'gap-1.5' },
  };
  const { bar, gap } = sizeMap[size];

  return (
    <div
      className={cn('flex items-center justify-center', gap, className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(bar, color, 'rounded-full animate-bar-pulse')}
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
