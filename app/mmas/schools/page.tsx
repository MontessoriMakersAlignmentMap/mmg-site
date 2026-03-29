import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const problems = [
  {
    heading: 'Observation data lives in guides\' heads.',
    body: 'Guides develop deep, accurate knowledge of each child. But that knowledge isn\'t accessible to leadership, isn\'t transferable when staff changes, and can\'t be aggregated into school-level insights.',
  },
  {
    heading: 'No way to see patterns across classrooms.',
    body: 'Is a particular set of materials producing consistently strong outcomes? Are multiple classrooms encountering the same bottleneck? Without shared data, these questions are unanswerable.',
  },
  {
    heading: 'Demonstrating outcomes is harder than it should be.',
    body: 'Families want to understand their child\'s progress. Boards want to see evidence of mission delivery. Accreditation bodies want documentation. Standard reports don\'t speak Montessori — so schools spend time translating instead of leading.',
  },
  {
    heading: 'Assessment disrupts what it\'s supposed to measure.',
    body: 'Many schools avoid formal assessment because it requires pulling children out of authentic work. MMAS is guide-administered, materials-integrated, and designed to fit inside the existing classroom rhythm.',
  },
]

const whatSchoolsGet = [
  {
    title: 'Classroom-Level Visibility',
    description:
      'Every guide has a complete picture of each child\'s position in the materials sequence — across reading, math, language, and writing. Not just impressions. Specific, actionable data.',
  },
  {
    title: 'School-Wide Trend Data',
    description:
      'Leadership can see patterns across classrooms: which materials are producing strong outcomes, where children are consistently stalling, and what the program needs at scale.',
  },
  {
    title: 'Share-Ready Student Profiles',
    description:
      'Auto-generated profiles for every student — strengths-centered, written in Montessori language, and formatted for family conferences, progress reports, and accreditation documentation.',
  },
  {
    title: 'MMAP Integration',
    description:
      'If your school already uses MMAP, assessment data flows directly into lesson logs. No double entry. No disconnected systems. One picture of the whole child.',
  },
]

const implementationSteps = [
  {
    number: '01',
    title: 'Get in Touch',
    description:
      'Reach out through our contact page. We\u2019ll walk through the full assessment flow, show you what guides and leadership see, and discuss what MMAS would look like for your school.',
  },
  {
    number: '02',
    title: 'Set Up Your School',
    description:
      'When MMAS becomes available, onboarding is straightforward. Guides are oriented quickly — the assessments are intuitive and take 10\u201315 minutes per student.',
  },
  {
    number: '03',
    title: 'Set Up Your Classrooms',
    description:
      'We configure your school\'s classroom structure. Within one assessment cycle, you have a complete picture of every child\'s developmental position across the full curriculum.',
  },
]

export default function MMASSchoolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d6a758] flex-shrink-0" />
            <span className="text-white/80 text-xs tracking-[0.12em] uppercase">
              Currently in development
            </span>
          </div>
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-8">
            MMAS — For Schools
          </p>
          <h1
            className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
            style={serif}
          >
            Give your guides the assessment clarity they&apos;ve never had.
          </h1>
          <p className="text-[#64748B] text-lg leading-relaxed mb-12">
            MMAS is the first assessment platform built for the Montessori
            learning progression. Guide-administered, materials-aligned, and
            designed to give school leadership visibility across every classroom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block text-center"
            >
              Request a Demo
            </Link>
            <Link
              href="/mmas/how-it-works"
              className="border border-white text-white text-sm px-8 py-4 tracking-wide hover:bg-white hover:text-[#0e1a7a] transition-colors inline-block text-center"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              The Opportunity
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              What Montessori schools deserve to have.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Montessori schools produce extraordinary outcomes. The systems used
              to document, communicate, and build on those outcomes were designed
              for different pedagogical models. The opportunity isn&apos;t in the
              work — it&apos;s in building infrastructure that honors how Montessori
              actually works.
            </p>
          </div>
          <div className="space-y-0">
            {problems.map((problem, i) => (
              <div
                key={i}
                className="py-6 border-b border-[#E2DDD6] last:border-0"
              >
                <div className="flex items-start gap-4">
                  <span className="text-[#8A6014] flex-shrink-0 mt-1">—</span>
                  <div>
                    <p className="text-[#0e1a7a] font-semibold text-sm mb-2">
                      {problem.heading}
                    </p>
                    <p className="text-[#374151] text-sm leading-relaxed">
                      {problem.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What schools get */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              What Schools Get
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Four capabilities that would strengthen your school&apos;s practice.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {whatSchoolsGet.map((item) => (
              <div
                key={item.title}
                className="bg-[#FAF9F7] border border-[#E2DDD6] p-8"
              >
                <h3
                  className="text-[#0e1a7a] text-lg mb-4"
                  style={serif}
                >
                  {item.title}
                </h3>
                <p className="text-[#374151] text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Implementation
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              10–15 minutes per student. No disruption to classroom rhythm.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              MMAS is guide-administered. No separate testing specialist. No
              pulling children from authentic work. The assessment fits inside
              the existing structure of the Montessori day.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {implementationSteps.map((step) => (
              <div key={step.number} className="bg-white border border-[#E2DDD6] p-8">
                <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4 font-mono">
                  {step.number}
                </p>
                <h3
                  className="text-[#0e1a7a] text-lg mb-4"
                  style={serif}
                >
                  {step.title}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MMAP connection */}
      <section className="bg-white py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              MMAP Connection
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Already using MMAP? Assessment data flows automatically.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              MMAP is the Montessori school operating system — lesson planning,
              observation logging, materials tracking, and family communication
              in one place. If your school already uses MMAP, MMAS assessment
              results populate directly into lesson logs.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-8">
              No double entry. No disconnected reports. One complete picture of
              each child&apos;s progression, from assessment to daily planning.
            </p>
            <Link
              href="/mmap"
              className="text-[#0e1a7a] text-sm border-b border-[#0e1a7a] pb-0.5 hover:text-[#8A6014] hover:border-[#d6a758] transition-colors"
            >
              Learn more about MMAP →
            </Link>
          </div>
          <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-10">
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">
              How data moves
            </p>
            {[
              'Guide administers MMAS assessment',
              'Results mapped to materials sequence',
              'Insight appears in MMAS dashboard',
              'Data flows into MMAP lesson logs',
              'Leadership sees school-wide patterns',
            ].map((step, i, arr) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#0e1a7a] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">{i + 1}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px h-6 bg-[#E2DDD6] my-1" />
                  )}
                </div>
                <p className="text-[#374151] text-sm leading-relaxed pt-1 pb-5 last:pb-0">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-white text-2xl md:text-3xl leading-snug mb-3" style={serif}>
              See what assessment clarity looks like for your school.
            </p>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              MMAS is currently in development. Get in touch to learn more or stay informed about availability.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center whitespace-nowrap">
              Get in Touch
            </Link>
            <Link href="/mmas/how-it-works" className="border border-white/20 text-white/70 text-sm px-8 py-4 tracking-wide hover:border-white/40 hover:text-white transition-colors text-center whitespace-nowrap">
              How It Works &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
