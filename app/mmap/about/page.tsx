import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const tiers = [
  { label: 'Surveyor — Classroom Level', color: '#d6a758' },
  { label: 'North Star — School Operations', color: '#0e7a4f' },
  { label: 'Mapmaker — Organization Level', color: '#1D4ED8' },
  { label: 'Atlas — Leadership & Governance', color: '#7C3AED' },
]

const ecosystemCards = [
  {
    title: 'Advisory',
    desc: 'Organizational design, leadership coaching, and strategic partnership for schools navigating complexity.',
    href: '/advisory',
  },
  {
    title: 'Institute',
    desc: 'Leadership formation for the parts of school leadership no training prepared you for.',
    href: '/institute',
  },
  {
    title: 'MatchHub',
    desc: 'Philosophy-aligned hiring infrastructure for Montessori schools.',
    href: '/matchhub',
  },
  {
    title: 'MMAS',
    desc: 'Montessori-native assessment that flows directly into Alignment Map classroom records.',
    href: '/mmas',
  },
]

const privacyCards = [
  {
    title: 'Data Ownership',
    body: 'School data belongs to the school. The Alignment Map does not sell, share, or use school or student data for any purpose other than operating the platform for the school that owns it.',
  },
  {
    title: 'Student Privacy',
    body: 'The Alignment Map is built in compliance with FERPA and applicable state student privacy laws. Student records are protected, access-controlled, and never used for third-party purposes.',
  },
  {
    title: 'Security Infrastructure',
    body: 'All data is encrypted in transit and at rest. Access controls are role-based. Security practices are reviewed regularly and updated as standards evolve.',
  },
]

export default function MMAPAboutPage() {
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
              About the Alignment Map
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Built for what Montessori schools actually need.
            </h1>
            <p className="text-[#64748B] text-lg leading-relaxed mb-12 max-w-2xl">
              The Alignment Map is not a generic school software platform with Montessori branding. It is a
              purpose-built operational environment designed around how Montessori schools work,
              what Montessori leaders carry, and what Montessori values actually require of a
              school&apos;s infrastructure.
            </p>
            <Link
              href="/mmap/demo"
              className="inline-block bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
            >
              Request Early Access
            </Link>
          </div>
        </div>
      </section>

      {/* What the Alignment Map Is */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Platform</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              One coherent system. Every level of the school.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-5">
              The Alignment Map&mdash;the Montessori Makers Alignment Map, or MMAP for short&mdash;is
              a four-tier operational system: Surveyor, North Star, Mapmaker, and Atlas. Together they
              cover classroom practice, school operations, organizational coordination, and leadership
              governance.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Schools start where they are and grow inside the system. There is no migration, no
              patchwork, and no need to hold the institutional knowledge in someone&apos;s head
              because the infrastructure doesn&apos;t have a place to put it.
            </p>
          </div>
          <div className="bg-[#F2EDE6] border border-[#E2DDD6] p-8">
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">The Four Tiers</p>
            <div className="space-y-4">
              {tiers.map((tier) => (
                <div key={tier.label} className="flex items-center gap-4">
                  <div className="w-1 h-8 flex-shrink-0" style={{ backgroundColor: tier.color }} />
                  <span className="text-[#0e1a7a] text-sm font-medium">{tier.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Mission</p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-12 max-w-2xl" style={serif}>
            Mission-rich schools. Systems that finally match.
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <p className="text-[#374151] text-lg leading-relaxed">
              Montessori schools are built on a coherent philosophy of human development. The school
              environment, the curriculum, the training, the adult culture&mdash;at their best, these
              reflect a set of values with real depth and real rigor. But the systems around the
              school&mdash;the software, the documentation, the data, the operational
              infrastructure&mdash;are almost always borrowed from somewhere else. Generic, translated,
              approximated. The Alignment Map is built to close that gap.
            </p>
            <div>
              <p className="text-[#374151] text-lg leading-relaxed mb-8">
                The mission of the Alignment Map is simple: build the operational infrastructure that Montessori
                schools deserve. Not software that forces a Montessori school to think like a generic
                school. Software that understands what Montessori is&mdash;and makes it easier to do
                it, hold it, and protect it.
              </p>
              <p className="text-[#0e1a7a] text-lg font-semibold" style={serif}>
                Alignment is not an aspiration. It is infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Origin</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              Built from the inside, not imposed from the outside.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-5">
              The Alignment Map was built by Hannah Richardson, founder of Montessori Makers Group, after more
              than a decade of working inside Montessori schools as an organizational designer and
              leadership advisor. The pattern she kept seeing: schools with extraordinary classroom
              practice and fragile institutional systems.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed mb-5">
              Leaders carrying too much in their heads. Guides spending hours on documentation that
              didn&apos;t serve them. Administrators managing enrollment and compliance in spreadsheets
              that no one could maintain when they left. Data that didn&apos;t tell the school what it
              needed to know.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              The Alignment Map is the response to that pattern. Not a consultant&apos;s recommendation to &ldquo;use
              better software&rdquo;&mdash;an actual platform built with the specific knowledge of what
              Montessori schools need and the specific experience of watching them operate.
            </p>
          </div>
          <div className="bg-[#0e1a7a] p-8">
            <p className="text-white text-xl font-semibold mb-1" style={serif}>
              Hannah Richardson
            </p>
            <p className="text-[#94A3B8] text-sm mb-8">Founder, Montessori Makers Group</p>
            <p className="text-white italic text-base leading-relaxed mb-8">
              &ldquo;The school deserves infrastructure that matches what it believes. I built the Alignment Map
              because that infrastructure didn&apos;t exist.&rdquo;
            </p>
            <Link
              href="/about"
              className="text-[#d6a758] text-sm underline underline-offset-4 hover:text-[#c09240] transition-colors"
            >
              Learn more about Hannah &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* MMAP Within the Ecosystem */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
            Montessori Makers Ecosystem
          </p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6 max-w-2xl" style={serif}>
            The Alignment Map is the operational layer. The ecosystem is the whole.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-12 max-w-3xl">
            Montessori Makers works across multiple dimensions of Montessori school health. The Alignment Map
            holds the operational and leadership systems. Advisory helps schools design aligned
            systems when the work requires outside expertise. Institute develops the leaders who
            run them. MatchHub supports aligned staffing when growth or transition requires it.
            MMAS&mdash;the Montessori Makers Assessment System&mdash;provides Montessori-native
            assessment data that flows directly into the Alignment Map.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {ecosystemCards.map((card) => (
              <div key={card.href} className="bg-white border border-[#E2DDD6] p-6">
                <h3 className="text-[#0e1a7a] font-semibold text-lg mb-3" style={serif}>
                  {card.title}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed mb-4">{card.desc}</p>
                <Link
                  href={card.href}
                  className="text-[#0e1a7a] text-xs font-medium hover:underline"
                >
                  Explore {card.title} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
            Privacy & Security
          </p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-12 max-w-xl" style={serif}>
            School data belongs to the school.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {privacyCards.map((card) => (
              <div key={card.title}>
                <h3 className="text-[#0e1a7a] font-semibold text-base mb-3">{card.title}</h3>
                <p className="text-[#374151] text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
          <p className="text-[#64748B] text-sm">
            For detailed security and privacy documentation, contact our team.
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              See the platform in action.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Request a demo walkthrough built around your school&apos;s systems, gaps, and questions.
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
              href="/mmap/pathway"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Explore the Pathway &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
