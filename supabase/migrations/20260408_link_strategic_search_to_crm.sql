-- Link strategic search roles to crm_searches via source_role_id
-- Allows auto-creation of CRM searches when a role is posted on Strategic Search

ALTER TABLE crm_searches
  ADD COLUMN IF NOT EXISTS source_role_id uuid REFERENCES search_roles(id) ON DELETE SET NULL;

-- Unique constraint so we never duplicate a CRM search for the same role
-- (NULLs are excluded from uniqueness checks in Postgres)
CREATE UNIQUE INDEX IF NOT EXISTS crm_searches_source_role_id_unique
  ON crm_searches (source_role_id)
  WHERE source_role_id IS NOT NULL;
