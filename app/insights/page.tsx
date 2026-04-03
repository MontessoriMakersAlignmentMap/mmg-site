import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function InsightsPage() {
  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">Insights</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            Where the thinking lives.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed">
            Leadership, adult systems, alignment, hiring, sustainability—and what
            Montessori requires of us now. Patterns named. Assumptions questioned.
          </p>
        </div>
      </section>

      {/* Substack */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Montessori Makers Substack</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              The connective tissue between practice, philosophy, and systems.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-10">
              We explore the ideas beneath the work—what Montessori requires of adult culture,
              what alignment actually looks like in practice, and why so many schools struggle
              to build what they can already imagine.
            </p>
            <a
              href="https://montessorimakers.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors"
            >
              Read on Substack →
            </a>
          </div>
          <div className="bg-[#F2EDE6] p-10 border-l-4 border-[#d6a758]">
            <p className="text-[#0e1a7a] text-2xl leading-snug mb-6" style={serif}>
              &ldquo;The problem isn&apos;t that Montessori schools lack vision—it&apos;s
              that they lack the systems to act on it consistently.&rdquo;
            </p>
            <p className="text-[#64748B] text-sm">— From the Montessori Makers Substack</p>
          </div>
        </div>
      </section>

      {/* Field Pulse */}
      <section id="field" className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Field Pulse</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Signals. Patterns. Direction.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              A recurring signal check on what Montessori leaders are navigating right now.
              Short, anonymous, aggregate. Published monthly.
            </p>
            <p className="text-[#374151] text-sm leading-relaxed mb-8">
              Patterns over exposure. Signals over spectacle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/field-intelligence/latest"
                className="bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center font-medium"
              >
                Read the Latest Pulse &rarr;
              </Link>
              <Link
                href="/field-intelligence/contribute"
                className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
              >
                Contribute
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: 'March 2026', desc: 'Staffing stability. Role clarity. Families asking harder questions.' },
              { label: 'February 2026', desc: 'Board dynamics, mid-year enrollment signals, and the gap between policy and practice.' },
              { label: 'January 2026', desc: 'New year pressures, strategic planning fatigue, and what&rsquo;s actually driving staff transitions.' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#E2DDD6] p-5 flex items-start gap-5">
                <span className="text-[#8A6014] text-[10px] tracking-widest uppercase font-medium flex-shrink-0 mt-0.5 w-28">{item.label}</span>
                <p className="text-[#374151] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
            <Link
              href="/field-intelligence"
              className="text-[#0e1a7a] text-xs font-medium hover:underline tracking-wide block pt-2"
            >
              View all pulses &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-white text-2xl max-w-xl" style={serif}>
            Stay connected to the thinking behind the work.
          </p>
          <a
            href="https://montessorimakers.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors whitespace-nowrap"
          >
            Subscribe on Substack
          </a>
        </div>
      </section>
    </>
  )
}
