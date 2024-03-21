/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  modularizeImports: {
    '@phosphor-icons/react': {
      transform: '@phosphor-icons/react/{{member}}',
    },
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
}

export default nextConfig
