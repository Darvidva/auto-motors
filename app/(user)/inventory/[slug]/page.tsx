import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ListingDetailClient from './listing-client';
import { getListingBySlug, getRelatedListings, getBusinessSettings } from '@/lib/queries';
import { absoluteUrl } from '@/lib/seo';

interface ListingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    return {
      title: 'Listing Not Found | DX STAR EMPORIUM',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${listing.year} ${listing.brand} ${listing.model}`;
  const description = `${listing.name} available from DX STAR EMPORIUM. View specifications, pricing, features, and enquiry options in Nigeria.`;
  const image = Array.isArray(listing.images) && listing.images[0]
    ? String(listing.images[0])
    : '/images/og-image.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: `/inventory/${listing.slug}`,
    },
    openGraph: {
      title: `${title} | DX STAR EMPORIUM`,
      description,
      url: absoluteUrl(`/inventory/${listing.slug}`),
      type: 'website',
      images: [
        {
          url: image.startsWith('http') ? image : absoluteUrl(image),
          alt: listing.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | DX STAR EMPORIUM`,
      description,
      images: [image.startsWith('http') ? image : absoluteUrl(image)],
    },
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const [relatedListings, businessInfo] = await Promise.all([
    getRelatedListings(listing.id, listing.category),
    getBusinessSettings(),
  ]);

  return <ListingDetailClient listing={listing as any} relatedListings={relatedListings as any} businessInfo={businessInfo} />;
}
