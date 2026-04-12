'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const SEVERITY_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  notice: { bg: '#e3f2fd', color: '#1565c0', label: 'Notice' },
  warning: { bg: '#fff8e1', color: '#f57f17', label: 'Warning' },
  critical: { bg: '#fce4ec', color: '#c62828', label: 'Critical' },
}

const WARNING_TYPE_LABELS: Record<string, string> = {
  low_rubric_score: 'Low Rubric Score',
  insufficient_hours: 'Insufficient Practicum Hours',
  missing_artifacts: 'Missing Portfolio Artifacts',
  excessive_absences: 'Excessive Absences',
  missing_competencies: 'Missing Competencies',
  overdue_submissions: 'Overdue Submissions',
}

export default function WarningsPage() {
  const [warnings, setWarnings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [filter, setFilter] = useState<'active' | 'resolved' | 'all'>('active')

  async function loadWarnings() {
    let query = supabase
      .from('residency_academic_warnings')
      .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name))')
      .order('created_at', { ascending: false })

    if (filter === 'active') query = query.eq('resolved', false)
    else if (filter === 'resolved') query = query.eq('resolved', true)

    const { data } = await query
    if (data) setWarnings(data)
    setLoading(false)
  }

  useEffect(() => { setLoading(true); loadWarnings() }, [filter])

  async function runScan() {
    setScanning(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setScanning(false); return }

    const { data: residents } = await supabase
      .from('residency_residents')
      .select('id, profile_id, profile:residency_profiles(first_name, last_name)')
      .in('status', ['active', 'enrolled'])

    if (!residents) { setScanning(false); return }

    const newWarnings: any[] = []

    for (const r of residents) {
      const profile = r.profile as any
      const name = `${profile?.first_name} ${profile?.last_name}`

      // Check practicum hours
      const { data: logs } = await supabase
        .from('residency_practicum_logs')
        .select('hours_teaching, hours_observation')
        .eq('resident_id', r.id)
        .is('deleted_at', null)

      if (logs) {
        const totalTeaching = logs.reduce((s: number, l: any) => s + Number(l.hours_teaching), 0)
        const totalObservation = logs.reduce((s: number, l: any) => s + Number(l.hours_observation), 0)
        if (totalTeaching < 270) { // Less than 50% of target
          newWarnings.push({
            resident_id: r.id,
            warning_type: 'insufficient_hours',
            severity: totalTeaching < 135 ? 'critical' : 'warning',
            title: `${name}: Teaching hours behind (${totalTeaching.toFixed(0)}/540)`,
            details: `Only ${((totalTeaching / 540) * 100).toFixed(0)}% of required teaching hours completed.`,
          })
        }
        if (totalObservation < 45) {
          newWarnings.push({
            resident_id: r.id,
            warning_type: 'insufficient_hours',
            severity: totalObservation < 22 ? 'critical' : 'warning',
            title: `${name}: Observation hours behind (${totalObservation.toFixed(0)}/90)`,
            details: `Only ${((totalObservation / 90) * 100).toFixed(0)}% of required observation hours completed.`,
          })
        }
      }

      // Check rubric scores
      const { data: rubrics } = await supabase
        .from('residency_rubric_submissions')
        .select('overall_score, rubric_type')
        .eq('resident_id', r.id)
        .is('deleted_at', null)

      if (rubrics) {
        const lowScores = rubrics.filter((rb: any) => rb.overall_score != null && Number(rb.overall_score) < 2.5)
        if (lowScores.length > 0) {
          newWarnings.push({
            resident_id: r.id,
            warning_type: 'low_rubric_score',
            severity: lowScores.some((rb: any) => Number(rb.overall_score) < 1.5) ? 'critical' : 'warning',
            title: `${name}: ${lowScores.length} rubric(s) below proficient`,
            details: `Scores below 2.5 on ${lowScores.map((rb: any) => rb.rubric_type).join(', ')} rubric(s).`,
          })
        }
      }

      // Check portfolio artifacts
      const { data: artifacts } = await supabase
        .from('residency_portfolio_artifacts')
        .select('status')
        .eq('resident_id', r.id)
        .is('deleted_at', null)

      const { data: requirements } = await supabase
        .from('residency_portfolio_requirements')
        .select('required_count')

      if (artifacts && requirements) {
        const totalRequired = requirements.reduce((s: number, rq: any) => s + rq.required_count, 0)
        const approved = artifacts.filter((a: any) => a.status === 'approved').length
        if (approved < totalRequired * 0.25) {
          newWarnings.push({
            resident_id: r.id,
            warning_type: 'missing_artifacts',
            severity: approved === 0 ? 'critical' : 'warning',
            title: `${name}: Portfolio artifacts behind (${approved}/${totalRequired})`,
            details: `Only ${approved} of ${totalRequired} required artifacts approved.`,
          })
        }
      }

      // Check seminar absences
      const { data: absences } = await supabase
        .from('residency_seminar_attendance')
        .select('status')
        .eq('resident_id', r.id)
        .eq('status', 'absent')

      if (absences && absences.length >= 2) {
        newWarnings.push({
          resident_id: r.id,
          warning_type: 'excessive_absences',
          severity: absences.length >= 5 ? 'critical' : 'warning',
          title: `${name}: ${absences.length} seminar absences`,
          details: `MACTE allows max ~1 absence per 9 seminars (90% threshold). Currently at ${absences.length} absences.`,
        })
      }
    }

    // Insert warnings (skip if similar unresolved warning exists)
    for (const w of newWarnings) {
      const { data: existing } = await supabase
        .from('residency_academic_warnings')
        .select('id')
        .eq('resident_id', w.resident_id)
        .eq('warning_type', w.warning_type)
        .eq('resolved', false)
        .limit(1)

      if (!existing || existing.length === 0) {
        await supabase.from('residency_academic_warnings').insert(w)
      }
    }

    setScanning(false)
    setLoading(true)
    loadWarnings()
  }

  async function resolveWarning(id: string) {
    await supabase.from('residency_academic_warnings').update({ resolved: true, resolved_at: new Date().toISOString() }).eq('id', id)
    setWarnings(prev => prev.map(w => w.id === id ? { ...w, resolved: true } : w))
  }

  async function acknowledgeWarning(id: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('residency_academic_warnings').update({
      acknowledged: true,
      acknowledged_by: user.id,
      acknowledged_at: new Date().toISOString(),
    }).eq('id', id)
    setWarnings(prev => prev.map(w => w.id === id ? { ...w, acknowledged: true } : w))
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  const criticalCount = warnings.filter(w => w.severity === 'critical' && !w.resolved).length
  const warningCount = warnings.filter(w => w.severity === 'warning' && !w.resolved).length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Academic Warnings</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Automated alerts based on MACTE progression thresholds. Run a scan to check all candidates.
          </p>
        </div>
        <button onClick={runScan} className="r-btn r-btn-primary" disabled={scanning} style={{ fontSize: '0.8125rem' }}>
          {scanning ? 'Scanning...' : 'Run Warning Scan'}
        </button>
      </div>

      {/* Alert summary */}
      {(criticalCount > 0 || warningCount > 0) && (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          {criticalCount > 0 && (
            <div style={{ padding: '0.75rem 1.25rem', background: '#fce4ec', borderRadius: '8px', border: '1px solid #ef9a9a' }}>
              <span style={{ fontWeight: 700, color: '#c62828', fontSize: '1.25rem' }}>{criticalCount}</span>
              <span style={{ fontSize: '0.8125rem', color: '#c62828', marginLeft: '0.5rem' }}>Critical</span>
            </div>
          )}
          {warningCount > 0 && (
            <div style={{ padding: '0.75rem 1.25rem', background: '#fff8e1', borderRadius: '8px', border: '1px solid #ffe082' }}>
              <span style={{ fontWeight: 700, color: '#f57f17', fontSize: '1.25rem' }}>{warningCount}</span>
              <span style={{ fontSize: '0.8125rem', color: '#f57f17', marginLeft: '0.5rem' }}>Warnings</span>
            </div>
          )}
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '1rem' }}>
        {(['active', 'resolved', 'all'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid var(--r-border)',
            background: filter === f ? 'var(--r-navy)' : 'transparent',
            color: filter === f ? '#fff' : 'var(--r-text-muted)',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            textTransform: 'capitalize',
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Warnings list */}
      <div className="r-card">
        {warnings.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            {filter === 'active' ? 'No active warnings. Run a scan to check.' : 'No warnings found.'}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {warnings.map(w => {
              const sev = SEVERITY_STYLES[w.severity] ?? SEVERITY_STYLES.warning
              return (
                <div key={w.id} style={{
                  padding: '0.75rem 0.875rem',
                  background: w.resolved ? '#f5f5f5' : 'var(--r-cream)',
                  borderRadius: '6px',
                  borderLeft: `3px solid ${sev.color}`,
                  opacity: w.resolved ? 0.6 : 1,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        padding: '0.125rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        background: sev.bg,
                        color: sev.color,
                      }}>
                        {sev.label}
                      </span>
                      <span style={{ fontSize: '0.625rem', color: 'var(--r-text-muted)', padding: '0.125rem 0.5rem', background: '#f5f5f5', borderRadius: '9999px' }}>
                        {WARNING_TYPE_LABELS[w.warning_type] ?? w.warning_type}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                      {new Date(w.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.125rem' }}>{w.title}</p>
                  {w.details && <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>{w.details}</p>}
                  {!w.resolved && (
                    <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.5rem' }}>
                      {!w.acknowledged && (
                        <button onClick={() => acknowledgeWarning(w.id)} style={{
                          padding: '0.25rem 0.625rem', borderRadius: '6px', border: '1px solid var(--r-border)',
                          background: 'transparent', fontSize: '0.625rem', fontWeight: 600, cursor: 'pointer', color: 'var(--r-navy)',
                        }}>
                          Acknowledge
                        </button>
                      )}
                      <button onClick={() => resolveWarning(w.id)} style={{
                        padding: '0.25rem 0.625rem', borderRadius: '6px', border: '1px solid var(--r-border)',
                        background: 'transparent', fontSize: '0.625rem', fontWeight: 600, cursor: 'pointer', color: '#2e7d32',
                      }}>
                        Resolve
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
