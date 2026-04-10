'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function NewAlbumEntryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedLesson = searchParams.get('lesson')

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [residentNotes, setResidentNotes] = useState('')
  const [lessonId, setLessonId] = useState(preselectedLesson ?? '')
  const [lessonInfo, setLessonInfo] = useState<any>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function loadLessons() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (resident) {
        // Load assignments to populate lesson dropdown
        const { data } = await supabase
          .from('residency_assignments')
          .select('lesson_id, lesson:residency_lessons(id, title, strand:residency_strands(name), level:residency_levels(name))')
          .eq('resident_id', resident.id)

        if (data) setLessons(data.map((a: any) => a.lesson).filter(Boolean))
      }

      // If preselected lesson, load its info directly
      if (preselectedLesson) {
        const { data: lesson } = await supabase
          .from('residency_lessons')
          .select('id, title, strand:residency_strands(name), level:residency_levels(name)')
          .eq('id', preselectedLesson)
          .single()

        if (lesson) {
          setLessonInfo(lesson)
          setTitle(`Album Entry: ${lesson.title}`)
        }
      }
    }
    loadLessons()
  }, [preselectedLesson])

  // When lesson selection changes, update context
  useEffect(() => {
    if (lessonId && !preselectedLesson) {
      const found = lessons.find(l => l.id === lessonId)
      if (found) {
        setLessonInfo(found)
        if (!title) setTitle(`Album Entry: ${found.title}`)
      }
    }
  }, [lessonId, lessons, preselectedLesson, title])

  async function handleSubmit(e: React.FormEvent, asDraft: boolean) {
    e.preventDefault()
    setError('')
    setSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Not authenticated'); setSaving(false); return }

    const { data: resident } = await supabase
      .from('residency_residents')
      .select('id')
      .eq('profile_id', user.id)
      .single()

    if (!resident) { setError('Resident record not found'); setSaving(false); return }

    // Check for existing entry for this lesson
    const { data: existing } = await supabase
      .from('residency_album_entries')
      .select('id')
      .eq('resident_id', resident.id)
      .eq('lesson_id', lessonId)
      .limit(1)

    if (existing && existing.length > 0) {
      setError('You already have an album entry for this lesson. You can edit it from your Album Entries page.')
      setSaving(false)
      return
    }

    // Upload files
    const fileUrls: string[] = []
    for (const file of files) {
      const path = `albums/${resident.id}/${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('residency')
        .upload(path, file)

      if (!uploadError) {
        const { data: urlData } = supabase.storage.from('residency').getPublicUrl(path)
        fileUrls.push(urlData.publicUrl)
      }
    }

    // Get assignment ID if one exists
    const { data: assignment } = await supabase
      .from('residency_assignments')
      .select('id')
      .eq('resident_id', resident.id)
      .eq('lesson_id', lessonId)
      .single()

    const { error: insertError } = await supabase
      .from('residency_album_entries')
      .insert({
        resident_id: resident.id,
        lesson_id: lessonId,
        assignment_id: assignment?.id ?? null,
        title,
        content,
        resident_notes: residentNotes || null,
        file_urls: fileUrls.length > 0 ? fileUrls : null,
        status: asDraft ? 'draft' : 'submitted',
        submitted_at: asDraft ? null : new Date().toISOString(),
      })

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    // Update assignment status if submitting
    if (!asDraft && assignment) {
      await supabase
        .from('residency_assignments')
        .update({ status: 'submitted' })
        .eq('id', assignment.id)
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: '#d1fae5',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '1.5rem',
        }}>
          &#10003;
        </div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Entry Submitted</h1>
        <p style={{ color: 'var(--r-text-muted)', fontSize: '0.9375rem', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
          Your album entry has been submitted for review. Your mentor will provide feedback soon.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <Link href="/residency/portal/albums" className="r-btn r-btn-primary">
            View My Entries
          </Link>
          <Link href="/residency/portal" className="r-btn r-btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link href="/residency/portal/albums" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Album Entries
      </Link>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>New Album Entry</h1>

      {/* Lesson context banner */}
      {lessonInfo && (
        <div style={{
          padding: '0.875rem 1.25rem',
          background: 'var(--r-gold-light)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid var(--r-gold)',
        }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            Submitting for
          </p>
          <p style={{ fontWeight: 600, color: 'var(--r-navy)', fontSize: '0.9375rem' }}>
            {lessonInfo.title}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.125rem' }}>
            {lessonInfo.strand?.name}{lessonInfo.level?.name ? ` -- ${lessonInfo.level.name}` : ''}
          </p>
        </div>
      )}

      <form style={{ maxWidth: '640px' }}>
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          {!preselectedLesson && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="r-label" htmlFor="lesson">Lesson</label>
              <select id="lesson" className="r-input" value={lessonId} onChange={e => setLessonId(e.target.value)} required>
                <option value="">Select a lesson...</option>
                {lessons.map((l: any) => (
                  <option key={l.id} value={l.id}>{l.title}</option>
                ))}
              </select>
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label" htmlFor="title">Entry Title</label>
            <input id="title" type="text" className="r-input"
              value={title} onChange={e => setTitle(e.target.value)} required
              placeholder="Name your album entry" />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label" htmlFor="content">Your Album Entry</label>
            <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.5rem' }}>
              Describe your work, observations, reflections, and what you learned through this lesson.
            </p>
            <textarea id="content" className="r-textarea"
              value={content} onChange={e => setContent(e.target.value)}
              style={{ minHeight: '200px' }}
              placeholder="Write your album entry here..." />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Documentation (optional)</label>
            <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.5rem' }}>
              Photos, videos, or documents from your practicum placement.
            </p>
            <input type="file" multiple
              onChange={e => setFiles(Array.from(e.target.files ?? []))}
              style={{ fontSize: '0.875rem' }} />
            {files.length > 0 && (
              <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.375rem' }}>
                {files.length} file(s) selected
              </p>
            )}
          </div>

          <div>
            <label className="r-label" htmlFor="notes">Notes for Your Mentor (optional)</label>
            <textarea id="notes" className="r-textarea"
              value={residentNotes} onChange={e => setResidentNotes(e.target.value)}
              style={{ minHeight: '80px' }}
              placeholder="Anything you want to flag for your mentor -- questions, areas you struggled with, what you'd like feedback on..." />
          </div>
        </div>

        {error && (
          <p style={{ color: 'var(--r-error)', fontSize: '0.8125rem', marginBottom: '1rem', padding: '0.75rem', background: '#fef2f2', borderRadius: '6px' }}>
            {error}
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" onClick={e => handleSubmit(e, false)}
            className="r-btn r-btn-primary" disabled={saving || !lessonId || !title}>
            {saving ? 'Submitting...' : 'Submit for Review'}
          </button>
          <button type="button" onClick={e => handleSubmit(e, true)}
            className="r-btn r-btn-secondary" disabled={saving || !lessonId || !title}>
            Save as Draft
          </button>
        </div>
      </form>
    </div>
  )
}
