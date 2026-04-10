import { createServerClient } from '@/lib/supabase/server'
import { getLesson } from '@/lib/residency/queries'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = createServerClient()

  let lesson
  try {
    lesson = await getLesson(supabase, id)
  } catch {
    notFound()
  }

  return (
    <div className="r-section">
      <div className="r-container" style={{ maxWidth: '800px' }}>
        <Link href="/residency/curriculum" style={{
          fontSize: '0.8125rem',
          color: 'var(--r-text-muted)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          marginBottom: '1.5rem',
        }}>
          &larr; Back to Curriculum
        </Link>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {lesson.strand && <span className="r-badge r-badge-strand">{lesson.strand.name}</span>}
          {lesson.level && <span className="r-badge r-badge-level">{lesson.level.name}</span>}
          {lesson.category && <span className="r-badge r-badge-strand">{lesson.category.name}</span>}
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{lesson.title}</h1>

        {lesson.description && (
          <p style={{
            fontSize: '1.0625rem',
            color: 'var(--r-text-muted)',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}>
            {lesson.description}
          </p>
        )}

        {/* Objectives */}
        {lesson.objectives && lesson.objectives.length > 0 && (
          <div className="r-card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Objectives</h2>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {lesson.objectives.map((obj: string, i: number) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)' }}>{obj}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Materials */}
        {lesson.materials && lesson.materials.length > 0 && (
          <div className="r-card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Materials</h2>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {lesson.materials.map((mat: string, i: number) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)' }}>{mat}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Content */}
        {lesson.content && (
          <div className="r-card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Lesson Content</h2>
            <div style={{ fontSize: '0.875rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {lesson.content}
            </div>
          </div>
        )}

        {/* Files */}
        {lesson.file_urls && lesson.file_urls.length > 0 && (
          <div className="r-card">
            <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Attachments</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {lesson.file_urls.map((url: string, i: number) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: 'var(--r-navy)' }}>
                  Attachment {i + 1}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
