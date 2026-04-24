import { createServerClient, createServiceClient } from '@/lib/supabase/server'
import type { Job, JobInsert } from '@/lib/types/matchhub'

// ─── Public: insert new job ───────────────────────────────────────────────────
// Submits via the /api/submit-job server route (service client) rather than
// calling Supabase directly from the browser. The browser anon key is not
// reliably available as a NEXT_PUBLIC_ env var in all environments, and the
// anon INSERT was returning 401. The API route uses the service key which is
// always present server-side.

export async function submitJob(data: JobInsert): Promise<{ id: string | null; error: string | null }> {
  try {
    const res = await fetch('/api/submit-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok || !json.id) {
      return { id: null, error: json.error ?? 'Submission failed' }
    }
    return { id: json.id, error: null }
  } catch (err) {
    return { id: null, error: err instanceof Error ? err.message : 'Network error' }
  }
}

// ─── Server: update payment status after Stripe verification ─────────────────

export async function updateJobPaymentStatus(
  jobId: string,
  paymentStatus: 'paid' | 'unpaid',
  addOns?: { featured: boolean; social: boolean }
): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const updates: Record<string, unknown> = { payment_status: paymentStatus }
  if (addOns) {
    updates.notes = JSON.stringify({ addOns })
  }
  const { error } = await client
    .from('jobs')
    .update(updates)
    .eq('id', jobId)
  return { error: error?.message ?? null }
}

// ─── Public: fetch approved, paid, non-expired jobs ──────────────────────────

export async function getApprovedJobs(): Promise<Job[]> {
  const client = createServerClient()
  const now = new Date().toISOString()
  const { data, error } = await client
    .from('jobs')
    .select('*')
    .eq('status', 'approved')
    .eq('payment_status', 'paid')
    .gt('expires_at', now)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('getApprovedJobs error:', error.message)
    return []
  }
  return data ?? []
}

// ─── Admin: fetch all jobs (no filters) ──────────────────────────────────────

export async function getAllJobsAdmin(): Promise<Job[]> {
  const client = createServiceClient()
  const { data, error } = await client
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('getAllJobsAdmin error:', error.message)
    return []
  }
  return data ?? []
}

// ─── Admin: approve — sets status, approved_at, expires_at (+30 days) ────────

export async function approveJob(jobId: string): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const now = new Date()
  const expires = new Date(now)
  expires.setDate(expires.getDate() + 30)
  const { error } = await client
    .from('jobs')
    .update({
      status: 'approved',
      approved_at: now.toISOString(),
      expires_at: expires.toISOString(),
    })
    .eq('id', jobId)
  return { error: error?.message ?? null }
}

// ─── Admin: reject ────────────────────────────────────────────────────────────

export async function rejectJob(jobId: string): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client
    .from('jobs')
    .update({ status: 'rejected' })
    .eq('id', jobId)
  return { error: error?.message ?? null }
}

// ─── Admin: archive ───────────────────────────────────────────────────────────

export async function archiveJob(jobId: string): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client
    .from('jobs')
    .update({ status: 'archived' })
    .eq('id', jobId)
  return { error: error?.message ?? null }
}
