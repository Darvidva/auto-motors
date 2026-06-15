import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Barlow_Condensed } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'DX STAR EMPORIUM | Premium Vehicles & Machinery in Nigeria',
  description: 'DX STAR EMPORIUM - Quality vehicles and heavy machinery dealership in Nigeria. Cars, trucks, tractors, excavators, and industrial equipment. Best prices in Lagos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} ${barlow.variable}`}>
        {children}
      </body>
    </html>
  );
}
