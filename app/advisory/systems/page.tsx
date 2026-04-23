import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const HONEYBOOK = 'https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1'

const offerings = [
  {
    name: 'Systems Intensives',
    href: '/advisory/systems-intensives',
    tagline: 'Scoped, single-system project work',
    engagement: '3 sessions · 4–6 weeks · Starting at $2,000',
    description:
      'Focused engagements scoped to one organizational system — compensation, enrollment, new leader onboarding, staff retention, annual cycle planning, or financial literacy. Three working sessions, one customized deliverable, completed in four to six weeks.',
    for: 'Schools that need a specific piece of infrastructure built and are ready to make decisions.',
  },
  {
    name: 'Board Development',
    href: '/advisory/board-development',
    tagline: 'Governance & board-head dynamics',
    engagement: 'Single session to retained',
    description:
      'Board role clarity, governance structure, board-head relationship architecture, committee design, and strategic planning facilitation. For boards that need to function as genuine partners to school leadership — not just oversight bodies.',
    for: 'Schools where board governance is underdeveloped, strained, or navigating transition.',
  },
  {
    name: 'Family Engagement',
    href: '/advisory/family-engagement',
    tagline: 'Family communication systems',
    engagement: 'Project-based',
    description:
      'Building the communication infrastructure that helps families understand Montessori, reduces parent-driven friction, and gives guides and directors clear systems to work from. Covers orientation, ongoing communication, conferences, and community programming.',
    for: 'Schools where family misunderstanding, enrollment attrition, or communication breakdown recurs.',
  },
  {
    name: 'Strong Systems',
    href: '/advisory/strong-systems',
    tagline: 'Founding & startup infrastructure',
    engagement: 'Project-based to retained',
    description:
      'Organizational design, governance formation, hiring infrastructure, operational systems, and year-one planning for schools building from scratch — or catching up on what they skipped in the early years.',
    for: 'Founding teams, charter applicants, and schools in years one through five.',
  },
  {
    name: 'Communication Strategy',
    href: '/advisory/communication-strategy',
    tagline: 'Organizational communication design',
    engagement: 'Project-based',
    description:
      'Building the communication infrastructure that reduces conflict, builds trust, and stops the same problems from cycling through the organization year after year. Covers internal communication patterns, role clarity, and systems-level design.',
    for: 'Schools experiencing communication breakdowns, high turnover, or recurring trust erosion.',
  },
]

export default function SystemsPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Advisory &middot; Systems Work
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Specific problems. Built solutions.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
              Systems Work is the project-based layer of Advisory — focused engagements that build
              a specific piece of organizational infrastructure, scoped to a defined problem,
              and completed with a deliverable your school can actually use.
            </p>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              Not every school needs a full Mapping or a long-term partnership. Some schools need
              their compensation structure built. Their board functioning properly. Their family
              communication redesigned. Systems Work is how that happens — bounded, expert-led,
              and done.
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

      {/* ── OFFERINGS ────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Engagements</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-5" style={serif}>
            Five types of systems work. One at a time.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Each engagement is scoped to a specific organizational system. Schools choose based on
            where the friction is — and what infrastructure is actually missing.
          </p>

          <div className="space-y-5">
            {offerings.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block bg-white border border-[#E2DDD6] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(14,26,122,0.08)] transition-all duration-200 group"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-0">
                  <div className="w-1.5 flex-shrink-0 self-stretch bg-[#d6a758] hidden md:block" />
                  <div className="h-1.5 bg-[#d6a758] md:hidden" />
                  <div className="flex flex-col md:flex-row flex-1 p-7 gap-8">
                    <div className="md:w-64 flex-shrink-0">
                      <h3 className="text-[#0e1a7a] text-xl font-semibold mb-1 leading-snug group-hover:underline" style={serif}>
                        {item.name}
                      </h3>
                      <p className="text-[#8A6014] text-xs tracking-wide uppercase mb-3">{item.tagline}</p>
                      <p className="text-[#64748B] text-xs">{item.engagement}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-[#374151] text-sm leading-relaxed mb-3">{item.description}</p>
                      <p className="text-[#64748B] text-xs leading-relaxed">
                        <span className="font-medium text-[#374151]">For: </span>{item.for}
                      </p>
                    </div>
                    <div className="flex items-center flex-shrink-0 text-[#d6a758] md:pl-4">
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT FITS ──────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Where This Fits</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              Systems Work sits between the Toolbox and a full Advisory engagement.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-5">
              The Toolbox gives you the template. Systems Work builds the system with you — using
              your school&rsquo;s actual context, numbers, and people. A Mapping engagement or
              Strategic Partnership addresses the whole organization when multiple systems are
              failing at once.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Most schools start here. The problem is specific, the scope is clear, and the work
              can be completed in weeks rather than months.
            </p>
          </div>
          <div className="space-y-0 md:pt-14">
            {[
              { label: 'Toolbox', desc: 'Templates and frameworks to adapt yourself', href: '/toolbox/store' },
              { label: 'Systems Work', desc: 'Built with you, using your school\'s context', href: '/advisory/systems', active: true },
              { label: 'Montessori Mapping', desc: 'Whole-organization diagnostic and planning', href: '/advisory/mapping' },
              { label: 'Strategic Partnership', desc: 'Retained advisory embedded in your leadership', href: '/advisory/partnership' },
            ].map((tier) => (
              <Link
                key={tier.label}
                href={tier.href}
                className={`flex items-center gap-5 px-6 py-5 border-b border-[#E2DDD6] hover:bg-white transition-colors group ${tier.active ? 'bg-white' : ''}`}
              >
                <div className={`w-1.5 h-8 flex-shrink-0 ${tier.active ? 'bg-[#d6a758]' : 'bg-[#E2DDD6]'}`} />
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${tier.active ? 'text-[#0e1a7a]' : 'text-[#374151]'}`} style={serif}>{tier.label}</p>
                  <p className="text-[#64748B] text-xs mt-0.5">{tier.desc}</p>
                </div>
                <svg className="w-4 h-4 text-[#d6a758] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white leading-tight mb-4" style={serif}>
            Not sure which engagement fits?
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Start with a consultation. We will look at what your school actually needs and find
            the right entry point together.
          </p>
          <a
            href={HONEYBOOK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#d6a758] text-white text-sm px-12 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium mb-8"
          >
            Book a 30-Minute Consultation
          </a>
          <div>
            <Link href="/advisory" className="text-white/50 text-sm hover:text-white/80 transition-colors">
              &larr; Back to Advisory
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  )
}
