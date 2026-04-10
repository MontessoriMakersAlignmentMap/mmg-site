import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const features = [
  {
    title: 'SIS & Student Profiles',
    body: 'Complete student information system with full profiles connected to classroom documentation from Surveyor. One record across the school\'s life cycle, from enrollment to alumni. No duplication, no data migration.',
  },
  {
    title: 'Attendance',
    body: 'Daily, QR code, morning check-in, and attendance monitoring, designed for Montessori daily rhythms and multi-age groupings. Daily roster always current. No separate attendance system.',
  },
  {
    title: 'Multilingual Family Portal',
    body: 'A dedicated portal for families with full language switching. Families access their children\'s records, tuition, communication, and school community in their home language. Not a translation overlay. Language switching built into the design.',
  },
  {
    title: 'Messaging, Newsletters & Digests',
    body: 'Direct messaging, structured school-wide newsletters, and automated digests, all in one system with full student context. Families receive organized updates. Staff are not rebuilding information from multiple sources.',
  },
  {
    title: 'Before & After Care',
    body: 'Full extended day management: sign-in and sign-out, kiosk mode for drop-off, program registration, drop-in care, and charges connected directly to family billing. One system for extended day.',
  },
  {
    title: 'Safety & Health Log',
    body: 'Health incident documentation, medication tracking, and safety log for each student. Connected to student profiles and accessible to authorized staff. Meets compliance requirements without a separate health management system.',
  },
  {
    title: 'Handbooks & Signatures',
    body: 'Distribute family and staff handbooks digitally. Collect signatures, track completion, and store signed documents within student and staff records.',
  },
  {
    title: 'Compliance Hub',
    body: 'State reporting, licensing documentation, and compliance workflows that surface what is needed and when, without requiring a dedicated compliance staff member.',
  },
  {
    title: 'Intervention & Discipline Tracking',
    body: 'Document behavioral concerns, interventions, and restorative conversations in a structured system connected to student records. Patterns are visible, not buried in email threads.',
  },
  {
    title: 'School Configuration, Integrations & Global Search',
    body: 'User management, school config, bulk import and export, third-party integrations, and global search across all records. The operational infrastructure that keeps a growing school running.',
  },
]

const whoItIsFor = [
  'School administrators managing student records and compliance',
  'Operations leads coordinating daily systems across programs',
  'Registrars managing enrollment and communication workflows',
  'Heads of school who need school-level visibility without drowning in data entry',
  'Growing schools that have outgrown spreadsheet-based operations',
]

const callouts = [
  {
    title: 'No duplicate records',
    body: 'Classroom and school data flow as one',
  },
  {
    title: 'No separate communication tool',
    body: 'Family messages connected to the full student context',
  },
  {
    title: 'No compliance guesswork',
    body: 'What\'s needed surfaces when it\'s needed',
  },
]

export default function NorthStarPage() {
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
              MMAP · North Star · Tier 02
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Calm daily operations for schools that have outgrown improvised systems.
            </h1>
            <p className="text-[#64748B] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              North Star is the operational infrastructure of the school—student records, attendance, family communication, and the daily systems that make a Montessori school run without crisis management.
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

      {/* What North Star Is */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Tier 02</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              The layer that keeps the school running.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              North Star handles the operational infrastructure of the Montessori school—student records, attendance, family communication, and daily systems. The layer that protects the work inside the classroom by ensuring everything around it functions reliably. Not as glamorous as curriculum. Not as visible as the prepared environment. But the reason guides can focus on children instead of paperwork.
            </p>
          </div>
          <div className="bg-[#F2EDE6] border border-[#E2DDD6] p-8">
            <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase mb-4">The design principle</p>
            <p className="text-[#374151] text-base leading-relaxed italic">
              &ldquo;A prepared environment requires a prepared institution. North Star builds the institutional preparation that makes Montessori practice possible at scale.&rdquo;
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
              For administrators who need operational clarity without an operations team.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <p className="text-[#374151] text-lg leading-relaxed">
              North Star is built for school administrators, registrars, and operations leads who are managing student records, attendance systems, compliance requirements, and family communication with tools that weren&apos;t designed for Montessori. It integrates directly with Surveyor—so classroom data and school records are one system, not two.
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

      {/* What North Star Supports */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Core Features</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              What you can do inside North Star.
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
              An operations day with North Star.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              The registrar opens North Star on Monday morning and sees the week&apos;s attendance concerns flagged from last week—two students with patterns worth noting, already linked to their classroom records in Surveyor. She sends a family update to three families with one action, the message contextualized by the child&apos;s full record. The head of school checks the school dashboard before a board check-in—enrollment trends, compliance status, communication health—clear, organized, and in one place. No spreadsheets pulled. No emails dug through. The school runs, and people can see it running.
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

      {/* What North Star Grows Into */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Next in the Pathway</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              North Star connects directly to Mapmaker.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              When a school activates Mapmaker, student records, admissions, and operations data become part of a full organizational system. Staffing, adult culture, and institutional coordination sit in the same environment as classroom and school operations. The school becomes one coherent institution—not a classroom layer and an admin layer running separately.
            </p>
          </div>
          <div>
            <div className="bg-white border border-[#E2DDD6] p-7">
              <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase mb-3">Mapmaker · Tier 03</p>
              <p className="text-[#374151] text-base leading-relaxed mb-5">
                Admissions, staffing, adult culture, and organizational coordination. The organizational layer that builds on North Star.
              </p>
              <Link
                href="/mmap/mapmaker"
                className="text-[#0e1a7a] text-sm font-medium hover:underline"
              >
                Explore Mapmaker &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Ready to See North Star?</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Request a walkthrough of North Star.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              We&apos;ll walk through daily operations, student records, and family communication tools in the context of your school&apos;s current administrative setup.
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
