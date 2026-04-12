import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const equityFeatures = [
  {
    number: '01',
    name: 'Peace & Restoration Log',
    description:
      'Track restorative conversations and peace outcomes across the school community. Not for compliance — for continuity. See patterns, honor the process, and ensure restorative practices are sustained across time and staff transitions.',
  },
  {
    number: '02',
    name: 'Equity Dashboards',
    description:
      'Attendance, participation, and intervention patterns broken down by demographics. The data surfaces what is easy to overlook in day-to-day operations — giving school leaders the visibility to respond with intention.',
  },
  {
    number: '03',
    name: 'Family Belonging Index',
    description:
      'Survey and track how families across backgrounds experience belonging at the school. A regularly updated index that helps schools understand whether their stated commitment to community is being felt by every family — not just those who already feel at home.',
  },
  {
    number: '04',
    name: 'Staff Culture Insights',
    description:
      'Data on adult community health, trust, and belonging. Equity within a school extends to the adults who work there. This tool surfaces patterns in staff experience — by role, background, and tenure — so leadership can see the full picture.',
  },
  {
    number: '05',
    name: 'Financial Equity Lens',
    description:
      'Track financial aid, tuition equity, and access patterns across the school community. Understand whether your financial model is enabling access or limiting it — and see how those patterns shift over time.',
  },
  {
    number: '06',
    name: 'Data-Informed Action Library',
    description:
      'Curated interventions and resources connected to equity data patterns. When the dashboards surface a concern, the Action Library helps teams know what to do next — concrete, research-informed practices tied directly to what the data shows.',
  },
]

const practiceSteps = [
  {
    label: 'Data',
    description:
      'Equity dashboards, attendance patterns, family belonging surveys, and staff culture data run continuously — across all four MMAP tiers.',
  },
  {
    label: 'Insight',
    description:
      'Patterns surface through regular reports and visualizations that don\'t require a data team to interpret. Designed for school leaders who already carry significant cognitive load.',
  },
  {
    label: 'Action',
    description:
      'The Data-Informed Action Library connects what the data shows to what the school can actually do — real interventions, not generic recommendations.',
  },
]

export default function MMAPEquityPage() {
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
              MMAP — Equity Features
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Equity built into the infrastructure.
            </h1>
            <p className="text-[#64748B] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Not an add-on. Not a module. Equity features run through every tier
              of the MMAP platform — active from day one, available to every school
              on the pathway.
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
                See the Full Platform
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Crystal clear framing strip */}
      <section className="bg-white py-10 md:py-12 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">The Design Principle</p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
            Equity in MMAP is not a separate feature.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed max-w-2xl mx-auto mt-4">
            It is woven into how schools observe, support, communicate, and make decisions.
            Every dashboard, every workflow, every data point is built to surface what
            equity requires&mdash;not in a separate module, but in the daily operations of the school.
          </p>
        </div>
      </section>

      {/* Architecture section */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Principle</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Equity Is Not an Add-On. It&apos;s the architecture.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              Most school platforms treat equity as a bolt-on feature — a compliance
              checklist tucked into a settings menu. MMAP was built differently.
              Equity is embedded into the data model, the dashboards, and the workflows
              across all four pathway tiers.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              These features are active for every school on the platform — not gated
              behind a premium tier. If you are using MMAP, you have the tools. What
              you do with them is up to you and your community.
            </p>
          </div>
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Belief</p>
            <div className="bg-[#F2EDE6] border border-[#E2DDD6] p-8">
              <p className="text-[#0e1a7a] text-xl leading-relaxed font-semibold mb-6" style={serif}>
                &ldquo;Peace is not sustained by good intentions alone. It requires
                structures that help communities notice inequities and respond
                with care.&rdquo;
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                This is not an aspirational statement — it is the design principle
                that runs through every equity feature in MMAP. Structures matter.
                Data matters. The ability to see what is happening and do something
                about it matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 features */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Equity Features</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Six features. Every tier. No exceptions.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Each feature is designed to surface what is easy to miss — and to make
              it possible to respond with intention rather than reaction.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {equityFeatures.map((feature) => (
              <div key={feature.number} className="bg-white border border-[#E2DDD6] p-8">
                <div className="flex items-start gap-5">
                  <span className="text-[#8A6014] text-xs tracking-[0.15em] uppercase flex-shrink-0 mt-1 w-6">
                    {feature.number}
                  </span>
                  <div>
                    <h3 className="text-[#0e1a7a] font-semibold text-lg mb-3" style={serif}>
                      {feature.name}
                    </h3>
                    <p className="text-[#374151] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How this works in practice */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">How It Works in Practice</p>
            <h2 className="text-4xl md:text-5xl text-white leading-tight mb-6" style={serif}>
              Data for action, not compliance.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              MMAP equity features are designed to move schools from data collection
              to genuine response. The loop is simple — and intentional.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {practiceSteps.map((step, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8">
                <div className="flex items-center gap-4 mb-6">
                  {i < practiceSteps.length - 1 && (
                    <div className="hidden md:block absolute" />
                  )}
                  <span className="text-[#8A6014] text-2xl font-bold" style={serif}>
                    {step.label}
                  </span>
                  {i < practiceSteps.length - 1 && (
                    <span className="text-[#64748B] text-lg">→</span>
                  )}
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl">
            <p className="text-[#64748B] text-base leading-relaxed mb-4">
              This is not about generating reports to share with a board. It&apos;s
              about giving the people closest to the work — guides, directors, heads —
              the visibility they need to make better decisions for the children and
              families in their care.
            </p>
            <p className="text-white text-base font-medium leading-relaxed">
              Equity data without action structures is surveillance. MMAP builds the
              action structures in.
            </p>
          </div>
        </div>
      </section>

      {/* Not a premium add-on callout */}
      <section className="bg-[#FAF9F7] py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-[#E2DDD6] p-10 md:p-14">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Available at Every Tier</p>
                <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
                  These features are not a premium add-on.
                </h2>
                <p className="text-[#374151] text-base leading-relaxed">
                  Schools on the MMAP Pilot Cohort have access to all six equity
                  features from day one — across all four pathway tiers. The
                  decision to build equity into the architecture rather than
                  monetize it separately is intentional and permanent.
                </p>
              </div>
              <div className="space-y-0">
                {[
                  'Active across Surveyor, North Star, Mapmaker, and Atlas',
                  'Included in pilot cohort at no additional cost',
                  'Not gated by tier or plan level',
                  'Designed with Montessori values at the center',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-4 border-b border-[#E2DDD6] last:border-0"
                  >
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                    <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">See the Full Platform</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              Equity is one part of a complete system.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              See how equity features fit into the full MMAP Pathway — and what
              it looks like to run a Montessori school on infrastructure that
              actually reflects your values.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/mmap/pathway"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap"
            >
              See the Full Platform
            </Link>
            <Link
              href="/mmap/demo"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Request a Demo →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
