# ⚡ Cloudflare Quick Start - Leadership Legacy

**Fast track to deploying Leadership Legacy on Cloudflare infrastructure**

## 🚀 One-Command Deployment

If you already have Wrangler authenticated and `wrangler.toml` configured:

```bash
./deploy-cloudflare.sh
```

That's it! 🎉

---

## 📝 Prerequisites Checklist

Before running the deployment script, ensure you have:

- [ ] Node.js 18+ installed
- [ ] NPM installed
- [ ] Cloudflare account created
- [ ] Cloudflare API token or logged in via `wrangler login`

---

## 🎯 First-Time Setup (5 Minutes)

### Step 1: Install Wrangler (if not installed)

```bash
npm install -g wrangler
```

### Step 2: Authenticate with Cloudflare

**Option A: Interactive Login (Easier)**
```bash
wrangler login
```

**Option B: API Token**
```bash
export CLOUDFLARE_API_TOKEN="your-api-token-here"
```

### Step 3: Get Your Account ID

```bash
# Run whoami to see your account ID
wrangler whoami

# Or visit: https://dash.cloudflare.com
# Click any zone → Copy Account ID from right sidebar
```

### Step 4: Update `wrangler.toml`

Edit `wrangler.toml` and add your account ID:

```toml
account_id = "your-account-id-here"
```

### Step 5: Run Deployment Script

```bash
./deploy-cloudflare.sh
```

The script will:
1. ✅ Create D1 database
2. ✅ Create R2 bucket
3. ✅ Create KV namespace
4. ✅ Run database migrations
5. ✅ Configure KV values
6. ✅ Deploy Worker
7. ✅ Build Next.js app
8. ✅ Deploy to Cloudflare Pages

---

## 🔧 Manual Deployment (Step-by-Step)

If you prefer to run commands manually:

### 1. Create Infrastructure

```bash
# D1 Database
wrangler d1 create leadership-legacy-db
# Update database_id in wrangler.toml

# R2 Bucket
wrangler r2 bucket create leadership-legacy-assets

# KV Namespace
wrangler kv:namespace create "LEADERSHIP_CONFIG"
# Update namespace id in wrangler.toml
```

### 2. Initialize Database

```bash
wrangler d1 execute leadership-legacy-db --file=./cloudflare-schema.sql
```

### 3. Configure KV

```bash
KV_ID="your-kv-namespace-id"

wrangler kv:key put --namespace-id="$KV_ID" "API_VERSION" "1.0.0"
wrangler kv:key put --namespace-id="$KV_ID" "ENVIRONMENT" "production"
wrangler kv:key put --namespace-id="$KV_ID" "feature_flags" '{"brand_lab":true,"analytics":true}'
```

### 4. Deploy Worker

```bash
npm run deploy:worker
```

### 5. Build & Deploy Pages

```bash
npm run build:cloudflare
npm run deploy:pages
```

---

## 🎪 Available NPM Scripts

```bash
# Cloudflare-specific scripts
npm run build:cloudflare      # Build for Cloudflare Pages
npm run deploy:worker          # Deploy Worker only
npm run deploy:pages           # Deploy to Pages only
npm run deploy:cloudflare      # Full deployment (script)

# Database operations
npm run cf:d1:migrate          # Run D1 migrations
npm run cf:d1:query "SELECT * FROM feature_flags"  # Query D1

# Monitoring
npm run cf:worker:tail         # View Worker logs
npm run cf:pages:tail          # View Pages deployment logs
```

---

## ✅ Verify Deployment

### Test Worker

```bash
# Get your worker URL from deployment output
curl https://leadership-legacy-worker.YOUR_SUBDOMAIN.workers.dev/api/health
```

Expected response:
```json
{"status":"healthy","timestamp":1234567890,"version":"1.0.0"}
```

### Test Pages

```bash
# Visit your Pages URL from deployment output
# https://leadership-legacy.pages.dev
```

### Check Database

```bash
wrangler d1 execute leadership-legacy-db --command="SELECT * FROM feature_flags"
```

### Check KV

```bash
KV_ID=$(grep -A 2 "LEADERSHIP_CONFIG" wrangler.toml | grep "id" | cut -d'"' -f2)
wrangler kv:key get --namespace-id="$KV_ID" "feature_flags"
```

---

## 🐛 Quick Troubleshooting

### "Not authenticated"
```bash
wrangler login
# Or set: export CLOUDFLARE_API_TOKEN="your-token"
```

### "Database not found"
```bash
# Make sure database_id in wrangler.toml matches created database
wrangler d1 list
```

### "Build failed"
```bash
# Clear cache and rebuild
rm -rf .next out
npm install
npm run build:cloudflare
```

### "Worker deployment failed"
```bash
# Check wrangler.toml syntax
wrangler deploy --dry-run
```

---

## 📊 Resource URLs After Deployment

After successful deployment, you'll have:

| Resource | URL/Location |
|----------|--------------|
| **Worker** | `https://leadership-legacy-worker.YOUR_SUBDOMAIN.workers.dev` |
| **Pages (Production)** | `https://leadership-legacy.pages.dev` |
| **Pages (Custom Domain)** | Configure in Cloudflare Dashboard |
| **D1 Database** | Access via `wrangler d1` commands |
| **R2 Bucket** | Access via `wrangler r2` commands |
| **KV Namespace** | Access via `wrangler kv` commands |

---

## 🔄 Updating Your Deployment

### Update Worker Code
```bash
# Edit worker.js
npm run deploy:worker
```

### Update Frontend
```bash
npm run build:cloudflare
npm run deploy:pages
```

### Update Database Schema
```bash
# Edit cloudflare-schema.sql
npm run cf:d1:migrate
```

### Update Configuration
```bash
KV_ID="your-kv-namespace-id"
wrangler kv:key put --namespace-id="$KV_ID" "key" "value"
```

---

## 🌟 Pro Tips

1. **Use GitHub Actions**: Set up automatic deployments on push (see `CLOUDFLARE_DEPLOYMENT.md`)

2. **Custom Domain**: Configure in Cloudflare Dashboard → Pages → Custom domains

3. **Environment Variables**: Add in Pages settings for different environments

4. **Monitoring**: Use `wrangler tail` to watch real-time logs

5. **Caching**: The Worker automatically caches GitHub API responses for 5 minutes

6. **Free Tier**: Stay within free tier limits (see `CLOUDFLARE_DEPLOYMENT.md` for details)

---

## 📚 More Information

- **Full Documentation**: See `CLOUDFLARE_DEPLOYMENT.md`
- **Architecture Details**: See architecture diagram in full docs
- **Troubleshooting**: See troubleshooting section in full docs
- **Cost Estimates**: See cost section in full docs

---

## 🆘 Need Help?

1. Check `CLOUDFLARE_DEPLOYMENT.md` for detailed documentation
2. Run `wrangler --help` for CLI help
3. Visit [Cloudflare Developers Discord](https://discord.gg/cloudflaredev)
4. Check [Cloudflare Docs](https://developers.cloudflare.com)

---

**Happy Deploying! 🚀**

*Last Updated: 2024-11-14*
