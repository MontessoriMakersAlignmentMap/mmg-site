import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { AnimatedStat } from '@/components/AnimatedStat'
import { FadeIn, RevealEyebrow } from '@/components/FadeIn'

const serif = { fontFamily: 'var(--font-heading)' }

const programs = [
  {
    tier: '01',
    name: 'Applied Seminars',
    href: '/institute/seminars',
    format: 'Half-day & full-day sessions',
    description:
      'Focused sessions on specific leadership challenges—difficult conversations, strategic communication, adult culture, decision-making under pressure. Immediately applicable. No prerequisites.',
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
      'A standing peer cohort for active leaders. Monthly sessions, structured reflection, and shared problem-solving with peers who understand the work. Not a course—a practice.',
    cta: 'Join the next cohort',
  },
  {
    tier: '04',
    name: 'Leadership Alignment Retreat',
    href: '/institute/retreat',
    format: 'Team-based, on-site or residential',
    description:
      'For leadership teams—not individuals. A structured retreat that surfaces misalignment, works through shared challenges, and builds the shared language teams need to actually function.',
    cta: 'Learn about retreats',
  },
  {
    tier: '05',
    name: 'Leadership Residency',
    href: '/institute/residency',
    format: '1:1, sustained, application-based',
    description:
      'The Institute\'s highest-commitment offering. A sustained, one-to-one engagement built around a single leader navigating significant transition, elevated responsibility, or a critical period of organizational change. Application-based. Limited availability.',
    cta: 'Apply for Residency',
  },
]

