export type TalentProfile = {
  id: string
  candidate_id: string
  // ── internal ──────────────────────────────────────────────────────────────
  full_name: string | null
  internal_email: string | null
  resume_url: string | null
  private_notes: string | null
  // ── public ────────────────────────────────────────────────────────────────
  display_title: string | null
  training: string | null
  years_experience: string | null
  levels: string[]
  region: string | null
  open_to_relocate: boolean
  public_summary: string | null
  tags: string[]
  photo_url: string | null
  // ── control ───────────────────────────────────────────────────────────────
  active: boolean
  created_at: string
}

/** Fields safe to expose publicly (no PII) */
export type PublicTalentProfile = Pick<
  TalentProfile,
  | 'id'
  | 'candidate_id'
  | 'display_title'
  | 'training'
  | 'years_experience'
  | 'levels'
  | 'region'
  | 'open_to_relocate'
  | 'public_summary'
  | 'tags'
  | 'photo_url'
>

export type TalentProfileInsert = Omit<TalentProfile, 'id' | 'created_at'>
