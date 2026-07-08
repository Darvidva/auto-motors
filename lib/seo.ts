import type { Metadata } from 'next';

const fallbackSiteUrl = 'https://dxstaremporium.com';

export const siteConfig = {
    name: 'DX STAR EMPORIUM',
    shortName: 'DX STAR EMPORIUM',
    description:
        'DX STAR EMPORIUM offers quality vehicles, trucks, tractors, excavators, heavy machinery, and equipment in Nigeria.',
    siteUrl:
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || fallbackSiteUrl,
    locale: 'en_NG',
    phone: '+234 803 456 7890',
};

export function absoluteUrl(path = '/') {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${siteConfig.siteUrl}${normalizedPath}`;
}

export function createPageMetadata({
    title,
    description,
    path = '/',
    image = '/images/og-image.jpg',
    keywords = [],
}: {
    title: string;
    description: string;
    path?: string;
    image?: string;
    keywords?: string[];
}): Metadata {
    const url = absoluteUrl(path);
    const fullTitle = `${title} | ${siteConfig.name}`;
    const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);

    return {
        title: fullTitle,
        description,
        keywords,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: fullTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [imageUrl],
        },
    };
}