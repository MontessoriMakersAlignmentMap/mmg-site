import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const leaderResourcesStrategy = [
  {
    title: 'Growing Your Montessori School',
    type: 'E-Book',
    file: '/free-resources/growing-your-montessori-school.pdf',
    description:
      'Strategic frameworks for Montessori school leaders navigating growth — enrollment, program expansion, facilities, and the organizational structures that make sustained growth possible without sacrificing mission.',
    topics: [
      'Understanding the growth readiness of your school',
      'Enrollment strategy grounded in Montessori values',
      'Building infrastructure for sustainable expansion',
      'Leading through organizational change',
    ],
  },
  {
    title: 'Fundraising for Montessori Schools',
    type: 'E-Book',
    file: '/free-resources/fundraising-for-montessori-schools.pdf',
    description:
      'A practical, honest guide to fundraising for Montessori schools — written for leaders who may not have a development background but understand that financial sustainability is a justice issue, not just an operations issue.',
    topics: [
      'The case for fundraising in Montessori schools',
      'Building a donor relationship culture',
      'Annual giving, major gifts, and capital campaigns',
      'Fundraising without compromising access or equity',
    ],
  },
  {
    title: 'Creating Strong Financial Structures',
    type: 'E-Book',
    file: '/free-resources/creating-strong-financial-structures.pdf',
    description:
      'Financial management basics written for Montessori school leaders — not accountants. Covers budgeting, reserves, tuition modeling, and the financial decisions that determine whether a school can live its mission over the long term.',
    topics: [
      'Budget frameworks for Montessori school operations',
      'Building and protecting financial reserves',
      'Tuition modeling and financial accessibility',
      'Financial governance and board oversight',
    ],
  },
]

const leaderResourcesCulture = [
  {
    title: 'Progressive People Policies for Montessori Schools',
    type: 'Framework Guide',
    file: '/free-resources/montessori-mutuality.pdf',
    referral: true,
    description:
      'Fifteen progressive HR policies designed for Montessori schools that take their adult culture seriously: compassionate separation processes, mutual accountability frameworks, flexible work structures, and employment practices that extend the same dignity to adults that Montessori extends to children.',
    topics: [
      'Compassionate separation and off-boarding',
      'Mutual accountability frameworks',
      'Flexible work and wellness structures',
      'Employment practices grounded in Montessori values',
    ],
  },
  {
    title: 'The Resident Guide Model',
    type: 'Framework Guide',
    file: '/free-resources/resident-guide-model.pdf',
    referral: true,
    description:
      'Coverage anxiety is a retention crisis in slow motion. The Resident Guide model — a shared guide who floats across all classrooms, knows every child, and covers for permanent guides who need real rest — is one structural answer.',
    topics: [
      'Rationale for the role and what it solves',
      'Implementation across program levels',
      'How to communicate it to families',
      'What to look for when hiring into this role',
    ],
  },
  {
    title: 'New Staff Onboarding Checklist',
    type: 'Checklist',
    file: '/free-resources/new-staff-onboarding-checklist.pdf',
    description:
      'A comprehensive Montessori-specific onboarding guide for guides, assistants, and administrators. Covers operations, curriculum, assessment, community, materials, and professional development — with space for notes and completion tracking.',
    topics: [
      'Operations, HR, and building basics',
      'Curriculum, materials, and Montessori practice',
      'Assessment, record keeping, and documentation',
      'Professional development and coaching structure',
    ],
  },
  {
    title: 'Staff Meeting Agenda Template',
    type: 'Template',
    file: '/free-resources/staff-meeting-agenda-template.pdf',
    description:
      'A Montessori-specific meeting structure for guides, directors, and leadership teams. Designed to keep meetings focused and brief — 45 to 60 minutes — while ensuring two-minute updates, goal tracking, agenda items, and action items all get documented.',
    topics: [
      'Two-minute updates and goal tracking',
      'Structured agenda with PIC and due dates',
      'Action items table',
      'Meeting notes page',
    ],
  },
  {
    title: 'Staff Appreciation Letter Templates',
    type: 'Letter Templates',
    file: '/free-resources/staff-appreciation-letter-templates.pdf',
    description:
      'Three ready-to-adapt letters for Montessori school leaders: a letter to a staff member\'s loved one (unexpectedly powerful), an end-of-year recognition letter, and a new staff welcome letter — all with guidance on making them specific enough to matter.',
    topics: [
      'Letter to a loved one (unexpected, high-impact)',
      'End-of-year staff recognition',
      'Welcome letter for new staff members',
      'Notes on specificity and when to send',
    ],
  },
]

