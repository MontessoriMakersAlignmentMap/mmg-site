import Link from 'next/link'
import Image from 'next/image'
import TuitionCards from './components/TuitionCards'

const differentiators = [
  {
    num: '01',
    headline: 'Equity is the curriculum, not a module.',
    body: 'Every lesson in MMR has an equity aim and a neurodivergence section built into its structure as standard elements, not additions. Residents do not study Montessori and then receive equity training separately. The equity framework is woven into every presentation, every strand, every week from September through capstone. The reading list includes Hammond, Love, Derman-Sparks, Delpit, and Dunbar-Ortiz because those authors are not supplementary to Montessori preparation. They are essential to it.',
  },
  {
    num: '02',
    headline: 'The practicum pays.',
    body: 'MMR residents do not student teach for free. The practicum phase places residents in partner schools as paid guides or assistant guides earning a living wage while completing their supervised practice hours. This is how you make a credential accessible to people who cannot afford to work for nothing. It is also how you make sure residents are treated as professional educators in formation rather than free labor.',
  },
  {
    num: '03',
    headline: 'No other program does this.',
    body: 'MMR Primary residents complete a five-lesson Elementary Bridge strand in May that orients them to the second plane child and where their students are going. MMR Elementary residents begin with a five-lesson Primary Foundation strand that grounds them in the first plane formation their students carry into the elementary classroom. This cross-plane understanding is standard in MMR and non-existent everywhere else.',
  },
  {
    num: '04',
    headline: 'Behavior and literacy are built in.',
    body: 'The MMR curriculum includes a dedicated Behavior Support strand at both levels covering trauma-informed practice, neurodivergent profiles, restorative approaches, and family partnership. The Primary Language strand integrates science of reading research and structured literacy alongside the Montessori language sequence. Residents graduate prepared for the classrooms that actually exist, not idealized environments.',
  },
  {
    num: '05',
    headline: 'Your Cohort Guide knows you.',
    body: 'The same AMI-trained guide who facilitates your twice-monthly seminars supervises your practicum placement. This is not a coincidence. It is a design decision. By the time a resident enters the classroom their Cohort Guide has been with them for nine months or twelve months. They know the resident\'s strengths, their growing edges, their classroom context, and their formation as a guide. The feedback is specific because the relationship is real.',
  },
  {
    num: '06',
    headline: 'The price reflects who this is for.',
    body: 'Primary credential is $5,000 total with a nine-month payment plan of $556 per month. Elementary credential is $7,000 total with a twelve-month payment plan of $583 per month. These prices were set deliberately to make the program accessible to working educators without savings buffers. MMR is priced at what it actually costs to run a serious program. If the monthly payment is still out of reach, contact us directly. We will figure it out together.',
  },
]

// CSS custom properties used by residency.css classes (r-card, r-btn-gold, etc.)
// must be defined on an ancestor element. The `.residency-root` wrapper is only
// added by layout.tsx for portal routes — the marketing page gets a bare fragment.
// Defining the vars on this div scopes them correctly without affecting global layout.
const residencyVars = {
  '--r-navy': '#0e1a7a',
  '--r-navy-light': '#1a2a9a',
  '--r-gold': '#d6a758',
  '--r-gold-light': '#f5e8cc',
  '--r-cream': '#faf8f4',
  '--r-white': '#ffffff',
  '--r-text': '#1a1a2e',
  '--r-text-muted': '#5a5a7a',
  '--r-border': '#e2ddd6',
  '--r-bg-muted': '#f3f4f6',
  '--r-navy-shadow': 'rgba(14,26,122,0.06)',
  '--r-navy-tint': 'rgba(14,26,122,0.08)',
  '--r-navy-ring': 'rgba(14,26,122,0.08)',
  '--r-font-heading': "'TheSeasons', Georgia, 'Times New Roman', serif",
} as React.CSSProperties

