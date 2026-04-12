'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function InstructorSessionsPage() {
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('residency_live_sessions')
        .select('*, cohort:residency_cohorts(id, name)')
        .eq('instructor_id', user.id)
        .order('scheduled_date', { ascending: false })
        .limit(50)

      if (data) setSessions(data)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  const upcoming = sessions.filter(s => s.status === 'scheduled' || s.status === 'in_progress')
  const past = sessions.filter(s => s.status === 'completed' || s.status === 'cancelled')

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Live Sessions</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        All sessions across your cohorts.
      </p>

      {upcoming.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1565c0' }}>
            Upcoming ({upcoming.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {upcoming.map(s => (
              <Link key={s.id} href={`/residency/instructor/cohorts/${s.cohort?.id}/sessions/${s.id}`}
                className="r-card" style={{ textDecoration: 'none', color: 'inherit', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                      {new Date(s.scheduled_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                      {s.cohort?.name}{s.discussion_theme && ` \u2022 ${s.discussion_theme}`}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.625rem', fontWeight: 600, padding: '0.125rem 0.5rem', borderRadius: '3px',
                    textTransform: 'uppercase',
                    background: s.status === 'in_progress' ? '#fff8e1' : '#e3f2fd',
                    color: s.status === 'in_progress' ? '#f57f17' : '#1565c0',
                  }}>
                    {s.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--r-text-muted)' }}>
            Past Sessions ({past.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {past.map(s => (
              <Link key={s.id} href={`/residency/instructor/cohorts/${s.cohort?.id}/sessions/${s.id}`}
                className="r-card" style={{ textDecoration: 'none', color: 'inherit', padding: '0.875rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem' }}>
                      {new Date(s.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>{s.cohort?.name}</p>
                  </div>
                  <span style={{ fontSize: '0.625rem', fontWeight: 600, color: '#2e7d32' }}>COMPLETED</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {sessions.length === 0 && (
        <div className="r-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--r-text-muted)' }}>
          No sessions yet. Schedule sessions from a cohort detail page.
        </div>
      )}
    </div>
  )
}
