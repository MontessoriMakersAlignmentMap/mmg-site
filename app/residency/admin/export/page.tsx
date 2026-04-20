'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const TEACHING_TARGET = 540
const OBSERVATION_TARGET = 90

function openPrintableReport(html: string) {
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
  setTimeout(() => URL.revokeObjectURL(url), 60000)
}

export default function ExportPage() {
  const [residents, setResidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(first_name, last_name, email), assigned_level:residency_levels(name)')
        .in('status', ['active', 'enrolled', 'completed'])
        .order('created_at')
      if (data) setResidents(data)
      setLoading(false)
    }
    load()
  }, [])

  async function generateReport(residentId: string) {
    setGenerating(residentId)
    const resident = residents.find(r => r.id === residentId)
    if (!resident) { setGenerating(null); return }

    const [
      { data: logs },
      { data: rubrics },
      { data: artifacts },
      { data: observations },
      { data: attendance },
      { data: signoffs },
      { data: standing },
      { data: evaluations },
      { data: plans },
      { data: materialsSessions },
      { data: remotePractice },
      { data: virtualObservations },
      { data: practicumExceptions },
      { data: partnerAgreements },
    ] = await Promise.all([
      supabase.from('residency_practicum_logs').select('*').eq('resident_id', residentId).is('deleted_at', null).order('log_date'),
      supabase.from('residency_rubric_submissions').select('*, mentor:residency_profiles!residency_rubric_submissions_mentor_id_fkey(first_name, last_name)').eq('resident_id', residentId).is('deleted_at', null).order('submitted_at'),
      supabase.from('residency_portfolio_artifacts').select('*, requirement:residency_portfolio_requirements(label)').eq('resident_id', residentId).is('deleted_at', null).order('created_at'),
      supabase.from('residency_observation_forms').select('*, observer:residency_profiles!residency_observation_forms_observer_id_fkey(first_name, last_name)').eq('resident_id', residentId).is('deleted_at', null).order('observation_date'),
      supabase.from('residency_seminar_attendance').select('*, seminar:residency_seminars(title, seminar_date)').eq('resident_id', residentId),
      supabase.from('residency_competency_signoffs').select('*').eq('resident_id', residentId),
      supabase.from('residency_standing_history').select('*').eq('resident_id', residentId).order('created_at'),
      supabase.from('residency_mentor_evaluations').select('*').eq('resident_id', residentId).order('created_at'),
      supabase.from('residency_support_plans').select('*, checkins:residency_support_checkins(*)').eq('resident_id', residentId).order('created_at'),
      supabase.from('residency_observation_logs').select('*').eq('resident_id', residentId).eq('materials_session_completed', true).order('observation_date'),
      supabase.from('residency_remote_materials_practice').select('*').eq('resident_id', residentId).order('submitted_at'),
      supabase.from('residency_virtual_observations').select('*').eq('resident_id', residentId).is('deleted_at', null).order('observation_date'),
      supabase.from('residency_practicum_exceptions').select('*').eq('resident_id', residentId).order('created_at', { ascending: false }).limit(1),
      supabase.from('residency_partner_agreements').select('*, site:residency_placement_sites(name)').eq('resident_id', residentId).order('created_at', { ascending: false }).limit(1),
    ])

    const totalTeaching = logs?.reduce((s: number, l: any) => s + Number(l.hours_teaching), 0) ?? 0
    const totalObservation = logs?.reduce((s: number, l: any) => s + Number(l.hours_observation), 0) ?? 0
    const name = `${resident.profile?.first_name} ${resident.profile?.last_name}`
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    let html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>MACTE Accreditation Report — ${escape(name)}</title>
<style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; color: #333; font-size: 11pt; line-height: 1.5; }
  h1 { font-size: 18pt; border-bottom: 2px solid #1a365d; padding-bottom: 0.5rem; color: #1a365d; }
  h2 { font-size: 14pt; color: #1a365d; margin-top: 1.5rem; border-bottom: 1px solid #ddd; padding-bottom: 0.25rem; }
  h3 { font-size: 12pt; color: #444; margin-top: 1rem; }
  table { width: 100%; border-collapse: collapse; margin: 0.5rem 0; font-size: 10pt; }
  th, td { border: 1px solid #ddd; padding: 0.375rem 0.5rem; text-align: left; }
  th { background: #f5f5f5; font-weight: 600; }
  .badge { display: inline-block; padding: 0.125rem 0.5rem; border-radius: 4px; font-size: 9pt; font-weight: 600; }
  .badge-green { background: #e8f5e9; color: #2e7d32; }
  .badge-blue { background: #e3f2fd; color: #1565c0; }
  .badge-yellow { background: #fff8e1; color: #f57f17; }
  .footer { margin-top: 2rem; border-top: 1px solid #ddd; padding-top: 0.5rem; font-size: 9pt; color: #999; }
  @media print { body { padding: 0; } }
</style></head><body>
<h1>MACTE Candidate Accreditation Report</h1>
<p><strong>Candidate:</strong> ${escape(name)}<br>
<strong>Email:</strong> ${escape(resident.profile?.email ?? '—')}<br>
<strong>Level:</strong> ${escape(resident.assigned_level?.name ?? '—')}<br>
<strong>Cohort:</strong> ${escape(resident.cohort ?? '—')}<br>
<strong>Status:</strong> ${escape(resident.status)}<br>
<strong>Report Date:</strong> ${escape(today)}</p>

<h2>1. Practicum Hours</h2>
<table><tr><th>Category</th><th>Completed</th><th>Required</th><th>Status</th></tr>
<tr><td>Teaching Hours</td><td>${totalTeaching.toFixed(1)}</td><td>${TEACHING_TARGET}</td><td><span class="badge ${totalTeaching >= TEACHING_TARGET ? 'badge-green' : 'badge-yellow'}">${totalTeaching >= TEACHING_TARGET ? 'Met' : 'In Progress'}</span></td></tr>
<tr><td>Observation Hours</td><td>${totalObservation.toFixed(1)}</td><td>${OBSERVATION_TARGET}</td><td><span class="badge ${totalObservation >= OBSERVATION_TARGET ? 'badge-green' : 'badge-yellow'}">${totalObservation >= OBSERVATION_TARGET ? 'Met' : 'In Progress'}</span></td></tr>
</table>
<p>${logs?.length ?? 0} daily log entries recorded.</p>`

    // Rubric assessments
    html += `<h2>2. Rubric Assessments</h2>`
    if (rubrics && rubrics.length > 0) {
      html += `<table><tr><th>Type</th><th>Date</th><th>Score</th><th>Band</th><th>Mentor</th></tr>`
      rubrics.forEach((r: any) => {
        html += `<tr><td>${escape(r.rubric_type)}</td><td>${new Date(r.observation_date).toLocaleDateString()}</td><td>${r.overall_score != null ? Number(r.overall_score).toFixed(2) : '—'}</td><td>${escape(r.proficiency_band?.replace(/_/g, ' ') ?? '—')}</td><td>${r.mentor ? escape(`${r.mentor.first_name} ${r.mentor.last_name}`) : '—'}</td></tr>`
      })
      html += `</table>`
    } else {
      html += `<p>No rubric assessments recorded.</p>`
    }

    html += `<h2>3. Classroom Observations</h2><p>${observations?.length ?? 0} formal in-person observations completed.</p>`

    // Virtual Observations
    html += `<h2>3b. Virtual Observations</h2>`
    const completedVirtual = virtualObservations?.filter((v: any) => v.review_status === 'feedback_submitted') ?? []
    const hasException = practicumExceptions?.find((e: any) => e.status === 'approved')
    html += `<p>${virtualObservations?.length ?? 0} virtual observations submitted. ${completedVirtual.length} reviewed and complete.`
    if (hasException) html += ` <span class="badge badge-blue">All-virtual exception approved</span>`
    html += `</p>`
    if (completedVirtual.length > 0) {
      html += `<table><tr><th>Date</th><th>Duration</th><th>Focus</th><th>Readiness</th><th>Reflection</th></tr>`
      completedVirtual.forEach((v: any) => {
        html += `<tr><td>${new Date(v.observation_date).toLocaleDateString()}</td><td>${v.recording_duration_minutes} min</td><td>${escape((v.observation_focus ?? '—').replace(/_/g, ' '))}</td><td>${escape((v.overall_readiness ?? '—').replace(/_/g, ' '))}</td><td>${v.resident_reflection ? 'Yes' : 'No'}</td></tr>`
      })
      html += `</table>`
    }

    // Portfolio
    html += `<h2>4. Portfolio Artifacts</h2>`
    if (artifacts && artifacts.length > 0) {
      html += `<table><tr><th>Category</th><th>Title</th><th>Status</th></tr>`
      artifacts.forEach((a: any) => {
        const cls = a.status === 'approved' ? 'badge-green' : a.status === 'submitted' ? 'badge-blue' : 'badge-yellow'
        html += `<tr><td>${escape(a.requirement?.label ?? a.artifact_type.replace(/_/g, ' '))}</td><td>${escape(a.title)}</td><td><span class="badge ${cls}">${escape(a.status)}</span></td></tr>`
      })
      html += `</table>`
    } else {
      html += `<p>No portfolio artifacts uploaded.</p>`
    }

    // Attendance
    const totalAttended = attendance?.filter((a: any) => a.status === 'present').length ?? 0
    const totalAbsent = attendance?.filter((a: any) => a.status === 'absent').length ?? 0
    const totalExcused = attendance?.filter((a: any) => a.status === 'excused').length ?? 0
    html += `<h2>5. Seminar Attendance</h2><p>Present: ${totalAttended} | Absent: ${totalAbsent} | Excused: ${totalExcused}</p>`

    // Competencies
    html += `<h2>6. MACTE Competency Sign-Off</h2>`
    if (signoffs && signoffs.length > 0) {
      html += `<table><tr><th>Competency Area</th><th>Score</th><th>Status</th></tr>`
      signoffs.forEach((s: any) => {
        html += `<tr><td>${escape(s.competency_area.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()))}</td><td>${s.rubric_score != null ? Number(s.rubric_score).toFixed(2) : '—'}</td><td><span class="badge ${s.met ? 'badge-green' : 'badge-yellow'}">${s.met ? 'Met' : 'Not Met'}</span></td></tr>`
      })
      html += `</table>`
    } else {
      html += `<p>No competency sign-offs recorded.</p>`
    }

    // Standing
    html += `<h2>7. Standing History</h2>`
    if (standing && standing.length > 0) {
      html += `<table><tr><th>Date</th><th>Standing</th><th>Reason</th></tr>`
      standing.forEach((s: any) => {
        html += `<tr><td>${new Date(s.created_at).toLocaleDateString()}</td><td>${escape(s.standing.replace(/_/g, ' '))}</td><td>${escape(s.reason ?? '—')}</td></tr>`
      })
      html += `</table>`
    } else {
      html += `<p>No standing changes recorded. Candidate in good standing.</p>`
    }

    // Evaluations
    html += `<h2>8. Mentor Evaluations</h2>`
    if (evaluations && evaluations.length > 0) {
      evaluations.forEach((ev: any) => {
        html += `<h3>${ev.evaluation_type === 'mid_year' ? 'Mid-Year' : 'End-of-Year'} — ${escape(ev.academic_year)}</h3>`
        if (ev.strengths) html += `<p><strong>Strengths:</strong> ${escape(ev.strengths)}</p>`
        if (ev.areas_for_growth) html += `<p><strong>Areas for Growth:</strong> ${escape(ev.areas_for_growth)}</p>`
        if (ev.recommendations) html += `<p><strong>Recommendations:</strong> ${escape(ev.recommendations)}</p>`
        if (ev.final_recommendation) html += `<p><strong>Final Recommendation:</strong> <span class="badge badge-blue">${escape(ev.final_recommendation.replace(/_/g, ' '))}</span></p>`
      })
    } else {
      html += `<p>No evaluations submitted.</p>`
    }

    // Support plans
    html += `<h2>9. Support Plans</h2>`
    if (plans && plans.length > 0) {
      plans.forEach((p: any) => {
        html += `<h3>${escape(p.reason)} (${escape(p.status)})</h3><p>${p.timeline_weeks} weeks: ${escape(p.start_date)} to ${escape(p.end_date)}</p>`
        if (p.goals?.length) html += `<p><strong>Goals:</strong></p><ul>${p.goals.map((g: string) => `<li>${escape(g)}</li>`).join('')}</ul>`
        if (p.checkins?.length) html += `<p>${p.checkins.length} check-in(s) recorded.</p>`
      })
    } else {
      html += `<p>No support plans required.</p>`
    }

    // Structured Materials Practice Documentation
    html += `<h2>10. Structured Materials Practice Documentation</h2>`
    const matTotalMinutes = (materialsSessions || []).reduce((s: number, m: any) => s + (m.materials_session_duration || 0), 0)
    const matTotalHours = (matTotalMinutes / 60).toFixed(1)
    html += `<p><strong>Total Materials Practice Hours:</strong> ${matTotalHours} hours across ${(materialsSessions || []).length} on-site sessions and ${(remotePractice || []).length} remote practice submissions.</p>`

    if (materialsSessions && materialsSessions.length > 0) {
      html += `<h3>On-Site Materials Sessions</h3>`
      html += `<table><tr><th>Date</th><th>Site</th><th>Duration</th><th>Areas Covered</th><th>Guide Feedback</th><th>Resident Notes</th></tr>`
      materialsSessions.forEach((m: any) => {
        html += `<tr><td>${new Date(m.observation_date).toLocaleDateString()}</td><td>${escape(m.school_name)}</td><td>${m.materials_session_duration} min</td><td>${escape((m.materials_areas || []).join(', '))}</td><td>${escape(m.materials_guide_feedback?.substring(0, 200) ?? '—')}</td><td>${escape(m.materials_practice_notes?.substring(0, 200) ?? '—')}</td></tr>`
      })
      html += `</table>`
    }

    if (remotePractice && remotePractice.length > 0) {
      html += `<h3>Remote Practice Submissions</h3>`
      html += `<table><tr><th>Date</th><th>Lesson</th><th>Strand</th><th>Technique</th><th>Pacing</th><th>Isolation</th><th>Presence</th><th>Readiness</th></tr>`
      remotePractice.forEach((r: any) => {
        html += `<tr><td>${new Date(r.submitted_at).toLocaleDateString()}</td><td>${escape(r.lesson_title)}</td><td>${escape(r.strand)}</td><td>${escape(r.feedback_technique?.substring(0, 100) ?? '—')}</td><td>${escape(r.feedback_pacing?.substring(0, 100) ?? '—')}</td><td>${escape(r.feedback_isolation?.substring(0, 100) ?? '—')}</td><td>${escape(r.feedback_presence?.substring(0, 100) ?? '—')}</td><td>${r.readiness_rating ? escape(r.readiness_rating.replace(/_/g, ' ')) : '—'}</td></tr>`
      })
      html += `</table>`
    }

    if ((!materialsSessions || materialsSessions.length === 0) && (!remotePractice || remotePractice.length === 0)) {
      html += `<p>No materials practice sessions recorded.</p>`
    }

    // Partner Agreement
    html += `<h2>11. Partner School Agreement</h2>`
    const agreement = partnerAgreements?.[0]
    if (agreement) {
      html += `<p><strong>Site:</strong> ${escape(agreement.site?.name ?? '—')}<br>`
      html += `<strong>Academic Year:</strong> ${escape(agreement.academic_year)}<br>`
      html += `<strong>Status:</strong> <span class="badge ${agreement.status === 'signed' ? 'badge-green' : 'badge-yellow'}">${escape(agreement.status)}</span><br>`
      if (agreement.site_mentor_name) html += `<strong>Site Mentor:</strong> ${escape(agreement.site_mentor_name)} (${escape(agreement.site_mentor_montessori_credential ?? '—')})<br>`
      html += `<strong>Recording Consent:</strong> ${agreement.recording_consent_confirmed ? 'Confirmed' : 'Pending'}<br>`
      if (agreement.resident_employment_confirmed) html += `<strong>Employment:</strong> ${escape(agreement.resident_employment_role ?? '—')}, ${agreement.resident_employment_hours_per_week ?? '—'}h/week<br>`
      html += `</p>`
    } else {
      html += `<p>No partner agreement on file.</p>`
    }

    html += `<div class="footer"><p>Generated by Montessori Makers Group Residency Platform on ${escape(today)}.<br>
This report is prepared for MACTE accreditation review purposes.</p></div></body></html>`

    openPrintableReport(html)
    setGenerating(null)
  }

  async function generateProgramReport() {
    setGenerating('program')
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    const [
      { data: res },
      { data: logs },
      { data: rubrics },
      { data: signoffs },
      { data: attendance },
    ] = await Promise.all([
      supabase.from('residency_residents').select('*, profile:residency_profiles(first_name, last_name), assigned_level:residency_levels(name)').in('status', ['active', 'enrolled', 'completed']),
      supabase.from('residency_practicum_logs').select('resident_id, hours_teaching, hours_observation').is('deleted_at', null),
      supabase.from('residency_rubric_submissions').select('resident_id, overall_score, proficiency_band').is('deleted_at', null),
      supabase.from('residency_competency_signoffs').select('resident_id, met'),
      supabase.from('residency_seminar_attendance').select('resident_id, status'),
    ])

    let html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>MACTE Program Report — Montessori Makers Group</title>
<style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem; color: #333; font-size: 10pt; line-height: 1.4; }
  h1 { font-size: 16pt; border-bottom: 2px solid #1a365d; padding-bottom: 0.5rem; color: #1a365d; }
  h2 { font-size: 13pt; color: #1a365d; margin-top: 1.5rem; }
  table { width: 100%; border-collapse: collapse; margin: 0.5rem 0; font-size: 9pt; }
  th, td { border: 1px solid #ddd; padding: 0.25rem 0.375rem; text-align: left; }
  th { background: #f5f5f5; font-weight: 600; }
  .footer { margin-top: 2rem; border-top: 1px solid #ddd; padding-top: 0.5rem; font-size: 8pt; color: #999; }
  @media print { body { padding: 0; } }
</style></head><body>
<h1>MACTE Annual Program Report</h1>
<p><strong>Program:</strong> Montessori Makers Group Residency<br>
<strong>Report Date:</strong> ${escape(today)}<br>
<strong>Active Candidates:</strong> ${res?.filter((r: any) => r.status === 'active' || r.status === 'enrolled').length ?? 0}<br>
<strong>Completed:</strong> ${res?.filter((r: any) => r.status === 'completed').length ?? 0}</p>

<h2>Candidate Progress Summary</h2>
<table><tr><th>Candidate</th><th>Level</th><th>Teaching Hrs</th><th>Obs Hrs</th><th>Rubric Avg</th><th>Competencies</th><th>Absences</th><th>Status</th></tr>`

    res?.forEach((r: any) => {
      const rLogs = logs?.filter((l: any) => l.resident_id === r.id) ?? []
      const tHrs = rLogs.reduce((s: number, l: any) => s + Number(l.hours_teaching), 0)
      const oHrs = rLogs.reduce((s: number, l: any) => s + Number(l.hours_observation), 0)
      const rRubrics = rubrics?.filter((rb: any) => rb.resident_id === r.id) ?? []
      const avg = rRubrics.filter((rb: any) => rb.overall_score != null).length > 0
        ? (rRubrics.filter((rb: any) => rb.overall_score != null).reduce((s: number, rb: any) => s + Number(rb.overall_score), 0) / rRubrics.filter((rb: any) => rb.overall_score != null).length).toFixed(2)
        : '—'
      const compMet = signoffs?.filter((s: any) => s.resident_id === r.id && s.met).length ?? 0
      const abs = attendance?.filter((a: any) => a.resident_id === r.id && a.status === 'absent').length ?? 0
      html += `<tr><td>${escape(`${r.profile?.first_name} ${r.profile?.last_name}`)}</td><td>${escape(r.assigned_level?.name ?? '—')}</td><td>${tHrs.toFixed(0)}</td><td>${oHrs.toFixed(0)}</td><td>${avg}</td><td>${compMet}/8</td><td>${abs}</td><td>${escape(r.status)}</td></tr>`
    })

    html += `</table><div class="footer"><p>Generated by Montessori Makers Group Residency Platform on ${escape(today)}.</p></div></body></html>`

    openPrintableReport(html)
    setGenerating(null)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Accreditation Export</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Generate printable MACTE accreditation reports for individual candidates or the full program.
      </p>

      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Program Summary Report</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
              Full program overview with all candidate progress data for annual MACTE submission.
            </p>
          </div>
          <button onClick={generateProgramReport} className="r-btn r-btn-primary" disabled={generating === 'program'} style={{ fontSize: '0.8125rem' }}>
            {generating === 'program' ? 'Generating...' : 'Generate Program Report'}
          </button>
        </div>
      </div>

      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Individual Candidate Reports</h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1rem' }}>
          Complete accreditation portfolio — practicum hours, assessments, artifacts, competencies, evaluations, and standing history.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {residents.map(r => (
            <div key={r.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.625rem 0.875rem', background: 'var(--r-cream)', borderRadius: '6px',
            }}>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  {r.profile?.first_name} {r.profile?.last_name}
                </p>
                <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                  {r.assigned_level?.name ?? '—'} {r.cohort ? `— ${r.cohort}` : ''} — {r.status}
                </p>
              </div>
              <button onClick={() => generateReport(r.id)} disabled={generating === r.id}
                style={{
                  padding: '0.375rem 0.875rem', borderRadius: '6px', border: '1px solid var(--r-border)',
                  background: 'transparent', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', color: 'var(--r-navy)',
                }}>
                {generating === r.id ? 'Generating...' : 'Generate Report'}
              </button>
            </div>
          ))}
          {residents.length === 0 && (
            <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No residents found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
