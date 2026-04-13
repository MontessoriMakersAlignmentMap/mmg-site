'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewLessonPage() {
  const router = useRouter()
  const [strands, setStrands] = useState<any[]>([])
  const [levels, setLevels] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    strand_id: '',
    level_id: '',
    category_id: '',
    status: 'draft' as 'draft' | 'published',
    age_range: '',
    objectives: '',
    materials: '',
    why_this_lesson_matters: '',
    direct_aim: '',
    indirect_aim: '',
    equity_aim: '',
    presentation: '',
    points_of_interest: '',
    variations: '',
    neurodivergence_notes: '',
  })
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadTaxonomy() {
      const [s, l, c] = await Promise.all([
        supabase.from('residency_strands').select('*').order('sort_order'),
        supabase.from('residency_levels').select('*').order('sort_order'),
        supabase.from('residency_categories').select('*').order('sort_order'),
      ])
      if (s.data) setStrands(s.data)
      if (l.data) setLevels(l.data)
      if (c.data) setCategories(c.data)
    }
    loadTaxonomy()
  }, [])

  function update(field: string, value: string) {
    setForm(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'title' ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } : {}),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    // Upload files
    const fileUrls: string[] = []
    for (const file of files) {
      const path = `lessons/${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('residency')
        .upload(path, file)
      if (!uploadError) {
        const { data } = supabase.storage.from('residency').getPublicUrl(path)
        fileUrls.push(data.publicUrl)
      }
    }

    const { data: { user } } = await supabase.auth.getUser()

    const { error: insertError } = await supabase
      .from('residency_lessons')
      .insert({
        title: form.title,
        slug: form.slug,
        description: form.description || null,
        content: form.content || null,
        strand_id: form.strand_id,
        level_id: form.level_id,
        category_id: form.category_id,
        status: form.status,
        age_range: form.age_range || null,
        objectives: form.objectives ? form.objectives.split('\n').filter(Boolean) : null,
        materials: form.materials ? form.materials.split('\n').filter(Boolean) : null,
        why_this_lesson_matters: form.why_this_lesson_matters || null,
        direct_aim: form.direct_aim || null,
        indirect_aim: form.indirect_aim || null,
        equity_aim: form.equity_aim || null,
        presentation: form.presentation || null,
        points_of_interest: form.points_of_interest || null,
        variations: form.variations || null,
        neurodivergence_notes: form.neurodivergence_notes || null,
        file_urls: fileUrls.length > 0 ? fileUrls : null,
        created_by: user?.id ?? null,
      })

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    router.push('/residency/admin/lessons')
  }

  return (
    <div>
      <Link href="/residency/admin/lessons" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Lessons
      </Link>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>New Lesson</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: '700px' }}>
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Lesson Details</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label" htmlFor="title">Title</label>
            <input id="title" type="text" className="r-input"
              value={form.title} onChange={e => update('title', e.target.value)} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="r-label">Level</label>
              <select className="r-input" value={form.level_id} onChange={e => { update('level_id', e.target.value); setForm(prev => ({ ...prev, level_id: e.target.value, strand_id: '', category_id: '' })) }} required>
                <option value="">Select...</option>
                {levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>
            <div>
              <label className="r-label">Strand</label>
              <select className="r-input" value={form.strand_id} onChange={e => { setForm(prev => ({ ...prev, strand_id: e.target.value, category_id: '' })) }} required>
                <option value="">Select...</option>
                {strands.filter(s => s.level_id === form.level_id).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="r-label">Category</label>
              <select className="r-input" value={form.category_id} onChange={e => update('category_id', e.target.value)} required>
                <option value="">Select...</option>
                {categories.filter(c => c.strand_id === form.strand_id).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Status</label>
            <select className="r-input" value={form.status} onChange={e => update('status', e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Age Range</label>
            <input type="text" className="r-input" value={form.age_range}
              onChange={e => update('age_range', e.target.value)}
              placeholder="e.g., 3–6" />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Description</label>
            <textarea className="r-textarea" value={form.description}
              onChange={e => update('description', e.target.value)}
              placeholder="Brief description of the lesson..." />
          </div>
        </div>

        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Lesson Content</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Why This Lesson Matters</label>
            <textarea className="r-textarea" value={form.why_this_lesson_matters}
              onChange={e => update('why_this_lesson_matters', e.target.value)}
              style={{ minHeight: '140px' }}
              placeholder="Narrative introduction — why this lesson is important in the sequence..." />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="r-label">Direct Aim</label>
              <textarea className="r-textarea" value={form.direct_aim}
                onChange={e => update('direct_aim', e.target.value)}
                placeholder="What the child directly practices..." />
            </div>
            <div>
              <label className="r-label">Indirect Aim</label>
              <textarea className="r-textarea" value={form.indirect_aim}
                onChange={e => update('indirect_aim', e.target.value)}
                placeholder="What the child indirectly prepares for..." />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Equity Aim</label>
            <textarea className="r-textarea" value={form.equity_aim}
              onChange={e => update('equity_aim', e.target.value)}
              placeholder="How this lesson connects to equity, belonging, and justice..." />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Materials (one per line)</label>
            <textarea className="r-textarea" value={form.materials}
              onChange={e => update('materials', e.target.value)}
              placeholder="List materials needed..." />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">The Presentation</label>
            <textarea className="r-textarea" value={form.presentation}
              onChange={e => update('presentation', e.target.value)}
              style={{ minHeight: '200px' }}
              placeholder="Step-by-step presentation of the lesson..." />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Points of Interest</label>
            <textarea className="r-textarea" value={form.points_of_interest}
              onChange={e => update('points_of_interest', e.target.value)}
              placeholder="Key moments of engagement and discovery..." />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Variations and Extensions</label>
            <textarea className="r-textarea" value={form.variations}
              onChange={e => update('variations', e.target.value)}
              placeholder="Ways to adapt, extend, or vary the lesson..." />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Neurodivergence and Behavior</label>
            <textarea className="r-textarea" value={form.neurodivergence_notes}
              onChange={e => update('neurodivergence_notes', e.target.value)}
              placeholder="Considerations for neurodivergent learners and behavioral support..." />
          </div>
        </div>

        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Additional Details</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Objectives (one per line)</label>
            <textarea className="r-textarea" value={form.objectives}
              onChange={e => update('objectives', e.target.value)}
              placeholder="Students will be able to..." />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Content (general notes)</label>
            <textarea className="r-textarea" value={form.content}
              onChange={e => update('content', e.target.value)}
              style={{ minHeight: '120px' }}
              placeholder="Any additional notes or content..." />
          </div>

          <div>
            <label className="r-label">Attachments</label>
            <input type="file" multiple onChange={e => setFiles(Array.from(e.target.files ?? []))}
              style={{ fontSize: '0.875rem' }} />
          </div>
        </div>

        {error && (
          <p style={{ color: 'var(--r-error)', fontSize: '0.8125rem', marginBottom: '1rem', padding: '0.5rem', background: 'var(--r-error-light)', borderRadius: '6px' }}>
            {error}
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Create Lesson'}
          </button>
          <Link href="/residency/admin/lessons" className="r-btn r-btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
