'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import ProgressBar from '../components/ProgressBar'

export default function MentorDashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [residents, setResidents] = useState<any[]>([])
  const [pendingCount, setPendingCount] = useState(0)
  const [virtualPendingCount, setVirtualPendingCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // Session prep data
  const [sessionAPrep, setSessionAPrep] = useState<any>(null)
  const [sessionBPrep, setSessionBPrep] = useState<any>(null)
  const [upcomingSessions, setUpcomingSessions] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: prof } = await supabase
        .from('residency_profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      if (prof) setProfile(prof)

      // Get residents with their assigned level
      const { data: res } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(first_name, last_name, email), assigned_level:residency_levels(name, age_range)')
        .eq('mentor_id', user.id)

      if (!res) { setLoading(false); return }

      // For each resident, get assignment counts and pending submissions
      const enriched = await Promise.all(res.map(async (r: any) => {
        const [assignmentsResult, pendingResult] = await Promise.all([
          supabase
            .from('residency_assignments')
            .select('status')
            .eq('resident_id', r.id),
          supabase
            .from('residency_album_entries')
            .select('id', { count: 'exact', head: true })
            .eq('resident_id', r.id)
            .eq('status', 'submitted'),
        ])

        const assignments = assignmentsResult.data ?? []
        const total = assignments.length
        const completed = assignments.filter((a: any) => a.status === 'completed').length

        return {
          ...r,
          total_assignments: total,
          completed_assignments: completed,
          pending_submissions: pendingResult.count ?? 0,
        }
      }))

      setResidents(enriched)

      // Total pending
      const totalPending = enriched.reduce((sum: number, r: any) => sum + r.pending_submissions, 0)
      setPendingCount(totalPending)

      // Virtual observations pending review
      const residentIds = enriched.map((r: any) => r.id)
      if (residentIds.length > 0) {
        const { count } = await supabase
          .from('residency_virtual_observations')
          .select('id', { count: 'exact', head: true })
          .in('resident_id', residentIds)
          .eq('review_status', 'pending_review')
        setVirtualPendingCount(count ?? 0)
      }

      // Load session prep data
      await loadSessionPrep(enriched, user.id)

      setLoading(false)
    }
    load()
  }, [])

  async function loadSessionPrep(residentList: any[], userId: string) {
    const now = new Date()
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const today = now.toISOString().split('T')[0]
    const currentMonth = now.getMonth() + 1
    const currentYear = now.getFullYear()

    // Get upcoming sessions for this month
    const { data: sessions } = await supabase
      .from('residency_seminars')
      .select('*')
      .gte('seminar_date', today)
      .lte('seminar_date', `${currentYear}-${String(currentMonth).padStart(2, '0')}-31`)
      .order('seminar_date')

    if (sessions) setUpcomingSessions(sessions)

    const residentIds = residentList.map((r: any) => r.id)
    if (residentIds.length === 0) return

    // Session A prep: curriculum themes and bundle content from past 2 weeks
    const cohortIds = [...new Set(residentList.map((r: any) => r.cohort_id).filter(Boolean))]
    if (cohortIds.length > 0) {
      const { data: recentBundles } = await supabase
        .from('residency_bundles')
        .select('id, week_number, weekly_theme, strands_included, practicum_focus, album_submission_required')
        .in('cohort_id', cohortIds)
        .gte('unlock_date', twoWeeksAgo)
        .lte('unlock_date', today)
        .order('week_number')

      const { data: recentEngagements } = await supabase
        .from('residency_bundle_engagements')
        .select('resident_id, bundle_id, completion_status')
        .in('resident_id', residentIds)
        .in('bundle_id', (recentBundles || []).map(b => b.id))

      setSessionAPrep({
        bundles: recentBundles || [],
        engagements: recentEngagements || [],
      })
    }

    // Session B prep: practicum log highlights and observation entries from past 2 weeks
    const [{ data: recentLogs }, { data: recentObservations }] = await Promise.all([
      supabase
        .from('residency_practicum_logs')
        .select('resident_id, log_date, hours_teaching, hours_observation, notes, highlights')
        .in('resident_id', residentIds)
        .gte('log_date', twoWeeksAgo)
        .is('deleted_at', null)
        .order('log_date', { ascending: false })
        .limit(20),
      supabase
        .from('residency_observation_logs')
        .select('resident_id, observation_date, school_name, key_observations, curriculum_connection_notes')
        .in('resident_id', residentIds)
        .gte('observation_date', twoWeeksAgo)
        .order('observation_date', { ascending: false })
        .limit(10),
    ])

    setSessionBPrep({
      logs: recentLogs || [],
      observations: recentObservations || [],
    })
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const nextSessionA = upcomingSessions.find(s => s.session_type === 'curriculum_integration')
  const nextSessionB = upcomingSessions.find(s => s.session_type === 'practicum_community')

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
        {profile ? `Welcome, ${profile.first_name}` : 'Cohort Guide Dashboard'}
      </h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Your residents, upcoming sessions, and pending reviews.
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="r-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--r-navy)' }}>{residents.length}</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Assigned Residents</p>
        </div>
        <Link href="/residency/mentor/submissions" className="r-card" style={{
          textAlign: 'center', padding: '1.5rem', textDecoration: 'none', color: 'inherit',
          borderColor: pendingCount > 0 ? 'var(--r-gold)' : undefined,
          background: pendingCount > 0 ? 'var(--r-gold-light)' : undefined,
        }}>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: pendingCount > 0 ? 'var(--r-gold)' : 'var(--r-navy)' }}>{pendingCount}</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
            {pendingCount > 0 ? 'Reviews Waiting' : 'Pending Reviews'}
          </p>
        </Link>
        <Link href="/residency/mentor/virtual-observations" className="r-card" style={{
          textAlign: 'center', padding: '1.5rem', textDecoration: 'none', color: 'inherit',
          borderColor: virtualPendingCount > 0 ? 'var(--r-gold)' : undefined,
          background: virtualPendingCount > 0 ? 'var(--r-gold-light)' : undefined,
        }}>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: virtualPendingCount > 0 ? 'var(--r-gold)' : 'var(--r-navy)' }}>{virtualPendingCount}</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
            {virtualPendingCount > 0 ? 'Virtual Obs. to Review' : 'Virtual Observations'}
          </p>
        </Link>
      </div>

      {/* Session Prep Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        {/* Session A Prep */}
        <div className="r-card" style={{ borderLeft: '4px solid #1565c0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#1565c0', margin: 0 }}>
              Session A — Curriculum Integration
            </h2>
            {nextSessionA && (
              <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                {new Date(nextSessionA.seminar_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
            Curriculum themes &amp; bundle content from the past two weeks.
          </p>

          {sessionAPrep?.bundles?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {sessionAPrep.bundles.map((b: any) => {
                const engagedCount = sessionAPrep.engagements.filter(
                  (e: any) => e.bundle_id === b.id && e.completion_status === 'complete'
                ).length
                return (
                  <div key={b.id} style={{ padding: '0.5rem 0.75rem', background: '#e3f2fd', borderRadius: '6px' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                      Week {b.week_number}: {b.weekly_theme}
                    </p>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                      {b.strands_included} · {engagedCount}/{residents.length} completed
                      {b.album_submission_required && ' · Album due'}
                    </p>
                  </div>
                )
              })}
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', fontStyle: 'italic', marginTop: '0.25rem' }}>
                Discussion prompt: Ask residents to connect one observation from their classroom to this cycle&apos;s curriculum focus.
              </p>
            </div>
          ) : (
            <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>No recent bundle activity.</p>
          )}
        </div>

        {/* Session B Prep */}
        <div className="r-card" style={{ borderLeft: '4px solid #7b1fa2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#7b1fa2', margin: 0 }}>
              Session B — Practicum &amp; Community
            </h2>
            {nextSessionB && (
              <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                {new Date(nextSessionB.seminar_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
            Practicum log highlights &amp; observation entries from the past two weeks.
          </p>

          {(sessionBPrep?.logs?.length > 0 || sessionBPrep?.observations?.length > 0) ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {sessionBPrep.logs.length > 0 && (
                <div style={{ padding: '0.5rem 0.75rem', background: '#f3e5f5', borderRadius: '6px' }}>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Practicum Logs ({sessionBPrep.logs.length})
                  </p>
                  {sessionBPrep.logs.slice(0, 3).map((l: any, i: number) => {
                    const resident = residents.find((r: any) => r.id === l.resident_id)
                    return (
                      <p key={i} style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginBottom: '0.125rem' }}>
                        {resident?.profile?.first_name}: {l.hours_teaching}h teaching, {l.hours_observation}h observation
                        {l.highlights && ` — "${l.highlights.substring(0, 60)}..."`}
                      </p>
                    )
                  })}
                  {sessionBPrep.logs.length > 3 && (
                    <p style={{ fontSize: '0.625rem', color: 'var(--r-text-muted)' }}>
                      +{sessionBPrep.logs.length - 3} more entries
                    </p>
                  )}
                </div>
              )}
              {sessionBPrep.observations.length > 0 && (
                <div style={{ padding: '0.5rem 0.75rem', background: '#f3e5f5', borderRadius: '6px' }}>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Observation Visits ({sessionBPrep.observations.length})
                  </p>
                  {sessionBPrep.observations.slice(0, 3).map((o: any, i: number) => {
                    const resident = residents.find((r: any) => r.id === o.resident_id)
                    return (
                      <p key={i} style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginBottom: '0.125rem' }}>
                        {resident?.profile?.first_name} at {o.school_name}
                        {o.key_observations && ` — "${o.key_observations.substring(0, 60)}..."`}
                      </p>
                    )
                  })}
                </div>
              )}
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', fontStyle: 'italic', marginTop: '0.25rem' }}>
                Discussion prompt: Ask each resident to share one proud moment and one struggle from the past two weeks.
              </p>
            </div>
          ) : (
            <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>No recent practicum activity.</p>
          )}
        </div>
      </div>

      {/* Resident cards */}
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>My Residents</h2>

      {residents.length === 0 ? (
        <div className="r-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--r-text-muted)' }}>
          <p>No residents assigned yet.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem',
        }}>
          {residents.map((r: any) => (
            <Link
              key={r.id}
              href={`/residency/mentor/residents/${r.id}`}
              className="r-card"
              style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}
            >
              {/* Pending flag */}
              {r.pending_submissions > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'var(--r-gold)',
                  color: 'var(--r-white)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.625rem',
                  borderRadius: '9999px',
                }}>
                  {r.pending_submissions} to review
                </span>
              )}

              <div style={{ marginBottom: '0.75rem' }}>
                <h3 style={{
                  fontFamily: 'var(--r-font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--r-navy)',
                  marginBottom: '0.25rem',
                }}>
                  {r.profile?.first_name} {r.profile?.last_name}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {r.assigned_level && (
                    <span className="r-badge r-badge-level" style={{ fontSize: '0.6875rem' }}>
                      {r.assigned_level.name}
                    </span>
                  )}
                  {r.cohort && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                      Cohort: {r.cohort}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div style={{ marginTop: '0.75rem' }}>
                <ProgressBar
                  completed={r.completed_assignments}
                  total={r.total_assignments}
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.375rem' }}>
                  {r.total_assignments === 0
                    ? 'No assignments yet'
                    : `${r.completed_assignments} of ${r.total_assignments} lessons completed`
                  }
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
