'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function MentorCalendarPage() {
  const [cohorts, setCohorts] = useState<any[]>([])
  const [selectedCohort, setSelectedCohort] = useState<string>('')
  const [bundles, setBundles] = useState<any[]>([])
  const [residents, setResidents] = useState<any[]>([])
  const [engagements, setEngagements] = useState<any[]>([])
  const [sessionLogs, setSessionLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCohorts() {
      const { data } = await supabase
        .from('residency_cohorts')
        .select('*')
        .in('status', ['active', 'draft'])
        .is('deleted_at', null)
        .order('start_date', { ascending: false })
      setCohorts(data || [])
      if (data?.length) {
        setSelectedCohort(data[0].id)
      }
      setLoading(false)
    }
    loadCohorts()
  }, [])

  useEffect(() => {
    if (!selectedCohort) return
    async function loadCohortData() {
      const [bundleRes, residentRes, sessionRes] = await Promise.all([
        supabase.from('residency_bundles').select('*').eq('cohort_id', selectedCohort).is('deleted_at', null).order('bundle_number'),
        supabase.from('residency_residents').select('id, profile:residency_profiles(first_name, last_name)').eq('cohort_id', selectedCohort).in('status', ['active', 'enrolled']),
        supabase.from('residency_live_session_logs').select('*').eq('cohort_id', selectedCohort).is('deleted_at', null),
      ])

      setBundles(bundleRes.data || [])
      setResidents(residentRes.data || [])
      setSessionLogs(sessionRes.data || [])

      if (residentRes.data?.length) {
        const rIds = residentRes.data.map((r: any) => r.id)
        const { data: eng } = await supabase
          .from('residency_bundle_engagements')
          .select('*')
          .in('resident_id', rIds)
        setEngagements(eng || [])
      }
    }
    loadCohortData()
  }, [selectedCohort])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  const today = new Date().toISOString().split('T')[0]
  const currentBundle = bundles.find(b => b.unlock_date <= today && (!b.lock_date || b.lock_date >= today))
  const liveSessionBundles = bundles.filter(b => b.live_session_week)
  const nextLiveSession = liveSessionBundles.find(b => b.unlock_date >= today)

  // Find the 4 bundles since the last live session for prep
  const lastLiveSessionIdx = liveSessionBundles.findIndex(b => b.id === nextLiveSession?.id)
  const prevLiveSession = lastLiveSessionIdx > 0 ? liveSessionBundles[lastLiveSessionIdx - 1] : null
  const bundlesSinceLastSession = prevLiveSession
    ? bundles.filter(b => b.bundle_number > prevLiveSession.bundle_number && b.bundle_number <= (nextLiveSession?.bundle_number || 999))
    : bundles.filter(b => b.bundle_number <= (nextLiveSession?.bundle_number || 0)).slice(-4)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Curriculum Calendar</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Your cohort&apos;s week-by-week curriculum arc.
          </p>
        </div>
        {cohorts.length > 1 && (
          <select className="r-input" style={{ width: 'auto' }} value={selectedCohort} onChange={e => setSelectedCohort(e.target.value)}>
            {cohorts.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}
      </div>

      {/* Live Session Prep Card */}
      {nextLiveSession && (
        <div className="r-card" style={{ borderLeft: '4px solid #7b1fa2', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', color: '#7b1fa2', marginBottom: '0.5rem' }}>
            Live Session Prep &middot; Week {nextLiveSession.week_number}
          </h2>
          <p style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            {nextLiveSession.live_session_discussion_theme}
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>
              Bundles Covered Since Last Session
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {bundlesSinceLastSession.map(b => (
                <span key={b.id} style={{
                  fontSize: '0.75rem', padding: '0.25rem 0.625rem', background: 'var(--r-bg-muted)',
                  borderRadius: '4px', fontWeight: 500,
                }}>
                  Wk {b.week_number}: {b.weekly_theme}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>
              Album Submission Themes from These Weeks
            </p>
            {bundlesSinceLastSession.filter(b => b.album_submission_required).map(b => (
              <p key={b.id} style={{ fontSize: '0.8125rem', color: 'var(--r-text)', marginBottom: '0.25rem' }}>
                Week {b.week_number}: {b.weekly_theme} ({b.strands_included})
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Calendar grid */}
      <div className="r-card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              {['Wk', 'Theme', 'Strands', 'Practicum Focus', 'Album', 'Live', 'Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid var(--r-border)', fontWeight: 600, fontSize: '0.6875rem', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bundles.map(b => {
              const isCurrentWeek = currentBundle?.id === b.id
              const bundleEngs = engagements.filter(e => e.bundle_id === b.id)
              const complete = bundleEngs.filter(e => e.completion_status === 'complete').length
              const hasLog = sessionLogs.some(s => s.bundle_id === b.id)

              return (
                <tr key={b.id} style={{ background: isCurrentWeek ? 'var(--r-bg-muted)' : undefined }}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', fontWeight: 600 }}>{b.week_number}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', fontWeight: 500, maxWidth: '220px' }}>{b.weekly_theme}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', color: 'var(--r-text-muted)' }}>{b.strands_included}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', color: 'var(--r-text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {b.practicum_focus?.substring(0, 70)}...
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', textAlign: 'center' }}>
                    {b.album_submission_required ? <span style={{ color: '#1565c0', fontWeight: 600 }}>Due</span> : '—'}
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', textAlign: 'center' }}>
                    {b.live_session_week ? (
                      <span style={{ color: hasLog ? '#2e7d32' : '#7b1fa2', fontWeight: 600 }}>
                        {hasLog ? 'Logged' : 'Yes'}
                      </span>
                    ) : '—'}
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)' }}>
                    {residents.length > 0 && b.status === 'released' ? (
                      <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: complete === residents.length ? '#2e7d32' : 'var(--r-navy)' }}>
                        {complete}/{residents.length}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'capitalize' }}>{b.status}</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
