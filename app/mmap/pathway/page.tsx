import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const tiers = [
  {
    number: '01',
    id: 'surveyor',
    name: 'Surveyor',
    scope: 'Classroom Level',
    color: '#d6a758',
    description:
      'The foundation. Surveyor gives guides and classroom teams the tools to track, observe, and document learning in a way that actually reflects Montessori practice. No retrofitting generic lesson plan templates \u2014 built for the three-hour work cycle.',
    whoNeedsThis:
      "Any classroom guide who wants to track lesson presentations, record observations, and maintain visibility into each child's progress without the overhead of a generic school platform.",
    features: [
      'Lesson tracking and presentation logs',
      'Observation records and documentation',
      'Classroom material inventory',
      'Individual child progress visibility',
      'Guide workflow and planning tools',
    ],
    link: '/mmap/surveyor',
  },
  {
    number: '02',
    id: 'north-star',
    name: 'North Star',
    scope: 'School Operations',
    color: '#0e7a4f',
    description:
      'North Star handles the operational infrastructure of the school \u2014 student records, attendance, family communication, and daily systems. The layer that keeps the school running so guides can focus on the work.',
    whoNeedsThis:
      'School administrators and operations leads who need reliable, Montessori-aware systems for student records, compliance, and family communication without forcing their workflow into a generic SIS.',
    features: [
      'Student records and profiles',
      'Attendance and daily operations',
      'Family communication tools',
      'School-wide scheduling',
      'Compliance and documentation tracking',
    ],
    link: '/mmap/north-star',
  },
  {
    number: '03',
    id: 'mapmaker',
    name: 'Mapmaker',
    scope: 'Organization Level',
    color: '#1D4ED8',
    description:
      'Mapmaker brings organizational systems into alignment \u2014 admissions, staffing, scheduling, and adult culture. The tier for schools ready to operate as a coherent institution, not a collection of programs.',
    whoNeedsThis:
      'Directors and heads who need to manage admissions pipelines, staff onboarding and culture systems, and organization-level scheduling across programs and teams.',
    features: [
      'Admissions and enrollment management',
      'Staffing and HR systems',
      'Adult culture and performance tools',
      'Organization-level scheduling',
      'Cross-team communication and coordination',
    ],
    link: '/mmap/mapmaker',
  },
  {
    number: '04',
    id: 'atlas',
    name: 'Atlas',
    scope: 'Leadership & Governance',
    color: '#7C3AED',
    description:
      'Atlas is the leadership and governance layer \u2014 finance, board tools, strategic planning, and the insight dashboards that help school leaders make informed, values-aligned decisions at scale.',
    whoNeedsThis:
      'Heads of school, executive directors, and boards who need clear financial visibility, governance tools, and strategic planning infrastructure \u2014 built for Montessori institutions, not adapted from corporate platforms.',
    features: [
      'Financial dashboards and planning',
      'Governance and board tools',
      'Strategic planning workflows',
      'Leadership insight and reporting',
      'Long-range enrollment and financial modeling',
    ],
    link: '/mmap/atlas',
  },
]

const addOns = [
  {
    title: 'MMAS Integration',
    body: 'Connect Montessori-native assessment data directly into MMAP. Observation records, progress documentation, and assessment insights flow between platforms.',
    linkLabel: 'Learn about MMAS \u2192',
    href: '/mmas',
  },
  {
    title: 'Equity Depth Activation',
    body: 'All six equity features are included with every tier. Schools can request a focused equity implementation session to build practice around the data.',
    linkLabel: 'Explore Equity Features \u2192',
    href: '/mmap/equity',
  },
  {
    title: 'Advisory Integration',
    body: 'For schools working with Montessori Makers Advisory, MMAP can be configured to reflect and support the alignment work in progress.',
    linkLabel: 'Explore Advisory \u2192',
    href: '/advisory',
  },
]

