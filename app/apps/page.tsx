import Link from 'next/link'
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
        <div className="max-w-[640px] mx-auto relative z-10">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-4">
            Montessori Makers Apps
          </p>
          <h1
            className="text-white leading-tight mb-5"
            style={{ ...serif, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 500 }}
          >
            Two apps. Built for the people doing the work.
          </h1>
          <p className="text-[17px] text-white/75 leading-[1.7]">
            One for the guide in the classroom. One for the leader running the school. Both
            grounded in 25 years of Montessori field experience. Both connected to MMAP.
          </p>
        </div>
      </section>

      {/* APP CARDS */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Field Guide */}
          <div className="bg-white border border-[#E2DDD6] rounded-xl overflow-hidden flex flex-col">
            <div className="bg-[#0e1a7a] px-8 py-7 flex items-center">
              <Logo name="field-guide" heroWidth={180} heroHeight={40} />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-[#d6a758] text-[11px] tracking-[0.18em] uppercase font-medium mb-2">
                For classroom practitioners
              </p>
              <h2
                className="text-[#0e1a7a] text-2xl font-semibold mb-3 leading-snug"
                style={serif}
              >
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
                  className="block text-center bg-[#0e1a7a] text-white text-sm font-medium px-6 py-3 rounded-md hover:bg-[#162270] transition-colors"
                >
                  Learn about Field Guide
                </Link>
              </div>
            </div>
          </div>

          {/* Leadership Meridian */}
          <div className="bg-white border border-[#E2DDD6] rounded-xl overflow-hidden flex flex-col">
            <div className="bg-[#0e1a7a] px-8 py-7 flex items-center">
              <Logo name="leadership-meridian" heroWidth={180} heroHeight={40} />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-[#d6a758] text-[11px] tracking-[0.18em] uppercase font-medium mb-2">
                For school leaders
              </p>
              <h2
                className="text-[#0e1a7a] text-2xl font-semibold mb-3 leading-snug"
                style={serif}
              >
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
                  className="block text-center bg-[#0e1a7a] text-white text-sm font-medium px-6 py-3 rounded-md hover:bg-[#162270] transition-colors"
                >
                  Learn about Leadership Meridian
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MMAP CONNECTION */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10 border-t border-[#E2DDD6] text-center">
        <div className="max-w-[560px] mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase font-medium mb-3">
            Connected to MMAP
          </p>
          <p className="text-[17px] text-[#374151] leading-[1.8]">
            Both apps sync with{' '}
            <Link href="/mmap" className="text-[#0e1a7a] font-medium underline">
              MMAP
            </Link>{' '}
            — the Montessori Makers school operating system. Observation data, lesson logs, and
            leadership documentation all live in one place.
          </p>
        </div>
      </section>
    </main>
  )
}
