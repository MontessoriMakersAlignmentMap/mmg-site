'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function StrandsManagementPage() {
  const [levels, setLevels] = useState<any[]>([])
  const [strands, setStrands] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeLevel, setActiveLevel] = useState<string>('')

  // New strand form
  const [newStrand, setNewStrand] = useState({ name: '', description: '', level_id: '' })
  const [strandSaving, setStrandSaving] = useState(false)

  // New category form
  const [newCategory, setNewCategory] = useState({ name: '', description: '', strand_id: '' })
  const [categorySaving, setCategorySaving] = useState(false)

  // Editing
  const [editingStrand, setEditingStrand] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ name: '', description: '' })

  async function loadData() {
    const [l, s, c] = await Promise.all([
      supabase.from('residency_levels').select('*').order('sort_order'),
      supabase.from('residency_strands').select('*').order('sort_order'),
      supabase.from('residency_categories').select('*').order('sort_order'),
    ])
    if (l.data) {
      setLevels(l.data)
      if (!activeLevel && l.data.length > 0) setActiveLevel(l.data[0].id)
    }
    if (s.data) setStrands(s.data)
    if (c.data) setCategories(c.data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  async function createStrand(e: React.FormEvent) {
    e.preventDefault()
    setStrandSaving(true)
    const slug = newStrand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const levelStrands = strands.filter(s => s.level_id === newStrand.level_id)
    const maxOrder = levelStrands.length > 0 ? Math.max(...levelStrands.map(s => s.sort_order)) : 0

    await supabase.from('residency_strands').insert({
      name: newStrand.name,
      slug,
      description: newStrand.description || null,
      sort_order: maxOrder + 1,
      level_id: newStrand.level_id,
    })

    setNewStrand({ name: '', description: '', level_id: '' })
    setStrandSaving(false)
    loadData()
  }

  async function createCategory(e: React.FormEvent) {
    e.preventDefault()
    setCategorySaving(true)
    const slug = newCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const strandCats = categories.filter(c => c.strand_id === newCategory.strand_id)
    const maxOrder = strandCats.length > 0 ? Math.max(...strandCats.map(c => c.sort_order)) : 0

    await supabase.from('residency_categories').insert({
      name: newCategory.name,
      slug,
      description: newCategory.description || null,
      strand_id: newCategory.strand_id,
      sort_order: maxOrder + 1,
    })

    setNewCategory({ name: '', description: '', strand_id: '' })
    setCategorySaving(false)
    loadData()
  }

  async function saveEdit(type: 'strand' | 'category', id: string) {
    const table = type === 'strand' ? 'residency_strands' : 'residency_categories'
    await supabase.from(table).update({
      name: editForm.name,
      description: editForm.description || null,
    }).eq('id', id)

    setEditingStrand(null)
    setEditingCategory(null)
    loadData()
  }

  function startEdit(item: any, type: 'strand' | 'category') {
    setEditForm({ name: item.name, description: item.description ?? '' })
    if (type === 'strand') { setEditingStrand(item.id); setEditingCategory(null) }
    else { setEditingCategory(item.id); setEditingStrand(null) }
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const filteredStrands = strands.filter(s => s.level_id === activeLevel)
  const activeLevelName = levels.find(l => l.id === activeLevel)?.name ?? ''

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Strands & Categories</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Manage the curriculum taxonomy. Strands are organized by level.
      </p>

      {/* Level tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {levels.map(l => (
          <button
            key={l.id}
            onClick={() => setActiveLevel(l.id)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              border: '1px solid var(--r-border)',
              background: activeLevel === l.id ? 'var(--r-navy)' : 'var(--r-white)',
              color: activeLevel === l.id ? '#fff' : 'var(--r-text)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {l.name} ({l.age_range})
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Strands */}
        <div>
          <div className="r-card" style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>{activeLevelName} Strands</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {filteredStrands.map(s => (
                <div key={s.id} style={{
                  padding: '0.75rem',
                  background: 'var(--r-cream)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}>
                  {editingStrand === s.id ? (
                    <div style={{ flex: 1 }}>
                      <input className="r-input" value={editForm.name}
                        onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                        style={{ marginBottom: '0.5rem' }} />
                      <textarea className="r-textarea" value={editForm.description}
                        onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                        style={{ minHeight: '60px', marginBottom: '0.5rem' }} />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => saveEdit('strand', s.id)} className="r-btn r-btn-primary" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>Save</button>
                        <button onClick={() => setEditingStrand(null)} className="r-btn r-btn-secondary" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--r-navy)' }}>{s.name}</p>
                        {s.description && <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>{s.description}</p>}
                      </div>
                      <button onClick={() => startEdit(s, 'strand')}
                        style={{ background: 'none', border: 'none', color: 'var(--r-navy)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
                        Edit
                      </button>
                    </>
                  )}
                </div>
              ))}
              {filteredStrands.length === 0 && (
                <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No strands for this level yet.</p>
              )}
            </div>
          </div>

          {/* New strand form */}
          <form onSubmit={createStrand} className="r-card">
            <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.75rem', fontFamily: 'var(--r-font-body)', fontWeight: 600 }}>Add Strand</h3>
            <select className="r-input" value={newStrand.level_id}
              onChange={e => setNewStrand(s => ({ ...s, level_id: e.target.value }))}
              required style={{ marginBottom: '0.5rem' }}>
              <option value="">Select level...</option>
              {levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
            <input className="r-input" placeholder="Strand name" value={newStrand.name}
              onChange={e => setNewStrand(s => ({ ...s, name: e.target.value }))}
              required style={{ marginBottom: '0.5rem' }} />
            <textarea className="r-textarea" placeholder="Description (optional)" value={newStrand.description}
              onChange={e => setNewStrand(s => ({ ...s, description: e.target.value }))}
              style={{ minHeight: '60px', marginBottom: '0.75rem' }} />
            <button type="submit" className="r-btn r-btn-primary" disabled={strandSaving} style={{ fontSize: '0.8125rem' }}>
              {strandSaving ? 'Adding...' : 'Add Strand'}
            </button>
          </form>
        </div>

        {/* Categories */}
        <div>
          <div className="r-card" style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>{activeLevelName} Categories</h2>
            {filteredStrands.map(s => {
              const strandCats = categories.filter(c => c.strand_id === s.id)
              if (strandCats.length === 0) return null
              return (
                <div key={s.id} style={{ marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    {s.name}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {strandCats.map(c => (
                      <div key={c.id} style={{
                        padding: '0.625rem 0.75rem',
                        background: 'var(--r-cream)',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                      }}>
                        {editingCategory === c.id ? (
                          <div style={{ flex: 1 }}>
                            <input className="r-input" value={editForm.name}
                              onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                              style={{ marginBottom: '0.5rem' }} />
                            <textarea className="r-textarea" value={editForm.description}
                              onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                              style={{ minHeight: '60px', marginBottom: '0.5rem' }} />
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button onClick={() => saveEdit('category', c.id)} className="r-btn r-btn-primary" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>Save</button>
                              <button onClick={() => setEditingCategory(null)} className="r-btn r-btn-secondary" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontWeight: 500, fontSize: '0.8125rem' }}>{c.name}</p>
                              {c.description && <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.125rem' }}>{c.description}</p>}
                            </div>
                            <button onClick={() => startEdit(c, 'category')}
                              style={{ background: 'none', border: 'none', color: 'var(--r-navy)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
                              Edit
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* New category form */}
          <form onSubmit={createCategory} className="r-card">
            <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.75rem', fontFamily: 'var(--r-font-body)', fontWeight: 600 }}>Add Category</h3>
            <select className="r-input" value={newCategory.strand_id}
              onChange={e => setNewCategory(c => ({ ...c, strand_id: e.target.value }))}
              required style={{ marginBottom: '0.5rem' }}>
              <option value="">Select strand...</option>
              {filteredStrands.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <input className="r-input" placeholder="Category name" value={newCategory.name}
              onChange={e => setNewCategory(c => ({ ...c, name: e.target.value }))}
              required style={{ marginBottom: '0.5rem' }} />
            <textarea className="r-textarea" placeholder="Description (optional)" value={newCategory.description}
              onChange={e => setNewCategory(c => ({ ...c, description: e.target.value }))}
              style={{ minHeight: '60px', marginBottom: '0.75rem' }} />
            <button type="submit" className="r-btn r-btn-primary" disabled={categorySaving} style={{ fontSize: '0.8125rem' }}>
              {categorySaving ? 'Adding...' : 'Add Category'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
