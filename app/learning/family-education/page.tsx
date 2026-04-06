import Link from 'next/link'
import LearningNav from '@/components/LearningNav'

const serif = { fontFamily: 'var(--font-heading)' }

const BUNDLE_LINK = 'https://buy.stripe.com/eVqdRbgmAgpy9MX4Br2cg14'

const sessions = [
  {
    number: '01',
    title: 'Welcome to Montessori',
    subtitle: 'What this education actually is and what it asks of you',
    link: 'https://buy.stripe.com/eVq4gBgmA5KU1grd7X2cg15',
  },
  {
    number: '02',
    title: 'The Three-Year Cycle',
    subtitle: 'Why three years in the same classroom changes everything',
    link: 'https://buy.stripe.com/7sY28t8U83CM8ITc3T2cg16',
  },
  {
    number: '03',
    title: 'Independence Is the Goal',
    subtitle: 'Not obedience. Not compliance. Purpose and confidence.',
    link: 'https://buy.stripe.com/aFa28t1rGa1a2kvd7X2cg1e',
  },
  {
    number: '04',
    title: 'How Children Learn in Montessori',
    subtitle: 'Concrete to abstract. Hands to mind. Always in that order.',
    link: 'https://buy.stripe.com/fZu5kF7Q4b5e5wH2tj2cg17',
  },
  {
    number: '05',
    title: 'Discipline, Freedom, and Responsibility',
    subtitle: "What we actually mean when we say we don't do punishment",
    link: 'https://buy.stripe.com/3cIdRbgmA2yIaR18RH2cg18',
  },
  {
    number: '06',
    title: 'Supporting Your Child at Home',
    subtitle: 'You do not need to recreate the classroom. You need to respect the child.',
    link: 'https://buy.stripe.com/00weVfb2g7T27EP5Fv2cg19',
  },
  {
    number: '07',
    title: 'Your Child's Social and Emotional World',
    subtitle: 'Friendship, conflict, and the slow work of becoming a person',
    link: 'https://buy.stripe.com/fZu28t2vKflubV52tj2cg1a',
  },
  {
    number: '08',
    title: 'Every Family Belongs Here',
    subtitle: 'Equity is not a program. It is how we practice.',
    link: 'https://buy.stripe.com/cNi4gB1rGddm4sD3xn2cg1b',
  },
  {
    number: '09',
    title: 'Neurodiversity and Learning Differences',
    subtitle: 'Your child is not broken. The environment might need to change.',
    link: 'https://buy.stripe.com/aFa7sN1rG2yIe3daZP2cg1c',
  },
  {
    number: '10',
    title: 'Transitions and What Comes Next',
    subtitle: 'Change is part of growth. Here is how to do it well.',
    link: 'https://buy.stripe.com/7sY00l5HWflu2kvfg52cg1d',
  },
]

