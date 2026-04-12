import Link from 'next/link'

export default function ResidencyHome() {
  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'var(--r-navy)',
        color: '#fff',
        padding: '6rem 0 5rem',
        textAlign: 'center',
      }}>
        <div className="r-container" style={{ maxWidth: '800px' }}>
          <p style={{
            color: 'var(--r-gold)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}>
            Montessori Makers Institute
          </p>
          <h1 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            color: '#fff',
          }}>
            The Residency
          </h1>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '2.5rem',
          }}>
            A teacher preparation program built on the belief that Montessori educators deserve rigorous, respectful, and deeply practical training.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/residency/apply" className="r-btn r-btn-gold" style={{ padding: '0.75rem 2rem' }}>
              Apply Now
            </Link>
            <Link href="/residency/curriculum" className="r-btn r-btn-secondary" style={{ padding: '0.75rem 2rem', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
              Explore Curriculum
            </Link>
            <Link href="/residency/auth/login" className="r-btn r-btn-secondary" style={{ padding: '0.75rem 2rem', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
              Resident Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Program Pillars */}
      <section className="r-section">
        <div className="r-container">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem' }}>
            What the Residency Provides
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              {
                title: 'Curriculum Library',
                desc: 'A structured, searchable collection of lessons organized by strand, level, and category \u2014 the full scope of Montessori practice.',
                link: '/residency/curriculum',
              },
              {
                title: 'Resident Portal',
                desc: 'Your personal workspace. Access assigned lessons, submit album entries, and track your progress across every strand.',
                link: '/residency/portal',
              },
              {
                title: 'Mentor Feedback',
                desc: 'Every submission receives written feedback from an experienced mentor teacher. Growth is guided, not guessed.',
                link: '/residency/auth/login',
              },
            ].map((pillar) => (
              <Link href={pillar.link} key={pillar.title} className="r-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'var(--r-gold-light)',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{ width: '20px', height: '20px', background: 'var(--r-gold)', borderRadius: '4px' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{pillar.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)', lineHeight: 1.6 }}>{pillar.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="r-section" style={{ background: 'var(--r-white)' }}>
        <div className="r-container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Built with Intention</h2>
          <p style={{ fontSize: '1rem', color: 'var(--r-text-muted)', lineHeight: 1.8 }}>
            This platform is not a course marketplace. It is the infrastructure for a residency program that takes Montessori teacher preparation seriously &mdash; with structured curriculum, mentorship, and accountability at every stage.
          </p>
        </div>
      </section>
    </>
  )
}