const educatorResources = [
  {
    title: 'Phonics Sequence Reference Guide',
    type: 'Reference Guide',
    file: '/free-resources/phonics-sequence-reference-guide.pdf',
    description:
      'A one-page reference mapping the Montessori reading materials sequence to the corresponding decodable text levels. For guides setting up a reading program or explaining the sequence to families.',
    topics: [
      'Montessori material → phonics level mapping',
      'Pink / Blue / Green series alignment',
      'Decodable book integration points',
      'Guidance notes for guides and literacy leads',
    ],
  },
  {
    title: 'Reading Assessment Observation Checklist',
    type: 'Checklist',
    file: '/free-resources/reading-assessment-observation-checklist.pdf',
    description:
      'A printable checklist for documenting phonics skill development during individual reading conferences. Organized by skill level from Pre-Reading through Fluency. Complements — but does not replace — the full Reading Assessment Hub.',
    topics: [
      'Pre-reading through fluency skill tracking',
      'Individual student observation format',
      'Print concepts, decoding, and comprehension',
      'Conference-ready, printable format',
    ],
  },
  {
    title: 'Great Lessons Audit Worksheet',
    type: 'Worksheet',
    file: '/free-resources/great-lessons-audit-worksheet.pdf',
    description:
      'A structured worksheet for evaluating your current Great Lessons presentations against current science and justice-centered criteria. Helps identify where existing materials need updating.',
    topics: [
      'Scientific accuracy review criteria',
      'Justice and representation audit',
      'Narrative voice and tone assessment',
      'Action items and follow-up tracking',
    ],
  },
  {
    title: 'Science of Reading: What Every Montessori Guide Needs to Know',
    type: 'PDF Reading',
    file: '/free-resources/science-of-reading-montessori-guide.pdf',
    description:
      'A concise reading covering the current state of reading science and its specific implications for Montessori guides — without requiring background in cognitive psychology or linguistics.',
    topics: [
      'The Simple View of Reading and Montessori',
      'Phonological awareness and explicit instruction',
      'Structured literacy in the Montessori environment',
      'Where Montessori is strong and where gaps exist',
    ],
  },
  {
    title: 'Justice in Montessori: A Starting Framework',
    type: 'Framework Guide',
    file: '/free-resources/justice-in-montessori-starting-framework.pdf',
    description:
      'A practical framework for evaluating and improving the justice dimensions of Montessori curriculum and materials. Not a checklist — a way of thinking.',
    topics: [
      'Five dimensions of justice in curriculum',
      'Representation, narrative, and power',
      'Classroom culture and belonging',
      'Practice prompts and reflection questions',
    ],
  },
  {
    title: 'Origins Series: Sample Lesson Excerpt',
    type: 'Sample PDF',
    file: '/free-resources/origins-series-sample-excerpt.pdf',
    description:
      'A sample excerpt from the Origins of the Universe suite, including the narrative guide opening and one visual anchor card. Shows the format, tone, and depth of the full lesson reconstructions.',
    topics: [
      'Narrative-first lesson structure',
      'Justice-centered framing of Great Lessons',
      'Visual anchor card format',
      'Elementary guide voice and tone',
    ],
  },
]

type Resource = {
  title: string
  type: string
  file: string
  referral?: boolean
  description: string
  topics: string[]
}

