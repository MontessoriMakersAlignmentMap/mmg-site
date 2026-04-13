'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

function StatCard({ value, label, color }: { value: string | number; label: string; color?: string }) {
  return (
    <div className="r-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
      <p style={{ fontSize: '1.75rem', fontWeight: 700, color: color || 'var(--r-navy)' }}>{value}</p>
      <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>{label}</p>
    </div>
  )
}

export default function ProgramAnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString()

      const [
        appsThisMonth, appsThisYear, allApps, waitlist,
        residents, graduates, cohorts,
        albumEntries, practicumLogs, observations,
        scholarships,
      ] = await Promise.all([
        supabase.from('residency_applications').select('*', { count: 'exact', head: true }).gte('submitted_at', startOfMonth).is('deleted_at', null),
        supabase.from('residency_applications').select('*', { count: 'exact', head: true }).gte('submitted_at', startOfYear).is('deleted_at', null),
        supabase.from('residency_applications').select('status, track_interest, heard_about, equity_fellows').is('deleted_at', null),
        supabase.from('residency_waitlist').select('*', { count: 'exact', head: true }).is('deleted_at', null),
        supabase.from('residency_residents').select('id, status, current_standing, cohort:residency_cohorts(name, track)'),
        supabase.from('residency_graduates').select('id, track, completed_at, cohort:residency_cohorts(name)').is('deleted_at', null),
        supabase.from('residency_cohorts').select('id, name, track, status').is('deleted_at', null),
        supabase.from('residency_album_entries').select('status, resident_id').is('deleted_at', null),
        supabase.from('residency_practicum_logs').select('resident_id, hours_teaching, hours_observation').is('deleted_at', null),
        supabase.from('residency_observation_forms').select('resident_id').is('deleted_at', null),
        supabase.from('residency_scholarships').select('award_status, award_amount').is('deleted_at', null),
      ])

      const allAppData = allApps.data || []
      const accepted = allAppData.filter(a => a.status === 'accepted').length
      const residentData = residents.data || []
      const activeResidents = residentData.filter(r => r.status === 'enrolled' || r.status === 'active')
      const gradData = graduates.data || []
      const albumData = albumEntries.data || []
      const practData = practicumLogs.data || []
      const obsData = observations.data || []
      const scholarshipData = scholarships.data || []

      // Standings
      const goodStanding = activeResidents.filter(r => r.current_standing === 'good_standing' || !r.current_standing).length
      const watch = activeResidents.filter(r => r.current_standing === 'academic_watch').length
      const remediation = activeResidents.filter(r => r.current_standing === 'formal_remediation').length

      // Track breakdown
      const primaryApps = allAppData.filter(a => a.track_interest === 'primary').length
      const elemApps = allAppData.filter(a => a.track_interest === 'elementary').length

      // Source channels
      const sources: Record<string, number> = {}
      for (const a of allAppData) {
        if (a.heard_about) sources[a.heard_about] = (sources[a.heard_about] || 0) + 1
      }

      // Completion pipeline
      const albumsByResident: Record<string, number> = {}
      for (const e of albumData) {
        if (e.status === 'complete') albumsByResident[e.resident_id] = (albumsByResident[e.resident_id] || 0) + 1
      }

      const hoursByResident: Record<string, number> = {}
      for (const l of practData) {
        hoursByResident[l.resident_id] = (hoursByResident[l.resident_id] || 0) + Number(l.hours_teaching || 0) + Number(l.hours_observation || 0)
      }

      const at75 = activeResidents.filter(r => (albumsByResident[r.id] || 0) > 0).length
      const equityApps = allAppData.filter(a => a.equity_fellows).length
      const equityAwarded = scholarshipData.filter(s => s.award_status === 'full_award' || s.award_status === 'partial_award').length

      setData({
        pipeline: {
          appsThisMonth: appsThisMonth.count || 0,
          appsYTD: appsThisYear.count || 0,
          totalApps: allAppData.length,
          conversionRate: allAppData.length > 0 ? Math.round((accepted / allAppData.length) * 100) : 0,
          primaryApps, elemApps,
          sources,
          waitlistSize: waitlist.count || 0,
          equityApps, equityAwarded,
        },
        enrollment: {
          totalActive: activeResidents.length,
          goodStanding, watch, remediation,
          cohortCount: (cohorts.data || []).length,
        },
        completion: {
          at75Percent: at75,
          graduates: gradData.length,
          graduatesByTrack: {
            primary: gradData.filter(g => g.track === 'primary').length,
            elementary: gradData.filter(g => g.track === 'elementary').length,
          },
        },
        assessment: {
          totalAlbumEntries: albumData.length,
          completedEntries: albumData.filter(e => e.status === 'complete').length,
          pendingEntries: albumData.filter(e => e.status === 'submitted' || e.status === 'ai_review' || e.status === 'ai_passed').length,
          totalObservations: obsData.length,
        },
      })
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>
  if (!data) return null

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Program Analytics</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Operational overview of the Montessori Makers Residency
      </p>

      {/* Pipeline */}
      <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Pipeline</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
        <StatCard value={data.pipeline.appsThisMonth} label="Apps This Month" />
        <StatCard value={data.pipeline.appsYTD} label="Apps YTD" />
        <StatCard value={`${data.pipeline.conversionRate}%`} label="Conversion Rate" />
        <StatCard value={data.pipeline.waitlistSize} label="Waitlist" />
        <StatCard value={data.pipeline.equityAwarded} label="Equity Fellows Awarded" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div className="r-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>By Track</h3>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div><span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--r-navy)' }}>{data.pipeline.primaryApps}</span> <span style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Primary</span></div>
            <div><span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--r-navy)' }}>{data.pipeline.elemApps}</span> <span style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Elementary</span></div>
          </div>
        </div>
        <div className="r-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>By Source</h3>
          {Object.entries(data.pipeline.sources).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {Object.entries(data.pipeline.sources).sort((a, b) => (b[1] as number) - (a[1] as number)).slice(0, 5).map(([source, count]) => (
                <div key={source} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                  <span style={{ color: 'var(--r-text-muted)' }}>{source}</span>
                  <span style={{ fontWeight: 600 }}>{count as number}</span>
                </div>
              ))}
            </div>
          ) : <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>No source data yet</p>}
        </div>
      </div>

      {/* Enrollment */}
      <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Enrollment</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
        <StatCard value={data.enrollment.totalActive} label="Active Residents" />
        <StatCard value={data.enrollment.goodStanding} label="Good Standing" color="var(--r-success)" />
        <StatCard value={data.enrollment.watch} label="Academic Watch" color="var(--r-warning)" />
        <StatCard value={data.enrollment.remediation} label="Remediation" color="var(--r-error)" />
      </div>

      {/* Assessment Health */}
      <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Assessment Health</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
        <StatCard value={data.assessment.totalAlbumEntries} label="Total Album Entries" />
        <StatCard value={data.assessment.completedEntries} label="Completed" color="var(--r-success)" />
        <StatCard value={data.assessment.pendingEntries} label="Pending Review" color="var(--r-warning)" />
        <StatCard value={data.assessment.totalObservations} label="Observations" />
      </div>

      {/* Completion Pipeline */}
      <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Completion Pipeline</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
        <StatCard value={data.completion.at75Percent} label="With Album Progress" />
        <StatCard value={data.completion.graduates} label="Total Graduates" color="var(--r-success)" />
        <StatCard value={data.completion.graduatesByTrack.primary} label="Primary Graduates" />
        <StatCard value={data.completion.graduatesByTrack.elementary} label="Elementary Graduates" />
      </div>
    </div>
  )
}
