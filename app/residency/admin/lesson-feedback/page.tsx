'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

export default function AdminLessonFeedbackPage() {
  const [feedback, setFeedback] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase
      .from('residency_lesson_feedback')
      .select('*, lesson:residency_lessons(title), resident:residency_residents(profile:residency_profiles(first_name, last_name))')
      .is('deleted_at', null)
      .order('submitted_at', { ascending: false })
    setFeedback(data || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string, adminNotes?: string) {
    await fetch('/api/residency/lesson-feedback', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, admin_notes: adminNotes }),
    })
    await load()
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const filtered = filter === 'all' ? feedback : feedback.filter(f => f.status === filter)
  const counts = {
    all: feedback.length,
    new: feedback.filter(f => f.status === 'new').length,
    reviewed: feedback.filter(f => f.status === 'reviewed').length,
    resolved: feedback.filter(f => f.status === 'resolved').length,
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Lesson Feedback</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        {counts.new} new &middot; Continuous improvement evidence for MACTE
      </p>

      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--r-border)' }}>
        {(['all', 'new', 'reviewed', 'resolved'] as const).map(tab => (
          <button key={tab} onClick={() => setFilter(tab)}
            style={{
              background: 'none', border: 'none',
              borderBottom: filter === tab ? '2px solid var(--r-navy)' : '2px solid transparent',
              padding: '0.5rem 1rem', fontSize: '0.8125rem',
              fontWeight: filter === tab ? 600 : 400,
              color: filter === tab ? 'var(--r-navy)' : 'var(--r-text-muted)',
              cursor: 'pointer', textTransform: 'capitalize',
            }}>
            {tab} ({counts[tab as keyof typeof counts]})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No feedback" message="Lesson feedback from residents will appear here." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {filtered.map(f => (
            <div key={f.id} className="r-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.125rem' }}>
                    {(f.lesson as any)?.title || 'Unknown Lesson'}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                    {(f.resident as any)?.profile?.first_name} {(f.resident as any)?.profile?.last_name} &middot; {new Date(f.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                <span style={{
                  fontSize: '0.625rem', fontWeight: 600, textTransform: 'uppercase',
                  padding: '0.25rem 0.5rem', borderRadius: '4px',
                  color: f.status === 'new' ? '#b45309' : f.status === 'reviewed' ? '#0E1A7A' : '#2d6a4f',
                  background: f.status === 'new' ? 'var(--r-warning-light)' : f.status === 'reviewed' ? '#e8e9f5' : 'var(--r-success-light)',
                }}>
                  {f.status}
                </span>
              </div>

              <div style={{
                fontSize: '0.8125rem', padding: '0.5rem 0.75rem', background: 'var(--r-bg-muted, #f5f5f0)',
                borderRadius: '6px', marginBottom: '0.5rem',
              }}>
                <strong>{f.flag_type}</strong>
                {f.notes && <p style={{ marginTop: '0.25rem', lineHeight: 1.6 }}>{f.notes}</p>}
              </div>

              {f.admin_notes && (
                <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', fontStyle: 'italic' }}>
                  Admin: {f.admin_notes}
                </p>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                {f.status === 'new' && (
                  <button onClick={() => updateStatus(f.id, 'reviewed')}
                    style={{ fontSize: '0.6875rem', color: 'var(--r-navy)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                    Mark Reviewed
                  </button>
                )}
                {f.status !== 'resolved' && (
                  <button onClick={() => updateStatus(f.id, 'resolved')}
                    style={{ fontSize: '0.6875rem', color: 'var(--r-success)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
