import { supabase } from '@/lib/supabase/client'
import { createServerClient } from '@/lib/supabase/server'
import type { GuideProfile, GuideProfileInsert } from '@/lib/types/matchhub'

export async function submitGuideProfile(data: GuideProfileInsert): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('guide_profiles')
    .insert({ ...data, status: 'pending' })
  return { error: error?.message ?? null }
}

export async function getAllProfilesAdmin(): Promise<GuideProfile[]> {
  const client = createServerClient()
  const { data, error } = await client
    .from('guide_profiles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('getAllProfilesAdmin error:', error.message)
    return []
  }
  return data ?? []
}

export async function updateProfileStatus(
  id: string,
  status: 'approved' | 'rejected'
): Promise<{ error: string | null }> {
  const client = createServerClient()
  const { error } = await client
    .from('guide_profiles')
    .update({ status })
    .eq('id', id)
  return { error: error?.message ?? null }
}

export async function getApprovedGuideProfiles(): Promise<GuideProfile[]> {
  const client = createServerClient()
  const { data, error } = await client
    .from('guide_profiles')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('getApprovedGuideProfiles error:', error.message)
    return []
  }
  return data ?? []
}
