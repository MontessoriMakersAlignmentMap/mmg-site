ALTER TABLE crm_candidates
  ADD COLUMN IF NOT EXISTS matchhub_profile_url text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS matchhub_synced_at timestamptz DEFAULT NULL;
