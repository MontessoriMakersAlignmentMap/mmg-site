-- Site Mentor Portal Tables

-- Site mentor assignments (links profile to resident placement)
CREATE TABLE residency_site_mentor_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_mentor_profile_id uuid NOT NULL REFERENCES residency_profiles(id),
  resident_id uuid NOT NULL REFERENCES residency_residents(id),
  site_id uuid NOT NULL REFERENCES residency_placement_sites(id),
  academic_year text NOT NULL,
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'completed', 'withdrawn')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_sm_assignments_mentor ON residency_site_mentor_assignments(site_mentor_profile_id);
CREATE INDEX idx_sm_assignments_resident ON residency_site_mentor_assignments(resident_id);

ALTER TABLE residency_site_mentor_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sm_assignments_own"
  ON residency_site_mentor_assignments FOR SELECT
  TO authenticated
  USING (site_mentor_profile_id = auth.uid());

CREATE POLICY "sm_assignments_admin"
  ON residency_site_mentor_assignments FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Site mentor onboarding progress
CREATE TABLE residency_site_mentor_onboarding (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_mentor_profile_id uuid NOT NULL REFERENCES residency_profiles(id) UNIQUE,
  step_1_complete boolean DEFAULT false,
  step_2_complete boolean DEFAULT false,
  step_3_complete boolean DEFAULT false,
  step_4_complete boolean DEFAULT false,
  step_5_complete boolean DEFAULT false,
  quiz_score integer,
  quiz_passed boolean DEFAULT false,
  quiz_completed_at timestamptz,
  onboarding_completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE residency_site_mentor_onboarding ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sm_onboarding_own"
  ON residency_site_mentor_onboarding FOR ALL
  TO authenticated
  USING (site_mentor_profile_id = auth.uid());

CREATE POLICY "sm_onboarding_admin"
  ON residency_site_mentor_onboarding FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Site mentor observations (quarterly, uses same rubric)
CREATE TABLE residency_site_mentor_observations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_mentor_profile_id uuid NOT NULL REFERENCES residency_profiles(id),
  resident_id uuid NOT NULL REFERENCES residency_residents(id),
  observation_date date NOT NULL,
  quarter text NOT NULL CHECK (quarter IN ('Q1', 'Q2', 'Q3', 'Q4')),
  academic_year text NOT NULL,
  observation_focus text,
  indicators_present text[] DEFAULT '{}',
  observation_notes text,
  specific_evidence text,
  suggested_next_steps text,
  summary_feedback text,
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'submitted')),
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_sm_observations_mentor ON residency_site_mentor_observations(site_mentor_profile_id);
CREATE INDEX idx_sm_observations_resident ON residency_site_mentor_observations(resident_id);

ALTER TABLE residency_site_mentor_observations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sm_observations_own"
  ON residency_site_mentor_observations FOR ALL
  TO authenticated
  USING (site_mentor_profile_id = auth.uid());

CREATE POLICY "sm_observations_mentor_view"
  ON residency_site_mentor_observations FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM residency_residents r
    WHERE r.id = resident_id AND r.mentor_id = auth.uid()
  ));

CREATE POLICY "sm_observations_admin"
  ON residency_site_mentor_observations FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Site mentor check-ins with Cohort Guide
CREATE TABLE residency_site_mentor_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_mentor_profile_id uuid NOT NULL REFERENCES residency_profiles(id),
  cohort_guide_id uuid NOT NULL REFERENCES residency_profiles(id),
  resident_id uuid NOT NULL REFERENCES residency_residents(id),
  checkin_date date NOT NULL,
  notes text,
  resident_progress_summary text,
  concerns text,
  action_items text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_sm_checkins_mentor ON residency_site_mentor_checkins(site_mentor_profile_id);

ALTER TABLE residency_site_mentor_checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sm_checkins_own"
  ON residency_site_mentor_checkins FOR ALL
  TO authenticated
  USING (site_mentor_profile_id = auth.uid() OR cohort_guide_id = auth.uid());

CREATE POLICY "sm_checkins_admin"
  ON residency_site_mentor_checkins FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Site mentor final evaluation
CREATE TABLE residency_site_mentor_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_mentor_profile_id uuid NOT NULL REFERENCES residency_profiles(id),
  resident_id uuid NOT NULL REFERENCES residency_residents(id),
  academic_year text NOT NULL,
  classroom_readiness text CHECK (classroom_readiness IN ('ready', 'ready_with_support', 'not_ready')),
  strengths text,
  areas_for_growth text,
  recommendation text,
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE residency_site_mentor_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sm_evaluations_own"
  ON residency_site_mentor_evaluations FOR ALL
  TO authenticated
  USING (site_mentor_profile_id = auth.uid());

CREATE POLICY "sm_evaluations_admin"
  ON residency_site_mentor_evaluations FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Stipend tracking
CREATE TABLE residency_site_mentor_stipends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_mentor_profile_id uuid NOT NULL REFERENCES residency_profiles(id),
  academic_year text NOT NULL,
  semester text NOT NULL CHECK (semester IN ('fall', 'spring')),
  amount numeric(8,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'paid')),
  paid_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE residency_site_mentor_stipends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sm_stipends_own"
  ON residency_site_mentor_stipends FOR SELECT
  TO authenticated
  USING (site_mentor_profile_id = auth.uid());

CREATE POLICY "sm_stipends_admin"
  ON residency_site_mentor_stipends FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- Triggers
CREATE TRIGGER update_sm_assignments_updated_at
  BEFORE UPDATE ON residency_site_mentor_assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sm_onboarding_updated_at
  BEFORE UPDATE ON residency_site_mentor_onboarding
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sm_observations_updated_at
  BEFORE UPDATE ON residency_site_mentor_observations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sm_evaluations_updated_at
  BEFORE UPDATE ON residency_site_mentor_evaluations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
