import { createServerClient, createServiceClient } from '@/lib/supabase/server'
import type { Partner, PartnerInsert } from '@/lib/types/partners'

// ─── Public ───────────────────────────────────────────────────────────────────

export async function getPublishedPartners(): Promise<Partner[]> {
  const client = createServiceClient()
  const { data, error } = await client
    .from('partners')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true })
  if (error) { console.error('getPublishedPartners:', error.message); return [] }
  return (data ?? []) as Partner[]
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export async function getAllPartnersAdmin(): Promise<Partner[]> {
  const client = createServiceClient()
  const { data, error } = await client
    .from('partners')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) { console.error('getAllPartnersAdmin:', error.message); return [] }
  return (data ?? []) as Partner[]
}

export async function createPartner(
  data: PartnerInsert
): Promise<{ id: string | null; error: string | null }> {
  const client = createServiceClient()
  const { data: row, error } = await client
    .from('partners')
    .insert(data)
    .select('id')
    .single()
  return { id: row?.id ?? null, error: error?.message ?? null }
}

export async function updatePartner(
  id: string,
  data: Partial<PartnerInsert>
): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client.from('partners').update(data).eq('id', id)
  return { error: error?.message ?? null }
}

export async function deletePartner(id: string): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client.from('partners').delete().eq('id', id)
  return { error: error?.message ?? null }
}
