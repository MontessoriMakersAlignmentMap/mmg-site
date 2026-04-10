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
    query = query.eq('strand_id', filters.strand)
  }
  if (filters?.level) {
    query = query.eq('level_id', filters.level)
  }
  if (filters?.category) {
    query = query.eq('category_id', filters.category)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getLessonsByStrand(supabase: SupabaseClient, strandId: string) {
  const { data, error } = await supabase
    .from('residency_lessons')
    .select('*, strand:residency_strands(*), level:residency_levels(*), category:residency_categories(*)')
    .eq('strand_id', strandId)
    .eq('status', 'published')
    .order('sort_order')

  if (error) throw error
  return data ?? []
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

export async function getAdjacentLessons(supabase: SupabaseClient, lesson: { strand_id: string; category_id: string; sort_order: number }) {
  const [prevResult, nextResult] = await Promise.all([
    supabase
      .from('residency_lessons')
      .select('id, title, sort_order')
      .eq('strand_id', lesson.strand_id)
      .eq('category_id', lesson.category_id)
      .eq('status', 'published')
      .lt('sort_order', lesson.sort_order)
      .order('sort_order', { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from('residency_lessons')
      .select('id, title, sort_order')
      .eq('strand_id', lesson.strand_id)
      .eq('category_id', lesson.category_id)
      .eq('status', 'published')
      .gt('sort_order', lesson.sort_order)
      .order('sort_order')
      .limit(1)
      .single(),
  ])

  return {
    prev: prevResult.data ?? null,
    next: nextResult.data ?? null,
  }
}

export async function getStrands(supabase: SupabaseClient) {
  const { data } = await supabase
    .from('residency_strands')
    .select('*')
    .order('sort_order')
  return data ?? []
}

export async function getStrandBySlug(supabase: SupabaseClient, slug: string) {
  const { data, error } = await supabase
    .from('residency_strands')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
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

export async function getCategoriesByStrand(supabase: SupabaseClient, strandId: string) {
  const { data } = await supabase
    .from('residency_categories')
    .select('*')
    .eq('strand_id', strandId)
    .order('sort_order')
  return data ?? []
}

export async function getLevelBySlug(supabase: SupabaseClient, slug: string) {
  const { data, error } = await supabase
    .from('residency_levels')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export async function getStrandsWithCounts(supabase: SupabaseClient, levelId?: string) {
  const { data: strands } = await supabase
    .from('residency_strands')
    .select('*')
    .order('sort_order')

  if (!strands) return []

  let lessonsQuery = supabase
    .from('residency_lessons')
    .select('strand_id, level_id')
    .eq('status', 'published')

  if (levelId) {
    lessonsQuery = lessonsQuery.eq('level_id', levelId)
  }

  const { data: lessons } = await lessonsQuery

  const { data: categories } = await supabase
    .from('residency_categories')
    .select('strand_id')

  return strands.map((strand: any) => {
    const strandLessons = (lessons ?? []).filter((l: any) => l.strand_id === strand.id)
    const strandCategories = (categories ?? []).filter((c: any) => c.strand_id === strand.id)

    return {
      ...strand,
      lesson_count: strandLessons.length,
      category_count: strandCategories.length,
    }
  })
}

export async function getLessonsByStrandAndLevel(supabase: SupabaseClient, strandId: string, levelId: string) {
  const { data, error } = await supabase
    .from('residency_lessons')
    .select('*, strand:residency_strands(*), level:residency_levels(*), category:residency_categories(*)')
    .eq('strand_id', strandId)
    .eq('level_id', levelId)
    .eq('status', 'published')
    .order('sort_order')

  if (error) throw error
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
