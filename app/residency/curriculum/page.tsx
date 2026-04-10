import { createServerClient } from '@/lib/supabase/server'
import { getStrands, getLevels, getCategories, getLessons } from '@/lib/residency/queries'
import Link from 'next/link'
import EmptyState from '../components/EmptyState'

export const metadata = { title: 'Curriculum Library' }

export default async function CurriculumPage({
  searchParams,
}: {
  searchParams: Promise<{ strand?: string; level?: string; category?: string }>
}) {
  const params = await searchParams
  const supabase = createServerClient()
  const [strands, levels, categories, lessons] = await Promise.all([
    getStrands(supabase),
    getLevels(supabase),
    getCategories(supabase),
    getLessons(supabase, {
      strand: params.strand,
      level: params.level,
      category: params.category,
    }),
  ])

  function filterUrl(key: string, value: string) {
    const p = new URLSearchParams()
    if (params.strand && key !== 'strand') p.set('strand', params.strand)
    if (params.level && key !== 'level') p.set('level', params.level)
    if (params.category && key !== 'category') p.set('category', params.category)
    if (value) p.set(key, value)
    const qs = p.toString()
    return `/residency/curriculum${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="r-section">
      <div className="r-container">
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Curriculum Library</h1>
        <p style={{ color: 'var(--r-text-muted)', marginBottom: '2.5rem', maxWidth: '600px' }}>
          Browse the full scope of the residency curriculum. Filter by strand, level, or lesson category.
        </p>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}>
          {/* Strand filter */}
          <div>
            <label className="r-label">Strand</label>
            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
              <Link href={filterUrl('strand', '')}
                className={`r-badge ${!params.strand ? 'r-badge-strand' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit', border: '1px solid var(--r-border)' }}>
                All
              </Link>
              {strands.map((s: any) => (
                <Link key={s.slug} href={filterUrl('strand', s.slug)}
                  className={`r-badge ${params.strand === s.slug ? 'r-badge-strand' : ''}`}
                  style={{ textDecoration: 'none', color: 'inherit', border: '1px solid var(--r-border)' }}>
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Level filter */}
          <div>
            <label className="r-label">Level</label>
            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
              <Link href={filterUrl('level', '')}
                className={`r-badge ${!params.level ? 'r-badge-level' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit', border: '1px solid var(--r-border)' }}>
                All
              </Link>
              {levels.map((l: any) => (
                <Link key={l.slug} href={filterUrl('level', l.slug)}
                  className={`r-badge ${params.level === l.slug ? 'r-badge-level' : ''}`}
                  style={{ textDecoration: 'none', color: 'inherit', border: '1px solid var(--r-border)' }}>
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div>
            <label className="r-label">Category</label>
            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
              <Link href={filterUrl('category', '')}
                className={`r-badge ${!params.category ? 'r-badge-strand' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit', border: '1px solid var(--r-border)' }}>
                All
              </Link>
              {categories.map((c: any) => (
                <Link key={c.slug} href={filterUrl('category', c.slug)}
                  className={`r-badge ${params.category === c.slug ? 'r-badge-strand' : ''}`}
                  style={{ textDecoration: 'none', color: 'inherit', border: '1px solid var(--r-border)' }}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Lessons grid */}
        {lessons.length === 0 ? (
          <EmptyState
            title="No lessons yet"
            message="Lessons will appear here once the curriculum is populated. Check back soon."
          />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}>
            {lessons.map((lesson: any) => (
              <Link
                key={lesson.id}
                href={`/residency/curriculum/${lesson.id}`}
                className="r-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  {lesson.strand && <span className="r-badge r-badge-strand">{lesson.strand.name}</span>}
                  {lesson.level && <span className="r-badge r-badge-level">{lesson.level.name}</span>}
                </div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{lesson.title}</h3>
                {lesson.description && (
                  <p style={{
                    fontSize: '0.8125rem',
                    color: 'var(--r-text-muted)',
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: 'hidden',
                  }}>
                    {lesson.description}
                  </p>
                )}
                {lesson.category && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.75rem' }}>
                    {lesson.category.name}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
