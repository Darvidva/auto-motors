import type { MetadataRoute } from 'next';
import { getListings } from '@/lib/queries';
import { absoluteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: absoluteUrl('/'),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: absoluteUrl('/about'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: absoluteUrl('/inventory'),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: absoluteUrl('/contact'),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    const listings = await getListings();

    const listingRoutes: MetadataRoute.Sitemap = listings.map((listing: any) => ({
        url: absoluteUrl(`/inventory/${listing.slug}`),
        lastModified: listing.updatedAt ? new Date(listing.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [...staticRoutes, ...listingRoutes];
}