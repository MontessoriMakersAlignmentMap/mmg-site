import { createServerClient } from '@/lib/supabase/server'
import { getLevelBySlug, getStrandsWithCounts } from '@/lib/residency/queries'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const VALID_LEVELS = ['primary', 'elementary']

const STRAND_ICONS: Record<string, string> = {
  'practical-life': '\u2726',
  'sensorial': '\u25C9',
  'language': '\u270E',
  'mathematics': '\u2234',
  'theory': '\u2606',
  'geography': '\u2641',
  'biology': '\u2698',
  'history': '\u231B',
  'geometry': '\u25B3',
  'art': '\u2710',
  'music': '\u266B',
  'behavior': '\u2661',
}

export default async function LevelPage({
  params,
}: {
  params: Promise<{ level: string }>
}) {
  const { level: levelSlug } = await params

  if (!VALID_LEVELS.includes(levelSlug)) notFound()

  const supabase = createServerClient()

  let levelRecord
  try {
    levelRecord = await getLevelBySlug(supabase, levelSlug)
  } catch {
    notFound()
  }

  const strands = await getStrandsWithCounts(supabase, levelRecord.id)

  const levelLabel = levelSlug === 'primary' ? 'Primary' : 'Elementary'
  const ageRange = levelRecord.age_range ?? (levelSlug === 'primary' ? '3–6' : '6–12')

  return (
    <>
      {/* Header */}
      <section style={{
        background: 'var(--r-navy)',
        color: '#fff',
        padding: '3.5rem 0 3rem',
      }}>
        <div className="r-container" style={{ maxWidth: '900px' }}>
          <Link href="/residency/curriculum" style={{
            fontSize: '0.8125rem',
            color: 'var(--r-gold)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            marginBottom: '1.25rem',
          }}>
            &larr; All Levels
          </Link>

          <h1 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            lineHeight: 1.2,
            marginBottom: '0.75rem',
            color: '#fff',
          }}>
            {levelLabel} Curriculum
          </h1>
          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.6)',
          }}>
            Ages {ageRange}
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
                href={`/residency/curriculum/${levelSlug}/${strand.slug}`}
                className="r-card r-strand-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--r-gold-light)',
                  borderRadius: '10px',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    fontSize: '1.25rem',
                    color: 'var(--r-navy)',
                  }}>
                    {STRAND_ICONS[strand.slug] ?? '\u2022'}
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
                  <span style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                    {strand.category_count} {strand.category_count === 1 ? 'category' : 'categories'}
                  </span>
                  <span style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--r-navy)',
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
