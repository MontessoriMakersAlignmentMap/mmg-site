'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ExceptionRequestPage() {
  const { profile } = useResidencyAuth(['resident'])
  const router = useRouter()
  const [residentId, setResidentId] = useState<string | null>(null)
  const [existing, setExisting] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (!profile) return
    async function load() {
      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', profile!.id)
        .single()

      if (resident) {
        setResidentId(resident.id)
        const { data: ex } = await supabase
          .from('residency_practicum_exceptions')
          .select('*')
          .eq('resident_id', resident.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()
        if (ex) setExisting(ex)
      }
      setLoading(false)
    }
    load()
  }, [profile])

  function wordCount(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!residentId) return
    setError('')

    if (wordCount(reason) < 50) {
      setError('Please provide at least 50 words explaining your circumstances.')
      return
    }

    setSaving(true)
    const { error: insertError } = await supabase
      .from('residency_practicum_exceptions')
      .insert({
        resident_id: residentId,
        exception_reason: reason,
      })

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    router.push('/residency/portal/practicum')
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <Link href="/residency/portal/practicum" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Practicum
      </Link>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>All-Virtual Observation Exception</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem', maxWidth: '600px', lineHeight: 1.5 }}>
        MACTE requires at least one in-person observation per year. If your circumstances prevent this, you may request an exception to complete your practicum record with all virtual observations.
      </p>

      {existing && (
        <div className="r-card" style={{
          padding: '1.5rem', marginBottom: '1.5rem',
          borderLeft: '4px solid ' + (existing.status === 'approved' ? 'var(--r-success)' : existing.status === 'declined' ? 'var(--r-error)' : 'var(--r-gold)'),
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1rem' }}>Your Current Request</h2>
            <span style={{
              fontSize: '0.6875rem', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontWeight: 600,
              background: existing.status === 'approved' ? 'var(--r-success-light)' : existing.status === 'declined' ? 'var(--r-error-light)' : '#FEF3C7',
              color: existing.status === 'approved' ? 'var(--r-success)' : existing.status === 'declined' ? 'var(--r-error)' : '#92400E',
            }}>
              {existing.status === 'approved' ? 'Approved' : existing.status === 'declined' ? 'Declined' : 'Pending'}
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', color: 'var(--r-text-muted)' }}>
            {existing.exception_reason}
          </p>
          {existing.admin_note && (
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--r-border)' }}>
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Admin Response</p>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>{existing.admin_note}</p>
            </div>
          )}
          <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.75rem' }}>
            Submitted {new Date(existing.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      )}

      {(!existing || existing.status === 'declined') && (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
          <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Explain Your Circumstances</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Why are you unable to have your Cohort Guide observe in person? Common reasons include geographic distance, school access restrictions, or scheduling conflicts that cannot be resolved within the academic year.
            </p>
            <textarea className="r-textarea" value={reason}
              onChange={e => setReason(e.target.value)} required
              style={{ minHeight: '150px' }}
              placeholder="Describe your specific circumstances..." />
            <p style={{ fontSize: '0.6875rem', color: wordCount(reason) >= 50 ? 'var(--r-success)' : 'var(--r-text-muted)', marginTop: '0.375rem' }}>
              {wordCount(reason)} / 50 words minimum
            </p>
          </div>

          {error && (
            <p style={{ color: 'var(--r-error)', fontSize: '0.8125rem', marginBottom: '1rem', padding: '0.75rem', background: 'var(--r-error-light)', borderRadius: '6px' }}>
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" className="r-btn r-btn-primary" disabled={saving}>
              {saving ? 'Submitting...' : 'Submit Exception Request'}
            </button>
            <Link href="/residency/portal/practicum" className="r-btn r-btn-secondary">Cancel</Link>
          </div>
        </form>
      )}
    </div>
  )
}
