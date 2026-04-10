'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import StatusBadge from '../components/StatusBadge'
import ProgressBar from '../components/ProgressBar'
import EmptyState from '../components/EmptyState'

export default function PortalDashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [resident, setResident] = useState<any>(null)
  const [assignedLevel, setAssignedLevel] = useState<any>(null)
  const [recentAssignments, setRecentAssignments] = useState<any[]>([])
  const [progress, setProgress] = useState<any[]>([])
  const [unreadFeedback, setUnreadFeedback] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: prof } = await supabase
        .from('residency_profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      if (prof) setProfile(prof)

      const { data: res } = await supabase
        .from('residency_residents')
        .select('*, assigned_level:residency_levels(*)')
        .eq('profile_id', user.id)
        .single()

      if (!res) { setLoading(false); return }
      setResident(res)
      if (res.assigned_level) setAssignedLevel(res.assigned_level)

      // Recent assignments (most recently accessed or created)
      const { data: assignments } = await supabase
        .from('residency_assignments')
        .select('*, lesson:residency_lessons(id, title, strand:residency_strands(name))')
        .eq('resident_id', res.id)
        .order('last_accessed_at', { ascending: false, nullsFirst: false })
        .limit(5)
      if (assignments) setRecentAssignments(assignments)

      // Progress by strand
      const { data: strands } = await supabase
        .from('residency_strands')
        .select('*')
        .order('sort_order')

      const { data: allAssignments } = await supabase
        .from('residency_assignments')
        .select('*, lesson:residency_lessons(strand_id)')
        .eq('resident_id', res.id)

      if (strands && allAssignments) {
        setProgress(strands.map((s: any) => {
          const sa = allAssignments.filter((a: any) => a.lesson?.strand_id === s.id)
          return {
            strand_id: s.id,
            strand_name: s.name,
            total_lessons: sa.length,
            completed: sa.filter((a: any) => a.status === 'completed').length,
            in_progress: sa.filter((a: any) => ['in_progress', 'submitted', 'reviewed'].includes(a.status)).length,
          }
        }))
      }

      // Unread feedback
      const { data: entries } = await supabase
        .from('residency_album_entries')
        .select('id')
        .eq('resident_id', res.id)

      if (entries && entries.length > 0) {
        const entryIds = entries.map((e: any) => e.id)
        const { data: feedback } = await supabase
          .from('residency_feedback')
          .select('*, album_entry:residency_album_entries(title, lesson:residency_lessons(title)), mentor:residency_profiles(first_name, last_name)')
          .in('album_entry_id', entryIds)
          .is('read_at', null)
          .order('created_at', { ascending: false })

        if (feedback) setUnreadFeedback(feedback)
      }

      setLoading(false)
    }
    load()
  }, [])

  async function markFeedbackRead(feedbackId: string) {
    await supabase
      .from('residency_feedback')
      .update({ read_at: new Date().toISOString() })
      .eq('id', feedbackId)

    setUnreadFeedback(prev => prev.filter(f => f.id !== feedbackId))
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)', padding: '2rem' }}>Loading...</p>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
        {profile ? `Welcome back, ${profile.first_name}` : 'Dashboard'}
      </h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Your residency at a glance.
      </p>

      {/* Assigned level badge */}
      {assignedLevel && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'var(--r-gold-light)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid var(--r-gold)',
        }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--r-navy)' }}>
            {assignedLevel.name} Level
          </span>
          {assignedLevel.age_range && (
            <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
              Ages {assignedLevel.age_range}
            </span>
          )}
        </div>
      )}

      {/* Unread feedback alert */}
      {unreadFeedback.length > 0 && (
        <div className="r-card" style={{
          marginBottom: '1.5rem',
          borderLeft: '4px solid var(--r-gold)',
          background: 'var(--r-gold-light)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.125rem', color: 'var(--r-navy)' }}>
              New Mentor Feedback
            </h2>
            <span className="r-badge" style={{
              background: 'var(--r-gold)',
              color: '#fff',
              fontSize: '0.75rem',
            }}>
              {unreadFeedback.length} new
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {unreadFeedback.slice(0, 3).map((fb: any) => (
              <div key={fb.id} style={{
                padding: '0.75rem',
                background: 'var(--r-white)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--r-navy)', marginBottom: '0.125rem' }}>
                    {fb.album_entry?.lesson?.title ?? fb.album_entry?.title}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                    From {fb.mentor?.first_name} {fb.mentor?.last_name} -- {new Date(fb.created_at).toLocaleDateString()}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text)', marginTop: '0.375rem', lineHeight: 1.5 }}>
                    {fb.content.length > 120 ? fb.content.slice(0, 120) + '...' : fb.content}
                  </p>
                </div>
                <button
                  onClick={() => markFeedbackRead(fb.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--r-navy)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Mark read
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress overview */}
      {progress.length > 0 && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Progress by Strand</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {progress.filter(p => p.total_lessons > 0).map(p => (
              <ProgressBar
                key={p.strand_id}
                label={p.strand_name}
                completed={p.completed}
                total={p.total_lessons}
              />
            ))}
            {progress.every(p => p.total_lessons === 0) && (
              <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
                No lessons assigned yet. Your progress will appear here once assignments begin.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Recent lessons */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.125rem' }}>Recent Lessons</h2>
          <Link href="/residency/portal/lessons" style={{ fontSize: '0.8125rem', color: 'var(--r-navy)' }}>
            View all
          </Link>
        </div>

        {recentAssignments.length === 0 ? (
          <EmptyState
            title="No lessons yet"
            message="Assigned lessons will appear here. Your journey begins soon."
          />
        ) : (
          <table className="r-table">
            <thead>
              <tr>
                <th>Lesson</th>
                <th>Strand</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAssignments.map((a: any) => (
                <tr key={a.id}>
                  <td>
                    <Link href={`/residency/curriculum/lesson/${a.lesson_id}`} style={{ color: 'var(--r-navy)', fontWeight: 500, textDecoration: 'none' }}>
                      {a.lesson?.title}
                    </Link>
                  </td>
                  <td style={{ color: 'var(--r-text-muted)' }}>{a.lesson?.strand?.name}</td>
                  <td><StatusBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mentor notes */}
      {resident?.mentor_notes && (
        <div className="r-card" style={{ borderLeft: '3px solid var(--r-gold)' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Note from Your Mentor</h2>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', color: 'var(--r-text)' }}>
            {resident.mentor_notes}
          </p>
        </div>
      )}
    </div>
  )
}
