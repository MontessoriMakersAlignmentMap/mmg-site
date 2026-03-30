import { createServerClient, createServiceClient } from '@/lib/supabase/server'
import type { TalentProfile, TalentProfileInsert, PublicTalentProfile } from '@/lib/types/talent-pool'

// Only these columns are safe to expose publicly
const PUBLIC_COLUMNS = [
  'id', 'candidate_id', 'display_title', 'training', 'years_experience',
  'levels', 'region', 'open_to_relocate', 'public_summary', 'tags', 'photo_url',
].join(', ')

// ─── Public ───────────────────────────────────────────────────────────────────

/** Active profiles — anonymized public fields only, no PII */
export async function getActiveTalentProfiles(): Promise<PublicTalentProfile[]> {
  const client = createServerClient()
  const { data, error } = await client
    .from('talent_pool')
    .select(PUBLIC_COLUMNS)
    .eq('active', true)
    .order('created_at', { ascending: false })
  if (error) { console.error('getActiveTalentProfiles:', error.message); return [] }
  return (data ?? []) as unknown as PublicTalentProfile[]
}

// ─── Admin ────────────────────────────────────────────────────────────────────

/** All profiles including private fields — admin only */
export async function getAllTalentProfilesAdmin(): Promise<TalentProfile[]> {
  const client = createServiceClient()
  const { data, error } = await client
    .from('talent_pool')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) { console.error('getAllTalentProfilesAdmin:', error.message); return [] }
  return (data ?? []) as TalentProfile[]
}

export async function createTalentProfile(
  data: TalentProfileInsert
): Promise<{ id: string | null; error: string | null }> {
  const client = createServiceClient()
  const { data: row, error } = await client
    .from('talent_pool')
    .insert(data)
    .select('id')
    .single()
  return { id: row?.id ?? null, error: error?.message ?? null }
}

export async function updateTalentProfile(
  id: string,
  data: Partial<TalentProfileInsert>
): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client.from('talent_pool').update(data).eq('id', id)
  return { error: error?.message ?? null }
}

export async function deleteTalentProfile(id: string): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client.from('talent_pool').delete().eq('id', id)
  return { error: error?.message ?? null }
}
