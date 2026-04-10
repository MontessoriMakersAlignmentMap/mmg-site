import type { CurriculumFilters } from './types'

type SupabaseClient = any

// ─── Curriculum queries ────────────────────────────────────────────────────

export async function getLessons(supabase: SupabaseClient, filters?: CurriculumFilters) {
  let query = supabase
    .from('residency_lessons')
    .select('*, strand:residency_strands(*), level:residency_levels(*), category:residency_categories(*)')
    .eq('status', 'published')
    .order('sort_order')

  if (filters?.strand) {
    query = query.eq('strand:residency_strands.slug', filters.strand)
  }
  if (filters?.level) {
    query = query.eq('level:residency_levels.slug', filters.level)
  }
  if (filters?.category) {
    query = query.eq('category:residency_categories.slug', filters.category)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getLesson(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from('residency_lessons')
    .select('*, strand:residency_strands(*), level:residency_levels(*), category:residency_categories(*)')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getStrands(supabase: SupabaseClient) {
  const { data } = await supabase
    .from('residency_strands')
    .select('*')
    .order('sort_order')
  return data ?? []
}

export async function getLevels(supabase: SupabaseClient) {
  const { data } = await supabase
    .from('residency_levels')
    .select('*')
    .order('sort_order')
  return data ?? []
}

export async function getCategories(supabase: SupabaseClient) {
  const { data } = await supabase
    .from('residency_categories')
    .select('*')
    .order('sort_order')
  return data ?? []
}

// ─── Assignment queries ────────────────────────────────────────────────────

export async function getResidentAssignments(supabase: SupabaseClient, residentId: string) {
  const { data, error } = await supabase
    .from('residency_assignments')
    .select('*, lesson:residency_lessons(*, strand:residency_strands(*), level:residency_levels(*), category:residency_categories(*))')
    .eq('resident_id', residentId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// ─── Album entry queries ───────────────────────────────────────────────────

export async function getAlbumEntries(supabase: SupabaseClient, residentId: string) {
  const { data, error } = await supabase
    .from('residency_album_entries')
    .select('*, lesson:residency_lessons(*), feedback:residency_feedback(*, mentor:residency_profiles(*))')
    .eq('resident_id', residentId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getAlbumEntry(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from('residency_album_entries')
    .select('*, lesson:residency_lessons(*), feedback:residency_feedback(*, mentor:residency_profiles(*))')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// ─── Progress queries ──────────────────────────────────────────────────────

export async function getResidentProgress(supabase: SupabaseClient, residentId: string) {
  const { data: strands } = await supabase
    .from('residency_strands')
    .select('*')
    .order('sort_order')

  const { data: assignments } = await supabase
    .from('residency_assignments')
    .select('*, lesson:residency_lessons(strand_id)')
    .eq('resident_id', residentId)

  if (!strands) return []

  return strands.map((strand: any) => {
    const strandAssignments = (assignments ?? []).filter(
      (a: any) => a.lesson?.strand_id === strand.id
    )
    return {
      strand_id: strand.id,
      strand_name: strand.name,
      total_lessons: strandAssignments.length,
      completed: strandAssignments.filter((a: any) => a.status === 'completed').length,
      in_progress: strandAssignments.filter((a: any) => ['in_progress', 'submitted', 'reviewed'].includes(a.status)).length,
      not_started: strandAssignments.filter((a: any) => a.status === 'assigned').length,
    }
  })
}

// ─── Admin queries ─────────────────────────────────────────────────────────

export async function getAllResidents(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('residency_residents')
    .select('*, profile:residency_profiles(*), mentor:residency_profiles!residency_residents_mentor_id_fkey(*)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getAllLessons(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('residency_lessons')
    .select('*, strand:residency_strands(*), level:residency_levels(*), category:residency_categories(*)')
    .order('sort_order')

  if (error) throw error
  return data
}

// ─── Mentor queries ────────────────────────────────────────────────────────

export async function getMentorResidents(supabase: SupabaseClient, mentorId: string) {
  const { data, error } = await supabase
    .from('residency_residents')
    .select('*, profile:residency_profiles(*)')
    .eq('mentor_id', mentorId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getPendingSubmissions(supabase: SupabaseClient, mentorId: string) {
  const { data, error } = await supabase
    .from('residency_album_entries')
    .select('*, lesson:residency_lessons(*), resident:residency_residents!inner(*, profile:residency_profiles(*))')
    .eq('status', 'submitted')
    .eq('resident.mentor_id', mentorId)
    .order('submitted_at', { ascending: true })

  if (error) throw error
  return data
}
