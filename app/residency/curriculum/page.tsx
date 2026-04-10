import { createServerClient } from '@/lib/supabase/server'
import { getStrandsWithCounts } from '@/lib/residency/queries'
import Link from 'next/link'

export const metadata = { title: 'Curriculum Library' }

export default async function CurriculumPage() {
  const supabase = createServerClient()
  const strands = await getStrandsWithCounts(supabase)

  return (
    <>
      {/* Header */}
      <section style={{
        background: 'var(--r-navy)',
        color: '#fff',
        padding: '4rem 0 3.5rem',
      }}>
        <div className="r-container" style={{ maxWidth: '900px' }}>
          <p style={{
            color: 'var(--r-gold)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '0.75rem',
          }}>
            Curriculum Library
          </p>
          <h1 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            lineHeight: 1.2,
            marginBottom: '1rem',
            color: '#fff',
          }}>
            The Full Scope of Practice
          </h1>
          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '640px',
          }}>
            Six strands. Every lesson a Montessori resident needs to study, practice, and master.
            Select a strand to explore its categories and lessons.
          </p>
        </div>
      </section>

      {/* Strand cards */}
      <section className="r-section">
        <div className="r-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}>
            {strands.map((strand: any) => (
              <Link
                key={strand.id}
                href={`/residency/curriculum/${strand.slug}`}
                className="r-card r-strand-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: strand.slug === 'equity-and-community' ? 'var(--r-navy)' : 'var(--r-gold-light)',
                  borderRadius: '10px',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    fontSize: '1.25rem',
                    color: strand.slug === 'equity-and-community' ? 'var(--r-gold)' : 'var(--r-navy)',
                  }}>
                    {strand.slug === 'practical-life' && '\u2726'}
                    {strand.slug === 'sensorial' && '\u25C9'}
                    {strand.slug === 'language' && '\u270E'}
                    {strand.slug === 'math' && '\u2234'}
                    {strand.slug === 'cultural' && '\u2641'}
                    {strand.slug === 'equity-and-community' && '\u2661'}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: 'var(--r-font-heading)',
                  fontSize: '1.375rem',
                  color: 'var(--r-navy)',
                  marginBottom: '0.625rem',
                }}>
                  {strand.name}
                </h2>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--r-text-muted)',
                  lineHeight: 1.7,
                  marginBottom: '1.25rem',
                  flex: 1,
                }}>
                  {strand.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--r-border)',
                  paddingTop: '1rem',
                  marginTop: 'auto',
                }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {strand.levels && strand.levels.length > 0 ? (
                      strand.levels.map((lv: any) => (
                        <span key={lv.id} className="r-badge r-badge-level" style={{ fontSize: '0.6875rem' }}>
                          {lv.name} ({lv.age_range})
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>All levels</span>
                    )}
                  </div>
                  <span style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--r-navy)',
                    whiteSpace: 'nowrap',
                  }}>
                    {strand.lesson_count} {strand.lesson_count === 1 ? 'lesson' : 'lessons'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
