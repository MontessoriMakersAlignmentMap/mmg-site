'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'
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

export default function AlbumEntryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [entry, setEntry] = useState<any>(null)
  const [reviewCycles, setReviewCycles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [resubmitting, setResubmitting] = useState(false)
  const [error, setError] = useState('')

  async function loadEntry() {
    const { data } = await supabase
      .from('residency_album_entries')
      .select('*, lesson:residency_lessons(title, strand:residency_strands(name))')
      .eq('id', id)
      .single()

    if (data) setEntry(data)

    const { data: cycles } = await supabase
      .from('residency_ai_review_cycles')
      .select('*')
      .eq('entry_id', id)
      .order('cycle_number', { ascending: false })

    if (cycles) setReviewCycles(cycles)
    setLoading(false)
  }

  useEffect(() => { loadEntry() }, [id])

  async function resubmitForAIReview() {
    setResubmitting(true)
    setError('')

    try {
      await supabase
        .from('residency_album_entries')
        .update({
          status: 'ai_review',
          ai_review_status: 'in_review',
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      const res = await fetch('/api/residency/ai-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry_id: id }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'AI review failed')
      }

      await loadEntry()
    } catch (e: any) {
      setError(e.message || 'Failed to resubmit')
    }
    setResubmitting(false)
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)', padding: '2rem' }}>Loading...</p>
  if (!entry) return <p>Entry not found.</p>

  const latestReview = reviewCycles[0]
  const fieldFeedback = latestReview?.field_feedback || {}

  const canEdit = entry.status === 'draft' || entry.status === 'ai_review'
  const canResubmit = entry.ai_review_status === 'needs_revision'
  const isPassed = entry.status === 'ai_passed' || entry.status === 'mentor_review' || entry.status === 'complete'

  return (
    <div style={{ maxWidth: '800px' }}>
      <Link href="/residency/portal/albums" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Album Entries
      </Link>

      {/* Header */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'center' }}>
        <StatusBadge status={entry.status} size="md" />
        {entry.lesson?.strand && <span className="r-badge r-badge-strand">{entry.lesson.strand.name}</span>}
        {entry.revision_count > 0 && (
          <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
            Revision {entry.revision_count}
          </span>
        )}
      </div>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{entry.title}</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.8125rem', marginBottom: '2rem' }}>
        {entry.lesson?.title}
        {entry.submitted_at && ` \u2022 Submitted ${new Date(entry.submitted_at).toLocaleDateString()}`}
      </p>

      {/* AI Review Summary Card */}
      {latestReview && (
        <div className="r-card" style={{
          marginBottom: '2rem',
          borderLeft: `4px solid ${latestReview.overall_verdict === 'passed' ? '#2e7d32' : '#f57f17'}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.125rem', margin: 0 }}>AI Review</h2>
            <span style={{
              fontSize: '0.6875rem', fontWeight: 600, padding: '0.125rem 0.625rem', borderRadius: '3px',
              textTransform: 'uppercase',
              background: latestReview.overall_verdict === 'passed' ? '#e8f5e9' : '#fff8e1',
              color: latestReview.overall_verdict === 'passed' ? '#2e7d32' : '#f57f17',
            }}>
              {latestReview.overall_verdict === 'passed' ? 'Passed' : 'Needs Revision'}
            </span>
          </div>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            {latestReview.overall_feedback}
          </p>
          <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
            Cycle {latestReview.cycle_number} &middot; {new Date(latestReview.created_at).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Mentor Feedback Card */}
      {(entry.mentor_strengths || entry.mentor_growth_edge || entry.mentor_practicum_connection) && (
        <div className="r-card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--r-gold)' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Mentor Feedback</h2>
          {entry.mentor_strengths && (
            <div style={{ marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#2e7d32', marginBottom: '0.25rem' }}>Strengths</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{entry.mentor_strengths}</p>
            </div>
          )}
          {entry.mentor_growth_edge && (
            <div style={{ marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#f57f17', marginBottom: '0.25rem' }}>Growth Edge</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{entry.mentor_growth_edge}</p>
            </div>
          )}
          {entry.mentor_practicum_connection && (
            <div>
              <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--r-navy)', marginBottom: '0.25rem' }}>Practicum Connection</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{entry.mentor_practicum_connection}</p>
            </div>
          )}
        </div>
      )}

      {/* Structured fields with per-field AI feedback */}
      {FIELD_CONFIG.map((field, idx) => {
        const value = entry[field.key]
        const fb = fieldFeedback[field.key]
        const verdict = fb?.verdict
        const vs = verdict ? VERDICT_STYLES[verdict] : null

        return (
          <div key={field.key} style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--r-navy)', margin: 0 }}>
                {idx + 1}. {field.label}
              </h2>
              {vs && (
                <span style={{
                  fontSize: '0.625rem', fontWeight: 600, padding: '0.125rem 0.5rem', borderRadius: '3px',
                  textTransform: 'uppercase', background: vs.bg, color: vs.color,
                }}>
                  {vs.label}
                </span>
              )}
            </div>
            {value ? (
              <div style={{
                fontSize: '0.9375rem', lineHeight: 1.8, whiteSpace: 'pre-wrap',
                padding: '1rem', background: 'var(--r-bg-muted)', borderRadius: '8px',
              }}>
                {value}
              </div>
            ) : (
              <p style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)', fontStyle: 'italic' }}>
                No content for this field.
              </p>
            )}
            {fb?.feedback && (
              <div style={{
                marginTop: '0.5rem', padding: '0.625rem 1rem', borderRadius: '6px',
                background: vs?.bg || '#f5f5f5', fontSize: '0.8125rem', lineHeight: 1.6,
                borderLeft: `3px solid ${vs?.color || '#999'}`,
              }}>
                {fb.feedback}
              </div>
            )}
          </div>
        )
      })}

      {error && (
        <p style={{ color: '#c62828', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>
      )}

      {/* Action buttons */}
      <div style={{
        display: 'flex', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--r-border)',
        flexWrap: 'wrap',
      }}>
        {canEdit && (
          <Link href={`/residency/portal/albums/new?edit=${id}`} className="r-btn">
            Edit Entry
          </Link>
        )}
        {canResubmit && (
          <>
            <Link href={`/residency/portal/albums/new?edit=${id}`} className="r-btn">
              Revise Entry
            </Link>
            <button
              className="r-btn r-btn-primary"
              onClick={resubmitForAIReview}
              disabled={resubmitting}
            >
              {resubmitting ? 'Resubmitting...' : 'Resubmit for AI Review'}
            </button>
          </>
        )}
        {isPassed && entry.status !== 'complete' && (
          <span style={{ fontSize: '0.8125rem', color: '#2e7d32', padding: '0.5rem 0', fontWeight: 500 }}>
            AI Review Passed — awaiting mentor review.
          </span>
        )}
        {entry.status === 'complete' && (
          <span style={{ fontSize: '0.8125rem', color: '#2e7d32', padding: '0.5rem 0', fontWeight: 600 }}>
            Entry Complete
          </span>
        )}
      </div>

      {/* Review history */}
      {reviewCycles.length > 1 && (
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Review History</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {reviewCycles.slice(1).map((cycle: any) => (
              <div key={cycle.id} className="r-card" style={{ padding: '0.875rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Cycle {cycle.cycle_number}</span>
                  <span style={{
                    fontSize: '0.625rem', fontWeight: 600, padding: '0.125rem 0.5rem', borderRadius: '3px',
                    textTransform: 'uppercase',
                    background: cycle.overall_verdict === 'passed' ? '#e8f5e9' : '#fff8e1',
                    color: cycle.overall_verdict === 'passed' ? '#2e7d32' : '#f57f17',
                  }}>
                    {cycle.overall_verdict === 'passed' ? 'Passed' : 'Needs Revision'}
                  </span>
                </div>
                <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--r-text-muted)' }}>
                  {cycle.overall_feedback}
                </p>
                <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.375rem' }}>
                  {new Date(cycle.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
