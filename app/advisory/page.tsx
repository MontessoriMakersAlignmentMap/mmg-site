import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/Logo'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { AnimatedStat } from '@/components/AnimatedStat'
import { FadeIn } from '@/components/FadeIn'

const serif = { fontFamily: 'var(--font-heading)' }

const pathways = [
  {
    name: 'Systems Intensives',
    href: '/advisory/systems-intensives',
    tagline: 'Focused, single-system engagements',
    engagement: '3 sessions · 4–6 weeks',
    description:
      'Project-based engagements scoped to one organizational system — compensation, enrollment, onboarding, retention, annual planning, or financial literacy. Three sessions, one deliverable, real infrastructure.',
    for: 'Schools that need a specific system built, not a long-term consulting relationship.',
  },
  {
    name: 'Montessori Mapping',
    href: '/advisory/mapping',
    tagline: 'Whole-school alignment',
    engagement: '2–4 week engagement',
    description:
      'A structured diagnostic that maps what\'s working, what isn\'t, and what comes next. Roles, culture, communication, and systems—seen clearly, named honestly.',
    for: 'Schools facing growth, transition, culture friction, or strategic drift.',
  },
  {
    name: 'Leadership Coaching',
    href: '/advisory/coaching',
    tagline: '1:1 support for school leaders',
    engagement: 'Monthly sessions, min. 6 months',
    description:
      'Ongoing support for leaders navigating real decisions, real teams, and real pressure. Grounded in Montessori philosophy and organizational reality.',
    for: 'Heads of school, directors, and emerging leaders carrying significant responsibility.',
  },
  {
    name: 'Strategic Partnership',
    href: '/advisory/partnership',
    tagline: 'Long-term retained advisory',
    engagement: 'Retained, 6–12+ months',
    description:
      'A retained advisory partnership embedded directly in your leadership work. Strategic planning, board development, adult culture, hiring, equity work—as an ongoing thought partner.',
    for: 'Schools ready for sustained, deep organizational change.',
  },
  {
    name: 'Workshops & Speaking',
    href: '/advisory/workshops-speaking',
    tagline: 'Entry point & professional development',
    engagement: 'Single session to multi-day',
    description:
      'Keynotes, workshops, and facilitation for schools that need to move a room—or start a larger conversation. Most advisory relationships begin here.',
    for: 'Schools seeking professional development, conference programming, or a first engagement.',
  },
  {
    name: 'Leadership Transition Support',
    href: '/advisory/leadership-transition-support',
    tagline: 'High-stakes succession planning',
    engagement: '6 weeks–6 months',
    description:
      'Support before, during, and after leadership change. The structural and cultural work that determines whether a transition holds.',
    for: 'Schools in active succession, or planning ahead for leadership change.',
  },
  {
    name: 'Board Development',
    href: '/advisory/board-development',
    tagline: 'Governance & board-head dynamics',
    engagement: 'Single session to retained',
    description:
      'Board role clarity, governance structure, board-head relationship architecture, and strategic planning facilitation. For boards that need to function as true partners to leadership.',
    for: 'Schools where board governance is underdeveloped, strained, or in transition.',
  },
  {
    name: 'Family Engagement',
    href: '/advisory/family-engagement',
    tagline: 'Family communication systems',
    engagement: 'Project-based',
    description:
      'Building the communication infrastructure that helps families understand Montessori, reduces parent-driven friction, and gives guides and directors clear systems to work from.',
    for: 'Schools where family misunderstanding, attrition, or communication breakdown is recurring.',
  },
  {
    name: 'Strong Systems',
    href: '/advisory/strong-systems',
    tagline: 'Founding & startup infrastructure',
    engagement: 'Project-based to retained',
    description:
      'Organizational design, governance formation, hiring infrastructure, operational systems, and year-one planning for schools that are building from scratch — or catching up on what they skipped.',
    for: 'Founding teams, charter applicants, and schools in years one through five.',
  },
  {
    name: 'Communication Strategy',
    href: '/advisory/communication-strategy',
    tagline: 'Systems-level communication design',
    engagement: 'Project-based',
    description:
      'Building the communication infrastructure that reduces conflict, builds trust, and stops the same problems from cycling through the organization year after year.',
    for: 'Schools experiencing communication breakdowns, high turnover, or trust erosion.',
  },
]

