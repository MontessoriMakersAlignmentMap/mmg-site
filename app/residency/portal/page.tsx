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
  const [bundles, setBundles] = useState<any[]>([])
  const [bundleEngagements, setBundleEngagements] = useState<any[]>([])
  const [lessonEngagements, setLessonEngagements] = useState<any[]>([])
  const [recentAssignments, setRecentAssignments] = useState<any[]>([])
  const [progress, setProgress] = useState<any[]>([])
  const [unreadFeedback, setUnreadFeedback] = useState<any[]>([])
  const [observationPrompt, setObservationPrompt] = useState<any>(null)
  const [observationLog, setObservationLog] = useState<any>(null)
  const [intensives, setIntensives] = useState<any[]>([])
  const [registeredIntensives, setRegisteredIntensives] = useState<Set<string>>(new Set())
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

      // Load bundles for this resident's cohort
      if (res.cohort_id) {
        const { data: bdles } = await supabase
          .from('residency_bundles')
          .select(`*, bundle_lessons:residency_bundle_lessons(id, lesson_id, sequence_order, lesson:residency_lessons(id, title, slug, strand:residency_strands(name)))`)
          .eq('cohort_id', res.cohort_id)
          .in('status', ['released', 'completed', 'scheduled'])
          .is('deleted_at', null)
          .order('bundle_number')

        setBundles(bdles || [])

        // Load this resident's bundle engagements
        const { data: be } = await supabase
          .from('residency_bundle_engagements')
          .select('*')
          .eq('resident_id', res.id)

        setBundleEngagements(be || [])

        // Load lesson engagements
        const { data: le } = await supabase
          .from('residency_lesson_engagements')
          .select('*')
          .eq('resident_id', res.id)

        setLessonEngagements(le || [])
      }

      // Recent assignments
      const { data: assignments } = await supabase
        .from('residency_assignments')
        .select('*, lesson:residency_lessons(id, title, strand:residency_strands(name))')
        .eq('resident_id', res.id)
        .order('last_accessed_at', { ascending: false, nullsFirst: false })
        .limit(5)
      if (assignments) setRecentAssignments(assignments)

      // Progress by strand
      const { data: strands } = await supabase.from('residency_strands').select('*').order('sort_order')
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
          }
        }))
      }

      // Load observation data
      const currentMonth = new Date().getMonth() + 1
      const track = res.assigned_level?.name?.toLowerCase() === 'elementary' ? 'elementary' : 'primary'

      const { data: obsPrompt } = await supabase
        .from('residency_observation_prompts')
        .select('*')
        .eq('track', track)
        .eq('month_number', currentMonth)
        .single()
      if (obsPrompt) setObservationPrompt(obsPrompt)

      const { data: obsLog } = await supabase
        .from('residency_observation_logs')
        .select('*')
        .eq('resident_id', res.id)
        .eq('month_number', currentMonth)
        .maybeSingle()
      if (obsLog) setObservationLog(obsLog)

      // Upcoming intensives for this resident's level
      const resLevel = res.assigned_level?.name?.toLowerCase() || 'primary'
      const { data: intData } = await supabase
        .from('residency_intensives')
        .select('*')
        .eq('level', resLevel)
        .eq('status', 'upcoming')
        .gte('registration_deadline', new Date().toISOString().split('T')[0])
        .order('start_date')

      if (intData && intData.length > 0) {
        setIntensives(intData)
        const { data: myRegs } = await supabase
          .from('residency_intensive_registrations')
          .select('intensive_id')
          .eq('resident_id', res.id)
        if (myRegs) setRegisteredIntensives(new Set(myRegs.map((r: any) => r.intensive_id)))
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
    await supabase.from('residency_feedback').update({ read_at: new Date().toISOString() }).eq('id', feedbackId)
    setUnreadFeedback(prev => prev.filter(f => f.id !== feedbackId))
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)', padding: '2rem' }}>Loading...</p>

  // Find current, recent, and upcoming bundles
  const today = new Date().toISOString().split('T')[0]
  const releasedBundles = bundles.filter(b => b.status === 'released' || (b.status === 'scheduled' && b.unlock_date <= today))
  const currentBundle = releasedBundles.find(b => b.unlock_date <= today && (!b.lock_date || b.lock_date >= today))
    || releasedBundles[releasedBundles.length - 1]
  const completedBundles = releasedBundles.filter(b => {
    const eng = bundleEngagements.find(e => e.bundle_id === b.id)
    return eng?.completion_status === 'complete' || (b.lock_date && b.lock_date < today)
  }).slice(-2)
  const nextBundle = bundles.find(b => b.unlock_date > today && b.status === 'scheduled')

  function getBundleProgress(bundleId: string, bundleLessons: any[]) {
    const eng = bundleEngagements.find(e => e.bundle_id === bundleId)
    const engaged = eng?.lessons_engaged?.length || 0
    const total = bundleLessons?.length || 0
    return { engaged, total, complete: eng?.completion_status === 'complete' }
  }

  function isLessonEngaged(lessonId: string) {
    return lessonEngagements.some(le => le.lesson_id === lessonId && le.engaged)
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
        {profile ? `Welcome back, ${profile.first_name}` : 'Dashboard'}
      </h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Your residency at a glance.
      </p>

      {/* ═══ Current week's bundle — the primary element ═══ */}
      {currentBundle && (
        <div style={{
          background: 'linear-gradient(135deg, var(--r-navy) 0%, #1a365d 100%)',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '1.5rem',
          color: 'white',
        }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '0.5rem' }}>
            This Week &middot; Week {currentBundle.week_number}
          </p>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem' }}>
            {currentBundle.weekly_theme}
          </h2>
          <p style={{ fontSize: '0.9375rem', opacity: 0.85, lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: '600px' }}>
            {currentBundle.practicum_focus}
          </p>

          {/* Progress indicator */}
          {(() => {
            const { engaged, total, complete } = getBundleProgress(currentBundle.id, currentBundle.bundle_lessons)
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1, maxWidth: '300px' }}>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${total > 0 ? (engaged / total) * 100 : 0}%`, background: complete ? '#66bb6a' : '#ffd54f', borderRadius: '3px', transition: 'width 0.3s' }} />
                  </div>
                </div>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, opacity: 0.9 }}>
                  {complete ? 'Complete' : `${engaged} of ${total} lessons`}
                </span>
              </div>
            )
          })()}

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {currentBundle.album_submission_required && (
              <Link href="/residency/portal/albums" style={{
                fontSize: '0.8125rem', fontWeight: 600, background: '#ffd54f', color: 'var(--r-navy)',
                padding: '0.5rem 1rem', borderRadius: '6px', textDecoration: 'none',
              }}>
                Album Submission Due
              </Link>
            )}
            {currentBundle.live_session_week && (
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, background: 'rgba(255,255,255,0.15)', padding: '0.5rem 1rem', borderRadius: '6px' }}>
                Live Session This Week
              </span>
            )}
            <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>
              {currentBundle.strands_included} &middot; {currentBundle.bundle_lessons?.length || 0} lessons
            </span>
          </div>

          {/* Lesson list within bundle */}
          <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {currentBundle.bundle_lessons?.sort((a: any, b: any) => a.sequence_order - b.sequence_order).map((bl: any) => {
              const engaged = isLessonEngaged(bl.lesson_id)
              return (
                <Link
                  key={bl.id}
                  href={`/residency/portal/bundles/${currentBundle.id}/lessons/${bl.lesson_id}`}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.5rem 0.75rem', background: engaged ? 'rgba(102,187,106,0.15)' : 'rgba(255,255,255,0.08)',
                    borderRadius: '6px', textDecoration: 'none', color: 'white', fontSize: '0.8125rem',
                  }}
                >
                  <span>{bl.lesson?.title?.replace(/^(Primary|Elementary): \w+: /, '')}</span>
                  <span style={{ fontSize: '0.6875rem', opacity: 0.6 }}>
                    {engaged ? '\u2713' : bl.lesson?.strand?.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Live session banner */}
      {currentBundle?.live_session_week && currentBundle.live_session_discussion_theme && (
        <div style={{
          background: '#f3e5f5',
          borderLeft: '4px solid #7b1fa2',
          borderRadius: '8px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
        }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7b1fa2', marginBottom: '0.25rem' }}>
            Live Session This Month
          </p>
          <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#4a148c' }}>
            {currentBundle.live_session_discussion_theme}
          </p>
        </div>
      )}

      {/* Recent completed bundles + upcoming preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        {completedBundles.map(b => {
          const { engaged, total } = getBundleProgress(b.id, b.bundle_lessons)
          return (
            <div key={b.id} className="r-card" style={{ opacity: 0.8 }}>
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>Week {b.week_number}</p>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.375rem', lineHeight: 1.3 }}>{b.weekly_theme}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                <span>{engaged}/{total} lessons</span>
                <span style={{ color: engaged >= total ? 'var(--r-success)' : 'var(--r-feedback-color)', fontWeight: 600 }}>
                  {engaged >= total ? 'Complete' : 'Incomplete'}
                </span>
              </div>
            </div>
          )
        })}
        {nextBundle && (
          <div className="r-card" style={{ borderStyle: 'dashed', borderColor: 'var(--r-border)', opacity: 0.7 }}>
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>
              Coming Week {nextBundle.week_number} &middot; {new Date(nextBundle.unlock_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.375rem', lineHeight: 1.3 }}>{nextBundle.weekly_theme}</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>{nextBundle.practicum_focus?.substring(0, 100)}...</p>
          </div>
        )}
      </div>

      {/* Album prompt for current bundle */}
      {currentBundle?.album_submission_required && currentBundle.album_prompt && (
        <div className="r-card" style={{ borderLeft: '4px solid var(--r-info)', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>This Week&apos;s Album Prompt</h2>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--r-text)', marginBottom: '0.75rem' }}>
            {currentBundle.album_prompt}
          </p>
          <Link href="/residency/portal/albums" className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem', textDecoration: 'none' }}>
            Write Your Submission
          </Link>
        </div>
      )}

      {/* Monthly observation visit */}
      {observationPrompt && (
        <div style={{
          background: '#f5e8cc',
          borderLeft: '4px solid var(--r-navy)',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem',
        }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--r-navy)', marginBottom: '0.25rem' }}>
            Monthly Observation Visit
          </p>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--r-navy)', marginBottom: '0.5rem' }}>
            {new Date().toLocaleDateString('en-US', { month: 'long' })} {new Date().getFullYear()}
          </h2>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--r-text)', marginBottom: '1rem' }}>
            {observationPrompt.curriculum_connection}
          </p>
          {observationLog ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.75rem',
                background: 'var(--r-success-light)', color: 'var(--r-success)',
                borderRadius: '9999px',
              }}>
                Complete
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                {new Date(observationLog.observation_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <Link href={`/residency/portal/observations/${observationLog.id}`} style={{
                fontSize: '0.8125rem', fontWeight: 600, color: 'var(--r-navy)', textDecoration: 'none',
              }}>
                View Entry &rarr;
              </Link>
            </div>
          ) : (
            <Link href={`/residency/portal/observations/new?month=${new Date().getMonth() + 1}`} className="r-btn r-btn-primary" style={{
              fontSize: '0.8125rem', textDecoration: 'none', display: 'inline-block',
            }}>
              Log This Month&apos;s Observation
            </Link>
          )}
        </div>
      )}

      {/* Upcoming Intensives */}
      {intensives.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          {intensives.map(i => {
            const isRegistered = registeredIntensives.has(i.id)
            return (
              <div key={i.id} style={{
                background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
                borderRadius: '12px',
                padding: '1.75rem 2rem',
                color: 'white',
                marginBottom: '0.75rem',
              }}>
                <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '0.5rem' }}>
                  Upcoming Intensive
                </p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.75rem' }}>
                  {i.name}
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.875rem', opacity: 0.9, marginBottom: '1rem' }}>
                  <span>{new Date(i.start_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} – {new Date(i.end_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>{i.location_name}</span>
                  {i.cost_cents > 0 && <span>${(i.cost_cents / 100).toFixed(0)}</span>}
                </div>
                {i.description && (
                  <p style={{ fontSize: '0.8125rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '1rem', maxWidth: '600px' }}>
                    {i.description.length > 200 ? i.description.substring(0, 200) + '...' : i.description}
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {isRegistered ? (
                    <span style={{
                      fontSize: '0.8125rem', fontWeight: 600, background: 'rgba(102,187,106,0.3)',
                      padding: '0.5rem 1rem', borderRadius: '6px',
                    }}>
                      You&apos;re Registered
                    </span>
                  ) : (
                    <button
                      onClick={async () => {
                        if (!resident) return
                        const { error } = await supabase.from('residency_intensive_registrations').insert({
                          intensive_id: i.id,
                          resident_id: resident.id,
                        })
                        if (!error) {
                          setRegisteredIntensives(prev => new Set([...prev, i.id]))
                        }
                      }}
                      style={{
                        fontSize: '0.8125rem', fontWeight: 600, background: '#ffd54f', color: '#1a237e',
                        padding: '0.5rem 1.25rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                      }}
                    >
                      Register Now
                    </button>
                  )}
                  <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                    Registration closes {new Date(i.registration_deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Unread feedback alert */}
      {unreadFeedback.length > 0 && (
        <div className="r-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--r-gold)', background: 'var(--r-gold-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.125rem', color: 'var(--r-navy)' }}>New Mentor Feedback</h2>
            <span className="r-badge" style={{ background: 'var(--r-gold)', color: 'var(--r-white)', fontSize: '0.75rem' }}>
              {unreadFeedback.length} new
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {unreadFeedback.slice(0, 3).map((fb: any) => (
              <div key={fb.id} style={{ padding: '0.75rem', background: 'var(--r-white)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
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
                <button onClick={() => markFeedbackRead(fb.id)} style={{ background: 'none', border: 'none', color: 'var(--r-navy)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Mark read
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress by strand */}
      {progress.length > 0 && progress.some(p => p.total_lessons > 0) && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Progress by Strand</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {progress.filter(p => p.total_lessons > 0).map(p => (
              <ProgressBar key={p.strand_id} label={p.strand_name} completed={p.completed} total={p.total_lessons} />
            ))}
          </div>
        </div>
      )}

      {/* Mentor notes */}
      {resident?.mentor_notes && (
        <div className="r-card" style={{ borderLeft: '3px solid var(--r-gold)', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Note from Your Mentor</h2>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', color: 'var(--r-text)' }}>
            {resident.mentor_notes}
          </p>
        </div>
      )}

      {/* Announcements feed */}
      <AnnouncementsFeed cohortId={resident?.cohort_id} />
    </div>
  )
}

function AnnouncementsFeed({ cohortId }: { cohortId?: string }) {
  const [announcements, setAnnouncements] = useState<any[]>([])

  useEffect(() => {
    if (!cohortId) return
    async function load() {
      const { data } = await supabase
        .from('residency_cohort_posts')
        .select('*, author:residency_profiles(first_name, last_name)')
        .eq('cohort_id', cohortId)
        .eq('post_type', 'announcement')
        .is('deleted_at', null)
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(3)
      if (data) setAnnouncements(data)
    }
    load()
  }, [cohortId])

  if (announcements.length === 0) return null

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h2 style={{ fontSize: '1.125rem' }}>Announcements</h2>
        <Link href="/residency/portal/board" style={{ fontSize: '0.8125rem', color: 'var(--r-navy)', textDecoration: 'none' }}>
          View all &rarr;
        </Link>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {announcements.map(a => (
          <div key={a.id} className="r-card" style={{
            borderLeft: a.pinned ? '3px solid var(--r-gold)' : undefined,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: 0 }}>{a.title}</h3>
              <span style={{ fontSize: '0.625rem', color: 'var(--r-text-muted)', flexShrink: 0 }}>
                {new Date(a.created_at).toLocaleDateString()}
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--r-text)' }}>
              {a.body.length > 200 ? a.body.slice(0, 200) + '...' : a.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
