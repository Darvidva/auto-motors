import './globals.css';
import type { Metadata } from 'next';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
