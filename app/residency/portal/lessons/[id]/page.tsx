'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import StatusBadge from '../../../components/StatusBadge'
import ScriptIntroduction from '@/app/residency/components/ScriptIntroduction'

export default function ResidentLessonPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [lesson, setLesson] = useState<any>(null)
  const [assignment, setAssignment] = useState<any>(null)
  const [albumEntries, setAlbumEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Load lesson
      const { data: lessonData } = await supabase
        .from('residency_lessons')
        .select('*, strand:residency_strands(*), level:residency_levels(*), category:residency_categories(*)')
        .eq('id', id)
        .single()

      if (lessonData) setLesson(lessonData)

      // Load assignment
      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (resident) {
        const { data: assignmentData } = await supabase
          .from('residency_assignments')
          .select('*')
          .eq('resident_id', resident.id)
          .eq('lesson_id', id)
          .single()

        if (assignmentData) setAssignment(assignmentData)

        // Load album entries for this lesson
        const { data: entries } = await supabase
          .from('residency_album_entries')
          .select('*, feedback:residency_feedback(*, mentor:residency_profiles(first_name, last_name))')
          .eq('resident_id', resident.id)
          .eq('lesson_id', id)
          .order('created_at', { ascending: false })

        if (entries) setAlbumEntries(entries)
      }

      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <p style={{ color: 'var(--r-text-muted)', padding: '2rem' }}>Loading...</p>
  if (!lesson) return <p>Lesson not found.</p>

  return (
    <div>
      <Link href="/residency/portal/lessons" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to My Lessons
      </Link>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {lesson.strand && <span className="r-badge r-badge-strand">{lesson.strand.name}</span>}
        {lesson.level && <span className="r-badge r-badge-level">{lesson.level.name}</span>}
        {assignment && <StatusBadge status={assignment.status} />}
      </div>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{lesson.title}</h1>
      {lesson.description && (
        <p style={{ color: 'var(--r-text-muted)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          {lesson.description}
        </p>
      )}

      {lesson.script_introduction && (
        <ScriptIntroduction script={lesson.script_introduction} levelName={lesson.level?.name} />
      )}

      {/* Lesson content */}
      {lesson.content && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Lesson Content</h2>
          <div style={{ fontSize: '0.875rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {lesson.content}
          </div>
        </div>
      )}

      {lesson.objectives && lesson.objectives.length > 0 && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Objectives</h2>
          <ul style={{ paddingLeft: '1.25rem' }}>
            {lesson.objectives.map((o: string, i: number) => (
              <li key={i} style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>{o}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Album entries for this lesson */}
      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.125rem' }}>Album Entries</h2>
          <Link href={`/residency/portal/albums/new?lesson=${id}`} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
            New Entry
          </Link>
        </div>

        {albumEntries.length === 0 ? (
          <div className="r-card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--r-text-muted)' }}>
            <p style={{ fontSize: '0.875rem' }}>No album entries for this lesson yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {albumEntries.map((entry: any) => (
              <Link key={entry.id} href={`/residency/portal/albums/${entry.id}`}
                className="r-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '0.9375rem', margin: 0 }}>{entry.title}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                      {entry.submitted_at ? `Submitted ${new Date(entry.submitted_at).toLocaleDateString()}` : 'Draft'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {entry.feedback && entry.feedback.length > 0 && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                        {entry.feedback.length} feedback
                      </span>
                    )}
                    <StatusBadge status={entry.status} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
