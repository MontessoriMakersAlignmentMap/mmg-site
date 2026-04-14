'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const RUBRIC_LABELS: Record<string, string> = {
  practice: 'Montessori Practice Rubric',
  reflective: 'Reflective Practice Rubric',
  equity: 'Equity Checklist',
}

const BAND_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  highly_proficient: { bg: 'var(--r-success-light)', color: 'var(--r-success)', label: 'Highly Proficient' },
  proficient: { bg: 'var(--r-info-light)', color: 'var(--r-info)', label: 'Proficient' },
  developing: { bg: 'var(--r-feedback-bg)', color: 'var(--r-feedback-color)', label: 'Developing' },
  needs_support: { bg: '#fce4ec', color: '#c62828', label: 'Needs Support' },
}

const STANDING_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  good_standing: { bg: 'var(--r-success-light)', color: 'var(--r-success)', label: 'Good Standing' },
  academic_watch: { bg: 'var(--r-feedback-bg)', color: 'var(--r-feedback-color)', label: 'Academic Watch' },
  formal_remediation: { bg: '#fce4ec', color: '#c62828', label: 'Formal Remediation' },
}

const FOCUS_LABELS: Record<string, string> = {
  prepared_environment: 'Prepared Environment',
  lesson_presentation: 'Lesson Presentation',
  child_interaction: 'Child Interaction & Independence',
  observation_documentation: 'Observation & Documentation',
  adult_presence: 'Adult Presence & Grace',
  classroom_management: 'Classroom Management & Flow',
  other: 'Other',
}

