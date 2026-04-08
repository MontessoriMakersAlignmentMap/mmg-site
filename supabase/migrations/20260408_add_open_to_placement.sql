ALTER TABLE guide_profiles
  ADD COLUMN IF NOT EXISTS open_to_placement boolean NOT NULL DEFAULT false;
