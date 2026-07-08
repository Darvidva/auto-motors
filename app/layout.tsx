import './globals.css';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: 'DX STAR EMPORIUM | Premium Vehicles & Machinery in Nigeria',
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'DX STAR EMPORIUM - Quality vehicles and heavy machinery dealership in Nigeria. Cars, trucks, tractors, excavators, and industrial equipment. Best prices in Lagos.',
  applicationName: siteConfig.name,
  keywords: [
    'vehicles in Nigeria',
    'cars for sale in Lagos',
    'trucks for sale in Nigeria',
    'tractors in Nigeria',
    'excavators in Lagos',
    'heavy machinery dealer',
    'industrial equipment Nigeria',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: 'DX STAR EMPORIUM | Premium Vehicles & Machinery in Nigeria',
    description:
      'DX STAR EMPORIUM - Quality vehicles and heavy machinery dealership in Nigeria. Cars, trucks, tractors, excavators, and industrial equipment. Best prices in Lagos.',
    locale: siteConfig.locale,
    images: [
      {
        url: absoluteUrl('/images/og-image.jpg'),
        width: 1200,
        height: 630,
        alt: 'DX STAR EMPORIUM vehicles and machinery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DX STAR EMPORIUM | Premium Vehicles & Machinery in Nigeria',
    description:
      'DX STAR EMPORIUM - Quality vehicles and heavy machinery dealership in Nigeria. Cars, trucks, tractors, excavators, and industrial equipment. Best prices in Lagos.',
    images: [absoluteUrl('/images/og-image.jpg')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'Automotive',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
