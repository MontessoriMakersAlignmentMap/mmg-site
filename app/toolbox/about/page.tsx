import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const differentiators = [
  {
    title: 'Montessori-specific',
    body: 'Written with Montessori adult culture in mind. Not adapted from corporate HR frameworks or generic school district templates.',
  },
  {
    title: 'Implementation-ready',
    body: 'Every tool is editable and designed to be put to use immediately. Not a theory document &mdash; a working resource.',
  },
  {
    title: 'Problem-first',
    body: 'Each product opens with the problem it addresses. Tools that don&apos;t connect to real situations don&apos;t get used. These do.',
  },
  {
    title: 'Ecosystem-connected',
    body: 'Designed to work alongside Advisory, Institute, and MatchHub engagements &mdash; and to stand alone when that&apos;s what&apos;s needed.',
  },
]

export default function ToolboxAboutPage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              About the Toolbox
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-8"
              style={serif}
            >
              Real tools for real schools. Built from the inside out.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              Every resource in the Montessori Makers Toolbox was built because a real problem kept
              showing up &mdash; in schools doing their best, with genuine commitment, but without
              the right infrastructure to sustain it.
            </p>
            <Link
              href="/toolbox/store"
              className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors inline-block font-medium"
            >
              Browse the Toolbox
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. ABOUT HANNAH ──────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Built by a Practitioner
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-8"
              style={serif}
            >
              Hannah Richardson has spent 20+ years inside Montessori leadership.
            </h2>
            <div className="space-y-5">
              <p className="text-[#374151] text-base leading-relaxed">
                Hannah Richardson is the founder of Montessori Makers Group and the creator of the
                Toolbox. Her background spans independent, public, charter, and justice-centered
                Montessori communities &mdash; as a teacher, director, head of school, and
                organizational consultant.
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                The Toolbox grew out of a pattern she kept seeing: schools with strong classrooms
                and real commitment, but adult systems built on informal norms, reinvented
                documents, and institutional memory living in one person&apos;s head.
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                Every tool in the Toolbox is a response to something she watched schools struggle
                with &mdash; not a theoretical framework projected onto real work, but a direct
                answer to a specific, recurring problem.
              </p>
            </div>
          </div>

          <div className="md:pt-10">
            <div className="border-l-4 border-[#d6a758] pl-8 mb-8">
              <blockquote
                className="text-[#0e1a7a] text-2xl md:text-[1.6rem] leading-[1.4] italic mb-5"
                style={serif}
              >
                &ldquo;I built these tools because I was tired of watching leaders do extraordinary
                work inside fragile systems. The goal was simple: give people the infrastructure
                they deserve.&rdquo;
              </blockquote>
              <p className="text-[#64748B] text-sm tracking-wide">&mdash; Hannah Richardson</p>
            </div>
            <Link
              href="/about"
              className="text-[#0e1a7a] text-sm font-medium hover:underline"
            >
              About Hannah &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. WHY TOOLBOX EXISTS ────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Why This Exists
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight"
              style={serif}
            >
              Leaders shouldn&apos;t have to reinvent the documents alone.
            </h2>
          </div>

          <div className="max-w-3xl space-y-6">
            <p className="text-[#374151] text-lg leading-relaxed">
              Mission-rich schools often have adult systems that don&apos;t match the care and
              rigor of their classrooms. It&apos;s not because the people don&apos;t care &mdash;
              it&apos;s because no one handed them a working template for how to run a fair
              performance review, build a board, or navigate a leadership transition in a
              Montessori context.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              The Toolbox exists to close that gap. Not with generic HR templates adapted from
              corporate settings, but with tools built specifically for the kind of schools
              Montessori Makers serves: values-driven, community-centered, and trying to do right
              by the adults in them.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Every tool in the library opens with the problem it solves &mdash; because a
              document that doesn&apos;t connect to a real situation doesn&apos;t get used.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT MAKES THESE TOOLS DIFFERENT ──────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              What Makes These Different
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight"
              style={serif}
            >
              Not adapted from generic templates. Built for Montessori organizations.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="bg-white border border-[#E2DDD6] p-7"
              >
                <h3
                  className="text-[#0e1a7a] text-xl font-semibold mb-3 leading-snug"
                  style={serif}
                >
                  {d.title}
                </h3>
                <p
                  className="text-[#374151] text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: d.body }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TOOLBOX IN THE ECOSYSTEM ──────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-6">
              Part of the Ecosystem
            </p>
            <h2
              className="text-4xl md:text-5xl text-white leading-tight tracking-tight mb-6"
              style={serif}
            >
              Toolbox is the practical layer of Montessori Makers Group.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              Montessori Makers works across multiple dimensions of school health. Advisory
              supports organizational design and leadership development. Institute builds leaders
              through formation programs. MatchHub finds aligned staff. Toolbox provides the
              practical infrastructure tools that make all of that work hold. The tools stand
              alone. They go further when the work goes deeper.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: 'Advisory', tagline: 'Consulting & alignment', href: '/advisory' },
              { name: 'Institute', tagline: 'Leadership formation', href: '/institute' },
              { name: 'MatchHub', tagline: 'Philosophy-aligned hiring', href: '/matchhub' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="border border-white/15 p-7 hover:border-white/30 transition-colors group block"
              >
                <p className="text-[#94A3B8] text-[10px] tracking-[0.16em] uppercase mb-2">
                  {item.tagline}
                </p>
                <p
                  className="text-white text-lg font-medium mb-4 group-hover:underline"
                  style={serif}
                >
                  {item.name}
                </p>
                <span className="text-[#d6a758] text-sm group-hover:translate-x-1 inline-block transition-transform">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] border-t border-[#E2DDD6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-5"
            style={serif}
          >
            Ready to get started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/toolbox/store"
              className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium"
            >
              Browse the Toolbox
            </Link>
            <Link
              href="/toolbox/free-resources"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-[13px] px-8 py-4 tracking-[0.07em] hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
            >
              Download Free Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
