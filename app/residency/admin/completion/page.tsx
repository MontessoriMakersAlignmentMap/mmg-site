'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

interface CompletionCheck {
  resident: { id: string; name: string; track: string; cohort: string }
  requirements: Record<string, { label: string; current: number; required: number; met: boolean; status?: string }>
  eligible: boolean
  graduated: boolean
  graduate?: { id: string; completed_at: string; certificate_number: string }
}

export default function AdminCompletionPage() {
  const [residents, setResidents] = useState<any[]>([])
  const [graduates, setGraduates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)
  const [checkData, setCheckData] = useState<CompletionCheck | null>(null)
  const [checking, setChecking] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [adminId, setAdminId] = useState('')
  const [tab, setTab] = useState<'active' | 'graduates'>('active')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setAdminId(user.id)

      const [resRes, gradRes] = await Promise.all([
        supabase.from('residency_residents')
          .select('id, status, profile:residency_profiles(first_name, last_name), cohort:residency_cohorts(name, track)')
          .neq('status', 'completed')
          .order('created_at'),
        supabase.from('residency_graduates')
          .select('*, profile:residency_profiles(first_name, last_name, email), cohort:residency_cohorts(name, track)')
          .is('deleted_at', null)
          .order('completed_at', { ascending: false }),
      ])

      setResidents(resRes.data || [])
      setGraduates(gradRes.data || [])
      setLoading(false)
    }
    load()
  }, [])

  async function checkEligibility(residentId: string) {
    setSelected(residentId)
    setChecking(true)
    setCheckData(null)

    try {
      const res = await fetch(`/api/residency/completion-check?resident_id=${residentId}`)
      if (!res.ok) {
        alert('Failed to check eligibility')
        setChecking(false)
        return
      }
      const data = await res.json()
      setCheckData(data)
    } catch {
      alert('Network error checking eligibility')
    }
    setChecking(false)
  }

  async function confirmCompletion() {
    if (!checkData || !selected) return
    if (!confirm('Confirm completion? This will generate a certificate and notify the resident.')) return
    setConfirming(true)

    try {
      const res = await fetch('/api/residency/confirm-completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resident_id: selected, confirmed_by: adminId }),
      })

      if (res.ok) {
        alert('Completion confirmed! Certificate generated and email sent.')
        setSelected(null)
        setCheckData(null)
        // Reload residents and graduates
        const [{ data: resData }, { data: gradData }] = await Promise.all([
          supabase.from('residency_residents').select('id, status, profile:residency_profiles(first_name, last_name), cohort:residency_cohorts(name, track)').in('status', ['enrolled', 'active']),
          supabase.from('residency_graduates').select('*, profile:residency_profiles(first_name, last_name), cohort:residency_cohorts(name, track)').is('deleted_at', null).order('completed_at', { ascending: false }),
        ])
        setResidents(resData || [])
        setGraduates(gradData || [])
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to confirm completion')
      }
    } catch {
      alert('Network error confirming completion')
    }
    setConfirming(false)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Completion & Credentialing</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Check eligibility, confirm completions, and manage credentials.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--r-border)' }}>
        {[
          { key: 'active' as const, label: `Active Residents (${residents.length})` },
          { key: 'graduates' as const, label: `Graduates (${graduates.length})` },
        ].map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setSelected(null); setCheckData(null) }}
            style={{
              background: 'none', border: 'none',
              borderBottom: tab === t.key ? '2px solid var(--r-navy)' : '2px solid transparent',
              padding: '0.5rem 1rem', fontSize: '0.8125rem',
              fontWeight: tab === t.key ? 600 : 400,
              color: tab === t.key ? 'var(--r-navy)' : 'var(--r-text-muted)',
              cursor: 'pointer',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'active' && (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.5fr' : '1fr', gap: '1.5rem' }}>
          {/* Resident List */}
          <div>
            {residents.length === 0 ? (
              <EmptyState title="No active residents" message="All residents have completed the program." />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {residents.map(r => (
                  <div key={r.id} onClick={() => checkEligibility(r.id)}
                    className="r-card" style={{
                      padding: '0.875rem 1rem', cursor: 'pointer',
                      borderLeft: selected === r.id ? '3px solid var(--r-navy)' : '3px solid transparent',
                    }}>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.125rem' }}>
                      {(r.profile as any)?.first_name} {(r.profile as any)?.last_name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                      {(r.cohort as any)?.name || 'No cohort'} &middot; {(r.cohort as any)?.track || '—'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Eligibility Check */}
          {selected && (
            <div>
              {checking ? (
                <p style={{ color: 'var(--r-text-muted)' }}>Checking eligibility...</p>
              ) : checkData ? (
                <div>
                  <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <h2 style={{ fontSize: '1.125rem', margin: 0 }}>{checkData.resident.name}</h2>
                      <span style={{
                        fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase',
                        padding: '0.25rem 0.75rem', borderRadius: '6px',
                        color: checkData.eligible ? '#2d6a4f' : '#b45309',
                        background: checkData.eligible ? 'var(--r-success-light)' : 'var(--r-warning-light)',
                      }}>
                        {checkData.eligible ? 'Eligible' : 'Not Yet Eligible'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {Object.entries(checkData.requirements).map(([key, req]) => (
                        <div key={key} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '0.625rem 0.875rem', borderRadius: '6px',
                          background: req.met ? '#f0fdf4' : '#fefce8',
                        }}>
                          <div>
                            <p style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.125rem' }}>
                              {req.label}
                            </p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                              {req.current} / {req.required}
                              {key === 'capstone' && (req as any).status && (req as any).status !== 'not_submitted'
                                ? ` (${(req as any).status.replace('_', ' ')})`
                                : ''}
                            </p>
                          </div>
                          <span style={{
                            fontSize: '0.75rem', fontWeight: 600,
                            color: req.met ? '#2d6a4f' : '#b45309',
                          }}>
                            {req.met ? 'Complete' : 'In Progress'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {checkData.eligible && !checkData.graduated && (
                    <button className="r-btn r-btn-primary" onClick={confirmCompletion} disabled={confirming}
                      style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '0.9375rem' }}>
                      {confirming ? 'Confirming...' : 'Confirm Completion & Generate Certificate'}
                    </button>
                  )}

                  {checkData.graduated && (
                    <div className="r-card" style={{ padding: '1.25rem', background: '#f0fdf4', textAlign: 'center' }}>
                      <p style={{ fontWeight: 600, color: '#2d6a4f', marginBottom: '0.25rem' }}>Already Graduated</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                        Certificate: {checkData.graduate?.certificate_number}
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}

      {tab === 'graduates' && (
        <div>
          {graduates.length === 0 ? (
            <EmptyState title="No graduates yet" message="Confirmed graduates will appear here." />
          ) : (
            <div className="r-card" style={{ overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--r-border)' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase' }}>Cohort</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase' }}>Track</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase' }}>Certificate</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase' }}>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {graduates.map(g => (
                    <tr key={g.id} style={{ borderBottom: '1px solid var(--r-border)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>
                        {(g.profile as any)?.first_name} {(g.profile as any)?.last_name}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--r-text-muted)' }}>
                        {(g.cohort as any)?.name || '—'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{
                          fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase',
                          padding: '0.125rem 0.5rem', borderRadius: '4px',
                          background: 'var(--r-gold-light)', color: 'var(--r-navy)',
                        }}>
                          {g.track}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.8125rem', color: 'var(--r-navy)' }}>
                        {g.certificate_number}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                        {new Date(g.completed_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
