import { createServerClient } from '@/lib/supabase/server'
import { getStrandBySlug, getLevelBySlug, getCategoriesByStrand, getLessonsByStrandAndLevel } from '@/lib/residency/queries'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const VALID_LEVELS = ['primary', 'elementary']

export default async function StrandLevelPage({
  params,
}: {
  params: Promise<{ level: string; strand: string }>
}) {
  const { level: levelSlug, strand: strandSlug } = await params

  if (!VALID_LEVELS.includes(levelSlug)) notFound()

  const supabase = createServerClient()

  let strand, levelRecord
  try {
    levelRecord = await getLevelBySlug(supabase, levelSlug)
    strand = await getStrandBySlug(supabase, strandSlug, levelRecord.id)
  } catch {
    notFound()
  }

  const [categories, lessons] = await Promise.all([
    getCategoriesByStrand(supabase, strand.id),
    getLessonsByStrandAndLevel(supabase, strand.id, levelRecord.id),
  ])

  const lessonsByCategory = categories.map((cat: any) => ({
    ...cat,
    lessons: lessons.filter((l: any) => l.category_id === cat.id),
  }))

  const levelLabel = levelSlug === 'primary' ? 'Primary' : 'Elementary'

  return (
    <>
      {/* Strand header */}
      <section style={{
        background: 'var(--r-navy)',
        color: '#fff',
        padding: '3.5rem 0 3rem',
      }}>
        <div className="r-container" style={{ maxWidth: '900px' }}>
          <Link href={`/residency/curriculum/${levelSlug}`} style={{
            fontSize: '0.8125rem',
            color: 'var(--r-gold)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            marginBottom: '1.25rem',
          }}>
            &larr; {levelLabel} Strands
          </Link>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="r-badge" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)',
            }}>
              {levelLabel}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            lineHeight: 1.2,
            marginBottom: '1rem',
            color: '#fff',
          }}>
            {strand.name}
          </h1>

          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '640px',
          }}>
            {strand.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
              {categories.length} {categories.length === 1 ? 'category' : 'categories'}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>&middot;</span>
            <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
              {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
            </span>
          </div>
        </div>
      </section>

      {/* Categories and lessons */}
      <section className="r-section">
        <div className="r-container" style={{ maxWidth: '900px' }}>
          {lessonsByCategory.length === 0 ? (
            <div className="r-empty">
              <h3>Categories coming soon</h3>
              <p>This strand&apos;s categories and lessons are being prepared.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {lessonsByCategory.map((cat: any) => (
                <div key={cat.id}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h2 style={{
                      fontFamily: 'var(--r-font-heading)',
                      fontSize: '1.5rem',
                      color: 'var(--r-navy)',
                      marginBottom: '0.375rem',
                    }}>
                      {cat.name}
                    </h2>
                    {cat.description && (
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--r-text-muted)',
                        lineHeight: 1.6,
                        maxWidth: '600px',
                      }}>
                        {cat.description}
                      </p>
                    )}
                  </div>

                  {cat.lessons.length === 0 ? (
                    <div style={{
                      padding: '2rem 1.5rem',
                      background: 'var(--r-white)',
                      borderRadius: '12px',
                      border: '1px solid var(--r-border)',
                      textAlign: 'center',
                      color: 'var(--r-text-muted)',
                      fontSize: '0.875rem',
                    }}>
                      Lessons for this category will be added soon.
                    </div>
                  ) : (
                    <div style={{
                      background: 'var(--r-white)',
                      borderRadius: '12px',
                      border: '1px solid var(--r-border)',
                      overflow: 'hidden',
                    }}>
                      {cat.lessons.map((lesson: any, idx: number) => (
                        <Link
                          key={lesson.id}
                          href={`/residency/curriculum/lesson/${lesson.id}`}
                          className="r-lesson-row"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem 1.5rem',
                            textDecoration: 'none',
                            color: 'inherit',
                            borderBottom: idx < cat.lessons.length - 1 ? '1px solid var(--r-border)' : 'none',
                          }}
                        >
                          <span style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'var(--r-gold-light)',
                            color: 'var(--r-navy)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            flexShrink: 0,
                          }}>
                            {idx + 1}
                          </span>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h3 style={{
                              fontFamily: 'var(--r-font-body)',
                              fontSize: '0.9375rem',
                              fontWeight: 600,
                              color: 'var(--r-navy)',
                              marginBottom: '0.125rem',
                            }}>
                              {lesson.title}
                            </h3>
                            {lesson.age_range && (
                              <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                                Ages {lesson.age_range}
                              </span>
                            )}
                          </div>

                          <span style={{ color: 'var(--r-text-muted)', fontSize: '1.25rem', flexShrink: 0 }}>
                            &rsaquo;
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
