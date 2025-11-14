# Cloudflare Configuration

This directory contains Cloudflare-specific configuration files for the Leadership Legacy project.

## Files

### `pages.json`
Configuration for Cloudflare Pages deployment including:
- Build settings
- Environment variables
- Bindings to D1, R2, and KV

## Environment Variables

### Build-time Variables
- `CF_PAGES=1`: Enable Cloudflare Pages mode
- `NODE_VERSION=18`: Node.js version for builds
- `NPM_VERSION=9`: NPM version for builds

### Runtime Variables
- `NEXT_PUBLIC_API_BASE`: Worker API endpoint URL
- `NEXT_PUBLIC_WORKER_URL`: Worker base URL
- `NODE_ENV`: Environment (production/development)

## Bindings

### D1 Database: `LEADERSHIP_DB`
- Database: `leadership-legacy-db`
- Purpose: Cache, feature flags, analytics

### R2 Bucket: `LEADERSHIP_ASSETS`
- Bucket: `leadership-legacy-assets`
- Purpose: Brand assets, images, files

### KV Namespace: `LEADERSHIP_CONFIG`
- Purpose: API keys, configuration, feature toggles

## Deployment

See the root `CLOUDFLARE_DEPLOYMENT.md` for detailed deployment instructions.
