'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import { useRouter, useSearchParams } from 'next/navigation'
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

function getCurrentQuarter(): string {
  const month = new Date().getMonth() + 1
  if (month <= 3) return 'Q3'
  if (month <= 6) return 'Q4'
  if (month <= 9) return 'Q1'
  return 'Q2'
}

export default function NewSiteMentorObservationPage() {
  const { profile } = useResidencyAuth(['site_mentor'])
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedResident = searchParams.get('resident')

  const [assignments, setAssignments] = useState<any[]>([])
  const [residentId, setResidentId] = useState(preselectedResident ?? '')
  const [observationDate, setObservationDate] = useState(new Date().toISOString().split('T')[0])
  const [quarter, setQuarter] = useState(getCurrentQuarter())
  const [academicYear, setAcademicYear] = useState('2026-2027')
  const [focus, setFocus] = useState('')
  const [indicatorsPresent, setIndicatorsPresent] = useState<string[]>([])
  const [observationNotes, setObservationNotes] = useState('')
  const [specificEvidence, setSpecificEvidence] = useState('')
  const [suggestedNextSteps, setSuggestedNextSteps] = useState('')
  const [summaryFeedback, setSummaryFeedback] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!profile) return
    async function load() {
      const { data } = await supabase
        .from('residency_site_mentor_assignments')
        .select('resident_id, resident:residency_residents(profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name))')
        .eq('site_mentor_profile_id', profile!.id)
        .eq('status', 'active')
      if (data) setAssignments(data)
    }
    load()
  }, [profile])

  function toggleIndicator(key: string) {
    setIndicatorsPresent(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  async function handleSubmit(e: React.FormEvent, asDraft: boolean) {
    e.preventDefault()
    if (!profile || !residentId) return
    setError('')
    setSaving(true)

    const { error: insertError } = await supabase
      .from('residency_site_mentor_observations')
      .insert({
        site_mentor_profile_id: profile.id,
        resident_id: residentId,
        observation_date: observationDate,
        quarter,
        academic_year: academicYear,
        observation_focus: focus || null,
        indicators_present: indicatorsPresent,
        observation_notes: observationNotes || null,
        specific_evidence: specificEvidence || null,
        suggested_next_steps: suggestedNextSteps || null,
        summary_feedback: summaryFeedback || null,
        status: asDraft ? 'draft' : 'submitted',
        submitted_at: asDraft ? null : new Date().toISOString(),
      })

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    router.push('/residency/site-mentor/observations')
  }

  const indicators = focus ? INDICATOR_SETS[focus] ?? [] : []

  return (
    <div>
      <Link href="/residency/site-mentor/observations" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Observations
      </Link>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>New Observation</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Complete a structured observation using the MMR rubric.
      </p>

      <form onSubmit={e => handleSubmit(e, false)} style={{ maxWidth: '700px' }}>
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Context</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Resident</label>
              <select className="r-input" value={residentId} onChange={e => setResidentId(e.target.value)} required>
                <option value="">Select resident...</option>
                {assignments.map((a: any) => (
                  <option key={a.resident_id} value={a.resident_id}>
                    {a.resident?.profile?.first_name} {a.resident?.profile?.last_name}
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
              <label className="r-label">Quarter</label>
              <select className="r-input" value={quarter} onChange={e => setQuarter(e.target.value)} required>
                <option value="Q1">Q1 (Aug–Oct)</option>
                <option value="Q2">Q2 (Nov–Jan)</option>
                <option value="Q3">Q3 (Feb–Apr)</option>
                <option value="Q4">Q4 (May–Jul)</option>
              </select>
            </div>
            <div>
              <label className="r-label">Academic Year</label>
              <input type="text" className="r-input" value={academicYear} onChange={e => setAcademicYear(e.target.value)} required />
            </div>
          </div>
        </div>

        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Focus & Indicators</h2>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Primary Focus Area</label>
            <select className="r-input" value={focus} onChange={e => { setFocus(e.target.value); setIndicatorsPresent([]) }}>
              <option value="">Select focus...</option>
              {FOCUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {indicators.length > 0 && (
            <div>
              <label className="r-label" style={{ marginBottom: '0.75rem' }}>Indicators Observed</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {indicators.map(ind => {
                  const checked = indicatorsPresent.includes(ind.key)
                  return (
                    <label key={ind.key} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
                      padding: '0.75rem', background: checked ? 'var(--r-gold-light)' : 'var(--r-cream)',
                      borderRadius: '8px', cursor: 'pointer',
                      border: checked ? '1px solid var(--r-gold)' : '1px solid transparent',
                    }}>
                      <input type="checkbox" checked={checked} onChange={() => toggleIndicator(ind.key)}
                        style={{ marginTop: '0.125rem' }} />
                      <span style={{ fontSize: '0.875rem', lineHeight: 1.4 }}>{ind.label}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Notes & Feedback</h2>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Observation Notes</label>
            <textarea className="r-textarea" value={observationNotes} onChange={e => setObservationNotes(e.target.value)}
              style={{ minHeight: '150px' }}
              placeholder="What did you observe? Include specific moments, interactions, and environmental details..." />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Specific Evidence</label>
            <textarea className="r-textarea" value={specificEvidence} onChange={e => setSpecificEvidence(e.target.value)}
              style={{ minHeight: '100px' }}
              placeholder="Specific examples that support your observations..." />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Suggested Next Steps</label>
            <textarea className="r-textarea" value={suggestedNextSteps} onChange={e => setSuggestedNextSteps(e.target.value)}
              style={{ minHeight: '80px' }}
              placeholder="What should the resident focus on next?" />
          </div>
          <div>
            <label className="r-label">Summary Feedback</label>
            <textarea className="r-textarea" value={summaryFeedback} onChange={e => setSummaryFeedback(e.target.value)}
              style={{ minHeight: '80px' }}
              placeholder="Overall summary for the resident..." />
          </div>
        </div>

        {error && (
          <p style={{ color: 'var(--r-error)', fontSize: '0.8125rem', marginBottom: '1rem', padding: '0.75rem', background: 'var(--r-error-light)', borderRadius: '6px' }}>
            {error}
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving}>
            {saving ? 'Submitting...' : 'Submit Observation'}
          </button>
          <button type="button" className="r-btn r-btn-secondary" disabled={saving}
            onClick={e => handleSubmit(e as any, true)}>
            Save as Draft
          </button>
          <Link href="/residency/site-mentor/observations" className="r-btn r-btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
