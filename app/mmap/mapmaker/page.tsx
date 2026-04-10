import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const features = [
  {
    title: 'Admissions Pipeline',
    body: 'A structured admissions system built for Montessori, from inquiry through enrollment. Inquiries, applications, tours, agreements, and placement all in one place. Connected directly to student records in North Star.',
  },
  {
    title: 'HR Hub: Staffing & Adult Culture',
    body: 'Staff records, contracts, onboarding workflows, appraisals, coaching, upward feedback, and PTO all in one system. Designed for the specific documentation patterns of Montessori schools. Not adapted from corporate HR software.',
  },
  {
    title: 'Equity & Belonging',
    body: 'Community portraits, student equity dashboard, pulse analytics, ABAR pathways, adult culture hub, and role clarity tools. Equity is visible at the organizational level, not buried in a separate system or reserved for a special project.',
  },
  {
    title: 'Academic Tools',
    body: 'Progress reports, conference tools, and assessment benchmarks built for Montessori documentation standards. Reports that reflect the continuum, not the report card.',
  },
  {
    title: 'Adolescent Program',
    body: 'A dedicated module for Montessori adolescent programs: program hub, council, seminars, occupations, portrait of a graduate, and trips. The secondary level tools that generic school software has never included.',
  },
  {
    title: 'Cartography Sessions',
    body: 'Structured facilitation sessions built into the platform for school-wide alignment work. The tool for bringing data and conversation together in the right format for organizational decision-making.',
  },
]

const featureGroups = [
  {
    label: 'Admissions',
    items: ['Pipeline', 'Inquiries', 'Applications', 'Tours', 'Enrollments', 'Agreements', 'Placement Builder', 'Templates', 'Settings'],
  },
  {
    label: 'HR',
    items: ['HR Hub', 'Appraisals', 'Coaching', 'Upward Feedback', 'PTO', 'Staff Calendar & Dashboard', 'HR Templates', 'HR Compliance', 'Onboarding', 'SSO'],
  },
  {
    label: 'Equity',
    items: ['Community Portraits', 'Student Equity Dashboard', 'Pulse Analytics', 'ABAR Pathways', 'Adult Culture Hub', 'PAI', 'Role Clarity'],
  },
  {
    label: 'Academic',
    items: ['Progress Reports', 'Conference Tools', 'Assessment Benchmarks'],
  },
  {
    label: 'Adolescent',
    items: ['Program Hub', 'Council', 'Seminars', 'Occupations', 'Portrait of a Graduate', 'Trips'],
  },
  {
    label: 'Other',
    items: ['Cartography Sessions'],
  },
]

const whoItIsFor = [
  'Heads of school managing organization-level systems',
  'Admissions directors building structured enrollment pipelines',
  'Operations and HR leads coordinating staff systems',
  'Directors overseeing multiple programs or campuses',
  'Schools preparing for growth, accreditation, or leadership transition',
]

const callouts = [
  {
    title: 'No siloed admissions system',
    body: 'Enrollment data connects directly to student records',
  },
  {
    title: 'No separate HR platform',
    body: 'Staff systems live where school systems live',
  },
  {
    title: 'No invisible adult culture',
    body: 'Staff experience data runs alongside operational data',
  },
]

export default function MapmakerPage() {
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
              MMAP · Mapmaker · Tier 03
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              The organizational layer. For schools ready to function as a coherent institution.
            </h1>
            <p className="text-[#64748B] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Mapmaker brings together admissions, staffing, adult culture, and organizational coordination. The tier for schools that have strong classrooms and need the systems around them to match.
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

      {/* What Mapmaker Is */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Tier 03</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Organizational systems, built for Montessori institutions.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Mapmaker is where MMAP moves from school operations to organizational design. Admissions pipelines, staff onboarding and culture systems, organization-level scheduling, and the cross-team coordination that makes a Montessori school function as an institution—not just as a collection of classrooms. Most Montessori schools reach a point where their organizational systems can no longer keep up with their mission. Mapmaker is built for that moment.
            </p>
          </div>
          <div className="bg-[#F2EDE6] border border-[#E2DDD6] p-8">
            <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase mb-4">The design principle</p>
            <p className="text-[#374151] text-base leading-relaxed italic">
              &ldquo;The prepared adult community is as essential as the prepared environment. Mapmaker supports the systems that develop, coordinate, and sustain the adults who make Montessori possible.&rdquo;
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
              For directors and heads navigating organizational complexity.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <p className="text-[#374151] text-lg leading-relaxed">
              Mapmaker is built for directors, heads of school, and operations leads managing admissions pipelines, staff onboarding, performance systems, and cross-program coordination. It connects directly to North Star—so enrollment data, student records, and operational systems are one coherent institutional view.
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

      {/* What Mapmaker Supports */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Core Features</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              What you can do inside Mapmaker.
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

      {/* Full feature list */}
      <section className="bg-[#F2EDE6] py-16 md:py-20 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-8">Everything in Mapmaker</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[#0e1a7a] text-xs font-semibold tracking-[0.15em] uppercase mb-3">{group.label}</p>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[#374151] text-sm">
                      <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
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
              An organizational week with Mapmaker.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              The director opens Mapmaker on Monday and sees the admissions pipeline—twelve families in process, three at the visit stage. She reviews onboarding status for a new guide joining next month: training checklist 80% complete, philosophy orientation not yet scheduled. The head of school checks in on the adult culture data that surfaced last week—a pattern in staff satisfaction scores worth a conversation. The admissions director sends a follow-up to three inquiry families directly from the pipeline. There&apos;s no switching between systems. The institution is visible. The work is coordinated.
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

      {/* What Mapmaker Grows Into */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Next in the Pathway</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Mapmaker connects directly to Atlas.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              When a school activates Atlas, organizational data becomes the foundation for leadership intelligence. Financial dashboards, board governance tools, and strategic planning infrastructure draw from the operational and people data already in Mapmaker. The organization becomes visible at every level—from the classroom to the boardroom.
            </p>
          </div>
          <div>
            <div className="bg-white border border-[#E2DDD6] p-7">
              <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase mb-3">Atlas · Tier 04</p>
              <p className="text-[#374151] text-base leading-relaxed mb-5">
                Financial visibility, governance tools, strategic planning, and leadership insight.
              </p>
              <Link
                href="/mmap/atlas"
                className="text-[#0e1a7a] text-sm font-medium hover:underline"
              >
                Explore Atlas &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Ready to See Mapmaker?</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Request a walkthrough of Mapmaker.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              We&apos;ll walk through admissions, staffing, and adult culture systems in the context of your school&apos;s current organizational infrastructure.
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
