-- ============================================================================
-- Virtual Observation Workflow
-- Allows residents to submit classroom recordings for Cohort Guide review
-- ============================================================================

-- ─── 1. Virtual Observations Table ─────────────────────────────────────────

CREATE TABLE residency_virtual_observations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id uuid NOT NULL REFERENCES residency_residents(id),

  -- Submission fields (resident)
  observation_date date NOT NULL,
  recording_link text NOT NULL,
  recording_duration_minutes integer NOT NULL CHECK (recording_duration_minutes >= 90),
  context_note text NOT NULL,
  family_consent_confirmed boolean NOT NULL DEFAULT false,

  -- Review fields (Cohort Guide)
  reviewer_id uuid REFERENCES residency_profiles(id),
  review_status text NOT NULL DEFAULT 'pending_review'
    CHECK (review_status IN ('pending_review', 'in_progress', 'feedback_submitted')),

  -- Rubric (same structure as in-person observation_forms)
  observation_focus text,
  indicators_present text[] DEFAULT '{}',
  observation_notes text,
  specific_evidence text,
  suggested_next_steps text,
  summary_feedback text,

  -- Overall readiness rating
  overall_readiness text
    CHECK (overall_readiness IN ('developing_as_expected', 'needs_additional_support', 'exceeding_expectations')),

  -- Written feedback from Cohort Guide
  written_feedback text,

  feedback_submitted_at timestamptz,

  -- Resident reflection
  resident_reflection text,
  reflection_submitted_at timestamptz,

  -- Timestamps
  submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX idx_virtual_obs_resident ON residency_virtual_observations(resident_id);
CREATE INDEX idx_virtual_obs_reviewer ON residency_virtual_observations(reviewer_id);
CREATE INDEX idx_virtual_obs_status ON residency_virtual_observations(review_status);

ALTER TABLE residency_virtual_observations ENABLE ROW LEVEL SECURITY;

-- Residents can insert their own virtual observations
CREATE POLICY "virtual_obs_insert_own"
  ON residency_virtual_observations FOR INSERT
  TO authenticated
  WITH CHECK (resident_id IN (SELECT id FROM residency_residents WHERE profile_id = auth.uid()));

-- Residents can view their own virtual observations
CREATE POLICY "virtual_obs_select_own"
  ON residency_virtual_observations FOR SELECT
  TO authenticated
  USING (resident_id IN (SELECT id FROM residency_residents WHERE profile_id = auth.uid()));

-- Residents can update their own (for reflection submission)
CREATE POLICY "virtual_obs_update_own"
  ON residency_virtual_observations FOR UPDATE
  TO authenticated
  USING (resident_id IN (SELECT id FROM residency_residents WHERE profile_id = auth.uid()))
  WITH CHECK (resident_id IN (SELECT id FROM residency_residents WHERE profile_id = auth.uid()));

-- Mentors can view observations for their assigned residents
CREATE POLICY "virtual_obs_select_mentor"
  ON residency_virtual_observations FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM residency_residents r
    WHERE r.id = resident_id AND r.mentor_id = auth.uid()
  ));

-- Mentors can update observations they are reviewing
CREATE POLICY "virtual_obs_update_mentor"
  ON residency_virtual_observations FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM residency_residents r
    WHERE r.id = resident_id AND r.mentor_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM residency_residents r
    WHERE r.id = resident_id AND r.mentor_id = auth.uid()
  ));

-- Admins can do everything
CREATE POLICY "virtual_obs_admin_all"
  ON residency_virtual_observations FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─── 2. Practicum Exceptions Table ─────────────────────────────────────────

CREATE TABLE residency_practicum_exceptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id uuid NOT NULL REFERENCES residency_residents(id),
  exception_reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'declined')),
  admin_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz
);

CREATE INDEX idx_practicum_exceptions_resident ON residency_practicum_exceptions(resident_id);
CREATE INDEX idx_practicum_exceptions_status ON residency_practicum_exceptions(status);

ALTER TABLE residency_practicum_exceptions ENABLE ROW LEVEL SECURITY;

-- Residents can insert their own exceptions
CREATE POLICY "practicum_exceptions_insert_own"
  ON residency_practicum_exceptions FOR INSERT
  TO authenticated
  WITH CHECK (resident_id IN (SELECT id FROM residency_residents WHERE profile_id = auth.uid()));

-- Residents can view their own exceptions
CREATE POLICY "practicum_exceptions_select_own"
  ON residency_practicum_exceptions FOR SELECT
  TO authenticated
  USING (resident_id IN (SELECT id FROM residency_residents WHERE profile_id = auth.uid()));

-- Admins can do everything
CREATE POLICY "practicum_exceptions_admin_all"
  ON residency_practicum_exceptions FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─── 3. Trigger for updated_at ──────────────────────────────────────────────

CREATE TRIGGER update_virtual_observations_updated_at
  BEFORE UPDATE ON residency_virtual_observations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
