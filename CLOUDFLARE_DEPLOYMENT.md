# 🚀 Cloudflare Deployment Guide - Leadership Legacy

Complete guide for deploying the Leadership Legacy application to Cloudflare's infrastructure.

## 📋 Overview

**Application**: Leadership Legacy
**Framework**: Next.js 14 + React 18.3
**Target Platform**: Cloudflare Pages + Workers
**Storage**: D1 Database, R2 Bucket, KV Namespace

---

## 🏗️ Infrastructure Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Cloudflare Edge Network                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐      ┌──────────────┐                │
│  │   Pages      │      │   Worker     │                │
│  │  (Next.js)   │─────▶│  (API Proxy) │                │
│  └──────────────┘      └──────┬───────┘                │
│                               │                          │
│         ┌─────────────────────┼──────────────────┐     │
│         │                     │                  │     │
│    ┌────▼─────┐         ┌────▼────┐      ┌─────▼────┐│
│    │ D1 DB    │         │ R2      │      │ KV       ││
│    │ (Cache)  │         │ (Assets)│      │ (Config) ││
│    └──────────┘         └─────────┘      └──────────┘│
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Components

1. **Cloudflare Pages**: Hosts the Next.js frontend (static export)
2. **Cloudflare Workers**: API proxy for GitHub, caching, asset delivery
3. **D1 Database**: SQLite-based database for caching and metadata
4. **R2 Bucket**: Object storage for brand assets and media
5. **KV Namespace**: Key-value store for configuration and feature flags

---

## 🔧 Prerequisites

### Required Tools

```bash
# Node.js 18+
node --version  # Should be 18.x or higher

# NPM
npm --version

# Wrangler CLI (Cloudflare's CLI)
npm install -g wrangler
wrangler --version
```

### Cloudflare Account

