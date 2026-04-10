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
    objectives: '',
    materials: '',
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
        objectives: form.objectives ? form.objectives.split('\n').filter(Boolean) : null,
        materials: form.materials ? form.materials.split('\n').filter(Boolean) : null,
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
              <label className="r-label">Strand</label>
              <select className="r-input" value={form.strand_id} onChange={e => update('strand_id', e.target.value)} required>
                <option value="">Select...</option>
                {strands.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="r-label">Level</label>
              <select className="r-input" value={form.level_id} onChange={e => update('level_id', e.target.value)} required>
                <option value="">Select...</option>
                {levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>
            <div>
              <label className="r-label">Category</label>
              <select className="r-input" value={form.category_id} onChange={e => update('category_id', e.target.value)} required>
                <option value="">Select...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
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
            <label className="r-label">Description</label>
            <textarea className="r-textarea" value={form.description}
              onChange={e => update('description', e.target.value)}
              placeholder="Brief description of the lesson..." />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Content</label>
            <textarea className="r-textarea" value={form.content}
              onChange={e => update('content', e.target.value)}
              style={{ minHeight: '200px' }}
              placeholder="Full lesson content..." />
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
            <label className="r-label">Materials (one per line)</label>
            <textarea className="r-textarea" value={form.materials}
              onChange={e => update('materials', e.target.value)}
              placeholder="List materials needed..." />
          </div>

          <div>
            <label className="r-label">Attachments</label>
            <input type="file" multiple onChange={e => setFiles(Array.from(e.target.files ?? []))}
              style={{ fontSize: '0.875rem' }} />
          </div>
        </div>

        {error && (
          <p style={{ color: 'var(--r-error)', fontSize: '0.8125rem', marginBottom: '1rem', padding: '0.5rem', background: '#fef2f2', borderRadius: '6px' }}>
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
