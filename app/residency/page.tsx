import Link from 'next/link'
import type { Metadata } from 'next'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'Montessori Makers Residency — Equity-Centered Montessori Teacher Preparation',
  description:
    'A Montessori teacher preparation program built for the educators the field has always needed. Primary and Elementary credentials. Paid practicum. Equity embedded throughout. Launching fall 2026.',
}

const serif = { fontFamily: 'var(--font-heading)' }

export default function MMRLandingPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="grain relative overflow-hidden"
        style={{ background: '#0e1a7a', paddingTop: '8rem', paddingBottom: '6rem' }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(214,167,88,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          <FadeIn>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6 font-medium">
              Montessori Makers Group
            </p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1
              style={{
                ...serif,
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                lineHeight: 1.1,
                color: '#fff',
                maxWidth: '820px',
                marginBottom: '1.25rem',
              }}
            >
              Montessori Makers Residency
            </h1>
          </FadeIn>
          <FadeIn delay={0.09}>
            <p
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.3rem)',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '680px',
                marginBottom: '1.25rem',
                fontWeight: 500,
              }}
            >
              A teacher preparation program built for the educators Montessori has always needed but never trained.
            </p>
          </FadeIn>
          <FadeIn delay={0.11}>
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.65)',
                maxWidth: '640px',
                marginBottom: '2.5rem',
              }}
            >
              Traditional Montessori credentialing is expensive, inaccessible, and built for a demographic that does
              not reflect the children and communities that need Montessori most. MMR exists to change that.
            </p>
          </FadeIn>
          <FadeIn delay={0.14}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://mmr.montessorimakersgroup.org/apply"
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
                  minHeight: '44px',
                }}
              >
                Apply Now
              </a>
              <Link
                href="/residency/sample-lessons"
                style={{
                  display: 'inline-block',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  padding: '0.875rem 2rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  minHeight: '44px',
                }}
              >
                Explore the Curriculum
              </Link>
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
              { value: '549', label: 'Total lessons written' },
              { value: '2', label: 'Certification tracks' },
              { value: '18', label: 'Curriculum strands across both tracks' },
              { value: 'Fall 2026', label: 'First cohort launches' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p
                  style={{
                    ...serif,
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
                  ...serif,
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
                  I have been inside hundreds of Montessori schools. I have watched extraordinary educators leave the
                  field — not because they were not committed, but because the path to Montessori certification was
                  designed for people with time, money, and proximity to a training center. It was not designed for the
                  working mother in Detroit. It was not designed for the public school teacher in rural Georgia who has
                  been doing Montessori-aligned work for fifteen years without the credential to prove it. It was not
                  designed for the educator of color who found Montessori and immediately saw its liberatory potential
                  but could not get a seat at the training table.
                </p>
                <p>
                  MMR is built for those educators. It is a residency-based, MACTE-track certification program that
                  meets working adults where they are — with an asynchronous curriculum, live monthly cohort sessions,
                  a supported and paid practicum model, and a mentorship relationship with an experienced Montessori
                  guide. It is rigorous. It is not remedial. The depth of this curriculum is not something we are
                  working toward — it is already here, in the 549 lessons written and the framework in place.
                </p>
                <p>
                  The program has three components. The curriculum component asks residents to engage with every lesson
                  through a structured album-building process — reading, reflecting, and writing their understanding of
                  each lesson in their own words, with AI-assisted feedback and mentor review. The practicum component
                  places residents in Montessori environments with structured observation protocols, reflective
                  journaling, and a guide who knows how to supervise adult learners. Practicum placements are paid. The
                  mentorship component pairs each resident with a mentor who has real classroom experience and meets
                  with them monthly to work through what they are seeing and struggling with in their practicum classroom.
                </p>
                <p>
                  The equity framework is not a module. It is woven through every lesson in the curriculum — not as an
                  add-on but as a lens. Every lesson carries an explicit Equity Aim and a Neurodivergence section. The
                  behavior support strand runs through the full program, alongside a science of reading integration that
                  treats phonological awareness and decoding as Montessori work, not as remediation. Every Great Lesson
                  is told with an honest account of whose contributions are in the story. This is not Montessori-lite.
                  It is Montessori taken seriously enough to be held accountable.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── The Program ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#F2EDE6', padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
              The Program
            </p>
            <h2
              style={{
                ...serif,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: '#0e1a7a',
                lineHeight: 1.2,
                marginBottom: '0.75rem',
              }}
            >
              Two tracks. One standard of depth.
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.7, maxWidth: '600px', marginBottom: '3rem' }}>
              Both tracks share the same structural rigor, the same equity framework, and the same
              expectation that you will finish knowing what you are doing and why.
            </p>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.06}>
            {[
              {
                level: 'Primary 3–6',
                credential: 'Primary Montessori Credential',
                duration: '9-month program',
                lessons: '224 lessons',
                strands: [
                  'Practical Life',
                  'Sensorial',
                  'Language',
                  'Mathematics',
                  'Theory',
                  'Behavior Support',
                  'Elementary Bridge',
                ],
                features: [
                  'Monthly live cohort seminars',
                  'Structured observation visits',
                  'Paid practicum placement',
                  'Album entries reviewed by mentor and AI',
                  'MACTE-track certification',
                ],
              },
              {
                level: 'Elementary 6–12',
                credential: 'Elementary Montessori Credential',
                duration: '12-month program',
                lessons: '325 lessons',
                strands: [
                  'Geography',
                  'Biology',
                  'History',
                  'Language',
                  'Mathematics',
                  'Geometry',
                  'Art',
                  'Music',
                  'Theory',
                  'Behavior Support',
                  'Primary Foundation',
                ],
                features: [
                  'Monthly live cohort seminars',
                  'Structured observation visits',
                  'Paid practicum placement',
                  'Album entries reviewed by mentor and AI',
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
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                }}
              >
                <div>
                  <p
                    style={{
                      color: '#d6a758',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {track.duration}
                  </p>
                  <h3
                    style={{
                      ...serif,
                      fontSize: '1.75rem',
                      color: '#fff',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {track.level}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8125rem' }}>{track.credential}</p>
                </div>

                <div
                  style={{
                    background: 'rgba(214,167,88,0.1)',
                    border: '1px solid rgba(214,167,88,0.25)',
                    padding: '0.875rem 1rem',
                    display: 'inline-block',
                  }}
                >
                  <p style={{ color: '#d6a758', fontSize: '1.375rem', fontWeight: 700, ...serif, lineHeight: 1 }}>
                    {track.lessons}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                    across {track.strands.length} curriculum strands
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Curriculum Strands
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {track.strands.map((strand) => (
                      <span
                        key={strand}
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.75)',
                          fontSize: '0.75rem',
                          padding: '0.3rem 0.65rem',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {strand}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Program Structure
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {track.features.map((feature) => (
                      <li
                        key={feature}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          color: 'rgba(255,255,255,0.75)',
                          fontSize: '0.9rem',
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: '#d6a758',
                            flexShrink: 0,
                            marginTop: '0.5rem',
                          }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <Link
                    href="/residency/pricing"
                    style={{
                      color: '#d6a758',
                      fontSize: '0.8125rem',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                    }}
                  >
                    View tuition & payment options →
                  </Link>
                </div>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── Who This Is For ──────────────────────────────────────────────────── */}
      <section style={{ background: '#0e1a7a', padding: '6rem 0' }} className="grain">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
              Who This Is For
            </p>
            <h2
              style={{
                ...serif,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: '#fff',
                lineHeight: 1.2,
                maxWidth: '700px',
                marginBottom: '1rem',
              }}
            >
              This program was built for you specifically.
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '1rem',
                lineHeight: 1.75,
                maxWidth: '640px',
                marginBottom: '3.5rem',
              }}
            >
              Not as a workaround. Not as an alternative for people who could not get into a real program.
              As the program the field should have built decades ago.
            </p>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.06}>
            {[
              {
                label: 'Educators of color who have been told Montessori is not for their communities',
                body: 'You found Montessori and saw its liberatory potential immediately. You also saw who was in the training room, who wrote the curriculum, and who the program was designed around. MMR was built by someone who made the same observation and decided the answer was not to wait for the field to change.',
              },
              {
                label: 'Paraeducators and teaching assistants already doing the work',
                body: 'You have been in a Montessori classroom for years. You know more than the title on your badge suggests. The credential has felt out of reach — financially, logistically, structurally. MMR was designed to close that gap, not explain it away.',
              },
              {
                label: 'Public and charter school teachers transitioning into Montessori roles',
                body: 'You have been doing Montessori-aligned work in a public school and you need the credential that reflects it. Traditional programs were not built for your schedule, your budget, or your school community. MMR is.',
              },
              {
                label: 'Career changers with deep community roots entering education',
                body: 'You are coming from social work, from community organizing, from health care, from somewhere that taught you what children and families actually need. You bring something most credentialed educators do not have. MMR will give you the Montessori framework to build on what you already know.',
              },
              {
                label: 'Bilingual and multilingual educators',
                body: 'The children who need Montessori most are often children whose home languages are not the language of instruction. You are fluent in the bridging work that takes. MMR was written with that reality in mind — not as a footnote, but as part of the curriculum itself.',
              },
              {
                label: 'Anyone who looked at traditional credentialing and saw a system designed to keep them out',
                body: 'You are not wrong about what you saw. The access barriers to Montessori credentialing are not accidental. MMR is a direct response to that history — built with intentional pricing, an asynchronous format, a paid practicum model, and an equity scholarship for the educators who face the highest barriers.',
              },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderTop: '3px solid #d6a758',
                  padding: '2rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#fff',
                    lineHeight: 1.35,
                    marginBottom: '0.875rem',
                  }}
                >
                  {card.label}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8 }}>
                  {card.body}
                </p>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ── What Makes MMR Different ─────────────────────────────────────────── */}
      <section style={{ background: '#FAF9F7', padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
              What Makes MMR Different
            </p>
            <h2
              style={{
                ...serif,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: '#0e1a7a',
                lineHeight: 1.2,
                marginBottom: '3.5rem',
                maxWidth: '600px',
              }}
            >
              Five things no other Montessori program offers.
            </h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div style={{ maxWidth: '820px', display: 'flex', flexDirection: 'column' }}>
              {[
                {
                  num: '01',
                  title: 'Equity is the curriculum, not a module.',
                  body: 'Every lesson in the MMR curriculum carries two things that no other program includes as standard: an Equity Aim and a Neurodivergence section. These are not add-ons. They are part of the lesson structure itself, written at the same depth as the material presentation and the theory. The equity framework in MMR is not a weekend workshop or a supplemental reading list. It is the architecture.',
                },
                {
                  num: '02',
                  title: 'The practicum is paid.',
                  body: 'Traditional Montessori programs expect candidates to secure unpaid observation hours in schools that often have no interest in supporting adult learners. MMR uses a supported, paid practicum model. Residents are placed in Montessori environments where they are treated as professionals in formation — not visitors with clipboards. The practicum is structured, observed, and mentored. And you are compensated for the work you do in it.',
                },
                {
                  num: '03',
                  title: 'Cross-plane bridge lessons that no other program offers.',
                  body: 'The Primary track includes an Elementary Bridge strand — a set of lessons that prepares Primary guides to understand what children are moving toward, not just where they are. The Elementary track includes a Primary Foundation strand for the same reason. This is deliberate. Guides who understand the full arc of the Montessori sequence make different decisions in the classroom. No other credentialing program builds this in.',
                },
                {
                  num: '04',
                  title: 'Behavior support and the science of reading are core curriculum.',
                  body: 'Both tracks include a dedicated Behavior Support strand — not as crisis management, but as a Montessori framework for understanding what behavior communicates and how the environment responds. The Language strand integrates the science of reading throughout, treating phonological awareness and systematic decoding as Montessori work rather than a separate remedial intervention. These are the two areas where Montessori classrooms most often struggle. MMR addresses them directly.',
                },
                {
                  num: '05',
                  title: 'The price reflects the mission.',
                  body: "MMR is priced significantly below traditional Montessori credentialing programs. It is structured with payment plans that work for working educators — not as a courtesy, but as a design decision. The Equity Fellows scholarship offers full tuition for candidates who face the highest structural access barriers. The price of this program is not an accident. It is a statement about who Montessori is actually for.",
                },
              ].map((item, i) => (
                <div
                  key={item.num}
                  style={{
                    display: 'flex',
                    gap: '2rem',
                    padding: '2.5rem 0',
                    borderBottom: i < 4 ? '1px solid #E2DDD6' : 'none',
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      color: '#d6a758',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      flexShrink: 0,
                      paddingTop: '0.35rem',
                      minWidth: '28px',
                    }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontSize: '1.0625rem',
                        fontWeight: 600,
                        color: '#0e1a7a',
                        marginBottom: '0.75rem',
                        lineHeight: 1.35,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9375rem', color: '#374151', lineHeight: 1.85 }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── The Curriculum ───────────────────────────────────────────────────── */}
      <section
        id="sample-lessons"
        style={{ background: '#0e1a7a', padding: '6rem 0' }}
        className="grain"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
              The Curriculum
            </p>
            <h2
              style={{
                ...serif,
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                color: '#fff',
                lineHeight: 1.2,
                maxWidth: '700px',
                marginBottom: '1.5rem',
              }}
            >
              Read a real lesson before you apply.
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                maxWidth: '640px',
                marginBottom: '2.5rem',
              }}
            >
              The sample lessons below are not previews of what MMR is working toward. They are
              what MMR is right now — written at full depth, with the equity lens and neurodivergence
              integration built in from the start. Read one before you decide whether to apply.
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
                minHeight: '44px',
              }}
            >
              Read Sample Lessons →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Requirements ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#F2EDE6', padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <FadeIn>
              <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
                Admissions Requirements
              </p>
              <h2
                style={{
                  ...serif,
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  color: '#0e1a7a',
                  lineHeight: 1.2,
                  marginBottom: '2rem',
                }}
              >
                What we are looking for.
              </h2>
              <div
                style={{
                  fontSize: '1.0rem',
                  lineHeight: 1.85,
                  color: '#374151',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                <p>
                  Applicants to MMR need either a bachelor&rsquo;s degree or an associate degree combined with
                  at least three years of documented experience working with children in an educational setting.
                  We are looking for people who are serious about this work — not people who have already
                  completed it.
                </p>
                <p>
                  We require a demonstrated commitment to equity and justice-centered education. This does not
                  mean you have to have the vocabulary or the credential. It means you have to be honest in your
                  application about what you believe and why you are here.
                </p>
                <p>
                  Applicants must have access to an approved Montessori observation site for the curriculum
                  component and must be able to secure a paid practicum placement. We support residents in
                  identifying practicum sites and will not leave you to navigate that alone.
                </p>
                <p>
                  The MMR curriculum is written at a graduate reading level. Applicants need English language
                  proficiency sufficient for graduate-level reading and writing. If that is a barrier for you,
                  reach out to us before you apply — we want to know.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div style={{ paddingTop: '3.5rem' }}>
                <div
                  style={{
                    background: '#0e1a7a',
                    padding: '2.5rem',
                    borderTop: '3px solid #d6a758',
                    marginBottom: '1.5rem',
                  }}
                >
                  <p
                    style={{
                      color: '#d6a758',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                    }}
                  >
                    Requirements at a Glance
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    {[
                      "Bachelor's degree — or associate degree plus 3+ years working with children",
                      'Demonstrated commitment to equity and justice-centered education',
                      'Access to an approved Montessori observation site',
                      'Ability to secure a paid practicum placement',
                      'English proficiency for graduate-level reading and writing',
                    ].map((req) => (
                      <li
                        key={req}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          color: 'rgba(255,255,255,0.8)',
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: '#d6a758',
                            flexShrink: 0,
                            marginTop: '0.55rem',
                          }}
                        />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.7 }}>
                  Not sure if you qualify? Reach out before you apply. We would rather have that conversation
                  than have you talk yourself out of something you should be doing.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────────── */}
      <section style={{ background: '#FAF9F7', padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
              Tuition & Pricing
            </p>
            <h2
              style={{
                ...serif,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                color: '#0e1a7a',
                lineHeight: 1.2,
                marginBottom: '2rem',
                maxWidth: '560px',
              }}
            >
              Priced for the educators this program is actually for.
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: '#374151' }}>
                MMR tuition is set significantly below the cost of traditional Montessori credentialing programs.
                That is a deliberate design decision, not a compromise on quality. The curriculum is as deep as any
                program in the field. The price reflects a belief that access to Montessori credentialing should not
                require financial sacrifice on the scale the field has historically demanded.
              </p>

              <div
                style={{
                  border: '2px solid #d6a758',
                  padding: '1.75rem 2rem',
                  background: '#fffdf7',
                }}
              >
                <p
                  style={{
                    color: '#8A6014',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  Equity Fellows Scholarship
                </p>
                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#374151' }}>
                  The Equity Fellows program provides full or partial tuition for educators who face the highest
                  structural access barriers to Montessori credentialing — typically educators of color, educators
                  in under-resourced public schools, and educators in rural or geographically isolated communities.
                  Fellows are selected as part of the standard admissions process. Every qualified applicant is
                  automatically considered.
                </p>
              </div>

              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#374151' }}>
                Payment plans are available for both tracks and are structured to work alongside a full-time
                educator salary. Full tuition details and payment options are on the pricing page.
              </p>

              <Link
                href="/residency/pricing"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#0e1a7a',
                  color: '#fff',
                  padding: '0.875rem 2rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                  width: 'fit-content',
                  minHeight: '44px',
                }}
              >
                View full pricing & payment options →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── A Note From Hannah ───────────────────────────────────────────────── */}
      {/*
        PLACEHOLDER: This section is reserved for Hannah's personal statement.
        Length: 3–4 paragraphs.
        Tone: Personal, direct, grounded in Hannah's specific experience and motivation for building MMR.
        Content suggestions:
          - Why she built this specifically, not a program like it
          - Something she witnessed in a real school that crystallized the need
          - What she wants the first cohort to know before they begin
          - Her commitment to the educators who complete it
        When ready, replace the placeholder content below with Hannah's text.
      */}
      <section style={{ background: '#0e1a7a', padding: '6rem 0' }} className="grain">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div style={{ maxWidth: '780px' }}>
            <FadeIn>
              <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8 font-medium">
                A Note From Hannah
              </p>

              {/* PLACEHOLDER CONTENT — replace with Hannah's personal statement */}
              <div
                style={{
                  border: '1px solid rgba(214,167,88,0.3)',
                  padding: '2.5rem',
                  background: 'rgba(214,167,88,0.05)',
                  marginBottom: '2rem',
                }}
              >
                <p
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.8125rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  Placeholder — Hannah&rsquo;s personal statement goes here
                </p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9375rem', lineHeight: 1.8, fontStyle: 'italic' }}>
                  3–4 paragraphs. Personal, direct, and grounded in Hannah&rsquo;s specific experience
                  and motivation for building MMR. Written in first person. Not a marketing statement —
                  a real note to the educator who is reading this page and deciding whether to apply.
                </p>
              </div>
              {/* END PLACEHOLDER */}

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9375rem' }}>
                    Hannah Richardson
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8125rem', marginTop: '0.2rem' }}>
                    Founder, Montessori Makers Group · Founder, Montessori Makers Residency
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
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
                ...serif,
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
                q: 'What does a typical week look like for a resident?',
                a: 'Most residents spend four to six hours per week on curriculum work — reading, observing, and writing album entries. Practicum hours happen in a school environment and are arranged in coordination with your mentor. Monthly live cohort sessions are two to three hours long. The program is designed to be completed alongside a full-time teaching position, not instead of one.',
              },
              {
                q: 'Do I need prior Montessori experience to apply?',
                a: 'Prior Montessori classroom experience is helpful but not required. What we are looking for is serious educators who have encountered Montessori principles, believe in their potential, and are ready to engage with the curriculum at a graduate level. Curiosity and commitment matter more than credentials at the point of application.',
              },
              {
                q: 'What happens at the end of the program?',
                a: 'Residents who complete all components — curriculum, practicum, and mentorship — receive a certificate of completion from Montessori Makers Residency. When MACTE accreditation is conferred, all MMR graduates will receive updated documentation reflecting that credential.',
              },
              {
                q: 'How does the Equity Fellows scholarship work?',
                a: 'The Equity Fellows program is designed for educators who face the highest structural access barriers to Montessori credentialing. Fellows receive full or partial tuition support. Every qualified applicant is automatically considered — there is no separate application.',
              },
              {
                q: 'When does the first cohort begin?',
                a: 'The first MMR cohort launches fall 2026. Applications open in early 2026. If you want to be notified when applications open, use the Apply Now button to get on the list.',
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

      {/* ── Apply Now (Final CTA) ─────────────────────────────────────────────── */}
      <section style={{ background: '#0e1a7a', padding: '6rem 0' }} className="grain">
        <div className="max-w-7xl mx-auto px-6 md:px-10" style={{ textAlign: 'center' }}>
          <FadeIn>
            <h2
              style={{
                ...serif,
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
                color: 'rgba(255,255,255,0.65)',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                maxWidth: '600px',
                margin: '0 auto 2.5rem',
              }}
            >
              If you are a working educator who has been waiting for a Montessori training
              program that was actually built for you, this is it. Applications open early 2026.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://mmr.montessorimakersgroup.org/apply"
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
                  minHeight: '44px',
                }}
              >
                Apply Now
              </a>
              <Link
                href="/residency/sample-lessons"
                style={{
                  display: 'inline-block',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  padding: '1rem 2.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  minHeight: '44px',
                }}
              >
                Explore the Curriculum
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
