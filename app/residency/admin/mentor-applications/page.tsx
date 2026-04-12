'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

export default function AdminMentorApplicationsPage() {
  const [apps, setApps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)
  const [notes, setNotes] = useState('')
  const [acting, setActing] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase
      .from('residency_mentor_applications')
      .select('*')
      .is('deleted_at', null)
      .order('submitted_at', { ascending: false })
    setApps(data || [])
    setLoading(false)
  }

  async function handleAction(action: 'approved' | 'pending_review' | 'declined') {
    if (!selected) return
    setActing(true)

    const { data: { user } } = await supabase.auth.getUser()

    // Update application status
    await supabase.from('residency_mentor_applications').update({
      status: action,
      internal_notes: notes,
      reviewed_at: new Date().toISOString(),
      reviewed_by: user?.id,
    }).eq('id', selected.id)

    if (action === 'approved') {
      // Create auth user for mentor
      const supabaseService = (await import('@/lib/supabase/server')).createServiceClient()
      const { data: authData, error: authError } = await supabaseService.auth.admin.createUser({
        email: selected.email,
        password: crypto.randomUUID().slice(0, 12),
        email_confirm: true,
        user_metadata: { first_name: selected.first_name, last_name: selected.last_name },
      })

      if (!authError && authData.user) {
        // Create profile
        await supabaseService.from('residency_profiles').insert({
          id: authData.user.id,
          role: 'mentor',
          first_name: selected.first_name,
          last_name: selected.last_name,
          email: selected.email,
          credential_type: selected.credential_type,
          school_types: selected.school_types,
          availability_type: selected.availability?.[0] || null,
          onboarding_status: 'not_started',
        })

        // Create onboarding steps
        const steps = [
          { step_number: 1, step_name: 'Profile Completion' },
          { step_number: 2, step_name: 'Document Review' },
          { step_number: 3, step_name: 'Orientation Quiz' },
          { step_number: 4, step_name: 'Welcome Message' },
          { step_number: 5, step_name: 'Admin Confirmation' },
        ]
        for (const step of steps) {
          await supabaseService.from('residency_mentor_onboarding').insert({
            mentor_id: authData.user.id,
            ...step,
          })
        }
      }
    }

    setSelected(null)
    setActing(false)
    await load()
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  const pending = apps.filter(a => a.status === 'pending')
  const approved = apps.filter(a => a.status === 'approved')

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)}
          style={{ background: 'none', border: 'none', color: 'var(--r-navy)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1rem', padding: 0 }}>
          &larr; Back
        </button>

        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{selected.first_name} {selected.last_name}</h1>
        <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {selected.email} &middot; Applied {new Date(selected.submitted_at).toLocaleDateString()}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
          <div>
            <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Qualifications</h2>
              <div style={{ fontSize: '0.875rem', lineHeight: 2 }}>
                <p><span style={{ color: 'var(--r-text-muted)' }}>Credential:</span> {selected.credential_type || '—'}</p>
                <p><span style={{ color: 'var(--r-text-muted)' }}>Experience:</span> {selected.years_experience ? `${selected.years_experience} years` : '—'}</p>
                <p><span style={{ color: 'var(--r-text-muted)' }}>School:</span> {selected.school_name || '—'} ({selected.role_at_school || '—'})</p>
                <p><span style={{ color: 'var(--r-text-muted)' }}>School Types:</span> {selected.school_types?.join(', ') || '—'}</p>
                <p><span style={{ color: 'var(--r-text-muted)' }}>Availability:</span> {selected.availability?.join(', ') || '—'}</p>
              </div>
            </div>

            <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>What Draws Them to Mentoring</h2>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{selected.mentoring_interest}</p>
            </div>

            <div className="r-card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Equity & Anti-Bias Values</h2>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{selected.equity_statement}</p>
            </div>
          </div>

          <div className="r-card" style={{ padding: '1.5rem', alignSelf: 'start' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Review</h2>
            <div style={{ marginBottom: '1rem' }}>
              <label className="r-label">Notes</label>
              <textarea className="r-textarea" rows={3} value={notes}
                onChange={e => setNotes(e.target.value)} placeholder="Internal notes..." />
            </div>

            {selected.status === 'pending' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button className="r-btn r-btn-primary" disabled={acting} onClick={() => handleAction('approved')}
                  style={{ justifyContent: 'center' }}>
                  {acting ? 'Processing...' : 'Approve & Create Account'}
                </button>
                <button className="r-btn" disabled={acting} onClick={() => handleAction('pending_review')}
                  style={{ justifyContent: 'center', background: '#fef3c7', color: '#b45309', border: 'none' }}>
                  Pending Further Review
                </button>
                <button className="r-btn" disabled={acting} onClick={() => handleAction('declined')}
                  style={{ justifyContent: 'center', background: '#fef2f2', color: '#991b1b', border: 'none' }}>
                  Decline
                </button>
              </div>
            )}

            {selected.status === 'approved' && (
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-success)' }}>
                Approved on {new Date(selected.reviewed_at).toLocaleDateString()}. Account created.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Mentor Applications</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        {pending.length} pending review
      </p>

      {pending.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>Pending ({pending.length})</h2>
          {pending.map(a => (
            <div key={a.id} className="r-card" onClick={() => { setSelected(a); setNotes(a.internal_notes || '') }}
              style={{ padding: '1rem', marginBottom: '0.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{a.first_name} {a.last_name}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                  {a.credential_type || 'No credential'} &middot; {a.years_experience || '?'} years
                </p>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>{new Date(a.submitted_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}

      {approved.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>Approved ({approved.length})</h2>
          {approved.map(a => (
            <div key={a.id} className="r-card" onClick={() => { setSelected(a); setNotes(a.internal_notes || '') }}
              style={{ padding: '1rem', marginBottom: '0.5rem', cursor: 'pointer', opacity: 0.8 }}>
              <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{a.first_name} {a.last_name}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>{a.credential_type}</p>
            </div>
          ))}
        </div>
      )}

      {apps.length === 0 && <EmptyState title="No mentor applications" message="Applications from prospective mentors will appear here." />}
    </div>
  )
}
