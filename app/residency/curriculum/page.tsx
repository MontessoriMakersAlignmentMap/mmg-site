import Link from 'next/link'

export const metadata = { title: 'Curriculum Library' }

export default function CurriculumPage() {
  return (
    <>
      {/* Header */}
      <section style={{
        background: 'var(--r-navy)',
        color: 'var(--r-white)',
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
            color: 'var(--r-white)',
          }}>
            The Full Scope of Practice
          </h1>
          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '640px',
          }}>
            Choose your level to explore the curriculum. Each level contains the full
            sequence of strands, categories, and lessons a resident needs to study and master.
          </p>
        </div>
      </section>

      {/* Level cards */}
      <section className="r-section">
        <div className="r-container" style={{ maxWidth: '800px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {/* Primary */}
            <Link
              href="/residency/curriculum/primary"
              className="r-card r-strand-card"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                padding: '2.5rem 2rem',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                background: 'var(--r-gold-light)',
                borderRadius: '14px',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '1.75rem', color: 'var(--r-navy)' }}>3–6</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--r-font-heading)',
                fontSize: '1.75rem',
                color: 'var(--r-navy)',
                marginBottom: '0.75rem',
              }}>
                Primary
              </h2>
              <p style={{
                fontSize: '0.9375rem',
                color: 'var(--r-text-muted)',
                lineHeight: 1.7,
              }}>
                Ages 3 through 6. The foundational Montessori curriculum — Practical Life,
                Sensorial, Language, Math, Behavior, and an Elementary Bridge.
              </p>
            </Link>

            {/* Elementary */}
            <Link
              href="/residency/curriculum/elementary"
              className="r-card r-strand-card"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                padding: '2.5rem 2rem',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                background: 'rgba(14, 26, 122, 0.08)',
                borderRadius: '14px',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '1.75rem', color: 'var(--r-navy)' }}>6–12</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--r-font-heading)',
                fontSize: '1.75rem',
                color: 'var(--r-navy)',
                marginBottom: '0.75rem',
              }}>
                Elementary
              </h2>
              <p style={{
                fontSize: '0.9375rem',
                color: 'var(--r-text-muted)',
                lineHeight: 1.7,
              }}>
                Ages 6 through 12. The expanded curriculum — Primary Foundation,
                Great Lessons, advanced mathematics, research skills, and deeper cultural studies.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
