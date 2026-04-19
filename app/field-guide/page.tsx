import Link from 'next/link'
import Image from 'next/image'

const serif = { fontFamily: 'var(--font-heading)' }

type Mode = { id: string; name: string; desc: string; screenshot: string | null; screenshotAlt?: string }

const modes: Mode[] = [
  {
    id: 'G',
    name: 'Guide Me',
    desc: 'On-demand lesson walkthroughs organized by curriculum area. Materials, setup, presentation steps, what to watch for, and key language. Scope and sequence navigation shows what comes before and after every lesson. 516 lessons across Primary and Elementary.',
    screenshot: null,
  },
  {
    id: 'S',
    name: 'Support Me',
    desc: 'In-the-moment crisis and behavior support. A child in acute distress. Conflict between children. A child who has shut down. Transition struggles. Difficult parent conversations. Grounded, sequenced, regulate-first protocols you can follow right now.',
    screenshot: '/images/field-guide/support-crisis.png',
    screenshotAlt: 'Support Me — crisis protocol open in the Field Guide app',
  },
  {
    id: 'L',
    name: 'Support the Learner',
    desc: 'Practical strategies for supporting neurodivergent learners and children with suspected learning differences. Sensory processing, reading challenges, writing and fine motor, math and number sense, attention and executive function. Montessori-grounded, never deficit-based.',
    screenshot: null,
  },
  {
    id: 'R',
    name: 'Reflect',
    desc: "Structured professional reflection with AI coaching that pushes your thinking. End-of-day processing, a child on your mind, your environment, something you'd redo. The app responds like an experienced coach: curious, specific, and honest.",
    screenshot: '/images/field-guide/reflect.png',
    screenshotAlt: 'Reflect mode — prompts and coaching textarea in the Field Guide app',
  },
]

const communityFeatures = [
  'Full access to Support Me',
  'Full access to Support the Learner',
  'Full access to Reflect with AI coaching',
  'Guide Me: materials, setup, and what to watch for',
  'Scope and sequence navigation',
  'Pathway to the Montessori Makers Residency',
]

const credentialedFeatures = [
  'Everything in Community, plus:',
  'Full lesson walkthroughs with presentation steps',
  'Key language for every lesson',
  'AI-powered lesson search and recommendations',
  'Complete scope and sequence with prerequisites',
  'MMAP integration for lesson logging',
]

const ecoLinks = [
  { name: 'Advisory', href: '/advisory' },
  { name: 'Institute', href: '/institute' },
  { name: 'MMAP', href: '/mmap' },
  { name: 'MatchHub', href: '/matchhub' },
  { name: 'Residency', href: '/residency' },
  { name: 'Toolbox', href: '/toolbox' },
  { name: 'Learning', href: '/learning' },
]

