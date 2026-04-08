import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const scope = [
  'Organizational design and leadership role architecture',
  'Governance structure and founding board formation',
  'Hiring infrastructure for first-round staffing',
  'Communication systems (internal and family-facing)',
  'Operational systems design (aligned to MMAP where applicable)',
  'Budget and financial structure basics',
  'Enrollment and admissions process design (structural, not marketing)',
  'Year-one and year-two planning frameworks',
  'Culture architecture from day one',
]

const whoFor = [
  'Founding teams designing a new Montessori school (independent, charter, or public)',
  'Charter applicants developing their organizational model',
  'Schools in years one through five that skipped the infrastructure and are feeling it',
  'Community groups exploring whether a Montessori school is viable',
  'Existing organizations launching a new Montessori program or campus',
]

const formats = [
  {
    label: 'Single Engagement',
    name: 'Feasibility Consultation',
    description:
      'A structured assessment of readiness, viability, and what needs to be true before opening. Two to three sessions covering organizational, financial, and community conditions.',
  },
  {
    label: 'Project-Based',
    name: 'Startup Design Package',
    description:
      'A 3 to 6 month engagement building the full organizational infrastructure for launch: roles, governance, hiring, communication, operations, and culture.',
  },
  {
    label: 'Retained',
    name: 'First-Year Advisory',
    description:
      'Ongoing advisory support through the first year of operation, when the gap between plan and reality is widest and the decisions made have the longest reach.',
  },
]

const connections = [
  {
    label: 'Advisory',
    name: 'Advisory Overview',
    href: '/advisory',
    detail: 'Schools that start here often become full Advisory clients as they move into their second and third years.',
  },
  {
    label: 'Platform',
    name: 'MatchHub',
    href: '/matchhub',
    detail: 'Hiring infrastructure connects directly to the Montessori hiring platform. Build your first team with the right tools.',
  },
  {
    label: 'Platform',
    name: 'MMAP',
    href: '/mmap',
    detail: 'Operational systems can be built on MMAP from day one, so the school grows into a platform rather than onto one.',
  },
  {
    label: 'Resource',
    name: 'Toolbox',
    href: '/toolbox',
    detail: 'Startup schools get immediate value from existing frameworks and templates while the custom work is underway.',
  },
  {
    label: 'Resource',
    name: 'Studio',
    href: '/studio',
    detail: 'Brand, messaging, and web presence for new schools, developed in parallel with organizational design.',
  },
]

export default function StrongSystemsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Advisory · Strong Systems
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              Build the infrastructure before you need to fix it.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              Strong Systems is organizational design, leadership structure, governance, hiring,
              communication, and operations for Montessori schools that are starting up or in
              their first five years.
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

      {/* Why This Exists */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Why This Exists</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Conviction alone doesn&apos;t build the systems a school needs to survive.
            </h2>
          </div>
          <div>
            <p className="text-[#374151] text-base leading-relaxed mb-5">
              Starting a Montessori school is an act of conviction. But founders pour energy into
              philosophy, curriculum, classroom preparation, and enrollment, and the organizational
              infrastructure develops around them by accident. Role clarity, decision-making
              protocols, communication systems, hiring processes, governance structures, financial
              planning: these are the layers that determine whether a school stabilizes or burns
              through its founding team.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              Building those layers intentionally from the start is dramatically less expensive,
              financially and humanly, than repairing them later. Strong Systems exists because
              the work of founding a school should not be repeated twice.
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
              What we build together.
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
              Schools at the beginning, or at the beginning of the beginning.
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
              From a single assessment to a full first year.
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
              Strong Systems connects to the full MMG ecosystem.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              The best time to build the systems is before you need them.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Strong Systems is available at any point in the founding process, from feasibility
              through year one. Earlier is better, but later is still worth it.
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
              href="/advisory"
              className="border border-white/30 text-white text-sm px-12 py-4 tracking-wide hover:border-white/60 transition-colors text-center whitespace-nowrap"
            >
              Explore All Advisory Pathways →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
