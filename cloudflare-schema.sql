-- D1 Database Schema for Leadership Legacy
-- Purpose: Cache GitHub API responses, feature flags, and analytics

-- Cache table for GitHub API responses
CREATE TABLE IF NOT EXISTS github_cache (
  id TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL,
  data TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Feature flags for controlling application features
CREATE TABLE IF NOT EXISTS feature_flags (
  key TEXT PRIMARY KEY,
  enabled INTEGER DEFAULT 0,
  config TEXT,
  description TEXT,
  updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Analytics cache for performance metrics
CREATE TABLE IF NOT EXISTS analytics_cache (
  metric_key TEXT PRIMARY KEY,
  metric_value TEXT NOT NULL,
  metric_type TEXT,
  cached_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Session data (if needed for future auth)
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  data TEXT,
  expires_at INTEGER NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_github_cache_expires ON github_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_github_cache_endpoint ON github_cache(endpoint);
CREATE INDEX IF NOT EXISTS idx_feature_flags_enabled ON feature_flags(enabled);
CREATE INDEX IF NOT EXISTS idx_analytics_cache_type ON analytics_cache(metric_type);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

-- Insert default feature flags
INSERT OR IGNORE INTO feature_flags (key, enabled, config, description) VALUES
  ('brand_lab', 1, '{"version": "1.0"}', 'Enable Brand Lab features'),
  ('analytics', 1, '{"provider": "cloudflare"}', 'Enable analytics tracking'),
  ('dashboard', 1, '{}', 'Enable dashboard features'),
  ('portfolio', 1, '{}', 'Enable portfolio section'),
  ('coaching', 1, '{}', 'Enable coaching features'),
  ('community', 1, '{}', 'Enable community features');
