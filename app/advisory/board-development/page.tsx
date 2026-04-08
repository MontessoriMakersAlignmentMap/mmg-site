import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const scope = [
  'Board role clarity and expectations setting',
  'Board and head of school relationship architecture',
  'Governance vs. management boundary definition',
  'New board member orientation and onboarding',
  'Board self-assessment and evaluation',
  'Strategic planning facilitation for boards',
  'Annual board retreat design and facilitation',
  'Bylaws and governance document review (structural, not legal)',
  'Committee structure and effectiveness',
  'Succession planning at the governance level',
]

const whoFor = [
  'Boards without formal governance training or structure',
  'Schools preparing for or recovering from leadership transitions',
  'Heads of school who need their board to function as a strategic partner, not an oversight body',
  'Schools where board and head dynamics are a source of friction rather than strength',
  'New boards forming for startup or charter schools',
]

const formats = [
  {
    label: 'Single Engagement',
    name: 'Board Retreat',
    description:
      'A facilitated half-day or full-day retreat for the full board. Used to reset expectations, clarify roles, align on governance fundamentals, or begin strategic planning.',
    pricing: 'Starting at $5,000',
  },
  {
    label: 'Multi-Session',
    name: 'Board Formation Series',
    description:
      '4 to 6 sessions over 3 to 6 months building governance infrastructure from the ground up. Designed for boards that have inherited structure without ever examined it.',
    pricing: 'Starting at $10,000',
  },
  {
    label: 'Retained',
    name: 'Ongoing Board Advisory',
    description:
      'Quarterly facilitation, annual retreat, and on-call advisory support. For boards committed to governance as a continuous practice rather than a periodic intervention.',
    pricing: 'Starting at $20,000/year',
  },
]

const connections = [
  {
    label: 'Advisory',
    name: 'Leadership Transition Support',
    href: '/advisory/leadership-transition-support',
    detail: 'Board governance is often the critical variable in whether a transition holds.',
  },
  {
    label: 'Advisory',
    name: 'Strategic Partnerships',
    href: '/advisory/partnership',
    detail: 'Retained advisory engagements frequently include board facilitation as part of the work.',
  },
  {
    label: 'Institute',
    name: 'Leadership Formation',
    href: '/institute',
    detail: 'Board members and governance leaders benefit from the Institute\'s applied seminars.',
  },
  {
    label: 'Resource',
    name: 'Toolbox',
    href: '/toolbox',
    detail: 'The Board Alignment Toolkit is a complementary resource for boards beginning this work.',
  },
]

export default function BoardDevelopmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Advisory · Board Development
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              Boards deserve the same intentionality as the classroom.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              Board Development builds governance capacity from the inside, not through generic
              nonprofit board training, but through Montessori-specific formation that treats
              governance as organizational infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Book a Consultation
              </a>
              <Link
                href="/advisory"
                className="border border-white/30 text-white text-sm px-10 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                See All Advisory Pathways →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Pattern We See */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Pattern We See</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Most Montessori boards were never designed to govern.
            </h2>
          </div>
          <div>
            <p className="text-[#374151] text-base leading-relaxed mb-5">
              Most Montessori school boards are composed of parents who care deeply about the school
              and have no training in governance, fiduciary responsibility, or the specific dynamics
              of leading a mission-driven organization. Board members rotate. Institutional memory
              disappears. The relationship between the board and the head of school is often undefined
              or defined by precedent rather than design.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              The result is governance that reacts rather than leads, and heads of school who carry
              weight the board should be sharing. That pattern is not a character flaw. It is a
              structural problem, and structural problems have structural solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Scope</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              What we work on together.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {scope.map((item, i) => (
              <div key={i} className="bg-white border border-[#E2DDD6] p-7 flex items-start gap-4">
                <span className="text-[#8A6014] text-sm flex-shrink-0 mt-0.5">—</span>
                <p className="text-[#374151] text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Who It&apos;s For</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight" style={serif}>
              Schools where governance is the missing layer.
            </h2>
          </div>
          <div className="space-y-4 md:pt-16">
            {whoFor.map((item, i) => (
              <div key={i} className="flex items-start gap-4 py-4 border-b border-white/10 last:border-0">
                <span className="text-[#d6a758] text-sm flex-shrink-0 mt-0.5">—</span>
                <p className="text-white text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Formats */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Engagement Formats</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              From a single retreat to year-round partnership.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {formats.map((format) => (
              <div key={format.name} className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-5">
                <div className="w-1 h-8 bg-[#d6a758]" />
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-[#64748B] mb-1">{format.label}</p>
                  <h3 className="text-[#0e1a7a] font-semibold text-xl" style={serif}>{format.name}</h3>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed flex-1">{format.description}</p>
                <p className="text-[#8A6014] text-sm font-medium">{format.pricing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How This Connects */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Connected Work</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Board Development doesn&apos;t exist in isolation.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {connections.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="bg-white border border-[#E2DDD6] p-7 flex flex-col gap-3 hover:border-[#0e1a7a] transition-colors group"
              >
                <p className="text-xs tracking-[0.15em] uppercase text-[#64748B]">{item.label}</p>
                <h3 className="text-[#0e1a7a] font-semibold text-lg group-hover:underline" style={serif}>
                  {item.name}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">{item.detail}</p>
                <span className="text-[#8A6014] text-sm mt-auto">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0e1a7a] py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-6" style={serif}>
              Strong boards don&apos;t happen by accident.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Board Development is available as a single engagement or a sustained partnership.
              Either is a valid starting point.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-white text-sm px-12 py-5 tracking-wide hover:bg-[#c09240] transition-colors text-center whitespace-nowrap font-medium"
            >
              Book a Consultation
            </a>
            <Link
              href="/advisory/leadership-transition-support"
              className="border border-white/30 text-white text-sm px-12 py-4 tracking-wide hover:border-white/60 transition-colors text-center whitespace-nowrap"
            >
              Explore Leadership Transition Support →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
