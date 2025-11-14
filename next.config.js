/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js configuration for Vercel and Cloudflare Pages deployment

  // Output configuration for Cloudflare Pages
  output: process.env.CF_PAGES ? 'export' : undefined,

  // Image optimization
  images: {
    unoptimized: process.env.CF_PAGES === '1',
  },

  // Exclude inner-animals-ai-dashboard and apps directories from compilation
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/inner-animals-ai-dashboard/**', '**/apps/**', '**/node_modules/**']
    }
    return config
  },

  // TypeScript configuration
  typescript: {
    // Ignore type errors in excluded directories during build
    ignoreBuildErrors: false,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || '',
    NEXT_PUBLIC_WORKER_URL: process.env.NEXT_PUBLIC_WORKER_URL || '',
  },
}

module.exports = nextConfig
