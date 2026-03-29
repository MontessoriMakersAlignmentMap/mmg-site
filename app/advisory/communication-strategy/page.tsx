import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const coverageAreas = [
  'Internal communication systems and cadence design',
  'Role clarity and expectation documentation',
  'Staff communication culture and psychological safety',
  'Leadership messaging and transparency practices',
  'Community communication—families, board, staff',
  'Crisis communication planning and protocols',
]

const outcomes = [
  'Fewer surprises—up and down the organization',
  'Decisions that actually land with the people they affect',
  'Staff who feel informed, not managed',
  'Leadership that communicates with intention, not just urgency',
  'Conflict that resolves instead of cycling',
]

const whenNeeded = [
  'High turnover or staff disengagement',
  'Repeated miscommunication between leadership and staff',
  'Community trust issues (families, board)',
  'Leadership transitions that need a communication plan',
  'Organizations scaling and outgrowing informal systems',
]

export default function CommunicationStrategyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Advisory · Communication Strategy
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              Most school conflicts are communication failures in disguise.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              Role confusion, cultural friction, trust erosion—most of it traces back to patterns
              of communication that no one designed and no one examined.
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
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Real Problem</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Communication isn&rsquo;t the issue. Patterns are.
            </h2>
          </div>
          <div>
            <p className="text-[#374151] text-base leading-relaxed">
              Schools don&rsquo;t lack communication—they have too much of the wrong kind.
              Announcements that replace conversation. Policies that substitute for dialogue.
              Meetings that fill calendars without building shared understanding. Communication
              Strategy work doesn&rsquo;t add more—it changes what already exists.
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
              Where this work applies.
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

      {/* The difference this makes */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">The Difference</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-6" style={serif}>
              Communication as infrastructure.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              When communication systems are designed—not inherited—schools move faster, lose fewer
              people, and spend less energy on damage control. The work here is structural: building
              the patterns that make trust possible over time.
            </p>
          </div>
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Outcomes</p>
            <div className="space-y-4">
              {outcomes.map((outcome, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-white/10 last:border-0">
                  <span className="text-[#d6a758] text-sm flex-shrink-0 mt-0.5">—</span>
                  <p className="text-[#94A3B8] text-base leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
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
              Better communication doesn&rsquo;t require more of it.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Communication Strategy engagements begin with a diagnostic—understanding the patterns
              already in place before designing what&rsquo;s missing.
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
              href="/advisory/mapping"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-12 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Explore Montessori Mapping →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
