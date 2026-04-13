'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

interface Bundle {
  id: string
  bundle_number: number
  week_number: number
  month: string
  weekly_theme: string
  strands_included: string
  practicum_focus: string
  album_submission_required: boolean
  live_session_week: boolean
  live_session_discussion_theme: string | null
  unlock_date: string
  lock_date: string | null
  status: string
}

interface Cohort {
  id: string
  name: string
  track: string
  start_date: string
  status: string
}

export default function CurriculumCalendarPage() {
  const params = useParams()
  const router = useRouter()
  const cohortId = params.id as string
  const [cohort, setCohort] = useState<Cohort | null>(null)
  const [bundles, setBundles] = useState<Bundle[]>([])
  const [engagements, setEngagements] = useState<any[]>([])
  const [residents, setResidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null)

  useEffect(() => { load() }, [cohortId])

  async function load() {
    const [cohortRes, bundleRes, residentRes] = await Promise.all([
      supabase.from('residency_cohorts').select('*').eq('id', cohortId).single(),
      supabase.from('residency_bundles').select('*').eq('cohort_id', cohortId).is('deleted_at', null).order('bundle_number'),
      supabase.from('residency_residents').select('id, profile:residency_profiles(first_name, last_name), status').eq('cohort_id', cohortId).in('status', ['active', 'enrolled']),
    ])

    setCohort(cohortRes.data)
    setBundles(bundleRes.data || [])
    setResidents(residentRes.data || [])

    // Load engagements for all residents in this cohort
    if (residentRes.data?.length) {
      const residentIds = residentRes.data.map((r: any) => r.id)
      const { data: eng } = await supabase
        .from('residency_bundle_engagements')
        .select('*')
        .in('resident_id', residentIds)
      setEngagements(eng || [])
    }

    setLoading(false)
  }

  function getBundleStatus(bundle: Bundle) {
    const today = new Date().toISOString().split('T')[0]
    if (bundle.status === 'released' || (bundle.unlock_date <= today && bundle.status === 'scheduled')) {
      return 'current'
    }
    if (bundle.status === 'completed') return 'completed'
    if (bundle.unlock_date > today) return 'upcoming'
    return bundle.status
  }

  function getCohortHealth(bundle: Bundle) {
    if (residents.length === 0) return 'green'
    const bundleEngs = engagements.filter(e => e.bundle_id === bundle.id)
    const complete = bundleEngs.filter(e => e.completion_status === 'complete').length
    const notStarted = residents.length - bundleEngs.length

    const today = new Date().toISOString().split('T')[0]
    if (bundle.unlock_date > today) return 'gray'

    if (complete === residents.length) return 'green'
    if (notStarted > residents.length * 0.5) return 'red'
    if (complete < residents.length * 0.5) return 'yellow'
    return 'green'
  }

  async function releaseBundle(bundleId: string) {
    await supabase.from('residency_bundles').update({ status: 'released', updated_at: new Date().toISOString() }).eq('id', bundleId)
    load()
  }

  async function holdBundle(bundleId: string) {
    await supabase.from('residency_bundles').update({ status: 'scheduled', updated_at: new Date().toISOString() }).eq('id', bundleId)
    load()
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>
  if (!cohort) return <p>Cohort not found.</p>

  const today = new Date().toISOString().split('T')[0]
  const currentWeek = bundles.find(b => b.unlock_date <= today && (b.lock_date ? b.lock_date >= today : true))

  // Group bundles by month
  const monthGroups: Record<string, Bundle[]> = {}
  for (const b of bundles) {
    if (!monthGroups[b.month]) monthGroups[b.month] = []
    monthGroups[b.month].push(b)
  }

  const healthColors: Record<string, string> = {
    green: 'var(--r-success)',
    yellow: 'var(--r-feedback-color)',
    red: '#c62828',
    gray: '#9e9e9e',
  }
  const healthBg: Record<string, string> = {
    green: 'var(--r-success-light)',
    yellow: 'var(--r-feedback-bg)',
    red: '#fce4ec',
    gray: 'var(--r-muted-light)',
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Curriculum Calendar</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            {cohort.name} &middot; {cohort.track === 'primary' ? 'Primary' : 'Elementary'} Track &middot; {residents.length} residents enrolled
          </p>
        </div>
        <Link href="/residency/admin/cohorts" style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none' }}>
          &larr; All Cohorts
        </Link>
      </div>

      {/* Current week highlight */}
      {currentWeek && (
        <div className="r-card" style={{ borderLeft: '4px solid var(--r-navy)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>
                This Week &middot; Week {currentWeek.week_number}
              </p>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{currentWeek.weekly_theme}</h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>{currentWeek.strands_included}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {currentWeek.album_submission_required && (
                <span style={{ fontSize: '0.6875rem', background: 'var(--r-info-light)', color: 'var(--r-info)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>Album Due</span>
              )}
              {currentWeek.live_session_week && (
                <span style={{ fontSize: '0.6875rem', background: '#f3e5f5', color: '#7b1fa2', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>Live Session</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Calendar grid */}
      <div className="r-card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              {['Wk', 'Theme', 'Strands', 'Practicum Focus', 'Album', 'Live', 'Unlock Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid var(--r-border)', fontWeight: 600, fontSize: '0.6875rem', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bundles.map(b => {
              const health = getCohortHealth(b)
              const isCurrentWeek = currentWeek?.id === b.id
              const bundleEngs = engagements.filter(e => e.bundle_id === b.id)
              const complete = bundleEngs.filter(e => e.completion_status === 'complete').length

              return (
                <tr key={b.id} style={{ background: isCurrentWeek ? 'var(--r-bg-muted)' : undefined }}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    <span style={{
                      display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%',
                      background: healthColors[health], marginRight: '0.375rem',
                    }} />
                    {b.week_number}
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', fontWeight: 500, maxWidth: '250px' }}>
                    <Link href={`/residency/admin/cohorts/${cohortId}/bundles/${b.id}`} style={{ color: 'var(--r-navy)', textDecoration: 'none' }}>
                      {b.weekly_theme}
                    </Link>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', color: 'var(--r-text-muted)' }}>{b.strands_included}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', color: 'var(--r-text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {b.practicum_focus?.substring(0, 80)}...
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', textAlign: 'center' }}>
                    {b.album_submission_required ? <span style={{ color: 'var(--r-info)', fontWeight: 600 }}>Due</span> : '—'}
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', textAlign: 'center' }}>
                    {b.live_session_week ? <span style={{ color: '#7b1fa2', fontWeight: 600 }}>Yes</span> : '—'}
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', whiteSpace: 'nowrap' }}>
                    {new Date(b.unlock_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)' }}>
                    <span style={{
                      fontSize: '0.625rem', fontWeight: 600, padding: '0.125rem 0.375rem', borderRadius: '3px',
                      background: healthBg[health], color: healthColors[health], textTransform: 'uppercase',
                    }}>
                      {b.status === 'released' ? `${complete}/${residents.length}` : b.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)' }}>
                    {b.status === 'scheduled' && (
                      <button onClick={() => releaseBundle(b.id)} style={{ fontSize: '0.6875rem', color: 'var(--r-info)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                        Release
                      </button>
                    )}
                    {b.status === 'released' && (
                      <button onClick={() => holdBundle(b.id)} style={{ fontSize: '0.6875rem', color: 'var(--r-feedback-color)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                        Hold
                      </button>
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
