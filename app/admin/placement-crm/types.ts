// ── Shared CRM types & constants ────────────────────────────────────────────

export type CRMCandidate = {
  id: string
  created_at: string
  full_name: string
  email: string | null
  phone: string | null
  location_city: string | null
  location_state: string | null
  credential: string | null
  training_program: string | null
  levels_certified: string[] | null
  languages: string[] | null
  years_experience: number | null
  actively_looking: boolean
  source: string | null
  source_detail: string | null
  resume_url: string | null
  linkedin_url: string | null
  notes: string | null
  added_by: string | null
  role_types: string[] | null
  open_to_role_types: string[] | null
  email_enriched: boolean
  enrichment_source: string | null
}

export type CRMSearch = {
  id: string
  created_at: string
  school_name: string
  position_title: string
  level: string | null
  location_city: string | null
  location_state: string | null
  start_date: string | null
  target_fill_date: string | null
  status: string
  fee_notes: string | null
  school_contact_name: string | null
  school_contact_email: string | null
  notes: string | null
  pipeline_count?: number
}

export type CRMPipelineEntry = {
  id: string
  created_at: string
  candidate_id: string
  search_id: string
  date_applied: string | null
  resume_reviewed: boolean
  resume_reviewed_date: string | null
  contacted: boolean
  contacted_date: string | null
  screener_completed: boolean
  screener_date: string | null
  proceed_to_interview: boolean | null
  interview_date: string | null
  interview_score: number | null
  reference_check_complete: boolean
  recommendable: boolean | null
  placed: boolean
  placed_date: string | null
  disposition: string | null
  disposition_notes: string | null
  // joined
  candidate_name?: string
  candidate_credential?: string
  candidate_levels?: string[]
  search_school_name?: string
  search_position?: string
  search_level?: string
}

export type CRMInterviewNote = {
  id: string
  pipeline_id: string
  candidate_id: string
  question_category: string | null
  question_text: string | null
  response_notes: string | null
  created_at: string
}

export type CRMReference = {
  id: string
  candidate_id: string
  reference_name: string | null
  reference_phone: string | null
  reference_email: string | null
  relationship: string | null
  how_long_known: string | null
  would_rehire: boolean | null
  comfortable_with_children: boolean | null
  work_habits_notes: string | null
  fit_notes: string | null
  abuse_prevention_notes: string | null
  overall_notes: string | null
  checked_date: string | null
  checked_by: string | null
}

// ── Constants ────────────────────────────────────────────────────────────────

export const CREDENTIALS = ['AMI', 'AMS', 'MACTE', 'State Certified', 'In Training', 'None'] as const
export const LEVELS = ['Infant/Toddler', 'Primary', 'Lower Elementary', 'Upper Elementary', 'Middle School'] as const
export const SOURCES = ['Indeed', 'LinkedIn', 'Headhunt', 'Direct Application', 'MatchHub', 'Referral', 'Other'] as const
export const DISPOSITIONS = ['Placed', 'Not Recommended', 'Withdrew', 'No Response', 'Position Filled by Other', 'On Hold'] as const
export const SEARCH_STATUSES = ['active', 'filled', 'closed', 'on hold'] as const
export const ROLE_TYPES = [
  'Assistant',
  'Lead Guide',
  'Specialist',
  'School Leader',
  'Operations',
  'Marketing and Communications',
  'Curriculum',
  'Consultant',
  'Trainer',
  'Other',
] as const
export const QUESTION_CATEGORIES = [
  'Opening and Relationship Building',
  'Mission and Values Alignment',
  'Montessori Philosophy in Practice',
  'Classroom and Environment',
  'Diversity Equity and Inclusion',
  'Conflict and Challenge',
  'Closing',
] as const

export const KANBAN_STAGES = [
  'Applied',
  'Resume Reviewed',
  'Contacted',
  'Screener Done',
  'Interview Scheduled',
  'Interview Complete',
  'Reference Check',
  'Decision',
] as const

export type KanbanStage = (typeof KANBAN_STAGES)[number]

// ── Stage derivation ─────────────────────────────────────────────────────────

export function getPipelineStage(p: CRMPipelineEntry): KanbanStage {
  if (p.placed || p.disposition) return 'Decision'
  if (p.reference_check_complete) return 'Reference Check'
  if (p.interview_score !== null && p.interview_score !== undefined) return 'Interview Complete'
  if (p.proceed_to_interview && p.interview_date) return 'Interview Scheduled'
  if (p.screener_completed) return 'Screener Done'
  if (p.contacted) return 'Contacted'
  if (p.resume_reviewed) return 'Resume Reviewed'
  return 'Applied'
}

// Updates to apply when dropping a card into a target stage
export function stageDropUpdates(stage: KanbanStage): Partial<CRMPipelineEntry> {
  const today = new Date().toISOString().slice(0, 10)
  switch (stage) {
    case 'Applied':
      return { resume_reviewed: false, contacted: false, screener_completed: false, proceed_to_interview: null, interview_score: null, reference_check_complete: false, placed: false, disposition: null }
    case 'Resume Reviewed':
      return { resume_reviewed: true, resume_reviewed_date: today }
    case 'Contacted':
      return { resume_reviewed: true, contacted: true, contacted_date: today }
    case 'Screener Done':
      return { resume_reviewed: true, contacted: true, screener_completed: true, screener_date: today }
    case 'Interview Scheduled':
      return { screener_completed: true, proceed_to_interview: true }
    case 'Interview Complete':
      return { proceed_to_interview: true, interview_score: 0 }
    case 'Reference Check':
      return { reference_check_complete: true }
    case 'Decision':
      return {}
    default:
      return {}
  }
}
