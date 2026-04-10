'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import StatusBadge from '../../../components/StatusBadge'

export default function AlbumEntryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [entry, setEntry] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('residency_album_entries')
        .select('*, lesson:residency_lessons(title, strand:residency_strands(name)), feedback:residency_feedback(*, mentor:residency_profiles(first_name, last_name))')
        .eq('id', id)
        .single()

      if (data) setEntry(data)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <p style={{ color: 'var(--r-text-muted)', padding: '2rem' }}>Loading...</p>
  if (!entry) return <p>Entry not found.</p>

  return (
    <div>
      <Link href="/residency/portal/albums" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Album Entries
      </Link>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'center' }}>
        <StatusBadge status={entry.status} size="md" />
        {entry.lesson?.strand && <span className="r-badge r-badge-strand">{entry.lesson.strand.name}</span>}
      </div>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{entry.title}</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.8125rem', marginBottom: '2rem' }}>
        {entry.lesson?.title}
        {entry.submitted_at && ` \u2022 Submitted ${new Date(entry.submitted_at).toLocaleDateString()}`}
      </p>

      {/* Content */}
      {entry.content && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Entry Content</h2>
          <div style={{ fontSize: '0.875rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {entry.content}
          </div>
        </div>
      )}

      {/* Files */}
      {entry.file_urls && entry.file_urls.length > 0 && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Attachments</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {entry.file_urls.map((url: string, i: number) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.875rem', color: 'var(--r-navy)' }}>
                Attachment {i + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Mentor Feedback</h2>
        {!entry.feedback || entry.feedback.length === 0 ? (
          <div className="r-card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--r-text-muted)' }}>
            <p style={{ fontSize: '0.875rem' }}>No feedback yet. Your mentor will review this entry.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {entry.feedback.map((fb: any) => (
              <div key={fb.id} className="r-card" style={{ borderLeft: '3px solid var(--r-gold)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    {fb.mentor?.first_name} {fb.mentor?.last_name}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                    {new Date(fb.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {fb.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
