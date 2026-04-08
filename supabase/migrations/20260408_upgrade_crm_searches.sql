ALTER TABLE crm_searches
  ADD COLUMN IF NOT EXISTS credential_required    text,
  ADD COLUMN IF NOT EXISTS levels_required        text[],
  ADD COLUMN IF NOT EXISTS location_flexible      boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS languages_required     text[],
  ADD COLUMN IF NOT EXISTS role_type_required     text,
  ADD COLUMN IF NOT EXISTS years_experience_min   integer,
  ADD COLUMN IF NOT EXISTS equity_focused         boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS position_description   text,
  ADD COLUMN IF NOT EXISTS compensation_range     text;
