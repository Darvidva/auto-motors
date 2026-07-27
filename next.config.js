/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wmtrwipcgaalnztmmssw.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'wmtrwipcgaalnztmmssw.storage.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  serverExternalPackages: ['@prisma/client', 'prisma', 'pg'],
}

module.exports = nextConfig;