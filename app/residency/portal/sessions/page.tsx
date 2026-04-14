'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

export default function PortalSessionsPage() {
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: resident } = await supabase
        .from('residency_residents')
        .select('cohort_id')
        .eq('profile_id', user.id)
        .single()

      if (resident?.cohort_id) {
        const { data } = await supabase
          .from('residency_live_sessions')
          .select('id, scheduled_date, discussion_theme, key_themes, recording_link, status, session_type')
          .eq('cohort_id', resident.cohort_id)
          .eq('status', 'completed')
          .order('scheduled_date', { ascending: false })

        if (data) setSessions(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Live Sessions</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Summaries and recordings from past live sessions.
      </p>

      {sessions.length === 0 ? (
        <EmptyState title="No sessions yet" message="Past live session summaries will appear here." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sessions.map(s => (
            <div key={s.id} className="r-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h2 style={{ fontSize: '1.0625rem', fontWeight: 600, margin: 0 }}>
                  {new Date(s.scheduled_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </h2>
                {s.recording_link && (
                  <a href={s.recording_link} target="_blank" rel="noopener noreferrer"
                    className="r-btn" style={{ fontSize: '0.75rem', textDecoration: 'none' }}>
                    Watch Recording
                  </a>
                )}
              </div>

              {s.session_type && (
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.625rem', fontWeight: 700, padding: '0.125rem 0.5rem', borderRadius: '3px',
                  background: s.session_type === 'curriculum_integration' ? '#e3f2fd' : '#f3e5f5',
                  color: s.session_type === 'curriculum_integration' ? '#1565c0' : '#7b1fa2',
                  marginBottom: '0.5rem',
                }}>
                  {s.session_type === 'curriculum_integration' ? 'Session A — Curriculum Integration' : 'Session B — Practicum & Community'}
                </span>
              )}

              {s.discussion_theme && (
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--r-navy)', marginBottom: '0.75rem' }}>
                  Theme: {s.discussion_theme}
                </p>
              )}

              {s.key_themes && (
                <div style={{ background: 'var(--r-bg-muted)', borderRadius: '8px', padding: '1rem' }}>
                  <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--r-text-muted)' }}>Key Themes</h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{s.key_themes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
