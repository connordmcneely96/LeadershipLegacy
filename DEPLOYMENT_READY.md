# 🎯 Deployment Ready - Leadership Legacy on Cloudflare

**Account ID**: `ede6590ac0d2fb7daf155b35653457b2`
**Zone ID**: `0bab48636c1bea4be4ea61c0c7787c3e`

All infrastructure code is ready. Follow these steps to deploy.

---

## ✅ What's Already Configured

- [x] Account ID set in `wrangler.toml`
- [x] Zone ID documented for custom domain
- [x] GitHub Actions workflow created
- [x] Worker code ready (`worker.js`)
- [x] Database schema ready (`cloudflare-schema.sql`)
- [x] Build scripts configured
- [x] Documentation complete

---

## 🚀 Deployment Steps

### Step 1: Authenticate (Choose One)

**Option A: API Token (Recommended for CI/CD)**
```bash
export CLOUDFLARE_API_TOKEN="your-api-token-here"
```

**Option B: Interactive Login**
```bash
wrangler login
```

Verify authentication:
```bash
wrangler whoami
```

Expected output:
```
Account Name: [Your Account Name]
Account ID: ede6590ac0d2fb7daf155b35653457b2
```

---

### Step 2: Create Cloudflare Resources

#### 2.1 Create D1 Database

```bash
wrangler d1 create leadership-legacy-db
```

**Expected output:**
```
✅ Successfully created DB 'leadership-legacy-db'
Created your database using D1's new storage backend.

[[d1_databases]]
binding = "LEADERSHIP_DB"
database_name = "leadership-legacy-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**ACTION REQUIRED:** Copy the `database_id` and update `wrangler.toml` line 22:
```toml
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # Replace this
```

#### 2.2 Initialize Database Schema

```bash
wrangler d1 execute leadership-legacy-db --file=./cloudflare-schema.sql
```

**Expected output:**
```
🌀 Executing on leadership-legacy-db (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx):
🌀 To execute on your local development database, pass the --local flag.
🚣 Executed X commands in Xms
```

Verify tables:
```bash
wrangler d1 execute leadership-legacy-db --command="SELECT name FROM sqlite_master WHERE type='table'"
```

You should see: `github_cache`, `feature_flags`, `analytics_cache`, `sessions`

#### 2.3 Create R2 Bucket

```bash
wrangler r2 bucket create leadership-legacy-assets
```

**Expected output:**
```
✅ Created bucket 'leadership-legacy-assets'
```

Verify:
```bash
wrangler r2 bucket list
```

#### 2.4 Create KV Namespace

```bash
wrangler kv:namespace create "LEADERSHIP_CONFIG"
```

**Expected output:**
```
🌀 Creating namespace with title "leadership-legacy-worker-LEADERSHIP_CONFIG"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "LEADERSHIP_CONFIG", id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }
```

**ACTION REQUIRED:** Copy the `id` and update `wrangler.toml` line 34:
```toml
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  # Replace this
```

#### 2.5 Configure KV Values

Get your KV namespace ID from `wrangler.toml`, then:

```bash
# Set your KV namespace ID
KV_ID="your-kv-namespace-id-from-wrangler-toml"

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
```

**Optional: Add GitHub Token for higher API limits**
```bash
wrangler kv:key put --namespace-id="$KV_ID" "GITHUB_TOKEN" "ghp_your_github_token_here"
```

Verify KV values:
```bash
wrangler kv:key list --namespace-id="$KV_ID"
wrangler kv:key get --namespace-id="$KV_ID" "feature_flags"
```

---

### Step 3: Deploy Worker

```bash
npm run deploy:worker
```

**Expected output:**
```
Total Upload: XX.XX KiB / gzip: XX.XX KiB
Uploaded leadership-legacy-worker (X.XX sec)
Published leadership-legacy-worker (X.XX sec)
  https://leadership-legacy-worker.ede6590ac0d2fb7daf155b35653457b2.workers.dev
Current Deployment ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**Your Worker URL:**
```
https://leadership-legacy-worker.ede6590ac0d2fb7daf155b35653457b2.workers.dev
```

Test it:
```bash
curl https://leadership-legacy-worker.ede6590ac0d2fb7daf155b35653457b2.workers.dev/api/health
```

Expected response:
```json
{"status":"healthy","timestamp":1234567890,"version":"1.0.0"}
```

---

### Step 4: Build Next.js Application

```bash
npm run build:cloudflare
```

