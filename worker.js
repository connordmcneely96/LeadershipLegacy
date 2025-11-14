/**
 * Cloudflare Worker for Leadership Legacy
 * Provides API proxy, caching, and asset management
 *
 * Bindings:
 * - LEADERSHIP_DB: D1 Database
 * - LEADERSHIP_ASSETS: R2 Bucket
 * - LEADERSHIP_CONFIG: KV Namespace
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS headers for development and production
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route: Health check
      if (url.pathname === '/api/health') {
        return new Response(JSON.stringify({
          status: 'healthy',
          timestamp: Date.now(),
          version: '1.0.0'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Route: GitHub API Proxy with D1 caching
      if (url.pathname.startsWith('/api/github')) {
        return await handleGitHubProxy(request, env, url, corsHeaders);
      }

      // Route: R2 Brand Assets
      if (url.pathname.startsWith('/api/assets')) {
        return await handleAssets(request, env, url, corsHeaders);
      }

      // Route: Feature flags from D1
      if (url.pathname === '/api/features') {
        return await handleFeatureFlags(request, env, corsHeaders);
      }

      // Route: Analytics data
      if (url.pathname.startsWith('/api/analytics')) {
        return await handleAnalytics(request, env, url, corsHeaders);
      }

      // Route: Configuration from KV
      if (url.pathname === '/api/config') {
        return await handleConfig(request, env, corsHeaders);
      }

      // 404 for unknown routes
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};

/**
 * Handle GitHub API proxy with caching
 */
async function handleGitHubProxy(request, env, url, corsHeaders) {
  const githubToken = await env.LEADERSHIP_CONFIG.get('GITHUB_TOKEN');
  const cacheKey = url.pathname + url.search;
  const cacheDuration = 300000; // 5 minutes in milliseconds

  // Check D1 cache first
  try {
    const cached = await env.LEADERSHIP_DB.prepare(
      'SELECT data, expires_at FROM github_cache WHERE id = ? AND expires_at > ?'
    ).bind(cacheKey, Date.now()).first();

    if (cached) {
      console.log('Cache hit for:', cacheKey);
      return new Response(cached.data, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'X-Cache': 'HIT'
        }
      });
    }
  } catch (error) {
    console.error('Cache read error:', error);
    // Continue to fetch from GitHub if cache fails
  }

  // Fetch from GitHub API
  const githubPath = url.pathname.replace('/api/github', '');
  const githubUrl = `https://api.github.com${githubPath}${url.search}`;

  const githubResponse = await fetch(githubUrl, {
    headers: {
      'Authorization': githubToken ? `token ${githubToken}` : '',
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Leadership-Legacy-Worker'
    }
  });

  if (!githubResponse.ok) {
    return new Response(JSON.stringify({
      error: 'GitHub API Error',
      status: githubResponse.status
    }), {
      status: githubResponse.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const data = await githubResponse.text();

  // Cache the response in D1
  try {
    await env.LEADERSHIP_DB.prepare(
      'INSERT OR REPLACE INTO github_cache (id, endpoint, data, expires_at) VALUES (?, ?, ?, ?)'
    ).bind(cacheKey, githubPath, data, Date.now() + cacheDuration).run();
  } catch (error) {
    console.error('Cache write error:', error);
    // Continue even if caching fails
  }

  return new Response(data, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'X-Cache': 'MISS'
    }
  });
}

/**
 * Handle R2 brand assets
 */
async function handleAssets(request, env, url, corsHeaders) {
  const assetKey = url.pathname.replace('/api/assets/', '');

  if (!assetKey) {
    return new Response(JSON.stringify({ error: 'Asset key required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const object = await env.LEADERSHIP_ASSETS.get(assetKey);

    if (!object) {
      return new Response(JSON.stringify({ error: 'Asset not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Cache-Control', 'public, max-age=31536000'); // 1 year

    return new Response(object.body, { headers });
  } catch (error) {
    console.error('R2 error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch asset' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Handle feature flags from D1
 */
async function handleFeatureFlags(request, env, corsHeaders) {
  try {
    const flags = await env.LEADERSHIP_DB.prepare(
      'SELECT key, enabled, config FROM feature_flags WHERE enabled = 1'
    ).all();

    const flagsMap = {};
    flags.results.forEach(flag => {
      flagsMap[flag.key] = {
        enabled: flag.enabled === 1,
        config: flag.config ? JSON.parse(flag.config) : {}
      };
    });

    return new Response(JSON.stringify(flagsMap), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Feature flags error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch feature flags' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Handle analytics data
 */
async function handleAnalytics(request, env, url, corsHeaders) {
  const metricKey = url.searchParams.get('metric');

  if (request.method === 'POST') {
    // Store analytics metric
    try {
      const body = await request.json();
      await env.LEADERSHIP_DB.prepare(
        'INSERT OR REPLACE INTO analytics_cache (metric_key, metric_value, metric_type) VALUES (?, ?, ?)'
      ).bind(body.key, JSON.stringify(body.value), body.type || 'general').run();

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Analytics write error:', error);
      return new Response(JSON.stringify({ error: 'Failed to store metric' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }

  // GET: Retrieve analytics
  try {
    const query = metricKey
      ? 'SELECT * FROM analytics_cache WHERE metric_key = ?'
      : 'SELECT * FROM analytics_cache ORDER BY cached_at DESC LIMIT 100';

    const stmt = metricKey
      ? env.LEADERSHIP_DB.prepare(query).bind(metricKey)
      : env.LEADERSHIP_DB.prepare(query);

    const results = await stmt.all();

    return new Response(JSON.stringify(results.results), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Analytics read error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch analytics' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Handle configuration from KV
 */
async function handleConfig(request, env, corsHeaders) {
  try {
    const config = {
      apiVersion: await env.LEADERSHIP_CONFIG.get('API_VERSION') || '1.0.0',
      features: await env.LEADERSHIP_CONFIG.get('feature_flags', { type: 'json' }) || {},
      environment: await env.LEADERSHIP_CONFIG.get('ENVIRONMENT') || 'production'
    };

    return new Response(JSON.stringify(config), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Config error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch configuration' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
