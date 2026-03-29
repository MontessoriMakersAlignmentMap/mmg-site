import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const programs = [
  {
    tier: '01',
    name: 'Applied Seminars',
    href: '/institute/seminars',
    format: 'Half-day & full-day sessions',
    description:
      'Focused sessions on specific leadership challenges. Immediately applicable. No prerequisites.',
    cta: 'Browse seminars',
  },
  {
    tier: '02',
    name: 'Leadership Intensive',
    href: '/institute/intensive',
    format: 'Multi-day, cohort-based',
    description:
      'A multi-day immersion into Montessori leadership practice. Works through real cases, team dynamics, and the specific demands of leading adults in a Montessori school.',
    cta: 'See upcoming dates',
  },
  {
    tier: '03',
    name: 'Leadership Studio',
    href: '/institute/studio',
    format: 'Monthly, ongoing cohort',
    description:
      'A standing peer cohort for active leaders. Monthly sessions, structured reflection, and shared problem-solving with peers who understand the work.',
    cta: 'Join the next cohort',
  },
  {
    tier: '04',
    name: 'Leadership Alignment Retreat',
    href: '/institute/retreat',
    format: 'Team-based, on-site or residential',
    description:
      'For leadership teams. A structured retreat that surfaces misalignment, works through shared challenges, and builds the shared language teams need to actually function.',
    cta: 'Learn about retreats',
  },
  {
    tier: '05',
    name: 'Leadership Residency',
    href: '/institute/residency',
    format: '1:1, sustained, application-based',
    description:
      "The Institute\u2019s highest-commitment offering. A sustained, one-to-one engagement built around a single leader navigating significant transition or a critical period of organizational change. Application-based.",
    cta: 'Apply for Residency',
  },
]

export default function InstituteAboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              About the Institute
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Built from the inside of real Montessori leadership.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              The Institute exists because the gap between Montessori pedagogy training and the
              actual demands of leading a Montessori school is significant &mdash; and largely
              unaddressed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/institute"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Explore Programs &rarr;
              </Link>
              <Link
                href="/about"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Meet Hannah
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Gap */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Context</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Montessori schools develop extraordinary educators. The field hasn&apos;t yet built
              parallel pathways for leadership preparation.
            </h2>
          </div>
          <div className="space-y-6 pt-2">
            <p className="text-[#374151] text-lg leading-relaxed">
              Most heads of school transition from the classroom. They are skilled with children,
              committed to the philosophy, and deeply knowledgeable about Montessori pedagogy.
              The organizational complexity of school leadership — and how to navigate it — is
              rarely addressed before they step into the role.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Adult culture. Board governance. Staff performance. Enrollment pressure. Strategic
              decisions with no clear right answer. These are the daily demands of school
              leadership &mdash; and they call for a different kind of preparation than any AMI or
              AMS credential is designed to provide.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              The Institute was built for that dimension of the work &mdash; not to replace
              credential training, but to develop the organizational capacity it doesn&apos;t cover.
            </p>
          </div>
        </div>
      </section>

      {/* Why Montessori as the Framework */}
      <section className="bg-[#F2EDE6] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Philosophy</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Montessori is not just a pedagogy. It&apos;s a framework for reasoning about people
              and organizations.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <p className="text-[#374151] text-lg leading-relaxed">
              Montessori offers a coherent theory of human development, learning environments, and
              the conditions that allow people to do their best work. Most leaders apply it to
              children and classrooms. The Institute applies it to adults and organizations.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              This isn&apos;t metaphor. The same principles that govern prepared environments,
              freedom within limits, and intrinsic motivation have direct application to how adults
              are led, how cultures are built, and how decisions get made.
            </p>
          </div>
          <blockquote className="border-l-4 border-[#d6a758] pl-6 py-1 max-w-2xl mt-10">
            <p className="text-[#374151] text-base italic leading-relaxed">
              &ldquo;The quality of the adult community shapes everything children experience. When
              leaders understand this &mdash; and build accordingly &mdash; it changes the
              school.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* About Hannah */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Founder</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              Hannah Richardson
            </h2>
            <div className="space-y-3 mb-8">
              {[
                '20+ years in Montessori education leadership',
                'Former head of school, department director, and consultant',
                'Founder, Montessori Makers Group',
                'Works with independent, public, and charter Montessori schools',
                'Based in the United States; works nationally',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&mdash;</span>
                  <span className="text-[#374151] text-base leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="text-[#0e1a7a] text-sm font-medium hover:underline"
            >
              Full biography &rarr;
            </Link>
          </div>
          <div className="space-y-6 pt-2">
            <p className="text-[#374151] text-lg leading-relaxed">
              Hannah built the Institute after years of working alongside leaders who were
              deeply committed to Montessori and ready for organizational tools they had never
              been given &mdash; not because they lacked intelligence or effort, but because
              formal preparation for this kind of leadership hadn&apos;t yet been built in
              this field.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Her approach combines deep knowledge of Montessori philosophy with rigorous
              organizational thinking. The programs she runs are not inspirational. They are
              practical, demanding, and built around the real work of real schools.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              She works with a small number of leaders at any given time. The Institute reflects
              that constraint: quality over volume, depth over reach.
            </p>
          </div>
        </div>
      </section>

      {/* The Five Pathways */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Programs</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight" style={serif}>
              Five formats. One ecosystem.
            </h2>
          </div>
          <div className="space-y-4">
            {programs.map((p) => (
              <div
                key={p.name}
                className="bg-white border border-[#E2DDD6] p-8 grid md:grid-cols-4 gap-6 items-start hover:shadow-md hover:border-[#C8C0B6] hover:-translate-y-[1px] transition-all duration-200"
              >
                <div className="md:col-span-1">
                  <span className="text-[#8A6014] text-xs tracking-[0.2em] font-medium">{p.tier}</span>
                  <h3 className="text-[#0e1a7a] font-semibold text-lg mt-1" style={serif}>{p.name}</h3>
                  <p className="text-[#64748B] text-xs mt-1">{p.format}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-[#374151] text-sm leading-relaxed">{p.description}</p>
                </div>
                <div className="md:text-right">
                  <Link href={p.href} className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide">
                    {p.cta} &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-white leading-tight mb-6" style={serif}>
            Ready to find your program?
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-12">
            Every pathway starts where you are right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/institute"
              className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
            >
              Explore All Programs
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white text-sm px-10 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
