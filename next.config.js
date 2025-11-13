/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js configuration for Vercel deployment

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
}

module.exports = nextConfig
