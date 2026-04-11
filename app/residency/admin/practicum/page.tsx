'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const TEACHING_TARGET = 540
const OBSERVATION_TARGET = 90

export default function AdminPracticumPage() {
  const [residents, setResidents] = useState<any[]>([])
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: r }, { data: l }] = await Promise.all([
        supabase.from('residency_residents')
          .select('*, profile:residency_profiles(first_name, last_name)')
          .in('status', ['active', 'enrolled'])
          .order('created_at'),
        supabase.from('residency_practicum_logs')
          .select('resident_id, hours_teaching, hours_observation, lessons_given, observations_made, verified_at')
          .is('deleted_at', null),
      ])
      if (r) setResidents(r)
      if (l) setLogs(l)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  // Per-resident summaries
  const summaries = residents.map(r => {
    const rLogs = logs.filter(l => l.resident_id === r.id)
    const totalTeaching = rLogs.reduce((s: number, l: any) => s + Number(l.hours_teaching), 0)
    const totalObservation = rLogs.reduce((s: number, l: any) => s + Number(l.hours_observation), 0)
    const totalLessons = rLogs.reduce((s: number, l: any) => s + l.lessons_given, 0)
    const verified = rLogs.filter((l: any) => l.verified_at).length
    return {
      ...r,
      totalTeaching,
      totalObservation,
      totalLessons,
      logCount: rLogs.length,
      verified,
      teachingPct: (totalTeaching / TEACHING_TARGET) * 100,
      observationPct: (totalObservation / OBSERVATION_TARGET) * 100,
    }
  })

  const programTeaching = summaries.reduce((s, r) => s + r.totalTeaching, 0)
  const programObservation = summaries.reduce((s, r) => s + r.totalObservation, 0)
  const programLogs = summaries.reduce((s, r) => s + r.logCount, 0)
  const onTrack = summaries.filter(r => r.teachingPct >= 50 || r.observationPct >= 50).length

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Practicum Hours Overview</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Program-wide practicum hour tracking. MACTE requires 540 teaching + 90 observation hours.
      </p>

      {/* Program stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Teaching Hours', value: programTeaching.toFixed(0) },
          { label: 'Total Observation Hours', value: programObservation.toFixed(0) },
          { label: 'Log Entries', value: programLogs },
          { label: 'On Track', value: `${onTrack}/${summaries.length}` },
        ].map(s => (
          <div key={s.label} className="r-card" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)', marginBottom: '0.25rem' }}>{s.value}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Per-resident breakdown */}
      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Candidate Practicum Progress</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {summaries.map(r => (
            <div key={r.id} style={{
              padding: '0.875rem',
              background: 'var(--r-cream)',
              borderRadius: '8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    {r.profile?.first_name} {r.profile?.last_name}
                  </p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                    {r.logCount} log entries — {r.totalLessons} lessons — {r.verified} verified
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {r.teachingPct >= 100 && (
                    <span style={{ padding: '0.125rem 0.5rem', borderRadius: '9999px', fontSize: '0.625rem', fontWeight: 600, background: '#e8f5e9', color: '#2e7d32' }}>
                      Teaching Complete
                    </span>
                  )}
                  {r.observationPct >= 100 && (
                    <span style={{ padding: '0.125rem 0.5rem', borderRadius: '9999px', fontSize: '0.625rem', fontWeight: 600, background: '#e8f5e9', color: '#2e7d32' }}>
                      Observation Complete
                    </span>
                  )}
                </div>
              </div>
              {/* Teaching bar */}
              <div style={{ marginBottom: '0.375rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', marginBottom: '0.125rem' }}>
                  <span>Teaching</span>
                  <span style={{ color: 'var(--r-text-muted)' }}>{r.totalTeaching.toFixed(1)}/{TEACHING_TARGET}</span>
                </div>
                <div style={{ height: '6px', background: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, r.teachingPct)}%`, background: r.teachingPct >= 100 ? '#2e7d32' : 'var(--r-navy)', borderRadius: '3px' }} />
                </div>
              </div>
              {/* Observation bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', marginBottom: '0.125rem' }}>
                  <span>Observation</span>
                  <span style={{ color: 'var(--r-text-muted)' }}>{r.totalObservation.toFixed(1)}/{OBSERVATION_TARGET}</span>
                </div>
                <div style={{ height: '6px', background: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, r.observationPct)}%`, background: r.observationPct >= 100 ? '#2e7d32' : '#1565c0', borderRadius: '3px' }} />
                </div>
              </div>
            </div>
          ))}
          {summaries.length === 0 && (
            <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No active residents.</p>
          )}
        </div>
      </div>
    </div>
  )
}
