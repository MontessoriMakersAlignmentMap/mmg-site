import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

// ─── Stripe payment links ─────────────────────────────────────────────────────
// Each course has its own Stripe payment link.
// After payment Stripe should redirect to: <PLATFORM_URL>/claim-access
// Replace each '#' below with the real https://buy.stripe.com/… link.
// ─────────────────────────────────────────────────────────────────────────────
const STRIPE_LINKS: Record<string, string> = {
  'science-of-reading':   'https://buy.stripe.com/eVqdRbgmA7T24sDgk92cg0b',
  'math-materials':       'https://buy.stripe.com/eVqeVf9Ycc9i2kvd7X2cg0c',

  'art-of-observation':   'https://buy.stripe.com/7sYdRbfiw0qAe3daZP2cg0e',
  'equity-in-montessori': 'https://buy.stripe.com/bJeaEZ2vK1uE2kvc3T2cg0f',
}

const courses = [
  {
    id: 'science-of-reading',
    name: 'Montessori Meets Science of Reading',
    tagline: 'Reading instruction, Montessori philosophy, equity, and the science of reading — in one rigorous course.',
    description:
      'The science of reading is not in conflict with Montessori. But it does require Montessori educators to understand both what the research says and how to apply it within a Montessori philosophy — not despite it. This course does that work.',
    outcomes: [
      'Understand the current science of reading and its implications for Montessori reading instruction',
      'Connect the Montessori phonics materials to evidence-based decoding practices',
      'Identify equity dimensions in literacy instruction and apply them in your own classroom',
      'Use the Montessori reading materials sequence with greater intention and confidence',
    ],
    hours: '7 hours',
    time: 'Total time: 6.5–7 hours (equivalent to one full-day professional development experience)',
    price: '$250',
    format: 'Async, self-paced',
    audience: 'Primary and lower elementary Montessori educators, literacy leads, and instructional coaches',
  },
  {
    id: 'math-materials',
    name: 'Montessori Math: Materials to Mastery',
    tagline: 'Connecting the math materials to conceptual understanding — and knowing when a child has actually gotten there.',
    description:
      'Montessori math materials are extraordinary. They also require a guide who understands the mathematical concepts beneath them — not just the sequence of presentations. This course builds that understanding, from the bead work through the operations to abstraction.',
    outcomes: [
      'Understand the mathematical concepts embedded in the core Montessori math materials',
      'Recognize when a child is developing procedural fluency vs. conceptual understanding',
      'Use assessment observation to guide material selection and lesson timing',
      'Connect Montessori math materials to broader mathematical literacy and confidence',
    ],
    hours: '7 hours',
    time: 'Total time: 6.5–7 hours (equivalent to one full-day professional development experience)',
    price: '$250',
    format: 'Async, self-paced',
    audience: 'Primary and elementary Montessori educators, math leads, and school-level instructional leaders',
  },

  {
    id: 'art-of-observation',
    name: 'The Art of Observation',
    tagline: 'Observation is the foundational Montessori skill. This course builds it.',
    description:
      'Montessori called observation the key to understanding the child. It is also the skill most consistently underdeveloped in Montessori training — assumed rather than taught, praised in principle but rarely practiced with rigor. This course builds observational capacity from the ground up: the interior conditions required, structured protocols, the connection to planning and assessment, and the ethical dimensions that make observation equitable rather than surveilling.',
    outcomes: [
      'Articulate the difference between looking and observing — and what the interior conditions for genuine observation require',
      'Apply structured observation formats — running records, event sampling, anecdotal notes — in the Montessori classroom',
      'Connect what you observe directly to material selection, presentation timing, and lesson planning',
      'Recognize how bias and prior assumption shape what you notice and what you miss',
      'Build a sustainable personal observation practice rooted in Montessori\'s vision of the prepared adult',
    ],
    hours: '7 hours',
    time: 'Total time: 6.5–7 hours (equivalent to one full-day professional development experience)',
    price: '$250',
    format: 'Async, self-paced',
    audience: 'Montessori educators at all levels, aspiring lead teachers, coaches and mentors, and school leaders building a school-wide observation culture',
  },
  {
    id: 'equity-in-montessori',
    name: 'Equity in Montessori: A Practitioner Course',
    tagline: 'Moving from equity statements to equity practice — the hard, necessary work.',
    description:
      'Most Montessori schools have written equity commitments. Fewer have examined their admissions processes, curriculum materials, discipline practices, and family partnerships through an equity lens — rigorously, honestly, and with the intention to change something. This course is designed for educators and school leaders who are past the introductory conversation and ready to engage structurally with what justice actually requires in a Montessori context.',
    outcomes: [
      'Apply structural and systemic frameworks to equity analysis — beyond interpersonal awareness',
      'Examine Montessori admissions, curriculum, and discipline practices for embedded inequity',
      'Build more equitable family partnerships with communities whose backgrounds differ from the dominant school culture',
      'Distinguish between performative equity commitments and institutional equity practice',
      'Develop a personal equity action plan with specific, accountable steps',
    ],
    hours: '7 hours',
    time: 'Total time: 6.5–7 hours (equivalent to one full-day professional development experience)',
    price: '$250',
    format: 'Async, self-paced',
    audience: 'Montessori educators and school leaders who have completed introductory equity work and are ready for practitioner-level structural analysis',
  },
]

