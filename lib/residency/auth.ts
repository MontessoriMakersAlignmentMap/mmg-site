import type { ResidencyProfile, ResidencyRole } from './types'

type SupabaseClient = any

// Server-side: get the current user's residency profile
export async function getResidencyProfile(supabase: SupabaseClient) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('residency_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return data as ResidencyProfile | null
}

// Check if a profile has a specific role
export function hasRole(profile: ResidencyProfile | null, ...roles: ResidencyRole[]): boolean {
  if (!profile) return false
  return roles.includes(profile.role)
}

// Get the resident record for a profile
export async function getResidentRecord(supabase: SupabaseClient, profileId: string) {
  const { data } = await supabase
    .from('residency_residents')
    .select('*, profile:residency_profiles(*), mentor:residency_profiles!residency_residents_mentor_id_fkey(*)')
    .eq('profile_id', profileId)
    .single()

  return data
}
