-- ============================================================================
-- Auth & Dashboard Enhancements
-- Adds assigned level, mentor notes, feedback read tracking
-- 2026-04-10
-- ============================================================================

-- ─── Assigned level for residents ─────────────────────────────────────────
-- Which curriculum level this resident is enrolled in (Primary or Elementary)

ALTER TABLE residency_residents
  ADD COLUMN IF NOT EXISTS assigned_level_id uuid REFERENCES residency_levels(id);

-- ─── Mentor notes on resident ─────────────────────────────────────────────
-- General notes a mentor leaves on a resident's profile (visible to resident and admin)

ALTER TABLE residency_residents
  ADD COLUMN IF NOT EXISTS mentor_notes text;

-- ─── Feedback read tracking ───────────────────────────────────────────────
-- So residents can see which feedback is new

ALTER TABLE residency_feedback
  ADD COLUMN IF NOT EXISTS read_at timestamptz;

-- ─── Mentor notes field on album entries ──────────────────────────────────
-- Notes a resident wants to flag for their mentor when submitting

ALTER TABLE residency_album_entries
  ADD COLUMN IF NOT EXISTS resident_notes text;

-- ─── Last accessed tracking for lessons ───────────────────────────────────

ALTER TABLE residency_assignments
  ADD COLUMN IF NOT EXISTS last_accessed_at timestamptz;

-- ─── RLS: allow residents to insert their own profile ─────────────────────

CREATE POLICY IF NOT EXISTS "Insert own profile" ON residency_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ─── RLS: allow residents to insert their own resident record ─────────────

CREATE POLICY IF NOT EXISTS "Insert own resident record" ON residency_residents
  FOR INSERT WITH CHECK (profile_id = auth.uid());

-- ─── RLS: allow mentors to update their mentees ──────────────────────────

CREATE POLICY IF NOT EXISTS "Mentor update mentee" ON residency_residents
  FOR UPDATE USING (mentor_id = auth.uid());

-- ─── RLS: allow residents to update feedback read status ──────────────────

CREATE POLICY IF NOT EXISTS "Resident mark feedback read" ON residency_feedback
  FOR UPDATE USING (
    album_entry_id IN (
      SELECT ae.id FROM residency_album_entries ae
      JOIN residency_residents r ON ae.resident_id = r.id
      WHERE r.profile_id = auth.uid()
    )
  );
