/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  serverExternalPackages: ['@prisma/client', 'prisma', 'pg'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client', 'pg')
    }
    return config
  }
}

module.exports = nextConfig;