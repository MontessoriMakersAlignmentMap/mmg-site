import { createServerClient } from '@/lib/supabase/server'
import { getLesson, getAdjacentLessons } from '@/lib/residency/queries'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function LessonPage({
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

  const { prev, next } = await getAdjacentLessons(supabase, lesson)

  const strandSlug = lesson.strand?.slug ?? ''

  return (
    <>
      {/* Lesson header */}
      <section style={{
        background: 'var(--r-navy)',
        color: '#fff',
        padding: '3rem 0 2.5rem',
      }}>
        <div className="r-container r-lesson-header">
          <Link href={`/residency/curriculum/${strandSlug}`} style={{
            fontSize: '0.8125rem',
            color: 'var(--r-gold)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            marginBottom: '1.25rem',
          }}>
            &larr; {lesson.strand?.name ?? 'Back'}
          </Link>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {lesson.strand && (
              <span className="r-badge" style={{
                background: 'rgba(214, 167, 88, 0.2)',
                color: 'var(--r-gold)',
              }}>
                {lesson.strand.name}
              </span>
            )}
            {lesson.level && (
              <span className="r-badge" style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.8)',
              }}>
                {lesson.level.name}
              </span>
            )}
            {lesson.category && (
              <span className="r-badge" style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.8)',
              }}>
                {lesson.category.name}
              </span>
            )}
          </div>

          <h1 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
            color: '#fff',
          }}>
            {lesson.title}
          </h1>

          {lesson.age_range && (
            <p style={{
              fontSize: '0.9375rem',
              color: 'rgba(255,255,255,0.6)',
              marginTop: '0.5rem',
            }}>
              Ages {lesson.age_range}
            </p>
          )}
        </div>
      </section>

      {/* Lesson body */}
      <section className="r-section" style={{ paddingTop: '3rem' }}>
        <div className="r-container r-lesson-body">

          {/* Why This Lesson Matters */}
          {lesson.why_this_lesson_matters && (
            <div className="r-lesson-section">
              <h2 className="r-lesson-section-title">Why This Lesson Matters</h2>
              <div className="r-lesson-prose" style={{ whiteSpace: 'pre-wrap' }}>
                {lesson.why_this_lesson_matters}
              </div>
            </div>
          )}

          {/* Purpose: Direct Aim, Indirect Aim, Equity Aim */}
          {(lesson.direct_aim || lesson.indirect_aim || lesson.equity_aim) && (
            <div className="r-lesson-section">
              <h2 className="r-lesson-section-title">Purpose</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {lesson.direct_aim && (
                  <div className="r-aim-block">
                    <h3 className="r-aim-label">Direct Aim</h3>
                    <div className="r-lesson-prose" style={{ whiteSpace: 'pre-wrap' }}>
                      {lesson.direct_aim}
                    </div>
                  </div>
                )}
                {lesson.indirect_aim && (
                  <div className="r-aim-block">
                    <h3 className="r-aim-label">Indirect Aim</h3>
                    <div className="r-lesson-prose" style={{ whiteSpace: 'pre-wrap' }}>
                      {lesson.indirect_aim}
                    </div>
                  </div>
                )}
                {lesson.equity_aim && (
                  <div className="r-aim-block r-equity-block">
                    <h3 className="r-aim-label" style={{ color: 'var(--r-navy)' }}>Equity Aim</h3>
                    <div className="r-lesson-prose" style={{ whiteSpace: 'pre-wrap' }}>
                      {lesson.equity_aim}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Materials */}
          {lesson.materials && lesson.materials.length > 0 && (
            <div className="r-lesson-section">
              <h2 className="r-lesson-section-title">Materials</h2>
              <ul className="r-lesson-list">
                {lesson.materials.map((mat: string, i: number) => (
                  <li key={i}>{mat}</li>
                ))}
              </ul>
            </div>
          )}

          {/* The Presentation */}
          {lesson.presentation && (
            <div className="r-lesson-section">
              <h2 className="r-lesson-section-title">The Presentation</h2>
              <div className="r-lesson-prose" style={{ whiteSpace: 'pre-wrap' }}>
                {lesson.presentation}
              </div>
            </div>
          )}

          {/* Points of Interest */}
          {lesson.points_of_interest && (
            <div className="r-lesson-section">
              <h2 className="r-lesson-section-title">Points of Interest</h2>
              <div className="r-lesson-prose" style={{ whiteSpace: 'pre-wrap' }}>
                {lesson.points_of_interest}
              </div>
            </div>
          )}

          {/* Variations and Extensions */}
          {lesson.variations && (
            <div className="r-lesson-section">
              <h2 className="r-lesson-section-title">Variations and Extensions</h2>
              <div className="r-lesson-prose" style={{ whiteSpace: 'pre-wrap' }}>
                {lesson.variations}
              </div>
            </div>
          )}

          {/* Neurodivergence and Behavior */}
          {lesson.neurodivergence_notes && (
            <div className="r-lesson-section r-neuro-section">
              <h2 className="r-lesson-section-title" style={{ color: 'var(--r-navy)' }}>
                Neurodivergence and Behavior
              </h2>
              <div className="r-lesson-prose" style={{ whiteSpace: 'pre-wrap' }}>
                {lesson.neurodivergence_notes}
              </div>
            </div>
          )}

          {/* Attachments */}
          {lesson.file_urls && lesson.file_urls.length > 0 && (
            <div className="r-lesson-section">
              <h2 className="r-lesson-section-title">Attachments</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {lesson.file_urls.map((url: string, i: number) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--r-navy)',
                      fontWeight: 500,
                    }}>
                    Attachment {i + 1}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Submit Album Entry CTA */}
          <div style={{
            marginTop: '3rem',
            padding: '2rem',
            background: 'var(--r-gold-light)',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid var(--r-gold)',
          }}>
            <h3 style={{
              fontFamily: 'var(--r-font-heading)',
              fontSize: '1.25rem',
              color: 'var(--r-navy)',
              marginBottom: '0.5rem',
            }}>
              Ready to document your practice?
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--r-text-muted)',
              marginBottom: '1.25rem',
              lineHeight: 1.6,
            }}>
              Submit an album entry for this lesson to receive mentor feedback.
            </p>
            <Link
              href={`/residency/portal/albums/new?lesson=${lesson.id}`}
              className="r-btn r-btn-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              Submit My Album Entry
            </Link>
          </div>

          {/* Previous / Next navigation */}
          <nav style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginTop: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--r-border)',
          }}>
            {prev ? (
              <Link
                href={`/residency/curriculum/lesson/${prev.id}`}
                className="r-lesson-nav-link"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1rem 1.25rem',
                  background: 'var(--r-white)',
                  borderRadius: '10px',
                  border: '1px solid var(--r-border)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--r-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  marginBottom: '0.25rem',
                }}>
                  &larr; Previous Lesson
                </span>
                <span style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--r-navy)',
                }}>
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/residency/curriculum/lesson/${next.id}`}
                className="r-lesson-nav-link"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  textAlign: 'right',
                  padding: '1rem 1.25rem',
                  background: 'var(--r-white)',
                  borderRadius: '10px',
                  border: '1px solid var(--r-border)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--r-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                  marginBottom: '0.25rem',
                }}>
                  Next Lesson &rarr;
                </span>
                <span style={{
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--r-navy)',
                }}>
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>

        </div>
      </section>
    </>
  )
}
