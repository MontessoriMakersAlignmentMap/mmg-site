import Link from 'next/link'
import type { Metadata } from 'next'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'Montessori Makers Residency',
  description:
    'A MACTE-track Montessori teacher preparation program for working adults. Equity-centered, residency-based, and built for educators who have been shut out of traditional credentialing.',
}

export default function MMRLandingPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="grain relative overflow-hidden"
        style={{ background: '#0e1a7a', paddingTop: '8rem', paddingBottom: '6rem' }}
      >
        {/* subtle radial gradient for depth */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(214,167,88,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          <FadeIn>
            <p
              className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6 font-medium"
            >
              Montessori Makers Group
            </p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                lineHeight: 1.1,
                color: '#fff',
                maxWidth: '820px',
                marginBottom: '1.5rem',
              }}
            >
              Montessori Makers Residency
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.3rem)',
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.75)',
                maxWidth: '620px',
                marginBottom: '2.5rem',
              }}
            >
              A new kind of Montessori teacher preparation. Built for working adults.
              Grounded in equity. Launching fall 2026.
            </p>
          </FadeIn>
          <FadeIn delay={0.14}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="/residency/waitlist"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer"
                style={{
                  display: 'inline-block',
                  background: '#d6a758',
                  color: '#fff',
                  padding: '0.875rem 2rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
              >
                Join the Waitlist
              </a>
              <a
                href="#sample-lessons"
                style={{
                  display: 'inline-block',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  padding: '0.875rem 2rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
              >
                Explore Sample Lessons
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#070e3d',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '1.75rem 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              { value: '516', label: 'Total lessons written' },
              { value: '2', label: 'Certification tracks' },
              { value: '1,080', label: 'Practicum hours across both tracks' },
              { value: 'Fall 2026', label: 'First cohort launches' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: '#d6a758',
                    lineHeight: 1,
                    marginBottom: '0.35rem',
                  }}
                >
                  {stat.value}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Are Building ─────────────────────────────────────────────── */}
      <section style={{ background: '#FAF9F7', padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div style={{ maxWidth: '820px' }}>
            <FadeIn>
              <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6 font-medium">
                What We Are Building
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                  color: '#0e1a7a',
                  lineHeight: 1.2,
                  marginBottom: '2rem',
                }}
              >
                The field has needed this for decades.
              </h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div
                style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.85,
                  color: '#374151',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                <p>
                  I have been inside hundreds of Montessori schools. I have watched extraordinary
                  educators leave the field — not because they were not committed, but because the
                  path to Montessori certification was designed for people with time, money, and
                  proximity to a training center. It was not designed for the working mother in
                  Detroit. It was not designed for the public school teacher in rural Georgia who
                  has been doing Montessori-aligned work for fifteen years without the credential
                  to prove it. It was not designed for the educator of color who found Montessori
                  and immediately saw its liberatory potential but could not get a seat at the
                  training table.
                </p>
                <p>
                  MMR is built for those educators. It is a residency-based, MACTE-track
                  certification program that meets working adults where they are — with an
                  asynchronous curriculum, live monthly cohort sessions, a supported practicum
                  model, and a mentorship relationship with an experienced Montessori guide.
                  It is rigorous. It is not remedial. The depth of this curriculum is not
                  something we are working toward — it is already here, in the 516 lessons
                  written and the framework in place. What we are building now is the
                  infrastructure to deliver it.
                </p>
                <p>
                  The program has three components. The curriculum component asks residents to
                  engage with every lesson in the program through a structured album-building
                  process — reading, reflecting, and writing their understanding of each lesson
                  in their own words, with the help of AI-assisted feedback and mentor review.
                  The practicum component places residents in Montessori environments for the
                  hours required by MACTE, with structured observation protocols, reflective
                  journaling, and a guide who knows how to supervise adult learners. The
                  mentorship component pairs each resident with a mentor who has years of
                  classroom experience and who meets with them monthly to work through what
                  they are seeing and struggling with in their practicum classroom.
                </p>
                <p>
                  The equity framework is not a module. It is woven through every lesson in
                  the curriculum — not as an add-on but as a lens. Every lesson has an Equity
                  Aim and a Neurodivergence section. Every Great Lesson is told with an honest
                  account of whose contributions are in the story. Every theory component
                  includes critical engagement with the historical context in which the
                  Montessori method was developed and the ways that context requires updating.
                  This is not Montessori-lite. It is Montessori taken seriously enough to be
                  held accountable.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Program At A Glance ──────────────────────────────────────────────── */}
      <section style={{ background: '#F2EDE6', padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
              Program At A Glance
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: '#0e1a7a',
                lineHeight: 1.2,
                marginBottom: '3rem',
              }}
            >
              Two tracks. One standard of depth.
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                level: 'Primary 3–6',
                duration: '9-month program',
                details: [
                  '213 lessons across 5 strands',
                  '540 practicum hours',
                  'Monthly live cohort sessions',
                  'AI-reviewed album entries',
                  'Mentor-supported practicum',
                  'MACTE-track certification',
                ],
              },
              {
                level: 'Elementary 6–12',
                duration: '12-month program',
                details: [
                  '303 lessons across 9 strands',
                  '540 practicum hours',
                  'Monthly live cohort sessions',
                  'AI-reviewed album entries',
                  'Mentor-supported practicum',
                  'MACTE-track certification',
                ],
              },
            ].map((track) => (
              <div
                key={track.level}
                style={{
                  background: '#0e1a7a',
                  padding: '2.5rem',
                  borderTop: '3px solid #d6a758',
                }}
              >
                <p
                  style={{
                    color: '#d6a758',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}
                >
                  {track.duration}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    color: '#fff',
                    marginBottom: '1.75rem',
                  }}
                >
                  {track.level}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {track.details.map((detail) => (
                    <li
                      key={detail}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: '0.9375rem',
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#d6a758',
                          flexShrink: 0,
                          marginTop: '0.45rem',
                        }}
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── Who This Is For ──────────────────────────────────────────────────── */}
      <section style={{ background: '#FAF9F7', padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
              Who This Is For
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: '#0e1a7a',
                lineHeight: 1.2,
                maxWidth: '700px',
                marginBottom: '1rem',
              }}
            >
              Built for the educator the field kept turning away.
            </h2>
            <p
              style={{
                color: '#64748B',
                fontSize: '1rem',
                lineHeight: 1.75,
                maxWidth: '620px',
                marginBottom: '3.5rem',
              }}
            >
              MMR does not have cohort stories yet — we are building toward that first
              cohort now. What we do have is a clear picture of who this program was
              designed to serve.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.06}>
            {[
              {
                label: 'The public school teacher who found Montessori',
                body: 'You have been doing Montessori-aligned work in a public or charter school for years. You know the principles. Your classroom reflects them. But you cannot get a seat at a training center that requires you to take six weeks off without pay and travel to a residency you cannot afford. You should have a credential for the work you are already doing.',
              },
              {
                label: 'The working parent who cannot disappear for a summer',
                body: 'Traditional Montessori credentialing was designed for people without caregiving responsibilities. You have them. You are also one of the most committed educators in the field. MMR is built around your life, not the other way around.',
              },
              {
                label: 'The educator of color who found Montessori and felt the gap',
                body: 'You walked into a Montessori training space and saw its potential for liberation — and also saw who was in the room and who was writing the curriculum. MMR was built by someone who saw the same thing and decided to do something about it rather than wait for the field to change on its own.',
              },
              {
                label: 'The experienced guide ready to formalize what they know',
                body: 'You have been practicing Montessori for a decade. Your albums are in your head and your hands. You want the credential — both for the professional recognition and because you know going through a rigorous program will sharpen what you already know. MMR will meet you at your level.',
              },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  background: '#F2EDE6',
                  padding: '2rem',
                  borderTop: '3px solid #d6a758',
                }}
              >
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#0e1a7a',
                    lineHeight: 1.35,
                    marginBottom: '0.875rem',
                  }}
                >
                  {card.label}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#374151', lineHeight: 1.8 }}>
                  {card.body}
                </p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── From the Founder ─────────────────────────────────────────────────── */}
      <section style={{ background: '#0e1a7a', padding: '6rem 0' }} className="grain">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            <FadeIn>
              <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8 font-medium">
                From the Founder
              </p>
              <blockquote
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
                  color: '#fff',
                  lineHeight: 1.5,
                  marginBottom: '2rem',
                  fontStyle: 'normal',
                }}
              >
                &ldquo;I have spent fifteen years inside Montessori schools watching gifted
                educators leave the field because the credential was not designed for their
                lives. MMR is my answer to that. It is the program I would have wanted when
                I was starting out — rigorous, honest about history, built for working
                adults, and serious about the children most Montessori programs still
                do not know how to serve.&rdquo;
              </blockquote>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9375rem' }}>
                    Hannah Richardson
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8125rem', marginTop: '0.2rem' }}>
                    Founder, Montessori Makers Group · AMI USA · BMEF · VMCA
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Sample Lessons teaser ────────────────────────────────────────────── */}
      <section
        id="sample-lessons"
        style={{ background: '#0e1a7a', padding: '6rem 0' }}
        className="grain"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
              Sample Lessons
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                color: '#fff',
                lineHeight: 1.2,
                maxWidth: '700px',
                marginBottom: '1.5rem',
              }}
            >
              This is not a sample of what MMR aspires to be.
              It is what MMR already is.
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                maxWidth: '640px',
                marginBottom: '2.5rem',
              }}
            >
              These are real lessons from the MMR curriculum. Every lesson in the program
              is written at this depth, with this equity lens, and with this level of
              attention to the full range of children in your classroom.
            </p>
            <Link
              href="/residency/sample-lessons"
              style={{
                display: 'inline-block',
                background: '#d6a758',
                color: '#fff',
                padding: '0.875rem 2rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.03em',
              }}
            >
              Read Sample Lessons →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── The Difference ───────────────────────────────────────────────────── */}
      <section style={{ background: '#FAF9F7', padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
              The Difference
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: '#0e1a7a',
                lineHeight: 1.2,
                marginBottom: '3rem',
              }}
            >
              MMR vs. traditional Montessori credentialing
            </h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: '1rem 1.25rem',
                        textAlign: 'left',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#64748B',
                        borderBottom: '2px solid #E2DDD6',
                        width: '22%',
                      }}
                    >
                      Dimension
                    </th>
                    <th
                      style={{
                        padding: '1rem 1.25rem',
                        textAlign: 'left',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#64748B',
                        borderBottom: '2px solid #E2DDD6',
                      }}
                    >
                      Traditional Programs
                    </th>
                    <th
                      style={{
                        padding: '1rem 1.25rem',
                        textAlign: 'left',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#0e1a7a',
                        borderBottom: '2px solid #d6a758',
                      }}
                    >
                      Montessori Makers Residency
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      dimension: 'Cost',
                      traditional: '$8,000–$18,000+ for a full credentialing sequence, often not including materials or housing for residential intensives',
                      mmr: 'Tiered tuition designed for working educators, with an Equity Fellows scholarship for participants who face the highest access barriers',
                    },
                    {
                      dimension: 'Time commitment',
                      traditional: 'Residential summer intensives of 4–8 weeks requiring unpaid leave or job loss; incompatible with most working adults\' lives',
                      mmr: 'Asynchronous coursework accessible around a full-time schedule, with monthly live sessions that do not require travel or extended leave',
                    },
                    {
                      dimension: 'Equity framework',
                      traditional: 'Equity language added to existing curricula as supplemental modules; not embedded in the core content; ABAR lens absent',
                      mmr: 'Every lesson in the curriculum carries an explicit Equity Aim. The ABAR framework is structural, not supplemental.',
                    },
                    {
                      dimension: 'Neurodivergence',
                      traditional: 'Neurodivergence addressed in optional add-on workshops, if at all; assumed to be an accommodation category rather than a design lens',
                      mmr: 'Every lesson includes a Neurodivergence and Behavior section written at the same depth as the rest of the lesson, for every child — not just those with diagnoses',
                    },
                    {
                      dimension: 'Practicum model',
                      traditional: 'Practicum placement arranged independently by the candidate, often with limited institutional support or supervision quality',
                      mmr: 'Supported practicum model with structured observation protocols, reflective journaling, and a mentor who knows how to supervise adult professional learners',
                    },
                  ].map((row, i) => (
                    <tr
                      key={row.dimension}
                      style={{ borderBottom: '1px solid #E2DDD6', background: i % 2 === 0 ? '#fff' : '#FAF9F7' }}
                    >
                      <td
                        style={{
                          padding: '1.25rem',
                          fontWeight: 600,
                          color: '#0e1a7a',
                          verticalAlign: 'top',
                        }}
                      >
                        {row.dimension}
                      </td>
                      <td style={{ padding: '1.25rem', color: '#64748B', lineHeight: 1.7, verticalAlign: 'top' }}>
                        {row.traditional}
                      </td>
                      <td
                        style={{
                          padding: '1.25rem',
                          color: '#374151',
                          lineHeight: 1.7,
                          verticalAlign: 'top',
                          borderLeft: '3px solid #d6a758',
                        }}
                      >
                        {row.mmr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section style={{ background: '#F2EDE6', padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
              Frequently Asked Questions
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: '#0e1a7a',
                lineHeight: 1.2,
                marginBottom: '3rem',
              }}
            >
              What you need to know
            </h2>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10" stagger={0.05}>
            {[
              {
                q: 'Is MMR accredited yet?',
                a: 'MMR is currently in development toward MACTE accreditation. MACTE — the Montessori Accreditation Council for Teacher Education — is the primary accrediting body for Montessori teacher preparation programs in the United States. We are building the program to meet MACTE standards from the ground up, so that the path to accreditation is a documentation process, not a redesign.',
              },
              {
                q: 'What is MACTE accreditation and why does it matter?',
                a: 'MACTE accreditation is the credential recognized by the Association Montessori Internationale and most reputable Montessori schools when hiring. A MACTE-accredited program has been reviewed against rigorous standards for curriculum depth, practicum hours, faculty qualifications, and program governance. We are pursuing this credential because the educators who complete MMR deserve to be taken seriously by every school they apply to.',
              },
              {
                q: 'What does a typical week look like for a resident?',
                a: 'Most residents spend four to six hours per week on curriculum work — reading, observing, and writing album entries. Practicum hours happen in a school environment and are arranged in coordination with your mentor. Monthly live cohort sessions are two to three hours long. The program is designed to be completed alongside a full-time teaching position, not instead of one.',
              },
              {
                q: 'Do I need prior Montessori experience to apply?',
                a: 'Prior Montessori classroom experience is helpful but not required. What we are looking for is serious educators who have encountered Montessori principles, believe in their potential, and are ready to engage with the curriculum at a graduate level. Curiosity and commitment matter more than credentials at the point of application.',
              },
              {
                q: 'What happens at the end of the program?',
                a: 'Residents who complete all components — curriculum, practicum, and mentorship — receive a certificate of completion from Montessori Makers Residency. When MACTE accreditation is conferred, all MMR graduates will receive updated documentation reflecting that credential. We are committed to honoring the work of every resident who completes the program.',
              },
              {
                q: 'How does the Equity Fellows scholarship work?',
                a: 'The Equity Fellows program is designed for educators who face the highest structural access barriers to Montessori credentialing — typically educators of color, educators in under-resourced public schools, and educators in rural or geographically isolated communities. Fellows receive full or partial tuition support. Applications for the first cohort of Fellows will open alongside general applications in 2026.',
              },
              {
                q: 'What is the cost?',
                a: 'Full tuition details will be published when applications open. We are committed to pricing that is significantly below the cost of traditional Montessori credentialing programs, with a transparent tiered structure. The Equity Fellows scholarship covers full tuition for qualifying applicants.',
              },
            ].map((faq) => (
              <div key={faq.q}>
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#0e1a7a',
                    marginBottom: '0.625rem',
                    lineHeight: 1.4,
                  }}
                >
                  {faq.q}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#374151', lineHeight: 1.8 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────────── */}
      <section
        style={{ background: '#0e1a7a', padding: '6rem 0' }}
        className="grain"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10" style={{ textAlign: 'center' }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                color: '#fff',
                lineHeight: 1.2,
                marginBottom: '1.25rem',
              }}
            >
              MMR is forming its first cohort for fall 2026.
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                maxWidth: '640px',
                margin: '0 auto 2.5rem',
              }}
            >
              If you are a working educator who has been waiting for a Montessori
              training program that was actually built for you, this is it.
            </p>
            <a
              href="/residency/waitlist"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer"
              style={{
                display: 'inline-block',
                background: '#d6a758',
                color: '#fff',
                padding: '1rem 2.5rem',
                fontSize: '0.9375rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textDecoration: 'none',
              }}
            >
              Join the Waitlist
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
