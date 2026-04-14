import Link from 'next/link'

export default function MentorRecruitmentPage() {
  return (
    <>
      <section style={{
        background: 'var(--r-navy)',
        color: 'var(--r-white)',
        padding: '5rem 0 4rem',
        textAlign: 'center',
      }}>
        <div className="r-container" style={{ maxWidth: '700px' }}>
          <p style={{
            color: 'var(--r-gold)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
          }}>
            Montessori Makers Residency
          </p>
          <h1 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: 'var(--r-white)',
          }}>
            Become a Cohort Guide
          </h1>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
            Your Cohort Guide is the same person who facilitates your twice-monthly seminars and supervises your practicum placement. They know you and your practice across the full arc of the program.
          </p>
        </div>
      </section>

      <section className="r-section" style={{ paddingTop: '3rem' }}>
        <div className="r-container" style={{ maxWidth: '760px' }}>
          <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>What Cohort Guides Do</h2>
            <div style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--r-text)' }}>
              <p style={{ marginBottom: '1rem' }}>
                As an MMR Cohort Guide, you are the primary clinical guide for a developing Montessori educator. Your role bridges the gap between coursework and classroom practice, ensuring residents develop not just technical skill but a deep understanding of how children learn in a prepared environment.
              </p>
              <p>Your responsibilities include:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Hosting or supporting a resident in your classroom during their practicum</li>
                <li>Providing direct feedback on the resident&apos;s teaching at least bi-weekly</li>
                <li>Reviewing album entries and providing structured feedback through the Cohort Guide portal</li>
                <li>Meeting regularly with your resident for reflection and coaching conversations</li>
                <li>Participating in the capstone review process as one of two reviewers</li>
                <li>Collaborating with the program instructor on resident progress</li>
              </ul>
            </div>
          </div>

          <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Time Commitment</h2>
            <div style={{ fontSize: '0.9375rem', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '0.75rem' }}>
                The Cohort Guide role requires approximately <strong>4-6 hours per month</strong> of dedicated work, in addition to hosting the resident in your classroom. This includes:
              </p>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Bi-weekly feedback observations and coaching conversations</li>
                <li>Mid-year and end-of-year formal evaluation forms</li>
                <li>Album entry reviews (30-45 minutes per entry, ongoing)</li>
                <li>Weekly check-in conversations with your resident (15-30 minutes)</li>
                <li>Capstone review at the end of the program (2-3 hours)</li>
              </ul>
            </div>
          </div>

          <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Stipend</h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8 }}>
              MMR Cohort Guides receive a stipend of $1,500 per candidate per practicum year in recognition of the significant time and responsibility involved in guiding a candidate toward certification. The stipend is paid at the end of the practicum year upon completion of all evaluation forms and attendance at the Cohort Guide orientation. This is a professional role, not a volunteer position.
            </p>
          </div>

          <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Qualifications</h2>
            <div style={{ fontSize: '0.9375rem', lineHeight: 1.8 }}>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Hold a recognized Montessori credential (AMI, AMS, or equivalent)</li>
                <li>Minimum 3 years of lead Montessori classroom experience</li>
                <li>Currently teaching or recently retired from a Montessori classroom</li>
                <li>Committed to equity, anti-bias practice, and culturally responsive education</li>
                <li>Willingness to complete the MMR Cohort Guide onboarding process</li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
            <Link href="/residency/mentors/apply" className="r-btn r-btn-primary"
              style={{ padding: '0.875rem 2.5rem', fontSize: '1rem' }}>
              Apply to Be a Cohort Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
