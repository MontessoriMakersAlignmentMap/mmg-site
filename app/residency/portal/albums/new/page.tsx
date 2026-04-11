'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const FIELD_CONFIG = [
  { key: 'why_this_lesson_matters', label: 'Why This Lesson Matters', prompt: 'In your own words, why does this lesson matter in a child\'s development? What does it build, what does it prepare, and why is it placed where it is in the sequence?' },
  { key: 'direct_aim', label: 'Direct Aim', prompt: 'What is the concrete, observable skill this lesson develops? What will the child be able to do after this presentation?' },
  { key: 'indirect_aim', label: 'Indirect Aim', prompt: 'What are the deeper developmental purposes this lesson serves? What is being prepared indirectly — concentration, coordination, independence, order?' },
  { key: 'equity_aim', label: 'Equity Aim', prompt: 'What does this lesson communicate to children about their own competence, their right to make and correct mistakes, and their cultural identity? How does it honor every child in the room?' },
  { key: 'materials', label: 'Materials', prompt: 'List every material needed for this presentation. For each item, note why it matters — what role does it play in isolating the concept or supporting the child\'s success?' },
  { key: 'presentation', label: 'The Presentation', prompt: 'Describe the full lesson sequence exactly as you would give it. Include your positioning, your language, your movements, and the child\'s role at each step. Write this as if you are teaching someone to give this presentation.' },
  { key: 'points_of_interest', label: 'Points of Interest', prompt: 'What are the moments in this lesson where the child\'s concentration naturally deepens? Where does the control of error live? What draws the child back to this work?' },
  { key: 'variations', label: 'Variations and Extensions', prompt: 'How does this work grow with the child? What variations increase complexity? What extensions connect this lesson to other areas of the curriculum?' },
  { key: 'neurodivergence_notes', label: 'Neurodivergence and Behavior', prompt: 'How does this lesson need to be adapted for children with different sensory profiles, motor planning differences, attention profiles, or trauma histories? What modifications preserve the integrity of the lesson while meeting the child where they are?' },
]

