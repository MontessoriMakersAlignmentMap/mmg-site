import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const STRIPE = {
  singleJob: 'https://buy.stripe.com/9B63cxgmA1uEgbl2tj2cg0g',
  schoolUnlimited: 'https://buy.stripe.com/00w5kF6M01uEbV58RH2cg0h',
  pro: 'https://buy.stripe.com/bJecN7ees8X61grc3T2cg0i',
}

export default function MatchHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          <div className="max-w-2xl flex-1">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Montessori Makers MatchHub
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              The Montessori Hiring Infrastructure—connected to leadership, systems, and long-term sustainability.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Montessori hiring is relational, philosophical, and mission-sensitive. Most hiring failures in Montessori aren&apos;t about credentials—they&apos;re about alignment. MatchHub is built to find it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
>
  Book a Consultation
</a>
              <Link href="/matchhub/strategic-search" className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center">
                Explore Strategic Search
              </Link>
            </div>
          </div>
          {/* Hero logo — right column */}
          <div className="hidden md:flex items-center justify-end flex-shrink-0">
            <Logo name="matchhub" heroWidth={380} heroHeight={380} />
          </div>
        </div>
      </section>

      {/* Audience routing */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div id="schools" className="bg-white border border-[#E2DDD6] p-10">
            <div className="w-1 h-8 bg-[#d6a758] mb-6" />
            <h2 className="text-2xl text-[#0e1a7a] font-semibold mb-4" style={serif}>
              For Schools
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              Montessori hiring requires more than a job board. MatchHub gives you access to
              a curated pool of trained guides and leaders—filtered for philosophy, alignment,
              and long-term fit.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'Post roles with clarity and reach aligned guides',
                'Browse a curated talent pool',
                'Engage strategic search for complex or leadership hires',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                  <span className="text-[#8A6014] flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/matchhub/post-job" className="text-[#0e1a7a] text-sm font-medium tracking-wide hover:underline">
                Post a Job →
              </Link>
              <Link href="/matchhub/talent" className="text-[#0e1a7a] text-sm font-medium tracking-wide hover:underline">
                Browse Talent →
              </Link>
            </div>
          </div>

          <div id="guides" className="bg-white border border-[#E2DDD6] p-10">
            <div className="w-1 h-8 bg-[#0e1a7a] mb-6" />
            <h2 className="text-2xl text-[#0e1a7a] font-semibold mb-4" style={serif}>
              For Guides
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              Find schools that actually understand Montessori—and are looking for someone
              who does too. Submit a free profile and get matched to roles that fit your
              training, philosophy, and goals.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'Free profile submission',
                'Get in front of schools actively hiring',
                'Get matched through Strategic Search for leadership roles',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                  <span className="text-[#0e1a7a] flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <div>
              <Link
                href="/matchhub/submit-profile"
                className="text-[#0e1a7a] text-sm font-medium tracking-wide hover:underline"
              >
                Submit your profile →
              </Link>
              <p className="text-[#64748B] text-xs mt-2">
                Profiles are reviewed before being added to the MatchHub pool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service tiers */}
      <section id="tiers" className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Service Tiers</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Three ways to hire well.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              From self-serve posting to a fully-supported leadership search. Choose the
              level of support that matches the stakes of the role.
            </p>
          </div>

          {/* Strategic Search — dominant full-width block */}
          <div id="strategic-search" className="bg-[#0e1a7a] p-10 md:p-14 mb-0">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4">The Primary Offering</p>
                <h3 className="text-3xl md:text-4xl text-white mb-3" style={serif}>
                  Strategic Search
                </h3>
                <p className="text-[#d6a758] text-xs tracking-[0.15em] uppercase font-medium mb-3">
                  Retained, Hannah-led
                </p>
                <p className="text-slate-400 text-sm">Custom engagement</p>
              </div>
              <div>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                  Some roles require more than visibility. They require clarity, discretion, and structured leadership. Strategic Search is a retained engagement for headship, director, and senior leadership placements.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    'Hannah-led search process',
                    'Role scoping and position clarity',
                    'Philosophy-aligned candidate development',
                    'Structured selection support',
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white">
                      <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
>
  Book a Consultation
