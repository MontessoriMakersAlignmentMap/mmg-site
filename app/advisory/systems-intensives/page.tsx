import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const HONEYBOOK = 'https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1'

const intensives = [
  {
    title: 'Compensation Framework',
    desc: 'Build a pay scale your team can trust — grounded in your values, honest about your budget, and structured to end annual negotiation.',
    for: 'Schools with no formal compensation structure, or one that has stopped holding up',
    investment: 'Starting at $3,000',
    toolboxSlug: 'compensation-framework-toolkit',
  },
  {
    title: 'Enrollment Systems',
    desc: 'Document and strengthen your enrollment process from inquiry through re-enrollment, with equity and sustainability built in.',
    for: 'Schools improvising their enrollment process or losing families they should be keeping',
    investment: 'Starting at $3,000',
    toolboxSlug: 'enrollment-systems-toolkit',
  },
  {
    title: 'New Leader Onboarding',
    desc: 'Build the 90-day infrastructure for a leader entering your school — so the transition holds and the community does not lose ground.',
    for: 'Schools mid-search, post-placement, or planning a transition',
    investment: 'Starting at $2,500',
    toolboxSlug: 'new-leader-onboarding-toolkit',
  },
  {
    title: 'Staff Retention System',
    desc: 'Understand why your people stay and why they leave, and build the practices that close the gap before someone walks out.',
    for: 'Schools experiencing turnover, disengagement, or a retention risk they cannot name yet',
    investment: 'Starting at $2,500',
    toolboxSlug: 'staff-retention-toolkit',
  },
  {
    title: 'Annual Cycle Planning',
    desc: 'Build an organizational calendar that connects your budget, enrollment, HR, board, and program cycles so leadership stops being reactive.',
    for: 'Schools that are always behind, always surprised, or carrying decisions that should have been made months earlier',
    investment: 'Starting at $2,000',
    toolboxSlug: 'annual-cycle-planning-toolkit',
  },
  {
    title: 'Financial Literacy for Leadership',
    desc: 'Work through your actual financial statements, budget, and risk picture with a Montessori-specific lens — so you can lead from the numbers instead of around them.',
    for: 'Heads of school and directors who need to build real financial fluency, not just survive the board meeting',
    investment: 'Starting at $2,500',
    toolboxSlug: 'financial-literacy-toolkit',
  },
]

const includes = [
  {
    title: 'Three virtual working sessions with Hannah',
    desc: 'Discovery, build, and rollout. Each session is focused and moves the work forward.',
  },
  {
    title: 'A customized deliverable document',
    desc: 'Built from your school\'s actual context, numbers, and language. Ready to implement.',
  },
  {
    title: 'Implementation guidance',
    desc: 'You leave with a communication plan and a clear next step, not just a finished document.',
  },
  {
    title: 'Connection to the Toolbox',
    desc: 'Every Intensive connects to the relevant Toolbox product so your team has a reference resource after the engagement ends.',
  },
]

