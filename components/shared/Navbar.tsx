'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Inventory', href: '/inventory' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-bg/85 backdrop-blur-md border-b border-brand-border'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center">
              {/* DX Logo Mark */}
              <div className="flex items-center gap-0.5">
                <span className="font-display text-2xl font-bold text-brand-gold tracking-tight">
                  DX
                </span>
                <div className="w-1.5 h-6 bg-brand-gold/30 mx-1" />
                <span className="font-display text-2xl font-bold text-brand-off-white tracking-tight">
                  STAR
                </span>
              </div>
              {/* Subtle star accent */}
              <svg
                className="absolute -top-1 -right-3 w-3 h-3 text-brand-gold opacity-60"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="12,2 15,10 24,10 17,15 19,24 12,19 5,24 7,15 0,10 9,10" />
              </svg>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-200',
                  isActive(link.href)
                    ? 'text-brand-gold'
                    : 'text-brand-off-white hover:text-brand-gold'
                )}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gold" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-bg rounded-md"
            >
              <Link href="/contact">
                <Phone className="w-4 h-4 mr-2" />
                Enquire Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-brand-off-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-brand-bg border-brand-border w-full sm:max-w-md"
            >
              <SheetHeader>
                <SheetTitle className="text-brand-off-white text-left">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full pt-8">
                {/* Mobile Logo */}
                <div className="flex items-center gap-1 mb-8">
                  <span className="font-display text-2xl font-bold text-brand-gold">DX</span>
                  <div className="w-1 h-6 bg-brand-gold/30" />
                  <span className="font-display text-2xl font-bold text-brand-off-white">STAR</span>
                </div>
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'text-2xl font-display py-4 transition-colors duration-200 opacity-0 animate-fade-up',
                        isActive(link.href)
                          ? 'text-brand-gold'
                          : 'text-brand-off-white hover:text-brand-gold'
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto pb-8">
                  <Button
                    asChild
                    className="w-full bg-brand-gold text-brand-bg hover:bg-brand-gold-light rounded-md"
                  >
                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                      <Phone className="w-4 h-4 mr-2" />
                      Enquire Now
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
