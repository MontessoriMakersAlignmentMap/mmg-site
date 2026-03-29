import { supabase } from '@/lib/supabase/client'
import { createServerClient, createServiceClient } from '@/lib/supabase/server'
import type { Job, JobInsert } from '@/lib/types/matchhub'

// ─── Public: insert new job ───────────────────────────────────────────────────

export async function submitJob(data: JobInsert): Promise<{ id: string | null; error: string | null }> {
  const { data: rows, error } = await supabase
    .from('jobs')
    .insert({ ...data, status: 'pending', payment_status: 'unpaid' })
    .select('id')
    .single()
  return { id: rows?.id ?? null, error: error?.message ?? null }
}

// ─── Server: update payment status after Stripe verification ─────────────────

export async function updateJobPaymentStatus(
  jobId: string,
  paymentStatus: 'paid' | 'unpaid'
): Promise<{ error: string | null }> {
  const client = createServiceClient()
  const { error } = await client
    .from('jobs')
    .update({ payment_status: paymentStatus })
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
