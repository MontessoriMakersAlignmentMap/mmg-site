'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

export default function BundleDetailPage() {
  const params = useParams()
  const cohortId = params.id as string
  const bundleId = params.bundleId as string
  const [bundle, setBundle] = useState<any>(null)
  const [residents, setResidents] = useState<any[]>([])
  const [engagements, setEngagements] = useState<any[]>([])
  const [lessonEngagements, setLessonEngagements] = useState<any[]>([])
  const [albumEntries, setAlbumEntries] = useState<any[]>([])
  const [sessionLog, setSessionLog] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showSessionForm, setShowSessionForm] = useState(false)
  const [sessionForm, setSessionForm] = useState({ session_date: '', attendance_count: '', key_themes: '', followup_actions: '' })
  const [deckSaving, setDeckSaving] = useState(false)
  const [selectedDeckFile, setSelectedDeckFile] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [bundleId])

  async function load() {
    const [bundleRes, residentRes] = await Promise.all([
      fetch(`/api/residency/bundles/${bundleId}`).then(r => r.json()),
      supabase.from('residency_residents').select('id, profile:residency_profiles(first_name, last_name), status').eq('cohort_id', cohortId).in('status', ['active', 'enrolled']),
    ])

    setBundle(bundleRes)
    setResidents(residentRes.data || [])

    const residentIds = residentRes.data?.map((r: any) => r.id) || []
    if (residentIds.length > 0) {
      const [engRes, leRes] = await Promise.all([
        supabase.from('residency_bundle_engagements').select('*').eq('bundle_id', bundleId).in('resident_id', residentIds),
        supabase.from('residency_lesson_engagements').select('*').eq('bundle_id', bundleId).in('resident_id', residentIds),
      ])
      setEngagements(engRes.data || [])
      setLessonEngagements(leRes.data || [])
    }

    // Load album entries for this bundle's week
    if (bundleRes?.album_submission_required) {
      // Album entries don't have bundle_id yet, load by date range
      const { data: albums } = await supabase
        .from('residency_album_entries')
        .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name))')
        .gte('created_at', bundleRes.unlock_date)
        .lte('created_at', bundleRes.lock_date ? bundleRes.lock_date + 'T23:59:59' : new Date().toISOString())
        .in('resident_id', residentIds)
      setAlbumEntries(albums || [])
    }

    // Load session log
    const { data: logs } = await supabase
      .from('residency_live_session_logs')
      .select('*')
      .eq('bundle_id', bundleId)
      .limit(1)
    setSessionLog(logs?.[0] || null)

    setLoading(false)
  }

  async function releaseToAll() {
    await fetch(`/api/residency/bundles/${bundleId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'released' }),
    })
    load()
  }

  async function holdBack() {
    await fetch(`/api/residency/bundles/${bundleId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'scheduled' }),
    })
    load()
  }

  async function sendNudge() {
    const notStarted = residents.filter(r => {
      const eng = engagements.find(e => e.resident_id === r.id)
      return !eng || eng.completion_status === 'not_started'
    })
    if (notStarted.length === 0) { alert('All residents have started this bundle.'); return }

    for (const r of notStarted) {
      await supabase.from('residency_notifications').insert({
        profile_id: r.profile?.id || r.id,
        type: 'nudge',
        title: `Bundle ${bundle.bundle_number} reminder`,
        message: `This week's bundle "${bundle.weekly_theme}" is waiting for you. Open it to get started.`,
      })
    }
    alert(`Nudge sent to ${notStarted.length} residents.`)
  }

  async function saveSessionLog() {
    const payload = {
      bundle_id: bundleId,
      cohort_id: cohortId,
      session_date: sessionForm.session_date,
      attendance_count: parseInt(sessionForm.attendance_count) || 0,
      key_themes: sessionForm.key_themes,
      followup_actions: sessionForm.followup_actions,
    }
    await fetch('/api/residency/live-sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setShowSessionForm(false)
    load()
  }

  const DECK_FILES = [
    'Week-01-Who-Was-Maria-Montessori.html',
    'Week-02-The-Absorbent-Mind-in-Real-Life.html',
    'Week-03-Practical-Life.html',
    'Week-04-Prepared-Environment-as-Justice.html',
    'Week-05-Care-of-Environment.html',
    'Week-06-Grace-and-Courtesy-Anti-Bias.html',
    'Week-07-Cultural-Dimensions-of-Practical-Life.html',
    'Week-08-Fading-as-a-Practice.html',
    'Week-09-Ready-to-Move-On.html',
    'Week-10-Sensorial-in-the-Brain.html',
    'Week-11-The-Mathematical-Mind.html',
    'Week-12-Normalization.html',
    'Week-13-Sensory-Processing.html',
    'Week-14-The-Three-Period-Lesson.html',
  ]

  async function saveDeckUrl(url: string) {
    setDeckSaving(true)
    await fetch(`/api/residency/bundles/${bundleId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deck_url: url || null }),
    })
    setDeckSaving(false)
    load()
  }

  async function removeDeck() {
    if (!confirm('Remove the slide deck from this week?')) return
    await saveDeckUrl('')
  }

  async function saveField(field: string, value: string) {
    setSaving(true)
    await fetch(`/api/residency/bundles/${bundleId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value || null }),
    })
    setSaving(false)
    load()
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>
  if (!bundle) return <p>Bundle not found.</p>

  const lessons = bundle.bundle_lessons?.sort((a: any, b: any) => a.sequence_order - b.sequence_order) || []

  function getResidentStatus(residentId: string) {
    const eng = engagements.find(e => e.resident_id === residentId)
    if (!eng) return { status: 'not_started', label: 'Not Started', color: '#9e9e9e', bg: 'var(--r-muted-light)' }
    if (eng.completion_status === 'complete') return { status: 'complete', label: 'Complete', color: 'var(--r-success)', bg: 'var(--r-success-light)' }
    if (eng.completion_status === 'in_progress') return { status: 'in_progress', label: `${eng.lessons_engaged?.length || 0}/${lessons.length}`, color: 'var(--r-info)', bg: 'var(--r-info-light)' }
    if (eng.completion_status === 'incomplete') return { status: 'incomplete', label: 'Incomplete', color: 'var(--r-feedback-color)', bg: 'var(--r-feedback-bg)' }
    return { status: 'not_started', label: 'Not Started', color: '#9e9e9e', bg: 'var(--r-muted-light)' }
  }

  return (
    <div>
      <Link href={`/residency/admin/cohorts/${cohortId}/calendar`} style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
        &larr; Back to Calendar
      </Link>

      {/* Bundle header */}
      <div className="r-card" style={{ borderLeft: '4px solid var(--r-navy)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>
              Week {bundle.week_number} &middot; {bundle.month}
            </p>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{bundle.weekly_theme}</h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '0.5rem' }}>{bundle.strands_included}</p>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{bundle.practicum_focus}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            {bundle.status === 'scheduled' && (
              <button className="r-btn r-btn-primary" style={{ fontSize: '0.75rem' }} onClick={releaseToAll}>Release to All</button>
            )}
            {bundle.status === 'released' && (
              <button className="r-btn" style={{ fontSize: '0.75rem' }} onClick={holdBack}>Hold Back</button>
            )}
            <button className="r-btn" style={{ fontSize: '0.75rem' }} onClick={sendNudge}>Send Nudge</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
          {bundle.album_submission_required && (
            <span style={{ fontSize: '0.6875rem', background: 'var(--r-info-light)', color: 'var(--r-info)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>Album Submission Due</span>
          )}
          {bundle.live_session_week && (
            <span style={{ fontSize: '0.6875rem', background: '#f3e5f5', color: '#7b1fa2', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>Live Session Week</span>
          )}
          <span style={{ fontSize: '0.6875rem', background: 'var(--r-bg-muted)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
            {new Date(bundle.unlock_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} &ndash; {new Date(bundle.lock_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Slide Deck */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Slide Deck</h2>

        {bundle.deck_url ? (
          <>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', marginBottom: '0.75rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--r-border)' }}>
              <iframe
                src={bundle.deck_url}
                title="Deck Preview"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="fullscreen"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', flex: 1 }}>
                {bundle.deck_url.split('/').pop()}
              </span>
              <button className="r-btn" style={{ fontSize: '0.75rem' }} onClick={removeDeck}>Remove</button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Assign Deck File</label>
              <select
                className="r-input"
                value={selectedDeckFile}
                onChange={e => setSelectedDeckFile(e.target.value)}
              >
                <option value="">Select a deck...</option>
                {DECK_FILES.map(f => (
                  <option key={f} value={`/decks/primary/${f}`}>{f.replace('.html', '').replace(/-/g, ' ')}</option>
                ))}
              </select>
            </div>
            <button
              className="r-btn r-btn-primary"
              style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
              disabled={!selectedDeckFile || deckSaving}
              onClick={() => saveDeckUrl(selectedDeckFile)}
            >
              {deckSaving ? 'Saving...' : 'Assign Deck'}
            </button>
          </div>
        )}
      </div>

      {/* Content Settings */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Content Settings</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Observation Focus Prompt</label>
            <textarea
              className="r-input"
              rows={3}
              defaultValue={bundle.observation_focus || ''}
              placeholder="e.g., Notice how children transition between activities this week..."
              onBlur={e => {
                if (e.target.value !== (bundle.observation_focus || '')) saveField('observation_focus', e.target.value)
              }}
            />
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>Shown to residents as &ldquo;In your classroom this week&rdquo;</p>
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Next Week Theme</label>
            <input
              className="r-input"
              type="text"
              defaultValue={bundle.next_week_theme || ''}
              placeholder="Short preview of next week's focus"
              onBlur={e => {
                if (e.target.value !== (bundle.next_week_theme || '')) saveField('next_week_theme', e.target.value)
              }}
            />
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>Shown at the bottom of this week&rsquo;s bundle page</p>
          </div>
        </div>
        {saving && <p style={{ fontSize: '0.6875rem', color: 'var(--r-info)', marginTop: '0.5rem' }}>Saving...</p>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Lesson list */}
        <div className="r-card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Lessons ({lessons.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {lessons.map((bl: any) => (
              <div key={bl.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.375rem 0.625rem', background: 'var(--r-bg-muted)', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.8125rem' }}>{bl.lesson?.title || 'Unknown'}</span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>{bl.lesson?.strand?.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resident roster */}
        <div className="r-card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Resident Engagement ({residents.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {residents.map((r: any) => {
              const s = getResidentStatus(r.id)
              return (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.375rem 0.625rem', background: s.bg, borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                    {r.profile?.first_name} {r.profile?.last_name}
                  </span>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: s.color }}>{s.label}</span>
                </div>
              )
            })}
            {residents.length === 0 && <p style={{ color: 'var(--r-text-muted)', fontSize: '0.8125rem' }}>No residents enrolled in this cohort.</p>}
          </div>
        </div>
      </div>

      {/* Live session section */}
      {bundle.live_session_week && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Live Session</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)', marginBottom: '1rem' }}>
            Discussion theme: <strong>{bundle.live_session_discussion_theme}</strong>
          </p>

          {sessionLog ? (
            <div style={{ background: 'var(--r-bg-muted)', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>Date</p>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{new Date(sessionLog.session_date + 'T12:00:00').toLocaleDateString()}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>Attendance</p>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{sessionLog.attendance_count} residents</p>
                </div>
              </div>
              {sessionLog.key_themes && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>Key Themes</p>
                  <p style={{ fontSize: '0.8125rem' }}>{sessionLog.key_themes}</p>
                </div>
              )}
              {sessionLog.followup_actions && (
                <div>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>Follow-up Actions</p>
                  <p style={{ fontSize: '0.8125rem' }}>{sessionLog.followup_actions}</p>
                </div>
              )}
            </div>
          ) : showSessionForm ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Session Date</label>
                <input className="r-input" type="date" value={sessionForm.session_date} onChange={e => setSessionForm({ ...sessionForm, session_date: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Attendance Count</label>
                <input className="r-input" type="number" value={sessionForm.attendance_count} onChange={e => setSessionForm({ ...sessionForm, attendance_count: e.target.value })} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Key Themes That Emerged</label>
                <textarea className="r-input" rows={3} value={sessionForm.key_themes} onChange={e => setSessionForm({ ...sessionForm, key_themes: e.target.value })} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Follow-up Actions</label>
                <textarea className="r-input" rows={2} value={sessionForm.followup_actions} onChange={e => setSessionForm({ ...sessionForm, followup_actions: e.target.value })} />
              </div>
              <div>
                <button className="r-btn r-btn-primary" onClick={saveSessionLog}>Save Session Log</button>
                <button className="r-btn" style={{ marginLeft: '0.5rem' }} onClick={() => setShowSessionForm(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className="r-btn" onClick={() => setShowSessionForm(true)}>Log Session</button>
          )}
        </div>
      )}

      {/* Album submissions */}
      {bundle.album_submission_required && (
        <div className="r-card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Album Submissions This Week</h2>
          {bundle.album_prompt && (
            <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
              Prompt: {bundle.album_prompt}
            </p>
          )}
          {albumEntries.length === 0 ? (
            <p style={{ color: 'var(--r-text-muted)', fontSize: '0.8125rem' }}>No submissions yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {albumEntries.map((a: any) => (
                <div key={a.id} style={{ padding: '0.625rem', background: 'var(--r-bg-muted)', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{a.resident?.profile?.first_name} {a.resident?.profile?.last_name}</span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>{new Date(a.created_at).toLocaleDateString()}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>{a.content?.substring(0, 200)}...</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
