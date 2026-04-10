'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import StatusBadge from '../../components/StatusBadge'
import EmptyState from '../../components/EmptyState'

export default function AlbumsPage() {
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (resident) {
        const { data } = await supabase
          .from('residency_album_entries')
          .select('*, lesson:residency_lessons(title, strand:residency_strands(name)), feedback:residency_feedback(id)')
          .eq('resident_id', resident.id)
          .order('created_at', { ascending: false })

        if (data) setEntries(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Album Entries</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Your submitted work and mentor feedback.
          </p>
        </div>
        <Link href="/residency/portal/albums/new" className="r-btn r-btn-primary">
          New Entry
        </Link>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {entries.map((entry: any) => (
            <Link key={entry.id} href={`/residency/portal/albums/${entry.id}`}
              className="r-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', margin: 0, marginBottom: '0.25rem' }}>{entry.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                    {entry.lesson?.title}
                    {entry.lesson?.strand && ` \u2022 ${entry.lesson.strand.name}`}
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <StatusBadge status={entry.status} />
                  {entry.feedback && entry.feedback.length > 0 && (
                    <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                      {entry.feedback.length} feedback
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
