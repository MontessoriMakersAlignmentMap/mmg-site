export type JobStatus = 'pending' | 'approved' | 'rejected' | 'archived'
export type ProfileStatus = 'pending' | 'approved' | 'rejected'

export type Job = {
  id: string
  school_name: string
  contact_name: string
  contact_email: string
  job_title: string
  level: string
  location: string
  start_date: string | null
  credential: string
  compensation: string
  employment_type: string
  school_type: string
  school_description: string
  job_summary: string
  application_link: string
  plan_type: string
  payment_status: 'unpaid' | 'paid' | null
  status: JobStatus
  approved_at: string | null
  expires_at: string | null
  notes: string | null
  source: string | null
  created_at: string
}

export type GuideProfile = {
  id: string
  first_name: string
  last_initial: string
  email: string
  location: string
  open_to_relocate: string
  role_type: string | null
  levels: string[]
  credential: string
  years_experience: number
  summary: string
  tags: string[]
  leadership_experience: boolean
  bilingual: boolean
  public_montessori: boolean
  resume_url: string | null
  photo_url: string | null
  status: ProfileStatus
  source: string | null
  open_to_placement: boolean
  created_at: string
}

export type JobInsert = Omit<Job, 'id' | 'created_at' | 'status' | 'payment_status' | 'approved_at' | 'expires_at' | 'notes'>
export type GuideProfileInsert = Omit<GuideProfile, 'id' | 'created_at' | 'status'> & {
  open_to_placement?: boolean
}
