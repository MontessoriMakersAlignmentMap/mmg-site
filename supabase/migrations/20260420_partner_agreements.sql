-- Partner School Agreement with Site Mentor Addendum
CREATE TABLE residency_partner_agreements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id uuid NOT NULL REFERENCES residency_placement_sites(id),
  resident_id uuid REFERENCES residency_residents(id),
  academic_year text NOT NULL,

  -- Site Mentor info
  site_mentor_name text,
  site_mentor_email text,
  site_mentor_phone text,
  site_mentor_qualifications text,
  site_mentor_years_experience integer,
  site_mentor_montessori_credential text,

  -- Agreement status
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'sent', 'signed', 'expired')),

  -- Signatures
  school_signatory_name text,
  school_signatory_title text,
  school_signed_at timestamptz,
  mmr_signed_at timestamptz,
  site_mentor_signed_at timestamptz,

  -- Stipend
  stipend_amount_per_semester numeric(8,2),
  stipend_structure text,

  -- Recording consent
  recording_consent_confirmed boolean DEFAULT false,
  recording_consent_note text,

  -- Employment confirmation
  resident_employment_confirmed boolean DEFAULT false,
  resident_employment_role text,
  resident_employment_hours_per_week numeric(4,1),

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_partner_agreements_site ON residency_partner_agreements(site_id);
CREATE INDEX idx_partner_agreements_resident ON residency_partner_agreements(resident_id);
CREATE INDEX idx_partner_agreements_status ON residency_partner_agreements(status);

ALTER TABLE residency_partner_agreements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "partner_agreements_admin_all"
  ON residency_partner_agreements FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM residency_profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "partner_agreements_resident_view"
  ON residency_partner_agreements FOR SELECT
  TO authenticated
  USING (resident_id IN (SELECT id FROM residency_residents WHERE profile_id = auth.uid()));

CREATE POLICY "partner_agreements_mentor_view"
  ON residency_partner_agreements FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM residency_residents r
    WHERE r.id = resident_id AND r.mentor_id = auth.uid()
  ));

CREATE TRIGGER update_partner_agreements_updated_at
  BEFORE UPDATE ON residency_partner_agreements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
