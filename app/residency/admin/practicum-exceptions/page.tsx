'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

export default function AdminPracticumExceptionsPage() {
  useResidencyAuth(['admin'])
  const [exceptions, setExceptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('residency_practicum_exceptions')
        .select('*, resident:residency_residents(id, profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name, email))')
        .order('created_at', { ascending: false })

      if (data) setExceptions(data)
      setLoading(false)
    }
    load()
  }, [])

  async function handleDecision(id: string, status: 'approved' | 'declined', adminNote: string) {
    const { error } = await supabase
      .from('residency_practicum_exceptions')
      .update({ status, admin_note: adminNote, reviewed_at: new Date().toISOString() })
      .eq('id', id)

    if (!error) {
      setExceptions(prev => prev.map(e => e.id === id ? { ...e, status, admin_note: adminNote } : e))
    }
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const pending = exceptions.filter(e => e.status === 'pending')
  const resolved = exceptions.filter(e => e.status !== 'pending')

  return (
    <div>
      <Link href="/residency/admin" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Admin
      </Link>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Practicum Exception Requests</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Review requests from residents who need an all-virtual observation record.
      </p>

      {pending.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Pending ({pending.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pending.map(ex => (
              <ExceptionCard key={ex.id} exception={ex} onDecision={handleDecision} />
            ))}
          </div>
        </div>
      )}

      {resolved.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Resolved ({resolved.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {resolved.map(ex => (
              <div key={ex.id} className="r-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                      {ex.resident?.profile?.first_name} {ex.resident?.profile?.last_name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                      {ex.exception_reason.substring(0, 100)}{ex.exception_reason.length > 100 ? '...' : ''}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.6875rem', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontWeight: 600,
                    background: ex.status === 'approved' ? 'var(--r-success-light)' : 'var(--r-error-light)',
                    color: ex.status === 'approved' ? 'var(--r-success)' : 'var(--r-error)',
                  }}>
                    {ex.status === 'approved' ? 'Approved' : 'Declined'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {exceptions.length === 0 && (
        <div className="r-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--r-text-muted)' }}>No exception requests yet.</p>
        </div>
      )}
    </div>
  )
}

function ExceptionCard({ exception, onDecision }: { exception: any; onDecision: (id: string, status: 'approved' | 'declined', note: string) => void }) {
  const [note, setNote] = useState('')
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="r-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--r-gold)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div>
          <p style={{ fontWeight: 600, fontSize: '1rem' }}>
            {exception.resident?.profile?.first_name} {exception.resident?.profile?.last_name}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
            {exception.resident?.profile?.email} · Submitted {new Date(exception.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.375rem' }}>Reason</p>
        <p style={{ fontSize: '0.875rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
          {expanded ? exception.exception_reason : exception.exception_reason.substring(0, 200)}
          {!expanded && exception.exception_reason.length > 200 && (
            <button onClick={() => setExpanded(true)} style={{
              background: 'none', border: 'none', color: 'var(--r-navy)', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 500,
            }}> Read more</button>
          )}
        </p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label className="r-label">Admin Note (optional)</label>
        <textarea className="r-textarea" value={note} onChange={e => setNote(e.target.value)}
          style={{ minHeight: '80px' }}
          placeholder="Add a note explaining your decision..." />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button className="r-btn r-btn-primary" onClick={() => onDecision(exception.id, 'approved', note)}
          style={{ fontSize: '0.8125rem' }}>
          Approve
        </button>
        <button className="r-btn r-btn-secondary" onClick={() => onDecision(exception.id, 'declined', note)}
          style={{ fontSize: '0.8125rem', color: 'var(--r-error)' }}>
          Decline
        </button>
      </div>
    </div>
  )
}