</a>
                  <Link href="/matchhub/strategic-search" className="text-white text-sm underline underline-offset-4 hover:text-[#d6a758] transition-colors py-4">
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Self-serve plans label */}
          <p className="text-[#64748B] text-xs tracking-[0.2em] uppercase mt-10 mb-6">Self-serve posting plans</p>

          {/* 3-col grid: Single, Unlimited, Pro */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Single Job Post */}
            <div className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-5">
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-[#64748B] mb-1">One-time</p>
                <h3 className="text-[#0e1a7a] font-semibold text-xl" style={serif}>Single Job Post</h3>
                <p className="text-[#0e1a7a] text-2xl font-bold mt-2" style={serif}>$49</p>
                <p className="text-[#64748B] text-xs">per 30-day listing</p>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed flex-1">
                Post one role and reach the full MatchHub talent pool. Add featured placement or social promotion as needed.
              </p>
              <ul className="space-y-2">
                {['Single listing, 30 days', 'Montessori-filtered pool', 'Direct candidate contact'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={STRIPE.singleJob}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0e1a7a] text-white text-xs px-4 py-3 tracking-wide hover:bg-[#162270] transition-colors text-center font-medium mt-auto"
              >
                Post a Job →
              </a>
            </div>

            {/* School Unlimited */}
            <div className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-5">
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-[#64748B] mb-1">Annual plan</p>
                <h3 className="text-[#0e1a7a] font-semibold text-xl" style={serif}>School Unlimited</h3>
                <p className="text-[#0e1a7a] text-2xl font-bold mt-2" style={serif}>$299</p>
                <p className="text-[#64748B] text-xs">per year</p>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed flex-1">
                Unlimited job posts with priority visibility all year. Right for schools with regular or seasonal hiring needs.
              </p>
              <ul className="space-y-2">
                {['Unlimited job postings', 'Priority visibility', 'Optional featured & social add-ons'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={STRIPE.schoolUnlimited}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0e1a7a] text-white text-xs px-4 py-3 tracking-wide hover:bg-[#162270] transition-colors text-center font-medium mt-auto"
              >
                Get Unlimited Posting →
              </a>
            </div>

            {/* MatchHub Pro */}
            <div className="bg-white border border-[#d6a758] shadow-md p-8 flex flex-col gap-5">
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-[#d6a758] font-semibold mb-1">Best value</p>
                <h3 className="text-[#0e1a7a] font-semibold text-xl" style={serif}>MatchHub Pro</h3>
                <p className="text-[#0e1a7a] text-2xl font-bold mt-2" style={serif}>$499</p>
                <p className="text-[#64748B] text-xs">per year</p>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed flex-1">
                Unlimited posts with automatic featured placement and social media promotion on every role. No add-ons needed.
              </p>
              <ul className="space-y-2">
                {[
                  'Unlimited job postings',
                  'Auto featured placement — every job',
                  'Auto social promotion — every job',
                  'Priority visibility on the platform',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                    <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={STRIPE.pro}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-xs px-4 py-3 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium mt-auto"
              >
                Upgrade to Pro →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Our Approach</p>
          <h2 className="text-4xl md:text-5xl text-white leading-tight mb-8" style={serif}>
            We match the right people—not just the closest résumé.
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-6">
            Montessori schools fail at hiring not because they don&apos;t care—but because
            they&apos;re using tools and frameworks designed for traditional schools.
            MatchHub is built on real understanding of what Montessori culture fit actually means.
          </p>
          <p className="text-[#94A3B8] text-lg leading-relaxed">
            Every search starts with clarity about the role, the school, and what alignment
            actually looks like for this position—not just who has the right credential.
          </p>
        </div>
      </section>

      {/* When hiring reveals something deeper */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Pattern</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              Hiring often surfaces what advisory addresses.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              The search for the right head of school reveals a board that can&apos;t articulate what they&apos;re looking for. The struggle to find a curriculum director exposes that no one has defined what Montessori fidelity means in this school. A leadership hire that doesn&apos;t stick points to a culture that wasn&apos;t ready to receive them.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              These aren&apos;t hiring problems. They&apos;re organizational problems that showed up during hiring. Advisory exists for exactly this.
            </p>
          </div>
          <div className="space-y-5">
            {/* Advisory card */}
            <div className="bg-white border border-[#E2DDD6] p-7 space-y-4">
              <h3 className="text-[#0e1a7a] font-semibold text-lg" style={serif}>Montessori Makers Advisory</h3>
              <p className="text-[#374151] text-sm leading-relaxed">
                Organizational design, leadership support, and strategic partnership for schools navigating complexity.
              </p>
              <Link href="/advisory" className="text-[#0e1a7a] text-sm font-medium tracking-wide hover:underline">
                Explore Advisory →
              </Link>
            </div>
            {/* CTA card */}
            <div className="bg-[#0e1a7a] p-7 space-y-4">
              <p className="text-white font-semibold text-lg" style={serif}>Start with a conversation.</p>
              <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="block bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
>
  Book a Consultation
</a>
              <p className="text-[#94A3B8] text-xs leading-relaxed">
                30 minutes. No pitch. A real conversation about where your school is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring and development work together */}
      <section className="bg-[#F2EDE6] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Workshops &amp; Speaking</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              The best hire is only the beginning.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-8">
              Bringing in a new leader or guide is one part of the work. Building the culture, communication, and shared practices that make them effective is another. Schools often combine a strategic search with professional development programming—for the incoming hire, for the team receiving them, or for the leadership structure around them.
            </p>
            <Link href="/advisory/workshops-speaking" className="text-[#0e1a7a] text-sm font-medium underline underline-offset-4 hover:text-[#162270] transition-colors">
              Explore Workshops &amp; Speaking →
            </Link>
          </div>
          <div className="bg-white border border-[#E2DDD6] p-8">
            <h3 className="text-[#0e1a7a] font-semibold text-lg mb-6" style={serif}>Common combinations</h3>
            <ul className="space-y-4">
              {[
                'Executive search + leadership onboarding workshop',
                'Leadership hire + adult culture professional development',
                'Guide placement + Montessori 101 for new staff cohort',
                'Full search + communication strategy engagement',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Ready to Start</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              The right hire changes everything.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Whether you need a full retained search or want to understand which level of support is right, we start with a conversation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap"
>
  Book a Consultation
</a>
            <Link href="/matchhub/strategic-search" className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap">
              Explore Strategic Search →
            </Link>
          </div>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}
