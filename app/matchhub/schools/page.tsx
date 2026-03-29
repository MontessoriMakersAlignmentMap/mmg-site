import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const screenItems = [
  'Montessori training level and recency.',
  'Philosophical alignment — what they believe, not just what they\u2019ve done.',
  'School culture fit and community values.',
  'Leadership readiness for senior roles.',
  'Communication style and conflict approach.',
]

const tiers = [
  {
    name: 'Post & Connect',
    price: 'One-time or subscription',
    description:
      'Post a role and reach Montessori-trained guides actively seeking placements.',
    featured: false,
  },
  {
    name: 'Talent Access',
    price: 'Monthly subscription',
    description:
      'Browse and search the full talent pool. Filter by training, experience, philosophy, level.',
    featured: false,
  },
  {
    name: 'Strategic Search',
    price: 'Custom',
    description:
      'Hannah-led search for headship and senior leadership roles.',
    featured: true,
  },
]

export default function MatchHubSchoolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              MatchHub for Schools
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Hire with intention.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Access a curated pool of Montessori-trained educators and leaders—filtered for
              philosophy, not just credentials. Three tiers of support, from self-serve posting
              to a fully Hannah-led search.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/matchhub/post-job"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
              >
                Post a Role
              </Link>
              <Link
                href="/matchhub/strategic-search"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Explore Strategic Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="bg-[#F2EDE6] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Gap</p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Montessori hiring deserves Montessori tools. Most platforms were built for
              volume, not philosophy — for credentials, not culture fit. The right hire
              requires a different kind of search.
            </p>
          </div>
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Difference</p>
            <p className="text-[#374151] text-lg leading-relaxed">
              MatchHub was built with Montessori culture fit at the center. Every feature exists
              to get the right guide into the right school.
            </p>
          </div>
        </div>
      </section>

      {/* 3 tiers */}
      <section className="bg-[#F2EDE6] py-0 pb-24 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Service Tiers</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Three ways to hire well.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white p-8 flex flex-col gap-4 border ${
                  tier.featured ? 'border-[#d6a758] shadow-md' : 'border-[#E2DDD6]'
                }`}
              >
                {tier.featured && (
                  <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase font-medium">
                    Strategic tier
                  </p>
                )}
                <div>
                  <h3 className="text-[#0e1a7a] font-semibold text-xl mb-1" style={serif}>
                    {tier.name}
                  </h3>
                  <p className="text-[#64748B] text-xs">{tier.price}</p>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed flex-1">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we screen for */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Our Process</p>
            <h2 className="text-4xl md:text-5xl text-white leading-tight" style={serif}>
              What we screen for.
            </h2>
          </div>
          <div className="max-w-3xl space-y-0">
            {screenItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-6 py-5 border-b border-white/10 last:border-0"
              >
                <span className="text-[#d6a758] text-xs tracking-[0.15em] uppercase flex-shrink-0 mt-0.5 w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-white text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Get Started</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              Let&apos;s find your next great hire.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Start with a free consultation to figure out which tier is right for your school
              and your next role.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap"
            >
              Start with a Free Consultation
            </Link>
            <Link
              href="/matchhub/guides"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              See Guide Experience →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
