import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const whoItIsFor = [
  'Schools facing growth transitions',
  'Leadership change or succession',
  'Culture friction or team breakdown',
  'Strategic drift or loss of direction',
  'Schools preparing for accreditation',
]

const phases = [
  {
    label: 'Phase 1',
    name: 'Discovery',
    description:
      '2-week intake: structured interviews with leadership, board, and faculty; document review; culture observation.',
  },
  {
    label: 'Phase 2',
    name: 'Mapping',
    description:
      'Full organizational health report: role clarity audit, communication pattern analysis, culture diagnosis, systems gaps identified, alignment score across six domains.',
  },
  {
    label: 'Phase 3',
    name: 'Planning',
    description:
      '90-day action roadmap with prioritized recommendations, assigned accountabilities, and implementation check-ins built in.',
  },
]

const outcomes = [
  'A clear picture of what\'s working and what isn\'t.',
  'A language your team can use to talk about real problems.',
  'A prioritized roadmap.',
  'Alignment instead of assumption.',
]

const deliverables = [
  {
    name: 'Organizational Health Report',
    description:
      'A written report naming what\'s working, what isn\'t, and the patterns driving both. Designed to be shared with your leadership team, not filed away.',
  },
  {
    name: 'Alignment Score',
    description:
      'A structured assessment of alignment across six organizational domains: mission, culture, communication, roles, leadership, and systems.',
  },
  {
    name: 'Priority Roadmap',
    description:
      'A 90-day action plan with sequenced priorities, clear ownership, and the rationale for each. Not a to-do list—a decision framework.',
  },
  {
    name: 'Implementation Check-Ins',
    description:
      'Two 60-minute follow-up sessions during the 90-day period to adjust, troubleshoot, and keep momentum.',
  },
]

export default function MappingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Montessori Mapping
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              See your school clearly.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              A structured diagnostic and planning process that maps your school&apos;s
              organizational health—across roles, communication, culture, and systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
>
  Book a Consultation
</a>
              <Link
                href="/advisory"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                See All Advisory Pathways →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Who It&apos;s For
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Built for schools that need to see themselves clearly.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Mapping is for schools where the problems are real but hard to name—where
              leaders sense something is off but lack the language or the structure to
              address it together.
            </p>
          </div>
          <div className="space-y-3">
            {whoItIsFor.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-3 border-b border-[#E2DDD6] last:border-0"
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                <span className="text-[#374151] text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Methodology */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              The Methodology
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Diagnostic before prescription.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Montessori Mapping is not an audit with predetermined findings. It&apos;s a structured process for seeing your organization as it actually is—not as it&apos;s described in handbooks or assumed in conversations. The methodology draws from organizational health research, Montessori philosophy, and fifteen years of working inside Montessori schools.
            </p>
          </div>
          <div className="space-y-3 md:pt-16">
            {[
              'Structured listening — Interviews across roles, not just leadership',
              'Document review — Policies, org charts, communications patterns',
              'Culture observation — What the organization does vs. what it says',
              'Synthesis — Named patterns, named gaps, prioritized path forward',
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-3 border-b border-[#E2DDD6] last:border-0"
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                <span className="text-[#374151] text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              How It Works
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Three phases. One clear picture.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              The Mapping process is structured to give you real clarity—not a
              consultant&apos;s summary, but a shared understanding your whole leadership
              team can work from.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {phases.map((phase) => (
              <div
                key={phase.name}
                className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-5"
              >
                <div className="w-1 h-8 bg-[#d6a758]" />
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-[#64748B] mb-1">
                    {phase.label}
                  </p>
                  <h3 className="text-[#0e1a7a] font-semibold text-xl">{phase.name}</h3>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed flex-1">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              What You&apos;ll Have
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight mb-6"
              style={serif}
            >
              Not a report. A foundation.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              When the Mapping process is complete, you don&apos;t just have a document.
              You have the shared clarity to move forward together.
            </p>
          </div>
          <div className="space-y-3">
            {outcomes.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4 border-b border-white/10 last:border-0"
              >
                <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                <span className="text-white text-base leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              What You Receive
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight"
              style={serif}
            >
              Concrete deliverables. Not a summary.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="border border-white/20 p-8"
              >
                <h3 className="text-white font-semibold text-base mb-3" style={serif}>
                  {item.name}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
              Next Step
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4"
              style={serif}
            >
              Ready to see your school clearly?
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Book a consultation to talk through whether Mapping is the right starting
              point for your school.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap"
>
  Book a Consultation
</a>
            <Link
              href="/advisory/coaching"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Explore Leadership Coaching →
            </Link>
          </div>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}
