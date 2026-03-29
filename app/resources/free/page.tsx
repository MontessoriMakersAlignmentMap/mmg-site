import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const toolboxEbooks = [
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

const learningFreeResources = [
  {
    title: 'Educator Tools & Templates',
    description:
      'Planning templates, observation guides, and classroom tools for Montessori educators — aligned to the materials sequence and designed for real classroom use.',
  },
  {
    title: 'Free Assessment Resources',
    description:
      'Entry-level assessment tools for phonics and literacy tracking. Includes sample tracking sheets from the Reading Assessment Hub and guidance on getting started with decodable text assessment.',
  },
  {
    title: 'Reading Scope & Sequence Guide',
    description:
      'A free reference guide connecting the Montessori reading materials to the phonics progression covered in the Decodable Book Series.',
  },
]

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
            Free resources from two parts of the Montessori Makers ecosystem: the{' '}
            <Link
              href="/toolbox"
              className="text-[#0e1a7a] font-semibold hover:underline"
            >
              Toolbox
            </Link>{' '}
            (leadership and operations resources for school leaders) and{' '}
            <Link
              href="/learning"
              className="text-[#0e1a7a] font-semibold hover:underline"
            >
              Learning
            </Link>{' '}
            (curriculum and professional development for educators). Both are available below.
          </p>
        </div>
      </section>

      {/* Toolbox E-Books */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">From the Toolbox</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Three free e-books for Montessori school leaders.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              From the Montessori Makers Toolbox — a library of professional resources for
              Montessori leadership. These three e-books are free. The paid Toolbox products
              go deeper.
            </p>
          </div>
          <div className="space-y-6">
            {toolboxEbooks.map((book) => (
              <div key={book.title} className="bg-white border border-[#E2DDD6] p-8 md:p-10">
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
                    <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">Topics covered</p>
                    <ul className="space-y-2 mb-8">
                      {book.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-[#d6a758] flex-shrink-0 mt-0.5 text-xs">—</span>
                          <span className="text-[#374151] text-xs leading-relaxed">{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={book.file}
                      download
                      className="bg-[#0e1a7a] text-white text-xs px-6 py-3 tracking-wide hover:bg-[#162270] transition-colors inline-block"
                    >
                      Download Free →
                    </a>
                  </div>
                </div>
              </div>
            ))}
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

      {/* Learning Free Resources */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">From Learning</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Free educator tools and assessment resources.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              From Montessori Makers Learning — curriculum, professional development, and
              assessment tools for Montessori educators. These free resources are available
              through the Learning site.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {learningFreeResources.map((resource) => (
              <div key={resource.title} className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-[#d6a758]" />
                  <span className="bg-[#0e1a7a] text-[#d6a758] text-xs tracking-[0.1em] uppercase px-3 py-1">
                    Free
                  </span>
                </div>
                <h3 className="text-[#0e1a7a] font-semibold text-base">{resource.title}</h3>
                <p className="text-[#374151] text-sm leading-relaxed flex-1">{resource.description}</p>
              </div>
            ))}
          </div>
          <Link
            href="/learning/free-resources"
            className="bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#162270] transition-colors inline-block"
          >
            Access Free Learning Resources →
          </Link>
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
    </>
  )
}