export default function NewAlbumEntryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedLesson = searchParams.get('lesson')
  const editId = searchParams.get('edit')

  const [lessonId, setLessonId] = useState(preselectedLesson ?? '')
  const [lesson, setLesson] = useState<any>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [residentId, setResidentId] = useState('')
  const [entryId, setEntryId] = useState(editId ?? '')
  const [fields, setFields] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id, assigned_level_id')
        .eq('profile_id', user.id)
        .single()
      if (!resident) return
      setResidentId(resident.id)

      // Load available lessons
      const { data: lessonData } = await supabase
        .from('residency_lessons')
        .select('id, title, strand:residency_strands(id, name), level:residency_levels(name)')
        .eq('level_id', resident.assigned_level_id)
        .order('sort_order')
      if (lessonData) setLessons(lessonData)

      // If editing existing entry, load it
      if (editId) {
        const { data: entry } = await supabase
          .from('residency_album_entries')
          .select('*')
          .eq('id', editId)
          .single()
        if (entry) {
          setLessonId(entry.lesson_id)
          const loaded: Record<string, string> = {}
          for (const f of FIELD_CONFIG) {
            loaded[f.key] = entry[f.key] || ''
          }
          setFields(loaded)
        }
      }
    }
    load()
  }, [editId])

  // Load lesson details when lessonId changes
  useEffect(() => {
    if (!lessonId) { setLesson(null); return }
    async function loadLesson() {
      const { data } = await supabase
        .from('residency_lessons')
        .select('id, title, strand:residency_strands(name), level:residency_levels(name)')
        .eq('id', lessonId)
        .single()
      setLesson(data)
    }
    loadLesson()
  }, [lessonId])

  function updateField(key: string, value: string) {
    setFields(prev => ({ ...prev, [key]: value }))
  }

  function wordCount(text: string) {
    return text?.trim() ? text.trim().split(/\s+/).length : 0
  }

  async function saveDraft() {
    if (!lessonId || !residentId) return
    setSaving(true)
    setError('')

    const record: any = {
      lesson_id: lessonId,
      resident_id: residentId,
      title: lesson?.title || 'Untitled',
      is_draft: true,
      draft_saved_at: new Date().toISOString(),
      status: 'draft',
      updated_at: new Date().toISOString(),
    }
    for (const f of FIELD_CONFIG) {
      record[f.key] = fields[f.key] || null
    }

    try {
      if (entryId) {
        const { error: err } = await supabase
          .from('residency_album_entries')
          .update(record)
          .eq('id', entryId)
        if (err) throw err
      } else {
        const { data, error: err } = await supabase
          .from('residency_album_entries')
          .insert(record)
          .select('id')
          .single()
        if (err) throw err
        if (data) setEntryId(data.id)
      }
      setLastSaved(new Date().toLocaleTimeString())
    } catch (e: any) {
      setError(e.message || 'Failed to save')
    }
    setSaving(false)
  }

  async function submitForAIReview() {
    // Save first
    await saveDraft()
    if (!entryId && !lessonId) return

    setSubmitting(true)
    setError('')

    try {
      // Update status
      await supabase
        .from('residency_album_entries')
        .update({
          is_draft: false,
          status: 'ai_review',
          ai_review_status: 'in_review',
          submitted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', entryId)

      // Call AI review API
      const res = await fetch('/api/residency/ai-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entry_id: entryId }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'AI review failed')
      }

      router.push(`/residency/portal/albums/${entryId}`)
    } catch (e: any) {
      setError(e.message || 'Failed to submit')
      setSubmitting(false)
    }
  }

  const totalWords = FIELD_CONFIG.reduce((sum, f) => sum + wordCount(fields[f.key] || ''), 0)
  const filledFields = FIELD_CONFIG.filter(f => wordCount(fields[f.key] || '') > 0).length

  return (
    <div style={{ maxWidth: '800px' }}>
      <Link href="/residency/portal/albums" style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
        &larr; Back to Album Entries
      </Link>

      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        {editId ? 'Edit Album Entry' : 'New Album Entry'}
      </h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Write your album entry for this lesson in your own words. Each field mirrors the master lesson structure.
      </p>

      {/* Lesson selector */}
      {!editId && (
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem', color: 'var(--r-navy)' }}>
            Select Lesson
          </label>
          <select
            className="r-input"
            value={lessonId}
            onChange={e => setLessonId(e.target.value)}
            style={{ fontSize: '0.9375rem' }}
          >
            <option value="">Choose a lesson...</option>
            {lessons.map(l => (
              <option key={l.id} value={l.id}>
                {l.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Lesson header */}
      {lesson && (
        <div style={{
          background: 'var(--r-navy)',
          color: 'white',
          borderRadius: '10px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
        }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '0.25rem' }}>
            {lesson.level?.name} &middot; {lesson.strand?.name}
          </p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
            {lesson.title?.replace(/^(Primary|Elementary): \w[\w\s]*: /, '')}
          </h2>
        </div>
      )}

      {!lessonId && (
        <div className="r-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--r-text-muted)' }}>
          Select a lesson above to begin writing your album entry.
        </div>
      )}

      {/* Structured form fields */}
      {lessonId && (
        <div>
          {/* Progress summary */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.625rem 1rem', background: 'var(--r-bg-muted)', borderRadius: '8px',
            marginBottom: '2rem', fontSize: '0.8125rem',
          }}>
            <span>{filledFields} of {FIELD_CONFIG.length} fields started</span>
            <span style={{ color: 'var(--r-text-muted)' }}>{totalWords} words total</span>
            {lastSaved && <span style={{ color: '#2e7d32', fontSize: '0.75rem' }}>Saved {lastSaved}</span>}
          </div>

          {FIELD_CONFIG.map((field, idx) => {
            const value = fields[field.key] || ''
            const wc = wordCount(value)
            return (
              <div key={field.key} style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <label style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--r-navy)',
                    display: 'block',
                  }}>
                    {idx + 1}. {field.label}
                  </label>
                  <span style={{ fontSize: '0.6875rem', color: wc > 0 ? 'var(--r-text-muted)' : 'transparent' }}>
                    {wc} words
                  </span>
                </div>
                <textarea
                  value={value}
                  onChange={e => updateField(field.key, e.target.value)}
                  placeholder={field.prompt}
                  rows={field.key === 'presentation' ? 12 : field.key === 'direct_aim' || field.key === 'indirect_aim' ? 4 : 6}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--r-border)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.8,
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    background: 'white',
                    transition: 'border-color 0.2s',
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--r-navy)'}
                  onBlur={e => e.target.style.borderColor = 'var(--r-border)'}
                />
              </div>
            )
          })}

          {error && (
            <p style={{ color: '#c62828', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>
          )}

          {/* Action buttons */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1.5rem 0', borderTop: '1px solid var(--r-border)',
            position: 'sticky', bottom: 0, background: 'white',
          }}>
            <button
              className="r-btn"
              onClick={saveDraft}
              disabled={saving}
              style={{ fontSize: '0.875rem' }}
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              className="r-btn r-btn-primary"
              onClick={submitForAIReview}
              disabled={submitting || filledFields < FIELD_CONFIG.length}
              style={{ fontSize: '0.875rem' }}
            >
              {submitting ? 'Submitting...' : 'Submit for AI Review'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
