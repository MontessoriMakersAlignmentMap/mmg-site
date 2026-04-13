'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function TeachingPackageDownload({
  lessonId,
  packageUrl,
  lessonTitle,
}: {
  lessonId: string
  packageUrl: string
  lessonTitle: string
}) {
  const [canDownload, setCanDownload] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkApproval() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (!resident) { setLoading(false); return }

      // Check if resident has an approved album entry for this lesson
      const { data: entries } = await supabase
        .from('residency_album_entries')
        .select('id, status')
        .eq('resident_id', resident.id)
        .eq('lesson_id', lessonId)
        .eq('status', 'approved')
        .limit(1)

      setCanDownload(entries !== null && entries.length > 0)
      setLoading(false)
    }
    checkApproval()
  }, [lessonId])

  if (loading) return null

  return (
    <div style={{
      padding: '1.25rem 1.5rem',
      borderRadius: '10px',
      border: canDownload ? '1px solid var(--r-gold)' : '1px solid var(--r-border)',
      background: canDownload ? 'var(--r-gold-light)' : 'var(--r-bg-muted, #f8f8f8)',
      marginBottom: '1.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.5rem' }}>{canDownload ? '\u{1F4D6}' : '\u{1F512}'}</span>
        <div style={{ flex: 1 }}>
          <p style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--r-navy)',
            margin: 0,
          }}>
            Full Teaching Package
          </p>
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--r-text-muted)',
            margin: '0.25rem 0 0',
          }}>
            {canDownload
              ? 'Your album entry has been approved. Download the complete teaching package.'
              : 'Submit and receive approval on your album entry to unlock this download.'}
          </p>
        </div>
        {canDownload ? (
          <a
            href={packageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="r-btn r-btn-primary"
            style={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}
          >
            Download PDF
          </a>
        ) : (
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--r-text-muted)',
            fontWeight: 500,
            padding: '0.5rem 1rem',
            border: '1px solid var(--r-border)',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
          }}>
            Locked
          </span>
        )}
      </div>
    </div>
  )
}
