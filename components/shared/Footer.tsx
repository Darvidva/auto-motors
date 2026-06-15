import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { businessInfo } from '@/lib/placeholder-data';

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Inventory', href: '/inventory' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const categoryLinks = [
  { name: 'Cars', href: '/inventory?category=cars' },
  { name: 'Trucks', href: '/inventory?category=trucks' },
  { name: 'Tractors', href: '/inventory?category=tractors' },
  { name: 'Heavy Machinery', href: '/inventory?category=heavy-machinery' },
];

export default function Footer() {
  // TODO: Connect to backend API — GET /api/business-info
  const info = businessInfo;

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return Facebook;
      case 'instagram':
        return Instagram;
      case 'linkedin':
        return Linkedin;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-brand-bg border-t border-brand-gold/30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className="font-display text-xl font-bold text-brand-gold">DX</span>
              <div className="w-1 h-5 bg-brand-gold/30" />
              <span className="font-display text-xl font-bold text-brand-off-white">STAR</span>
              <span className="font-display text-xl font-bold text-brand-warm-grey ml-1">EMPORIUM</span>
            </div>
            <p className="text-sm text-brand-warm-grey leading-relaxed max-w-xs">
              Premium vehicles and heavy machinery. Cars, trucks, tractors,
              excavators, and industrial equipment at competitive prices.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-display text-lg text-brand-off-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-warm-grey hover:text-brand-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="font-display text-lg text-brand-off-white mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-warm-grey hover:text-brand-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-display text-lg text-brand-off-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${info.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-brand-warm-grey hover:text-brand-gold transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-brand-gold" />
                  {info.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${info.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-brand-warm-grey hover:text-brand-gold transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 text-brand-gold"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${info.email}`}
                  className="flex items-center gap-2 text-sm text-brand-warm-grey hover:text-brand-gold transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 text-brand-gold" />
                  {info.email}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-brand-warm-grey">
                  <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  {info.address}
                </span>
              </li>
            </ul>
            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              {info.socialMedia.map((social) => {
                const Icon = getSocialIcon(social.platform);
                if (!Icon) return null;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded bg-brand-surface flex items-center justify-center text-brand-warm-grey hover:text-brand-gold hover:bg-brand-gold/10 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-brand-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-brand-warm-grey">
              &copy; {new Date().getFullYear()} DX STAR EMPORIUM. All rights reserved.
            </p>
            <Link
              href="/privacy"
              className="text-xs text-brand-warm-grey hover:text-brand-gold transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
