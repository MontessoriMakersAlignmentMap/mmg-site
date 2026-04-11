'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const FOCUS_OPTIONS = [
  { value: 'prepared_environment', label: 'Prepared Environment' },
  { value: 'lesson_presentation', label: 'Lesson Presentation' },
  { value: 'child_interaction', label: 'Child Interaction & Independence' },
  { value: 'observation_documentation', label: 'Observation & Documentation' },
  { value: 'adult_presence', label: 'Adult Presence & Grace' },
  { value: 'classroom_management', label: 'Classroom Management & Flow' },
  { value: 'other', label: 'Other' },
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

export default function NewObservationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedResident = searchParams.get('resident')

  const [residents, setResidents] = useState<any[]>([])
  const [sites, setSites] = useState<any[]>([])
  const [residentId, setResidentId] = useState(preselectedResident ?? '')
  const [observationDate, setObservationDate] = useState(new Date().toISOString().split('T')[0])
  const [siteId, setSiteId] = useState('')
  const [semester, setSemester] = useState('')
  const [focus, setFocus] = useState('')
  const [focusOther, setFocusOther] = useState('')
  const [observationNotes, setObservationNotes] = useState('')
  const [indicatorsPresent, setIndicatorsPresent] = useState<string[]>([])
  const [specificEvidence, setSpecificEvidence] = useState('')
  const [suggestedNextSteps, setSuggestedNextSteps] = useState('')
  const [summaryFeedback, setSummaryFeedback] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: res } = await supabase
        .from('residency_residents')
        .select('id, profile:residency_profiles(first_name, last_name)')
        .eq('mentor_id', user.id)

      if (res) setResidents(res)

      const { data: s } = await supabase
        .from('residency_placement_sites')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (s) setSites(s)
    }
    load()
  }, [])

  function toggleIndicator(key: string) {
    setIndicatorsPresent(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Not authenticated'); setSaving(false); return }

    const { error: insertError } = await supabase
      .from('residency_observation_forms')
      .insert({
        resident_id: residentId,
        observer_id: user.id,
        observation_date: observationDate,
        placement_site_id: siteId || null,
        semester: semester || null,
        observation_focus: focus,
        observation_focus_other: focus === 'other' ? focusOther : null,
        observation_notes: observationNotes || null,
        indicators_present: indicatorsPresent,
        specific_evidence: specificEvidence || null,
        suggested_next_steps: suggestedNextSteps || null,
        summary_feedback: summaryFeedback || null,
        observer_type: 'mentor',
      })

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    // Notify resident
    await supabase.from('residency_notifications').insert({
      recipient_id: residentId,
      type: 'observation_completed',
      title: 'New observation submitted',
      message: `Your mentor completed an observation on ${new Date(observationDate).toLocaleDateString()}.`,
      link: '/residency/portal/portfolio',
    })

    router.push('/residency/mentor/observations')
  }

  const indicators = focus && focus !== 'other' ? INDICATOR_SETS[focus] ?? [] : []

  return (
    <div>
      <Link href="/residency/mentor/observations" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Observations
      </Link>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>New Observation</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Complete a structured observation during a practicum site visit.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '700px' }}>
        {/* Context */}
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Observation Context</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="r-label">Resident</label>
              <select className="r-input" value={residentId} onChange={e => setResidentId(e.target.value)} required>
                <option value="">Select resident...</option>
                {residents.map((r: any) => (
                  <option key={r.id} value={r.id}>
                    {r.profile?.first_name} {r.profile?.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="r-label">Observation Date</label>
              <input type="date" className="r-input" value={observationDate} onChange={e => setObservationDate(e.target.value)} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="r-label">Placement Site</label>
              <select className="r-input" value={siteId} onChange={e => setSiteId(e.target.value)}>
                <option value="">Select site (optional)...</option>
                {sites.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="r-label">Semester</label>
              <input type="text" className="r-input" value={semester} onChange={e => setSemester(e.target.value)}
                placeholder="e.g., Fall 2026" />
            </div>
          </div>
        </div>

        {/* Focus */}
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Observation Focus</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Primary Focus Area</label>
            <select className="r-input" value={focus} onChange={e => { setFocus(e.target.value); setIndicatorsPresent([]) }} required>
              <option value="">Select focus...</option>
              {FOCUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {focus === 'other' && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="r-label">Describe Focus</label>
              <input type="text" className="r-input" value={focusOther} onChange={e => setFocusOther(e.target.value)}
                placeholder="Describe the observation focus..." required />
            </div>
          )}

          {indicators.length > 0 && (
            <div>
              <label className="r-label" style={{ marginBottom: '0.75rem' }}>Indicators Observed</label>
              <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
                Check all indicators that were present during this observation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {indicators.map(ind => {
                  const checked = indicatorsPresent.includes(ind.key)
                  return (
                    <label key={ind.key} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.625rem',
                      padding: '0.75rem',
                      background: checked ? 'var(--r-gold-light)' : 'var(--r-cream)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: checked ? '1px solid var(--r-gold)' : '1px solid transparent',
                    }}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleIndicator(ind.key)}
                        style={{ marginTop: '0.125rem' }}
                      />
                      <span style={{ fontSize: '0.875rem', lineHeight: 1.4 }}>{ind.label}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Observation Notes</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Detailed Observation Notes</label>
            <textarea className="r-textarea" value={observationNotes} onChange={e => setObservationNotes(e.target.value)}
              style={{ minHeight: '180px' }}
              placeholder="Describe what you observed in detail. Include specific moments, child interactions, and environmental details..." />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Specific Evidence</label>
            <textarea className="r-textarea" value={specificEvidence} onChange={e => setSpecificEvidence(e.target.value)}
              style={{ minHeight: '120px' }}
              placeholder="What specific evidence supports your observations? Include quotes, actions, or moments..." />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Suggested Next Steps</label>
            <textarea className="r-textarea" value={suggestedNextSteps} onChange={e => setSuggestedNextSteps(e.target.value)}
              style={{ minHeight: '100px' }}
              placeholder="What should the resident focus on next? Include specific, actionable suggestions..." />
          </div>

          <div>
            <label className="r-label">Summary Feedback</label>
            <textarea className="r-textarea" value={summaryFeedback} onChange={e => setSummaryFeedback(e.target.value)}
              style={{ minHeight: '100px' }}
              placeholder="Overall summary feedback for the resident..." />
          </div>
        </div>

        {error && (
          <p style={{ color: 'var(--r-error)', fontSize: '0.8125rem', marginBottom: '1rem', padding: '0.5rem', background: '#fef2f2', borderRadius: '6px' }}>
            {error}
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving}>
            {saving ? 'Submitting...' : 'Submit Observation'}
          </button>
          <Link href="/residency/mentor/observations" className="r-btn r-btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
