// ─── Residency Platform Types ──────────────────────────────────────────────

export type ResidencyRole = 'resident' | 'mentor' | 'instructor' | 'admin' | 'school_partner'
export type LessonStatus = 'draft' | 'published' | 'archived'
export type AssignmentStatus = 'assigned' | 'in_progress' | 'submitted' | 'reviewed' | 'completed'
export type AlbumEntryStatus = 'draft' | 'submitted' | 'reviewed' | 'approved' | 'revision_requested'
export type ResidentStatus = 'enrolled' | 'active' | 'on_leave' | 'completed' | 'withdrawn'

export interface Strand {
  id: string
  name: string
  slug: string
  description: string | null
  sort_order: number
}

export interface Level {
  id: string
  name: string
  slug: string
  age_range: string | null
  sort_order: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  sort_order: number
  strand_id: string | null
}

export interface ResidencyProfile {
  id: string
  role: ResidencyRole
  first_name: string
  last_name: string
  email: string
  phone: string | null
  bio: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Resident {
  id: string
  profile_id: string
  status: ResidentStatus
  cohort: string | null
  enrollment_date: string
  expected_completion: string | null
  mentor_id: string | null
  notes: string | null
  created_at: string
  updated_at: string
  profile?: ResidencyProfile
  mentor?: ResidencyProfile
}

export interface Lesson {
  id: string
  title: string
  slug: string
  description: string | null
  content: string | null
  strand_id: string
  level_id: string
  category_id: string
  status: LessonStatus
  objectives: string[] | null
  materials: string[] | null
  file_urls: string[] | null
  sort_order: number
  age_range: string | null
  why_this_lesson_matters: string | null
  direct_aim: string | null
  indirect_aim: string | null
  equity_aim: string | null
  presentation: string | null
  points_of_interest: string | null
  variations: string | null
  neurodivergence_notes: string | null
  created_by: string | null
  created_at: string
  updated_at: string
  strand?: Strand
  level?: Level
  category?: Category
}

export interface Assignment {
  id: string
  resident_id: string
  lesson_id: string
  assigned_by: string | null
  status: AssignmentStatus
  due_date: string | null
  started_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
  lesson?: Lesson
  resident?: Resident
}

export interface AlbumEntry {
  id: string
  resident_id: string
  lesson_id: string
  assignment_id: string | null
  title: string
  content: string | null
  file_urls: string[] | null
  status: AlbumEntryStatus
  submitted_at: string | null
  created_at: string
  updated_at: string
  lesson?: Lesson
  feedback?: Feedback[]
}

export interface Feedback {
  id: string
  album_entry_id: string
  mentor_id: string
  content: string
  created_at: string
  updated_at: string
  mentor?: ResidencyProfile
}

// ─── API helpers ───────────────────────────────────────────────────────────

export interface CurriculumFilters {
  strand?: string
  level?: string
  category?: string
}

export interface ProgressSummary {
  strand_id: string
  strand_name: string
  total_lessons: number
  completed: number
  in_progress: number
  not_started: number
}
