'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

export default function AdminResourcesPage() {
  const [collections, setCollections] = useState<any[]>([])
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCollectionForm, setShowCollectionForm] = useState(false)
  const [showResourceForm, setShowResourceForm] = useState(false)
  const [colForm, setColForm] = useState({ name: '', slug: '', description: '' })
  const [resForm, setResForm] = useState({
    title: '', description: '', resource_type: 'article', url: '', citation: '',
    collection_id: '', level_tag: 'both', featured: false,
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const [colRes, resRes] = await Promise.all([
      supabase.from('residency_resource_collections').select('*').is('deleted_at', null).order('sort_order'),
      supabase.from('residency_resources').select('*, collection:residency_resource_collections(name)').is('deleted_at', null).order('title'),
    ])
    setCollections(colRes.data || [])
    setResources(resRes.data || [])
    setLoading(false)
  }

  async function createCollection() {
    if (!colForm.name) return
    setSaving(true)
    await supabase.from('residency_resource_collections').insert({
      name: colForm.name,
      slug: colForm.slug || colForm.name.toLowerCase().replace(/\s+/g, '-'),
      description: colForm.description || null,
      sort_order: collections.length,
    })
    setColForm({ name: '', slug: '', description: '' })
    setShowCollectionForm(false)
    setSaving(false)
    await load()
  }

  async function createResource() {
    if (!resForm.title) return
    setSaving(true)
    await supabase.from('residency_resources').insert({
      title: resForm.title,
      description: resForm.description || null,
      resource_type: resForm.resource_type,
      url: resForm.url || null,
      citation: resForm.citation || null,
      collection_id: resForm.collection_id || null,
      level_tag: resForm.level_tag,
      featured: resForm.featured,
    })
    setResForm({ title: '', description: '', resource_type: 'article', url: '', citation: '', collection_id: '', level_tag: 'both', featured: false })
    setShowResourceForm(false)
    setSaving(false)
    await load()
  }

  async function deleteResource(id: string) {
    if (!confirm('Remove this resource?')) return
    await supabase.from('residency_resources').update({ deleted_at: new Date().toISOString() }).eq('id', id)
    await load()
  }

  async function toggleFeatured(id: string, current: boolean) {
    await supabase.from('residency_resources').update({ featured: !current }).eq('id', id)
    await load()
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Resource Library</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            {resources.length} resources in {collections.length} collections
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="r-btn" onClick={() => setShowCollectionForm(!showCollectionForm)}>
            {showCollectionForm ? 'Cancel' : 'New Collection'}
          </button>
          <button className="r-btn r-btn-primary" onClick={() => setShowResourceForm(!showResourceForm)}>
            {showResourceForm ? 'Cancel' : 'Add Resource'}
          </button>
        </div>
      </div>

      {showCollectionForm && (
        <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>New Collection</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Name *</label>
              <input className="r-input" value={colForm.name} onChange={e => setColForm({ ...colForm, name: e.target.value })} />
            </div>
            <div>
              <label className="r-label">Slug</label>
              <input className="r-input" value={colForm.slug} onChange={e => setColForm({ ...colForm, slug: e.target.value })} placeholder="auto-generated" />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Description</label>
            <input className="r-input" value={colForm.description} onChange={e => setColForm({ ...colForm, description: e.target.value })} />
          </div>
          <button className="r-btn r-btn-primary" onClick={createCollection} disabled={saving}>Create</button>
        </div>
      )}

      {showResourceForm && (
        <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Add Resource</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Title *</label>
              <input className="r-input" value={resForm.title} onChange={e => setResForm({ ...resForm, title: e.target.value })} />
            </div>
            <div>
              <label className="r-label">Type</label>
              <select className="r-input" value={resForm.resource_type} onChange={e => setResForm({ ...resForm, resource_type: e.target.value })}>
                <option value="article">Article</option>
                <option value="book">Book</option>
                <option value="video">Video</option>
                <option value="podcast">Podcast</option>
                <option value="research_paper">Research Paper</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Description</label>
            <textarea className="r-textarea" rows={2} value={resForm.description} onChange={e => setResForm({ ...resForm, description: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">URL</label>
              <input className="r-input" type="url" value={resForm.url} onChange={e => setResForm({ ...resForm, url: e.target.value })} />
            </div>
            <div>
              <label className="r-label">Citation</label>
              <input className="r-input" value={resForm.citation} onChange={e => setResForm({ ...resForm, citation: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Collection</label>
              <select className="r-input" value={resForm.collection_id} onChange={e => setResForm({ ...resForm, collection_id: e.target.value })}>
                <option value="">None</option>
                {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="r-label">Level</label>
              <select className="r-input" value={resForm.level_tag} onChange={e => setResForm({ ...resForm, level_tag: e.target.value })}>
                <option value="both">Both</option>
                <option value="primary">Primary</option>
                <option value="elementary">Elementary</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input type="checkbox" checked={resForm.featured} onChange={e => setResForm({ ...resForm, featured: e.target.checked })} style={{ accentColor: 'var(--r-navy)' }} />
                Featured
              </label>
            </div>
          </div>
          <button className="r-btn r-btn-primary" onClick={createResource} disabled={saving}>Add Resource</button>
        </div>
      )}

      {resources.length === 0 ? (
        <EmptyState title="No resources yet" message="Add resources to build the library." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {resources.map(r => (
            <div key={r.id} className="r-card" style={{
              padding: '0.875rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderLeft: r.featured ? '3px solid var(--r-gold)' : undefined,
            }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.125rem' }}>{r.title}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                  {r.resource_type} &middot; {(r.collection as any)?.name || 'No collection'} &middot; {r.level_tag}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => toggleFeatured(r.id, r.featured)}
                  style={{ fontSize: '0.6875rem', color: r.featured ? 'var(--r-gold)' : 'var(--r-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {r.featured ? 'Unfeature' : 'Feature'}
                </button>
                <button onClick={() => deleteResource(r.id)}
                  style={{ fontSize: '0.6875rem', color: '#991b1b', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
