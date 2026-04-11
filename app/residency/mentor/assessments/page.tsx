'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import EmptyState from '../../components/EmptyState'

const RUBRIC_LABELS: Record<string, string> = {
  practice: 'Practice Rubric',
  reflective: 'Reflective Practice',
  equity: 'Equity Checklist',
}

const BAND_COLORS: Record<string, { bg: string; color: string }> = {
  highly_proficient: { bg: '#e8f5e9', color: '#2e7d32' },
  proficient: { bg: '#e3f2fd', color: '#1565c0' },
  developing: { bg: '#fff8e1', color: '#f57f17' },
  needs_support: { bg: '#fce4ec', color: '#c62828' },
}

function bandLabel(band: string) {
  return band.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export default function AssessmentsListPage() {
  const [assessments, setAssessments] = useState<any[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      let query = supabase
        .from('residency_rubric_submissions')
        .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name))')
        .eq('mentor_id', user.id)
        .is('deleted_at', null)
        .order('submitted_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('rubric_type', filter)
      }

      const { data } = await query
      if (data) setAssessments(data)
      setLoading(false)
    }
    load()
  }, [filter])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Formal Assessments</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Completed rubric assessments and equity checklists for your residents.
          </p>
        </div>
        <Link href="/residency/mentor/assessments/new" className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          New Assessment
        </Link>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[
          { value: 'all', label: 'All' },
          { value: 'practice', label: 'Practice' },
          { value: 'reflective', label: 'Reflective' },
          { value: 'equity', label: 'Equity' },
        ].map(tab => (
          <button
            key={tab.value}
            onClick={() => { setLoading(true); setFilter(tab.value) }}
            style={{
              padding: '0.375rem 1rem',
              borderRadius: '6px',
              border: '1px solid var(--r-border)',
              background: filter === tab.value ? 'var(--r-navy)' : 'var(--r-white)',
              color: filter === tab.value ? '#fff' : 'var(--r-text)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {assessments.length === 0 ? (
        <EmptyState
          title="No assessments yet"
          message="Completed rubric assessments will appear here."
          action={
            <Link href="/residency/mentor/assessments/new" className="r-btn r-btn-primary">
              Complete an Assessment
            </Link>
          }
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {assessments.map(a => {
            const band = a.proficiency_band ? BAND_COLORS[a.proficiency_band] : null
            return (
              <div key={a.id} className="r-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>
                    {a.resident?.profile?.first_name} {a.resident?.profile?.last_name}
                  </p>
                  <h3 style={{ fontSize: '1rem', margin: 0, marginBottom: '0.25rem' }}>
                    {RUBRIC_LABELS[a.rubric_type] ?? a.rubric_type}
                  </h3>
                  {a.semester && (
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>{a.semester}</p>
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {a.rubric_type !== 'equity' && a.overall_score != null && (
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--r-navy)', marginBottom: '0.25rem' }}>
                      {Number(a.overall_score).toFixed(2)}
                    </p>
                  )}
                  {a.proficiency_band && band && (
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.625rem',
                      borderRadius: '9999px',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      background: band.bg,
                      color: band.color,
                    }}>
                      {bandLabel(a.proficiency_band)}
                    </span>
                  )}
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                    {new Date(a.observation_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
