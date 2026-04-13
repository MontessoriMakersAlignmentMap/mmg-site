-- ============================================================================
-- Observation Visit System Tables
-- Monthly observation visits for residency program
-- ============================================================================

-- ─── 1. Observation Prompts ─────────────────────────────────────────────────
-- Monthly curriculum connection text that admins can edit

CREATE TABLE residency_observation_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track text NOT NULL CHECK (track IN ('primary', 'elementary')),
  month_number integer NOT NULL CHECK (month_number BETWEEN 1 AND 12),
  curriculum_connection text NOT NULL,
  updated_at timestamptz DEFAULT now(),
  UNIQUE (track, month_number)
);

ALTER TABLE residency_observation_prompts ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read prompts
CREATE POLICY "observation_prompts_select_authenticated"
  ON residency_observation_prompts FOR SELECT
  TO authenticated
  USING (true);

-- Admins can insert prompts
CREATE POLICY "observation_prompts_insert_admin"
  ON residency_observation_prompts FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Admins can update prompts
CREATE POLICY "observation_prompts_update_admin"
  ON residency_observation_prompts FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Admins can delete prompts
CREATE POLICY "observation_prompts_delete_admin"
  ON residency_observation_prompts FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Seed Primary prompts (months 1-9)
INSERT INTO residency_observation_prompts (track, month_number, curriculum_connection) VALUES
  ('primary', 1, 'You are beginning your study of Theory and Practical Life. This month observe how the prepared environment is organized, how children move through the space, and how the guide fades after giving a lesson.'),
  ('primary', 2, 'You are studying Practical Life Care of Environment and Grace and Courtesy. Observe how children care for the classroom independently and how the guide models social interactions without directing them.'),
  ('primary', 3, 'You are completing Practical Life and beginning Sensorial. Observe the transition between strands in the classroom. Notice which children are drawn to Sensorial materials and what concentration looks like during that work.'),
  ('primary', 4, 'You are deep in Sensorial. Observe how children self-select Sensorial work, how long they sustain concentration, and what the guide does and does not do during the work cycle.'),
  ('primary', 5, 'You are beginning Language. Observe the language environment. Notice how phonemic awareness is supported, how reading materials are organized on the shelf, and how the guide introduces language work to individual children.'),
  ('primary', 6, 'You are bridging Language and Mathematics. Observe how both areas of the classroom are used during a single work cycle. Notice children who move between language and math work and what that movement tells you about their developmental stage.'),
  ('primary', 7, 'You are deep in Mathematics. Observe the mathematical materials in use. Notice the progression from concrete to abstract in how different children are working and how the guide tracks that progression.'),
  ('primary', 8, 'You are integrating Mathematics and Theory. Observe the whole classroom with fresh eyes. After seven months of study, what do you see now that you could not have seen in September?'),
  ('primary', 9, 'You are studying Behavior Support and preparing your capstone. Observe one child across the full day with particular attention to their regulatory patterns, their relationship with specific materials, and how the guide responds to their needs.');

-- Seed Elementary prompts (months 1-12) with placeholder text
INSERT INTO residency_observation_prompts (track, month_number, curriculum_connection) VALUES
  ('elementary', 1, 'Elementary Month 1 observation prompt - to be configured by program director.'),
  ('elementary', 2, 'Elementary Month 2 observation prompt - to be configured by program director.'),
  ('elementary', 3, 'Elementary Month 3 observation prompt - to be configured by program director.'),
  ('elementary', 4, 'Elementary Month 4 observation prompt - to be configured by program director.'),
  ('elementary', 5, 'Elementary Month 5 observation prompt - to be configured by program director.'),
  ('elementary', 6, 'Elementary Month 6 observation prompt - to be configured by program director.'),
  ('elementary', 7, 'Elementary Month 7 observation prompt - to be configured by program director.'),
  ('elementary', 8, 'Elementary Month 8 observation prompt - to be configured by program director.'),
  ('elementary', 9, 'Elementary Month 9 observation prompt - to be configured by program director.'),
  ('elementary', 10, 'Elementary Month 10 observation prompt - to be configured by program director.'),
  ('elementary', 11, 'Elementary Month 11 observation prompt - to be configured by program director.'),
  ('elementary', 12, 'Elementary Month 12 observation prompt - to be configured by program director.');

