-- ─── CURRENT SEARCHES ────────────────────────────────────────────────────────

-- One row per school actively working with MMG on placement
CREATE TABLE IF NOT EXISTS searches (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name   text        NOT NULL,
  school_slug   text        UNIQUE NOT NULL,
  school_website text,
  school_logo_url text,
  school_blurb  text,
  active        boolean     NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Multiple open roles per search
CREATE TABLE IF NOT EXISTS search_roles (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id     uuid        NOT NULL REFERENCES searches(id) ON DELETE CASCADE,
  title         text        NOT NULL,
  role_slug     text        NOT NULL,
  description   text,
  apply_method  text        NOT NULL DEFAULT 'email'
                            CHECK (apply_method IN ('upload', 'link', 'email')),
  apply_url     text,
  apply_email   text,
  active        boolean     NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE(search_id, role_slug)
);

-- ─── TALENT POOL ──────────────────────────────────────────────────────────────

-- Admin-managed candidate profiles (public fields are anonymized)
CREATE TABLE IF NOT EXISTS talent_pool (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id    text        UNIQUE NOT NULL,           -- e.g. "MMG-001" (shown publicly)
  -- ── internal / private ──────────────────────────────────────────────────────
  full_name       text,
  internal_email  text,
  resume_url      text,
  private_notes   text,
  -- ── public / anonymized ─────────────────────────────────────────────────────
  display_title   text,                                   -- e.g. "Primary Guide — AMI, 6 years"
  training        text,                                   -- e.g. "AMI 3–6", "AMS Lower Elementary"
  years_experience text,                                  -- e.g. "6 years", "12+ years"
  levels          text[]      DEFAULT '{}',               -- Primary, Lower El, Leadership, etc.
  region          text,                                   -- e.g. "Northeast US", "Open to relocate"
  open_to_relocate boolean    DEFAULT false,
  public_summary  text,                                   -- 2–3 sentence anonymized profile
  tags            text[]      DEFAULT '{}',
  photo_url       text,                                   -- optional (anonymized silhouette or real)
  -- ── control ─────────────────────────────────────────────────────────────────
  active          boolean     NOT NULL DEFAULT true,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ─── RLS ─────────────────────────────────────────────────────────────────────

ALTER TABLE searches     ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE talent_pool  ENABLE ROW LEVEL SECURITY;

-- Public: read active records only
CREATE POLICY "Public reads active searches"
  ON searches FOR SELECT USING (active = true);

CREATE POLICY "Public reads active search roles"
  ON search_roles FOR SELECT USING (active = true);

CREATE POLICY "Public reads active talent pool"
  ON talent_pool FOR SELECT USING (active = true);

-- Service role: full access (used by admin API routes)
CREATE POLICY "Service role manages searches"
  ON searches FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role manages search roles"
  ON search_roles FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role manages talent pool"
  ON talent_pool FOR ALL USING (true) WITH CHECK (true);