export default function FamilyEducationPage() {
  return (
    <div className="bg-white min-h-screen">
      <LearningNav />

      {/* ── HERO ── */}
      <section className="bg-[#0e1a7a] pt-16 pb-20 md:pt-20 md:pb-28 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-6">
            Family Education Series
          </p>
          <h1
            className="text-4xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
            style={serif}
          >
            A complete family education program. Ready to deliver.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl mb-10">
            Ten sessions. Every topic families ask about. A full presentation deck and a branded
            agenda handout for each one. Written by a Montessori educator with 25 years of
            experience across independent, public, charter, and justice-centered schools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={BUNDLE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium"
            >
              Get the Complete Bundle — $497
            </a>
            <a
              href="#sessions"
              className="border border-white/30 text-white text-[13px] px-8 py-4 tracking-[0.07em] hover:border-white/60 hover:bg-white/5 transition-colors text-center"
            >
              Browse Individual Sessions
            </a>
          </div>
        </div>
      </section>

      {/* ── BUNDLE CTA ── */}
      <section className="bg-[#f5e8cc] py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            <div className="flex-1">
              <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-4">
                Recommended
              </p>
              <h2
                className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight tracking-tight mb-4"
                style={serif}
              >
                Family Education Series, Complete Bundle
              </h2>
              <p className="text-[#374151] text-base leading-relaxed mb-4 max-w-xl">
                A complete, ready-to-deliver 10-session family education program for Montessori
                schools. Covers orientation, the three-year cycle, independence, how children
                learn, discipline, home support, social-emotional development, equity,
                neurodiversity, and transitions. Every session includes a full presentation deck
                and a branded one-page agenda handout that schools print and give to families at
                the door. Sequenced intentionally and written by a Montessori educator with 25
                years of experience across independent, public, charter, and justice-centered
                schools. Buy once, use every year.
              </p>
              <ul className="text-[#374151] text-sm space-y-1.5 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#d6a758] mt-0.5">—</span>
                  10 full presentation decks (PDF)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d6a758] mt-0.5">—</span>
                  10 branded agenda handouts (PDF) — print and hand out at the door
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d6a758] mt-0.5">—</span>
                  Intentional sequence from orientation through transitions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d6a758] mt-0.5">—</span>
                  Buy once, use every year
                </li>
              </ul>
              <div className="flex items-center gap-6">
                <a
                  href={BUNDLE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0e1a7a] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#162394] transition-colors font-medium"
                >
                  Buy Complete Bundle — $497
                </a>
                <p className="text-[#8A6014] text-xs">
                  Saves $173 vs. buying all 10 individually
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT EACH SESSION INCLUDES ── */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl md:text-3xl text-[#0e1a7a] tracking-tight mb-10"
            style={serif}
          >
            What every session includes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-[#E2DDD6] p-8">
              <p className="text-[#d6a758] text-[11px] tracking-[0.18em] uppercase mb-3">
                Presentation Deck
              </p>
              <p className="text-[#374151] text-sm leading-relaxed">
                A full slide deck built to be delivered in a 60–90 minute family session. Covers
                the core concepts, Montessori context, discussion prompts, and take-home
                thinking. PDF from Canva — easy to present as-is or adapt to your school.
              </p>
            </div>
            <div className="border border-[#E2DDD6] p-8">
              <p className="text-[#d6a758] text-[11px] tracking-[0.18em] uppercase mb-3">
                Agenda Handout
              </p>
              <p className="text-[#374151] text-sm leading-relaxed">
                A branded one-page handout designed to be printed and handed to families as they
                walk in. Includes the session title, timed agenda, discussion prompts, and a
                "Try This at Home" action item. MMG-branded and ready to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SESSION LIST ── */}
      <section id="sessions" className="bg-[#FAF9F7] py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-4">
              Individual Sessions — $67 each
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight tracking-tight mb-4"
              style={serif}
            >
              Ten sessions. One deliberate sequence.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed max-w-xl">
              Sessions 1–4 build foundational understanding. Session 5 is the most requested
              topic and lands mid-series on purpose. Sessions 6–7 move into home life and
              relationships. Session 8 is the equity session — it goes here because trust has
              been built. Session 9 addresses neurodiversity after belonging has been
              established. Session 10 closes the year.
            </p>
          </div>

          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.number}
                className="bg-white border border-[#E2DDD6] flex items-center gap-6 px-6 py-5 hover:border-[#0e1a7a]/30 transition-colors group"
              >
                <span
                  className="text-[#d6a758] text-sm font-medium tabular-nums flex-shrink-0 w-6"
                  style={serif}
                >
                  {session.number}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[#0e1a7a] text-base font-medium leading-snug"
                    style={serif}
                  >
                    {session.title}
                  </p>
                  <p className="text-[#64748B] text-sm mt-0.5 leading-snug">
                    {session.subtitle}
                  </p>
                </div>
                <a
                  href={session.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-[#0e1a7a] text-[11px] tracking-[0.08em] font-medium border border-[#0e1a7a]/20 px-4 py-2 hover:bg-[#0e1a7a] hover:text-white hover:border-[#0e1a7a] transition-colors opacity-0 group-hover:opacity-100"
                >
                  Buy — $67
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-[#E2DDD6] flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={BUNDLE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0e1a7a] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#162394] transition-colors font-medium text-center"
            >
              Get All 10 — Complete Bundle $497
            </a>
            <p className="text-[#64748B] text-sm">Saves $173 vs. buying individually</p>
          </div>
        </div>
      </section>

      {/* ── BOTTOM NAV ── */}
      <section className="bg-[#0e1a7a] py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-white/60 text-sm">
            Part of the{' '}
            <Link href="/learning" className="text-white hover:text-[#d6a758] transition-colors">
              MMG Learning collection
            </Link>
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { label: 'Courses', href: '/learning/courses' },
              { label: 'Origins Series', href: '/learning/origins' },
              { label: 'Timelines', href: '/learning/timelines' },
              { label: 'Maps', href: '/learning/maps' },
              { label: 'Free Resources', href: '/learning/free-resources' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
