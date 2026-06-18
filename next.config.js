/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  serverExternalPackages: ['@prisma/client', 'prisma'],
  experimental: {
    turbopack: false
  }
}

module.exports = nextConfig;