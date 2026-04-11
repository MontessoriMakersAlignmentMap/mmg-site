'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import StatusBadge from '../../components/StatusBadge'
import EmptyState from '../../components/EmptyState'

export default function AlbumsPage() {
  const [entries, setEntries] = useState<any[]>([])
  const [strands, setStrands] = useState<any[]>([])
  const [strandCompletions, setStrandCompletions] = useState<any[]>([])
  const [residentId, setResidentId] = useState('')
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id, assigned_level_id')
        .eq('profile_id', user.id)
        .single()

      if (!resident) { setLoading(false); return }
      setResidentId(resident.id)

      // Load entries with lesson/strand info
      const { data: entryData } = await supabase
        .from('residency_album_entries')
        .select('*, lesson:residency_lessons(title, sort_order, strand:residency_strands(id, name, sort_order))')
        .eq('resident_id', resident.id)
        .order('created_at', { ascending: false })

      if (entryData) setEntries(entryData)

      // Load strands for this level
      const { data: strandData } = await supabase
        .from('residency_strands')
        .select('id, name, sort_order')
        .eq('level_id', resident.assigned_level_id)
        .order('sort_order')

      if (strandData) setStrands(strandData)

      // Load strand completions
      const { data: completions } = await supabase
        .from('residency_strand_completions')
        .select('*')
        .eq('resident_id', resident.id)

      if (completions) setStrandCompletions(completions)

      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  // Group entries by strand
  const entriesByStrand: Record<string, any[]> = {}
  const drafts: any[] = []

  for (const entry of entries) {
    if (entry.is_draft || entry.status === 'draft') {
      drafts.push(entry)
      continue
    }
    const strandId = entry.lesson?.strand?.id || 'unknown'
    if (!entriesByStrand[strandId]) entriesByStrand[strandId] = []
    entriesByStrand[strandId].push(entry)
  }

  const totalComplete = entries.filter(e => e.status === 'complete').length
  const totalEntries = entries.filter(e => e.status !== 'draft' && !e.is_draft).length

  async function handleDownload() {
    setDownloading(true)
    try {
      const res = await fetch(`/api/residency/album-download?resident_id=${residentId}`)
      if (!res.ok) throw new Error('Download failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = res.headers.get('content-disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'album.docx'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('Download failed. Make sure you have completed entries.')
    }
    setDownloading(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Album Entries</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            {totalComplete} complete &middot; {totalEntries} submitted
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {totalComplete > 0 && (
            <button className="r-btn" onClick={handleDownload} disabled={downloading} style={{ fontSize: '0.8125rem' }}>
              {downloading ? 'Generating...' : 'Download Album'}
            </button>
          )}
          <Link href="/residency/portal/albums/new" className="r-btn r-btn-primary">
            New Entry
          </Link>
        </div>
      </div>

      {entries.length === 0 ? (
        <EmptyState
          title="No album entries yet"
          message="Submit your first album entry to begin building your portfolio."
          action={
            <Link href="/residency/portal/albums/new" className="r-btn r-btn-primary">
              Create Entry
            </Link>
          }
        />
      ) : (
        <>
          {/* Strand completion summary */}
          {strands.length > 0 && (
            <div style={{
              display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem',
            }}>
              {strands.map(strand => {
                const comp = strandCompletions.find(c => c.strand_id === strand.id)
                const completed = comp?.entries_completed || 0
                const total = comp?.total_entries || 0
                const pct = total > 0 ? Math.round((completed / total) * 100) : 0
                return (
                  <div key={strand.id} style={{
                    flex: '1 1 120px', maxWidth: '160px', textAlign: 'center', padding: '0.75rem 0.5rem',
                    background: pct === 100 ? '#e8f5e9' : 'var(--r-bg-muted)', borderRadius: '8px',
                  }}>
                    <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>
                      {strand.name}
                    </p>
                    <p style={{
                      fontSize: '1.25rem', fontWeight: 700,
                      color: pct === 100 ? '#2e7d32' : 'var(--r-navy)',
                    }}>
                      {completed}/{total}
                    </p>
                  </div>
                )
              })}
            </div>
          )}

          {/* Drafts */}
          {drafts.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--r-text-muted)' }}>
                Drafts ({drafts.length})
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {drafts.map(entry => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          )}

          {/* Entries by strand */}
          {strands.map(strand => {
            const strandEntries = entriesByStrand[strand.id]
            if (!strandEntries?.length) return null
            return (
              <div key={strand.id} style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--r-navy)' }}>
                  {strand.name} ({strandEntries.length})
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {strandEntries
                    .sort((a: any, b: any) => (a.lesson?.sort_order || 0) - (b.lesson?.sort_order || 0))
                    .map((entry: any) => (
                      <EntryCard key={entry.id} entry={entry} />
                    ))}
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

function EntryCard({ entry }: { entry: any }) {
  return (
    <Link href={entry.is_draft || entry.status === 'draft' ? `/residency/portal/albums/new?edit=${entry.id}` : `/residency/portal/albums/${entry.id}`}
      className="r-card" style={{ textDecoration: 'none', color: 'inherit', padding: '0.875rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '0.9375rem', margin: 0, marginBottom: '0.125rem' }}>{entry.title}</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
            {entry.lesson?.strand?.name}
            {entry.revision_count > 0 && ` \u2022 Revision ${entry.revision_count}`}
          </p>
        </div>
        <StatusBadge status={entry.status} />
      </div>
    </Link>
  )
}
