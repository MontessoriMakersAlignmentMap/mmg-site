'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import StatusBadge from '../../../components/StatusBadge'

export default function MentorSubmissionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [entry, setEntry] = useState<any>(null)
  const [feedbackList, setFeedbackList] = useState<any[]>([])
  const [newFeedback, setNewFeedback] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  async function loadEntry() {
    const { data } = await supabase
      .from('residency_album_entries')
      .select('*, lesson:residency_lessons(title, strand:residency_strands(name), content), resident:residency_residents!inner(profile:residency_profiles(first_name, last_name))')
      .eq('id', id)
      .single()

    if (data) setEntry(data)

    const { data: fb } = await supabase
      .from('residency_feedback')
      .select('*, mentor:residency_profiles(first_name, last_name)')
      .eq('album_entry_id', id)
      .order('created_at', { ascending: true })

    if (fb) setFeedbackList(fb)
    setLoading(false)
  }

  useEffect(() => { loadEntry() }, [id])

  async function handleSubmitFeedback() {
    if (!newFeedback.trim()) return
    setSubmitting(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from('residency_feedback')
      .insert({
        album_entry_id: id,
        mentor_id: user.id,
        content: newFeedback.trim(),
      })

    // Update entry status to reviewed
    await supabase
      .from('residency_album_entries')
      .update({ status: 'reviewed' })
      .eq('id', id)

    setNewFeedback('')
    setSubmitting(false)
    loadEntry()
  }

  async function updateEntryStatus(status: string) {
    await supabase
      .from('residency_album_entries')
      .update({ status })
      .eq('id', id)

    // If approved, mark assignment as completed
    if (status === 'approved' && entry?.assignment_id) {
      await supabase
        .from('residency_assignments')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', entry.assignment_id)
    }

    loadEntry()
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>
  if (!entry) return <p>Entry not found.</p>

  return (
    <div>
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
        </p>
      </div>

      {/* Entry content */}
      {entry.content && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Resident&rsquo;s Work</h2>
          <div style={{ fontSize: '0.875rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {entry.content}
          </div>
        </div>
      )}

      {/* Files */}
      {entry.file_urls && entry.file_urls.length > 0 && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Attachments</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {entry.file_urls.map((url: string, i: number) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.875rem', color: 'var(--r-navy)' }}>
                Attachment {i + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="r-card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={() => updateEntryStatus('approved')} className="r-btn r-btn-primary"
          disabled={entry.status === 'approved'}>
          Approve
        </button>
        <button onClick={() => updateEntryStatus('revision_requested')} className="r-btn r-btn-secondary">
          Request Revision
        </button>
      </div>

      {/* Existing feedback */}
      {feedbackList.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Feedback History</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {feedbackList.map((fb: any) => (
              <div key={fb.id} className="r-card" style={{ borderLeft: '3px solid var(--r-gold)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    {fb.mentor?.first_name} {fb.mentor?.last_name}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                    {new Date(fb.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {fb.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New feedback */}
      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Write Feedback</h2>
        <textarea
          className="r-textarea"
          value={newFeedback}
          onChange={e => setNewFeedback(e.target.value)}
          placeholder="Share your observations, guidance, and feedback for this resident's work..."
          style={{ marginBottom: '1rem' }}
        />
        <button
          onClick={handleSubmitFeedback}
          className="r-btn r-btn-primary"
          disabled={submitting || !newFeedback.trim()}
        >
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>
    </div>
  )
}