export default function FieldGuidePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#0e1a7a] pt-32 pb-0 md:pt-40 px-6 md:px-10 relative overflow-hidden text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(214,167,88,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.03) 0%, transparent 50%)',
          }}
        />
        <div className="max-w-3xl mx-auto relative z-10 pb-16 md:pb-20">
          <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-[#d6a758] border border-[#d6a758]/30 px-4 py-1.5 rounded-full mb-8 font-medium">
            Part of the Montessori Makers ecosystem
          </span>
          <h1 className="text-5xl md:text-[56px] text-white leading-[1.15] mb-6" style={serif}>
            The{' '}
            <em className="text-[#d6a758]">Field Guide</em>
            {' '}for Montessori practitioners.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-[560px] mx-auto mb-10 font-light">
            Lesson walkthroughs. Crisis support. Learner strategies. Reflective coaching. AI-powered, Montessori-grounded, and built from 25 years inside real classrooms.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a
              href="https://montessorimarkersfieldguide.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-[#0e1a7a] text-sm px-8 py-3.5 rounded-md font-medium hover:opacity-90 hover:-translate-y-px transition-all"
            >
              Start your subscription
            </a>
            <a
              href="#modes"
              className="text-white text-sm px-8 py-3.5 rounded-md border border-white/25 hover:border-white/50 transition-all"
            >
              See how it works
            </a>
          </div>
        </div>
        {/* Hero screenshot — phone centered below CTA */}
        <div className="relative z-10 max-w-[300px] mx-auto drop-shadow-2xl">
          <Image
            src="/images/field-guide/guide-strands.png"
            alt="Guide Me — strand grid showing curriculum areas and lesson counts"
            width={440}
            height={900}
            className="w-full h-auto block rounded-t-3xl"
            priority
          />
        </div>
      </section>

      {/* FOUR MODES */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10" id="modes">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-3">Four modes. One app.</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
            What you need, when you need it.
          </h2>
          <p className="text-[17px] text-[#374151] leading-relaxed max-w-[640px] mb-12">
            The Field Guide meets you where you are in the work. At the shelf before a presentation. In the middle of a crisis. Thinking about a child who learns differently. Processing the day.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {modes.map((m) => (
              <div
                key={m.id}
                className="bg-white border border-[#E2DDD6] rounded-xl overflow-hidden hover:border-[#d6a758] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,26,122,0.06)] transition-all flex flex-col"
              >
                <div className="p-7 flex-1">
                  <div className="w-11 h-11 rounded-lg bg-[#f5e8cc] flex items-center justify-center mb-5 text-[#0e1a7a] font-semibold text-base">
                    {m.id}
                  </div>
                  <h3 className="text-[#0e1a7a] text-lg font-semibold mb-2.5">{m.name}</h3>
                  <p className="text-[#374151] text-[15px] leading-[1.65]">{m.desc}</p>
                </div>
                {m.screenshot && (
                  <div className="border-t border-[#E2DDD6] overflow-hidden">
                    <Image
                      src={m.screenshot}
                      alt={m.screenshotAlt ?? m.name}
                      width={440}
                      height={900}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-white py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-3">Who this is for</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
            You&apos;re in the classroom. This is in your hand.
          </h2>
          <div className="space-y-5">
            <p className="text-[17px] text-[#374151] leading-[1.8]">
              New guides still building fluency with the full scope and sequence. Guides who switched age levels and need to refresh material they haven&apos;t touched in years. Assistants stepping into lead roles. Guides in public Montessori programs who received abbreviated training. Veterans who want a thinking partner for reflective practice.
            </p>
            <p className="text-[17px] text-[#374151] leading-[1.8]">
              The Field Guide is built for people doing the daily work of Montessori education — people who care deeply about children and want to get better at the craft every single day.
            </p>
            <p className="text-[17px] text-[#374151] leading-[1.8]">
              Homeschool families using Montessori materials are welcome too. Community membership gives you environment guidance, observation tools, and support for your child&apos;s learning. Full lesson walkthroughs are available to credentialed guides.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT DEPTH */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-3">Built from real expertise</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              516 lessons. Written by hand. Not scraped from the internet.
            </h2>
            <div className="space-y-5 mb-12">
              <p className="text-[17px] text-[#374151] leading-[1.8]">
                Every lesson in the Field Guide was written by Hannah Richardson for the Montessori Makers Residency, a MACTE-track teacher preparation program. Primary and Elementary. Practical life through peace education. The Great Lessons through the passage to abstraction.
              </p>
              <p className="text-[17px] text-[#374151] leading-[1.8]">
                This is not recycled album content, crowd-sourced tips, or AI-generated filler. It is original, field-tested curriculum authored by someone who has worked inside Montessori schools for over two decades.
              </p>
            </div>
            <div className="flex gap-10 flex-wrap">
              {[
                { num: '516', label: 'Original lessons' },
                { num: '25', label: 'Years in the field' },
                { num: '2', label: 'Levels: Primary & Elementary' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-5xl text-[#0e1a7a] leading-none mb-1" style={serif}>{s.num}</div>
                  <div className="text-xs text-[#64748B] uppercase tracking-[0.1em]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(14,26,122,0.1)] border border-[#E2DDD6] relative h-[540px]">
            <Image
              src="/images/field-guide/lesson-list.png"
              alt="Practical Life — 47 lessons in the Field Guide scope and sequence"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-white py-20 md:py-24 px-6 md:px-10" id="pricing">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
            Two tiers. Choose yours.
          </h2>
          <p className="text-[17px] text-[#374151] leading-relaxed max-w-[640px] mb-12">
            Full lesson access for credentialed guides. Classroom support, crisis protocols, learner strategies, and reflective practice for everyone.
          </p>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {/* Community Member */}
            <div className="bg-white border border-[#E2DDD6] rounded-xl p-8">
              <p className="text-[13px] text-[#d6a758] font-medium uppercase tracking-[0.12em] mb-2">Community Member</p>
              <h3 className="text-[#0e1a7a] text-xl font-semibold mb-4 leading-snug">For educators without a Montessori credential</h3>
              <div className="text-[36px] font-semibold text-[#111827] leading-none mb-1">
                $16<span className="text-base font-normal text-[#64748B]">/month</span>
              </div>
              <p className="text-sm text-[#64748B] mb-5">or $156/year (save $36)</p>
              <ul className="space-y-2 mb-6">
                {communityFeatures.map((f) => (
                  <li key={f} className="text-sm text-[#374151] pl-5 relative leading-snug py-0.5">
                    <span className="absolute left-0 text-[#d6a758] font-semibold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://montessorimarkersfieldguide.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[#0e1a7a] text-sm font-medium px-8 py-3.5 border border-[#E2DDD6] rounded-md hover:border-[#0e1a7a] transition-colors"
              >
                Get started
              </a>
            </div>

            {/* Credentialed Guide */}
            <div className="bg-white border-2 border-[#0e1a7a] rounded-xl p-8 relative">
              <span className="absolute -top-3 left-7 bg-[#0e1a7a] text-white text-[11px] font-medium tracking-[0.08em] uppercase px-3 py-1 rounded">
                Most popular
              </span>
              <p className="text-[13px] text-[#d6a758] font-medium uppercase tracking-[0.12em] mb-2">Credentialed Guide</p>
              <h3 className="text-[#0e1a7a] text-xl font-semibold mb-4 leading-snug">For guides with a Montessori credential</h3>
              <div className="text-[36px] font-semibold text-[#111827] leading-none mb-1">
                $24<span className="text-base font-normal text-[#64748B]">/month per level</span>
              </div>
              <p className="text-sm text-[#64748B] mb-5">
                or $228/year (save ~$60) · Both levels: $38/mo or $360/yr
              </p>
              <ul className="space-y-2 mb-6">
                {credentialedFeatures.map((f) => (
                  <li key={f} className="text-sm text-[#374151] pl-5 relative leading-snug py-0.5">
                    <span className="absolute left-0 text-[#d6a758] font-semibold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://montessorimarkersfieldguide.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#d6a758] text-[#0e1a7a] text-sm font-medium px-8 py-3.5 rounded-md hover:opacity-90 transition-opacity"
              >
                Subscribe now
              </a>
            </div>
          </div>

          <p className="text-center text-[15px] text-[#374151] leading-relaxed max-w-[560px] mx-auto">
            Schools using MMAP can purchase team licenses at volume rates.{' '}
            <Link href="/mmap" className="text-[#0e1a7a] font-medium underline">
              Learn about MMAP
            </Link>
            . Montessori Makers Residency graduates receive 12 months free.
          </p>
        </div>
      </section>

      {/* RESIDENCY CTA */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10 text-center">
        <div className="max-w-[640px] mx-auto">
          <h2 className="text-4xl text-white leading-tight mb-4" style={serif}>
            Ready for the full picture?
          </h2>
          <p className="text-[17px] text-white/65 leading-relaxed mb-8">
            The Field Guide gives you what you need in the moment. The Residency gives you the foundation that makes every moment better. Earn your Primary or Elementary credential through a rigorous, respectful, deeply practical program.
          </p>
          <Link
            href="/residency"
            className="inline-block bg-[#d6a758] text-[#0e1a7a] text-sm px-8 py-3.5 rounded-md font-medium hover:opacity-90 hover:-translate-y-px transition-all"
          >
            Explore the Residency
          </Link>
        </div>
      </section>

      {/* ECOSYSTEM — MMAP connection */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-3">Connected to MMAP</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              Your practice, tracked and visible.
            </h2>
            <p className="text-[17px] text-[#374151] leading-[1.8] mb-6">
              Credentialed guides can connect the Field Guide to MMAP — Montessori Makers Alignment Map — so lessons logged in the app flow directly into the school&apos;s operational record. Leadership sees what&apos;s being delivered. Guides see what&apos;s next.
            </p>
            <Link href="/mmap" className="text-[#0e1a7a] text-sm font-medium underline hover:opacity-70 transition-opacity">
              Learn about MMAP →
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(14,26,122,0.1)] border border-[#E2DDD6] relative h-[540px]">
            <Image
              src="/images/field-guide/mmap-connected.png"
              alt="Field Guide connected to MMAP — school activity log and stats"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* ECOSYSTEM LINKS */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10 text-center border-t border-[#E2DDD6]">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-[#0e1a7a] text-base font-semibold mb-2">Part of the Montessori Makers ecosystem.</h3>
          <p className="text-[15px] text-[#374151] leading-relaxed mb-6">
            The Field Guide connects to the same infrastructure that powers school consulting, leadership formation, hiring, and school operations across Montessori Makers Group.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            {ecoLinks.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="text-[13px] text-[#0e1a7a] font-medium px-4 py-2 border border-[#E2DDD6] rounded-md hover:border-[#d6a758] hover:bg-[#f5e8cc] transition-all"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
