#!/bin/bash

# Cloudflare Deployment Script for Leadership Legacy
# This script sets up and deploys the application to Cloudflare infrastructure

set -e  # Exit on error

echo "🚀 Leadership Legacy - Cloudflare Deployment"
echo "============================================="
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Check authentication
echo "Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "❌ Not authenticated with Cloudflare."
    echo "Please run: wrangler login"
    echo "Or set CLOUDFLARE_API_TOKEN environment variable"
    exit 1
fi

echo "✅ Authenticated with Cloudflare"
echo ""

# Step 1: Create D1 Database (if not exists)
echo "📦 Step 1: Setting up D1 Database..."
DB_EXISTS=$(wrangler d1 list | grep -c "leadership-legacy-db" || true)
if [ "$DB_EXISTS" -eq 0 ]; then
    echo "Creating D1 database: leadership-legacy-db..."
    wrangler d1 create leadership-legacy-db
    echo "⚠️  Please update wrangler.toml with the database_id from above"
    read -p "Press enter after updating wrangler.toml..."
else
    echo "✅ D1 database already exists"
fi

# Execute schema migration
echo "Running D1 schema migration..."
wrangler d1 execute leadership-legacy-db --file=./cloudflare-schema.sql
echo "✅ Database schema applied"
echo ""

# Step 2: Create R2 Bucket (if not exists)
echo "📦 Step 2: Setting up R2 Bucket..."
BUCKET_EXISTS=$(wrangler r2 bucket list | grep -c "leadership-legacy-assets" || true)
if [ "$BUCKET_EXISTS" -eq 0 ]; then
    echo "Creating R2 bucket: leadership-legacy-assets..."
    wrangler r2 bucket create leadership-legacy-assets
    echo "✅ R2 bucket created"
else
    echo "✅ R2 bucket already exists"
fi
echo ""

# Step 3: Create KV Namespace (if not exists)
echo "📦 Step 3: Setting up KV Namespace..."
KV_EXISTS=$(wrangler kv:namespace list | grep -c "LEADERSHIP_CONFIG" || true)
if [ "$KV_EXISTS" -eq 0 ]; then
    echo "Creating KV namespace: LEADERSHIP_CONFIG..."
    wrangler kv:namespace create "LEADERSHIP_CONFIG"
    echo "⚠️  Please update wrangler.toml with the namespace id from above"
    read -p "Press enter after updating wrangler.toml..."
else
    echo "✅ KV namespace already exists"
fi
echo ""

# Step 4: Set KV Configuration
echo "📦 Step 4: Configuring KV values..."
echo "Setting default configuration..."

# Get KV namespace ID from wrangler.toml
KV_ID=$(grep -A 2 "LEADERSHIP_CONFIG" wrangler.toml | grep "id" | cut -d'"' -f2)

if [ "$KV_ID" != "UPDATE_AFTER_CREATION" ]; then
    # Set API version
    wrangler kv:key put --namespace-id="$KV_ID" "API_VERSION" "1.0.0" --preview=false

    # Set environment
    wrangler kv:key put --namespace-id="$KV_ID" "ENVIRONMENT" "production" --preview=false

    # Set feature flags
    wrangler kv:key put --namespace-id="$KV_ID" "feature_flags" '{"brand_lab":true,"analytics":true,"dashboard":true,"portfolio":true}' --preview=false

    echo "✅ KV configuration set"
else
    echo "⚠️  Skipping KV configuration - please update wrangler.toml first"
fi
echo ""

# Step 5: Deploy Worker
echo "📦 Step 5: Deploying Worker..."
wrangler deploy
echo "✅ Worker deployed"
echo ""

# Step 6: Build Next.js for Cloudflare Pages
echo "📦 Step 6: Building Next.js application..."
export CF_PAGES=1
npm run build
echo "✅ Next.js build complete"
echo ""

# Step 7: Deploy to Cloudflare Pages
echo "📦 Step 7: Deploying to Cloudflare Pages..."
wrangler pages deploy out --project-name=leadership-legacy
echo "✅ Deployed to Cloudflare Pages"
echo ""

echo "============================================="
echo "🎉 Deployment Complete!"
echo "============================================="
echo ""
echo "📋 Next Steps:"
echo "1. Visit your Cloudflare Dashboard to view deployments"
echo "2. Configure custom domain if needed"
echo "3. Test all endpoints and features"
echo "4. Monitor logs with: wrangler tail"
echo ""
echo "📚 Useful Commands:"
echo "  wrangler pages deployment list --project-name=leadership-legacy"
echo "  wrangler d1 execute leadership-legacy-db --command='SELECT * FROM feature_flags'"
echo "  wrangler r2 bucket list"
echo "  wrangler kv:key list --namespace-id=$KV_ID"
echo ""
