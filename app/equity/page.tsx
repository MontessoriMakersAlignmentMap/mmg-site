import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const ecosystemItems = [
  {
    label: 'Origins Chart Sets',
    href: '/learning/charts',
    headline: 'The standard Montessori impressionistic charts tell one story. These tell many.',
    body: 'The Origins Series rebuilds the Great Lessons from current scholarship, centering civilizations across Africa, Asia, the Americas, and the Pacific alongside Europe. Not because diversity is a goal. Because accuracy is. Each suite charts at least four civilizations across multiple time periods and continents, correcting a Eurocentric default that has been reproduced in Montessori classrooms for generations.',
    cta: 'Explore Origins Series',
  },
  {
    label: 'Decodable Books',
    href: '/learning/decodable-books',
    headline: '96 books built on the science of reading. Whose stories appear is not a neutral choice.',
    body: '96 decodable books aligned to Montessori bead colors and the science of reading. The stories center diverse families, communities, and experiences as the default, not as a diversity add-on. Because the families children meet in early reading materials teach them who belongs in a story, in a classroom, and in the world.',
    cta: 'Explore Decodable Books',
  },
  {
    label: 'MMAP Equity Analytics',
    href: '/mmap',
    headline: 'Schools hide inequity inside averages. MMAP makes it visible.',
    body: 'The MMAP equity analytics module disaggregates assessment and progress data by race, language background, gender, and other dimensions. Patterns that would otherwise stay invisible inside school-wide averages become visible and addressable. Equity work requires data. This is the data.',
    cta: 'Learn about MMAP',
  },
  {
    label: 'Every Family Belongs Here',
    href: '/learning/family-education',
    headline: 'Equity is not a program. It is how we practice.',
    body: 'Session 08 of the Family Education Series addresses belonging, representation, and equity with families directly. Not a session for families who need to hear it. A session for every Montessori family, because belonging is a design practice, not a population-specific intervention.',
    cta: 'Explore Family Education',
  },
  {
    label: 'Toolbox: Hiring & Separation',
    href: '/toolbox',
    headline: 'Bias causes the most damage in hiring and in exits. These toolkits build equity into both.',
    body: 'The Hiring & Selection Toolkit and Performance & Separation Toolkit are built with equity frameworks for the two organizational processes where unexamined assumptions most reliably produce inequitable outcomes. Rubrics, protocols, and language designed to interrupt bias before it becomes a decision.',
    cta: 'Explore Toolbox',
  },
  {
    label: 'Authagraph Maps',
    href: '/learning/maps',
    headline: 'The map your students have been looking at is wrong. Not metaphorically. Geometrically.',
    body: 'The Mercator projection — the map in most Montessori classrooms — systematically inflates the size of Europe and North America while shrinking Africa, South America, and Southeast Asia. This is not a neutral distortion. It encodes a Eurocentric view of the world into children\'s spatial intuition. The Authagraph projection shows accurate relative land masses. Africa is larger than the United States, Europe, and China combined. These maps make that visible.',
    cta: 'Explore Authagraph Maps',
  },
  {
    label: 'Advisory',
    href: '/advisory',
    headline: 'Schools working with MMG Advisory engage equity as a structural question, not a standalone initiative.',
    body: 'Culture repair, governance work, and strategic planning all involve equity at the structural level. Advisory does not treat equity as a separate workstream. It asks how power is distributed, how decisions are made, who is at the table, and what systems are producing which outcomes.',
    cta: 'Explore Advisory',
  },
]

