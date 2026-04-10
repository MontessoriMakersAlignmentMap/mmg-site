'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import StatusBadge from '../../../components/StatusBadge'
import ProgressBar from '../../../components/ProgressBar'

export default function MentorResidentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [resident, setResident] = useState<any>(null)
  const [entries, setEntries] = useState<any[]>([])
  const [assignments, setAssignments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: r } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(*)')
        .eq('id', id)
        .single()

      if (r) setResident(r)

      const { data: e } = await supabase
        .from('residency_album_entries')
        .select('*, lesson:residency_lessons(title, strand:residency_strands(name)), feedback:residency_feedback(id)')
        .eq('resident_id', id)
        .order('created_at', { ascending: false })

      if (e) setEntries(e)

      const { data: a } = await supabase
        .from('residency_assignments')
        .select('*, lesson:residency_lessons(title, strand:residency_strands(name))')
        .eq('resident_id', id)
        .order('created_at', { ascending: false })

      if (a) setAssignments(a)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>
  if (!resident) return <p>Resident not found.</p>

  const total = assignments.length
  const completed = assignments.filter((a: any) => a.status === 'completed').length

  return (
    <div>
      <Link href="/residency/mentor/residents" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to My Residents
      </Link>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
          {resident.profile?.first_name} {resident.profile?.last_name}
        </h1>
        <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
          {resident.cohort ?? 'No cohort'} &bull; <StatusBadge status={resident.status} />
        </p>
      </div>

      {/* Progress */}
      {total > 0 && (
        <div className="r-card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Overall Progress</h2>
          <ProgressBar completed={completed} total={total} label={`${completed} of ${total} lessons completed`} />
        </div>
      )}

      {/* Submissions */}
      <div className="r-card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Submitted Work</h2>
        {entries.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No submissions yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {entries.map((e: any) => (
              <Link key={e.id} href={`/residency/mentor/submissions/${e.id}`}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--r-border)', textDecoration: 'none', color: 'inherit' }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: '0.875rem' }}>{e.title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                    {e.lesson?.title} &bull; {e.lesson?.strand?.name}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {e.feedback && e.feedback.length > 0 && (
                    <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>{e.feedback.length} feedback</span>
                  )}
                  <StatusBadge status={e.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
