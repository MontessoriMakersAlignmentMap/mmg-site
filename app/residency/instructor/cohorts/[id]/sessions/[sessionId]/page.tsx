'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const AI_FIELD_LABELS: Record<string, string> = {
  why_this_lesson_matters: 'Why This Lesson Matters',
  direct_aim: 'Direct Aim',
  indirect_aim: 'Indirect Aim',
  equity_aim: 'Equity Aim',
  materials: 'Materials',
  presentation: 'The Presentation',
  points_of_interest: 'Points of Interest',
  variations: 'Variations and Extensions',
  neurodivergence_notes: 'Neurodivergence and Behavior',
}

export default function SessionDetailPage() {
  const { id: cohortId, sessionId } = useParams<{ id: string; sessionId: string }>()
  const [session, setSession] = useState<any>(null)
  const [cohort, setCohort] = useState<any>(null)
  const [residents, setResidents] = useState<any[]>([])
  const [recentBundles, setRecentBundles] = useState<any[]>([])
  const [fieldPatterns, setFieldPatterns] = useState<any[]>([])
  const [practicumHighlights, setPracticumHighlights] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const [prepNotes, setPrepNotes] = useState('')
  const [attendance, setAttendance] = useState<string[]>([])
  const [keyThemes, setKeyThemes] = useState('')
  const [followUpActions, setFollowUpActions] = useState('')
  const [recordingLink, setRecordingLink] = useState('')

  useEffect(() => {
    async function load() {
      const [sessionRes, cohortRes, residentsRes] = await Promise.all([
        supabase.from('residency_live_sessions').select('*').eq('id', sessionId).single(),
        supabase.from('residency_cohorts').select('*').eq('id', cohortId).single(),
        supabase.from('residency_residents').select('*, profile:residency_profiles(first_name, last_name)').eq('cohort_id', cohortId).in('status', ['enrolled', 'active']).order('created_at'),
      ])

      const s = sessionRes.data
      if (s) {
        setSession(s)
        setPrepNotes(s.preparation_notes || '')
        setAttendance(s.attendance || [])
        setKeyThemes(s.key_themes || '')
        setFollowUpActions(s.follow_up_actions || '')
        setRecordingLink(s.recording_link || '')
      }
      if (cohortRes.data) setCohort(cohortRes.data)
      if (residentsRes.data) setResidents(residentsRes.data)

      // Load recent bundles since last session
      if (cohortRes.data && s) {
        const { data: prevSession } = await supabase
          .from('residency_live_sessions')
          .select('scheduled_date')
          .eq('cohort_id', cohortId)
          .eq('status', 'completed')
          .lt('scheduled_date', s.scheduled_date)
          .order('scheduled_date', { ascending: false })
          .limit(1)
          .maybeSingle()

        const sinceDate = prevSession?.scheduled_date || cohortRes.data.start_date
        const { data: bundles } = await supabase
          .from('residency_bundles')
          .select('*')
          .eq('cohort_id', cohortId)
          .gte('unlock_date', sinceDate)
          .lte('unlock_date', s.scheduled_date)
          .order('week_number')
        if (bundles) setRecentBundles(bundles)

        // AI review patterns since last session
        const residentIds = (residentsRes.data || []).map((r: any) => r.id)
        if (residentIds.length > 0) {
          const { data: entries } = await supabase
            .from('residency_album_entries')
            .select('id')
            .in('resident_id', residentIds)
            .gte('updated_at', sinceDate)

          const entryIds = (entries || []).map((e: any) => e.id)
          if (entryIds.length > 0) {
            const { data: cycles } = await supabase
              .from('residency_ai_review_cycles')
              .select('field_feedback')
              .in('entry_id', entryIds)

            const fieldCounts: Record<string, number> = {}
            for (const cycle of cycles || []) {
              const ff = cycle.field_feedback || {}
              for (const [key, val] of Object.entries(ff) as any) {
                if (val?.verdict === 'needs_revision' || val?.verdict === 'missing') {
                  fieldCounts[key] = (fieldCounts[key] || 0) + 1
                }
              }
            }
            setFieldPatterns(
              Object.entries(fieldCounts)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .map(([key, count]) => ({ key, label: AI_FIELD_LABELS[key] || key, count }))
            )
          }
        }

        // Practicum highlights
        if (residentIds.length > 0) {
          const { data: logs } = await supabase
            .from('residency_practicum_hours')
            .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name))')
            .in('resident_id', residentIds)
            .gte('date', sinceDate)
            .order('date', { ascending: false })
            .limit(10)
          if (logs) setPracticumHighlights(logs)
        }
      }

      setLoading(false)
    }
    load()
  }, [cohortId, sessionId])

  async function saveSession(newStatus?: string) {
    setSaving(true)
    await supabase.from('residency_live_sessions').update({
      preparation_notes: prepNotes || null,
      attendance,
      key_themes: keyThemes || null,
      follow_up_actions: followUpActions || null,
      recording_link: recordingLink || null,
      status: newStatus || session.status,
      updated_at: new Date().toISOString(),
    }).eq('id', sessionId)

    // If completing, notify absent residents
    if (newStatus === 'completed') {
      const absentIds = residents.filter(r => !attendance.includes(r.id)).map(r => r.id)
      if (absentIds.length > 0) {
        try {
          await fetch('/api/residency/notify-absent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cohort_id: cohortId,
              session_id: sessionId,
              absent_resident_ids: absentIds,
              key_themes: keyThemes,
              recording_link: recordingLink,
            }),
          })
        } catch { /* best-effort */ }
      }
    }

    setSession({ ...session, status: newStatus || session.status })
    setSaving(false)
  }

  function toggleAttendance(residentId: string) {
    setAttendance(prev =>
      prev.includes(residentId) ? prev.filter(id => id !== residentId) : [...prev, residentId]
    )
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)', padding: '2rem' }}>Loading...</p>
  if (!session) return <p>Session not found.</p>

  const isScheduled = session.status === 'scheduled'
  const isInProgress = session.status === 'in_progress'
  const isCompleted = session.status === 'completed'

  return (
    <div style={{ maxWidth: '800px' }}>
      <Link href={`/residency/instructor/cohorts/${cohortId}`} style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to {cohort?.name}
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '1.5rem' }}>
          Live Session: {new Date(session.scheduled_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h1>
        <span style={{
          fontSize: '0.625rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '3px',
          textTransform: 'uppercase',
          background: isCompleted ? '#e8f5e9' : isInProgress ? '#fff8e1' : '#e3f2fd',
          color: isCompleted ? '#2e7d32' : isInProgress ? '#f57f17' : '#1565c0',
        }}>
          {session.status}
        </span>
      </div>
      {session.discussion_theme && (
        <p style={{ fontSize: '1.0625rem', color: 'var(--r-navy)', fontWeight: 500, marginBottom: '2rem' }}>
          Theme: {session.discussion_theme}
        </p>
      )}

      {/* PREPARATION PHASE */}
      {(isScheduled || isInProgress) && (
        <>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--r-navy)' }}>Preparation</h2>

          {/* Bundles since last session */}
          {recentBundles.length > 0 && (
            <div className="r-card" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>Bundles Since Last Session</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {recentBundles.map((b: any) => (
                  <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--r-border)' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.8125rem' }}>Week {b.week_number}: </span>
                      <span style={{ fontSize: '0.8125rem' }}>{b.weekly_theme}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>{b.practicum_focus}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Review Patterns */}
          {fieldPatterns.length > 0 && (
            <div className="r-card" style={{ marginBottom: '1rem', borderLeft: '3px solid #f57f17' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>AI Review Patterns (since last session)</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
                Fields most frequently flagged — address these in today's session:
              </p>
              {fieldPatterns.slice(0, 5).map(fp => (
                <div key={fp.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0' }}>
                  <span style={{ fontWeight: 700, color: '#f57f17', width: '1.5rem', textAlign: 'right', fontSize: '0.875rem' }}>{fp.count}</span>
                  <span style={{ fontSize: '0.8125rem' }}>{fp.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Practicum highlights */}
          {practicumHighlights.length > 0 && (
            <div className="r-card" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>Practicum Log Highlights</h3>
              {practicumHighlights.slice(0, 5).map((log: any) => (
                <div key={log.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--r-border)' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)' }}>
                    {log.resident?.profile?.first_name} {log.resident?.profile?.last_name} &middot; {new Date(log.date).toLocaleDateString()}
                  </p>
                  {log.notes && <p style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>{log.notes}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Preparation notes */}
          <div className="r-card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Your Preparation Notes</h3>
            <textarea
              className="r-textarea"
              value={prepNotes}
              onChange={e => setPrepNotes(e.target.value)}
              rows={5}
              placeholder="Notes for today's session — talking points, resident follow-ups, themes to address..."
              style={{ marginBottom: '0.75rem' }}
            />
            <button className="r-btn" onClick={() => saveSession()} disabled={saving} style={{ fontSize: '0.75rem' }}>
              {saving ? 'Saving...' : 'Save Notes'}
            </button>
          </div>
        </>
      )}

      {/* DELIVERY PHASE — Attendance */}
      {(isScheduled || isInProgress) && (
        <>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--r-navy)' }}>
            {isInProgress ? 'Session In Progress' : 'Start Session'}
          </h2>

          <div className="r-card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Attendance ({attendance.length}/{residents.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '1rem' }}>
              {residents.map((r: any) => (
                <label key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.375rem 0' }}>
                  <input
                    type="checkbox"
                    checked={attendance.includes(r.id)}
                    onChange={() => toggleAttendance(r.id)}
                  />
                  <span style={{ fontSize: '0.875rem' }}>{r.profile?.first_name} {r.profile?.last_name}</span>
                </label>
              ))}
            </div>

            {isScheduled && (
              <button className="r-btn r-btn-primary" onClick={() => saveSession('in_progress')} disabled={saving}>
                {saving ? 'Starting...' : 'Begin Session'}
              </button>
            )}
          </div>
        </>
      )}

      {/* POST-SESSION PHASE */}
      {(isInProgress || isCompleted) && (
        <>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--r-navy)' }}>
            {isCompleted ? 'Session Summary' : 'Complete Session'}
          </h2>

          <div className="r-card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Key Themes</label>
              <textarea
                className="r-textarea"
                value={keyThemes}
                onChange={e => setKeyThemes(e.target.value)}
                rows={4}
                placeholder="What emerged in the conversation? What themes resonated?"
                disabled={isCompleted}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Follow-Up Actions</label>
              <textarea
                className="r-textarea"
                value={followUpActions}
                onChange={e => setFollowUpActions(e.target.value)}
                rows={3}
                placeholder="Individual residents who need follow-up, action items..."
                disabled={isCompleted}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>Recording Link (optional)</label>
              <input
                className="r-input"
                value={recordingLink}
                onChange={e => setRecordingLink(e.target.value)}
                placeholder="https://..."
                disabled={isCompleted}
              />
            </div>

            {isCompleted && (
              <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                Attendance: {attendance.length}/{residents.length} &middot; Completed {new Date(session.updated_at).toLocaleDateString()}
              </p>
            )}

            {isInProgress && (
              <button className="r-btn r-btn-primary" onClick={() => saveSession('completed')} disabled={saving}>
                {saving ? 'Completing...' : 'Complete Session'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
