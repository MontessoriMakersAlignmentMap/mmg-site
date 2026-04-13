'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

const PING_INTERVAL_MS = 30_000 // Send engagement every 30 seconds
const ENGAGE_THRESHOLD_S = 180 // 3 minutes

export default function BundleLessonPage() {
  const params = useParams()
  const router = useRouter()
  const bundleId = params.bundleId as string
  const lessonId = params.lessonId as string
  const [lesson, setLesson] = useState<any>(null)
  const [bundle, setBundle] = useState<any>(null)
  const [resident, setResident] = useState<any>(null)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [engaged, setEngaged] = useState(false)
  const [loading, setLoading] = useState(true)
  const secondsAccumulated = useRef(0)
  const lastPing = useRef(Date.now())
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: res } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', user.id)
        .single()
      setResident(res)

      const [lessonRes, bundleRes] = await Promise.all([
        supabase.from('residency_lessons').select('*, strand:residency_strands(name), level:residency_levels(name)').eq('id', lessonId).single(),
        supabase.from('residency_bundles').select('*, bundle_lessons:residency_bundle_lessons(id, lesson_id, sequence_order, lesson:residency_lessons(id, title))').eq('id', bundleId).single(),
      ])

      setLesson(lessonRes.data)
      setBundle(bundleRes.data)

      // Check existing engagement
      if (res) {
        const { data: existing } = await supabase
          .from('residency_lesson_engagements')
          .select('total_seconds, engaged')
          .eq('resident_id', res.id)
          .eq('lesson_id', lessonId)
          .maybeSingle()
        if (existing) {
          setTotalSeconds(existing.total_seconds)
          setEngaged(existing.engaged)
        }
      }

      setLoading(false)
    }
    load()
  }, [lessonId, bundleId])

  // Time tracking: count seconds while page is visible
  const sendPing = useCallback(async () => {
    if (!resident || secondsAccumulated.current === 0) return
    const toSend = secondsAccumulated.current
    secondsAccumulated.current = 0

    try {
      const res = await fetch('/api/residency/engagements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resident_id: resident.id,
          lesson_id: lessonId,
          bundle_id: bundleId,
          seconds_to_add: toSend,
        }),
      })
      const data = await res.json()
      setTotalSeconds(data.total_seconds)
      setEngaged(data.engaged)
    } catch {
      // Silently fail, will retry next ping
      secondsAccumulated.current += toSend
    }
  }, [resident, lessonId, bundleId])

  useEffect(() => {
    if (!resident || loading) return

    // Tick every second when visible
    const ticker = setInterval(() => {
      if (!document.hidden) {
        secondsAccumulated.current += 1
        setTotalSeconds(prev => prev + 1)
      }
    }, 1000)

    // Ping server every 30 seconds
    intervalRef.current = setInterval(sendPing, PING_INTERVAL_MS)

    // Send on visibility change (tab switch)
    const handleVisibility = () => {
      if (document.hidden) sendPing()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // Send on unload
    const handleUnload = () => sendPing()
    window.addEventListener('beforeunload', handleUnload)

    return () => {
      clearInterval(ticker)
      if (intervalRef.current) clearInterval(intervalRef.current)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('beforeunload', handleUnload)
      sendPing()
    }
  }, [resident, loading, sendPing])

  if (loading) return <p style={{ color: 'var(--r-text-muted)', padding: '2rem' }}>Loading...</p>
  if (!lesson) return <p>Lesson not found.</p>

  const bundleLessons = bundle?.bundle_lessons?.sort((a: any, b: any) => a.sequence_order - b.sequence_order) || []
  const currentIdx = bundleLessons.findIndex((bl: any) => bl.lesson_id === lessonId)
  const prevLesson = currentIdx > 0 ? bundleLessons[currentIdx - 1] : null
  const nextLesson = currentIdx < bundleLessons.length - 1 ? bundleLessons[currentIdx + 1] : null

  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const progressPct = Math.min((totalSeconds / ENGAGE_THRESHOLD_S) * 100, 100)

  // Strip the "Level: Strand: " prefix from the title for display
  const displayTitle = lesson.title?.replace(/^(Primary|Elementary): \w[\w\s]*: /, '') || lesson.title

  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Navigation breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Link href="/residency/portal" style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none' }}>
          &larr; Back to Dashboard
        </Link>
        {bundle && (
          <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
            Week {bundle.week_number}: {bundle.weekly_theme}
          </span>
        )}
      </div>

      {/* Engagement indicator */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.625rem 1rem', borderRadius: '8px', marginBottom: '1.5rem',
        background: engaged ? 'var(--r-success-light)' : 'var(--r-bg-muted)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '100px', height: '4px', background: engaged ? '#c8e6c9' : 'var(--r-border)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPct}%`, background: engaged ? 'var(--r-success)' : 'var(--r-navy)', borderRadius: '2px', transition: 'width 1s' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: engaged ? 'var(--r-success)' : 'var(--r-text-muted)', fontWeight: 500 }}>
            {engaged ? 'Engaged' : `${minutes}:${seconds.toString().padStart(2, '0')} / 3:00`}
          </span>
        </div>
        <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
          {lesson.strand?.name} &middot; {lesson.level?.name}
        </span>
      </div>

      {/* Video player */}
      {lesson.video_url && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '12px',
            overflow: 'hidden', background: '#000',
          }}>
            <iframe
              src={lesson.video_url}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              onLoad={() => {
                // Log video view
                if (resident) {
                  fetch('/api/residency/video-engagement', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      resident_id: resident.id,
                      lesson_id: lessonId,
                      video_url: lesson.video_url,
                    }),
                  }).catch(() => {})
                }
              }}
            />
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginTop: '0.5rem' }}>
            Lesson Introduction &middot; {displayTitle}
          </p>
        </div>
      )}

      {/* Lesson content */}
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2 }}>
        {displayTitle}
      </h1>

      {lesson.age_range && (
        <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1.5rem' }}>{lesson.age_range}</p>
      )}

      {lesson.why_this_lesson_matters && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--r-navy)' }}>Why This Lesson Matters</h2>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{lesson.why_this_lesson_matters}</p>
        </div>
      )}

      {(lesson.direct_aim || lesson.indirect_aim || lesson.equity_aim) && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--r-navy)' }}>Purpose</h2>
          {lesson.direct_aim && (
            <div style={{ marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Direct Aims</h3>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{lesson.direct_aim}</p>
            </div>
          )}
          {lesson.indirect_aim && (
            <div style={{ marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Indirect Aims</h3>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{lesson.indirect_aim}</p>
            </div>
          )}
          {lesson.equity_aim && (
            <div style={{ marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>The Equity Aim</h3>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{lesson.equity_aim}</p>
            </div>
          )}
        </div>
      )}

      {lesson.presentation && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--r-navy)' }}>The Presentation</h2>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{lesson.presentation}</p>
        </div>
      )}

      {lesson.points_of_interest && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--r-navy)' }}>Points of Interest</h2>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{lesson.points_of_interest}</p>
        </div>
      )}

      {lesson.variations && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--r-navy)' }}>Variations and Extensions</h2>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{lesson.variations}</p>
        </div>
      )}

      {lesson.neurodivergence_notes && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--r-navy)' }}>Neurodivergence, Sensory Profiles, and Behavior</h2>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{lesson.neurodivergence_notes}</p>
        </div>
      )}

      {/* If there's general content and no structured fields, show it */}
      {!lesson.why_this_lesson_matters && !lesson.presentation && lesson.content && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.9375rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{lesson.content}</div>
        </div>
      )}

      {/* Prev/Next navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '2rem', borderTop: '1px solid var(--r-border)', marginTop: '2rem' }}>
        {prevLesson ? (
          <Link
            href={`/residency/portal/bundles/${bundleId}/lessons/${prevLesson.lesson_id}`}
            style={{ fontSize: '0.8125rem', color: 'var(--r-navy)', textDecoration: 'none' }}
          >
            &larr; {prevLesson.lesson?.title?.replace(/^(Primary|Elementary): \w[\w\s]*: /, '')}
          </Link>
        ) : <span />}
        {nextLesson ? (
          <Link
            href={`/residency/portal/bundles/${bundleId}/lessons/${nextLesson.lesson_id}`}
            style={{ fontSize: '0.8125rem', color: 'var(--r-navy)', textDecoration: 'none' }}
          >
            {nextLesson.lesson?.title?.replace(/^(Primary|Elementary): \w[\w\s]*: /, '')} &rarr;
          </Link>
        ) : (
          <Link href="/residency/portal" style={{ fontSize: '0.8125rem', color: 'var(--r-navy)', textDecoration: 'none' }}>
            Back to Dashboard &rarr;
          </Link>
        )}
      </div>
    </div>
  )
}