const focusAreas = [
  'Strategic planning and vision alignment',
  'Leadership transition and succession',
  'Adult culture and team dynamics',
  'Board development and governance',
  'Equity work and inclusive systems',
  'Hiring and staffing strategy',
  'Communication and role clarity',
  'Program development and fidelity',
]

const outcomes = [
  'Decisions move faster',
  'Roles become clear',
  'Communication holds',
  'Hiring improves',
  'Leadership becomes sustainable',
]

const otherEngagements = [
  {
    name: 'Strategic Planning',
    description:
      'Facilitated planning processes that connect Montessori values to concrete organizational direction. For boards and leadership teams building the next 3–5 years.',
  },
  {
    name: 'Program Development & Expansion',
    description:
      'Designing or scaling programs with fidelity—from elementary expansion to new campuses. Philosophy-first, systems-forward.',
  },
  {
    name: 'Adult Practice Review',
    description:
      'A structured audit of adult culture, professional development systems, and how the organization actually develops the people in it.',
  },
  {
    name: 'Organizational Systems Design',
    description:
      'Building the infrastructure that makes organizations function: decision rights, documentation, meeting architecture, role design.',
  },
  {
    name: 'Equity & Adult Culture Work',
    description:
      'Anti-bias, antiracist practice embedded in adult systems—not as a training event but as organizational change.',
  },
]

export default function AdvisoryPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="grain bg-[#0e1a7a] pt-32 pb-28 md:pt-40 md:pb-36 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          <div className="max-w-2xl flex-1">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Montessori Makers Advisory
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-[4.25rem] text-white leading-[1.02] tracking-tight mb-8"
              style={serif}
            >
              Strong classrooms. Systems ready to grow. We build what comes next.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-[1.75] mb-5 max-w-2xl">
              Most Montessori schools have extraordinary educators and a mission worth sustaining. What they deserve is organizational infrastructure that matches the quality of the classroom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
>
  Book a Consultation
