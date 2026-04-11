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
          .in('status', ['ai_passed', 'mentor_review', 'complete'])
          .order('updated_at', { ascending: false })

        if (data) setSubmissions(data)
      }

      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  const needsReview = submissions.filter(s => s.status === 'ai_passed')
  const inReview = submissions.filter(s => s.status === 'mentor_review')
  const completed = submissions.filter(s => s.status === 'complete')

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Submissions</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Album entries that have passed AI review and are ready for your feedback.
      </p>

      {submissions.length === 0 ? (
        <EmptyState title="No submissions yet" message="Entries that pass AI review will appear here for your feedback." />
      ) : (
        <>
          {/* Needs mentor review */}
          {needsReview.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1565c0' }}>
                Ready for Review ({needsReview.length})
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {needsReview.map((s: any) => (
                  <SubmissionCard key={s.id} s={s} />
                ))}
              </div>
            </div>
          )}

          {/* In progress */}
          {inReview.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#f57f17' }}>
                Revision Requested ({inReview.length})
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {inReview.map((s: any) => (
                  <SubmissionCard key={s.id} s={s} />
                ))}
              </div>
            </div>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#2e7d32' }}>
                Completed ({completed.length})
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {completed.map((s: any) => (
                  <SubmissionCard key={s.id} s={s} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function SubmissionCard({ s }: { s: any }) {
  return (
    <Link href={`/residency/mentor/submissions/${s.id}`}
      className="r-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>
            {s.resident?.profile?.first_name} {s.resident?.profile?.last_name}
          </p>
          <h3 style={{ fontSize: '1rem', margin: 0, marginBottom: '0.25rem' }}>{s.title}</h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
            {s.lesson?.strand?.name}
            {s.revision_count > 0 && ` \u2022 Revision ${s.revision_count}`}
          </p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <StatusBadge status={s.status} />
          <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
            {s.updated_at ? new Date(s.updated_at).toLocaleDateString() : ''}
          </p>
        </div>
      </div>
    </Link>
  )
}
