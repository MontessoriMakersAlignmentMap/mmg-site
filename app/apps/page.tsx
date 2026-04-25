import Link from 'next/link'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import { Logo } from '@/components/Logo'

const serif: CSSProperties = { fontFamily: 'var(--font-heading)' }

const fieldGuideFeatures = [
  '516 lesson walkthroughs — Primary & Elementary',
  'Crisis support and de-escalation protocols',
  'Neurodivergent learner strategies',
  'Embedded reflective coaching',
  'Syncs observation and lesson data to MMAP',
]

const meridianFeatures = [
  'Navigate: protocols for every hard conversation',
  'Build: systems for salary, hiring, onboarding, PD',
  'Culture: pulse checks, team health, repair plans',
  'Coach: embedded leadership reflective practice',
  'MMAP integration for leadership documentation',
]

const familyFeatures = [
  'Five question pathways — filtered for your child\'s exact age',
  'Observation journal with pattern detection',
  'Weekly digest — what you\'ve seen, what to try',
  'Practice guides for environment, transitions, behavior',
  'Full article library from Nido through high school',
]

export default function AppsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-[#0e1a7a] pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-10 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 40% 50%, rgba(214,167,88,0.06) 0%, transparent 55%)',
          }}
        />
        <div className="max-w-[680px] mx-auto relative z-10">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-4">
            Montessori Makers Apps
          </p>
          <h1
            className="text-white leading-tight mb-5"
            style={{ ...serif, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 500 }}
          >
            Three apps. Built for the people doing the work.
          </h1>
          <p className="text-[17px] text-white/75 leading-[1.7]">
            For the parent at home. For the guide in the classroom. For the leader running the school.
            Each one built around what that person actually needs.
          </p>
        </div>
      </section>

      {/* APP CARDS */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Family Companion — full width, featured */}
          <div className="bg-white border border-[#E2DDD6] overflow-hidden">
            <div className="bg-[#0e1a7a] px-8 py-5 flex items-center justify-between">
              <div>
                <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase font-semibold mb-0.5">New</p>
                <p className="text-white text-base font-semibold tracking-wide">Family Companion</p>
              </div>
              <p className="text-white/40 text-xs tracking-wide">For Montessori parents</p>
            </div>
            <div className="p-8 md:p-10 grid md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-[#374151] text-base leading-relaxed mb-5">
                  The Montessori friend in your pocket. Built around the five questions every Montessori
                  parent actually has — is my child learning, are they on track, what happens in the
                  classroom, will they be OK when they leave, am I supporting them right at home.
                </p>
                <ul className="space-y-2 mb-8">
                  {familyFeatures.map((f) => (
                    <li key={f} className="text-[14px] text-[#374151] pl-5 relative leading-snug py-0.5">
                      <span className="absolute left-0 text-[#d6a758] font-semibold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-[#64748B] text-sm mb-5">$12/month · $99/year</p>
                <Link
                  href="/family-companion"
                  className="inline-block bg-[#d6a758] text-white text-sm font-medium px-8 py-3.5 hover:bg-[#c09240] transition-colors"
                >
                  Learn about Family Companion →
                </Link>
              </div>
              {/* Phone screenshots */}
              <div className="flex gap-3 items-end justify-center">
                {[
                  { src: '/images/family-companion/07-onboarding.png', w: 120, offset: 0, opacity: 1 },
                  { src: '/images/family-companion/01-home.png',       w: 130, offset: -16, opacity: 0.9 },
                  { src: '/images/family-companion/04-journal.png',    w: 110, offset: -8, opacity: 0.7 },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden border border-[#E2DDD6] shadow-sm flex-shrink-0"
                    style={{ width: s.w, transform: `translateY(${s.offset}px)`, opacity: s.opacity }}
                  >
                    <Image
                      src={s.src}
                      alt="Family Companion screenshot"
                      width={260}
                      height={520}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Field Guide + Leadership Meridian */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Field Guide */}
            <div className="bg-white border border-[#E2DDD6] overflow-hidden flex flex-col">
              <div className="bg-[#0e1a7a] px-8 py-7 flex items-center">
                <Logo name="field-guide" heroWidth={180} heroHeight={40} />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-[#d6a758] text-[11px] tracking-[0.18em] uppercase font-medium mb-2">
                  For classroom practitioners
                </p>
                <h2 className="text-[#0e1a7a] text-2xl font-semibold mb-3 leading-snug" style={serif}>
                  Field Guide
                </h2>
                <p className="text-[15px] text-[#374151] leading-[1.7] mb-6">
                  Lesson walkthroughs, crisis protocols, learner strategies, and embedded reflective
                  coaching. Built for the guide in the classroom — whether they&apos;re brand new or
                  twenty years in.
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {fieldGuideFeatures.map((f) => (
                    <li key={f} className="text-[14px] text-[#374151] pl-5 relative leading-snug py-0.5">
                      <span className="absolute left-0 text-[#d6a758] font-semibold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-[#E2DDD6] pt-6">
                  <p className="text-[#64748B] text-sm mb-4">
                    From $16/month per level · Primary or Elementary
                  </p>
                  <Link
                    href="/field-guide"
                    className="block text-center bg-[#0e1a7a] text-white text-sm font-medium px-6 py-3 hover:bg-[#162270] transition-colors"
                  >
                    Learn about Field Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* Leadership Meridian */}
            <div className="bg-white border border-[#E2DDD6] overflow-hidden flex flex-col">
              <div className="bg-[#0e1a7a] px-8 py-7 flex items-center">
                <Logo name="leadership-meridian" heroWidth={180} heroHeight={40} />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-[#d6a758] text-[11px] tracking-[0.18em] uppercase font-medium mb-2">
                  For school leaders
                </p>
                <h2 className="text-[#0e1a7a] text-2xl font-semibold mb-3 leading-snug" style={serif}>
                  Leadership Meridian
                </h2>
                <p className="text-[15px] text-[#374151] leading-[1.7] mb-6">
                  Navigate hard conversations, build systems, monitor adult culture, and coach
                  yourself. Built for the head of school carrying the weight of every decision alone.
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {meridianFeatures.map((f) => (
                    <li key={f} className="text-[14px] text-[#374151] pl-5 relative leading-snug py-0.5">
                      <span className="absolute left-0 text-[#d6a758] font-semibold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-[#E2DDD6] pt-6">
                  <p className="text-[#64748B] text-sm mb-4">$79/month · or $790/year (save $158)</p>
                  <Link
                    href="/leadership-meridian"
                    className="block text-center bg-[#0e1a7a] text-white text-sm font-medium px-6 py-3 hover:bg-[#162270] transition-colors"
                  >
                    Learn about Leadership Meridian
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MMAP CONNECTION */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10 border-t border-[#E2DDD6] text-center">
        <div className="max-w-[600px] mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-3">
            Connected to the ecosystem
          </p>
          <p className="text-[17px] text-[#374151] leading-[1.8]">
            The guide app and leader app sync with{' '}
            <Link href="/mmap" className="text-[#0e1a7a] font-medium underline">MMAP</Link>
            {' '}— observation data, lesson logs, and leadership documentation all in one place.
            Family Companion brings parents into the same picture.
          </p>
        </div>
      </section>
    </main>
  )
}
