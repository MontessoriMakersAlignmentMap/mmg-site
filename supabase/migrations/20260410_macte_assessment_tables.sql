-- ============================================================================
-- MACTE Assessment System Tables
-- Rubric submissions, observation forms, candidate standing, progression
-- thresholds, handbook acknowledgments, and portfolio export logs.
-- All tables use soft deletes (deleted_at) to preserve accreditation records.
-- 2026-04-10
-- ============================================================================

-- ─── Placement Sites ─────────────────────────────────────────────────────
-- Practicum placement sites where residents are observed

CREATE TABLE IF NOT EXISTS residency_placement_sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  city text,
  state text,
  contact_name text,
  contact_email text,
  level_id uuid REFERENCES residency_levels(id),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

ALTER TABLE residency_placement_sites ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins manage placement sites" ON residency_placement_sites;
CREATE POLICY "Admins manage placement sites" ON residency_placement_sites
  FOR ALL USING (true);

-- ─── Rubric Submissions ──────────────────────────────────────────────────
-- Stores completed assessments: practice rubric, reflective rubric, equity checklist

CREATE TYPE rubric_type AS ENUM ('practice', 'reflective', 'equity');

CREATE TABLE IF NOT EXISTS residency_rubric_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id uuid NOT NULL REFERENCES residency_residents(id),
  mentor_id uuid NOT NULL REFERENCES residency_profiles(id),
  rubric_type rubric_type NOT NULL,
  observation_date date NOT NULL,
  placement_site_id uuid REFERENCES residency_placement_sites(id),
  semester text, -- e.g. 'Fall 2026', 'Spring 2027'

  -- Domain/dimension scores stored as JSONB
  -- Practice: { "prepared_environment": 3, "lesson_presentation": 2, ... }
  -- Reflective: { "awareness": 3, "integration": 4, ... }
  -- Equity: { "representation": "yes", "accessibility": "in_progress", ... }
  scores jsonb NOT NULL DEFAULT '{}',

  -- Narrative notes per domain stored as JSONB
  -- { "prepared_environment": "Strong shelf organization...", ... }
  narrative_notes jsonb NOT NULL DEFAULT '{}',

  -- Overall summary text
  overall_summary text,

  -- Computed overall score (for practice/reflective rubrics)
  overall_score numeric(3,2),

  -- Proficiency band: highly_proficient, proficient, developing, needs_support
  proficiency_band text,

  -- Resident's written reflection response
  resident_reflection text,
  resident_reflection_at timestamptz,

  submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX idx_rubric_submissions_resident ON residency_rubric_submissions(resident_id);
CREATE INDEX idx_rubric_submissions_mentor ON residency_rubric_submissions(mentor_id);
CREATE INDEX idx_rubric_submissions_type ON residency_rubric_submissions(rubric_type);

ALTER TABLE residency_rubric_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Rubric access policy" ON residency_rubric_submissions;
CREATE POLICY "Rubric access policy" ON residency_rubric_submissions
  FOR ALL USING (true);

-- ─── Observation Forms ───────────────────────────────────────────────────
-- Structured observation forms completed during practicum site visits

CREATE TABLE IF NOT EXISTS residency_observation_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id uuid NOT NULL REFERENCES residency_residents(id),
  observer_id uuid NOT NULL REFERENCES residency_profiles(id),
  observation_date date NOT NULL,
  placement_site_id uuid REFERENCES residency_placement_sites(id),
  semester text,

  -- Observation focus: prepared_environment, lesson_presentation, child_interaction, other
  observation_focus text NOT NULL,
  observation_focus_other text, -- if focus is 'other'

  -- Free-text observation notes
  observation_notes text,

  -- Rubric indicators checked as present (array of indicator keys)
  indicators_present text[] DEFAULT '{}',

  -- Specific evidence observed
  specific_evidence text,

  -- Suggested next steps
  suggested_next_steps text,

  -- Summary feedback
  summary_feedback text,

  -- Observer type: mentor or faculty
  observer_type text NOT NULL DEFAULT 'mentor',

  submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX idx_observation_forms_resident ON residency_observation_forms(resident_id);
CREATE INDEX idx_observation_forms_observer ON residency_observation_forms(observer_id);

ALTER TABLE residency_observation_forms ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Observation access policy" ON residency_observation_forms;
CREATE POLICY "Observation access policy" ON residency_observation_forms
  FOR ALL USING (true);

-- ─── Candidate Standing History ──────────────────────────────────────────
-- Tracks status changes: good_standing, academic_watch, formal_remediation

CREATE TYPE candidate_standing AS ENUM ('good_standing', 'academic_watch', 'formal_remediation');

CREATE TABLE IF NOT EXISTS residency_standing_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id uuid NOT NULL REFERENCES residency_residents(id),
  standing candidate_standing NOT NULL,
  reason text NOT NULL,
  changed_by uuid NOT NULL REFERENCES residency_profiles(id),
  mentor_checkin_due_at timestamptz, -- 7-day window for mentor check-in
  mentor_checkin_at timestamptz,     -- when mentor actually checked in
  mentor_checkin_notes text,
  escalated_to_admin boolean NOT NULL DEFAULT false,
  escalated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_standing_history_resident ON residency_standing_history(resident_id);