export default function InstitutePage() {
  return (
    <>
      {/* Hero */}
      <section className="grain bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          <div className="max-w-2xl flex-1">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Montessori Makers Institute
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Leadership for the part they didn&apos;t prepare you for.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Not a program you complete. Real situations, real constraints, real
              communities—using Montessori as the reasoning framework.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-shimmer bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium">
                Find Your Program
              </Link>
              <a href="#programs" className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center">
                View Programs
              </a>
            </div>
          </div>
          {/* Hero logo — right column */}
          <div className="hidden md:flex items-center justify-end flex-shrink-0">
            <Logo name="institute" heroWidth={380} heroHeight={380} />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#070e3d] border-b border-white/10 px-6 md:px-10 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '5',    label: 'Program formats', sub: 'Seminar to full-year residency' },
            { value: '100%', label: 'Practitioner-led', sub: 'No outside facilitators' },
            { value: '0',    label: 'Simulated scenarios', sub: 'Your real situation, always' },
            { value: '1',    label: 'Framework throughout', sub: 'Montessori as the reasoning lens' },
          ].map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <AnimatedStat value={s.value} className="text-[#d6a758] text-3xl md:text-4xl font-bold tracking-tight mb-1 block" style={serif} />
              <div className="text-white text-sm font-medium leading-snug">{s.label}</div>
              <div className="text-white/35 text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why it exists */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Why It Exists</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Montessori trains leaders in pedagogy. Almost nothing prepares them for the
              complexity of leading adults.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="space-y-6 pt-2">
            <p className="text-[#374151] text-lg leading-relaxed">
              Most leadership training prepares people <em>for</em> leadership. This builds
              capacity while you&apos;re already in it.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              No simulated scenarios. No theory to implement later. We work with your actual
              situation—your team, your constraints, your community—using Montessori as the
              framework for real decisions.
            </p>
            <blockquote className="border-l-4 border-[#d6a758] pl-6 py-1">
              <p className="text-[#374151] text-base italic leading-relaxed">
                &ldquo;Usually I leave with ideas. This time I left with next steps.&rdquo;
              </p>
              <p className="text-[#64748B] text-xs mt-2">— Montessori school leader</p>
            </blockquote>
          </FadeIn>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-[#F2EDE6] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Who It&apos;s For</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              For leaders already in the work.
            </h2>
            <div className="space-y-5">
              <p className="text-[#374151] text-lg leading-relaxed">
                Heads of school navigating the full complexity of the role &mdash; the organizational decisions, the adult culture challenges, the moments no training addressed.
              </p>
              <p className="text-[#374151] text-lg leading-relaxed">
                Directors, associate heads, and emerging leaders building the capacity to lead before stepping fully into it.
              </p>
              <p className="text-[#374151] text-lg leading-relaxed">
                Leadership teams that need to think and work together more effectively &mdash; across the full range of decisions a Montessori school demands.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 border-t border-[#E2DDD6] pt-12">
            <div>
              <p className="text-[#0e1a7a] font-semibold text-lg mb-2">Heads of School</p>
              <p className="text-[#64748B] text-sm leading-relaxed">Navigating the full organizational and cultural complexity of school leadership.</p>
            </div>
            <div>
              <p className="text-[#0e1a7a] font-semibold text-lg mb-2">Emerging Leaders</p>
              <p className="text-[#64748B] text-sm leading-relaxed">Building leadership capacity before stepping fully into a head role.</p>
            </div>
            <div>
              <p className="text-[#0e1a7a] font-semibold text-lg mb-2">Leadership Teams</p>
              <p className="text-[#64748B] text-sm leading-relaxed">Developing shared language and alignment across the full leadership function.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <RevealEyebrow className="mb-6">Programs</RevealEyebrow>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Five ways to engage.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Each format represents a different depth of engagement—from a single session to
              a full-year residency. All built for people actively in leadership, not preparing
              for it.
            </p>
          </div>
          <div className="space-y-3">
            {programs.map((p, i) => {
              const stepClasses = ['', 'md:ml-12', 'md:ml-24', 'md:ml-36', 'md:ml-48']
              return (
                <FadeIn key={p.name} delay={i * 0.08}>
                  <div className={`relative bg-white border border-[#E2DDD6] p-8 overflow-hidden hover:shadow-md hover:border-[#C8C0B6] hover:-translate-y-[1px] transition-all duration-200 ${stepClasses[i]}`}>
                    {/* Background tier number as texture */}
                    <span
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-[8rem] font-bold leading-none select-none pointer-events-none text-[#0e1a7a]/[0.035]"
                      style={serif}
                      aria-hidden
                    >
                      {p.tier}
                    </span>
                    <div className="relative grid md:grid-cols-4 gap-6 items-start">
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
                          {p.cta} →
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What Makes This Different</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Montessori leadership training built for people already leading.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Montessori as a reasoning framework',
                body: 'Not just a pedagogy. Montessori offers a principled way of thinking about adult development, organizational design, and human environments. Every program applies it to real leadership decisions.',
              },
              {
                title: 'Your situation, not a curriculum',
                body: 'We don\u2019t teach leadership in the abstract. The material is what you\u2019re actually navigating \u2014 your team, your constraints, your community.',
              },
              {
                title: 'Formation, not information',
                body: 'The goal isn\u2019t to give you more to read or implement. It\u2019s to change how you think, how you reason, and how you hold the complexity of leading a Montessori school.',
              },
              {
                title: 'Across the arc of leadership',
                body: 'From a first seminar to a full-year residency, every format is calibrated to a specific depth and kind of need. You don\u2019t have to do it all \u2014 you start where it makes sense.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-[#E2DDD6] p-8">
                <h3 className="text-[#0e1a7a] font-semibold text-lg mb-4" style={serif}>{card.title}</h3>
                <p className="text-[#374151] text-base leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Outcomes</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-6" style={serif}>
              What changes when you do this work.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              Not a credential. Not a model to roll out. A different way of seeing the
              work—and the people you lead.
            </p>
          </div>
          <div className="space-y-4">
            {[
              'Decisions made with clarity, even under real pressure',
              'Harder conversations handled with less damage',
              'Conflict that resolves instead of cycling',
              'Staff who trust leadership—and show it',
              'Leadership capacity that doesn\'t depend on any one person',
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-white/10 last:border-0">
                <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                <span className="text-white text-base">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">In the Montessori Makers Ecosystem</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              The Institute works alongside Advisory and Toolbox.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Advisory</p>
              <p className="text-[#374151] text-sm leading-relaxed mb-6">
                Strategic consulting for Montessori schools navigating organizational decisions, governance challenges, and structural change. Advisory addresses the systems; the Institute develops the leaders who run them.
              </p>
              <Link href="/advisory" className="text-[#0e1a7a] text-sm font-medium hover:underline">
                Explore Advisory &rarr;
              </Link>
            </div>
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Toolbox</p>
              <p className="text-[#374151] text-sm leading-relaxed mb-6">
                Practical tools, frameworks, and resources built for Montessori school leaders. What you&apos;re developing in the Institute, you can put to work with Toolbox resources.
              </p>
              <Link href="/toolbox" className="text-[#0e1a7a] text-sm font-medium hover:underline">
                Explore Toolbox &rarr;
              </Link>
            </div>
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">About Montessori Makers Group</p>
              <p className="text-[#374151] text-sm leading-relaxed mb-6">
                Montessori Makers Group is the organization behind the Institute, Advisory, and Toolbox. Learn about the mission, the founder, and the thinking behind the work.
              </p>
              <Link href="/about" className="text-[#0e1a7a] text-sm font-medium hover:underline">
                About Montessori Makers Group &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing line + CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#0e1a7a] text-2xl font-medium leading-snug mb-4" style={serif}>
              Because children experience the organization adults create.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-3">
              You&apos;re already carrying it—the decisions, the team tensions, the situations
              no one fully prepared you for.
            </p>
            <p className="text-[#64748B] text-base leading-relaxed mb-6">
              The quality of adult leadership shapes everything children experience in a
              Montessori school. This is not professional development. It&apos;s the work.
            </p>
            <p className="text-[#64748B] text-sm tracking-wide">
              Advisory addresses systems. The Institute develops the leaders who run them.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap font-medium">
              Find Your Program
            </Link>
            <Link href="/advisory" className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap">
              Explore Advisory →
            </Link>
          </div>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}