1. **Sign up** at [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Get Account ID**: Dashboard → Click on any zone → Copy Account ID from right sidebar
3. **Create API Token**:
   - Go to: https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use "Edit Cloudflare Workers" template
   - Add permissions: Workers, Pages, D1, R2, KV
   - Copy the token (save it securely!)

---

## 🚀 Deployment Steps

### Step 1: Authenticate with Cloudflare

**Option A: Interactive Login (Recommended)**
```bash
wrangler login
```
This opens a browser for OAuth authentication.

**Option B: API Token**
```bash
export CLOUDFLARE_API_TOKEN="your-api-token-here"
# Or add to ~/.bashrc or ~/.zshrc
```

**Verify Authentication**
```bash
wrangler whoami
```

### Step 2: Configure Account ID

Edit `wrangler.toml` and add your account ID:

```toml
account_id = "your-account-id-here"
```

### Step 3: Create D1 Database

```bash
# Create the database
wrangler d1 create leadership-legacy-db

# Output will show:
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# Copy the database_id and update wrangler.toml
# Replace: database_id = "UPDATE_AFTER_CREATION"
# With: database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### Step 4: Initialize Database Schema

```bash
# Run the schema migration
wrangler d1 execute leadership-legacy-db --file=./cloudflare-schema.sql

# Verify the tables were created
wrangler d1 execute leadership-legacy-db --command="SELECT name FROM sqlite_master WHERE type='table'"
```

### Step 5: Create R2 Bucket

```bash
# Create the bucket
wrangler r2 bucket create leadership-legacy-assets

# Verify creation
wrangler r2 bucket list
```

### Step 6: Create KV Namespace

```bash
# Create the namespace
wrangler kv:namespace create "LEADERSHIP_CONFIG"

# Output will show:
# id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Copy the id and update wrangler.toml
# Replace: id = "UPDATE_AFTER_CREATION"
# With: id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### Step 7: Configure KV Values

```bash
# Get your KV namespace ID from wrangler.toml
KV_ID="your-kv-namespace-id"

# Set API version
wrangler kv:key put --namespace-id="$KV_ID" "API_VERSION" "1.0.0"

# Set environment
wrangler kv:key put --namespace-id="$KV_ID" "ENVIRONMENT" "production"

# Set feature flags
wrangler kv:key put --namespace-id="$KV_ID" "feature_flags" '{
  "brand_lab": true,
  "analytics": true,
  "dashboard": true,
  "portfolio": true,
  "coaching": true,
  "community": true
}'

# If you have a GitHub token (optional, for higher API limits)
wrangler kv:key put --namespace-id="$KV_ID" "GITHUB_TOKEN" "your-github-personal-access-token"
```

### Step 8: Deploy the Worker

```bash
# Deploy the worker
wrangler deploy

# Note the worker URL from output:
# Published leadership-legacy-worker (X.XX sec)
#   https://leadership-legacy-worker.YOUR_SUBDOMAIN.workers.dev
```

### Step 9: Build Next.js Application

```bash
# Build for Cloudflare Pages (static export)
export CF_PAGES=1
npm run build

# This creates an 'out' directory with static files
```

### Step 10: Deploy to Cloudflare Pages

**Option A: Using Wrangler CLI**
```bash
# Deploy directly
wrangler pages deploy out --project-name=leadership-legacy

# Or create the project first
wrangler pages project create leadership-legacy
wrangler pages deploy out --project-name=leadership-legacy
```

**Option B: Using Cloudflare Dashboard**
1. Go to: https://dash.cloudflare.com
2. Click "Pages" in the left sidebar
3. Click "Create a project"
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variables:
     - `CF_PAGES=1`
     - `NODE_VERSION=18`

---

## 🔍 Verification & Testing

### Test Worker Endpoints

```bash
# Health check
curl https://leadership-legacy-worker.YOUR_SUBDOMAIN.workers.dev/api/health

# Feature flags
curl https://leadership-legacy-worker.YOUR_SUBDOMAIN.workers.dev/api/features

# Configuration
curl https://leadership-legacy-worker.YOUR_SUBDOMAIN.workers.dev/api/config

# GitHub proxy (example)
curl https://leadership-legacy-worker.YOUR_SUBDOMAIN.workers.dev/api/github/users/InnerAnimal
```

### Verify D1 Database

```bash
# Check feature flags
wrangler d1 execute leadership-legacy-db --command="SELECT * FROM feature_flags"

# Check cache (should be empty initially)
wrangler d1 execute leadership-legacy-db --command="SELECT COUNT(*) as cache_count FROM github_cache"
```

### Verify R2 Bucket

```bash
# List buckets
wrangler r2 bucket list

# List objects (should be empty initially)
wrangler r2 object list leadership-legacy-assets
```

### Verify KV Namespace

```bash
# Get KV namespace ID
KV_ID=$(grep -A 2 "LEADERSHIP_CONFIG" wrangler.toml | grep "id" | cut -d'"' -f2)

# List all keys
wrangler kv:key list --namespace-id="$KV_ID"

# Get specific values
wrangler kv:key get --namespace-id="$KV_ID" "API_VERSION"
wrangler kv:key get --namespace-id="$KV_ID" "feature_flags"
```

### Test Pages Deployment

```bash
# List deployments
wrangler pages deployment list --project-name=leadership-legacy

# View logs
wrangler pages deployment tail --project-name=leadership-legacy
```

---

## 📊 Resource IDs Summary

After deployment, document your resource IDs:

```yaml
Cloudflare Account:
  Account ID: YOUR_ACCOUNT_ID

D1 Database:
  Name: leadership-legacy-db
  Database ID: YOUR_DATABASE_ID

R2 Bucket:
  Name: leadership-legacy-assets

KV Namespace:
  Binding: LEADERSHIP_CONFIG
  Namespace ID: YOUR_NAMESPACE_ID

Worker:
  Name: leadership-legacy-worker
  URL: https://leadership-legacy-worker.YOUR_SUBDOMAIN.workers.dev

Pages:
  Project: leadership-legacy
  Production URL: https://leadership-legacy.pages.dev
  Custom Domain: (configure in dashboard)
```

---

## 🔧 Configuration Checklist

- [ ] Cloudflare account created
- [ ] Wrangler CLI authenticated
- [ ] Account ID added to `wrangler.toml`
- [ ] D1 database created and ID updated in `wrangler.toml`
- [ ] Database schema migrated
- [ ] R2 bucket created
- [ ] KV namespace created and ID updated in `wrangler.toml`
- [ ] KV configuration values set
- [ ] Worker deployed successfully
- [ ] Worker URL tested and responding
- [ ] Next.js application built
- [ ] Application deployed to Cloudflare Pages
- [ ] Pages deployment tested and accessible
- [ ] Custom domain configured (optional)

---

## 🛠️ Troubleshooting

### Authentication Issues

**Problem**: `wrangler login` fails or hangs
```bash
# Use API token instead
export CLOUDFLARE_API_TOKEN="your-token"
wrangler whoami
```

### Build Failures

**Problem**: Next.js build fails with module errors
```bash
# Clear cache and rebuild
rm -rf .next out node_modules
npm install
npm run build
```

**Problem**: Image optimization errors
- Ensure `images.unoptimized = true` in `next.config.js`
- Cloudflare Pages doesn't support Next.js Image Optimization

### Worker Deployment Issues

**Problem**: Worker fails to deploy
```bash
# Check wrangler.toml syntax
wrangler deploy --dry-run

# View detailed error logs
wrangler deploy --verbose
```

### D1 Database Issues

**Problem**: Database queries fail
```bash
# Check if database exists
wrangler d1 list

# Verify tables
wrangler d1 execute leadership-legacy-db --command="SELECT name FROM sqlite_master WHERE type='table'"

# Re-run schema if needed
wrangler d1 execute leadership-legacy-db --file=./cloudflare-schema.sql
```

### Pages Deployment Issues

**Problem**: Pages deployment fails
```bash
# Check deployment logs
wrangler pages deployment tail --project-name=leadership-legacy

# Redeploy with verbose logging
wrangler pages deploy out --project-name=leadership-legacy --verbose
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Recommended)

Create `.github/workflows/deploy-cloudflare.yml`:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main, claude/deploy-map-cloudflare-*]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build application
        env:
          CF_PAGES: 1
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy out --project-name=leadership-legacy
```

Add secrets to GitHub:
1. Go to: Repository → Settings → Secrets and variables → Actions
2. Add `CLOUDFLARE_API_TOKEN`
3. Add `CLOUDFLARE_ACCOUNT_ID`

---

## 📈 Monitoring & Maintenance

### View Worker Logs

```bash
# Real-time logs
wrangler tail

# Filter by status
wrangler tail --status error
```

### View Analytics

```bash
# Worker analytics (via dashboard)
open https://dash.cloudflare.com → Workers & Pages → leadership-legacy-worker → Metrics

# Pages analytics
open https://dash.cloudflare.com → Pages → leadership-legacy → Analytics
```

### Database Maintenance

```bash
# Clear expired cache entries
wrangler d1 execute leadership-legacy-db --command="DELETE FROM github_cache WHERE expires_at < $(date +%s)000"

# View cache statistics
wrangler d1 execute leadership-legacy-db --command="SELECT COUNT(*) as total, MIN(expires_at) as oldest FROM github_cache"
```

### Update Configuration

```bash
# Update feature flags
wrangler kv:key put --namespace-id="$KV_ID" "feature_flags" '{"new_feature": true}'

# Update API version
wrangler kv:key put --namespace-id="$KV_ID" "API_VERSION" "1.1.0"
```

---

## 💰 Cost Considerations

### Free Tier Limits

- **Workers**: 100,000 requests/day
- **Pages**: Unlimited requests, 500 builds/month
- **D1**: 5 GB storage, 5 million reads/day
- **R2**: 10 GB storage, 1 million Class B operations/month
- **KV**: 100,000 reads/day, 1,000 writes/day

### Estimated Monthly Cost (Production)

Based on moderate traffic (10K visitors/month):
- Workers: $0 (within free tier)
- Pages: $0 (within free tier)
- D1: $0 (within free tier)
- R2: $0 (within free tier)
- KV: $0 (within free tier)

**Total**: $0/month for typical usage

---

## 🔐 Security Best Practices

1. **API Tokens**:
   - Use scoped tokens with minimal permissions
   - Rotate tokens regularly
   - Never commit tokens to git

2. **Environment Variables**:
   - Store sensitive values in KV (encrypted at rest)
   - Use GitHub Secrets for CI/CD

3. **CORS**:
   - Configure restrictive CORS in production
   - Update `worker.js` CORS headers for your domain

4. **Rate Limiting**:
   - Implement rate limiting in Worker
   - Use Cloudflare's built-in DDoS protection

---

## 📚 Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [D1 Database Documentation](https://developers.cloudflare.com/d1/)
- [R2 Storage Documentation](https://developers.cloudflare.com/r2/)
- [KV Documentation](https://developers.cloudflare.com/kv/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

---

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Cloudflare documentation
3. Check GitHub Issues
4. Contact the development team

---

**Last Updated**: 2024-11-14
**Version**: 1.0.0
**Maintained By**: Inner Animals Team
