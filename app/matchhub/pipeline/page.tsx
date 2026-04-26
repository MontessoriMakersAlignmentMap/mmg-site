import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'

const serif = { fontFamily: 'var(--font-heading)' }

export const metadata = {
  title: 'Prepared Here. Placed Here. | MMG Pipeline',
  description:
    'MMR graduates have priority access to MatchHub placement. Schools posting through MatchHub can filter for MMG-prepared candidates. The connection is intentional.',
}

export default function PipelinePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="grain bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
            MatchHub · The MMG Pipeline
          </p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            Prepared Here. Placed Here.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
            MMG trains teachers through the Residency and places them through MatchHub. Those two
            things are connected on purpose. This page explains how.
          </p>
        </div>
      </section>

      {/* ── THE CONNECTION ────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              The Connection
            </p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              The connection between preparation and placement is intentional and designed.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-[#374151] text-base leading-relaxed">
              <p>
                Most Montessori hiring problems are not credential problems. They are alignment
                problems. A school hires someone with a diploma who does not understand the
                community. A graduate with real preparation lands in a school that does not
                support it. The preparation and the placement have nothing to do with each other.
              </p>
              <p>
                MMG built the pipeline specifically to close that gap. MMR prepares educators with
                rigorous, equity-centered training. MatchHub places them in schools that know what
                that preparation means and are ready to support it. The two systems are designed to
                talk to each other.
              </p>
              <p>
                This is not a referral partnership. It is a single ecosystem with a consistent
                standard running through it.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOR GRADUATES ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <div className="w-1 h-10 bg-[#d6a758] mb-8" />
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              For MMR Graduates
            </p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Priority access to placement.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              MMR graduates are not just added to the MatchHub pool. They enter with a verified
              MMG preparation flag attached to their profile, which signals to schools that their
              training meets a specific standard: equity-integrated curriculum, paid practicum,
              full-scope lesson preparation, and a credential earned through real practice.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-8">
              Schools that know what MMR means will find you. Schools that are ready to hire
              someone who will challenge them to be better will find you. That access is a program
              benefit.
            </p>
            <div className="space-y-3">
              {[
                'Your MMG preparation is visible to schools on MatchHub',
                'Priority profile status in the talent pool',
                'Matched to schools that have opted into MMG-aligned hiring',
                'Direct pathway to Strategic Search for leadership placements',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                  <span className="text-[#d6a758] flex-shrink-0 mt-0.5 font-bold">+</span>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/residency"
                className="bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#162270] transition-colors inline-block"
              >
                Learn about the Residency
              </Link>
            </div>
          </FadeIn>

          {/* ── FOR SCHOOLS ─────────────────────────────────────────────────── */}
          <FadeIn delay={0.12}>
            <div className="w-1 h-10 bg-[#0e1a7a] mb-8" />
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              For Schools
            </p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Filter for candidates who were prepared in alignment.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              When you post through MatchHub, you can filter your search to surface candidates who
              completed MMR. That flag means something specific: the candidate studied a
              540-lesson curriculum with an equity aim built into every lesson, completed a paid
              practicum in a partner school, and graduated from a program that took the work
              seriously enough to make it accessible.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-8">
              You are not sorting by credentials alone. You are sorting by preparation standard.
              Those are different things.
            </p>
            <div className="space-y-3">
              {[
                'Filter the talent pool by MMG-prepared candidates',
                'Know exactly what their preparation included',
                'Hire someone whose training aligns with your organizational values',
                'Connect with a candidate who understands justice-centered Montessori',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                  <span className="text-[#d6a758] flex-shrink-0 mt-0.5 font-bold">+</span>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="/matchhub"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block"
              >
                Post Through MatchHub
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── THE STANDARD ──────────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
                What the Standard Means
              </p>
              <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
                MMG preparation is not a checkbox. It is a specific thing.
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    label: 'Equity-integrated curriculum',
                    desc: 'Every lesson in MMR has an equity aim and a neurodivergence section as standard structure. Not a module. Not a supplement. Built in.',
                  },
                  {
                    label: 'Paid practicum',
                    desc: 'Residents are placed in partner schools as paid guides or assistant guides. They learn in classrooms that treat them as professionals.',
                  },
                  {
                    label: 'Justice-centered preparation',
                    desc: 'The reading list includes Hammond, Love, Derman-Sparks, Delpit, and Dunbar-Ortiz because they are essential to Montessori preparation, not supplementary to it.',
                  },
                  {
                    label: 'Full-scope readiness',
                    desc: 'A 540-lesson curriculum covering every strand, plus behavior support, structured literacy, and a cross-plane bridge between Primary and Elementary.',
                  },
                ].map((item) => (
                  <div key={item.label} className="bg-white border border-[#E2DDD6] p-7">
                    <p className="text-[#0e1a7a] font-semibold text-base mb-3" style={serif}>
                      {item.label}
                    </p>
                    <p className="text-[#374151] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4">
              Start Here
            </p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-3" style={serif}>
              Ready to enter the pipeline from either end?
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Educators: apply to the Residency. Schools: post through MatchHub and filter for
              MMG-prepared candidates.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link
              href="/residency/apply"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
            >
              Apply to MMR
            </Link>
            <Link
              href="/matchhub/post-job"
              className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors text-center"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
