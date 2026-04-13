'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

const typeIcons: Record<string, string> = {
  article: 'Article',
  book: 'Book',
  video: 'Video',
  podcast: 'Podcast',
  research_paper: 'Research',
}

export default function ResourceLibraryPage() {
  const [collections, setCollections] = useState<any[]>([])
  const [resources, setResources] = useState<any[]>([])
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [residentId, setResidentId] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeCollection, setActiveCollection] = useState<string | null>(null)
  const [showBookmarked, setShowBookmarked] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: resident } = await supabase.from('residency_residents').select('id').eq('profile_id', user.id).single()
      if (resident) {
        setResidentId(resident.id)
        const { data: bm } = await supabase.from('residency_resource_bookmarks').select('resource_id').eq('resident_id', resident.id)
        setBookmarks(new Set((bm || []).map(b => b.resource_id)))
      }

      const [colRes, resRes] = await Promise.all([
        supabase.from('residency_resource_collections').select('*').is('deleted_at', null).order('sort_order'),
        supabase.from('residency_resources').select('*').is('deleted_at', null).order('featured', { ascending: false }).order('title'),
      ])
      setCollections(colRes.data || [])
      setResources(resRes.data || [])
      setLoading(false)
    }
    load()
  }, [])

  async function toggleBookmark(resourceId: string) {
    if (bookmarks.has(resourceId)) {
      await supabase.from('residency_resource_bookmarks').delete().eq('resident_id', residentId).eq('resource_id', resourceId)
      setBookmarks(prev => { const n = new Set(prev); n.delete(resourceId); return n })
    } else {
      await supabase.from('residency_resource_bookmarks').insert({ resident_id: residentId, resource_id: resourceId })
      setBookmarks(prev => new Set(prev).add(resourceId))
    }
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const displayedResources = showBookmarked
    ? resources.filter(r => bookmarks.has(r.id))
    : activeCollection
      ? resources.filter(r => r.collection_id === activeCollection)
      : resources.filter(r => r.featured)

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Resource Library</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Curated materials to deepen your Montessori practice.
      </p>

      {/* Collection tabs */}
      <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => { setActiveCollection(null); setShowBookmarked(false) }}
          style={{
            padding: '0.375rem 0.875rem', fontSize: '0.8125rem', borderRadius: '20px', cursor: 'pointer',
            border: !activeCollection && !showBookmarked ? '2px solid var(--r-navy)' : '1px solid var(--r-border)',
            background: !activeCollection && !showBookmarked ? 'rgba(14,26,122,0.06)' : 'transparent',
            fontWeight: !activeCollection && !showBookmarked ? 600 : 400,
            color: !activeCollection && !showBookmarked ? 'var(--r-navy)' : 'var(--r-text-muted)',
          }}>
          Featured
        </button>
        {collections.map(c => (
          <button key={c.id} onClick={() => { setActiveCollection(c.id); setShowBookmarked(false) }}
            style={{
              padding: '0.375rem 0.875rem', fontSize: '0.8125rem', borderRadius: '20px', cursor: 'pointer',
              border: activeCollection === c.id ? '2px solid var(--r-navy)' : '1px solid var(--r-border)',
              background: activeCollection === c.id ? 'rgba(14,26,122,0.06)' : 'transparent',
              fontWeight: activeCollection === c.id ? 600 : 400,
              color: activeCollection === c.id ? 'var(--r-navy)' : 'var(--r-text-muted)',
            }}>
            {c.name}
          </button>
        ))}
        {bookmarks.size > 0 && (
          <button onClick={() => { setActiveCollection(null); setShowBookmarked(true) }}
            style={{
              padding: '0.375rem 0.875rem', fontSize: '0.8125rem', borderRadius: '20px', cursor: 'pointer',
              border: showBookmarked ? '2px solid var(--r-gold)' : '1px solid var(--r-border)',
              background: showBookmarked ? 'var(--r-gold-light)' : 'transparent',
              fontWeight: showBookmarked ? 600 : 400,
              color: showBookmarked ? 'var(--r-navy)' : 'var(--r-text-muted)',
            }}>
            My Resources ({bookmarks.size})
          </button>
        )}
      </div>

      {displayedResources.length === 0 ? (
        <EmptyState title={showBookmarked ? 'No bookmarks yet' : 'No resources'} message={showBookmarked ? 'Bookmark resources to save them here.' : 'Resources will be added by the program.'} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {displayedResources.map(r => (
            <div key={r.id} className="r-card" style={{
              padding: '1.25rem',
              borderLeft: r.featured ? '3px solid var(--r-gold)' : undefined,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                    <span style={{
                      fontSize: '0.5625rem', fontWeight: 600, textTransform: 'uppercase',
                      padding: '0.125rem 0.375rem', borderRadius: '3px',
                      background: 'var(--r-gold-light)', color: 'var(--r-navy)',
                    }}>
                      {typeIcons[r.resource_type] || r.resource_type}
                    </span>
                    {r.level_tag && r.level_tag !== 'both' && (
                      <span style={{
                        fontSize: '0.5625rem', fontWeight: 600, textTransform: 'uppercase',
                        padding: '0.125rem 0.375rem', borderRadius: '3px',
                        background: '#e8e9f5', color: 'var(--r-navy)',
                      }}>
                        {r.level_tag}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: '0 0 0.25rem', color: 'var(--r-navy)' }}>
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                        {r.title}
                      </a>
                    ) : r.title}
                  </h3>
                  {r.description && (
                    <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--r-text-muted)' }}>{r.description}</p>
                  )}
                  {r.citation && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', fontStyle: 'italic', marginTop: '0.25rem' }}>{r.citation}</p>
                  )}
                </div>
                <button onClick={() => toggleBookmark(r.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem',
                    color: bookmarks.has(r.id) ? 'var(--r-gold)' : 'var(--r-border)',
                    padding: '0.25rem',
                  }}>
                  {bookmarks.has(r.id) ? '\u2605' : '\u2606'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
