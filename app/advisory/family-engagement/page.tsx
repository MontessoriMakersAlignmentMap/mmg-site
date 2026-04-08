import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const scope = [
  'Family communication architecture (what gets communicated, when, by whom, in what format)',
  'Parent orientation and onboarding systems (not a single event, but a developmental arc)',
  'Family education programming structure (connected to the Learning venture\'s Family Education Series)',
  'Observation and classroom visit frameworks',
  'Conference and progress communication redesign',
  'Community event strategy that builds understanding, not just goodwill',
  'Family handbook and enrollment communication audit',
  'Guide and family communication protocols and boundaries',
]

const whoFor = [
  'Schools where parent misunderstanding of Montessori creates friction',
  'Schools experiencing enrollment attrition driven by family confusion or unmet expectations',
  'Schools launching or expanding who need family engagement infrastructure from the start',
  'Heads of school who spend disproportionate time managing parent concerns that better systems would prevent',
  'Schools where guides carry the weight of family communication without structural support',
]

const formats = [
  {
    label: 'Single Engagement',
    name: 'Communication Audit',
    description:
      'A structured review of all family-facing communication, with a clear map of where understanding breaks down and what to build in its place.',
    pricing: 'Starting at $2,000',
  },
  {
    label: 'Project-Based',
    name: 'Family Engagement Architecture',
    description:
      'Full design of the family communication and engagement system. A 2 to 4 month engagement covering orientation, education programming, conference design, and guide communication protocols.',
    pricing: 'Starting at $5,000',
  },
  {
    label: 'Retained',
    name: 'Ongoing Family Engagement Advisory',
    description:
      'Quarterly review, annual planning, and on-call support for family engagement systems. For schools committed to treating family alignment as ongoing work.',
    pricing: 'Starting at $8,000/year',
  },
]

const connections = [
  {
    label: 'Advisory',
    name: 'Communication Strategy',
    href: '/advisory/communication-strategy',
    detail: 'Family engagement is one layer of the broader communication strategy work. Many schools need both.',
  },
  {
    label: 'Learning',
    name: 'Family Education Series',
    href: '/learning',
    detail: 'The 10-session family education series is a ready-made tool for schools building their family engagement infrastructure.',
  },
  {
    label: 'Platform',
    name: 'MMAP',
    href: '/mmap',
    detail: 'Family communication modules can be built into MMAP, creating a consistent structure rather than ad hoc solutions.',
  },
  {
    label: 'Resource',
    name: 'Studio',
    href: '/studio',
    detail: 'Family communication is a natural Studio engagement. The Communication Audit can serve as the diagnostic that makes Studio work land.',
  },
]

export default function FamilyEngagementPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Advisory · Family &amp; Community Engagement
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              Family engagement in Montessori is not a newsletter problem. It is an alignment problem.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              Family &amp; Community Engagement helps schools design the systems, language, and
              structures that bring families into genuine understanding of Montessori, rather than
              asking them to take it on faith.
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

      {/* The Problem */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Problem</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Montessori asks more of families than conventional schools do.
            </h2>
          </div>
          <div>
            <p className="text-[#374151] text-base leading-relaxed mb-5">
              Most Montessori schools communicate with families the way conventional schools do:
              newsletters, conferences, open houses, the occasional parent education night. The problem
              is that Montessori requires something fundamentally different from families. It asks them
              to trust a process they didn&apos;t experience themselves, to redefine what progress looks
              like, to hold back on the interventions that feel instinctive.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              That kind of trust doesn&apos;t come from a newsletter. It comes from a communication
              infrastructure that is designed with the same intentionality as the prepared environment:
              layered, developmental, and built to meet families where they are.
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
              Schools where family alignment is the missing piece.
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
              From a single audit to ongoing partnership.
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
              Family engagement connects to the full picture.
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
              Family alignment is organizational work, not communication work.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Family &amp; Community Engagement starts with a conversation about where the current
              system breaks down. A Communication Audit is usually the right first step.
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
              href="/advisory/communication-strategy"
              className="border border-white/30 text-white text-sm px-12 py-4 tracking-wide hover:border-white/60 transition-colors text-center whitespace-nowrap"
            >
              Explore Communication Strategy →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
