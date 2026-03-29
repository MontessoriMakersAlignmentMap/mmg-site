import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const coverageAreas = [
  'Transition planning and timeline design',
  'Outgoing leader knowledge transfer and documentation',
  'Board expectations alignment and role clarity',
  'Staff communication and culture bridging',
  'Incoming leader onboarding and integration',
  'First 90-day advisory support for new leadership',
]

const phases = [
  {
    label: 'Phase 1',
    title: 'Preparation',
    detail:
      '6–12 weeks before the transition: mapping what the incoming leader needs to know, what the board needs to communicate, and what the community needs to hear.',
  },
  {
    label: 'Phase 2',
    title: 'Transition',
    detail:
      'The handover period: facilitating knowledge transfer, supporting communication strategy, and keeping the organization stable while leadership changes.',
  },
  {
    label: 'Phase 3',
    title: 'Integration',
    detail:
      'First 90 days in role: advisory support for the new leader as they navigate the real work of building trust and establishing direction.',
  },
]

const whenNeeded = [
  'Planned retirements and successions',
  'Unexpected or emergency leadership changes',
  'Schools hiring their first head of school',
  'Leadership promotions from within',
  'Multi-site leadership restructuring',
]

export default function LeadershipTransitionSupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Advisory · Leadership Transition Support
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              Leadership change is one of the most consequential moments in a school&rsquo;s life.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              When transitions struggle, it&rsquo;s rarely about the incoming leader&rsquo;s
              capability. It&rsquo;s about the systems, culture, and expectations that weren&rsquo;t
              ready to receive them.
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

      {/* The problem */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Why Transitions Fail</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Most transitions leave too much to chance.
            </h2>
          </div>
          <div>
            <p className="text-[#374151] text-base leading-relaxed">
              Outgoing leaders carry institutional knowledge that rarely gets documented. Boards
              hold expectations that often go unspoken. Staff navigate loyalties and uncertainty
              that predate the new hire. The incoming leader steps into a system that wasn&rsquo;t
              designed to receive them — and the gap shows. Leadership Transition Support closes it.
            </p>
          </div>
        </div>
      </section>

      {/* What this covers */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Scope</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              What we work on together.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {coverageAreas.map((area, i) => (
              <div key={i} className="bg-white border border-[#E2DDD6] p-7 flex items-start gap-4">
                <span className="text-[#8A6014] text-sm flex-shrink-0 mt-0.5">—</span>
                <p className="text-[#374151] text-base leading-relaxed">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three phases */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">How It Works</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight" style={serif}>
              Three phases. One continuous arc.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {phases.map((phase) => (
              <div key={phase.label} className="border border-white/15 p-8">
                <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-3">{phase.label}</p>
                <h3 className="text-white text-xl font-semibold mb-4" style={serif}>
                  {phase.title}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{phase.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When schools need this */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">When Schools Need This</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              The circumstances that call for this work.
            </h2>
          </div>
          <div className="space-y-4">
            {whenNeeded.map((item, i) => (
              <div key={i} className="flex items-start gap-4 py-4 border-b border-[#E2DDD6] last:border-0">
                <span className="text-[#8A6014] text-sm flex-shrink-0 mt-0.5">—</span>
                <p className="text-[#374151] text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F2EDE6] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              The best time to plan a transition is before you need one.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Leadership Transition Support is available for schools in active transition and schools
              planning ahead. Either is a valid starting point.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#0e1a7a] text-white text-sm px-12 py-5 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap font-medium"
>
  Book a Consultation
</a>
            <Link
              href="/advisory/partnership"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-12 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Explore Strategic Partnership →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
