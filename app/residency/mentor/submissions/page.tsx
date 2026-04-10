'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import StatusBadge from '../../components/StatusBadge'
import EmptyState from '../../components/EmptyState'

export default function MentorSubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get mentee IDs
      const { data: residents } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('mentor_id', user.id)

      const residentIds = (residents ?? []).map((r: any) => r.id)

      if (residentIds.length > 0) {
        const { data } = await supabase
          .from('residency_album_entries')
          .select('*, lesson:residency_lessons(title, strand:residency_strands(name)), resident:residency_residents!inner(profile:residency_profiles(first_name, last_name))')
          .in('resident_id', residentIds)
          .in('status', ['submitted', 'reviewed'])
          .order('submitted_at', { ascending: true })

        if (data) setSubmissions(data)
      }

      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Submissions</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Album entries submitted by your residents for review.
      </p>

      {submissions.length === 0 ? (
        <EmptyState title="No pending submissions" message="Submitted work from your residents will appear here." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {submissions.map((s: any) => (
            <Link key={s.id} href={`/residency/mentor/submissions/${s.id}`}
              className="r-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>
                    {s.resident?.profile?.first_name} {s.resident?.profile?.last_name}
                  </p>
                  <h3 style={{ fontSize: '1rem', margin: 0, marginBottom: '0.25rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                    {s.lesson?.title} &bull; {s.lesson?.strand?.name}
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <StatusBadge status={s.status} />
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                    {s.submitted_at ? new Date(s.submitted_at).toLocaleDateString() : ''}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