-- ─── 2. Observation Site Approvals ──────────────────────────────────────────

CREATE TABLE residency_observation_site_approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id uuid NOT NULL REFERENCES residency_residents(id),
  school_name text NOT NULL,
  address text,
  school_type text CHECK (school_type IN ('private_independent', 'public_district', 'charter', 'bilingual_dual_language', 'other')),
  contact_name text,
  planned_month integer,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined')),
  admin_note text,
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz
);

ALTER TABLE residency_observation_site_approvals ENABLE ROW LEVEL SECURITY;

-- Residents can insert their own site approvals
CREATE POLICY "site_approvals_insert_own"
  ON residency_observation_site_approvals FOR INSERT
  TO authenticated
  WITH CHECK (resident_id IN (SELECT id FROM residency_residents WHERE profile_id = auth.uid()));

-- Residents can select their own site approvals
CREATE POLICY "site_approvals_select_own"
  ON residency_observation_site_approvals FOR SELECT
  TO authenticated
  USING (resident_id IN (SELECT id FROM residency_residents WHERE profile_id = auth.uid()));

-- Admins can select all site approvals
CREATE POLICY "site_approvals_select_admin"
  ON residency_observation_site_approvals FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Admins can update all site approvals
CREATE POLICY "site_approvals_update_admin"
  ON residency_observation_site_approvals FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─── 3. Observation Logs ────────────────────────────────────────────────────

CREATE TABLE residency_observation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id uuid NOT NULL REFERENCES residency_residents(id),
  observation_date date NOT NULL,
  month_number integer NOT NULL,
  school_name text NOT NULL,
  supervising_guide text,
  guide_credential text,
  school_type text,
  hours numeric DEFAULT 6,
  reflection_connection text,
  reflection_surprise text,
  reflection_questions text,
  reflection_next_month text,
  confirmation_checkbox boolean DEFAULT false,
  submitted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE (resident_id, month_number)
);

ALTER TABLE residency_observation_logs ENABLE ROW LEVEL SECURITY;

-- Residents can insert their own logs
CREATE POLICY "observation_logs_insert_own"
  ON residency_observation_logs FOR INSERT
  TO authenticated
  WITH CHECK (resident_id IN (SELECT id FROM residency_residents WHERE profile_id = auth.uid()));

-- Residents can select their own logs
CREATE POLICY "observation_logs_select_own"
  ON residency_observation_logs FOR SELECT
  TO authenticated
  USING (resident_id IN (SELECT id FROM residency_residents WHERE profile_id = auth.uid()));

-- Admins and mentors can select all logs
CREATE POLICY "observation_logs_select_admin_mentor"
  ON residency_observation_logs FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role IN ('admin', 'mentor')));

-- ─── 4. Observation Settings ────────────────────────────────────────────────

CREATE TABLE residency_observation_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track text NOT NULL UNIQUE,
  required_hours_per_visit numeric DEFAULT 6,
  total_required_observations integer,
  approval_required boolean DEFAULT true
);

ALTER TABLE residency_observation_settings ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read settings
CREATE POLICY "observation_settings_select_authenticated"
  ON residency_observation_settings FOR SELECT
  TO authenticated
  USING (true);

-- Admins can update settings
CREATE POLICY "observation_settings_update_admin"
  ON residency_observation_settings FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Seed settings
INSERT INTO residency_observation_settings (track, required_hours_per_visit, total_required_observations, approval_required) VALUES
  ('primary', 6, 9, true),
  ('elementary', 6, 12, true);
