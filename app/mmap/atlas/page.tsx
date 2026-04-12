import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const features = [
  {
    title: 'Financial Dashboards & Planning',
    body: 'Financial visibility built for Montessori institutions—not adapted from corporate accounting tools. Revenue, expenses, financial aid patterns, and enrollment-revenue relationships visible in one dashboard, organized around the decisions school leaders actually make.',
  },
  {
    title: 'Governance & Board Tools',
    body: 'Board meeting documentation, governance records, policy tracking, and the board communication infrastructure that supports healthy school governance. Everything a board needs—and nothing it doesn\'t.',
  },
  {
    title: 'Strategic Planning Workflows',
    body: 'Multi-year planning tools that connect strategic goals to operational realities. Track initiatives, measure progress, and see how the school\'s long-range direction is playing out against real data.',
  },
  {
    title: 'Leadership Insight & Reporting',
    body: 'Longitudinal insight across all four tiers—from classroom trends to financial health. The view that helps a head of school see the school as a whole, not as disconnected departments.',
  },
  {
    title: 'Long-Range Enrollment & Financial Modeling',
    body: 'Model enrollment scenarios, financial aid impacts, and growth trajectories against real data. Informed decisions about capacity, sustainability, and long-term health.',
  },
  {
    title: 'Equity at the Leadership Level',
    body: 'The full equity dashboard in its leadership context—financial equity patterns, family belonging trends, staff culture health—visible to governance alongside operational and financial data.',
  },
]

const whoItIsFor = [
  'Heads of school carrying financial and strategic responsibility',
  'Executive directors managing multi-program or multi-site institutions',
  'Board members who need governance tools and real visibility',
  'Leadership teams engaged in strategic planning',
  'Schools preparing for accreditation, expansion, or succession',
]

const callouts = [
  {
    title: 'No spreadsheet assembly',
    body: 'Leadership data drawn from the live system',
  },
  {
    title: 'No disconnected board tools',
    body: 'Governance lives where the institution lives',
  },
  {
    title: 'No financial guesswork',
    body: 'Enrollment and financial data modeled together',
  },
]

const pathwayCards = [
  {
    title: 'Surveyor',
    desc: 'Classroom visibility',
    href: '/mmap/surveyor',
    current: false,
  },
  {
    title: 'North Star',
    desc: 'School operations',
    href: '/mmap/north-star',
    current: false,
  },
  {
    title: 'Mapmaker',
    desc: 'Organizational systems',
    href: '/mmap/mapmaker',
    current: false,
  },
  {
    title: 'Atlas',
    desc: 'Leadership & governance',
    href: null,
    current: true,
  },
]

export default function AtlasPage() {
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
              MMAP · Atlas · Tier 04
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Leadership stewardship for schools built to last.
            </h1>
            <p className="text-[#64748B] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Atlas is the governance and leadership layer—financial visibility, board tools, strategic planning, and the insight that enables leaders to make values-aligned decisions at institutional scale. Not admin software. A leadership environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/mmap/demo"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
              >
                Request Early Access
              </Link>
              <Link
                href="/mmap/pathway"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Explore the Full Pathway &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Atlas Is */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Tier 04</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              The leadership layer. For institutions that are ready to be governed, not just managed.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Atlas is where MMAP becomes a leadership environment. Financial dashboards, board tools, strategic planning workflows, and the longitudinal insight that helps heads of school and boards make decisions grounded in real data—organized around Montessori values, not adapted from corporate governance tools. Atlas doesn&apos;t add data. It makes the data already in the system visible at the level where it becomes institutional stewardship.
            </p>
          </div>
          <div className="bg-[#F2EDE6] border border-[#E2DDD6] p-8">
            <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase mb-4">The design principle</p>
            <p className="text-[#374151] text-base leading-relaxed italic">
              &ldquo;The head of school should be able to see the school clearly—from classroom outcomes to financial health to board alignment—without assembling the picture from six different sources. Atlas is that view.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Who It&apos;s For</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight max-w-2xl" style={serif}>
              For heads and boards navigating institutional responsibility.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <p className="text-[#374151] text-lg leading-relaxed">
              Atlas is built for heads of school, executive directors, and board members who need the financial visibility, governance infrastructure, and strategic planning tools to lead a Montessori institution sustainably. It draws from the full depth of MMAP—classroom data, operational records, organizational systems—and surfaces what leadership needs to see.
            </p>
            <ul className="space-y-4">
              {whoItIsFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#374151]">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                  <span className="text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What Atlas Supports */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Core Features</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              What you can do inside Atlas.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <div key={i} className="bg-[#FAF9F7] border border-[#E2DDD6] p-6">
                <h3 className="text-[#0e1a7a] font-semibold text-base mb-3" style={serif}>
                  {feature.title}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Feels in Practice */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">In Practice</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-8" style={serif}>
              A governance month with Atlas.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              The head of school prepares for a board meeting. She opens Atlas and pulls the governance report—financial trends, enrollment health, strategic initiative progress, equity indicators. It takes twenty minutes to prepare what used to take a week. The board reviews three pages of clear, contextual data instead of a stack of spreadsheets assembled from different systems. After the meeting, the board chair asks about the three-year financial model for a proposed expansion. It&apos;s already in Atlas. The data is there. The decisions can be made. The school is led—not just managed.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {callouts.map((callout, i) => (
              <div key={i} className="border border-white/15 p-6 text-center">
                <p className="text-white font-semibold text-base mb-2">{callout.title}</p>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{callout.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Full Picture */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Complete System</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Atlas completes the pathway.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              With Atlas active, MMAP holds every level of the Montessori school—from the classroom work cycle to the boardroom. Classroom data flows into school records. School records flow into organizational systems. Organizational data surfaces at the leadership level as institutional intelligence. The school is one coherent, visible, well-governed institution.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {pathwayCards.map((card, i) => {
              if (card.current) {
                return (
                  <div key={i} className="bg-[#0e1a7a] p-5">
                    <p className="text-white text-sm font-semibold mb-1">{card.title}</p>
                    <p className="text-[#94A3B8] text-xs">{card.desc}</p>
                  </div>
                )
              }
              return (
                <Link key={i} href={card.href!} className="bg-white border border-[#E2DDD6] p-5 hover:border-[#d6a758] transition-colors">
                  <p className="text-[#0e1a7a] text-sm font-semibold mb-1">{card.title}</p>
                  <p className="text-[#64748B] text-xs">{card.desc}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Ready to See Atlas?</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Request a walkthrough of Atlas.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              We&apos;ll walk through governance tools, financial dashboards, and strategic planning infrastructure in the context of your school&apos;s current leadership systems.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/mmap/demo"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
            >
              Request a Walkthrough
            </Link>
            <Link
              href="/mmap/pathway"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
            >
              Explore the Full MMAP Pathway &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
