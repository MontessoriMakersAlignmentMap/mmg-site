import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const phases = [
  {
    number: '01',
    label: 'Alignment Audit',
    description:
      'A structured diagnostic of where the team is and is not aligned. Surfaces assumptions, unspoken tensions, and the decisions that have never been explicitly made.',
  },
  {
    number: '02',
    label: 'Shared Challenge Work',
    description:
      'The team works through its most pressing organizational challenges together — not to vent, but to reach decisions. Every conversation ends with a clear next step.',
  },
  {
    number: '03',
    label: 'Language & Commitments',
    description:
      'The team builds a shared vocabulary for the work: how decisions get made, how conflict gets named, how accountability functions. Written. Agreed. Actionable.',
  },
  {
    number: '04',
    label: 'Forward Planning',
    description:
      'The retreat closes with a concrete plan — not a list of priorities, but a set of structured commitments with owners, timelines, and accountability mechanisms.',
  },
]

const whoItIsFor = [
  'Heads of school and their full leadership team',
  'Schools entering a major transition — leadership change, expansion, or restructuring',
  'Teams with coordination gaps: skilled individuals working at cross-purposes',
  'Organizations that have grown faster than their internal alignment',
  'Teams preparing for a strategic planning cycle',
]

export default function RetreatPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Leadership Alignment Retreat
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              Alignment before momentum.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
              This retreat is for leadership teams — not individuals. Because the gap between a good team
              and a great one isn&rsquo;t talent. It&rsquo;s alignment.
            </p>
            <p className="text-[#7A8FA3] text-base leading-relaxed mb-12 max-w-2xl">
              Many retreats focus on inspiration. This retreat focuses on alignment. Every conversation
              leads to a decision. Every decision leads to a plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Book a Retreat
              </a>
              <Link
                href="/institute/catalog"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Browse All Programs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Reality</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Individual strength grows into collective clarity — with the right conditions.
            </h2>
          </div>
          <div className="space-y-6 pt-2">
            <p className="text-[#374151] text-lg leading-relaxed">
              Most leadership teams are made up of capable, committed people — who are nonetheless
              working from different understandings of priorities, direction, and how decisions
              get made. Not because they lack skill or intention. Because shared language, shared
              commitments, and explicit shared decisions haven&apos;t been built yet.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              When a team hasn&apos;t aligned on how work gets done, each meeting reflects different
              assumptions. Each initiative carries multiple interpretations. Every hire, every
              policy, every family conversation benefits from shared clarity about why we do
              this and how we decide together.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Alignment doesn&apos;t happen by intention alone. It requires dedicated time,
              skilled facilitation, and the right structure.
            </p>
          </div>
        </div>
      </section>

      {/* What It Is */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What It Is</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Structured. Facilitated. For the full team.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              This is not a team-building experience. It is a working retreat — two to three days of
              structured facilitation with your full leadership team, on-site or at a residential venue
              of your choosing.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4 font-medium">Format</p>
              <p className="text-[#0e1a7a] text-xl font-semibold mb-3" style={serif}>2&ndash;3 Days</p>
              <p className="text-[#374151] text-sm leading-relaxed">
                Customized to your team&rsquo;s situation. Two days for focused alignment work.
                Three days when the team is navigating complex transitions or needs extended planning time.
              </p>
            </div>
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4 font-medium">Location</p>
              <p className="text-[#0e1a7a] text-xl font-semibold mb-3" style={serif}>On-Site or Residential</p>
              <p className="text-[#374151] text-sm leading-relaxed">
                We come to you, or we coordinate an off-site venue. The goal is focused,
                uninterrupted time &mdash; whatever format creates that condition for your team.
              </p>
            </div>
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4 font-medium">Who Attends</p>
              <p className="text-[#0e1a7a] text-xl font-semibold mb-3" style={serif}>The Full Leadership Team</p>
              <p className="text-[#374151] text-sm leading-relaxed">
                Not a selection of senior staff. The people who make decisions together
                need to be in the room together. Alignment built without everyone present
                is partial alignment.
              </p>
            </div>
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4 font-medium">Scope</p>
              <p className="text-[#0e1a7a] text-xl font-semibold mb-3" style={serif}>Custom-Designed</p>
              <p className="text-[#374151] text-sm leading-relaxed">
                Each retreat is designed around your team&rsquo;s specific context, gaps, and goals.
                Scope varies based on team size, duration, and situation. Contact us to begin
                the planning conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Phases */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Retreat Structure</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight" style={serif}>
              Four phases. Every conversation has a purpose.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {phases.map((phase) => (
              <div key={phase.number} className="border border-white/20 p-8">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-[#d6a758] text-xs tracking-[0.2em] font-medium flex-shrink-0 mt-1">
                    {phase.number}
                  </span>
                  <h3 className="text-white text-lg font-semibold" style={serif}>
                    {phase.label}
                  </h3>
                </div>
                <p className="text-[#94A3B8] text-base leading-relaxed pl-8">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Who It&rsquo;s For</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Teams ready to build what the next stage of growth requires.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              The retreat is most valuable when the team is strong — and ready to build the shared
              language, explicit commitments, and coordination structures that will carry the work
              forward. That&rsquo;s not a sign of trouble. That&rsquo;s the work of growth.
            </p>
          </div>
          <div className="space-y-4 pt-2">
            {whoItIsFor.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 py-3 border-b border-[#E2DDD6] last:border-0"
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                <span className="text-[#374151] text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F2EDE6] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#0e1a7a] text-2xl font-medium leading-snug mb-4" style={serif}>
              You don&rsquo;t need a more motivated team. You need an aligned one.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-3">
              The retreat is customized to your team&rsquo;s situation. We begin with a pre-retreat
              conversation to understand what alignment gaps you&rsquo;re working with.
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Availability is limited. Retreats are scheduled at least 6 weeks in advance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap font-medium"
            >
              Book a Retreat
            </a>
            <Link
              href="/institute/register"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Explore Other Pathways &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
