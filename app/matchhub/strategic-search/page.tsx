import Link from 'next/link'
import Image from 'next/image'

const serif = { fontFamily: 'var(--font-heading)' }

const whenToChoose = [
  'The role is senior — a director, head of school, or executive position where the wrong hire has lasting consequences.',
  'You\'ve tried to fill the role on your own and the right candidate hasn\'t appeared.',
  'Philosophy alignment is non-negotiable and you can\'t afford to compromise.',
  'You need a curated shortlist of vetted candidates — not a pile of applications to sort through.',
  'You want a structured selection process that holds up to scrutiny from your board or leadership team.',
  'Discretion matters — an incumbent is in place or the search needs to stay confidential.',
]

const processSteps = [
  {
    number: '01',
    label: 'Discovery',
    description:
      'We begin with a deep conversation about the role, the school, and what alignment actually looks like for this position. Role clarity comes before the search begins.',
  },
  {
    number: '02',
    label: 'Search',
    description:
      'Hannah draws on the full MatchHub talent pool and her broader network to identify candidates who match — not just on paper, but philosophically and culturally.',
  },
  {
    number: '03',
    label: 'Vetting',
    description:
      'Every candidate goes through philosophy vetting, reference conversations, and a structured assessment before appearing on your shortlist.',
  },
  {
    number: '04',
    label: 'Shortlist',
    description:
      'You receive a curated shortlist of aligned candidates — with Hannah\'s notes on each. From there, we support you through the selection process to final placement.',
  },
]

const levels = [
  {
    id: 'guide-level',
    number: '01',
    name: 'Guide / Program Level',
    scope: 'Lead Guides, Assistant Directors, Curriculum Coordinators, Program Directors',
    description:
      'Program-level roles require more than teaching credentials. They require someone who can hold a classroom community, mentor other guides, and steward curriculum integrity across a program. Guide-Level Strategic Search is built for these placements.',
    whoItIsFor:
      'Schools filling lead guide, senior classroom, or program coordinator roles where philosophy alignment and culture fit are essential.',
    includes: [
      'Philosophy vetting and alignment assessment',
      'Curated shortlist of 3–5 candidates',
      'Hannah-facilitated candidate conversations',
      'Search timeline: 4–8 weeks',
      'Selection process support through offer',
    ],
  },
  {
    id: 'leadership-level',
    number: '02',
    name: 'Leadership Level',
    scope: 'Directors, Deans, Instructional Coaches, Curriculum Directors',
    description:
      'Leadership hires shape the culture of your school. These roles sit at the intersection of Montessori philosophy and institutional responsibility — they require a deeper assessment, a longer search horizon, and a more structured process.',
    whoItIsFor:
      'Schools seeking directors, deans, instructional coaches, or curriculum-level leaders whose work shapes how teachers teach and how the school functions day to day.',
    includes: [
      'In-depth philosophy and leadership assessment',
      'Broader candidate development and network outreach',
      'Curated shortlist of 3–5 candidates with detailed profiles',
      'Search timeline: 6–10 weeks',
      'Panel interview facilitation and selection support',
    ],
  },
  {
    id: 'executive-level',
    number: '03',
    name: 'Executive Level',
    scope: 'Heads of School, Executive Directors, Founding Leaders',
    description:
      'Executive-level search is the most intensive engagement we offer. The head of school is the philosophical and operational center of the institution. Getting this hire right takes time, discernment, and a process that goes beyond resumes.',
    whoItIsFor:
      'Schools searching for a head of school, executive director, or founding leader. Often involves board partnership, succession context, or organizational transition.',
    includes: [
      'Board partnership and search committee support',
      'Succession planning context and positioning',
      'Comprehensive philosophy, leadership, and fit assessment',
      'Full candidate development with national network reach',
      'Search timeline: 8–16 weeks',
      'Selection support through negotiation and onboarding transition',
    ],
    featured: true,
  },
]

export default function StrategicSearchPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Strategic Search
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              When alignment matters more than speed.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              This is a full-service search process — led by Hannah Richardson —
              blending Montessori expertise with modern recruitment strategy. Built
              for roles where the right hire shapes the school&apos;s future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
