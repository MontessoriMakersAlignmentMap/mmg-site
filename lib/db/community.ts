import { createServerClient, createServiceClient } from '@/lib/supabase/server'
import type { CommunityOrg, CommunityOrgInsert } from '@/lib/types/community'

// ─── Public ───────────────────────────────────────────────────────────────────

export async function getPublishedCommunityOrgs(): Promise<CommunityOrg[]> {
  const client = createServerClient()
  const { data, error } = await client
    .from('community_organizations')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true })
    .order('name', { ascending: true })
  if (error) { console.error('getPublishedCommunityOrgs:', error.message); return [] }
  return (data ?? []) as unknown as CommunityOrg[]
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export async function getAllCommunityOrgsAdmin(): Promise<CommunityOrg[]> {
  const client = createServiceClient()
  const { data, error } = await client
    .from('community_organizations')
    .select('*')
    .order('display_order', { ascending: true })
    .order('name', { ascending: true })
  if (error) { console.error('getAllCommunityOrgsAdmin:', error.message); return [] }
  return (data ?? []) as unknown as CommunityOrg[]
}

export async function createCommunityOrg(
  data: CommunityOrgInsert
): Promise<{ id: string | null; error: string | null }> {
  const client = createServiceClient()
  const { data: row, error } = await client
    .from('community_organizations')
    .insert(data)
    .select('id')
    .single()
  return { id: row?.id ?? null, error: error?.message ?? null }
}

export async function updateCommunityOrg(
  id: string,
  data: Partial<CommunityOrgInsert>
): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client
    .from('community_organizations')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
  return { error: error?.message ?? null }
}

export async function deleteCommunityOrg(id: string): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client.from('community_organizations').delete().eq('id', id)
  return { error: error?.message ?? null }
}