export default function MMAPPathwayPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d6a758] flex-shrink-0" />
              <span className="text-white text-xs tracking-[0.15em] uppercase">Pilot Platform &mdash; Limited Early Access</span>
            </div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-8">
              The MMAP Pathway
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Start where you are. Grow into alignment.
            </h1>
            <p className="text-[#64748B] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              The operating system for Montessori schools. Four tiers, one coherent
              system. No patchwork. No competing tools. Just systems that finally
              reflect what you believe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/mmap/demo"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
              >
                Request Early Access
              </Link>
              <a
                href="#tiers"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Explore the Pathway
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">How It Works</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Four tiers that build on each other.
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-[#374151] text-lg leading-relaxed">
              Most schools start at Tier 1 or Tier 2 &mdash; classroom and school operations &mdash;
              and expand as they integrate. Each tier builds on the one before it.
              You don&apos;t have to implement everything at once.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Schools can enter the pathway at any tier. If your classroom systems are
              already strong and you need organizational infrastructure, start at
              Mapmaker. If you&apos;re a new school building from the ground up, start
              at Surveyor and grow.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Schools never need to migrate between platforms or stitch together new tools
              as they grow. The implementation is one. The growth happens inside it.
            </p>
          </div>
        </div>
      </section>

      {/* Tier cards */}
      <section id="tiers" className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Pathway</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight" style={serif}>
              Four tiers. One coherent system.
            </h2>
          </div>
          <div className="space-y-6">
            {tiers.map((tier) => (
              <div key={tier.id} className="bg-white border border-[#E2DDD6] p-10">
                <div className="grid md:grid-cols-3 gap-10">
                  <div className="md:col-span-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-1 h-10 flex-shrink-0" style={{ backgroundColor: tier.color }} />
                      <div>
                        <span className="text-xs tracking-[0.15em] uppercase block mb-0.5" style={{ color: tier.color }}>
                          Tier {tier.number}
                        </span>
                        <h3 className="text-[#0e1a7a] font-semibold text-2xl" style={serif}>
                          {tier.name}
                        </h3>
                        <p className="text-[#64748B] text-xs uppercase tracking-wider mt-0.5">
                          {tier.scope}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <p className="text-[#374151] text-sm leading-relaxed mb-4">{tier.description}</p>
                    <p className="text-[#64748B] text-xs italic leading-relaxed">
                      <span className="not-italic font-medium text-[#374151]">Who needs this: </span>
                      {tier.whoNeedsThis}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">
                      What&apos;s included
                    </p>
                    <ul className="space-y-2 mb-5">
                      {tier.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                          <span className="flex-shrink-0 mt-0.5" style={{ color: tier.color }}>—</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={tier.link}
                      className="text-[#0e1a7a] text-xs font-medium hover:underline"
                    >
                      Explore {tier.name} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons and activations */}
      <section className="bg-white py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Add-Ons &amp; Activations
            </p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              Every tier can grow deeper.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Each pathway tier includes its core features at activation. Schools can add
              depth to any tier through focused activations&mdash;additional modules that extend
              functionality without requiring an upgrade.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map((addon) => (
              <div key={addon.title} className="bg-[#FAF9F7] border border-[#E2DDD6] p-6">
                <h3 className="text-[#0e1a7a] font-semibold text-lg mb-3" style={serif}>
                  {addon.title}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed mb-4">{addon.body}</p>
                <Link href={addon.href} className="text-[#0e1a7a] text-xs font-medium hover:underline">
                  {addon.linkLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot cohort */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Pilot Cohort</p>
            <h2 className="text-4xl md:text-5xl text-white leading-tight mb-8" style={serif}>
              Early access. Locked pricing. Founding partnership.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-6">
              MMAP is currently accepting schools into the pilot cohort. Pilot
              participants receive structured onboarding, direct access to the
              product team, and pricing locked at the pilot rate &mdash; for as long
              as they remain on the platform.
            </p>
            <p className="text-[#94A3B8] text-base leading-relaxed mb-10">
              This is not a beta test. Pilot schools are founding partners &mdash;
              shaping what MMAP becomes.
            </p>
            <Link
              href="/mmap/demo"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block"
            >
              Request a Demo
            </Link>
          </div>
          <div className="space-y-0">
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">Pilot cohort includes</p>
            {[
              'Early access to all four pathway tiers',
              'Structured onboarding and implementation support',
              'Direct line to Hannah and the MMAP team',
              'Pricing locked at pilot rate',
              'Priority feature request consideration',
              'Founding partner status as MMAP evolves',
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4 border-b border-white/10 last:border-0"
              >
                <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                <span className="text-white text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equity callout */}
      <section className="bg-[#F2EDE6] py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-[#E2DDD6] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Equity Features</p>
              <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
                Equity is not a module. It runs through every tier.
              </h2>
              <p className="text-[#374151] text-base leading-relaxed">
                Equity features are active across all four pathway tiers &mdash; not
                locked behind a premium add-on. From peace and restoration logs
                to financial equity dashboards, these tools are part of the
                infrastructure, not an afterthought.
              </p>
            </div>
            <Link
              href="/mmap/equity"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors whitespace-nowrap flex-shrink-0"
            >
              Explore Equity Features &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Ready to Start</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              See MMAP in action.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Request a demo to walk through the pathway tier by tier &mdash; or start
              at whichever level is most relevant to where your school is right now.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/mmap/demo"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap"
            >
              Request a Demo
            </Link>
            <Link
              href="/mmap/equity"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Explore Equity Features &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
