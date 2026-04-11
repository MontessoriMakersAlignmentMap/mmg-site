'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import StatusBadge from '../../components/StatusBadge'
import ProgressBar from '../../components/ProgressBar'

export default function AdminProgressPage() {
  const [residents, setResidents] = useState<any[]>([])
  const [submissions, setSubmissions] = useState<any[]>([])
  const [bundleProgress, setBundleProgress] = useState<any[]>([])
  const [cohorts, setCohorts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      // Get all residents with assignment counts
      const { data: residentData } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(first_name, last_name)')
        .in('status', ['enrolled', 'active'])
        .order('created_at', { ascending: false })

      if (residentData) {
        const enriched = await Promise.all(residentData.map(async (r: any) => {
          const { data: assignments } = await supabase
            .from('residency_assignments')
            .select('status')
            .eq('resident_id', r.id)

          const total = (assignments ?? []).length
          const completed = (assignments ?? []).filter((a: any) => a.status === 'completed').length

          // Bundle engagement data
          const { data: bundleEngs } = await supabase
            .from('residency_bundle_engagements')
            .select('completion_status, bundle_id')
            .eq('resident_id', r.id)

          const completeBundles = (bundleEngs ?? []).filter((e: any) => e.completion_status === 'complete').length
          const incompleteBundles = (bundleEngs ?? []).filter((e: any) => e.completion_status === 'incomplete').length

          // Determine bundle standing
          let bundleStanding = 'on_track'
          if (incompleteBundles >= 2) bundleStanding = 'academic_watch'
          else if (incompleteBundles === 1) bundleStanding = 'behind'

          return { ...r, total, completed, completeBundles, incompleteBundles, bundleStanding }
        }))
        setResidents(enriched)
      }

      // Load cohorts
      const { data: cohortData } = await supabase
        .from('residency_cohorts')
        .select('id, name, track')
        .in('status', ['active', 'draft'])
        .is('deleted_at', null)
      setCohorts(cohortData || [])

      // Bundle completion rates per cohort
      if (cohortData?.length) {
        const bp = []
        for (const c of cohortData) {
          const { data: bundles } = await supabase
            .from('residency_bundles')
            .select('id, week_number, weekly_theme, unlock_date, status')
            .eq('cohort_id', c.id)
            .eq('status', 'released')
            .order('bundle_number')

          const cohortResidents = residentData?.filter((r: any) => r.cohort_id === c.id) || []
          if (bundles && cohortResidents.length > 0) {
            const rIds = cohortResidents.map((r: any) => r.id)
            const { data: allEngs } = await supabase
              .from('residency_bundle_engagements')
              .select('bundle_id, completion_status')
              .in('resident_id', rIds)

            const bundleRates = bundles.map(b => {
              const engs = (allEngs ?? []).filter(e => e.bundle_id === b.id)
              const complete = engs.filter(e => e.completion_status === 'complete').length
              return {
                ...b,
                complete,
                total: cohortResidents.length,
                rate: cohortResidents.length > 0 ? Math.round((complete / cohortResidents.length) * 100) : 0,
              }
            })
            bp.push({ cohort: c, bundleRates })
          }
        }
        setBundleProgress(bp)
      }

      // Pending submissions
      const { data: subs } = await supabase
        .from('residency_album_entries')
        .select('*, lesson:residency_lessons(title), resident:residency_residents!inner(*, profile:residency_profiles(first_name, last_name))')
        .eq('status', 'submitted')
        .order('submitted_at', { ascending: true })
        .limit(20)

      if (subs) setSubmissions(subs)

      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Progress Monitor</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Track resident progress and review pending submissions.
      </p>

      {/* Bundle completion rates */}
      {bundleProgress.map(bp => (
        <div key={bp.cohort.id} className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
            Bundle Completion: {bp.cohort.name}
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '1rem' }}>
            Percentage of cohort that has completed each released bundle.
          </p>
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
            {bp.bundleRates.map((br: any) => (
              <div key={br.id} style={{
                width: '48px', textAlign: 'center', padding: '0.375rem',
                background: br.rate >= 80 ? '#e8f5e9' : br.rate >= 50 ? '#fff8e1' : '#fce4ec',
                borderRadius: '6px',
              }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: br.rate >= 80 ? '#2e7d32' : br.rate >= 50 ? '#f57f17' : '#c62828' }}>
                  {br.rate}%
                </p>
                <p style={{ fontSize: '0.5625rem', color: 'var(--r-text-muted)' }}>Wk {br.week_number}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Resident bundle standing */}
      {residents.some(r => r.bundleStanding) && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Bundle Standing by Resident</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
            <thead>
              <tr>
                {['Resident', 'Bundles Complete', 'Incomplete', 'Standing'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid var(--r-border)', fontWeight: 600, fontSize: '0.6875rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {residents.map(r => (
                <tr key={r.id}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', fontWeight: 500 }}>
                    {r.profile?.first_name} {r.profile?.last_name}
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)' }}>{r.completeBundles}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', color: r.incompleteBundles > 0 ? '#f57f17' : 'inherit' }}>{r.incompleteBundles}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)' }}>
                    <span style={{
                      fontSize: '0.625rem', fontWeight: 600, padding: '0.125rem 0.5rem', borderRadius: '3px',
                      textTransform: 'uppercase',
                      background: r.bundleStanding === 'on_track' ? '#e8f5e9' : r.bundleStanding === 'behind' ? '#fff8e1' : '#fce4ec',
                      color: r.bundleStanding === 'on_track' ? '#2e7d32' : r.bundleStanding === 'behind' ? '#f57f17' : '#c62828',
                    }}>
                      {r.bundleStanding === 'on_track' ? 'On Track' : r.bundleStanding === 'behind' ? 'Behind' : 'Academic Watch'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Resident progress */}
      <div className="r-card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Lesson Completion</h2>
        {residents.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No active residents.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {residents.map((r: any) => (
              <div key={r.id}>
                <Link href={`/residency/admin/residents/${r.id}`} style={{
                  fontWeight: 500, fontSize: '0.875rem', color: 'var(--r-navy)', textDecoration: 'none',
                }}>
                  {r.profile?.first_name} {r.profile?.last_name}
                </Link>
                <ProgressBar completed={r.completed} total={r.total} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending submissions */}
      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Pending Submissions</h2>
        {submissions.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No submissions awaiting review.</p>
        ) : (
          <table className="r-table">
            <thead>
              <tr>
                <th>Resident</th>
                <th>Entry</th>
                <th>Lesson</th>
                <th>Submitted</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s: any) => (
                <tr key={s.id}>
                  <td>{s.resident?.profile?.first_name} {s.resident?.profile?.last_name}</td>
                  <td style={{ fontWeight: 500 }}>{s.title}</td>
                  <td>{s.lesson?.title}</td>
                  <td style={{ color: 'var(--r-text-muted)' }}>
                    {s.submitted_at ? new Date(s.submitted_at).toLocaleDateString() : '\u2014'}
                  </td>
                  <td><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