export default function ResidencyHome() {
  return (
    <div style={residencyVars}>
      {/* HERO */}
      <section style={{
        background: 'var(--r-navy)',
        color: 'var(--r-white)',
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
            color: 'var(--r-white)',
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
            <Link href="/residency/curriculum" className="r-btn r-btn-secondary" style={{ padding: '0.75rem 2rem', background: 'transparent', color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}>
              Explore Curriculum
            </Link>
            <Link href="/matchhub/pipeline" className="r-btn r-btn-secondary" style={{ padding: '0.75rem 2rem', background: 'transparent', color: 'rgba(214,167,88,0.9)', borderColor: 'rgba(214,167,88,0.4)' }}>
              Placement Pathway
            </Link>
            <Link href="/residency/auth/login" className="r-btn r-btn-secondary" style={{ padding: '0.75rem 2rem', background: 'transparent', color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}>
              Resident Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Residency path animation */}
      <div style={{ width: '100%', height: 240, background: 'var(--r-navy)' }}>
        <iframe src="/embed/residency-path.html" style={{ width: '100%', height: '100%', border: 0, display: 'block' }} title="Residency path" loading="lazy" />
      </div>

      {/* WHY MMR EXISTS */}
      <section style={{ background: 'var(--r-navy)', color: 'var(--r-white)', padding: '5rem 0' }}>
        <div className="r-container" style={{ maxWidth: '760px' }}>
          <p style={{
            color: 'var(--r-gold)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '1.25rem',
          }}>
            Why MMR Exists
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.82)' }}>
              Montessori teacher preparation has a problem. It is expensive, inaccessible, and built for a demographic that does not reflect the children and communities that need Montessori most. The people doing the most important work in Montessori classrooms right now, paraeducators, teaching assistants, career changers, public school teachers navigating under-resourced environments with children who have been failed by every other system, are the same people who cannot access traditional credentialing. The cost is too high. The schedule is impossible. The culture of the training programs was not built with them in mind.
            </p>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.82)' }}>
              MMR exists because that is unacceptable.
            </p>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.82)' }}>
              This is a teacher preparation program for educators who are already doing the work. Residents study a complete 540-lesson curriculum across Primary or Elementary, earn their credential through a paid practicum placement in a partner school, and graduate ready to lead classrooms with the full theoretical and practical foundation the work requires. No summers away. No $15,000 tuition bills. No program that treats equity as an add-on module rather than a foundational commitment.
            </p>
            <p style={{
              fontSize: '1.25rem',
              lineHeight: 1.5,
              color: 'var(--r-gold)',
              fontWeight: 500,
              fontFamily: 'var(--r-font-heading)',
              marginTop: '0.5rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(214,167,88,0.25)',
            }}>
              The field does not get to keep deciding who is qualified to teach Montessori. MMR is changing that.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT THE RESIDENCY PROVIDES */}
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
                desc: 'A structured, searchable collection of lessons organized by strand, level, and category. The full scope of Montessori practice.',
                link: '/residency/curriculum',
              },
              {
                title: 'Resident Portal',
                desc: 'Your personal workspace. Access assigned lessons, submit album entries, and track your progress across every strand.',
                link: '/residency/portal',
              },
              {
                title: 'Cohort Guide Feedback',
                desc: 'Every submission receives written feedback from an experienced Cohort Guide. Growth is guided, not guessed.',
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

      {/* WHAT MAKES MMR DIFFERENT */}
      <section className="r-section" style={{ background: 'var(--r-bg-muted)' }}>
        <div className="r-container" style={{ maxWidth: '760px' }}>
          <p style={{
            color: 'var(--r-gold)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '0.75rem',
          }}>
            What Makes MMR Different
          </p>
          <h2 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            lineHeight: 1.2,
            marginBottom: '3rem',
            color: 'var(--r-navy)',
          }}>
            Six things no other program does.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {differentiators.map((item) => (
              <div key={item.num} style={{ display: 'grid', gridTemplateColumns: '3rem 1fr', gap: '1.25rem', alignItems: 'start' }}>
                <div style={{
                  fontFamily: 'var(--r-font-heading)',
                  fontSize: '1.5rem',
                  color: 'var(--r-gold)',
                  fontWeight: 600,
                  lineHeight: 1,
                  paddingTop: '0.2rem',
                }}>
                  {item.num}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--r-navy)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {item.headline}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--r-text-muted)', lineHeight: 1.8 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT WITH INTENTION */}
      <section className="r-section" style={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}>
          <Image
            src="/residency/classroom-beadchain.jpg"
            alt=""
            fill
            style={{ objectFit: 'cover', filter: 'blur(6px) brightness(0.35)', transform: 'scale(1.1)' }}
            aria-hidden="true"
          />
        </div>
        <div className="r-container" style={{ maxWidth: '700px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--r-white)' }}>Built with Intention</h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>
            This platform is not a course marketplace. It is the infrastructure for a residency program that takes Montessori teacher preparation seriously, with structured curriculum, Cohort Guide support, and accountability at every stage.
          </p>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="r-section" style={{ background: 'var(--r-cream, #faf8f4)' }}>
        <div className="r-container" style={{ maxWidth: '760px' }}>
          <p style={{
            color: 'var(--r-gold)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '1.25rem',
          }}>
            Who This Is For
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            {[
              'If you have been working in a Montessori classroom for years without a credential because the cost was impossible, this is for you.',
              'If you are a paraeducator or teaching assistant who knows the materials, knows the children, and has never been given a pathway to lead your own classroom, this is for you.',
              'If you are a public or charter school teacher who was handed a Montessori classroom and told to figure it out without real preparation, this is for you.',
              'If you are a career changer with deep roots in your community who chose Montessori because you believe in what it can do for children who look like the children you grew up with, this is for you.',
              'If you have looked at traditional Montessori training programs and seen tuition bills that assume a certain kind of financial cushion, summer schedules that assume a certain kind of family situation, and cohort photos that assume a certain kind of Montessori educator, this is for you.',
            ].map((para) => (
              <p key={para} style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: 'var(--r-navy)' }}>
                {para}
              </p>
            ))}
            <div style={{
              marginTop: '1rem',
              paddingTop: '1.5rem',
              borderTop: '2px solid var(--r-gold)',
            }}>
              <p style={{
                fontSize: '1.25rem',
                lineHeight: 1.55,
                color: 'var(--r-navy)',
                fontFamily: 'var(--r-font-heading)',
                fontWeight: 500,
              }}>
                MMR was not built for the educator who already has every door open. It was built for the educator who has been standing outside the door for years doing the work anyway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TUITION */}
      <section className="r-section" style={{ background: 'var(--r-bg-muted)' }}>
        <div className="r-container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{
              color: 'var(--r-gold)', fontSize: '0.75rem', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem',
            }}>
              Tuition &amp; Payment
            </p>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Program Tuition</h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--r-text-muted)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
              Two credential tracks. Pay in full or choose an interest-free monthly plan.
            </p>
          </div>
          <TuitionCards />
          <p style={{ textAlign: 'center', fontSize: '0.9375rem', color: 'var(--r-text-muted)', marginTop: '1.75rem', maxWidth: '560px', margin: '1.75rem auto 0', lineHeight: 1.7 }}>
            MMR is priced at what it actually costs to run a serious program. If the monthly payment is still out of reach,{' '}
            <Link href="/contact" style={{ color: 'var(--r-navy)', fontWeight: 600 }}>
              contact us directly
            </Link>
            . We will figure it out together.
          </p>
        </div>
      </section>

      {/* FIELD GUIDE BENEFIT */}
      <section className="r-section" style={{ background: 'var(--r-navy)', color: 'var(--r-white)' }}>
        <div className="r-container" style={{ maxWidth: '760px' }}>
          <p style={{
            color: 'var(--r-gold)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '0.75rem',
          }}>
            Included with your credential
          </p>
          <h2 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            lineHeight: 1.2,
            marginBottom: '1.25rem',
            color: 'var(--r-white)',
          }}>
            Your credential comes with a Field Guide.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', maxWidth: '680px' }}>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>
              Every Montessori Makers Residency graduate receives a complimentary 12-month subscription to the Montessori Makers Field Guide upon completion of their practicum. That means the moment you finish your credential, you walk into your classroom with 540 lesson walkthroughs, crisis support protocols, learner support strategies, and an embedded reflection coach in your hand.
            </p>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)' }}>
              Primary graduates receive Primary access. Elementary graduates receive Elementary access. No additional cost. No application. It activates when you complete your practicum, because the first year in your own classroom is when you need it most.
            </p>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/field-guide" className="r-btn r-btn-gold" style={{ padding: '0.75rem 2rem', display: 'inline-block' }}>
              See the Field Guide
            </Link>
          </div>
        </div>
      </section>

      {/* MATCHHUB PLACEMENT PATHWAY */}
      <section className="r-section" style={{ background: 'var(--r-cream, #faf8f4)' }}>
        <div className="r-container" style={{ maxWidth: '760px' }}>
          <p style={{
            color: 'var(--r-gold)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '0.75rem',
          }}>
            Program Benefit
          </p>
          <h2 style={{
            fontFamily: 'var(--r-font-heading)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
            lineHeight: 1.2,
            marginBottom: '1.25rem',
            color: 'var(--r-navy)',
          }}>
            Your credential comes with a placement pathway.
          </h2>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: 'var(--r-text-muted)', marginBottom: '1.25rem' }}>
            MMR graduates receive priority placement access through MatchHub, MMG&apos;s Montessori hiring platform, where schools can filter specifically for candidates prepared through this program.
          </p>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: 'var(--r-text-muted)', marginBottom: '2rem' }}>
            This is not a general job board. It is a direct connection to schools that understand what MMG preparation means and are actively looking for candidates who have it.
          </p>
          <Link href="/matchhub/pipeline" style={{
            display: 'inline-block',
            background: 'var(--r-navy)',
            color: '#ffffff',
            padding: '0.75rem 1.75rem',
            fontSize: '0.875rem',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}>
            See the Pipeline
          </Link>
        </div>
      </section>

      {/* ACCREDITATION TRACK */}
      <section className="r-section">
        <div className="r-container" style={{ maxWidth: '760px' }}>
          <div style={{
            borderLeft: '3px solid var(--r-gold)',
            paddingLeft: '1.5rem',
          }}>
            <p style={{
              color: 'var(--r-gold)',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '0.75rem',
            }}>
              About Our Accreditation Track
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--r-text-muted)' }}>
                MMR is currently operating as a pre-accreditation program on the MACTE accreditation track. Here is what that means for you.
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--r-text-muted)' }}>
                MACTE is the Montessori Accreditation Council for Teacher Education and the only U.S. Department of Education-recognized accreditor of Montessori educator preparation programs. A MACTE-accredited credential is the standard recognized by Montessori schools across the country and internationally.
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--r-text-muted)' }}>
                MMR is building toward MACTE accreditation. The curriculum, program structure, faculty qualifications, practicum design, and assessment systems are all being developed in alignment with MACTE's Quality Principles and criteria. We are in active contact with MACTE as we move through the accreditation process.
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--r-text-muted)' }}>
                What this means for residents who enroll now: You are completing a program that is designed to meet MACTE standards and that is actively pursuing accreditation. Your credential will be issued by Montessori Makers Institute. When MACTE accreditation is granted, MMR graduates will hold credentials from a MACTE-accredited program. Residents who complete the program before accreditation is granted will be recognized under the accreditation once it is received, consistent with MACTE's policies for programs in the accreditation process.
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--r-text-muted)' }}>
                We are transparent about where we are in this process because you deserve to make an informed decision. If you have questions about the accreditation timeline or what it means for your specific situation,{' '}
                <Link href="/contact" style={{ color: 'var(--r-navy)', fontWeight: 600 }}>
                  contact us directly
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL ENTRY POINTS */}
      <section className="r-section" style={{ background: 'var(--r-bg-muted)' }}>
        <div className="r-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            textAlign: 'center',
          }}>
            <Link href="/residency/outcomes" style={{ textDecoration: 'none', color: 'inherit', padding: '1.5rem 1rem' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--r-navy)', marginBottom: '0.25rem' }}>Program Outcomes</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Graduates, partner schools, and program reach</p>
            </Link>
            <Link href="/residency/mentors" style={{ textDecoration: 'none', color: 'inherit', padding: '1.5rem 1rem' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--r-navy)', marginBottom: '0.25rem' }}>Become a Cohort Guide</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Guide the next generation of Montessori educators</p>
            </Link>
            <Link href="/residency/waitlist" style={{ textDecoration: 'none', color: 'inherit', padding: '1.5rem 1rem' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--r-navy)', marginBottom: '0.25rem' }}>Join the Waitlist</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Get notified when enrollment opens</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
