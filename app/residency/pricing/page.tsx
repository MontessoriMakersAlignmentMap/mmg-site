import Link from 'next/link'
import type { Metadata } from 'next'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'MMR Tuition and Pricing | Montessori Makers Residency',
  description:
    'MMR tuition is set significantly below traditional Montessori credentialing. Payment plans designed for working educators. Equity Fellows program offers full tuition for candidates with the highest structural barriers.',
}

const serif = { fontFamily: 'var(--font-heading)' }

// ── Pricing data ─────────────────────────────────────────────────────────────
// TODO: Replace placeholder amounts below before launch.
const PRIMARY_TUITION = '$3,500'
const PRIMARY_MONTHLY = '$292 / mo'
const PRIMARY_MONTHS = '12 months'
const ELEMENTARY_TUITION = '$4,800'
const ELEMENTARY_MONTHLY = '$300 / mo'
const ELEMENTARY_MONTHS = '16 months'

export default function MMRPricingPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="grain relative overflow-hidden"
        style={{ background: '#0e1a7a', paddingTop: '8rem', paddingBottom: '5rem' }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(214,167,88,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-4xl mx-auto px-6 md:px-10 relative text-center">
          <FadeIn>
            <Link
              href="/residency"
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                marginBottom: '1.75rem',
              }}
            >
              ← Back to Residency
            </Link>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p
              style={{
                color: '#d6a758',
                fontSize: '0.6875rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                fontWeight: 500,
              }}
            >
              Montessori Makers Residency
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1
              style={{
                ...serif,
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                lineHeight: 1.12,
                color: '#fff',
                marginBottom: '1.25rem',
              }}
            >
              Tuition &amp; Payment Options
            </h1>
          </FadeIn>
          <FadeIn delay={0.11}>
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              MMR is priced significantly below traditional Montessori credentialing, and structured
              with payment plans that work for working educators. The Equity Fellows program offers full
              tuition for the educators who face the highest structural barriers.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Track pricing cards ───────────────────────────────────────────────── */}
      <section style={{ background: '#FAF9F7', padding: '5rem 0' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p
              style={{
                color: '#d6a758',
                fontSize: '0.6875rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                fontWeight: 500,
              }}
            >
              Tuition by Track
            </p>
            <h2
              style={{
                ...serif,
                fontSize: 'clamp(1.625rem, 3.5vw, 2.375rem)',
                color: '#0e1a7a',
                marginBottom: '0.75rem',
              }}
            >
              Two credential tracks. One price philosophy.
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.7, maxWidth: '580px', marginBottom: '3rem' }}>
              Both tracks are available as pay-in-full or payment plan. All amounts listed are total
              program tuition. There are no hidden fees, enrollment deposits, or material surcharges.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primary card */}
            <FadeIn delay={0.06}>
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #E2DDD6',
                  borderTop: '3px solid #d6a758',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                <div>
                  <p
                    style={{
                      color: '#d6a758',
                      fontSize: '0.625rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                    }}
                  >
                    Primary Credential
                  </p>
                  <h3 style={{ ...serif, fontSize: '1.625rem', color: '#0e1a7a', lineHeight: 1.15 }}>
                    Primary Track (3–6)
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    9-month program · 224 lessons · 7 strands
                  </p>
                </div>

                <div
                  style={{
                    background: '#F2EDE6',
                    padding: '1.5rem',
                    borderRadius: '2px',
                  }}
                >
                  <p style={{ color: '#0e1a7a', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
                    Pay in Full
                  </p>
                  <p style={{ ...serif, fontSize: '2.75rem', color: '#0e1a7a', lineHeight: 1 }}>
                    {PRIMARY_TUITION}
                  </p>
                  <p style={{ color: '#64748B', fontSize: '0.8125rem', marginTop: '0.4rem' }}>
                    Total program tuition
                  </p>
                </div>

                <div>
                  <p style={{ color: '#0e1a7a', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
                    Payment Plan
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ ...serif, fontSize: '2rem', color: '#0e1a7a' }}>{PRIMARY_MONTHLY}</span>
                  </div>
                  <p style={{ color: '#64748B', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                    Over {PRIMARY_MONTHS}, no interest
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(14,26,122,0.04)',
                    border: '1px solid rgba(14,26,122,0.1)',
                    padding: '1rem 1.25rem',
                    fontSize: '0.8125rem',
                    color: '#374151',
                    lineHeight: 1.7,
                  }}
                >
                  <strong style={{ color: '#0e1a7a' }}>Annual materials intensive:</strong>{' '}
                  $200–$300 per resident, billed separately from tuition.{' '}
                  <span style={{ color: '#64748B' }}>A remote practice option is available at no additional cost for residents who cannot travel.</span>
                </div>

                <div style={{ borderTop: '1px solid #E2DDD6', paddingTop: '1.25rem' }}>
                  <p style={{ color: '#374151', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    Includes full access to all 224 structured lessons across Practical Life, Sensorial,
                    Language, Mathematics, Theory, Behavior Support, and Elementary Bridge.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      'All curriculum materials, digital',
                      'Practicum observation log & support',
                      'MACTE-track credential pathway',
                      'Lifetime cohort access',
                    ].map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                        <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: '#d6a758', flexShrink: 0, marginTop: '0.45rem' }} />
                        <span style={{ color: '#374151', fontSize: '0.875rem' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="https://mmr.montessorimakersgroup.org/apply"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    background: '#0e1a7a',
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.875rem',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                    marginTop: 'auto',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#162270')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#0e1a7a')}
                >
                  Apply to Primary Track
                </a>
              </div>
            </FadeIn>

            {/* Elementary card */}
            <FadeIn delay={0.1}>
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #E2DDD6',
                  borderTop: '3px solid #d6a758',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                <div>
                  <p
                    style={{
                      color: '#d6a758',
                      fontSize: '0.625rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                    }}
                  >
                    Elementary Credential
                  </p>
                  <h3 style={{ ...serif, fontSize: '1.625rem', color: '#0e1a7a', lineHeight: 1.15 }}>
                    Elementary Track (6–12)
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    12-month program · 325 lessons · 11 strands
                  </p>
                </div>

                <div
                  style={{
                    background: '#F2EDE6',
                    padding: '1.5rem',
                    borderRadius: '2px',
                  }}
                >
                  <p style={{ color: '#0e1a7a', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
                    Pay in Full
                  </p>
                  <p style={{ ...serif, fontSize: '2.75rem', color: '#0e1a7a', lineHeight: 1 }}>
                    {ELEMENTARY_TUITION}
                  </p>
                  <p style={{ color: '#64748B', fontSize: '0.8125rem', marginTop: '0.4rem' }}>
                    Total program tuition
                  </p>
                </div>

                <div>
                  <p style={{ color: '#0e1a7a', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
                    Payment Plan
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ ...serif, fontSize: '2rem', color: '#0e1a7a' }}>{ELEMENTARY_MONTHLY}</span>
                  </div>
                  <p style={{ color: '#64748B', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                    Over {ELEMENTARY_MONTHS}, no interest
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(14,26,122,0.04)',
                    border: '1px solid rgba(14,26,122,0.1)',
                    padding: '1rem 1.25rem',
                    fontSize: '0.8125rem',
                    color: '#374151',
                    lineHeight: 1.7,
                  }}
                >
                  <strong style={{ color: '#0e1a7a' }}>Annual materials intensive:</strong>{' '}
                  $200–$300 per resident, billed separately from tuition.{' '}
                  <span style={{ color: '#64748B' }}>A remote practice option is available at no additional cost for residents who cannot travel.</span>
                </div>

                <div style={{ borderTop: '1px solid #E2DDD6', paddingTop: '1.25rem' }}>
                  <p style={{ color: '#374151', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    Includes full access to all 325 lessons across Geography, Biology, History, Language,
                    Mathematics, Geometry, Art, Music, Theory, Behavior Support, and Primary Foundation.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      'All curriculum materials, digital',
                      'Practicum observation log & support',
                      'MACTE-track credential pathway',
                      'Lifetime cohort access',
                    ].map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                        <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: '#d6a758', flexShrink: 0, marginTop: '0.45rem' }} />
                        <span style={{ color: '#374151', fontSize: '0.875rem' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="https://mmr.montessorimakersgroup.org/apply"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    background: '#0e1a7a',
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.875rem',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                    marginTop: 'auto',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#162270')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#0e1a7a')}
                >
                  Apply to Elementary Track
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Equity Fellows ────────────────────────────────────────────────────── */}
      <section
        id="equity-fellows"
        className="grain"
        style={{ background: '#0e1a7a', padding: '5rem 0' }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div
              style={{
                borderLeft: '3px solid #d6a758',
                paddingLeft: '2rem',
                marginBottom: '3rem',
              }}
            >
              <p
                style={{
                  color: '#d6a758',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  marginBottom: '0.75rem',
                }}
              >
                Equity Fellows Program
              </p>
              <h2
                style={{
                  ...serif,
                  fontSize: 'clamp(1.625rem, 3.5vw, 2.5rem)',
                  color: '#fff',
                  lineHeight: 1.15,
                  marginBottom: '1.25rem',
                }}
              >
                Full tuition for the educators who need it most.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.0625rem', lineHeight: 1.8, maxWidth: '620px' }}>
                The Equity Fellows program is not a scholarship you apply for separately. Every qualified
                applicant is automatically considered. Fellows receive full tuition covering the entire
                program cost for one track, along with a practicum placement stipend to offset the cost of
                securing your school placement.
              </p>
            </div>
          </FadeIn>

          <FadeInStagger stagger={0.07} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                label: 'Who qualifies',
                body: 'Educators of color, educators in under-resourced public schools, educators in rural or geographically isolated communities, and first-generation credential seekers. These are not the only paths. They are examples of the structural barriers the fellowship is designed to address.',
              },
              {
                label: 'What it covers',
                body: 'Full program tuition for your chosen track. A practicum stipend to help offset costs of your placement site. Access to all program materials. The same cohort experience as every other MMR resident.',
              },
              {
                label: 'How to apply',
                body: 'There is no separate application. When you complete the MMR application, you will be asked about financial access barriers. Your answers are reviewed by Hannah directly. Decisions are made on a rolling basis with the same rigor and respect applied to every applicant.',
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '1.75rem',
                }}
              >
                <p
                  style={{
                    color: '#d6a758',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: '0.875rem',
                  }}
                >
                  {item.label}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem', lineHeight: 1.75 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </FadeInStagger>

          <FadeIn delay={0.1}>
            <p
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '1.5rem',
                maxWidth: '640px',
              }}
            >
              The number of Equity Fellows per cohort is intentionally limited so that each Fellow receives
              direct support, not just financial relief. If you face barriers to access that are not named
              here, say so in your application. This program is designed to be responsive to the actual
              landscape of who Montessori has excluded, not a fixed checklist.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Payment plan details ──────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '5rem 0' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div>
                <p
                  style={{
                    color: '#d6a758',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    marginBottom: '0.75rem',
                  }}
                >
                  Payment Plans
                </p>
                <h2
                  style={{
                    ...serif,
                    fontSize: 'clamp(1.5rem, 3vw, 2.125rem)',
                    color: '#0e1a7a',
                    marginBottom: '1.25rem',
                    lineHeight: 1.2,
                  }}
                >
                  Built for working educators. Not lump-sum thinking.
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <p style={{ color: '#374151', fontSize: '1rem', lineHeight: 1.8 }}>
                    MMR payment plans are interest-free and structured to run alongside a full-time
                    educator salary. You are not being asked to take on debt. You are being asked to
                    invest in your credential on a schedule that works for your actual life.
                  </p>
                  <p style={{ color: '#374151', fontSize: '1rem', lineHeight: 1.8 }}>
                    Payment plans are available for both tracks at the amounts listed above. If your
                    financial situation requires a different arrangement, say so in your application.
                    The payment plan amounts listed are defaults, not requirements.
                  </p>
                  <p style={{ color: '#374151', fontSize: '1rem', lineHeight: 1.8 }}>
                    All payment plans are managed through the MMR platform. Payments are processed
                    automatically unless you request a manual arrangement. You may pay in full at any
                    point during the program without penalty.
                  </p>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '1.25rem',
                      padding: '0.5rem 0.875rem',
                      background: '#F2EDE6',
                      border: '1px solid #E2DDD6',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span style={{ color: '#64748B', fontSize: '0.75rem', letterSpacing: '0.03em' }}>
                      Secure payment processed via <strong style={{ color: '#374151' }}>Stripe</strong>
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    track: 'Primary (3–6)',
                    months: '9-month program',
                    full: PRIMARY_TUITION,
                    plan: PRIMARY_MONTHLY,
                    planNote: `${PRIMARY_MONTHS}, no interest`,
                  },
                  {
                    track: 'Elementary (6–12)',
                    months: '12-month program',
                    full: ELEMENTARY_TUITION,
                    plan: ELEMENTARY_MONTHLY,
                    planNote: `${ELEMENTARY_MONTHS}, no interest`,
                  },
                ].map((row) => (
                  <div
                    key={row.track}
                    style={{
                      border: '1px solid #E2DDD6',
                      padding: '1.5rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                      }}
                    >
                      <div>
                        <p style={{ ...serif, fontSize: '1.125rem', color: '#0e1a7a' }}>{row.track}</p>
                        <p style={{ color: '#64748B', fontSize: '0.8125rem' }}>{row.months}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                        borderTop: '1px solid #F2EDE6',
                        paddingTop: '1rem',
                      }}
                    >
                      <div>
                        <p style={{ color: '#64748B', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                          Pay in Full
                        </p>
                        <p style={{ ...serif, fontSize: '1.5rem', color: '#0e1a7a' }}>{row.full}</p>
                      </div>
                      <div>
                        <p style={{ color: '#64748B', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                          Monthly Plan
                        </p>
                        <p style={{ ...serif, fontSize: '1.5rem', color: '#0e1a7a' }}>{row.plan}</p>
                        <p style={{ color: '#64748B', fontSize: '0.75rem', marginTop: '0.125rem' }}>{row.planNote}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    background: 'rgba(214,167,88,0.07)',
                    border: '1px solid rgba(214,167,88,0.3)',
                    padding: '1.25rem 1.5rem',
                  }}
                >
                  <p style={{ color: '#0e1a7a', fontSize: '0.875rem', lineHeight: 1.7 }}>
                    <strong>Equity Fellows:</strong> Full tuition covered. Practicum stipend included.
                    Automatically considered with your application.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── What's included ───────────────────────────────────────────────────── */}
      <section style={{ background: '#FAF9F7', padding: '5rem 0' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p
              style={{
                color: '#d6a758',
                fontSize: '0.6875rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 500,
                marginBottom: '0.75rem',
              }}
            >
              What Tuition Covers
            </p>
            <h2
              style={{
                ...serif,
                fontSize: 'clamp(1.625rem, 3.5vw, 2.375rem)',
                color: '#0e1a7a',
                marginBottom: '0.75rem',
              }}
            >
              No surprises. No add-ons.
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.7, maxWidth: '540px', marginBottom: '3rem' }}>
              Tuition covers everything listed below. There are no enrollment fees, no material fees,
              no platform subscription fees during the program.
            </p>
          </FadeIn>

          <FadeInStagger stagger={0.05} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
            {[
              { label: 'Structured Curriculum', body: 'Full access to every lesson in your track, organized by strand and week. All lessons are asynchronous and available for life.' },
              { label: 'Practicum Support', body: 'Observation log templates, practicum hour tracking, and guidance on securing and completing your placement.' },
              { label: 'Theory Strand', body: 'The full theoretical foundation: AMI/AMS-aligned, with MMR\'s equity framework integrated as core content, not as an addendum.' },
              { label: 'Behavior Support Strand', body: 'A full strand on behavior from an equity and neurodivergence lens. Not a module. Not supplemental. Core curriculum.' },
              { label: 'Science of Reading Integration', body: 'Language lessons that include current science of reading research alongside the Montessori reading sequence.' },
              { label: 'MACTE-Track Pathway', body: 'Program structure aligned with MACTE accreditation pathway. Credential recognized across NAMTA-affiliated schools.' },
              { label: 'Cohort Access', body: 'Entry into the MMR cohort Slack, twice-monthly group sessions, and the peer network built through the program.' },
              { label: 'Equity Fellows Review', body: 'Automatic consideration for the Equity Fellows program if you indicate financial access barriers in your application.' },
              { label: 'Hannah Direct', body: 'All curriculum written by Hannah Richardson. Questions and application review go to Hannah directly, not a support team.' },
            ].map((item, i) => (
              <div
                key={item.label}
                style={{
                  border: '1px solid #E2DDD6',
                  marginTop: i < 3 ? 0 : '-1px',
                  marginLeft: i % 3 !== 0 ? '-1px' : 0,
                  padding: '1.75rem',
                  background: '#fff',
                }}
              >
                <p
                  style={{
                    color: '#d6a758',
                    fontSize: '0.625rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: '0.625rem',
                  }}
                >
                  {item.label}
                </p>
                <p style={{ color: '#374151', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '5rem 0' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p
              style={{
                color: '#d6a758',
                fontSize: '0.6875rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 500,
                marginBottom: '0.75rem',
              }}
            >
              Pricing Questions
            </p>
            <h2
              style={{
                ...serif,
                fontSize: 'clamp(1.625rem, 3.5vw, 2.25rem)',
                color: '#0e1a7a',
                marginBottom: '3rem',
              }}
            >
              Common questions about tuition.
            </h2>
          </FadeIn>

          <FadeInStagger stagger={0.06} className="space-y-0">
            {[
              {
                q: 'Can I do both tracks?',
                a: 'Yes. Candidates who complete the Primary track are eligible for the Elementary track at a discounted rate. The Primary Foundation strand in the Elementary curriculum is designed for candidates who have already completed Primary credentialing. Details on the combined track discount are included in your acceptance materials.',
              },
              {
                q: 'Is there an enrollment deposit?',
                a: 'Yes. A small enrollment deposit is required to hold your cohort spot. This deposit is applied to your tuition balance. It is not an additional fee. The deposit amount is listed in your acceptance letter.',
              },
              {
                q: 'What if I can\'t make the monthly payment one month?',
                a: 'Contact the MMR team before the payment date. We will work with you. Missing a payment does not result in program suspension without prior communication. The payment plan is designed for working educators. We understand what real life looks like.',
              },
              {
                q: 'Does MMR accept employer reimbursement or Title I funds?',
                a: 'Yes. MMR can provide the documentation needed for employer reimbursement programs, professional development stipends, and Title I fund applications. Contact us before enrollment if your school requires pre-approval paperwork.',
              },
              {
                q: 'How does MMR compare in cost to traditional programs?',
                a: 'Traditional MACTE-accredited Montessori credentialing programs typically range from $7,000 to $15,000 in tuition, often with additional fees for materials, observations, and certification exams. MMR is substantially below that range. The curriculum is not abbreviated to reach that price. The cost difference reflects a different mission, not a different depth.',
              },
              {
                q: 'Do I need to own Montessori materials to complete the program?',
                a: 'No. You do not need to purchase materials to complete MMR. The program is built around three pathways to materials access so that every resident works with real Montessori materials, regardless of what they own or where they live. Monthly observation visits include a 60-minute supervised materials session at the host school. Once a year, there is an in-person materials intensive held in a fully equipped Montessori classroom. And for residents who cannot travel, a remote practice option provides materials access without requiring in-person attendance. The annual intensive is billed separately from tuition at $200–$300 per resident. The remote option is included at no additional cost. Every resident completes MMR with genuine hands-on materials experience. That is not optional. It is a program requirement.',
              },
              {
                q: 'What is the annual intensive?',
                a: 'Once per year, MMR residents gather in a fully equipped Montessori classroom for a multi-day in-person intensive. The intensive is organized around hands-on materials work: residents present lessons to each other, receive feedback from a trained guide, and work through the physical sequences that are difficult to approximate at a distance. It is also a cohort experience: the in-person time is designed to deepen the relationships that sustain residents through the rest of the program. The intensive typically runs over a weekend. Exact dates and location are confirmed in your cohort welcome materials. For residents who cannot travel, a remote practice option is available. The remote option is structured to cover the same materials sequences through a combination of video demonstration, guided practice at an observation site, and Cohort Guide check-in. Residents who complete the remote option fulfill the same program requirement as those who attend in person. The intensive is billed separately from tuition at $200–$300 per resident. The remote practice option is available at no additional cost.',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: '1px solid #E2DDD6',
                  padding: '1.75rem 0',
                }}
              >
                <p style={{ ...serif, fontSize: '1.125rem', color: '#0e1a7a', marginBottom: '0.75rem' }}>
                  {item.q}
                </p>
                <p style={{ color: '#374151', fontSize: '0.9375rem', lineHeight: 1.8 }}>{item.a}</p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section
        className="grain"
        style={{ background: '#0e1a7a', padding: '5rem 0', textAlign: 'center' }}
      >
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <FadeIn>
            <h2
              style={{
                ...serif,
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                color: '#fff',
                marginBottom: '1rem',
                lineHeight: 1.15,
              }}
            >
              Ready to apply?
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                marginBottom: '2.5rem',
              }}
            >
              Applications are reviewed on a rolling basis. Cohorts are intentionally small.
              If you are ready, apply now. If you have questions first, email us.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="https://mmr.montessorimakersgroup.org/apply"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer"
                style={{
                  background: '#d6a758',
                  color: '#fff',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.875rem 2.25rem',
                  textDecoration: 'none',
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                Apply Now
              </a>
              <Link
                href="/residency"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.875rem 2.25rem',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.25)',
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                }}
              >
                Back to Residency
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