export default function SystemsIntensivesPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Advisory &middot; Systems Intensives
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Build one system. Build it right.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
              Systems Intensives are focused, project-based engagements for schools that need a
              specific piece of infrastructure built &mdash; not a long-term consulting relationship.
            </p>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              Most schools don&rsquo;t need a year of advisory work. They need their compensation
              structure fixed. Their enrollment process documented. Their new leader properly
              onboarded. A Systems Intensive gives you three working sessions, an expert thought
              partner, and a finished deliverable you can actually use &mdash; scoped to one system,
              completed in four to six weeks.
            </p>
            <a
              href={HONEYBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
            >
              Start a Conversation
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Structure</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              Three sessions. One deliverable. Real infrastructure.
            </h2>
          </div>
          <div className="space-y-6 text-[#374151] text-lg leading-relaxed md:pt-16">
            <p>
              Every Systems Intensive follows the same arc. Session one is discovery and
              current-state assessment &mdash; we look at what exists, what is missing, and what
              your specific context requires before anything gets built. Session two is the
              framework build, where we work through the system together and make the decisions
              that matter. Session three is the communication and implementation plan, so the work
              does not sit in a folder. Every engagement closes with a customized deliverable
              document that belongs to your school.
            </p>
            <p>
              All sessions are conducted virtually. Most engagements complete within four to six
              weeks of the start date.
            </p>
          </div>
        </div>
      </section>

      {/* ── AVAILABLE INTENSIVES ─────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Current Offerings</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-5" style={serif}>
            Six systems. One at a time.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Each Intensive is scoped to a single organizational system. Schools choose based on
            where the friction is right now.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {intensives.map((item) => (
              <div key={item.title} className="bg-white flex flex-col">
                <div className="h-1 bg-[#d6a758]" />
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-[#0e1a7a] text-lg font-semibold mb-3 leading-snug" style={serif}>
                    {item.title}
                  </h3>
                  <p className="text-[#374151] text-sm leading-relaxed mb-4 flex-1">{item.desc}</p>
                  <p className="text-[#64748B] text-xs leading-relaxed mb-4">
                    <span className="font-medium text-[#374151]">For: </span>{item.for}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E2DDD6]">
                    <p className="text-[#0e1a7a] text-base font-semibold" style={serif}>
                      {item.investment}
                    </p>
                    <Link
                      href={`/toolbox/${item.toolboxSlug}`}
                      className="text-[#8A6014] text-[11px] tracking-wide hover:underline"
                    >
                      Toolbox resource &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Every Intensive Includes</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-14" style={serif}>
            Not a template. Not a training. A system built for your school.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {includes.map((item) => (
              <div key={item.title} className="flex items-start gap-6 p-7 border border-[#E2DDD6]">
                <div className="w-1 flex-shrink-0 self-stretch bg-[#d6a758]" />
                <div>
                  <h3 className="text-[#0e1a7a] font-semibold text-base mb-2" style={serif}>
                    {item.title}
                  </h3>
                  <p className="text-[#374151] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Right Fit</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              This is not the right entry point for every school.
            </h2>
            <div className="space-y-5 text-[#374151] text-lg leading-relaxed">
              <p>
                A Systems Intensive works best when the problem is specific, leadership is ready to
                make decisions, and the school wants infrastructure, not just advice. If your school
                is navigating a leadership transition, a governance crisis, or a culture breakdown
                that touches every system at once, a Mapping engagement or Strategic Partnership is
                likely the better starting point.
              </p>
              <p>
                If you are not sure which path fits, start with a consultation. We will figure it
                out together.
              </p>
            </div>
            <div className="mt-10">
              <a
                href={HONEYBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors font-medium"
              >
                Book a 30-Minute Consultation
              </a>
            </div>
          </div>
          <div className="space-y-4 md:pt-14">
            {[
              'The problem is specific and nameable',
              'Leadership is ready to make decisions — not just explore options',
              'The school wants a finished system, not an ongoing advisory relationship',
              'Budget is available but a full Mapping or Partnership is not the right scale',
              'The school has a Toolbox product and wants implementation support to go with it',
              'A new leader, new system, or specific friction point creates a natural entry moment',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-[#E2DDD6] last:border-0">
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                <span className="text-[#374151] text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIRS WITH ───────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Goes Further With</p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
            Every Intensive stands alone. Schools that want to go deeper use these.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: 'Montessori Mapping', tagline: 'Whole-school diagnostic & planning', href: '/advisory/mapping' },
              { name: 'Strategic Partnership', tagline: 'Retained long-term advisory', href: '/advisory/partnership' },
              { name: 'Montessori Makers Toolbox', tagline: 'Templates & frameworks to keep', href: '/toolbox/store' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="border border-white/15 p-7 hover:border-white/30 transition-colors group block"
              >
                <p className="text-[#94A3B8] text-[10px] tracking-[0.16em] uppercase mb-2">{item.tagline}</p>
                <p className="text-white text-lg font-medium mb-4 group-hover:underline" style={serif}>
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

      {/* ── TERMS NOTE ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] border-t border-[#E2DDD6] py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#64748B] text-xs leading-relaxed max-w-3xl">
            Systems Intensives are scoped and priced per engagement. Investment listed is a starting
            point; final scope is confirmed in the initial consultation. Payment is structured 50% at
            engagement start and 50% at deliverable delivery. All engagements managed through
            HoneyBook.
          </p>
        </div>
      </section>

      <NewsletterSignup />
    </>
  )
}
