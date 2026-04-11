'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const TEACHING_TARGET = 540
const OBSERVATION_TARGET = 90

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [
        { data: residents },
        { data: logs },
        { data: rubrics },
        { data: artifacts },
        { data: requirements },
        { data: attendance },
        { data: seminars },
        { data: signoffs },
        { data: warnings },
        { data: plans },
        { data: evaluations },
      ] = await Promise.all([
        supabase.from('residency_residents').select('*, profile:residency_profiles(first_name, last_name), assigned_level:residency_levels(name)').in('status', ['active', 'enrolled', 'completed']),
        supabase.from('residency_practicum_logs').select('resident_id, hours_teaching, hours_observation').is('deleted_at', null),
        supabase.from('residency_rubric_submissions').select('resident_id, overall_score, proficiency_band, rubric_type').is('deleted_at', null),
        supabase.from('residency_portfolio_artifacts').select('resident_id, status').is('deleted_at', null),
        supabase.from('residency_portfolio_requirements').select('required_count'),
        supabase.from('residency_seminar_attendance').select('resident_id, status'),
        supabase.from('residency_seminars').select('id'),
        supabase.from('residency_competency_signoffs').select('resident_id, met'),
        supabase.from('residency_academic_warnings').select('severity, resolved'),
        supabase.from('residency_support_plans').select('status'),
        supabase.from('residency_mentor_evaluations').select('final_recommendation, evaluation_type'),
      ])

      setData({ residents, logs, rubrics, artifacts, requirements, attendance, seminars, signoffs, warnings, plans, evaluations })
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  const { residents, logs, rubrics, artifacts, requirements, attendance, seminars, signoffs, warnings, plans, evaluations } = data

  const totalResidents = residents?.length ?? 0
  const activeResidents = residents?.filter((r: any) => r.status === 'active' || r.status === 'enrolled').length ?? 0
  const completedResidents = residents?.filter((r: any) => r.status === 'completed').length ?? 0

  // Hours
  const totalTeachingHours = logs?.reduce((s: number, l: any) => s + Number(l.hours_teaching), 0) ?? 0
  const totalObservationHours = logs?.reduce((s: number, l: any) => s + Number(l.hours_observation), 0) ?? 0
  const avgTeachingPerResident = activeResidents > 0 ? totalTeachingHours / activeResidents : 0
  const avgObservationPerResident = activeResidents > 0 ? totalObservationHours / activeResidents : 0

  // Rubrics
  const totalRubrics = rubrics?.length ?? 0
  const avgRubricScore = rubrics?.filter((r: any) => r.overall_score != null).length > 0
    ? rubrics.filter((r: any) => r.overall_score != null).reduce((s: number, r: any) => s + Number(r.overall_score), 0) / rubrics.filter((r: any) => r.overall_score != null).length
    : null

  // Band distribution
  const bandCounts = { highly_proficient: 0, proficient: 0, developing: 0, needs_support: 0 }
  rubrics?.forEach((r: any) => { if (r.proficiency_band && bandCounts.hasOwnProperty(r.proficiency_band)) bandCounts[r.proficiency_band as keyof typeof bandCounts]++ })

  // Artifacts
  const totalRequired = requirements?.reduce((s: number, r: any) => s + r.required_count, 0) * activeResidents
  const totalApproved = artifacts?.filter((a: any) => a.status === 'approved').length ?? 0

  // Attendance
  const totalSeminars = seminars?.length ?? 0
  const totalAbsences = attendance?.filter((a: any) => a.status === 'absent').length ?? 0
  const attendanceRate = totalSeminars > 0 && activeResidents > 0
    ? ((((totalSeminars * activeResidents) - totalAbsences) / (totalSeminars * activeResidents)) * 100)
    : null

  // Competencies
  const totalCompetenciesMet = signoffs?.filter((s: any) => s.met).length ?? 0
  const totalCompetenciesPossible = activeResidents * 8

  // Warnings
  const activeWarnings = warnings?.filter((w: any) => !w.resolved).length ?? 0
  const criticalWarnings = warnings?.filter((w: any) => w.severity === 'critical' && !w.resolved).length ?? 0

  // Plans
  const activePlans = plans?.filter((p: any) => p.status === 'active' || p.status === 'extended').length ?? 0
  const completedPlans = plans?.filter((p: any) => p.status === 'completed').length ?? 0

  // Final recommendations
  const readyCount = evaluations?.filter((e: any) => e.final_recommendation === 'ready').length ?? 0
  const conditionsCount = evaluations?.filter((e: any) => e.final_recommendation === 'ready_with_conditions').length ?? 0

  const statCards = [
    { label: 'Active Candidates', value: activeResidents, color: 'var(--r-navy)' },
    { label: 'Completed', value: completedResidents, color: '#2e7d32' },
    { label: 'Avg Teaching Hours', value: avgTeachingPerResident.toFixed(0), color: 'var(--r-navy)' },
    { label: 'Avg Observation Hours', value: avgObservationPerResident.toFixed(0), color: '#1565c0' },
    { label: 'Total Rubric Assessments', value: totalRubrics, color: 'var(--r-navy)' },
    { label: 'Avg Rubric Score', value: avgRubricScore?.toFixed(2) ?? '—', color: 'var(--r-navy)' },
    { label: 'Portfolio Completion', value: totalRequired > 0 ? `${((totalApproved / totalRequired) * 100).toFixed(0)}%` : '—', color: 'var(--r-navy)' },
    { label: 'Seminar Attendance', value: attendanceRate != null ? `${attendanceRate.toFixed(0)}%` : '—', color: attendanceRate != null && attendanceRate >= 90 ? '#2e7d32' : '#f57f17' },
    { label: 'Competencies Met', value: `${totalCompetenciesMet}/${totalCompetenciesPossible}`, color: 'var(--r-navy)' },
    { label: 'Active Warnings', value: activeWarnings, color: activeWarnings > 0 ? '#f57f17' : '#2e7d32' },
    { label: 'Active Support Plans', value: activePlans, color: 'var(--r-navy)' },
    { label: 'Ready for Credential', value: readyCount, color: '#2e7d32' },
  ]

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Program Analytics</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Program-wide data for annual MACTE reporting and accreditation review.
      </p>

      {/* Key metrics grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {statCards.map(s => (
          <div key={s.label} className="r-card" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: s.color, marginBottom: '0.25rem' }}>{s.value}</p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Proficiency band distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="r-card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Proficiency Band Distribution</h2>
          {[
            { key: 'highly_proficient', label: 'Highly Proficient (3.5-4.0)', color: '#2e7d32', bg: '#e8f5e9' },
            { key: 'proficient', label: 'Proficient (2.5-3.4)', color: '#1565c0', bg: '#e3f2fd' },
            { key: 'developing', label: 'Developing (1.5-2.4)', color: '#f57f17', bg: '#fff8e1' },
            { key: 'needs_support', label: 'Needs Support (1.0-1.4)', color: '#c62828', bg: '#fce4ec' },
          ].map(band => {
            const count = bandCounts[band.key as keyof typeof bandCounts]
            const pct = totalRubrics > 0 ? (count / totalRubrics) * 100 : 0
            return (
              <div key={band.key} style={{ marginBottom: '0.625rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: band.color, fontWeight: 600 }}>{band.label}</span>
                  <span style={{ color: 'var(--r-text-muted)' }}>{count} ({pct.toFixed(0)}%)</span>
                </div>
                <div style={{ height: '6px', background: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: band.color, borderRadius: '3px' }} />
                </div>
              </div>
            )
          })}
        </div>

        <div className="r-card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Program Health Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { label: 'Hours on Track', ok: avgTeachingPerResident >= TEACHING_TARGET * 0.5, detail: `${avgTeachingPerResident.toFixed(0)} avg teaching / ${avgObservationPerResident.toFixed(0)} avg observation` },
              { label: 'Seminar Attendance', ok: attendanceRate != null && attendanceRate >= 90, detail: attendanceRate != null ? `${attendanceRate.toFixed(1)}% (90% required)` : 'No data' },
              { label: 'Academic Warnings', ok: criticalWarnings === 0, detail: `${criticalWarnings} critical, ${activeWarnings - criticalWarnings} warnings` },
              { label: 'Support Plans', ok: activePlans === 0, detail: `${activePlans} active, ${completedPlans} completed` },
              { label: 'Final Recommendations', ok: readyCount > 0, detail: `${readyCount} ready, ${conditionsCount} with conditions` },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.5rem 0.75rem', background: item.ok ? '#e8f5e9' : '#fff8e1', borderRadius: '6px',
              }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: item.ok ? '#2e7d32' : '#f57f17' }}>
                  {item.ok ? '\u2713' : '\u26A0'} {item.label}
                </span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>{item.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Per-candidate summary table */}
      <div className="r-card" style={{ overflowX: 'auto' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Candidate Summary Table</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
          <thead>
            <tr>
              {['Candidate', 'Level', 'Teaching Hrs', 'Obs Hrs', 'Rubrics', 'Avg Score', 'Artifacts', 'Absences', 'Competencies', 'Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid var(--r-border)', fontWeight: 600, fontSize: '0.6875rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {residents?.filter((r: any) => r.status === 'active' || r.status === 'enrolled').map((r: any) => {
              const rLogs = logs?.filter((l: any) => l.resident_id === r.id) ?? []
              const tHrs = rLogs.reduce((s: number, l: any) => s + Number(l.hours_teaching), 0)
              const oHrs = rLogs.reduce((s: number, l: any) => s + Number(l.hours_observation), 0)
              const rRubrics = rubrics?.filter((rb: any) => rb.resident_id === r.id) ?? []
              const rAvg = rRubrics.filter((rb: any) => rb.overall_score != null).length > 0
                ? rRubrics.filter((rb: any) => rb.overall_score != null).reduce((s: number, rb: any) => s + Number(rb.overall_score), 0) / rRubrics.filter((rb: any) => rb.overall_score != null).length
                : null
              const rArtifacts = artifacts?.filter((a: any) => a.resident_id === r.id && a.status === 'approved').length ?? 0
              const rAbsences = attendance?.filter((a: any) => a.resident_id === r.id && a.status === 'absent').length ?? 0
              const rCompMet = signoffs?.filter((s: any) => s.resident_id === r.id && s.met).length ?? 0

              return (
                <tr key={r.id}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', fontWeight: 500 }}>
                    {r.profile?.first_name} {r.profile?.last_name}
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)' }}>{r.assigned_level?.name ?? '—'}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', color: tHrs >= TEACHING_TARGET ? '#2e7d32' : 'inherit' }}>{tHrs.toFixed(0)}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', color: oHrs >= OBSERVATION_TARGET ? '#2e7d32' : 'inherit' }}>{oHrs.toFixed(0)}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)' }}>{rRubrics.length}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', fontWeight: 600 }}>{rAvg?.toFixed(2) ?? '—'}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)' }}>{rArtifacts}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', color: rAbsences >= 2 ? '#c62828' : 'inherit' }}>{rAbsences}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)' }}>{rCompMet}/8</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', textTransform: 'capitalize' }}>{r.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
