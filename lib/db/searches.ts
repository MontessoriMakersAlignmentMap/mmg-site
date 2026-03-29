import { createServerClient, createServiceClient } from '@/lib/supabase/server'
import type { Search, SearchRole, SearchInsert, SearchRoleInsert } from '@/lib/types/searches'

// ─── Public ───────────────────────────────────────────────────────────────────

/** All active searches with their active roles — for the public page */
export async function getActiveSearches(): Promise<Search[]> {
  const client = createServerClient()
  const { data, error } = await client
    .from('searches')
    .select('*, roles:search_roles(*)')
    .eq('active', true)
    .order('created_at', { ascending: false })
  if (error) { console.error('getActiveSearches:', error.message); return [] }
  return (data ?? []).map(s => ({
    ...s,
    roles: ((s.roles ?? []) as SearchRole[]).filter(r => r.active),
  }))
}

/** Single active search by slug with active roles */
export async function getSearchBySlug(schoolSlug: string): Promise<Search | null> {
  const client = createServerClient()
  const { data, error } = await client
    .from('searches')
    .select('*, roles:search_roles(*)')
    .eq('school_slug', schoolSlug)
    .eq('active', true)
    .single()
  if (error || !data) return null
  return {
    ...data,
    roles: ((data.roles ?? []) as SearchRole[]).filter(r => r.active),
  }
}

/** Single role by school slug + role slug (no active filter — used for detail page) */
export async function getRoleBySlug(
  schoolSlug: string,
  roleSlug: string
): Promise<{ search: Search; role: SearchRole } | null> {
  const client = createServerClient()
  const { data, error } = await client
    .from('searches')
    .select('*, roles:search_roles(*)')
    .eq('school_slug', schoolSlug)
    .single()
  if (error || !data) return null
  const role = ((data.roles ?? []) as SearchRole[]).find(r => r.role_slug === roleSlug)
  if (!role) return null
  return { search: data as Search, role }
}

// ─── Admin ────────────────────────────────────────────────────────────────────

/** All searches + all roles (no active filter) */
export async function getAllSearchesAdmin(): Promise<Search[]> {
  const client = createServiceClient()
  const { data, error } = await client
    .from('searches')
    .select('*, roles:search_roles(*)')
    .order('created_at', { ascending: false })
  if (error) { console.error('getAllSearchesAdmin:', error.message); return [] }
  return (data ?? []).map(s => ({ ...s, roles: s.roles ?? [] }))
}

export async function createSearch(
  data: SearchInsert
): Promise<{ id: string | null; error: string | null }> {
  const client = createServiceClient()
  const { data: row, error } = await client
    .from('searches')
    .insert(data)
    .select('id')
    .single()
  return { id: row?.id ?? null, error: error?.message ?? null }
}

export async function updateSearch(
  id: string,
  data: Partial<SearchInsert>
): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client.from('searches').update(data).eq('id', id)
  return { error: error?.message ?? null }
}

/** Deletes the search — search_roles cascade automatically */
export async function deleteSearch(id: string): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client.from('searches').delete().eq('id', id)
  return { error: error?.message ?? null }
}

export async function createSearchRole(
  data: SearchRoleInsert
): Promise<{ id: string | null; error: string | null }> {
  const client = createServiceClient()
  const { data: row, error } = await client
    .from('search_roles')
    .insert(data)
    .select('id')
    .single()
  return { id: row?.id ?? null, error: error?.message ?? null }
}

export async function updateSearchRole(
  id: string,
  data: Partial<SearchRoleInsert>
): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client.from('search_roles').update(data).eq('id', id)
  return { error: error?.message ?? null }
}

export async function deleteSearchRole(id: string): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client.from('search_roles').delete().eq('id', id)
  return { error: error?.message ?? null }
}