ALTER TABLE residency_standing_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Standing history access" ON residency_standing_history;
CREATE POLICY "Standing history access" ON residency_standing_history
  FOR ALL USING (true);

-- ─── Add current standing to residents ───────────────────────────────────

ALTER TABLE residency_residents
  ADD COLUMN IF NOT EXISTS current_standing candidate_standing NOT NULL DEFAULT 'good_standing';

ALTER TABLE residency_residents
  ADD COLUMN IF NOT EXISTS placement_site_id uuid REFERENCES residency_placement_sites(id);

-- ─── Progression Thresholds ──────────────────────────────────────────────
-- Configurable minimum standards per semester

CREATE TABLE IF NOT EXISTS residency_progression_thresholds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,           -- e.g. 'practicum_hours_per_semester'
  description text,
  threshold_value numeric NOT NULL,
  threshold_unit text,          -- e.g. 'hours', 'submissions', 'score'
  period text NOT NULL DEFAULT 'semester', -- 'semester', 'month', 'year'
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE residency_progression_thresholds ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Threshold access" ON residency_progression_thresholds;
CREATE POLICY "Threshold access" ON residency_progression_thresholds
  FOR ALL USING (true);

-- Seed default thresholds from MACTE requirements
INSERT INTO residency_progression_thresholds (name, description, threshold_value, threshold_unit, period) VALUES
  ('practicum_hours_per_semester', 'Minimum practicum hours per semester', 180, 'hours', 'semester'),
  ('album_submissions_per_month', 'Minimum album submissions per month', 2, 'submissions', 'month'),
  ('formal_assessments_per_semester', 'Minimum formal rubric assessments per semester', 2, 'assessments', 'semester'),
  ('observations_per_semester', 'Minimum observation forms per semester', 3, 'observations', 'semester'),
  ('min_rubric_score', 'Minimum average rubric score for good standing', 2.0, 'score', 'semester'),
  ('mentor_observations_per_semester', 'Minimum mentor observations per semester', 6, 'observations', 'semester'),
  ('faculty_visits_per_semester', 'Minimum faculty visits per semester', 2, 'visits', 'semester');

-- ─── Handbook Acknowledgments ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS residency_handbook_acks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id uuid NOT NULL REFERENCES residency_residents(id) UNIQUE,
  acknowledged_at timestamptz NOT NULL DEFAULT now(),
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE residency_handbook_acks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Handbook ack access" ON residency_handbook_acks;
CREATE POLICY "Handbook ack access" ON residency_handbook_acks
  FOR ALL USING (true);

-- ─── Portfolio Export Logs ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS residency_portfolio_exports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id uuid NOT NULL REFERENCES residency_residents(id),
  exported_by uuid NOT NULL REFERENCES residency_profiles(id),
  export_format text NOT NULL DEFAULT 'pdf',
  sections_included text[] DEFAULT '{}',
  file_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE residency_portfolio_exports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Portfolio export access" ON residency_portfolio_exports;
CREATE POLICY "Portfolio export access" ON residency_portfolio_exports
  FOR ALL USING (true);

-- ─── Capstone Tracking ───────────────────────────────────────────────────

ALTER TABLE residency_residents
  ADD COLUMN IF NOT EXISTS capstone_status text NOT NULL DEFAULT 'not_started';
  -- Values: not_started, in_progress, submitted, reviewed

ALTER TABLE residency_residents
  ADD COLUMN IF NOT EXISTS capstone_submitted_at timestamptz;

ALTER TABLE residency_residents
  ADD COLUMN IF NOT EXISTS capstone_video_url text;

ALTER TABLE residency_residents
  ADD COLUMN IF NOT EXISTS capstone_reflection text;

-- ─── Notifications table for assessment alerts ──────────────────────────

CREATE TABLE IF NOT EXISTS residency_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id uuid NOT NULL REFERENCES residency_profiles(id),
  type text NOT NULL, -- 'rubric_completed', 'standing_change', 'observation_behind', etc.
  title text NOT NULL,
  message text,
  link text,           -- URL to navigate to
  is_read boolean NOT NULL DEFAULT false,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_recipient ON residency_notifications(recipient_id);
CREATE INDEX idx_notifications_unread ON residency_notifications(recipient_id, is_read) WHERE NOT is_read;

ALTER TABLE residency_notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Notification access" ON residency_notifications;
CREATE POLICY "Notification access" ON residency_notifications
  FOR ALL USING (recipient_id = auth.uid());

-- ─── Updated_at triggers ─────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_rubric_submissions_updated_at
  BEFORE UPDATE ON residency_rubric_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_observation_forms_updated_at
  BEFORE UPDATE ON residency_observation_forms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_placement_sites_updated_at
  BEFORE UPDATE ON residency_placement_sites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progression_thresholds_updated_at
  BEFORE UPDATE ON residency_progression_thresholds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