</a>
              <a
                href="#pathways"
                className="border border-white/25 text-white/80 text-sm px-8 py-4 tracking-wide hover:border-white/50 hover:text-white transition-colors text-center"
              >
                See How We Work
              </a>
            </div>
          </div>
          {/* Hero logo — right column */}
          <div className="hidden md:flex items-center justify-end flex-shrink-0">
            <Logo name="advisory" heroWidth={380} heroHeight={380} />
          </div>
        </div>
      </section>

      {/* ─── Stats bar ────────────────────────────────────────────────────── */}
      <section className="bg-[#070e3d] border-b border-white/10 px-6 md:px-10 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '20+', label: 'Years in Montessori', sub: 'Deep practitioner roots' },
            { value: '6',   label: 'Engagement pathways', sub: 'From single session to retained' },
            { value: '100%', label: 'Montessori-specific', sub: 'No generic consulting playbook' },
            { value: '0',   label: 'Off-the-shelf frameworks', sub: 'Built around your school' },
          ].map((s) => (
            <FadeIn key={s.value}>
              <div className="text-center md:text-left">
                <AnimatedStat
                  value={s.value}
                  className="text-[#d6a758] text-3xl md:text-4xl font-bold tracking-tight mb-1 block"
                  style={serif}
                />
                <div className="text-white text-sm font-medium leading-snug">{s.label}</div>
                <div className="text-white/35 text-xs mt-0.5">{s.sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─── Core Problem Framing ─────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            The Pattern We See
          </p>
          <h2
            className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-8"
            style={serif}
          >
            The classroom is the strongest part of the organization.
          </h2>
          <div className="space-y-6">
            <p className="text-[#374151] text-lg leading-[1.85]">
              Montessori schools invest deeply in prepared environments, trained teachers, and philosophical fidelity. The result is often classrooms that are genuinely extraordinary. The systems around those classrooms—how decisions get made, how roles are defined, how adults communicate, how leadership carries its weight—often develop organically rather than by design, without the clarity and documentation that intentional growth requires.
            </p>
            <p className="text-[#374151] text-lg leading-[1.85]">
              Advisory exists for that opportunity. Not to change what&apos;s working — but to build what was never built.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Who It's For ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Who It&apos;s For
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Built for Montessori schools at a turning point.
            </h2>
            <p className="text-[#374151] text-lg leading-[1.85] max-w-[42ch]">
              Advisory is for schools where the mission is strong — and growth is asking for
              stronger organizational structure. Where leadership is ready for real support.
              Where naming roles, decisions, and communication clearly would free the team
              to do its best work. Where the next stage of growth deserves infrastructure
              built to hold it.
            </p>
          </div>
          <div className="space-y-1 md:pt-16">
            {[
              'Heads of school navigating complexity',
              'Boards that need clarity and alignment',
              'Schools in growth, transition, or repair',
              'Leaders building for sustainability—not just survival',
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4 border-b border-[#E2DDD6] last:border-0 hover:bg-[#F7F4EF] transition-colors -mx-3 px-3 rounded-sm"
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                <span className="text-[#374151] text-base leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Hannah / advisor moment ──────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          {/* Photo */}
          <div className="relative w-full md:w-[420px] lg:w-[480px] flex-shrink-0 h-72 md:h-auto min-h-[400px]">
            <Image
              src="/images/hannah.jpg"
              alt="Hannah Richardson, founder of Montessori Makers Group"
              fill
              className="object-cover object-[center_10%]"
              sizes="(max-width: 768px) 100vw, 480px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0e1a7a] hidden md:block" />
          </div>
          {/* Quote */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-20 py-16 md:py-20">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">The Advisor</p>
            <blockquote className="text-white text-2xl md:text-3xl lg:text-4xl leading-[1.2] mb-8" style={serif}>
              &ldquo;I built this practice because Montessori deserves organizations as strong as its classrooms.&rdquo;
            </blockquote>
            <p className="text-[#94A3B8] text-base leading-relaxed mb-2">
              Hannah Richardson brings nearly 25 years of Montessori leadership experience — as guide, director, head of school, and consultant — to every advisory engagement.
            </p>
            <p className="text-[#64748B] text-sm mt-4">
              — Hannah Richardson, Founder &amp; Lead Advisor
            </p>
          </div>
        </div>
      </section>

      {/* ─── Pathways ─────────────────────────────────────────────────────── */}
      <section id="pathways" className="bg-[#F2EDE6] py-28 md:py-36 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Service Pathways
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              The primary pathways.
            </h2>
            <p className="text-[#374151] text-lg leading-[1.75]">
              Every engagement is tailored to your school&apos;s specific situation.
              These pathways describe the most common entry points.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pathways.map((p) => (
              <div
                key={p.name}
                className="bg-white border border-[#E2DDD6] p-9 flex flex-col gap-5 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(14,26,122,0.09)] transition-all duration-200"
              >
                <div className="w-0.5 h-8 bg-[#d6a758]" />
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[#64748B] mb-0.5">
                    {p.tagline}
                  </p>
                  <h3 className="text-[#0e1a7a] font-semibold text-xl mb-1" style={serif}>
                    {p.name}
                  </h3>
                  <p className="text-[#8A6014] text-[11px] tracking-[0.1em]">{p.engagement}</p>
                </div>
                <p className="text-[#374151] text-sm leading-[1.75] flex-1">{p.description}</p>
                <div className="pt-5 border-t border-[#EDE8E1]">
                  <p className="text-xs text-[#64748B] mb-4 leading-relaxed">
                    <span className="font-medium text-[#374151]">Best for: </span>
                    {p.for}
                  </p>
                  <Link
                    href={p.href}
                    className="text-[#0e1a7a] text-xs tracking-wide font-medium hover:underline"
                  >
                    Start a conversation →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Other Ways Schools Engage ────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Other Ways Schools Engage This Work
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Not every engagement follows a named pathway.
            </h2>
            <p className="text-[#374151] text-lg leading-[1.75]">
              Some schools come with a specific problem that doesn&apos;t map cleanly to Mapping, Coaching, or a Retained Partnership. These engagements are equally common—and equally serious.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {otherEngagements.map((item, i) => (
              <div
                key={i}
                className="bg-[#FAF9F7] border border-[#E2DDD6] p-8"
              >
                <h3 className="text-[#0e1a7a] font-semibold text-base mb-3" style={serif}>
                  {item.name}
                </h3>
                <p className="text-[#374151] text-sm leading-[1.75]">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p className="text-[#374151] text-base leading-[1.75]">
              These engagements are scoped in consultation. Start with a conversation.
            </p>
            <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap font-medium flex-shrink-0"
>
  Book a Consultation
</a>
          </div>
        </div>
      </section>

      {/* ─── Engagement Areas ─────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-6">
              Common Engagement Areas
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight mb-6"
              style={serif}
            >
              What we work on together.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-[1.75]">
              Advisory engagements don&apos;t follow a generic playbook. But these are the
              areas we return to most—because they&apos;re where the real alignment work
              happens.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
            {focusAreas.map((area, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-white/10 last:border-0 hover:border-white/20 hover:bg-white/[0.03] transition-colors -mx-2 px-2 rounded-sm group"
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform">
                  —
                </span>
                <span className="text-white text-sm leading-relaxed">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What Changes ─────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              The Outcome
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              What changes when alignment is real.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
            {outcomes.map((outcome, i) => (
              <div
                key={i}
                className="border border-[#E2DDD6] p-7 hover:border-[#0e1a7a] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(14,26,122,0.07)] transition-all duration-200"
              >
                <span className="text-[#8A6014] text-lg block mb-4">—</span>
                <p className="text-[#0e1a7a] font-medium text-base leading-snug" style={serif}>
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What Schools Say ─────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-5">
              What Schools Say
            </p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              In their words.
            </h2>
          </div>

          {/* Featured testimonial — Board Chair */}
          <div className="bg-white border border-[#D4CEC6] p-10 md:p-14 mb-8">
            <div className="grid md:grid-cols-[1fr_240px] gap-12 items-start">
              <div>
                <p className="text-[#d6a758] text-5xl leading-none mb-6" aria-hidden="true">&ldquo;</p>
                <div className="space-y-5">
                  <p className="text-[#0e1a7a] text-xl md:text-2xl leading-[1.5]" style={serif}>
                    Working with Hannah has been a tremendous support to both our school and our board. The project centered on two core areas: board governance and Head of School transition planning. The sensitivity around leadership dynamics was real, and she navigated it exceptionally well.
                  </p>
                  <p className="text-[#374151] text-base leading-[1.85]">
                    She is thorough and in-depth in her process, taking time to meet with parents, staff, and board members before arriving at her recommended approach. The response from our community has been overwhelmingly positive. We are now working through implementation with her continued support.
                  </p>
                  <p className="text-[#374151] text-base leading-[1.85]">
                    Beyond her strategic expertise, she is genuinely wonderful to work with. Two thumbs up.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-[#E2DDD6]">
                  <p className="text-[#374151] font-semibold text-sm">Board Chair</p>
                  <p className="text-[#64748B] text-sm mt-0.5">Independent Montessori School</p>
                  <span className="inline-block mt-3 text-[#8A6014] text-[9px] tracking-[0.18em] uppercase border border-[#8A6014]/30 px-2 py-0.5">
                    Board Governance &amp; Leadership Transition
                  </span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-6">
                  <p className="text-[#8A6014] text-[9px] tracking-[0.18em] uppercase mb-4">Areas of Work</p>
                  <div className="space-y-2">
                    {['Board governance', 'Head of School transition planning', 'Community consultation', 'Implementation support'].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <span className="text-[#8A6014] text-xs flex-shrink-0 mt-0.5">—</span>
                        <span className="text-[#374151] text-xs leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-5">
              Next Step
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-5"
              style={serif}
            >
              Start with a 30-minute conversation. We&apos;ll figure out what&apos;s
              actually getting in the way.
            </h2>
            <p className="text-[#4B5563] text-base leading-[1.75]">
              No pitch. No generic framework. A real conversation about where your school
              is and what alignment would actually look like.
            </p>
          </div>
          <div className="flex flex-col gap-4 flex-shrink-0">
            <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#0e1a7a] text-white text-sm px-12 py-5 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap font-medium"
>
  Book a Consultation
</a>
            <Link
              href="/advisory/workshops-speaking"
              className="text-[#64748B] text-sm px-12 py-3 tracking-wide hover:text-[#0e1a7a] transition-colors text-center whitespace-nowrap"
            >
              Explore Workshops &amp; Speaking →
            </Link>
          </div>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}