This creates an `out/` directory with static files.

---

### Step 5: Deploy to Cloudflare Pages

```bash
npm run deploy:pages
```

**Expected output:**
```
✨ Success! Uploaded X files (X.XX sec)
✨ Deployment complete! Take a peek over at https://xxxxxxxx.leadership-legacy.pages.dev
```

**Your Pages URL:**
```
https://leadership-legacy.pages.dev
```

---

## 🧪 Verification & Testing

### Test Worker Endpoints

```bash
# Health check
curl https://leadership-legacy-worker.ede6590ac0d2fb7daf155b35653457b2.workers.dev/api/health

# Feature flags
curl https://leadership-legacy-worker.ede6590ac0d2fb7daf155b35653457b2.workers.dev/api/features

# Configuration
curl https://leadership-legacy-worker.ede6590ac0d2fb7daf155b35653457b2.workers.dev/api/config

# GitHub proxy test
curl https://leadership-legacy-worker.ede6590ac0d2fb7daf155b35653457b2.workers.dev/api/github/users/InnerAnimal
```

### Test Pages Deployment

Visit: https://leadership-legacy.pages.dev

### Check Database

```bash
# View feature flags
wrangler d1 execute leadership-legacy-db --command="SELECT * FROM feature_flags"

# Check cache (should be empty initially)
wrangler d1 execute leadership-legacy-db --command="SELECT COUNT(*) FROM github_cache"
```

### View Logs

```bash
# Worker logs (real-time)
wrangler tail

# Pages deployment logs
wrangler pages deployment tail --project-name=leadership-legacy
```

---

## 🔄 GitHub Actions Setup

To enable automatic deployments on push:

1. Go to: https://github.com/InnerAnimal/ll_connors_leadership_legacy_launch/settings/secrets/actions

2. Click "New repository secret"

3. Add secret:
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: Your Cloudflare API token

4. Push to main or any `claude/deploy-map-cloudflare-*` branch

5. GitHub Actions will automatically:
   - Deploy the Worker
   - Build Next.js
   - Deploy to Pages
   - Verify deployment

---

## 📊 Your Deployment URLs

After deployment, document these:

| Resource | URL/ID | Status |
|----------|--------|--------|
| **Account ID** | `ede6590ac0d2fb7daf155b35653457b2` | ✅ Set |
| **Zone ID** | `0bab48636c1bea4be4ea61c0c7787c3e` | ✅ Ready |
| **D1 Database** | `leadership-legacy-db` | ⏳ Pending creation |
| **R2 Bucket** | `leadership-legacy-assets` | ⏳ Pending creation |
| **KV Namespace** | `LEADERSHIP_CONFIG` | ⏳ Pending creation |
| **Worker URL** | `https://leadership-legacy-worker.ede6590ac0d2fb7daf155b35653457b2.workers.dev` | ⏳ Pending deployment |
| **Pages URL** | `https://leadership-legacy.pages.dev` | ⏳ Pending deployment |

---

## 🎯 Quick Deploy Script

Or run the automated script:

```bash
./deploy-cloudflare.sh
```

This will walk you through all steps automatically.

---

## 🆘 Troubleshooting

### "Not authenticated"
```bash
# Set API token
export CLOUDFLARE_API_TOKEN="your-token"

# Or login interactively
wrangler login
```

### "Database not found"
Make sure you updated `wrangler.toml` with the correct `database_id` from Step 2.1

### "KV namespace not found"
Make sure you updated `wrangler.toml` with the correct KV namespace `id` from Step 2.4

### Build errors
```bash
# Clear cache
rm -rf .next out node_modules
npm install
npm run build:cloudflare
```

---

## 📝 Post-Deployment Checklist

- [ ] Worker deployed and responding
- [ ] Pages deployed and accessible
- [ ] Database tables created
- [ ] Feature flags configured
- [ ] KV values set
- [ ] All endpoints tested
- [ ] GitHub Actions secret added
- [ ] Custom domain configured (optional)

---

## 🌐 Custom Domain Setup (Optional)

To use your custom domain:

1. Go to Cloudflare Dashboard → Pages → leadership-legacy
2. Click "Custom domains"
3. Add your domain
4. Update DNS records as prompted

For Worker custom route:
1. Uncomment line 15 in `wrangler.toml`
2. Redeploy: `npm run deploy:worker`

---

**Ready to deploy? Start with Step 1 above!** 🚀