>
  Book a Consultation
</a>
              <a
                href="#levels"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Explore Search Levels
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What makes this different */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Not a Job Board</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              A job board gets you applicants. Strategic Search gets you the right person.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              Most hiring tools optimize for volume. Post a job, collect applications,
              pick the best-looking resume. That approach rarely works in Montessori because
              credentials don&apos;t tell you whether someone actually understands — and
              lives — the philosophy.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Strategic Search starts with clarity about what alignment means for this
              role in this school. Every candidate is developed, vetted, and presented
              with that lens — not just forwarded because they applied.
            </p>
          </div>
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Differentiator</p>
            <div className="bg-[#F2EDE6] border border-[#E2DDD6] p-8">
              <p className="text-[#0e1a7a] text-xl leading-relaxed font-semibold mb-6" style={serif}>
                &ldquo;Alignment over speed.&rdquo;
              </p>
              <p className="text-[#374151] text-base leading-relaxed mb-4">
                Hannah brings deep fluency in Montessori culture, philosophy, and
                the specific pressures schools face when hiring. Every search is
                led personally — not handed off to a junior recruiter.
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                The result is a shortlist you can trust — candidates who have been
                genuinely assessed for fit, not just filtered by keyword.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When to choose */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">When to Choose Strategic Search</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight" style={serif}>
              This process is the right fit when:
            </h2>
          </div>
          <div className="max-w-3xl space-y-0">
            {whenToChoose.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-6 py-5 border-b border-[#E2DDD6] last:border-0"
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-1">—</span>
                <p className="text-[#374151] text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image break */}
      <div className="relative w-full h-56 md:h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1400&q=80"
          alt="Leaders collaborating — the deliberate process behind every Strategic Search"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0e1a7a]/40" />
        <div className="absolute inset-0 flex items-center px-6 md:px-10">
          <div className="max-w-7xl mx-auto w-full">
            <p
              className="text-white/90 text-lg md:text-xl max-w-xl leading-relaxed"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Every search is led personally by Hannah — not handed off to a junior recruiter.
            </p>
          </div>
        </div>
      </div>

      {/* Process */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">The Process</p>
            <h2 className="text-4xl md:text-5xl text-white leading-tight" style={serif}>
              Four steps. One coherent search.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {processSteps.map((step) => (
              <div key={step.number} className="bg-white/5 border border-white/10 p-8">
                <span className="text-[#8A6014] text-xs tracking-[0.15em] uppercase block mb-4">
                  {step.number}
                </span>
                <h3 className="text-white text-xl font-semibold mb-4" style={serif}>
                  {step.label}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Pathways — quick-nav / tiered overview */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Search Pathways</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Choose the level built for your role.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              All three pathways are led by Hannah and include philosophy vetting at their core. The level determines the depth of process, the timeline, and the breadth of candidate development.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 — Guide Level */}
            <div className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-5">
              <span className="text-[#8A6014] text-xs tracking-[0.15em] uppercase font-medium">01</span>
              <div>
                <h3 className="text-[#0e1a7a] font-semibold text-xl mb-2" style={serif}>Guide / Program Level</h3>
                <p className="text-[#64748B] text-sm">Lead Guides, Program Coordinators, Curriculum Directors</p>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed flex-1">
                For roles where philosophy alignment and culture fit are essential—but the search doesn&apos;t require the full executive process.
              </p>
              <p className="text-[#64748B] text-xs">Timeline: 4–8 weeks</p>
              <a href="#guide-level" className="text-[#0e1a7a] text-xs tracking-wide font-medium hover:underline mt-auto">
                View this pathway →
              </a>
            </div>

            {/* Card 2 — Leadership Level */}
            <div className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-5">
              <span className="text-[#8A6014] text-xs tracking-[0.15em] uppercase font-medium">02</span>
              <div>
                <h3 className="text-[#0e1a7a] font-semibold text-xl mb-2" style={serif}>Leadership Level</h3>
                <p className="text-[#64748B] text-sm">Directors, Deans, Instructional Coaches</p>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed flex-1">
                For roles that shape how teachers teach and how the school functions day to day. Deeper assessment, longer horizon.
              </p>
              <p className="text-[#64748B] text-xs">Timeline: 6–10 weeks</p>
              <a href="#leadership-level" className="text-[#0e1a7a] text-xs tracking-wide font-medium hover:underline mt-auto">
                View this pathway →
              </a>
            </div>

            {/* Card 3 — Executive Level (featured) */}
            <div className="bg-white border border-[#d6a758] shadow-sm p-8 flex flex-col gap-5">
              <div>
                <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase font-medium mb-2">Most intensive</p>
                <span className="text-[#8A6014] text-xs tracking-[0.15em] uppercase font-medium">03</span>
              </div>
              <div>
                <h3 className="text-[#0e1a7a] font-semibold text-xl mb-2" style={serif}>Executive Level</h3>
                <p className="text-[#64748B] text-sm">Heads of School, Executive Directors, Founding Leaders</p>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed flex-1">
                The most intensive engagement. For the hire that shapes the philosophical and operational center of the institution.
              </p>
              <p className="text-[#64748B] text-xs">Timeline: 8–16 weeks</p>
              <a href="#executive-level" className="text-[#0e1a7a] text-xs tracking-wide font-medium hover:underline mt-auto">
                View this pathway →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Three levels */}
      <section id="levels" className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Search Levels</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Three levels of search, built for the stakes of each role.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Each level is scoped to the depth and intensity the role requires.
              All three are led by Hannah and include philosophy vetting at their core.
            </p>
          </div>
          <div className="space-y-6">
            {levels.map((level) => (
              <div
                key={level.id}
                id={level.id}
                className={`bg-white border p-10 ${
                  level.featured ? 'border-[#d6a758] shadow-md' : 'border-[#E2DDD6]'
                }`}
              >
                {level.featured && (
                  <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase font-medium mb-4">
                    Most intensive
                  </p>
                )}
                <div className="grid md:grid-cols-3 gap-10">
                  <div className="md:col-span-1">
                    <span className="text-[#8A6014] text-xs tracking-[0.15em] uppercase block mb-3">
                      {level.number}
                    </span>
                    <h3 className="text-[#0e1a7a] font-semibold text-2xl mb-2" style={serif}>
                      {level.name}
                    </h3>
                    <p className="text-[#64748B] text-sm leading-relaxed">{level.scope}</p>
                  </div>
                  <div className="md:col-span-1">
                    <p className="text-[#374151] text-sm leading-relaxed mb-4">{level.description}</p>
                    <p className="text-[#64748B] text-xs italic leading-relaxed">{level.whoItIsFor}</p>
                  </div>
                  <div>
                    <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">What&apos;s included</p>
                    <ul className="space-y-2 mb-6">
                      {level.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                          <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0e1a7a] text-xs tracking-wide font-medium hover:underline"
                    >
                      Start a search at this level →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When hiring reveals something deeper */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Wider Pattern</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              A search often names what an organization has been avoiding.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              The conversation about what makes a great head of school often reveals that the board hasn&apos;t agreed on what the school is actually for. The search for a curriculum director surfaces that no one has written down what Montessori fidelity means here. These aren&apos;t surprises—they&apos;re the normal shape of organizational clarity that hasn&apos;t happened yet.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              For schools ready to address what the search surfaces, Advisory provides the structure to do it.
            </p>
          </div>
          <div className="space-y-5">
            {/* Montessori Mapping card */}
            <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-7">
              <h3 className="text-[#0e1a7a] font-bold text-lg mb-3" style={serif}>Montessori Mapping</h3>
              <p className="text-[#374151] text-sm leading-relaxed mb-4">
                A structured diagnostic for schools that need to see themselves clearly before—or after—a major hire.
              </p>
              <Link href="/advisory/mapping" className="text-[#0e1a7a] text-sm font-medium tracking-wide hover:underline">
                Explore Mapping →
              </Link>
            </div>
            {/* Strategic Partnership card */}
            <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-7">
              <h3 className="text-[#0e1a7a] font-bold text-lg mb-3" style={serif}>Strategic Partnership</h3>
              <p className="text-[#374151] text-sm leading-relaxed mb-4">
                For schools that want an embedded advisory partner through a transition, expansion, or leadership change.
              </p>
              <Link href="/advisory/partnership" className="text-[#0e1a7a] text-sm font-medium tracking-wide hover:underline">
                Explore Partnership →
              </Link>
            </div>
            {/* CTA card */}
            <div className="bg-[#0e1a7a] p-7">
              <p className="text-white text-sm leading-relaxed mb-5">
                Start with a conversation about what your school is navigating.
              </p>
              <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="block bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center w-full"
>
  Book a Consultation
</a>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops strip */}
      <section className="bg-[#F2EDE6] py-16 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Workshops &amp; Speaking</p>
            <h3 className="text-2xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              The hire is step one. Building the culture around them is step two.
            </h3>
            <p className="text-[#374151] text-base leading-relaxed">
              Schools often combine a strategic search with professional development—for the incoming hire, for the team, or for the leadership structure receiving them. Workshops &amp; Speaking is part of the same ecosystem.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/advisory/workshops-speaking" className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap block">
              Explore Workshops &amp; Speaking →
            </Link>
          </div>
        </div>
      </section>

      {/* What Schools Say */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-5">What Schools Say</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>In their words.</h2>
          </div>

          {/* Featured — Rebecca Lingo */}
          <div className="bg-white border border-[#D4CEC6] p-10 md:p-14 mb-8">
            <p className="text-[#d6a758] text-5xl leading-none mb-6" aria-hidden="true">&ldquo;</p>
            <p className="text-[#0e1a7a] text-xl md:text-2xl leading-[1.5] mb-5" style={serif}>
              We are so glad to have found Hannah Richardson. Her Montessori knowledge and background, combined with the depth of analysis and thought process she walked us through, helped us identify exactly what to look for in a candidate who would truly fit our school.
            </p>
            <p className="text-[#374151] text-base leading-[1.85] mb-5">
              She has resources and reach beyond what we had access to before, and she helped us define not just who we were looking for but how to think about hiring well. We will absolutely work with Montessori Makers again.
            </p>
            <div className="pt-6 border-t border-[#E2DDD6]">
              <p className="text-[#374151] font-semibold text-sm">Rebecca Lingo</p>
              <p className="text-[#64748B] text-sm mt-0.5">Head of School, Wheaton Montessori School</p>
              <span className="inline-block mt-3 text-[#8A6014] text-[9px] tracking-[0.18em] uppercase border border-[#8A6014]/30 px-2 py-0.5">
                Strategic Search
              </span>
            </div>
          </div>

          {/* Secondary — Alisa Anania */}
          <div className="bg-white border border-[#D4CEC6] p-8 md:p-10">
            <div className="max-w-3xl">
              <p className="text-[#0e1a7a] text-lg md:text-xl leading-[1.6] mb-6" style={serif}>
                &ldquo;We had the pleasure of working with Hannah during a critical hiring phase, and her professionalism stood out from the very beginning. She navigated a complex search with care and clarity — combining professionalism with a personal touch.&rdquo;
              </p>
              <div>
                <p className="text-[#374151] font-semibold text-sm">Alisa Anania</p>
                <p className="text-[#64748B] text-sm mt-0.5">Head of School, The Tidewater School</p>
                <span className="inline-block mt-3 text-[#8A6014] text-[9px] tracking-[0.18em] uppercase border border-[#8A6014]/30 px-2 py-0.5">
                  Strategic Search
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Ready to Begin</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              Let&apos;s start with a conversation.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Every Strategic Search begins with a discovery conversation — no
              commitment required. We&apos;ll talk about the role, the school,
              and what the right search process looks like.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap"
>
  Book a Consultation
</a>
            <Link
              href="/matchhub"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Back to MatchHub →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