function LeaderCard({ book }: { book: Resource }) {
  return (
    <div className="bg-white border border-[#E2DDD6] p-8 md:p-10">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#F2EDE6] text-[#64748B] text-xs tracking-[0.1em] uppercase px-3 py-1">
              {book.type}
            </span>
            <span className="bg-[#0e1a7a] text-[#d6a758] text-xs tracking-[0.1em] uppercase px-3 py-1">
              Free
            </span>
          </div>
          <h3 className="text-[#0e1a7a] text-xl font-semibold mb-4" style={serif}>
            {book.title}
          </h3>
          <p className="text-[#374151] text-base leading-relaxed">{book.description}</p>
        </div>
        <div>
          <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">What&rsquo;s inside</p>
          <ul className="space-y-2 mb-8">
            {book.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#d6a758] flex-shrink-0 mt-0.5 text-xs">—</span>
                <span className="text-[#374151] text-xs leading-relaxed">{topic}</span>
              </li>
            ))}
          </ul>
          {book.referral ? (
            <div>
              <a
                href={book.file}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0e1a7a] text-white text-xs px-6 py-3 tracking-wide hover:bg-[#162270] transition-colors inline-block mb-3"
              >
                View Guide →
              </a>
              <p className="text-[#64748B] text-xs leading-relaxed">
                Share with your community —{' '}
                <span className="text-[#0e1a7a] font-medium">montessorimakersgroup.org</span>
              </p>
            </div>
          ) : (
            <a
              href={book.file}
              download
              className="bg-[#0e1a7a] text-white text-xs px-6 py-3 tracking-wide hover:bg-[#162270] transition-colors inline-block"
            >
              Download Free →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function FreeResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">Free Resources</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            Free tools for Montessori leaders and educators.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed">
            These resources reflect the same commitments as the paid tools — clarity, justice,
            sustainability, and belonging. No lead capture. No hustle. Just useful things.
          </p>
        </div>
      </section>

      {/* Intro Strip */}
      <section className="bg-[#F2EDE6] py-10 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#374151] text-base leading-relaxed">
            Fourteen free resources organized by audience:{' '}
            <a href="#for-leaders" className="text-[#0e1a7a] font-semibold hover:underline">
              eight for school leaders
            </a>{' '}
            (strategy, operations, and culture) and{' '}
            <a href="#for-educators" className="text-[#0e1a7a] font-semibold hover:underline">
              six for guides and educators
            </a>{' '}
            (literacy, curriculum, and professional development).
          </p>
        </div>
      </section>

      {/* ── For School Leaders ──────────────────────────────────────────────── */}
      <section id="for-leaders" className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">For School Leaders</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Strategy, operations, and culture tools.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              E-books, frameworks, and operational tools for Montessori school leaders — from
              financial sustainability and fundraising to staff culture, adult infrastructure, and
              professional development.
            </p>
          </div>

          {/* Strategy & Operations */}
          <div className="mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.18em] uppercase mb-6 pb-3 border-b border-[#E2DDD6]">
              Strategy &amp; Operations
            </p>
            <div className="space-y-6">
              {leaderResourcesStrategy.map((book) => (
                <LeaderCard key={book.title} book={book} />
              ))}
            </div>
          </div>

          {/* Staff & Culture */}
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.18em] uppercase mb-6 pb-3 border-b border-[#E2DDD6]">
              Staff &amp; Culture
            </p>
            <div className="space-y-6">
              {leaderResourcesCulture.map((book) => (
                <LeaderCard key={book.title} book={book} />
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-6 bg-[#F2EDE6] p-6 border border-[#D4CEC6]">
            <div>
              <p className="text-[#0e1a7a] font-semibold text-sm">Looking for the full Toolbox?</p>
              <p className="text-[#374151] text-xs mt-1">
                Premium toolkits for hiring, leadership transition, board alignment, and more.
              </p>
            </div>
            <Link
              href="/toolbox/store"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-xs px-6 py-2 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors whitespace-nowrap"
            >
              Browse the Toolbox →
            </Link>
          </div>
        </div>
      </section>

      {/* ── For Guides & Educators ──────────────────────────────────────────── */}
      <section id="for-educators" className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">For Guides &amp; Educators</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Literacy, curriculum, and professional development tools.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Free resources from Montessori Makers Learning — for guides working with reading
              materials, Great Lessons, and justice-centered curriculum.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {educatorResources.map((resource) => (
              <div
                key={resource.title}
                className="bg-white border border-[#E2DDD6] p-7 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,26,122,0.07)] transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1 h-7 bg-[#d6a758]" />
                  <span className="bg-[#0e1a7a] text-[#d6a758] text-xs tracking-[0.1em] uppercase px-3 py-1">
                    Free
                  </span>
                </div>
                <div>
                  <p className="text-[#64748B] text-[10px] tracking-[0.15em] uppercase mb-1.5">
                    {resource.type}
                  </p>
                  <h3 className="text-[#0e1a7a] font-semibold text-base leading-snug" style={serif}>
                    {resource.title}
                  </h3>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed flex-1">
                  {resource.description}
                </p>
                <ul className="space-y-1.5">
                  {resource.topics.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#d6a758] flex-shrink-0 mt-0.5 text-xs">—</span>
                      <span className="text-[#64748B] text-xs leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={resource.file}
                  download
                  className="bg-[#0e1a7a] text-white text-xs px-5 py-2.5 tracking-wide hover:bg-[#162270] transition-colors inline-block text-center mt-auto"
                >
                  Download Free →
                </a>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-6 bg-white p-6 border border-[#D4CEC6]">
            <div>
              <p className="text-[#0e1a7a] font-semibold text-sm">Ready for the full curriculum?</p>
              <p className="text-[#374151] text-xs mt-1">
                The Decodable Book Series, Origins Suites, Reading Assessment Hub, and courses.
              </p>
            </div>
            <Link
              href="/learning"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-xs px-6 py-2 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors whitespace-nowrap"
            >
              Explore Learning →
            </Link>
          </div>
        </div>
      </section>

      {/* Related Paid Resources */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#64748B] text-xs tracking-[0.2em] uppercase mb-8">Related Paid Resources</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase mb-3">Montessori Makers Toolbox</p>
              <h3 className="text-[#0e1a7a] text-xl font-semibold mb-3" style={serif}>
                Premium leadership toolkits
              </h3>
              <p className="text-[#374151] text-sm leading-relaxed mb-6">
                The Leadership Operations Playbook, Hiring &amp; Selection Toolkit, Leadership
                Transition &amp; Succession Toolkit, Board Onboarding, and more. Downloadable
                resources for Montessori school operations.
              </p>
              <Link
                href="/toolbox/store"
                className="text-[#0e1a7a] text-xs font-semibold tracking-wide hover:underline"
              >
                Browse the Toolbox →
              </Link>
            </div>
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase mb-3">Montessori Makers Learning</p>
              <h3 className="text-[#0e1a7a] text-xl font-semibold mb-3" style={serif}>
                Courses, books, and assessment tools
              </h3>
              <p className="text-[#374151] text-sm leading-relaxed mb-6">
                The Decodable Book Series (96 books), Origins Series (justice-centered Great
                Lessons), Reading Assessment Hub, and professional development courses — including
                the 7-hour Montessori Meets Science of Reading.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/learning/courses" className="text-[#0e1a7a] text-xs font-semibold tracking-wide hover:underline">
                  See courses →
                </Link>
                <Link href="/learning/decodable-books" className="text-[#0e1a7a] text-xs font-semibold tracking-wide hover:underline">
                  Decodable series →
                </Link>
                <Link href="/learning/reading-assessment" className="text-[#0e1a7a] text-xs font-semibold tracking-wide hover:underline">
                  Assessment Hub →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  )
}
