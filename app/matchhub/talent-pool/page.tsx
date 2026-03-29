import { getActiveTalentProfiles } from '@/lib/db/talent-pool'
import TalentPoolClient from './TalentPoolClient'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default async function TalentPoolPage() {
  const profiles = await getActiveTalentProfiles()

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
            MatchHub · Talent Pool
          </p>
          <h1
            className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
            style={serif}
          >
            Talent Pool
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl mb-10">
            A curated collection of Montessori educators and leaders exploring their next school community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#request-intro"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
            >
              Request an Introduction
            </a>
            <Link
              href="/matchhub/strategic-search"
              className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
            >
              Explore Strategic Search
            </Link>
          </div>
        </div>
      </section>

      {/* Intro text */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What This Is</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Montessori educators in active discernment.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              Every profile in this pool has been personally reviewed and approved by Hannah Richardson.
              These are not job seekers on a generic platform — they are practitioners who have chosen
              to work through Montessori Makers because they care where they land and why.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              Profiles are anonymized intentionally. Schools request an introduction, Hannah facilitates,
              and conversations begin on a mutual basis.
            </p>
          </div>
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">How It Works</p>
            <div className="space-y-0">
              {[
                ['Browse profiles', 'Review anonymized profiles — training, experience level, region, and what makes each candidate distinctive.'],
                ['Request an introduction', 'Identify candidates of interest and submit a brief request. Hannah reviews fit before making any connection.'],
                ['Hannah facilitates', 'If there\'s alignment on both sides, Hannah makes the introduction and supports the early conversation.'],
                ['Placement fee applies', 'A placement fee is due upon hiring a candidate from the Talent Pool. Schools agree to this when requesting an introduction.'],
              ].map(([title, body], i) => (
                <div key={i} className="flex items-start gap-6 py-5 border-b border-[#E2DDD6] last:border-0">
                  <span className="text-[#8A6014] text-xs tracking-[0.15em] uppercase flex-shrink-0 mt-0.5 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-[#0e1a7a] font-medium text-sm mb-1">{title}</p>
                    <p className="text-[#374151] text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What this is / is not */}
      <section className="bg-[#F2EDE6] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">What This Is — And Is Not</p>
            <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight" style={serif}>
              A curated pool. Not a database.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase mb-5">This is</p>
              <div className="space-y-3">
                {[
                  'A select group of candidates Hannah has personally reviewed',
                  'Educators who have opted in and are genuinely in discernment',
                  'A relationship-first process — not resume-forwarding',
                  'An appropriate fit for schools doing mission-aligned hiring',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5 font-bold">✓</span>
                    <p className="text-[#374151] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-5">This is not</p>
              <div className="space-y-3">
                {[
                  'A searchable database of every available Montessori teacher',
                  'A replacement for a full Strategic Search engagement',
                  'A guarantee that the right candidate is currently in the pool',
                  'Free — a placement fee applies when you hire',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#64748B] flex-shrink-0 mt-0.5">—</span>
                    <p className="text-[#374151] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile grid — client component handles filters, modal, intro request form */}
      <TalentPoolClient profiles={profiles} />

      {/* Strategic Search CTA */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-white text-xl font-medium mb-3 leading-snug" style={serif}>
              Need a full search engagement?
            </p>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              If the Talent Pool doesn't surface the right person, or your role requires
              active sourcing and screening, Strategic Search is the next step.
            </p>
          </div>
          <Link
            href="/matchhub/strategic-search"
            className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors whitespace-nowrap font-medium flex-shrink-0"
          >
            Learn About Strategic Search
          </Link>
        </div>
      </section>
    </>
  )
}