export default function CoursesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">Learning Lab</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            Professional learning built on Montessori philosophy and modern research.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-12">
            Short, rigorous, self-paced courses for working Montessori educators. $250 per course &middot; 90-day access from first login.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#courses"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block"
            >
              Browse Courses
            </a>
            <Link
              href="/learning/free-resources"
              className="border border-white text-white text-sm px-8 py-4 tracking-wide hover:bg-white hover:text-[#0e1a7a] transition-colors inline-block"
            >
              Get Free Resources
            </Link>
          </div>
        </div>
      </section>

      {/* About Learning Lab */}
      <section className="bg-[#FAF9F7] py-16 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Format', value: 'Async, self-paced — complete on your schedule' },
              { label: 'Time', value: 'Total time: 6.5–7 hours (equivalent to one full-day professional development experience)' },
              { label: 'Access', value: '90-day access beginning from your first login' },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-[#d6a758] pl-5">
                <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">{item.label}</p>
                <p className="text-[#374151] text-sm leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Current Courses</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Four courses. All built for practitioners doing the real work.
            </h2>
          </div>
          <div className="space-y-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white border border-[#E2DDD6]">
                <div className="p-8 md:p-10 grid md:grid-cols-3 gap-8">
                  {/* Main content */}
                  <div className="md:col-span-2">
                    <div className="w-1 h-8 bg-[#d6a758] mb-6" />
                    <h3 className="text-[#0e1a7a] text-xl font-semibold mb-2" style={serif}>
                      {course.name}
                    </h3>
                    <p className="text-[#64748B] text-sm italic mb-6">{course.tagline}</p>
                    <p className="text-[#374151] text-base leading-relaxed mb-8">
                      {course.description}
                    </p>
                    <div className="mb-6">
                      <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">
                        What you&apos;ll learn
                      </p>
                      <ul className="space-y-3">
                        {course.outcomes.map((outcome, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                            <span className="text-[#374151] text-sm leading-relaxed">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-[#64748B] text-xs">
                      <span className="font-medium text-[#374151]">Designed for: </span>
                      {course.audience}
                    </p>
                  </div>
                  {/* Sidebar */}
                  <div className="bg-[#F2EDE6] p-6 flex flex-col gap-5 self-start">
                    <div>
                      <p className="text-[#64748B] text-xs tracking-[0.1em] uppercase mb-1">Price</p>
                      <p className="text-[#0e1a7a] text-2xl font-semibold" style={serif}>
                        {course.price}
                      </p>
                    </div>
                    <div className="space-y-3 border-t border-[#D4CEC6] pt-4">
                      {[
                        { label: 'Format', value: course.format },
                        { label: 'Time', value: course.time },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-[#64748B] text-xs tracking-[0.1em] uppercase">{item.label}</p>
                          <p className="text-[#374151] text-sm">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <a
                      href={STRIPE_LINKS[course.id]}
                      className="bg-[#d6a758] text-white text-sm px-6 py-3 tracking-wide hover:bg-[#c09240] transition-colors text-center mt-2"
                    >
                      Register Now →
                    </a>
                    <p className="text-[#64748B] text-xs text-center -mt-2">
                      Secure checkout via Stripe. After purchase, you&apos;ll receive an email with instructions to access your course materials and session links.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources Bridge */}
      <section className="bg-[#FAF9F7] py-16 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#374151] text-base">
              Looking for free professional tools?
            </p>
            <p className="text-[#64748B] text-sm mt-1">
              Free e-books, templates, and resources for Montessori leaders and educators.
            </p>
          </div>
          <Link
            href="/learning/free-resources"
            className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-3 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors whitespace-nowrap"
          >
            See Free Resources →
          </Link>
        </div>
      </section>
    </>
  )
}
