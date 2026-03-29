import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

export default function FieldPulsePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Field Pulse
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              Signals. Patterns. Direction.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
              A recurring signal check on what Montessori leaders are navigating right now.
              Short, anonymous, aggregate. Published monthly.
            </p>
            <p className="text-[#7A8FA3] text-base leading-relaxed mb-12 max-w-2xl">
              Patterns over exposure. Signals over spectacle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/field-intelligence/latest"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Read the Latest Pulse &rarr;
              </Link>
              <Link
                href="/field-intelligence/contribute"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Contribute to the Next Pulse
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Field Pulse Is */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What This Is</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              A signal journal, not a dashboard.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              Field Pulse is a monthly snapshot of what Montessori leaders are carrying:
              the pressures, questions, and patterns showing up across the field right now.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              It is not a survey platform. It is not a research report. It is a disciplined,
              recurring check-in &mdash; short enough to read in five minutes, grounded enough
              to be worth keeping.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              Each pulse names 3 signals, offers brief interpretation, and notes what is
              early versus settled. Nothing is overclaimed. Everything is from the field.
            </p>
          </div>
          <div className="space-y-0">
            {[
              { label: 'Anonymous', desc: 'No individual is identified. Patterns only.' },
              { label: 'Aggregate', desc: 'Signals emerge from multiple voices, not one.' },
              { label: 'Monthly', desc: 'Regular enough to track direction. Not so frequent it loses signal.' },
              { label: 'Concise', desc: 'Three signals. Short interpretation. A directional note. Nothing more.' },
            ].map((item, i) => (
              <div key={i} className="py-5 border-b border-[#E2DDD6] first:border-t flex items-start gap-5">
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                <div>
                  <p className="text-[#0e1a7a] text-sm font-semibold mb-1">{item.label}</p>
                  <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Snapshot Preview */}
      <section className="bg-[#F2EDE6] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Latest Pulse</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              March 2026
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              {
                signal: 'Signal 01',
                title: 'Staffing stability is the question underneath every other question.',
                note: 'Recurring signal across school sizes and geographies.',
              },
              {
                signal: 'Signal 02',
                title: 'Leaders are carrying more ambiguity about role clarity than a year ago.',
                note: 'Early signal &mdash; not yet definitive.',
              },
              {
                signal: 'Signal 03',
                title: 'Families are asking harder questions about the gap between philosophy and practice.',
                note: 'Directional pattern. Strengthening.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-[#E2DDD6] p-7 flex flex-col gap-4"
              >
                <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase font-medium">
                  {item.signal}
                </p>
                <p className="text-[#0e1a7a] text-base font-semibold leading-snug flex-1" style={serif}>
                  {item.title}
                </p>
                <p
                  className="text-[#64748B] text-xs border-t border-[#F2EDE6] pt-4"
                  dangerouslySetInnerHTML={{ __html: item.note }}
                />
              </div>
            ))}
          </div>
          <Link
            href="/field-intelligence/latest"
            className="inline-flex items-center gap-3 border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors"
          >
            Read the Full March Pulse &rarr;
          </Link>
        </div>
      </section>

      {/* Why This Exists */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Why This Exists</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Most of what leaders carry privately, they carry alone.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              The pressures shaping Montessori schools right now &mdash; financial, relational,
              structural &mdash; are not unique to any one leader. They are field-wide patterns.
              But they rarely get named in public.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              Field Pulse exists to surface those patterns: not to expose individuals, but to
              help leaders see that what they are carrying is shared &mdash; and that direction
              can be found in the aggregate signal.
            </p>
          </div>
          <div className="bg-[#0e1a7a] p-10">
            <p className="text-white text-xl leading-snug mb-6" style={serif}>
              &ldquo;Patterns over exposure. Signals over spectacle.&rdquo;
            </p>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
              Field Pulse is part of the Montessori Makers ecosystem &mdash; a project committed
              to supporting Montessori leaders with rigorous, honest, practical work.
            </p>
            <a
              href="https://montessorimakers.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d6a758] text-xs tracking-wide hover:underline"
            >
              Read deeper analysis on the MMG Substack &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTAs */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-white text-2xl leading-snug mb-3" style={serif}>
              Stay with the signal.
            </p>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Subscribe to receive each month&rsquo;s pulse when it publishes.
              No extras. Just the signal.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/field-intelligence/contribute"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium whitespace-nowrap"
            >
              Take the Current Pulse &rarr;
            </Link>
            <a
              href="https://montessorimakers.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center whitespace-nowrap"
            >
              Subscribe on Substack
            </a>
          </div>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}
