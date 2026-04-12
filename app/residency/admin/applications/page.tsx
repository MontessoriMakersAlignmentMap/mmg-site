'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

type AppStatus = 'pending' | 'accepted' | 'waitlisted' | 'declined'

interface Application {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  city: string | null
  state: string | null
  applicant_role: string | null
  school_name: string | null
  years_experience: number | null
  education_level: string | null
  track_interest: string
  montessori_experience: string | null
  why_montessori: string
  equity_fellows: boolean
  equity_statement: string | null
  heard_about: string | null
  status: AppStatus
  internal_notes: string | null
  submitted_at: string
  reviewed_at: string | null
  accepted_at: string | null
  declined_at: string | null
}

const statusColors: Record<AppStatus, string> = {
  pending: '#b45309',
  accepted: '#2d6a4f',
  waitlisted: '#6b21a8',
  declined: '#991b1b',
}

const statusLabels: Record<AppStatus, string> = {
  pending: 'Pending Review',
  accepted: 'Accepted',
  waitlisted: 'Waitlisted',
  declined: 'Declined',
}

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([])
  const [cohorts, setCohorts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<AppStatus | 'all'>('all')
  const [selected, setSelected] = useState<Application | null>(null)
  const [notes, setNotes] = useState('')
  const [selectedCohort, setSelectedCohort] = useState('')
  const [acting, setActing] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const [appRes, cohortRes] = await Promise.all([
      supabase.from('residency_applications').select('*').is('deleted_at', null).order('submitted_at', { ascending: false }),
      supabase.from('residency_cohorts').select('id, name, track, status').is('deleted_at', null).order('start_date', { ascending: false }),
    ])
    setApps(appRes.data || [])
    setCohorts(cohortRes.data || [])
    setLoading(false)
  }

  function openDetail(app: Application) {
    setSelected(app)
    setNotes(app.internal_notes || '')
    setSelectedCohort('')
  }

  async function handleAction(action: 'accept' | 'waitlist' | 'decline') {
    if (!selected) return
    setActing(true)

    try {
      const res = await fetch('/api/residency/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selected.id,
          action,
          internal_notes: notes,
          cohort_id: action === 'accept' ? selectedCohort || undefined : undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Action failed')
      } else {
        setSelected(null)
        await load()
      }
    } finally {
      setActing(false)
    }
  }

  async function saveNotes() {
    if (!selected) return
    await fetch('/api/residency/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, action: 'update_notes', internal_notes: notes }),
    })
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  const filtered = filter === 'all' ? apps : apps.filter(a => a.status === filter)
  const counts = {
    all: apps.length,
    pending: apps.filter(a => a.status === 'pending').length,
    accepted: apps.filter(a => a.status === 'accepted').length,
    waitlisted: apps.filter(a => a.status === 'waitlisted').length,
    declined: apps.filter(a => a.status === 'declined').length,
  }

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)}
          style={{ background: 'none', border: 'none', color: 'var(--r-navy)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1rem', padding: 0 }}>
          &larr; Back to Applications
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
              {selected.first_name} {selected.last_name}
            </h1>
            <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
              Applied {new Date(selected.submitted_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            padding: '0.375rem 0.75rem',
            borderRadius: '6px',
            color: '#fff',
            background: statusColors[selected.status],
          }}>
            {statusLabels[selected.status]}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          {/* Left: Application Details */}
          <div>
            <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Contact Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem' }}>
                <div><span style={{ color: 'var(--r-text-muted)' }}>Email:</span> {selected.email}</div>
                <div><span style={{ color: 'var(--r-text-muted)' }}>Phone:</span> {selected.phone || '—'}</div>
                <div><span style={{ color: 'var(--r-text-muted)' }}>Location:</span> {[selected.city, selected.state].filter(Boolean).join(', ') || '—'}</div>
              </div>
            </div>

            <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Professional Background</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem', marginBottom: '1rem' }}>
                <div><span style={{ color: 'var(--r-text-muted)' }}>Role:</span> {selected.applicant_role || '—'}</div>
                <div><span style={{ color: 'var(--r-text-muted)' }}>School:</span> {selected.school_name || '—'}</div>
                <div><span style={{ color: 'var(--r-text-muted)' }}>Experience:</span> {selected.years_experience != null ? `${selected.years_experience} years` : '—'}</div>
                <div><span style={{ color: 'var(--r-text-muted)' }}>Education:</span> {selected.education_level || '—'}</div>
              </div>
              {selected.montessori_experience && (
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>Montessori Experience</p>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{selected.montessori_experience}</p>
                </div>
              )}
            </div>

            <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Program Interest</h2>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '4px',
                  background: 'var(--r-gold-light)',
                  color: 'var(--r-navy)',
                }}>
                  {selected.track_interest === 'primary' ? 'Primary (Ages 3–6)' : 'Elementary (Ages 6–12)'}
                </span>
                {selected.equity_fellows && (
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    padding: '0.25rem 0.625rem',
                    borderRadius: '4px',
                    background: '#ede9fe',
                    color: '#6b21a8',
                    marginLeft: '0.5rem',
                  }}>
                    Equity Fellows
                  </span>
                )}
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>Why Montessori</p>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{selected.why_montessori}</p>
              </div>
              {selected.equity_statement && (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>Equity Statement</p>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{selected.equity_statement}</p>
                </div>
              )}
            </div>

            {selected.heard_about && (
              <div className="r-card" style={{ padding: '1.5rem' }}>
                <p style={{ fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--r-text-muted)' }}>Heard about us:</span> {selected.heard_about}
                </p>
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div>
            <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Internal Notes</h2>
              <textarea className="r-textarea" rows={4} value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Private notes about this applicant..." />
              <button className="r-btn" style={{ marginTop: '0.5rem', fontSize: '0.75rem' }} onClick={saveNotes}>
                Save Notes
              </button>
            </div>

            {selected.status === 'pending' && (
              <div className="r-card" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Review Actions</h2>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="r-label">Assign to Cohort (for acceptance)</label>
                  <select className="r-input" value={selectedCohort} onChange={e => setSelectedCohort(e.target.value)}>
                    <option value="">No cohort yet</option>
                    {cohorts
                      .filter(c => c.track === selected.track_interest)
                      .map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button className="r-btn r-btn-primary" disabled={acting} onClick={() => handleAction('accept')}
                    style={{ justifyContent: 'center' }}>
                    {acting ? 'Processing...' : 'Accept Application'}
                  </button>
                  <button className="r-btn" disabled={acting} onClick={() => handleAction('waitlist')}
                    style={{ justifyContent: 'center', background: '#ede9fe', color: '#6b21a8', border: 'none' }}>
                    Move to Waitlist
                  </button>
                  <button className="r-btn" disabled={acting} onClick={() => handleAction('decline')}
                    style={{ justifyContent: 'center', background: '#fef2f2', color: '#991b1b', border: 'none' }}>
                    Decline Application
                  </button>
                </div>
              </div>
            )}

            {selected.status === 'waitlisted' && (
              <div className="r-card" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Waitlisted</h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1rem' }}>
                  This applicant was waitlisted. You can still accept or decline them.
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <label className="r-label">Assign to Cohort</label>
                  <select className="r-input" value={selectedCohort} onChange={e => setSelectedCohort(e.target.value)}>
                    <option value="">No cohort yet</option>
                    {cohorts.filter(c => c.track === selected.track_interest).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button className="r-btn r-btn-primary" disabled={acting} onClick={() => handleAction('accept')}
                    style={{ justifyContent: 'center' }}>
                    Accept Application
                  </button>
                  <button className="r-btn" disabled={acting} onClick={() => handleAction('decline')}
                    style={{ justifyContent: 'center', background: '#fef2f2', color: '#991b1b', border: 'none' }}>
                    Decline
                  </button>
                </div>
              </div>
            )}

            {selected.status === 'accepted' && selected.reviewed_at && (
              <div className="r-card" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Accepted</h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                  Accepted on {new Date(selected.accepted_at!).toLocaleDateString()}. Account created and welcome email sent.
                </p>
              </div>
            )}

            {selected.status === 'declined' && (
              <div className="r-card" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Declined</h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                  Declined on {new Date(selected.declined_at!).toLocaleDateString()}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Applications</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            {counts.pending} pending review
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--r-border)', paddingBottom: '0' }}>
        {(['all', 'pending', 'accepted', 'waitlisted', 'declined'] as const).map(tab => (
          <button key={tab} onClick={() => setFilter(tab)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: filter === tab ? '2px solid var(--r-navy)' : '2px solid transparent',
              padding: '0.5rem 1rem',
              fontSize: '0.8125rem',
              fontWeight: filter === tab ? 600 : 400,
              color: filter === tab ? 'var(--r-navy)' : 'var(--r-text-muted)',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}>
            {tab === 'all' ? 'All' : statusLabels[tab]} ({counts[tab]})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No applications" message="Applications will appear here as they come in." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {filtered.map(app => (
            <div key={app.id} className="r-card" onClick={() => openDetail(app)}
              style={{ padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.125rem' }}>
                    {app.first_name} {app.last_name}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                    {app.email} &middot; {app.track_interest === 'primary' ? 'Primary' : 'Elementary'}
                    {app.equity_fellows && ' \u00b7 Equity Fellow'}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                  {new Date(app.submitted_at).toLocaleDateString()}
                </span>
                <span style={{
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  color: '#fff',
                  background: statusColors[app.status],
                }}>
                  {statusLabels[app.status]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
