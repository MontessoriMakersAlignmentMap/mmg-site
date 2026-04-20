'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const FOCUS_OPTIONS = [
  { value: 'prepared_environment', label: 'Prepared Environment' },
  { value: 'lesson_presentation', label: 'Lesson Presentation' },
  { value: 'child_interaction', label: 'Child Interaction & Independence' },
  { value: 'observation_documentation', label: 'Observation & Documentation' },
  { value: 'adult_presence', label: 'Adult Presence & Grace' },
  { value: 'classroom_management', label: 'Classroom Management & Flow' },
]

const INDICATOR_SETS: Record<string, { key: string; label: string }[]> = {
  prepared_environment: [
    { key: 'pe_orderly', label: 'Shelves are orderly and accessible' },
    { key: 'pe_complete', label: 'Materials are complete and in good condition' },
    { key: 'pe_beauty', label: 'Environment reflects beauty and intentionality' },
    { key: 'pe_cultural', label: 'Culturally responsive materials present' },
    { key: 'pe_independence', label: 'Layout promotes child independence' },
    { key: 'pe_rotation', label: 'Materials rotated based on observation' },
  ],
  lesson_presentation: [
    { key: 'lp_precise', label: 'Movements are precise and economical' },
    { key: 'lp_language', label: 'Language is clear and developmentally appropriate' },
    { key: 'lp_pacing', label: 'Pacing follows the child\'s rhythm' },
    { key: 'lp_key_points', label: 'Montessori key points are followed' },
    { key: 'lp_engagement', label: 'Child is engaged throughout presentation' },
    { key: 'lp_follow_up', label: 'Follow-up work is offered or encouraged' },
  ],
  child_interaction: [
    { key: 'ci_respect', label: 'Interactions are respectful and warm' },
    { key: 'ci_freedom', label: 'Children choose work freely within limits' },
    { key: 'ci_concentration', label: 'Sustained concentration is evident' },
    { key: 'ci_conflict', label: 'Conflict resolution is modeled or guided' },
    { key: 'ci_trust', label: 'Adult trusts child\'s process' },
    { key: 'ci_peer', label: 'Peer collaboration is supported' },
  ],
  observation_documentation: [
    { key: 'od_systematic', label: 'Observation is systematic and regular' },
    { key: 'od_objective', label: 'Notes are objective and specific' },
    { key: 'od_records', label: 'Records are organized and accessible' },
    { key: 'od_patterns', label: 'Patterns in child behavior are noted' },
    { key: 'od_adjustments', label: 'Curriculum adjusted based on observations' },
    { key: 'od_progress', label: 'Child progress is tracked over time' },
  ],
  adult_presence: [
    { key: 'ap_calm', label: 'Adult presence is calm and grounded' },
    { key: 'ap_patience', label: 'Demonstrates patience and trust' },
    { key: 'ap_grace', label: 'Models grace and courtesy' },
    { key: 'ap_voice', label: 'Voice is quiet and respectful' },
    { key: 'ap_positioning', label: 'Positions at child\'s level when appropriate' },
    { key: 'ap_nonverbal', label: 'Non-verbal communication is warm and inviting' },
  ],
  classroom_management: [
    { key: 'cm_transitions', label: 'Transitions are smooth and calm' },
    { key: 'cm_work_cycle', label: 'Uninterrupted work cycle is protected' },
    { key: 'cm_ground_rules', label: 'Ground rules are clear and consistent' },
    { key: 'cm_redirect', label: 'Redirection is gentle and respectful' },
    { key: 'cm_routines', label: 'Daily routines support independence' },
    { key: 'cm_group', label: 'Group gatherings are engaging and purposeful' },
  ],
}

const READINESS_OPTIONS = [
  { value: 'developing_as_expected', label: 'Developing as Expected' },
  { value: 'needs_additional_support', label: 'Needs Additional Support' },
  { value: 'exceeding_expectations', label: 'Exceeding Expectations' },
]

