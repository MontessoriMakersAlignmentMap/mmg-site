'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const READINESS_LABELS: Record<string, string> = {
  developing_as_expected: 'Developing as Expected',
  needs_additional_support: 'Needs Additional Support',
  exceeding_expectations: 'Exceeding Expectations',
}

export default function VirtualObservationDetailPage() {
  const { profile } = useResidencyAuth(['resident'])
  const params = useParams()
  const observationId = params.id as string

  const [obs, setObs] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [reflection, setReflection] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('residency_virtual_observations')
        .select('*')
        .eq('id', observationId)
        .single()
      if (data) {
        setObs(data)
        if (data.resident_reflection) setReflection(data.resident_reflection)
      }
      setLoading(false)
    }
    load()
  }, [observationId])

  function wordCount(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length
  }

  async function handleReflectionSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (wordCount(reflection) < 150) {
      setError('Reflection must be at least 150 words.')
      return
    }
    setSaving(true)
    const { error: updateError } = await supabase
      .from('residency_virtual_observations')
      .update({
        resident_reflection: reflection,
        reflection_submitted_at: new Date().toISOString(),
      })
      .eq('id', observationId)

    if (updateError) {
      setError(updateError.message)
    } else {
      setSaved(true)
      setObs({ ...obs, resident_reflection: reflection, reflection_submitted_at: new Date().toISOString() })
    }
    setSaving(false)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>
  if (!obs) return <p>Observation not found.</p>

  const needsReflection = obs.review_status === 'feedback_submitted' && !obs.resident_reflection
  const hasFeedback = obs.review_status === 'feedback_submitted'
  const isComplete = hasFeedback && obs.resident_reflection

  return (
    <div>
      <Link href="/residency/portal/practicum" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Practicum
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Virtual Observation</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            {new Date(obs.observation_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            {' · '}{obs.recording_duration_minutes} minutes
          </p>
        </div>
        <span style={{
          fontSize: '0.75rem',
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          fontWeight: 600,
          background: isComplete ? 'var(--r-success-light)' : needsReflection ? '#FEF3C7' : 'var(--r-border)',
          color: isComplete ? 'var(--r-success)' : needsReflection ? '#92400E' : 'var(--r-text-muted)',
        }}>
          {isComplete ? 'Complete' : needsReflection ? 'Reflection Required' :
           obs.review_status === 'pending_review' ? 'Pending Review' : 'In Progress'}
        </span>
      </div>

      {/* Your Context Note */}
      <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Your Context Note</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
          {obs.context_note}
        </p>
      </div>

      {/* Recording Link */}
      <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <a href={obs.recording_link} target="_blank" rel="noopener noreferrer"
          className="r-btn r-btn-secondary" style={{ textDecoration: 'none', fontSize: '0.8125rem' }}>
          Watch Recording ↗
        </a>
      </div>

      {/* Cohort Guide Feedback */}
      {hasFeedback && (
        <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--r-navy)' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Cohort Guide Feedback</h2>

          {obs.overall_readiness && (
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall Readiness</span>
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--r-navy)', marginTop: '0.125rem' }}>
                {READINESS_LABELS[obs.overall_readiness] ?? obs.overall_readiness}
              </p>
            </div>
          )}

          {obs.summary_feedback && (
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Summary</span>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{obs.summary_feedback}</p>
            </div>
          )}

          {obs.written_feedback && (
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Detailed Feedback</span>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{obs.written_feedback}</p>
            </div>
          )}

          {obs.suggested_next_steps && (
            <div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next Steps</span>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{obs.suggested_next_steps}</p>
            </div>
          )}
        </div>
      )}

      {/* Reflection Form */}
      {needsReflection && !saved && (
        <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--r-gold)' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Your Reflection</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
            Read your Cohort Guide's feedback carefully before writing. What did they observe that you also noticed? What surprised you? What will you do differently as a result of this feedback? How does this observation connect to what you have been studying in your weekly bundles?
          </p>
          <form onSubmit={handleReflectionSubmit}>
            <textarea className="r-textarea" value={reflection}
              onChange={e => setReflection(e.target.value)}
              style={{ minHeight: '200px', marginBottom: '0.5rem' }}
              placeholder="Write your reflection..." />
            <p style={{ fontSize: '0.6875rem', color: wordCount(reflection) >= 150 ? 'var(--r-success)' : 'var(--r-text-muted)', marginBottom: '1rem' }}>
              {wordCount(reflection)} / 150 words minimum
            </p>
            {error && (
              <p style={{ color: 'var(--r-error)', fontSize: '0.8125rem', marginBottom: '0.75rem' }}>{error}</p>
            )}
            <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
              {saving ? 'Submitting...' : 'Submit Reflection'}
            </button>
          </form>
        </div>
      )}

      {/* Submitted Reflection */}
      {obs.resident_reflection && (
        <div className="r-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--r-success)' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Your Reflection</h2>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{obs.resident_reflection}</p>
          {obs.reflection_submitted_at && (
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.75rem' }}>
              Submitted {new Date(obs.reflection_submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          )}
        </div>
      )}

      {saved && (
        <div style={{ padding: '1rem', background: 'var(--r-success-light)', borderRadius: '6px', marginTop: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--r-success)', fontWeight: 500 }}>
            Reflection submitted. This observation is now complete.
          </p>
        </div>
      )}
    </div>
  )
}
