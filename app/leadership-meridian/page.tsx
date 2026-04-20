import Link from 'next/link'
import Image from 'next/image'
import type { CSSProperties } from 'react'

const serif: CSSProperties = { fontFamily: 'var(--font-heading)' }

const features = [
  'Navigate: 10+ leadership situation protocols with exact language',
  'Build: guided systems design for salary, hiring, onboarding, PD, and more',
  'Culture: pulse checks, team health, recognition, repair plans',
  'Coach: embedded reflective practice that pushes your thinking',
  'MMAP integration for leadership documentation',
  'Unlimited interactions',
]

const ecosystemLinks = [
  { name: 'Advisory',           href: '/advisory' },
  { name: 'Institute',          href: '/institute' },
  { name: 'MMAP',               href: '/mmap' },
  { name: 'MatchHub',           href: '/matchhub' },
  { name: 'Residency',          href: '/residency' },
  { name: 'Field Guide',        href: '/field-guide' },
  { name: 'Toolbox',            href: '/toolbox' },
  { name: 'Learning',           href: '/learning' },
]

export default function LeadershipMeridianPage() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-[#0a1260] pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-10 relative overflow-hidden text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(214,167,88,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.02) 0%, transparent 40%)',
          }}
        />
        <div className="max-w-[720px] mx-auto relative z-10">
          <div className="inline-block text-[11px] tracking-[2px] uppercase text-[#d6a758] border border-[#d6a758]/30 px-4 py-1.5 rounded-full mb-8 font-medium">
            Part of the Montessori Makers ecosystem
          </div>
          <h1
            className="text-white leading-[1.15] mb-6 tracking-[-0.5px]"
            style={{ ...serif, fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 500 }}
          >
            The hardest part of leading a school isn&apos;t the{' '}
            <em className="text-[#d6a758] italic">pedagogy.</em>
          </h1>
          <p className="text-lg text-white/75 leading-[1.7] max-w-[580px] mx-auto mb-10 font-light">
            It&apos;s the people. The conversations. The systems that don&apos;t exist yet. The
            culture you&apos;re trying to build while holding everything together. Leadership
            Meridian is the strategic partner you don&apos;t have.
          </p>
          <div className="flex gap-4 flex-wrap justify-center mb-16">
            <a
              href="https://montessorimakersleadershipmeridian.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-[#0e1a7a] px-8 py-3.5 text-[15px] font-medium rounded-md hover:opacity-90 hover:-translate-y-px transition-all"
            >
              Start your subscription
            </a>
            <a
              href="#modes"
              className="border border-white/20 text-white px-8 py-3.5 text-[15px] rounded-md hover:border-white/40 transition-colors"
            >
              See how it works
            </a>
          </div>
          {/* Welcome screenshot */}
          <div className="flex justify-center">
            <Image
              src="/images/leadership-meridian/01-welcome.png"
              alt="Leadership Meridian welcome screen"
              width={390}
              height={844}
              className="w-[200px] md:w-[240px] h-auto rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </section>

      {/* FOUR MODES */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10" id="modes">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-3">
            Four modes. Built for how leaders actually work.
          </p>
          <h2
            className="text-white leading-tight mb-4"
            style={{ ...serif, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500 }}
          >
            Navigate the hard parts. Build what&apos;s missing.
          </h2>
          <p className="text-[17px] text-white/75 leading-[1.7] max-w-[640px] mb-20">
            Leadership Meridian meets you in the moment you&apos;re in. Before a hard conversation.
            In the middle of a systems problem. When the culture needs attention. When you need to
            think out loud and nobody&apos;s there to listen.
          </p>

          {/* NAVIGATE */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">
            <div>
              <div className="w-11 h-11 rounded-lg bg-[#d6a758]/15 flex items-center justify-center mb-6 text-[#d6a758] font-semibold text-lg">
                N
              </div>
              <h3 className="text-white text-2xl font-semibold mb-4" style={serif}>Navigate</h3>
              <p className="text-[17px] text-white/75 leading-[1.8]">
                In-the-moment leadership support. A staff member is upset. You need to deliver hard
                feedback. A parent is escalating. Someone needs to be let go. The board is
                overstepping. Grounded protocols with exact language for the first 30 seconds of
                every hard conversation.
              </p>
            </div>
            <div className="flex justify-center md:justify-end gap-4">
              <Image
                src="/images/leadership-meridian/02-navigate.png"
                alt="Navigate mode — what are you facing?"
                width={390}
                height={844}
                className="w-[180px] md:w-[210px] h-auto rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.45)]"
              />
              <Image
                src="/images/leadership-meridian/03-navigate-protocol.png"
                alt="Navigate protocol — step-by-step guidance"
                width={390}
                height={844}
                className="w-[180px] md:w-[210px] h-auto rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.45)] hidden sm:block"
              />
            </div>
          </div>

          {/* BUILD */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <Image
                src="/images/leadership-meridian/04-build.png"
                alt="Build mode — what are you building?"
                width={390}
                height={844}
                className="w-[180px] md:w-[210px] h-auto rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.45)]"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="w-11 h-11 rounded-lg bg-[#d6a758]/15 flex items-center justify-center mb-6 text-[#d6a758] font-semibold text-lg">
                B
              </div>
              <h3 className="text-white text-2xl font-semibold mb-4" style={serif}>Build</h3>
              <p className="text-[17px] text-white/75 leading-[1.8]">
                Proactive systems design. Salary scales, onboarding sequences, meeting rhythms,
                hiring processes, communication structures, PD calendars, retention strategies,
                succession plans. The app walks you through building each one for your specific
                school.
              </p>
            </div>
          </div>

          {/* CULTURE */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">
            <div>
              <div className="w-11 h-11 rounded-lg bg-[#d6a758]/15 flex items-center justify-center mb-6 text-[#d6a758] font-semibold text-lg">
                C
              </div>
              <h3 className="text-white text-2xl font-semibold mb-4" style={serif}>Culture</h3>
              <p className="text-[17px] text-white/75 leading-[1.8]">
                Adult culture health and development. Weekly pulse checks that surface patterns
                before they become crises. Difficult dynamics assessment. Recognition frameworks.
                Team health inventories. Culture repair plans for when things have broken down.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                src="/images/leadership-meridian/05-culture.png"
                alt="Culture mode — how is your culture?"
                width={390}
                height={844}
                className="w-[180px] md:w-[210px] h-auto rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>

          {/* COACH */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <Image
                src="/images/leadership-meridian/06-coach.png"
                alt="Coach mode — where is your thinking?"
                width={390}
                height={844}
                className="w-[180px] md:w-[210px] h-auto rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.45)]"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="w-11 h-11 rounded-lg bg-[#d6a758]/15 flex items-center justify-center mb-6 text-[#d6a758] font-semibold text-lg">
                Co
              </div>
              <h3 className="text-white text-2xl font-semibold mb-4" style={serif}>Coach</h3>
              <p className="text-[17px] text-white/75 leading-[1.8]">
                Your own reflective practice. The thinking partner available at 6am in the parking
                lot or 9pm replaying a conversation. Embedded coaching that pushes on avoidance,
                names patterns, and asks the questions nobody else will ask you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-[#0a1260] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-[720px] mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-3">
            Who this is for
          </p>
          <h2
            className="text-white leading-tight mb-8"
            style={{ ...serif, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500 }}
          >
            You know the Montessori. You need the leadership infrastructure.
          </h2>
          <div className="space-y-5">
            <p className="text-[17px] text-white/75 leading-[1.8]">
              Heads of school carrying the weight of every decision alone. Directors who inherited
              systems that don&apos;t work and don&apos;t have time to rebuild them from scratch.
              Assistant directors stepping into authority they haven&apos;t been prepared for.
              Program coordinators managing people without the tools to do it well. Board chairs
              trying to govern without overstepping.
            </p>
            <p className="text-[17px] text-white/75 leading-[1.8]">
              You became a leader because you cared about children, communities, and the mission.
              Nobody taught you how to build a salary scale, fire someone with dignity, or repair a
              culture after a bad year. This does.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT DEPTH */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-[720px] mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-3">
            Built from real leadership experience
          </p>
          <h2
            className="text-white leading-tight mb-6"
            style={{ ...serif, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500 }}
          >
            $3,700 in frameworks. Now interactive, embedded, and in your hand.
          </h2>
          <div className="space-y-5">
            <p className="text-[17px] text-white/75 leading-[1.8]">
              Every protocol, workflow, and framework in Leadership Meridian comes from the
              Montessori Makers Toolbox and Advisory practice. These are tools that have been used
              in real schools, with real leaders, navigating real challenges. Adult culture
              architecture. Conflict and feedback protocols. Hiring systems. Performance management.
              Board governance. Succession planning.
            </p>
            <p className="text-[17px] text-white/75 leading-[1.8]">
              The Toolbox sells these as static downloads. Leadership Meridian makes them alive:
              contextual to your school, responsive to your situation, and grounded in an
              understanding of the Montessori leadership context. Not generic HR. Not corporate
              platitudes. Real strategy for real schools.
            </p>
          </div>
          <div className="flex gap-10 mt-10 flex-wrap">
            {[
              { num: '10',   label: 'Toolbox frameworks' },
              { num: '300+', label: 'Source documents' },
              { num: '25',   label: 'Years in the field' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-[#d6a758] leading-none mb-1"
                  style={{ ...serif, fontSize: 48, fontWeight: 500 }}
                >
                  {s.num}
                </div>
                <div className="text-white/50 text-[13px] uppercase tracking-[1px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-[#0a1260] py-20 md:py-24 px-6 md:px-10" id="pricing">
        <div className="max-w-[800px] mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-3">
            Pricing
          </p>
          <h2
            className="text-white leading-tight mb-4"
            style={{ ...serif, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500 }}
          >
            One subscription. Full access.
          </h2>
          <p className="text-[17px] text-white/75 leading-[1.7] max-w-[640px] mb-12">
            Everything in Navigate, Build, Culture, and Coach. No tiers, no feature gating. If you
            lead a Montessori school, this is for you.
          </p>

          <div className="max-w-[420px] mb-8">
            <div className="bg-[#1a2a8a] border-2 border-[#d6a758] rounded-xl p-9 relative">
              <span className="absolute -top-3 left-8 bg-[#d6a758] text-[#0e1a7a] text-[11px] font-semibold tracking-[1px] uppercase px-3 py-1 rounded">
                Full access
              </span>
              <p className="text-[13px] text-[#d6a758] font-medium uppercase tracking-[1.5px] mb-2">
                Leadership Meridian
              </p>
              <h3 className="text-white text-[22px] font-semibold mb-4">
                For Montessori school leaders
              </h3>
              <div className="text-[40px] font-semibold text-white leading-none mb-1">
                $79<span className="text-base font-normal text-white/50">/month</span>
              </div>
              <p className="text-sm text-white/50 mb-6">or $790/year (save $158)</p>
              <ul className="space-y-2 mb-7">
                {features.map((f) => (
                  <li key={f} className="text-[14px] text-white/75 pl-5 relative leading-snug py-0.5">
                    <span className="absolute left-0 text-[#d6a758] font-semibold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://montessorimakersleadershipmeridian.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#d6a758] text-[#0e1a7a] text-sm font-medium px-8 py-3.5 rounded-md hover:opacity-90 transition-opacity"
              >
                Subscribe now
              </a>
            </div>
          </div>

          <p className="text-[15px] text-white/75 leading-[1.7] max-w-[560px]">
            Schools using MMAP can bundle Leadership Meridian with the{' '}
            <Link href="/field-guide" className="text-[#d6a758] font-medium underline">
              Montessori Makers Field Guide
            </Link>{' '}
            for team-wide practitioner support at discounted rates.{' '}
            <Link href="/advisory" className="text-[#d6a758] font-medium underline">
              Advisory
            </Link>{' '}
            clients receive access included with their engagement.{' '}
            <Link href="/institute" className="text-[#d6a758] font-medium underline">
              Institute
            </Link>{' '}
            graduates receive 6 months free.
          </p>
        </div>
      </section>

      {/* FIELD GUIDE PAIRING */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10 text-center">
        <div className="max-w-[720px] mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-3">
            Two apps. One ecosystem.
          </p>
          <h2
            className="text-white leading-tight mb-4"
            style={{ ...serif, fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 500 }}
          >
            Field Guide for your team. Meridian for you.
          </h2>
          <p className="text-[17px] text-white/75 leading-[1.7] mb-8">
            The Montessori Makers Field Guide gives your guides lesson support, crisis protocols,
            learner strategies, and reflective practice. Leadership Meridian gives you the
            leadership infrastructure to run the school they work in. Both feed into MMAP. Both
            built from the same 25 years of field expertise.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
            <div className="bg-[#faf8f4] border border-[#e8e4dd] rounded-xl p-7">
              <h4 className="text-[#0e1a7a] text-[15px] font-semibold mb-2">
                Montessori Makers Field Guide
              </h4>
              <p className="text-[13px] text-[#666] leading-[1.6]">
                For classroom practitioners. 516 lesson walkthroughs, crisis support, neurodivergent
                learner strategies, and embedded coaching. From $16/month.
              </p>
            </div>
            <div className="bg-[#1a2a8a] border border-white/10 rounded-xl p-7">
              <h4 className="text-white text-[15px] font-semibold mb-2">Leadership Meridian</h4>
              <p className="text-[13px] text-white/70 leading-[1.6]">
                For school leaders. Navigate hard conversations, build systems, monitor culture, and
                coach yourself through the hardest job in education. $79/month.
              </p>
            </div>
          </div>
          <Link
            href="/field-guide"
            className="inline-block border border-white/20 text-white px-8 py-3.5 text-[15px] rounded-md hover:border-white/40 transition-colors"
          >
            Explore the Field Guide
          </Link>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="bg-[#0a1260] py-16 md:py-20 px-6 md:px-10 text-center">
        <div className="max-w-[720px] mx-auto">
          <h3 className="text-white text-base font-medium mb-2">
            Part of the Montessori Makers ecosystem.
          </h3>
          <p className="text-[15px] text-white/75 leading-[1.7] mb-6">
            Leadership Meridian connects to the same infrastructure that powers school consulting,
            leadership formation, hiring, teacher preparation, and school operations across
            Montessori Makers Group.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            {ecosystemLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] text-white font-medium border border-white/15 px-4 py-2 rounded-md hover:border-[#d6a758] hover:bg-[#d6a758]/10 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