export default function MentorVirtualObservationReviewPage() {
  const params = useParams()
  const router = useRouter()
  const observationId = params.id as string

  const [obs, setObs] = useState<any>(null)
  const [resident, setResident] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [focus, setFocus] = useState('')
  const [indicatorsPresent, setIndicatorsPresent] = useState<string[]>([])
  const [observationNotes, setObservationNotes] = useState('')
  const [specificEvidence, setSpecificEvidence] = useState('')
  const [suggestedNextSteps, setSuggestedNextSteps] = useState('')
  const [summaryFeedback, setSummaryFeedback] = useState('')
  const [writtenFeedback, setWrittenFeedback] = useState('')
  const [overallReadiness, setOverallReadiness] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('residency_virtual_observations')
        .select('*')
        .eq('id', observationId)
        .single()

      if (data) {
        setObs(data)
        if (data.observation_focus) setFocus(data.observation_focus)
        if (data.indicators_present) setIndicatorsPresent(data.indicators_present)
        if (data.observation_notes) setObservationNotes(data.observation_notes)
        if (data.specific_evidence) setSpecificEvidence(data.specific_evidence)
        if (data.suggested_next_steps) setSuggestedNextSteps(data.suggested_next_steps)
        if (data.summary_feedback) setSummaryFeedback(data.summary_feedback)
        if (data.written_feedback) setWrittenFeedback(data.written_feedback)
        if (data.overall_readiness) setOverallReadiness(data.overall_readiness)

        const { data: res } = await supabase
          .from('residency_residents')
          .select('id, profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name)')
          .eq('id', data.resident_id)
          .single()

        if (res) setResident(res)
      }
      setLoading(false)
    }
    load()
  }, [observationId])

  function toggleIndicator(key: string) {
    setIndicatorsPresent(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  async function handleSaveDraft() {
    setSaving(true)
    setError('')

    const { error: updateError } = await supabase
      .from('residency_virtual_observations')
      .update({
        observation_focus: focus || null,
        indicators_present: indicatorsPresent,
        observation_notes: observationNotes || null,
        specific_evidence: specificEvidence || null,
        suggested_next_steps: suggestedNextSteps || null,
        summary_feedback: summaryFeedback || null,
        written_feedback: writtenFeedback || null,
        overall_readiness: overallReadiness || null,
        review_status: 'in_progress',
      })
      .eq('id', observationId)

    if (updateError) setError(updateError.message)
    else setObs({ ...obs, review_status: 'in_progress' })
    setSaving(false)
  }

  async function handleSubmitFeedback(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!overallReadiness) {
      setError('Please select an overall readiness level.')
      return
    }
    if (!writtenFeedback && !summaryFeedback) {
      setError('Please provide written feedback or a summary before submitting.')
      return
    }

    setSaving(true)

    const { error: updateError } = await supabase
      .from('residency_virtual_observations')
      .update({
        observation_focus: focus || null,
        indicators_present: indicatorsPresent,
        observation_notes: observationNotes || null,
        specific_evidence: specificEvidence || null,
        suggested_next_steps: suggestedNextSteps || null,
        summary_feedback: summaryFeedback || null,
        written_feedback: writtenFeedback || null,
        overall_readiness: overallReadiness,
        review_status: 'feedback_submitted',
        feedback_submitted_at: new Date().toISOString(),
      })
      .eq('id', observationId)

    if (updateError) {
      setError(updateError.message)
      setSaving(false)
      return
    }

    await fetch('/api/residency/virtual-observation/notify-resident', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ observation_id: observationId, overall_readiness: overallReadiness }),
    })

    router.push('/residency/mentor/virtual-observations')
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>
  if (!obs) return <p>Observation not found.</p>

  const isSubmitted = obs.review_status === 'feedback_submitted'
  const indicators = focus ? INDICATOR_SETS[focus] ?? [] : []
  const residentName = resident ? `${resident.profile?.first_name} ${resident.profile?.last_name}` : 'Resident'

  return (
    <div>
      <Link href="/residency/mentor/virtual-observations" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Virtual Observations
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Review: {residentName}</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            {new Date(obs.observation_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            {' · '}{obs.recording_duration_minutes} minutes
          </p>
        </div>
        {isSubmitted && (
          <span style={{
            fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '9999px',
            fontWeight: 600, background: 'var(--r-success-light)', color: 'var(--r-success)',
          }}>
            Feedback Submitted
          </span>
        )}
      </div>

      {/* Context + Recording */}
      <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Resident's Context Note</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)', lineHeight: 1.6, whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>
          {obs.context_note}
        </p>
        <a href={obs.recording_link} target="_blank" rel="noopener noreferrer"
          className="r-btn r-btn-secondary" style={{ textDecoration: 'none', fontSize: '0.8125rem' }}>
          Watch Recording ↗
        </a>
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmitFeedback} style={{ maxWidth: '700px' }}>
        {/* Focus Area */}
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Observation Focus</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Primary Focus Area</label>
            <select className="r-input" value={focus} onChange={e => { setFocus(e.target.value); setIndicatorsPresent([]) }} disabled={isSubmitted}>
              <option value="">Select focus...</option>
              {FOCUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {indicators.length > 0 && (
            <div>
              <label className="r-label" style={{ marginBottom: '0.75rem' }}>Indicators Observed</label>
              <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
                Check all indicators present in the recording.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {indicators.map(ind => {
                  const checked = indicatorsPresent.includes(ind.key)
                  return (
                    <label key={ind.key} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
                      padding: '0.75rem', background: checked ? 'var(--r-gold-light)' : 'var(--r-cream)',
                      borderRadius: '8px', cursor: isSubmitted ? 'default' : 'pointer',
                      border: checked ? '1px solid var(--r-gold)' : '1px solid transparent',
                    }}>
                      <input type="checkbox" checked={checked}
                        onChange={() => toggleIndicator(ind.key)}
                        disabled={isSubmitted}
                        style={{ marginTop: '0.125rem' }} />
                      <span style={{ fontSize: '0.875rem', lineHeight: 1.4 }}>{ind.label}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Observation Notes */}
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Observation Notes</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Detailed Notes</label>
            <textarea className="r-textarea" value={observationNotes} onChange={e => setObservationNotes(e.target.value)}
              style={{ minHeight: '150px' }} disabled={isSubmitted}
              placeholder="Describe what you observed in the recording. Include specific moments, transitions, and interactions..." />
          </div>

          <div>
            <label className="r-label">Specific Evidence</label>
            <textarea className="r-textarea" value={specificEvidence} onChange={e => setSpecificEvidence(e.target.value)}
              style={{ minHeight: '100px' }} disabled={isSubmitted}
              placeholder="What specific evidence supports your observations? Include timestamps, actions, or moments..." />
          </div>
        </div>

        {/* Feedback */}
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Feedback for Resident</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Overall Readiness</label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {READINESS_OPTIONS.map(opt => (
                <label key={opt.value} style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.625rem 1rem', borderRadius: '8px', cursor: isSubmitted ? 'default' : 'pointer',
                  background: overallReadiness === opt.value ? 'var(--r-navy)' : 'var(--r-cream)',
                  color: overallReadiness === opt.value ? 'white' : 'var(--r-text)',
                  fontSize: '0.8125rem', fontWeight: 500,
                  border: '1px solid ' + (overallReadiness === opt.value ? 'var(--r-navy)' : 'var(--r-border)'),
                }}>
                  <input type="radio" name="readiness" value={opt.value}
                    checked={overallReadiness === opt.value}
                    onChange={e => setOverallReadiness(e.target.value)}
                    disabled={isSubmitted}
                    style={{ display: 'none' }} />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Summary Feedback</label>
            <textarea className="r-textarea" value={summaryFeedback} onChange={e => setSummaryFeedback(e.target.value)}
              style={{ minHeight: '100px' }} disabled={isSubmitted}
              placeholder="A brief summary of this observation — what stood out, what's going well..." />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Detailed Written Feedback</label>
            <textarea className="r-textarea" value={writtenFeedback} onChange={e => setWrittenFeedback(e.target.value)}
              style={{ minHeight: '150px' }} disabled={isSubmitted}
              placeholder="Detailed feedback the resident will read carefully. Be specific, constructive, and direct..." />
          </div>

          <div>
            <label className="r-label">Suggested Next Steps</label>
            <textarea className="r-textarea" value={suggestedNextSteps} onChange={e => setSuggestedNextSteps(e.target.value)}
              style={{ minHeight: '100px' }} disabled={isSubmitted}
              placeholder="What should the resident focus on before the next observation? Be specific and actionable..." />
          </div>
        </div>

        {error && (
          <p style={{ color: 'var(--r-error)', fontSize: '0.8125rem', marginBottom: '1rem', padding: '0.75rem', background: 'var(--r-error-light)', borderRadius: '6px' }}>
            {error}
          </p>
        )}

        {!isSubmitted && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="submit" className="r-btn r-btn-primary" disabled={saving}>
              {saving ? 'Submitting...' : 'Submit Feedback'}
            </button>
            <button type="button" className="r-btn r-btn-secondary" onClick={handleSaveDraft} disabled={saving}>
              Save Draft
            </button>
            <Link href="/residency/mentor/virtual-observations" className="r-btn r-btn-secondary">Cancel</Link>
          </div>
        )}

        {isSubmitted && obs.resident_reflection && (
          <div className="r-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--r-success)' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Resident's Reflection</h2>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{obs.resident_reflection}</p>
            {obs.reflection_submitted_at && (
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.75rem' }}>
                Submitted {new Date(obs.reflection_submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            )}
          </div>
        )}
      </form>
    </div>
  )
}
