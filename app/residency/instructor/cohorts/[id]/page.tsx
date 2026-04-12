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

export default function CohortDetailPage() {
  const { id: cohortId } = useParams<{ id: string }>()
  const [cohort, setCohort] = useState<any>(null)
  const [residents, setResidents] = useState<any[]>([])
  const [recentBundles, setRecentBundles] = useState<any[]>([])
  const [fieldPatterns, setFieldPatterns] = useState<any[]>([])
  const [sessions, setSessions] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'pulse' | 'roster' | 'sessions' | 'announcements'>('pulse')

  useEffect(() => {
    async function load() {
      // Load cohort
      const { data: c } = await supabase
        .from('residency_cohorts')
        .select('*')
        .eq('id', cohortId)
        .single()
      if (c) setCohort(c)

      // Load residents with profiles
      const { data: res } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(first_name, last_name, email)')
        .eq('cohort_id', cohortId)
        .in('status', ['enrolled', 'active'])
        .order('created_at')
      if (res) setResidents(res)

      // Load recent 4 bundles
      const now = new Date()
      const startDate = c ? new Date(c.start_date) : now
      const weekNum = Math.max(1, Math.ceil((now.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)))

      const { data: bundles } = await supabase
        .from('residency_bundles')
        .select('*, engagements:residency_bundle_engagements(completion_status, resident_id)')
        .eq('cohort_id', cohortId)
        .lte('week_number', weekNum)
        .order('week_number', { ascending: false })
        .limit(4)
      if (bundles) setRecentBundles(bundles.reverse())

      // AI review patterns — pull all review cycles for this cohort's residents
      const residentIds = (res || []).map((r: any) => r.id)
      if (residentIds.length > 0) {
        const { data: entries } = await supabase
          .from('residency_album_entries')
          .select('id')
          .in('resident_id', residentIds)

        const entryIds = (entries || []).map((e: any) => e.id)
        if (entryIds.length > 0) {
          const { data: cycles } = await supabase
            .from('residency_ai_review_cycles')
            .select('field_feedback')
            .in('entry_id', entryIds)

          // Count flagged fields
          const fieldCounts: Record<string, number> = {}
          for (const cycle of cycles || []) {
            const ff = cycle.field_feedback || {}
            for (const [key, val] of Object.entries(ff) as any) {
              if (val?.verdict === 'needs_revision' || val?.verdict === 'missing') {
                fieldCounts[key] = (fieldCounts[key] || 0) + 1
              }
            }
          }
          const sorted = Object.entries(fieldCounts)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .map(([key, count]) => ({ key, label: AI_FIELD_LABELS[key] || key, count }))
          setFieldPatterns(sorted)
        }
      }

      // Load sessions
      const { data: sess } = await supabase
        .from('residency_live_sessions')
        .select('*')
        .eq('cohort_id', cohortId)
        .order('scheduled_date', { ascending: false })
        .limit(10)
      if (sess) setSessions(sess)

      // Load posts
      const { data: postData } = await supabase
        .from('residency_cohort_posts')
        .select('*, author:residency_profiles(first_name, last_name)')
        .eq('cohort_id', cohortId)
        .is('deleted_at', null)
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(20)
      if (postData) setPosts(postData)

      setLoading(false)
    }
    load()
  }, [cohortId])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>
  if (!cohort) return <p>Cohort not found.</p>

  const now = new Date()
  const weekNum = Math.max(1, Math.ceil((now.getTime() - new Date(cohort.start_date).getTime()) / (7 * 24 * 60 * 60 * 1000)))

  return (
    <div>
      <Link href="/residency/instructor" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{cohort.name}</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', textTransform: 'capitalize' }}>
            {cohort.track} Track &middot; Week {weekNum} &middot; {residents.length} residents
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--r-border)' }}>
        {(['pulse', 'roster', 'sessions', 'announcements'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '0.625rem 1rem', border: 'none', background: 'none', cursor: 'pointer',
            fontSize: '0.8125rem', fontWeight: tab === t ? 600 : 400,
            color: tab === t ? 'var(--r-navy)' : 'var(--r-text-muted)',
            borderBottom: tab === t ? '2px solid var(--r-navy)' : '2px solid transparent',
            marginBottom: '-1px', textTransform: 'capitalize',
          }}>
            {t === 'pulse' ? 'Cohort Pulse' : t === 'roster' ? 'Resident Overview' : t === 'sessions' ? 'Live Sessions' : 'Announcements'}
          </button>
        ))}
      </div>

      {tab === 'pulse' && (
        <PulseTab bundles={recentBundles} fieldPatterns={fieldPatterns} residentCount={residents.length} />
      )}
      {tab === 'roster' && (
        <RosterTab residents={residents} cohortId={cohortId} />
      )}
      {tab === 'sessions' && (
        <SessionsTab sessions={sessions} cohortId={cohortId} weekNum={weekNum} />
      )}
      {tab === 'announcements' && (
        <AnnouncementsTab posts={posts} cohortId={cohortId} />
      )}
    </div>
  )
}

