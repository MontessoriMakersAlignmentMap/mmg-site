'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

interface VirtualObservation {
  id: string
  observation_date: string
  recording_duration_minutes: number
  review_status: string
  context_note: string
  resident: { first_name: string; last_name: string }
}

export default function MentorVirtualObservationsPage() {
  const [observations, setObservations] = useState<VirtualObservation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: residents } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('mentor_id', user.id)

      if (!residents?.length) { setLoading(false); return }

      const residentIds = residents.map(r => r.id)

      const { data } = await supabase
        .from('residency_virtual_observations')
        .select('id, observation_date, recording_duration_minutes, review_status, context_note, resident_id')
        .in('resident_id', residentIds)
        .order('created_at', { ascending: false })

      if (data) {
        const { data: profiles } = await supabase
          .from('residency_residents')
          .select('id, profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name)')
          .in('id', residentIds)

        const profileMap: Record<string, { first_name: string; last_name: string }> = {}
        profiles?.forEach((r: any) => {
          profileMap[r.id] = r.profile
        })

        setObservations(data.map((o: any) => ({
          ...o,
          resident: profileMap[o.resident_id] || { first_name: 'Unknown', last_name: '' },
        })))
      }
      setLoading(false)
    }
    load()
  }, [])

  const pending = observations.filter(o => o.review_status === 'pending_review')
  const inProgress = observations.filter(o => o.review_status === 'in_progress')
  const completed = observations.filter(o => o.review_status === 'feedback_submitted')

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <Link href="/residency/mentor" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Dashboard
      </Link>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Virtual Observations</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Review classroom recordings submitted by your residents. Watch the recording, complete the rubric, and provide written feedback.
      </p>

      {pending.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--r-navy)' }}>
            Awaiting Your Review ({pending.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {pending.map(obs => (
              <Link key={obs.id} href={`/residency/mentor/virtual-observations/${obs.id}`} className="r-card" style={{
                padding: '1.25rem', textDecoration: 'none', color: 'inherit',
                borderLeft: '4px solid var(--r-gold)', display: 'block',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                      {obs.resident.first_name} {obs.resident.last_name}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                      {new Date(obs.observation_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      {' · '}{obs.recording_duration_minutes} min
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.6875rem', padding: '0.25rem 0.625rem', borderRadius: '9999px',
                    background: '#FEF3C7', color: '#92400E', fontWeight: 600,
                  }}>
                    Needs Review
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {inProgress.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>In Progress ({inProgress.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {inProgress.map(obs => (
              <Link key={obs.id} href={`/residency/mentor/virtual-observations/${obs.id}`} className="r-card" style={{
                padding: '1.25rem', textDecoration: 'none', color: 'inherit', display: 'block',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                      {obs.resident.first_name} {obs.resident.last_name}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                      {new Date(obs.observation_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.6875rem', padding: '0.25rem 0.625rem', borderRadius: '9999px',
                    background: 'var(--r-border)', color: 'var(--r-text-muted)', fontWeight: 600,
                  }}>
                    In Progress
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Completed ({completed.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {completed.map(obs => (
              <Link key={obs.id} href={`/residency/mentor/virtual-observations/${obs.id}`} className="r-card" style={{
                padding: '1.25rem', textDecoration: 'none', color: 'inherit', display: 'block',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                      {obs.resident.first_name} {obs.resident.last_name}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                      {new Date(obs.observation_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.6875rem', padding: '0.25rem 0.625rem', borderRadius: '9999px',
                    background: 'var(--r-success-light)', color: 'var(--r-success)', fontWeight: 600,
                  }}>
                    Complete
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {observations.length === 0 && (
        <div className="r-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            No virtual observations have been submitted yet.
          </p>
        </div>
      )}
    </div>
  )
}
