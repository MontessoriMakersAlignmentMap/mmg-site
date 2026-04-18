'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import ProgressBar from '../components/ProgressBar'

export default function PortalDashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [resident, setResident] = useState<any>(null)
  const [bundles, setBundles] = useState<any[]>([])
  const [bundleEngagements, setBundleEngagements] = useState<any[]>([])
  const [lessonEngagements, setLessonEngagements] = useState<any[]>([])
  const [albumEntries, setAlbumEntries] = useState<any[]>([])
  const [readingAssignments, setReadingAssignments] = useState<any[]>([])
  const [unreadFeedback, setUnreadFeedback] = useState<any[]>([])
  const [progress, setProgress] = useState<any[]>([])
  const [intensives, setIntensives] = useState<any[]>([])
  const [registeredIntensives, setRegisteredIntensives] = useState<Set<string>>(new Set())
  const [seminars, setSeminars] = useState<any[]>([])
  const [seminarReflection, setSeminarReflection] = useState('')
  const [viewWeek, setViewWeek] = useState<number | null>(null)
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
        .select('*, assigned_level:residency_levels(*), cohort:residency_cohorts(*)')
        .eq('profile_id', user.id)
        .single()

      if (!res) { setLoading(false); return }
      setResident(res)

      if (res.cohort_id) {
        const { data: bdles } = await supabase
          .from('residency_bundles')
          .select(`*, bundle_lessons:residency_bundle_lessons(id, lesson_id, sequence_order, lesson:residency_lessons(id, title, slug, strand:residency_strands(name)))`)
          .eq('cohort_id', res.cohort_id)
          .in('status', ['released', 'completed', 'scheduled'])
          .is('deleted_at', null)
          .order('bundle_number')

        setBundles(bdles || [])

        const { data: be } = await supabase
          .from('residency_bundle_engagements')
          .select('*')
          .eq('resident_id', res.id)
        setBundleEngagements(be || [])

        const { data: le } = await supabase
          .from('residency_lesson_engagements')
          .select('*')
          .eq('resident_id', res.id)
        setLessonEngagements(le || [])

        // Album entries for this resident
        const { data: albums } = await supabase
          .from('residency_album_entries')
          .select('*, lesson:residency_lessons(id, title, strand:residency_strands(name))')
          .eq('resident_id', res.id)
        setAlbumEntries(albums || [])

        // Reading assignments for this track
        const track = res.assigned_level?.name?.toLowerCase() === 'elementary' ? 'elementary' : 'primary'
        const { data: readings } = await supabase
          .from('residency_reading_assignments')
          .select('*')
          .eq('track', track)
        setReadingAssignments(readings || [])

        // Seminars / live sessions
        const { data: sems } = await supabase
          .from('residency_live_session_logs')
          .select('*')
          .eq('cohort_id', res.cohort_id)
        setSeminars(sems || [])
      }

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

      // Upcoming intensives
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

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  // Determine current week
  const today = new Date().toISOString().split('T')[0]
  const totalWeeks = bundles.length
  const releasedBundles = bundles.filter(b => b.status === 'released' || (b.status === 'scheduled' && b.unlock_date <= today))

  const currentWeekBundle = releasedBundles.find(b => b.unlock_date <= today && (!b.lock_date || b.lock_date >= today))
    || releasedBundles[releasedBundles.length - 1]

  const activeWeek = viewWeek ?? currentWeekBundle?.week_number ?? 1
  const bundle = bundles.find(b => b.week_number === activeWeek)
  const prevBundle = bundles.find(b => b.week_number === activeWeek - 1)
  const nextBundle = bundles.find(b => b.week_number === activeWeek + 1)

  if (!bundle) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome, {profile?.first_name}</h1>
        <p style={{ color: 'var(--r-text-muted)' }}>Your program has not started yet. Check back when your first week opens.</p>
      </div>
    )
  }

  const lessons = bundle.bundle_lessons?.sort((a: any, b: any) => a.sequence_order - b.sequence_order) || []
  const track = resident?.assigned_level?.name?.toLowerCase() === 'elementary' ? 'elementary' : 'primary'

  // Reading assignments for this bundle
  const bundleReadings = readingAssignments.filter((r: any) => r.bundle_id === bundle.id || r.week_number === bundle.week_number)

  // Next bundle reading (for preview section)
  const nextBundleReadings = nextBundle
    ? readingAssignments.filter((r: any) => r.bundle_id === nextBundle.id || r.week_number === nextBundle.week_number)
    : []

  // On-track indicator
  const isCurrentWeek = currentWeekBundle?.week_number === activeWeek
  const isPastWeek = currentWeekBundle && activeWeek < currentWeekBundle.week_number
  const isFutureWeek = currentWeekBundle && activeWeek > currentWeekBundle.week_number

  // Date range display (Sun-Sat)
  const unlockDate = new Date(bundle.unlock_date + 'T12:00:00')
  const lockDate = new Date(bundle.lock_date + 'T12:00:00')
  const dateRange = `${unlockDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} to ${lockDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`

  // Lesson completion helpers
  function getLessonStatus(lessonId: string) {
    const le = lessonEngagements.find(e => e.lesson_id === lessonId)
    const album = albumEntries.find(a => a.lesson_id === lessonId)
    if (album?.status === 'complete' || album?.status === 'approved') return { label: 'Complete', color: 'var(--r-success)', bg: 'var(--r-success-light)' }
    if (album?.status === 'submitted' || album?.status === 'in_review') return { label: 'Submitted for Review', color: 'var(--r-info)', bg: 'var(--r-info-light)' }
    if (le?.engaged || album) return { label: 'In Progress', color: '#d4a017', bg: '#fef9e7' }
    return { label: 'Not Started', color: '#9e9e9e', bg: 'var(--r-muted-light)' }
  }

  const completedLessons = lessons.filter((bl: any) => {
    const s = getLessonStatus(bl.lesson_id)
    return s.label === 'Complete'
  }).length

  // Album entry status per lesson
  function getAlbumStatus(lessonId: string) {
    const album = albumEntries.find(a => a.lesson_id === lessonId)
    if (!album) return { label: 'Not Started', color: '#9e9e9e' }
    const statusMap: Record<string, { label: string; color: string }> = {
      draft: { label: 'Draft Saved', color: '#d4a017' },
      submitted: { label: 'Submitted', color: 'var(--r-info)' },
      in_review: { label: 'In AI Review', color: '#7b1fa2' },
      returned: { label: 'Returned for Revision', color: 'var(--r-feedback-color)' },
      mentor_review: { label: 'Cohort Guide Review', color: '#7b1fa2' },
      complete: { label: 'Complete', color: 'var(--r-success)' },
      approved: { label: 'Complete', color: 'var(--r-success)' },
    }
    return statusMap[album.status] || { label: album.status, color: '#9e9e9e' }
  }

  const completedAlbums = lessons.filter((bl: any) => {
    const s = getAlbumStatus(bl.lesson_id)
    return s.label === 'Complete'
  }).length

  // Seminar prep: show only within 48 hours of session
  const upcomingSeminar = seminars.find(s => {
    if (!s.session_date) return false
    const sessionTime = new Date(s.session_date).getTime()
    const now = Date.now()
    return sessionTime > now && sessionTime - now <= 48 * 60 * 60 * 1000 && s.bundle_id === bundle.id
  })

  return (
    <div>
      {/* ═══ Previous/Next Navigation ═══ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        {prevBundle ? (
          <button
            onClick={() => setViewWeek(prevBundle.week_number)}
            className="r-btn"
            style={{ fontSize: '0.75rem' }}
          >
            &larr; Week {prevBundle.week_number}
          </button>
        ) : <span />}
        {isCurrentWeek ? (
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--r-success)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Current Week
          </span>
        ) : (
          <button
            onClick={() => setViewWeek(null)}
            className="r-btn"
            style={{ fontSize: '0.6875rem' }}
          >
            Go to Current Week
          </button>
        )}
        {nextBundle && nextBundle.unlock_date <= today ? (
          <button
            onClick={() => setViewWeek(nextBundle.week_number)}
            className="r-btn"
            style={{ fontSize: '0.75rem' }}
          >
            Week {nextBundle.week_number} &rarr;
          </button>
        ) : <span />}
      </div>

      {/* ═══ BUNDLE HEADER ═══ */}
      <div style={{
        background: 'linear-gradient(135deg, var(--r-navy) 0%, #1a365d 100%)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '1.5rem',
        color: 'white',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7 }}>
            Week {bundle.week_number} of {totalWeeks} &middot; {track === 'primary' ? 'Primary' : 'Elementary'}
          </p>
          {isPastWeek && (
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, background: 'rgba(255,255,255,0.15)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
              Past Week
            </span>
          )}
          {isFutureWeek && (
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, background: 'rgba(255,213,84,0.3)', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
              Upcoming
            </span>
          )}
        </div>
        <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.75rem' }}>
          {bundle.month} &middot; {dateRange}
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '0.5rem' }}>
          {bundle.weekly_theme}
        </h1>
        <p style={{ fontSize: '0.8125rem', opacity: 0.7 }}>
          {bundle.strands_included} &middot; {lessons.length} lessons
        </p>
      </div>

      {/* ═══ SECTION 1: Slide Deck ═══ */}
      {bundle.deck_url && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--r-gold)', marginBottom: '0.5rem',
          }}>
            Start here. Work through this deck before opening your lessons.
          </p>
          <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--r-border)' }}>
            <iframe
              src={bundle.deck_url}
              title={`Week ${bundle.week_number} Slide Deck`}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="fullscreen"
            />
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--r-border)', margin: '1.5rem 0' }} />
        </div>
      )}

      {/* ═══ SECTION 2: Required Reading ═══ */}
      {bundleReadings.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--r-gold)', marginBottom: '0.75rem',
          }}>
            Before you read the lessons
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {bundleReadings.map((r: any) => {
              const isFree = r.reading_type === 'montessori_source'
              return (
                <div key={r.id} className="r-card" style={{
                  borderLeft: '4px solid #7b1fa2',
                  display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: '48px', height: '64px', background: '#f3e5f5', borderRadius: '4px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    fontSize: '1.5rem',
                  }}>
                    &#128214;
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.125rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>{r.book_title}</h3>
                      {isFree && (
                        <span style={{
                          fontSize: '0.5rem', fontWeight: 700, textTransform: 'uppercase',
                          padding: '0.125rem 0.375rem', borderRadius: '3px',
                          background: 'var(--r-success)', color: 'white',
                        }}>Free</span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>by {r.author}</p>
                    {r.chapters_pages && (
                      <p style={{ fontSize: '0.8125rem' }}><strong>Assigned:</strong> {r.chapters_pages}</p>
                    )}
                    {r.focus_question && (
                      <p style={{ fontSize: '0.8125rem', fontStyle: 'italic', marginTop: '0.375rem', lineHeight: 1.5, color: 'var(--r-text)' }}>
                        {r.focus_question}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.625rem' }}>
                      {r.free_access_link && (
                        <a href={r.free_access_link} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '0.75rem', fontWeight: 600, color: 'white', background: 'var(--r-success)', padding: '0.25rem 0.75rem', borderRadius: '4px', textDecoration: 'none' }}>
                          Read Free &rarr;
                        </a>
                      )}
                      {r.amazon_link && (
                        <a href={r.amazon_link} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-navy)', textDecoration: 'none' }}>
                          Amazon &rarr;
                        </a>
                      )}
                      {r.bookshop_link && (
                        <a href={r.bookshop_link} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-navy)', textDecoration: 'none' }}>
                          Bookshop.org &rarr;
                        </a>
                      )}
                      {r.thriftbooks_link && (
                        <a href={r.thriftbooks_link} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-success)', textDecoration: 'none' }}>
                          ThriftBooks &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--r-border)', margin: '1.5rem 0' }} />
        </div>
      )}

      {/* ═══ SECTION 3: This Week's Lessons ═══ */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--r-gold)', margin: 0,
          }}>
            This week&apos;s lessons
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
            {completedLessons} of {lessons.length} complete
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {lessons.map((bl: any, i: number) => {
            const status = getLessonStatus(bl.lesson_id)
            return (
              <Link
                key={bl.id}
                href={`/residency/portal/bundles/${bundle.id}/lessons/${bl.lesson_id}`}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.625rem 0.875rem', background: status.bg, borderRadius: '8px',
                  textDecoration: 'none', color: 'var(--r-text)',
                }}
              >
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  <span style={{ color: 'var(--r-text-muted)', marginRight: '0.5rem' }}>{i + 1}.</span>
                  {bl.lesson?.title?.replace(/^(Primary|Elementary): \w+: /, '')}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>{bl.lesson?.strand?.name}</span>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: status.color }}>{status.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid var(--r-border)', margin: '1.5rem 0' }} />
      </div>

      {/* ═══ SECTION 4: Observation Focus ═══ */}
      {bundle.observation_focus && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--r-gold)', marginBottom: '0.75rem',
          }}>
            In your classroom this week
          </p>
          <div style={{
            borderLeft: '4px solid var(--r-gold)',
            background: 'rgba(212, 160, 23, 0.06)',
            borderRadius: '0 8px 8px 0',
            padding: '1.25rem 1.5rem',
          }}>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--r-text)' }}>
              {bundle.observation_focus}
            </p>
          </div>
          <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.5rem', fontStyle: 'italic' }}>
            This is not a form. It is a lens to carry into your classroom.
          </p>
          <hr style={{ border: 'none', borderTop: '1px solid var(--r-border)', margin: '1.5rem 0' }} />
        </div>
      )}

      {/* ═══ SECTION 4b: Practicum Focus (shown during practicum year when no observation_focus) ═══ */}
      {!bundle.observation_focus && bundle.practicum_focus && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--r-gold)', marginBottom: '0.75rem',
          }}>
            Practicum focus this week
          </p>
          <div style={{
            borderLeft: '4px solid var(--r-gold)',
            background: 'rgba(212, 160, 23, 0.06)',
            borderRadius: '0 8px 8px 0',
            padding: '1.25rem 1.5rem',
          }}>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--r-text)' }}>
              {bundle.practicum_focus}
            </p>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--r-border)', margin: '1.5rem 0' }} />
        </div>
      )}

      {/* ═══ SECTION 6: Album Submissions This Week ═══ */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{
          fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'var(--r-gold)', marginBottom: '0.75rem',
        }}>
          Album submissions this week
        </p>

        {/* Progress bar */}
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>
            <span>{completedAlbums} of {lessons.length} album entries complete</span>
            <span>{lessons.length > 0 ? Math.round((completedAlbums / lessons.length) * 100) : 0}%</span>
          </div>
          <div style={{ height: '6px', background: 'var(--r-bg-muted)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${lessons.length > 0 ? (completedAlbums / lessons.length) * 100 : 0}%`,
              background: completedAlbums === lessons.length && lessons.length > 0 ? 'var(--r-success)' : 'var(--r-gold)',
              borderRadius: '3px',
              transition: 'width 0.3s',
            }} />
          </div>
        </div>

        {/* Status table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--r-border)' }}>
                <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lesson</th>
                <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Strand</th>
                <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '0.5rem 0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((bl: any) => {
                const albumStatus = getAlbumStatus(bl.lesson_id)
                const album = albumEntries.find(a => a.lesson_id === bl.lesson_id)
                return (
                  <tr key={bl.id} style={{ borderBottom: '1px solid var(--r-border)' }}>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      <Link
                        href={`/residency/portal/bundles/${bundle.id}/lessons/${bl.lesson_id}`}
                        style={{ color: 'var(--r-navy)', fontWeight: 500, textDecoration: 'none' }}
                      >
                        {bl.lesson?.title?.replace(/^(Primary|Elementary): \w+: /, '')}
                      </Link>
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem', color: 'var(--r-text-muted)' }}>{bl.lesson?.strand?.name}</td>
                    <td style={{ padding: '0.5rem 0.75rem' }}>
                      <span style={{ fontWeight: 600, color: albumStatus.color }}>{albumStatus.label}</span>
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', color: 'var(--r-text-muted)', fontSize: '0.75rem' }}>
                      {album?.updated_at ? new Date(album.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Album prompt */}
        {bundle.album_submission_required && bundle.album_prompt && (
          <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: 'var(--r-info-light)', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'var(--r-text)' }}>
              <strong>This week&apos;s prompt:</strong> {bundle.album_prompt}
            </p>
          </div>
        )}
        <hr style={{ border: 'none', borderTop: '1px solid var(--r-border)', margin: '1.5rem 0' }} />
      </div>

      {/* ═══ SECTION 7: Seminar Prep (48hr window only) ═══ */}
      {upcomingSeminar && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            color: '#7b1fa2', marginBottom: '0.75rem',
          }}>
            Seminar prep
          </p>
          <div className="r-card" style={{ borderLeft: '4px solid #7b1fa2' }}>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem', fontSize: '0.8125rem' }}>
              <span><strong>Date:</strong> {new Date(upcomingSeminar.session_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            {upcomingSeminar.key_themes && (
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                <strong>Prep question:</strong> {upcomingSeminar.key_themes}
              </p>
            )}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                Pre-seminar reflection (optional, 2-3 sentences)
              </label>
              <textarea
                className="r-input"
                rows={3}
                value={seminarReflection}
                onChange={e => setSeminarReflection(e.target.value)}
                placeholder="What are you thinking about heading into this session?"
              />
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--r-border)', margin: '1.5rem 0' }} />
        </div>
      )}

      {/* ═══ SECTION 8: Next Week Preview ═══ */}
      {nextBundle && (
        <div style={{
          marginBottom: '2rem',
          padding: '1rem 1.25rem',
          background: 'var(--r-bg-muted)',
          borderRadius: '8px',
          opacity: 0.85,
        }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>
            Coming Next &middot; Week {nextBundle.week_number}
          </p>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            {nextBundle.weekly_theme}
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
            {nextBundle.strands_included} &middot; {nextBundle.bundle_lessons?.length || 0} lessons
            {nextBundle.unlock_date && ` · Opens ${new Date(nextBundle.unlock_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
          </p>
          {nextBundleReadings.length > 0 && (
            <p style={{ fontSize: '0.75rem', color: '#7b1fa2', fontWeight: 600, marginTop: '0.375rem' }}>
              Coming next week: {nextBundleReadings.map(r => r.book_title).join(', ')}
            </p>
          )}
        </div>
      )}

      {/* ═══ SUPPORTING: Unread Feedback ═══ */}
      {unreadFeedback.length > 0 && (
        <div className="r-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--r-gold)', background: 'var(--r-gold-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.125rem', color: 'var(--r-navy)' }}>New Cohort Guide Feedback</h2>
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

      {/* ═══ SUPPORTING: Upcoming Intensives ═══ */}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {isRegistered ? (
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, background: 'rgba(102,187,106,0.3)', padding: '0.5rem 1rem', borderRadius: '6px' }}>
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
                        if (!error) setRegisteredIntensives(prev => new Set([...prev, i.id]))
                      }}
                      style={{ fontSize: '0.8125rem', fontWeight: 600, background: '#ffd54f', color: '#1a237e', padding: '0.5rem 1.25rem', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
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

      {/* ═══ SUPPORTING: Progress by Strand ═══ */}
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

      {/* ═══ SUPPORTING: Cohort Guide Note ═══ */}
      {resident?.mentor_notes && (
        <div className="r-card" style={{ borderLeft: '3px solid var(--r-gold)', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Note from Your Cohort Guide</h2>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', color: 'var(--r-text)' }}>
            {resident.mentor_notes}
          </p>
        </div>
      )}

      {/* ═══ SUPPORTING: Announcements ═══ */}
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
          <div key={a.id} className="r-card" style={{ borderLeft: a.pinned ? '3px solid var(--r-gold)' : undefined }}>
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
