'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const RUBRIC_LABELS: Record<string, string> = {
  practice: 'Practice Rubric',
  reflective: 'Reflective Practice',
  equity: 'Equity Checklist',
}

const BAND_STYLES: Record<string, { bg: string; color: string }> = {
  highly_proficient: { bg: 'var(--r-success-light)', color: 'var(--r-success)' },
  proficient: { bg: 'var(--r-info-light)', color: 'var(--r-info)' },
  developing: { bg: 'var(--r-feedback-bg)', color: 'var(--r-feedback-color)' },
  needs_support: { bg: '#fce4ec', color: '#c62828' },
}

export default function AdminAssessmentsPage() {
  const [assessments, setAssessments] = useState<any[]>([])
  const [observations, setObservations] = useState<any[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      let query = supabase
        .from('residency_rubric_submissions')
        .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name)), mentor:residency_profiles!residency_rubric_submissions_mentor_id_fkey(first_name, last_name)')
        .is('deleted_at', null)
        .order('submitted_at', { ascending: false })
        .limit(100)

      if (filter !== 'all') {
        query = query.eq('rubric_type', filter)
      }

      const { data: a } = await query
      if (a) setAssessments(a)

      const { data: o } = await supabase
        .from('residency_observation_forms')
        .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name)), observer:residency_profiles!residency_observation_forms_observer_id_fkey(first_name, last_name)')
        .is('deleted_at', null)
        .order('observation_date', { ascending: false })
        .limit(50)

      if (o) setObservations(o)
      setLoading(false)
    }
    load()
  }, [filter])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  // Stats
  const practiceCount = assessments.filter(a => a.rubric_type === 'practice').length
  const reflectiveCount = assessments.filter(a => a.rubric_type === 'reflective').length
  const equityCount = assessments.filter(a => a.rubric_type === 'equity').length
  const avgScore = assessments.filter(a => a.overall_score != null).length > 0
    ? assessments.filter(a => a.overall_score != null).reduce((sum, a) => sum + Number(a.overall_score), 0) / assessments.filter(a => a.overall_score != null).length
    : null

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Assessment Reports</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Program-wide assessment and observation data for MACTE reporting.
      </p>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Practice Rubrics', value: practiceCount },
          { label: 'Reflective Rubrics', value: reflectiveCount },
          { label: 'Equity Checklists', value: equityCount },
          { label: 'Avg Score', value: avgScore != null ? avgScore.toFixed(2) : '—' },
        ].map(s => (
          <div key={s.label} className="r-card" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)', marginBottom: '0.25rem' }}>{s.value}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Observations summary */}
      <div className="r-card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Observations</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)', marginBottom: '1rem' }}>
          {observations.length} total observation forms recorded.
        </p>
        {observations.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', maxHeight: '300px', overflowY: 'auto' }}>
            {observations.slice(0, 20).map(o => (
              <div key={o.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                background: 'var(--r-cream)',
                borderRadius: '6px',
                fontSize: '0.8125rem',
              }}>
                <span>
                  <strong>{o.resident?.profile?.first_name} {o.resident?.profile?.last_name}</strong>
                  {' — '}
                  {o.observation_focus.replace(/_/g, ' ')}
                </span>
                <span style={{ color: 'var(--r-text-muted)', fontSize: '0.75rem' }}>
                  {new Date(o.observation_date).toLocaleDateString()}
                  {o.observer && ` by ${o.observer.first_name} ${o.observer.last_name}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rubric filter and list */}
      <div className="r-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.125rem', margin: 0 }}>Rubric Submissions</h2>
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            {['all', 'practice', 'reflective', 'equity'].map(f => (
              <button key={f} onClick={() => { setLoading(true); setFilter(f) }} style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--r-border)',
                background: filter === f ? 'var(--r-navy)' : 'transparent',
                color: filter === f ? '#fff' : 'var(--r-text-muted)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {assessments.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No submissions yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {assessments.map(a => {
              const band = a.proficiency_band ? BAND_STYLES[a.proficiency_band] : null
              return (
                <div key={a.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.625rem 0.875rem',
                  background: 'var(--r-cream)',
                  borderRadius: '6px',
                }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                      {a.resident?.profile?.first_name} {a.resident?.profile?.last_name}
                    </p>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                      {RUBRIC_LABELS[a.rubric_type]} — {new Date(a.observation_date).toLocaleDateString()}
                      {a.mentor && ` by ${a.mentor.first_name} ${a.mentor.last_name}`}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {a.rubric_type !== 'equity' && a.overall_score != null && (
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--r-navy)' }}>
                        {Number(a.overall_score).toFixed(2)}
                      </span>
                    )}
                    {band && (
                      <span style={{
                        padding: '0.125rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        background: band.bg,
                        color: band.color,
                      }}>
                        {a.proficiency_band.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
