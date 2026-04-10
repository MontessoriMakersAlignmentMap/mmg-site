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
  const [lessonId, setLessonId] = useState(preselectedLesson ?? '')
  const [lessons, setLessons] = useState<any[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

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
        const { data } = await supabase
          .from('residency_assignments')
          .select('lesson_id, lesson:residency_lessons(id, title)')
          .eq('resident_id', resident.id)

        if (data) setLessons(data.map((a: any) => a.lesson).filter(Boolean))
      }
    }
    loadLessons()
  }, [])

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

    // Upload files
    const fileUrls: string[] = []
    for (const file of files) {
      const path = `albums/${resident.id}/${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('residency')
        .upload(path, file)

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from('residency')
          .getPublicUrl(path)
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

    router.push('/residency/portal/albums')
  }

  return (
    <div>
      <Link href="/residency/portal/albums" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Album Entries
      </Link>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>New Album Entry</h1>

      <form className="r-card" style={{ padding: '2rem', maxWidth: '640px' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label className="r-label" htmlFor="lesson">Lesson</label>
          <select id="lesson" className="r-input" value={lessonId} onChange={e => setLessonId(e.target.value)} required>
            <option value="">Select a lesson...</option>
            {lessons.map((l: any) => (
              <option key={l.id} value={l.id}>{l.title}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label className="r-label" htmlFor="title">Title</label>
          <input id="title" type="text" className="r-input"
            value={title} onChange={e => setTitle(e.target.value)} required
            placeholder="Name your album entry" />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label className="r-label" htmlFor="content">Content</label>
          <textarea id="content" className="r-textarea"
            value={content} onChange={e => setContent(e.target.value)}
            placeholder="Describe your work, observations, and reflections..." />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label className="r-label">Attachments</label>
          <input type="file" multiple
            onChange={e => setFiles(Array.from(e.target.files ?? []))}
            style={{ fontSize: '0.875rem' }} />
          {files.length > 0 && (
            <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.375rem' }}>
              {files.length} file(s) selected
            </p>
          )}
        </div>

        {error && (
          <p style={{ color: 'var(--r-error)', fontSize: '0.8125rem', marginBottom: '1rem', padding: '0.5rem', background: '#fef2f2', borderRadius: '6px' }}>
            {error}
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" onClick={e => handleSubmit(e, false)}
            className="r-btn r-btn-primary" disabled={saving || !lessonId || !title}>
            {saving ? 'Saving...' : 'Submit for Review'}
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
