'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import StatusBadge from '../../../components/StatusBadge'
import ProgressBar from '../../../components/ProgressBar'

export default function MentorResidentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [resident, setResident] = useState<any>(null)
  const [entries, setEntries] = useState<any[]>([])
  const [assignments, setAssignments] = useState<any[]>([])
  const [mentorNotes, setMentorNotes] = useState('')
  const [notesSaving, setNotesSaving] = useState(false)
  const [notesSaved, setNotesSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: r } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(*), assigned_level:residency_levels(name, age_range)')
        .eq('id', id)
        .single()

      if (r) {
        setResident(r)
        setMentorNotes(r.mentor_notes ?? '')
      }

      const { data: e } = await supabase
        .from('residency_album_entries')
        .select('*, lesson:residency_lessons(title, strand:residency_strands(name)), feedback:residency_feedback(id)')
        .eq('resident_id', id)
        .order('created_at', { ascending: false })

      if (e) setEntries(e)

      const { data: a } = await supabase
        .from('residency_assignments')
        .select('*, lesson:residency_lessons(title, strand:residency_strands(name))')
        .eq('resident_id', id)
        .order('created_at', { ascending: false })

      if (a) setAssignments(a)
      setLoading(false)
    }
    load()
  }, [id])

  async function saveMentorNotes() {
    setNotesSaving(true)
    await supabase
      .from('residency_residents')
      .update({ mentor_notes: mentorNotes || null })
      .eq('id', id)

    setNotesSaving(false)
    setNotesSaved(true)
    setTimeout(() => setNotesSaved(false), 2000)
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>
  if (!resident) return <p>Resident not found.</p>

  const total = assignments.length
  const completed = assignments.filter((a: any) => a.status === 'completed').length
  const submitted = entries.filter((e: any) => e.status === 'submitted')

  return (
    <div>
      <Link href="/residency/mentor/residents" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to My Residents
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
            {resident.profile?.first_name} {resident.profile?.last_name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <StatusBadge status={resident.status} />
            {resident.assigned_level && (
              <span className="r-badge r-badge-level" style={{ fontSize: '0.6875rem' }}>
                {resident.assigned_level.name}
              </span>
            )}
            {resident.cohort && (
              <span style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                Cohort: {resident.cohort}
              </span>
            )}
          </div>
        </div>

        {submitted.length > 0 && (
          <span style={{
            background: 'var(--r-gold)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '0.375rem 0.875rem',
            borderRadius: '9999px',
          }}>
            {submitted.length} awaiting review
          </span>
        )}
      </div>

      {/* Progress */}
      {total > 0 && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Overall Progress</h2>
          <ProgressBar completed={completed} total={total} label={`${completed} of ${total} lessons completed`} />
        </div>
      )}

      {/* Lesson sequence */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Lesson Progress</h2>
        {assignments.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No assignments yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {assignments.map((a: any) => {
              const hasSubmission = entries.find((e: any) => e.lesson_id === a.lesson_id && e.status === 'submitted')
              return (
                <div key={a.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.625rem 0.875rem',
                  background: hasSubmission ? 'var(--r-gold-light)' : 'var(--r-cream)',
                  borderRadius: '6px',
                  borderLeft: hasSubmission ? '3px solid var(--r-gold)' : '3px solid transparent',
                }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--r-navy)' }}>
                      {a.lesson?.title}
                    </p>
                    <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                      {a.lesson?.strand?.name}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <StatusBadge status={a.status} />
                    {hasSubmission && (
                      <Link href={`/residency/mentor/submissions/${hasSubmission.id}`}
                        className="r-btn r-btn-primary"
                        style={{ fontSize: '0.6875rem', padding: '0.25rem 0.625rem' }}>
                        Review
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Mentor notes */}
      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Mentor Notes</h2>
        <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
          General notes visible to this resident and to the admin.
        </p>
        <textarea
          className="r-textarea"
          value={mentorNotes}
          onChange={e => setMentorNotes(e.target.value)}
          placeholder="Write a note for this resident..."
          style={{ marginBottom: '0.75rem' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={saveMentorNotes}
            className="r-btn r-btn-primary"
            disabled={notesSaving}
            style={{ fontSize: '0.8125rem' }}
          >
            {notesSaving ? 'Saving...' : 'Save Notes'}
          </button>
          {notesSaved && (
            <span style={{ fontSize: '0.8125rem', color: 'var(--r-success)' }}>Saved</span>
          )}
        </div>
      </div>
    </div>
  )
}
