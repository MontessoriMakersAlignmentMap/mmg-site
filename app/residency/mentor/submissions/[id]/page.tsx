'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import StatusBadge from '../../../components/StatusBadge'

const FIELD_CONFIG = [
  { key: 'why_this_lesson_matters', label: 'Why This Lesson Matters' },
  { key: 'direct_aim', label: 'Direct Aim' },
  { key: 'indirect_aim', label: 'Indirect Aim' },
  { key: 'equity_aim', label: 'Equity Aim' },
  { key: 'materials', label: 'Materials' },
  { key: 'presentation', label: 'The Presentation' },
  { key: 'points_of_interest', label: 'Points of Interest' },
  { key: 'variations', label: 'Variations and Extensions' },
  { key: 'neurodivergence_notes', label: 'Neurodivergence and Behavior' },
]

const VERDICT_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  complete: { bg: '#e8f5e9', color: '#2e7d32', label: 'Complete' },
  needs_revision: { bg: '#fff8e1', color: '#f57f17', label: 'Needs Revision' },
  missing: { bg: '#fce4ec', color: '#c62828', label: 'Missing' },
}

export default function MentorSubmissionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [entry, setEntry] = useState<any>(null)
  const [latestReview, setLatestReview] = useState<any>(null)
  const [strengths, setStrengths] = useState('')
  const [growthEdge, setGrowthEdge] = useState('')
  const [practicumConnection, setPracticumConnection] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  async function loadEntry() {
    const { data } = await supabase
      .from('residency_album_entries')
      .select('*, lesson:residency_lessons(title, strand:residency_strands(name)), resident:residency_residents!inner(profile:residency_profiles(first_name, last_name))')
      .eq('id', id)
      .single()

    if (data) {
      setEntry(data)
      setStrengths(data.mentor_strengths || '')
      setGrowthEdge(data.mentor_growth_edge || '')
      setPracticumConnection(data.mentor_practicum_connection || '')
    }

    const { data: cycles } = await supabase
      .from('residency_ai_review_cycles')
      .select('*')
      .eq('entry_id', id)
      .order('cycle_number', { ascending: false })
      .limit(1)

    if (cycles?.[0]) setLatestReview(cycles[0])
    setLoading(false)
  }

  useEffect(() => { loadEntry() }, [id])

  async function handleApprove() {
    setSubmitting(true)
    await supabase
      .from('residency_album_entries')
      .update({
        status: 'complete',
        mentor_review_status: 'approved',
        mentor_strengths: strengths || null,
        mentor_growth_edge: growthEdge || null,
        mentor_practicum_connection: practicumConnection || null,
        locked: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    // Update strand completion
    if (entry?.lesson?.strand) {
      await updateStrandCompletion(entry.resident_id, entry.lesson.strand.id)
    }

    setSubmitting(false)
    loadEntry()
  }

  async function handleRequestRevision() {
    if (!growthEdge.trim()) return
    setSubmitting(true)
    await supabase
      .from('residency_album_entries')
      .update({
        status: 'mentor_review',
        mentor_review_status: 'needs_revision',
        mentor_strengths: strengths || null,
        mentor_growth_edge: growthEdge || null,
        mentor_practicum_connection: practicumConnection || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
    setSubmitting(false)
    loadEntry()
  }

  async function updateStrandCompletion(residentId: string, strandId: string) {
    // Count completed entries for this strand
    const { count } = await supabase
      .from('residency_album_entries')
      .select('id', { count: 'exact', head: true })
      .eq('resident_id', residentId)
      .eq('status', 'complete')
      .not('lesson_id', 'is', null)

    // Count total lessons in this strand for this resident's level
    const { data: resident } = await supabase
      .from('residency_residents')
      .select('assigned_level_id')
      .eq('id', residentId)
      .single()

    if (resident) {
      const { count: totalLessons } = await supabase
        .from('residency_lessons')
        .select('id', { count: 'exact', head: true })
        .eq('strand_id', strandId)
        .eq('level_id', resident.assigned_level_id)

      await supabase
        .from('residency_strand_completions')
        .upsert({
          resident_id: residentId,
          strand_id: strandId,
          entries_completed: count || 0,
          total_entries: totalLessons || 0,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'resident_id,strand_id' })
    }
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>
  if (!entry) return <p>Entry not found.</p>

  const fieldFeedback = latestReview?.field_feedback || {}
  const isAIPassed = entry.status === 'ai_passed' || entry.status === 'mentor_review'
  const isComplete = entry.status === 'complete'

  return (
    <div style={{ maxWidth: '800px' }}>
      <Link href="/residency/mentor/submissions" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Submissions
      </Link>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '0.5rem' }}>
          {entry.resident?.profile?.first_name} {entry.resident?.profile?.last_name} &bull; {entry.lesson?.strand?.name}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.75rem' }}>{entry.title}</h1>
          <StatusBadge status={entry.status} size="md" />
        </div>
        <p style={{ color: 'var(--r-text-muted)', fontSize: '0.8125rem' }}>
          Lesson: {entry.lesson?.title}
          {entry.submitted_at && ` \u2022 Submitted ${new Date(entry.submitted_at).toLocaleDateString()}`}
          {entry.revision_count > 0 && ` \u2022 Revision ${entry.revision_count}`}
        </p>
      </div>

      {/* AI Review Summary */}
      {latestReview && (
        <div className="r-card" style={{
          marginBottom: '1.5rem',
          borderLeft: `4px solid ${latestReview.overall_verdict === 'passed' ? '#2e7d32' : '#f57f17'}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h2 style={{ fontSize: '1rem', margin: 0 }}>AI Review (Cycle {latestReview.cycle_number})</h2>
            <span style={{
              fontSize: '0.625rem', fontWeight: 600, padding: '0.125rem 0.5rem', borderRadius: '3px',
              textTransform: 'uppercase',
              background: latestReview.overall_verdict === 'passed' ? '#e8f5e9' : '#fff8e1',
              color: latestReview.overall_verdict === 'passed' ? '#2e7d32' : '#f57f17',
            }}>
              {latestReview.overall_verdict === 'passed' ? 'Passed' : 'Needs Revision'}
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--r-text-muted)' }}>
            {latestReview.overall_feedback}
          </p>
        </div>
      )}

      {/* Structured fields with AI feedback indicators */}
      {FIELD_CONFIG.map((field, idx) => {
        const value = entry[field.key]
        const fb = fieldFeedback[field.key]
        const verdict = fb?.verdict
        const vs = verdict ? VERDICT_STYLES[verdict] : null

        return (
          <div key={field.key} style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--r-navy)', margin: 0 }}>
                {idx + 1}. {field.label}
              </h2>
              {vs && (
                <span style={{
                  fontSize: '0.5625rem', fontWeight: 600, padding: '0.125rem 0.5rem', borderRadius: '3px',
                  textTransform: 'uppercase', background: vs.bg, color: vs.color,
                }}>
                  {vs.label}
                </span>
              )}
            </div>
            {value ? (
              <div style={{
                fontSize: '0.875rem', lineHeight: 1.8, whiteSpace: 'pre-wrap',
                padding: '0.875rem 1rem', background: 'var(--r-bg-muted)', borderRadius: '8px',
              }}>
                {value}
              </div>
            ) : (
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', fontStyle: 'italic' }}>
                No content.
              </p>
            )}
            {fb?.feedback && (
              <div style={{
                marginTop: '0.375rem', padding: '0.5rem 0.875rem', borderRadius: '6px',
                background: vs?.bg || '#f5f5f5', fontSize: '0.75rem', lineHeight: 1.6,
                borderLeft: `3px solid ${vs?.color || '#999'}`,
              }}>
                <strong>AI:</strong> {fb.feedback}
              </div>
            )}
          </div>
        )
      })}

      {/* Mentor Review Form — visible for AI-passed entries */}
      {(isAIPassed || isComplete) && (
        <div className="r-card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--r-gold)' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
            {isComplete ? 'Your Mentor Feedback' : 'Mentor Review'}
          </h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem', color: '#2e7d32' }}>
              Strengths
            </label>
            <textarea
              value={strengths}
              onChange={e => setStrengths(e.target.value)}
              placeholder="What does this resident do well in this entry? What shows genuine understanding?"
              rows={3}
              disabled={isComplete}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--r-border)',
                fontSize: '0.875rem', lineHeight: 1.7, fontFamily: 'inherit', resize: 'vertical',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem', color: '#f57f17' }}>
              Growth Edge
            </label>
            <textarea
              value={growthEdge}
              onChange={e => setGrowthEdge(e.target.value)}
              placeholder="Where is there room for deeper understanding? What should the resident explore further?"
              rows={3}
              disabled={isComplete}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--r-border)',
                fontSize: '0.875rem', lineHeight: 1.7, fontFamily: 'inherit', resize: 'vertical',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem', color: 'var(--r-navy)' }}>
              Practicum Connection
            </label>
            <textarea
              value={practicumConnection}
              onChange={e => setPracticumConnection(e.target.value)}
              placeholder="How does this lesson connect to what the resident is doing in the classroom? Suggest a practicum application."
              rows={3}
              disabled={isComplete}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--r-border)',
                fontSize: '0.875rem', lineHeight: 1.7, fontFamily: 'inherit', resize: 'vertical',
              }}
            />
          </div>

          {!isComplete && (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleApprove}
                className="r-btn r-btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Saving...' : 'Approve Entry'}
              </button>
              <button
                onClick={handleRequestRevision}
                className="r-btn"
                disabled={submitting || !growthEdge.trim()}
                title={!growthEdge.trim() ? 'Add Growth Edge feedback before requesting revision' : ''}
              >
                Request Revision
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