export default function PortfolioPage() {
  const [resident, setResident] = useState<any>(null)
  const [assessments, setAssessments] = useState<any[]>([])
  const [observations, setObservations] = useState<any[]>([])
  const [standingHistory, setStandingHistory] = useState<any[]>([])
  const [handbookAck, setHandbookAck] = useState<any>(null)
  const [materialsSessions, setMaterialsSessions] = useState<any[]>([])
  const [remotePractice, setRemotePractice] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [readingLog, setReadingLog] = useState<any[]>([])
  const [readingAssignments, setReadingAssignments] = useState<any[]>([])
  const [reflectionId, setReflectionId] = useState<string | null>(null)
  const [reflectionText, setReflectionText] = useState('')
  const [reflectionSaving, setReflectionSaving] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: res } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(*), assigned_level:residency_levels(name)')
        .eq('profile_id', user.id)
        .single()

      if (res) {
        setResident(res)

        const [aResult, oResult, shResult, haResult, msResult, rpResult] = await Promise.all([
          supabase
            .from('residency_rubric_submissions')
            .select('*, mentor:residency_profiles!residency_rubric_submissions_mentor_id_fkey(first_name, last_name)')
            .eq('resident_id', res.id)
            .is('deleted_at', null)
            .order('observation_date', { ascending: false }),
          supabase
            .from('residency_observation_forms')
            .select('*, observer:residency_profiles!residency_observation_forms_observer_id_fkey(first_name, last_name)')
            .eq('resident_id', res.id)
            .is('deleted_at', null)
            .order('observation_date', { ascending: false }),
          supabase
            .from('residency_standing_history')
            .select('*, changed_by_profile:residency_profiles!residency_standing_history_changed_by_fkey(first_name, last_name)')
            .eq('resident_id', res.id)
            .order('created_at', { ascending: false }),
          supabase
            .from('residency_handbook_acks')
            .select('*')
            .eq('resident_id', res.id)
            .maybeSingle(),
          supabase
            .from('residency_observation_logs')
            .select('*')
            .eq('resident_id', res.id)
            .eq('materials_session_completed', true)
            .order('observation_date', { ascending: false }),
          supabase
            .from('residency_remote_materials_practice')
            .select('*')
            .eq('resident_id', res.id)
            .order('submitted_at', { ascending: false }),
        ])

        if (aResult.data) setAssessments(aResult.data)
        if (oResult.data) setObservations(oResult.data)
        if (shResult.data) setStandingHistory(shResult.data)
        if (haResult.data) setHandbookAck(haResult.data)
        if (msResult.data) setMaterialsSessions(msResult.data)
        if (rpResult.data) setRemotePractice(rpResult.data)

        // Load reading log
        const track = (res.assigned_level as any)?.name?.toLowerCase() === 'elementary' ? 'elementary' : 'primary'
        const [{ data: ra }, { data: rl }] = await Promise.all([
          supabase.from('residency_reading_assignments').select('*').eq('track', track).order('month_number'),
          supabase.from('residency_reading_log').select('*').eq('resident_id', res.id),
        ])
        if (ra) setReadingAssignments(ra)
        if (rl) setReadingLog(rl)
      }

      setLoading(false)
    }
    load()
  }, [])

  async function saveReflection() {
    if (!reflectionId) return
    setReflectionSaving(true)
    await supabase
      .from('residency_rubric_submissions')
      .update({
        resident_reflection: reflectionText,
        resident_reflection_at: new Date().toISOString(),
      })
      .eq('id', reflectionId)

    setAssessments(prev => prev.map(a =>
      a.id === reflectionId ? { ...a, resident_reflection: reflectionText, resident_reflection_at: new Date().toISOString() } : a
    ))
    setReflectionId(null)
    setReflectionText('')
    setReflectionSaving(false)
  }

  async function acknowledgeHandbook() {
    if (!resident) return
    const { data } = await supabase
      .from('residency_handbook_acks')
      .insert({ resident_id: resident.id })
      .select()
      .single()
    if (data) setHandbookAck(data)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>
  if (!resident) return <p>Resident record not found.</p>

  const standing = resident.current_standing
  const standingStyle = STANDING_STYLES[standing] ?? STANDING_STYLES.good_standing

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>My Portfolio</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Your complete record of assessments, observations, and progress for MACTE accreditation.
      </p>

      {/* Standing */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Current Standing</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
              {resident.assigned_level?.name} &bull; {resident.cohort ?? 'No cohort assigned'}
            </p>
          </div>
          <span style={{
            padding: '0.375rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.8125rem',
            fontWeight: 700,
            background: standingStyle.bg,
            color: standingStyle.color,
          }}>
            {standingStyle.label}
          </span>
        </div>
      </div>

      {/* Handbook */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Candidate Handbook</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
              {handbookAck
                ? `Acknowledged on ${new Date(handbookAck.acknowledged_at).toLocaleDateString()}`
                : 'You must acknowledge the candidate handbook to proceed.'
              }
            </p>
          </div>
          {handbookAck ? (
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--r-success)' }}>Acknowledged</span>
          ) : (
            <button onClick={acknowledgeHandbook} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
              I Acknowledge
            </button>
          )}
        </div>
      </div>

      {/* Assessments */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Formal Assessments</h2>

        {assessments.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No assessments completed yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {assessments.map(a => {
              const band = a.proficiency_band ? BAND_STYLES[a.proficiency_band] : null
              return (
                <div key={a.id} style={{
                  padding: '1rem',
                  background: 'var(--r-cream)',
                  borderRadius: '8px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '0.9375rem', margin: 0 }}>
                        {RUBRIC_LABELS[a.rubric_type] ?? a.rubric_type}
                      </h3>
                      <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                        {new Date(a.observation_date).toLocaleDateString()}
                        {a.semester && ` — ${a.semester}`}
                        {a.mentor && ` — ${a.mentor.first_name} ${a.mentor.last_name}`}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {a.rubric_type !== 'equity' && a.overall_score != null && (
                        <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--r-navy)', margin: 0 }}>
                          {Number(a.overall_score).toFixed(2)}
                        </p>
                      )}
                      {band && (
                        <span style={{
                          display: 'inline-block',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.625rem',
                          fontWeight: 600,
                          background: band.bg,
                          color: band.color,
                        }}>
                          {band.label}
                        </span>
                      )}
                    </div>
                  </div>

                  {a.overall_summary && (
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text)', marginBottom: '0.5rem', lineHeight: 1.5 }}>
                      {a.overall_summary}
                    </p>
                  )}

                  {/* Reflection */}
                  {a.resident_reflection ? (
                    <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: 'var(--r-white)', borderRadius: '6px', border: '1px solid var(--r-border)' }}>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>
                        Your Reflection — {new Date(a.resident_reflection_at).toLocaleDateString()}
                      </p>
                      <p style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>{a.resident_reflection}</p>
                    </div>
                  ) : reflectionId === a.id ? (
                    <div style={{ marginTop: '0.5rem' }}>
                      <textarea
                        className="r-textarea"
                        value={reflectionText}
                        onChange={e => setReflectionText(e.target.value)}
                        placeholder="Write your reflection on this assessment..."
                        style={{ minHeight: '100px', marginBottom: '0.5rem' }}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={saveReflection} className="r-btn r-btn-primary" disabled={reflectionSaving} style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>
                          {reflectionSaving ? 'Saving...' : 'Save Reflection'}
                        </button>
                        <button onClick={() => { setReflectionId(null); setReflectionText('') }} className="r-btn r-btn-secondary" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setReflectionId(a.id); setReflectionText('') }}
                      style={{
                        marginTop: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--r-navy)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      Add Reflection
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Observations */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Observation Records</h2>

        {observations.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No observations recorded yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {observations.map(o => (
              <div key={o.id} style={{
                padding: '0.875rem',
                background: 'var(--r-cream)',
                borderRadius: '8px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '0.9375rem', margin: 0, marginBottom: '0.125rem' }}>
                      {FOCUS_LABELS[o.observation_focus] ?? o.observation_focus_other ?? o.observation_focus}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                      {new Date(o.observation_date).toLocaleDateString()}
                      {o.observer && ` — ${o.observer.first_name} ${o.observer.last_name}`}
                    </p>
                  </div>
                  {o.indicators_present && o.indicators_present.length > 0 && (
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-navy)' }}>
                      {o.indicators_present.length} indicators
                    </span>
                  )}
                </div>
                {o.summary_feedback && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                    {o.summary_feedback}
                  </p>
                )}
                {o.suggested_next_steps && (
                  <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', background: 'var(--r-white)', borderRadius: '6px', border: '1px solid var(--r-border)' }}>
                    <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.125rem' }}>Next Steps</p>
                    <p style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>{o.suggested_next_steps}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Materials Practice */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Materials Practice</h2>

        {/* Summary stats */}
        {(() => {
          const totalMinutes = materialsSessions.reduce((s: number, m: any) => s + (m.materials_session_duration || 0), 0)
          const totalHours = (totalMinutes / 60).toFixed(1)
          const allAreas = ['Practical Life', 'Sensorial', 'Language', 'Mathematics', 'Geometry', 'Cultural Studies', 'Theory', 'Behavior Support']
          const coveredAreas = new Set<string>()
          materialsSessions.forEach((m: any) => (m.materials_areas || []).forEach((a: string) => coveredAreas.add(a)))
          remotePractice.forEach((r: any) => { if (r.strand) coveredAreas.add(r.strand) })

          return (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.75rem 1rem', background: 'var(--r-cream)', borderRadius: '8px', flex: 1 }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--r-navy)', margin: 0 }}>{totalHours}</p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', margin: 0 }}>Practice Hours</p>
                </div>
                <div style={{ padding: '0.75rem 1rem', background: 'var(--r-cream)', borderRadius: '8px', flex: 1 }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--r-navy)', margin: 0 }}>{materialsSessions.length + remotePractice.length}</p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', margin: 0 }}>Total Sessions</p>
                </div>
              </div>

              {/* Coverage indicator */}
              <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>
                Curriculum Coverage
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {allAreas.map(area => (
                  <span key={area} style={{
                    padding: '0.25rem 0.625rem',
                    borderRadius: '9999px',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    background: coveredAreas.has(area) ? 'var(--r-success-light)' : 'var(--r-cream)',
                    color: coveredAreas.has(area) ? 'var(--r-success)' : 'var(--r-text-muted)',
                    border: `1px solid ${coveredAreas.has(area) ? 'var(--r-success)' : 'var(--r-border)'}`,
                  }}>
                    {coveredAreas.has(area) ? '\u2713 ' : ''}{area}
                  </span>
                ))}
              </div>
            </div>
          )
        })()}

        {/* Observation site sessions timeline */}
        {materialsSessions.length === 0 && remotePractice.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No materials practice sessions logged yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {materialsSessions.map((m: any) => (
              <div key={m.id} style={{
                padding: '0.875rem',
                background: 'var(--r-cream)',
                borderRadius: '8px',
                borderLeft: '3px solid var(--r-navy)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.375rem' }}>
                  <div>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, margin: 0 }}>
                      {m.school_name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', margin: 0 }}>
                      {new Date(m.observation_date).toLocaleDateString()} &bull; {m.materials_session_duration} min
                    </p>
                  </div>
                  <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--r-navy)', background: 'var(--r-white)', padding: '0.125rem 0.5rem', borderRadius: '4px' }}>
                    On-Site
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.375rem' }}>
                  {(m.materials_areas || []).map((a: string) => (
                    <span key={a} style={{ fontSize: '0.625rem', padding: '0.125rem 0.375rem', borderRadius: '4px', background: 'var(--r-white)', color: 'var(--r-text-muted)' }}>
                      {a}
                    </span>
                  ))}
                </div>
                {m.materials_practice_notes && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text)', lineHeight: 1.5, margin: 0 }}>
                    {m.materials_practice_notes.length > 200
                      ? m.materials_practice_notes.substring(0, 200) + '...'
                      : m.materials_practice_notes}
                  </p>
                )}
              </div>
            ))}

            {/* Remote practice submissions */}
            {remotePractice.map((r: any) => (
              <div key={r.id} style={{
                padding: '0.875rem',
                background: 'var(--r-cream)',
                borderRadius: '8px',
                borderLeft: '3px solid var(--r-feedback-color)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.375rem' }}>
                  <div>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, margin: 0 }}>
                      {r.lesson_title}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', margin: 0 }}>
                      {new Date(r.submitted_at).toLocaleDateString()} &bull; {r.strand}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--r-feedback-color)', background: 'var(--r-feedback-bg)', padding: '0.125rem 0.5rem', borderRadius: '4px' }}>
                    Remote
                  </span>
                </div>
                {r.readiness_rating && (
                  <span style={{
                    display: 'inline-block',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    padding: '0.125rem 0.5rem',
                    borderRadius: '9999px',
                    marginBottom: '0.375rem',
                    background: r.readiness_rating === 'ready_for_practicum' ? 'var(--r-success-light)' : r.readiness_rating === 'developing_well' ? 'var(--r-info-light)' : 'var(--r-feedback-bg)',
                    color: r.readiness_rating === 'ready_for_practicum' ? 'var(--r-success)' : r.readiness_rating === 'developing_well' ? 'var(--r-info)' : 'var(--r-feedback-color)',
                  }}>
                    {r.readiness_rating.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                  </span>
                )}
                {r.self_reflection && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text)', lineHeight: 1.5, margin: 0 }}>
                    {r.self_reflection.length > 200
                      ? r.self_reflection.substring(0, 200) + '...'
                      : r.self_reflection}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reading Log */}
      {readingAssignments.length > 0 && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Reading Log</h2>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem 1rem', background: 'var(--r-cream)', borderRadius: '8px', flex: 1 }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--r-navy)', margin: 0 }}>
                {readingLog.filter(l => l.completed).length}/{readingAssignments.length}
              </p>
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', margin: 0 }}>Readings Completed</p>
            </div>
            <div style={{ padding: '0.75rem 1rem', background: 'var(--r-cream)', borderRadius: '8px', flex: 1 }}>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--r-navy)', margin: 0 }}>
                {readingLog.filter(l => l.notes).length}
              </p>
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', margin: 0 }}>Reflections Written</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {readingAssignments.map(ra => {
              const log = readingLog.find(l => l.reading_assignment_id === ra.id)
              return (
                <div key={ra.id} style={{
                  padding: '0.75rem',
                  background: 'var(--r-cream)',
                  borderRadius: '8px',
                  borderLeft: log?.completed ? '3px solid var(--r-success)' : '3px solid var(--r-border)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 600, margin: 0 }}>{ra.book_title}</p>
                      <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', margin: 0 }}>
                        {ra.author && `by ${ra.author} · `}
                        {ra.chapters_pages && `${ra.chapters_pages} · `}
                        Month {ra.month_number}
                      </p>
                    </div>
                    {log?.completed && (
                      <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--r-success)', background: 'var(--r-success-light)', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>
                        ✓ Complete
                      </span>
                    )}
                  </div>
                  {log?.notes && (
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text)', marginTop: '0.375rem', lineHeight: 1.5 }}>
                      {log.notes.length > 150 ? log.notes.substring(0, 150) + '...' : log.notes}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Standing History */}
      {standingHistory.length > 0 && (
        <div className="r-card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Standing History</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {standingHistory.map(sh => {
              const s = STANDING_STYLES[sh.standing] ?? STANDING_STYLES.good_standing
              return (
                <div key={sh.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.625rem 0.875rem',
                  background: 'var(--r-cream)',
                  borderRadius: '6px',
                }}>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      background: s.bg,
                      color: s.color,
                      marginRight: '0.5rem',
                    }}>
                      {s.label}
                    </span>
                    <span style={{ fontSize: '0.8125rem' }}>{sh.reason}</span>
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                    {new Date(sh.created_at).toLocaleDateString()}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