export default function EquityPage() {
  return (
    <>
      {/* Hero */}
      <section className="grain bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
            Equity
          </p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            Equity is not a value. It is a design constraint.
          </h1>
          <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
            Either equity is built into how you select students, present materials, design
            assessments, and develop adults. Or it is not there at all. This is where
            MMG makes that work visible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#course"
              className="btn-shimmer bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
            >
              Take the Course
            </a>
            <a
              href="#ecosystem"
              className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
            >
              See the Work
            </a>
          </div>
        </div>
      </section>

      {/* The Commitment */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Commitment</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              A statement is not a system.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="space-y-6 pt-2">
            <p className="text-[#374151] text-lg leading-relaxed">
              Most Montessori schools have written equity commitments. Fewer have examined
              whether their admissions process, their impressionistic charts, their family
              communication, their discipline culture, and their adult hiring practices reflect
              those commitments structurally.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              MMG builds equity into the materials, tools, platforms, and leadership formation
              it produces. The Origins chart sets exist because the standard Montessori
              impressionistic charts present a Eurocentric version of human history as the
              default. The decodable books exist because decodables have historically centered
              one family structure as the norm. The equity course exists because most Montessori
              educators have completed rigorous AMI, AMS, or MACTE-accredited training and almost
              none of it addresses how to examine and repair inequity in the structures they lead.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              This page is not a statement. It is where you do the work.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Anchor Course */}
      <section id="course" className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Practitioner Course</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight max-w-3xl" style={serif}>
              Equity in Montessori: A Practitioner Course
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Left: framing */}
            <div className="md:col-span-2 space-y-6">
              <p className="text-[#374151] text-lg leading-relaxed">
                Most educators who take this course have done the introductory work. They have attended
                a session on implicit bias. They have read Kendi or DiAngelo or Love. They believe
                equity matters. What they have not done is examine their school&apos;s actual structures:
                who gets in, who gets disciplined, whose culture is centered in the materials, who
                gets hired and let go, and what the data shows when it is disaggregated by race
                and language.
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                This course draws on Kendi&apos;s antiracist policy framework, Ladson-Billings and
                Paris&apos;s culturally sustaining pedagogy, Bettina Love&apos;s abolitionist
                teaching, Tema Okun&apos;s white supremacy culture analysis, and
                Crenshaw&apos;s intersectionality to build the analytical infrastructure for
                equity as an institutional practice. It uses the Montessori context specifically,
                because the commitments to observation, prepared environment, and respect for the
                individual that define Montessori pedagogy apply with equal force to questions of
                race, language, culture, and belonging in the schools we build.
              </p>
              <blockquote className="border-l-4 border-[#d6a758] pl-6 py-1">
                <p className="text-[#374151] text-base italic leading-relaxed">
                  &ldquo;Equity work is not the work we add when we have time. It is the standard
                  against which we evaluate everything else.&rdquo;
                </p>
              </blockquote>
              <div className="pt-4 border-t border-[#D4CEC6]">
                <p className="text-[#64748B] text-sm leading-relaxed">
                  <span className="font-semibold text-[#374151]">Who this is for:</span>{' '}
                  Educators and school leaders who have completed introductory equity work and are
                  ready for practitioner-level structural analysis. This is not an introduction.
                  It assumes basic familiarity and builds from there.
                </p>
              </div>
            </div>

            {/* Right: full course card */}
            <div className="md:col-span-3 bg-white border border-[#E2DDD6]">
              <div className="p-8 md:p-10 grid md:grid-cols-3 gap-8">
                {/* Main content */}
                <div className="md:col-span-2">
                  <div className="w-1 h-8 bg-[#d6a758] mb-6" />
                  <h3 className="text-[#0e1a7a] text-xl font-semibold mb-2" style={serif}>
                    Equity in Montessori: A Practitioner Course
                  </h3>
                  <p className="text-[#64748B] text-sm italic mb-6">
                    Moving from equity statements to equity practice. The hard, necessary work.
                  </p>
                  <p className="text-[#374151] text-base leading-relaxed mb-8">
                    Most Montessori schools have written equity commitments. Fewer have examined
                    their admissions process, discipline data, curriculum materials, and family
                    partnerships through an equity lens: rigorously, honestly, and with the
                    intention to change something. This course is designed for educators and school
                    leaders who are past the introductory conversation and ready to engage
                    structurally with what justice actually requires in a Montessori context.
                  </p>
                  <div className="mb-6">
                    <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">
                      What you will learn
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Apply Kendi's distinction between antiracist policy and racist policy to analyze your school's actual structures: admissions criteria, discipline data, curriculum materials, staffing composition. Identify specific institutional changes, not general intentions.",
                        "Use Ladson-Billings and Paris's culturally sustaining pedagogy framework to evaluate whether your Montessori materials and presentations affirm or erase the identities, languages, and knowledge traditions of children in your classroom.",
                        "Draw on Tema Okun's characteristics of white supremacy culture, including perfectionism, urgency, defensiveness, and worship of the written word, to examine the organizational norms of your school and understand how they function as active barriers to equity practice.",
                        "Engage Bettina Love's abolitionist teaching framework to move beyond diversity and inclusion toward structural transformation: how your school actually designs for belonging, not just tolerance.",
                        "Develop an equity action plan grounded in Crenshaw's intersectionality framework and Margo Gottlieb's assessment equity principles, specific, accountable, and connected to the institutional structures you actually have authority over.",
                      ].map((outcome, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                          <span className="text-[#374151] text-sm leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Sidebar */}
                <div className="bg-[#F2EDE6] p-6 flex flex-col gap-5 self-start">
                  <div>
                    <p className="text-[#64748B] text-xs tracking-[0.1em] uppercase mb-1">Price</p>
                    <p className="text-[#0e1a7a] text-2xl font-semibold" style={serif}>$250</p>
                  </div>
                  <div className="space-y-3 border-t border-[#D4CEC6] pt-4">
                    <div>
                      <p className="text-[#64748B] text-xs tracking-[0.1em] uppercase">Format</p>
                      <p className="text-[#374151] text-sm">Async, self-paced</p>
                    </div>
                    <div>
                      <p className="text-[#64748B] text-xs tracking-[0.1em] uppercase">Time</p>
                      <p className="text-[#374151] text-sm">6.5&ndash;7 hours</p>
                    </div>
                    <div>
                      <p className="text-[#64748B] text-xs tracking-[0.1em] uppercase">Access</p>
                      <p className="text-[#374151] text-sm">90-day access from first login</p>
                    </div>
                  </div>
                  <a
                    href="https://buy.stripe.com/bJeaEZ2vK1uE2kvc3T2cg0f"
                    className="bg-[#d6a758] text-white text-sm px-6 py-3 tracking-wide hover:bg-[#c09240] transition-colors text-center mt-2"
                  >
                    Register Now &rarr;
                  </a>
                  <p className="text-[#64748B] text-xs text-center -mt-2">
                    Secure checkout via Stripe. 90-day access begins on your first login.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Programming */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Live Programming</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Where the equity work happens live.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              The async course builds the analytical foundation. The Institute&apos;s equity-focused
              seminars and intensives put that analysis to work in real school contexts, with real
              data, alongside peers doing the same work.
            </p>
          </div>

          <div className="space-y-4">
            {/* April 2026 intensive */}
            <div className="bg-white border border-[#E2DDD6] p-8 grid md:grid-cols-4 gap-6 items-start hover:shadow-md hover:border-[#C8C0B6] hover:-translate-y-[1px] transition-all duration-200">
              <div className="md:col-span-1">
                <span className="text-[#8A6014] text-xs tracking-[0.2em] font-medium">5-Hour Intensive</span>
                <h3 className="text-[#0e1a7a] font-semibold text-lg mt-1" style={serif}>
                  Equity Audits &amp; Adult Culture Design
                </h3>
                <p className="text-[#64748B] text-xs mt-2">Thursday, April 15, 2026</p>
                <p className="text-[#64748B] text-xs">9:30am&ndash;2:30pm CST</p>
                <p className="text-[#0e1a7a] text-sm font-semibold mt-3">$350</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-[#374151] text-sm leading-relaxed mb-4">
                  This intensive helps schools conduct a meaningful equity audit of adult experience,
                  examine structural patterns, and identify conditions that affect fairness,
                  belonging, and psychological safety. Participants learn to gather and interpret
                  data, uncover root causes, and redesign adult culture systems through an
                  equity-informed lens.
                </p>
                <p className="text-[#64748B] text-xs">
                  <span className="font-medium text-[#374151]">For: </span>
                  Heads of school, DEI coordinators, and leadership teams engaged in adult culture
                  or equity work.
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href="https://buy.stripe.com/bJe14p2vKgpybV51pf2cg0m"
                  className="block bg-[#d6a758] text-white text-sm px-6 py-3 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
                >
                  Register Now &rarr;
                </a>
                <Link
                  href="/institute/courses/equity-audits-adult-culture-design--spring-2026"
                  className="block text-[#0e1a7a] text-sm font-medium hover:underline text-center"
                >
                  View full details &rarr;
                </Link>
                <p className="text-[#64748B] text-xs text-center">
                  Part of the MMG Institute seminar series
                </p>
              </div>
            </div>

            {/* Future offerings placeholder */}
            <div className="border border-dashed border-[#D4CEC6] p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[#94a3b8] text-sm">
                More equity-focused intensives and seminars are scheduled throughout the year.
              </p>
              <Link
                href="/institute/catalog"
                className="text-[#0e1a7a] text-sm font-medium hover:underline whitespace-nowrap flex-shrink-0"
              >
                View the full Institute calendar &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Equity Across the Ecosystem */}
      <section id="ecosystem" className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              Equity Across the Ecosystem
            </p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight" style={serif}>
              Equity is not a program. It is infrastructure.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mt-6">
              Across MMG&apos;s materials, platforms, and services, equity is not a layer added on
              top. It is a design constraint built in from the start.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {ecosystemItems.map((item, i) => (
              <div
                key={item.label}
                className={`bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-200${i === ecosystemItems.length - 1 && ecosystemItems.length % 2 !== 0 ? ' md:col-span-2' : ''}`}
              >
                <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-3">{item.label}</p>
                <h3 className="text-white font-semibold text-lg mb-4 leading-snug" style={serif}>
                  {item.headline}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">{item.body}</p>
                <Link href={item.href} className="text-[#d6a758] text-sm font-medium hover:underline">
                  {item.cta} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Resources</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              The work continues.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Additional equity resources are in development. When they are ready, they will be here.
            </p>
          </div>
          {/* Reading List PDF embed */}
          <div className="bg-white border border-[#E2DDD6] mb-8">
            <div className="p-8 md:p-10 border-b border-[#E2DDD6] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-3">Reading & Reference</p>
                <h3 className="text-[#0e1a7a] text-xl font-semibold leading-snug max-w-xl" style={serif}>
                  MMG Equity Reading &amp; Reference List
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mt-2 max-w-xl">
                  The scholars, research, and theoretical frameworks behind MMG&apos;s equity approach — from Ladson-Billings, Kendi, Love, and Crenshaw to Montessori&apos;s own writing on human dignity and the prepared adult.
                </p>
              </div>
              <a
                href="/equity-reading-list.pdf"
                download="MMG-Equity-Reading-List.pdf"
                className="flex-shrink-0 bg-[#0e1a7a] text-white text-sm px-7 py-3 tracking-wide hover:bg-[#162270] transition-colors font-medium whitespace-nowrap"
              >
                Download PDF ↓
              </a>
            </div>
            <div className="w-full" style={{ height: '780px' }}>
              <iframe
                src="/equity-reading-list.pdf#toolbar=1&navpanes=0&scrollbar=1"
                className="w-full h-full"
                title="MMG Equity Reading & Reference List"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-16">
            {[
              {
                title: 'School Equity Self-Assessment',
                body: 'A free diagnostic tool for Montessori schools to assess equity practice across admissions, curriculum, discipline, hiring, and family engagement. A lead into deeper advisory or Institute work.',
              },
              {
                title: 'Curriculum Equity Review Protocol',
                body: "The rubric MMG uses to evaluate Montessori curriculum materials for representation, cultural accuracy, and equity framing. Adapted for school-level use.",
              },
            ].map((resource) => (
              <div
                key={resource.title}
                className="bg-white border border-[#E2DDD6] p-7 flex flex-col gap-4"
              >
                <div>
                  <span
                    className="text-[10px] font-semibold tracking-widest uppercase px-2 py-1 inline-block"
                    style={{ backgroundColor: '#F2EDE6', color: '#8A6014' }}
                  >
                    In development
                  </span>
                </div>
                <h3 className="text-[#0e1a7a] font-semibold text-base leading-snug" style={serif}>
                  {resource.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed flex-1">{resource.body}</p>
              </div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="bg-[#F2EDE6] border border-[#D4CEC6] p-8 md:p-10 max-w-2xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-3">Stay informed</p>
            <h3 className="text-[#0e1a7a] text-2xl mb-3" style={serif}>
              Get notified when equity resources are published.
            </h3>
            <p className="text-[#64748B] text-sm leading-relaxed mb-6">
              The Makers Network newsletter covers new equity resources, Institute programming,
              and practitioner-level thinking for Montessori leaders.
            </p>
            <a
              href="#newsletter"
              className="bg-[#0e1a7a] text-white text-sm px-8 py-3 tracking-wide hover:bg-[#162270] transition-colors inline-block font-medium"
            >
              Join the Makers Network
            </a>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Where to go from here
            </p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              The equity work connects to everything.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Institute</p>
              <p className="text-[#374151] text-sm leading-relaxed mb-6">
                Live equity programming lives in the Institute. Seminars, intensives, and cohort
                experiences that put structural equity analysis to work in real school contexts.
              </p>
              <Link href="/institute" className="text-[#0e1a7a] text-sm font-medium hover:underline">
                Explore the Institute &rarr;
              </Link>
            </div>
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Learning</p>
              <p className="text-[#374151] text-sm leading-relaxed mb-6">
                Equity-centered materials: Origins chart sets, decodable books with justice-centered
                stories, family education sessions. The curriculum layer of the equity work.
              </p>
              <Link href="/learning" className="text-[#0e1a7a] text-sm font-medium hover:underline">
                Explore Learning &rarr;
              </Link>
            </div>
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Advisory</p>
              <p className="text-[#374151] text-sm leading-relaxed mb-6">
                For schools ready to engage equity as a structural question across governance,
                culture, and strategic planning. Advisory addresses the systems level.
              </p>
              <Link href="/advisory" className="text-[#0e1a7a] text-sm font-medium hover:underline">
                Explore Advisory &rarr;
              </Link>
            </div>
          </div>
          <div className="border-t border-[#E2DDD6] pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <p className="text-[#0e1a7a] text-xl font-medium leading-snug max-w-xl" style={serif}>
              Because children experience the organization adults create.
            </p>
            <Link
              href="/contact"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors whitespace-nowrap font-medium"
            >
              Start a Conversation &rarr;
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  )
}