function PulseTab({ bundles, fieldPatterns, residentCount }: { bundles: any[]; fieldPatterns: any[]; residentCount: number }) {
  return (
    <div>
      {/* Recent bundles engagement */}
      <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Recent Bundle Engagement</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(bundles.length, 4)}, 1fr)`, gap: '0.75rem', marginBottom: '2rem' }}>
        {bundles.map((b: any) => {
          const completed = (b.engagements || []).filter((e: any) => e.completion_status === 'complete').length
          const pct = residentCount > 0 ? Math.round((completed / residentCount) * 100) : 0
          return (
            <div key={b.id} className="r-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>Week {b.week_number}</p>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', minHeight: '2.5em', lineHeight: 1.3 }}>{b.weekly_theme}</p>
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto 0.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `conic-gradient(${pct >= 80 ? '#2e7d32' : pct >= 50 ? '#f57f17' : '#e0e0e0'} ${pct}%, #f5f5f5 ${pct}%)`,
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%', background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.875rem', fontWeight: 700,
                }}>
                  {pct}%
                </div>
              </div>
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                {completed}/{residentCount} complete
              </p>
            </div>
          )
        })}
      </div>

      {/* AI Review Patterns */}
      <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>AI Review Patterns</h2>
      {fieldPatterns.length === 0 ? (
        <div className="r-card" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--r-text-muted)' }}>
          No AI review data yet.
        </div>
      ) : (
        <div className="r-card" style={{ padding: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '1rem' }}>
            Fields most frequently flagged as Needs Revision or Missing across all AI reviews:
          </p>
          {fieldPatterns.map((fp, idx) => (
            <div key={fp.key} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0',
              borderBottom: idx < fieldPatterns.length - 1 ? '1px solid var(--r-border)' : 'none',
            }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--r-navy)', width: '2rem', textAlign: 'right' }}>
                {fp.count}
              </span>
              <div style={{ flex: 1, height: '6px', background: '#f5f5f5', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: '3px',
                  width: `${Math.min((fp.count / (fieldPatterns[0]?.count || 1)) * 100, 100)}%`,
                  background: idx === 0 ? '#c62828' : idx < 3 ? '#f57f17' : '#e0e0e0',
                }} />
              </div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 500, minWidth: '160px' }}>{fp.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function RosterTab({ residents, cohortId }: { residents: any[]; cohortId: string }) {
  const [residentStats, setResidentStats] = useState<Record<string, any>>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function loadStats() {
      const stats: Record<string, any> = {}
      for (const r of residents) {
        const [bundleRes, albumRes, practicumRes] = await Promise.all([
          supabase.from('residency_bundle_engagements').select('completion_status').eq('resident_id', r.id),
          supabase.from('residency_album_entries').select('status').eq('resident_id', r.id),
          supabase.from('residency_practicum_hours').select('hours').eq('resident_id', r.id),
        ])

        const completedBundles = (bundleRes.data || []).filter((e: any) => e.completion_status === 'complete').length
        const totalBundles = (bundleRes.data || []).length
        const completedAlbums = (albumRes.data || []).filter((e: any) => e.status === 'complete').length
        const totalAlbums = (albumRes.data || []).length
        const totalHours = (practicumRes.data || []).reduce((sum: number, h: any) => sum + (h.hours || 0), 0)

        stats[r.id] = { completedBundles, totalBundles, completedAlbums, totalAlbums, totalHours }
      }
      setResidentStats(stats)
      setLoaded(true)
    }
    if (residents.length > 0) loadStats()
    else setLoaded(true)
  }, [residents])

  if (!loaded) return <p style={{ color: 'var(--r-text-muted)' }}>Loading roster...</p>

  return (
    <div>
      <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Resident Overview</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--r-border)' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 600, color: 'var(--r-text-muted)' }}>Resident</th>
              <th style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 600, color: 'var(--r-text-muted)' }}>Status</th>
              <th style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 600, color: 'var(--r-text-muted)' }}>Bundles</th>
              <th style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 600, color: 'var(--r-text-muted)' }}>Albums</th>
              <th style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 600, color: 'var(--r-text-muted)' }}>Practicum Hrs</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((r: any) => {
              const s = residentStats[r.id] || {}
              return (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--r-border)' }}>
                  <td style={{ padding: '0.625rem 0.5rem' }}>
                    <span style={{ fontWeight: 500 }}>{r.profile?.first_name} {r.profile?.last_name}</span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '0.625rem 0.5rem' }}>
                    <span style={{
                      fontSize: '0.625rem', fontWeight: 600, padding: '0.125rem 0.5rem', borderRadius: '3px',
                      textTransform: 'uppercase',
                      background: r.status === 'active' ? '#e8f5e9' : '#fef3c7',
                      color: r.status === 'active' ? '#2e7d32' : '#92400e',
                    }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '0.625rem 0.5rem' }}>
                    {s.completedBundles || 0}/{s.totalBundles || 0}
                  </td>
                  <td style={{ textAlign: 'center', padding: '0.625rem 0.5rem' }}>
                    {s.completedAlbums || 0}/{s.totalAlbums || 0}
                  </td>
                  <td style={{ textAlign: 'center', padding: '0.625rem 0.5rem' }}>
                    {s.totalHours || 0}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SessionsTab({ sessions, cohortId, weekNum }: { sessions: any[]; cohortId: string; weekNum: number }) {
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ scheduled_date: '', discussion_theme: '' })
  const [creating, setCreating] = useState(false)

  async function createSession() {
    setCreating(true)
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('residency_live_sessions').insert({
      cohort_id: cohortId,
      instructor_id: user?.id,
      scheduled_date: form.scheduled_date,
      discussion_theme: form.discussion_theme,
      status: 'scheduled',
    })
    setForm({ scheduled_date: '', discussion_theme: '' })
    setShowCreate(false)
    setCreating(false)
    window.location.reload()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.125rem' }}>Live Sessions</h2>
        <button className="r-btn r-btn-primary" style={{ fontSize: '0.75rem' }} onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? 'Cancel' : '+ Schedule Session'}
        </button>
      </div>

      {showCreate && (
        <div className="r-card" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Date</label>
              <input type="date" className="r-input" value={form.scheduled_date} onChange={e => setForm({ ...form, scheduled_date: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Discussion Theme</label>
              <input className="r-input" value={form.discussion_theme} onChange={e => setForm({ ...form, discussion_theme: e.target.value })} placeholder="e.g. Observation and Documentation" />
            </div>
          </div>
          <button className="r-btn r-btn-primary" onClick={createSession} disabled={creating || !form.scheduled_date}>
            {creating ? 'Creating...' : 'Schedule Session'}
          </button>
        </div>
      )}

      {sessions.length === 0 ? (
        <div className="r-card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--r-text-muted)' }}>
          No sessions scheduled yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sessions.map((s: any) => (
            <Link key={s.id} href={`/residency/instructor/cohorts/${cohortId}/sessions/${s.id}`}
              className="r-card" style={{ textDecoration: 'none', color: 'inherit', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                    {new Date(s.scheduled_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  {s.discussion_theme && (
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>{s.discussion_theme}</p>
                  )}
                </div>
                <span style={{
                  fontSize: '0.625rem', fontWeight: 600, padding: '0.125rem 0.5rem', borderRadius: '3px',
                  textTransform: 'uppercase',
                  background: s.status === 'completed' ? '#e8f5e9' : s.status === 'scheduled' ? '#e3f2fd' : '#fef3c7',
                  color: s.status === 'completed' ? '#2e7d32' : s.status === 'scheduled' ? '#1565c0' : '#92400e',
                }}>
                  {s.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function AnnouncementsTab({ posts, cohortId }: { posts: any[]; cohortId: string }) {
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ title: '', body: '', post_type: 'announcement' as string })
  const [creating, setCreating] = useState(false)

  async function createPost() {
    setCreating(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: profile } = await supabase.from('residency_profiles').select('role').eq('id', user.id).single()

    await supabase.from('residency_cohort_posts').insert({
      cohort_id: cohortId,
      author_id: user.id,
      author_role: profile?.role || 'instructor',
      post_type: form.post_type,
      title: form.title,
      body: form.body,
    })

    // Send email notification to cohort residents
    try {
      await fetch('/api/residency/notify-cohort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cohort_id: cohortId,
          subject: `New ${form.post_type}: ${form.title}`,
          body: form.body,
        }),
      })
    } catch { /* notification is best-effort */ }

    setForm({ title: '', body: '', post_type: 'announcement' })
    setShowCreate(false)
    setCreating(false)
    window.location.reload()
  }

  async function togglePin(postId: string, pinned: boolean) {
    await supabase.from('residency_cohort_posts').update({ pinned: !pinned }).eq('id', postId)
    window.location.reload()
  }

  async function resolvePost(postId: string) {
    await supabase.from('residency_cohort_posts').update({ resolved: true }).eq('id', postId)
    window.location.reload()
  }

  async function deletePost(postId: string) {
    await supabase.from('residency_cohort_posts').update({ deleted_at: new Date().toISOString() }).eq('id', postId)
    window.location.reload()
  }

  const announcements = posts.filter(p => p.post_type === 'announcement')
  const questions = posts.filter(p => p.post_type === 'question' && !p.resolved)
  const resolved = posts.filter(p => p.post_type === 'question' && p.resolved)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.125rem' }}>Announcements & Questions</h2>
        <button className="r-btn r-btn-primary" style={{ fontSize: '0.75rem' }} onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? 'Cancel' : '+ New Post'}
        </button>
      </div>

      {showCreate && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Title</label>
              <input className="r-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Type</label>
              <select className="r-input" value={form.post_type} onChange={e => setForm({ ...form, post_type: e.target.value })}>
                <option value="announcement">Announcement</option>
                <option value="question">Question</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Body</label>
            <textarea className="r-textarea" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} rows={4} />
          </div>
          <button className="r-btn r-btn-primary" onClick={createPost} disabled={creating || !form.title || !form.body}>
            {creating ? 'Posting...' : 'Post'}
          </button>
        </div>
      )}

      {/* Announcements */}
      {announcements.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
            Announcements ({announcements.length})
          </h3>
          {announcements.map((p: any) => (
            <PostCard key={p.id} post={p} onPin={() => togglePin(p.id, p.pinned)} onDelete={() => deletePost(p.id)} isInstructor />
          ))}
        </div>
      )}

      {/* Open questions */}
      {questions.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
            Open Questions ({questions.length})
          </h3>
          {questions.map((p: any) => (
            <PostCard key={p.id} post={p} onPin={() => togglePin(p.id, p.pinned)} onResolve={() => resolvePost(p.id)} onDelete={() => deletePost(p.id)} isInstructor />
          ))}
        </div>
      )}

      {/* Resolved */}
      {resolved.length > 0 && (
        <div>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
            Resolved ({resolved.length})
          </h3>
          {resolved.map((p: any) => (
            <PostCard key={p.id} post={p} onDelete={() => deletePost(p.id)} isInstructor />
          ))}
        </div>
      )}

      {posts.length === 0 && (
        <div className="r-card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--r-text-muted)' }}>
          No posts yet. Start the conversation with an announcement.
        </div>
      )}
    </div>
  )
}

function PostCard({ post, onPin, onResolve, onDelete, isInstructor }: {
  post: any; onPin?: () => void; onResolve?: () => void; onDelete?: () => void; isInstructor?: boolean
}) {
  return (
    <div className="r-card" style={{
      marginBottom: '0.75rem', borderLeft: post.pinned ? '3px solid var(--r-gold)' : undefined,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div>
          {post.pinned && <span style={{ fontSize: '0.5625rem', fontWeight: 600, color: 'var(--r-gold)', textTransform: 'uppercase', marginRight: '0.5rem' }}>Pinned</span>}
          <h3 style={{ fontSize: '1rem', margin: 0, display: 'inline' }}>{post.title}</h3>
        </div>
        <span style={{ fontSize: '0.625rem', color: 'var(--r-text-muted)', flexShrink: 0, marginLeft: '1rem' }}>
          {new Date(post.created_at).toLocaleDateString()}
        </span>
      </div>
      <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '0.5rem' }}>
        {post.author?.first_name} {post.author?.last_name} &middot; {post.author_role}
      </p>
      <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{post.body}</p>

      {isInstructor && (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--r-border)' }}>
          {onPin && (
            <button onClick={onPin} style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
              {post.pinned ? 'Unpin' : 'Pin'}
            </button>
          )}
          {onResolve && (
            <button onClick={onResolve} style={{ fontSize: '0.6875rem', color: '#2e7d32', background: 'none', border: 'none', cursor: 'pointer' }}>
              Mark Answered
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} style={{ fontSize: '0.6875rem', color: '#c62828', background: 'none', border: 'none', cursor: 'pointer' }}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}
