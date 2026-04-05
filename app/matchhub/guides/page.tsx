import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const features = [
  'Free profile creation — no cost, ever, for any role',
  'Browse open positions at Montessori schools across the country',
  'Filter roles by school type, philosophy, level, and location',
  'Apply directly to schools through the platform',
  'Get matched through Strategic Search when you want guided support',
]

const strategicBenefits = [
  'A personal conversation about your goals, philosophy, and non-negotiables',
  'Hannah personally curates schools that fit — not just roles that are open',
  'Coaching on how to present your philosophy and approach',
  'Confidential support if you\'re making a quiet transition',
  'Follow-through from first conversation to final placement',
]

const roles = [
  { category: 'Leadership', items: ['Head of School / Executive Director', 'Principal / Assistant Principal', 'Assistant Head / Associate Director', 'Program Director'] },
  { category: 'Instruction & Coaching', items: ['Primary Guide (3–6)', 'Elementary Guide (6–12)', 'Infant & Toddler Guide (0–3)', 'Adolescent / Middle School Guide', 'Coach'] },
  { category: 'Operations & Support', items: ['Admissions & Enrollment', 'Administrative & Operations', 'Other'] },
]

export default function FindYourSchoolPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              MatchHub — Find Your School
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Find a school that shares your philosophy.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Whether you&rsquo;re a classroom guide, a school leader, a coach, or an
              operations professional — if you&rsquo;re looking for your place in
              Montessori, MatchHub is built for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/matchhub/submit-profile"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
              >
                Submit Your Profile →
              </Link>
              <Link
                href="/matchhub/open-roles"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                View Open Roles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Who This Is For</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Every role in a Montessori school.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              MatchHub isn&rsquo;t only for classroom guides. It&rsquo;s for anyone who
              wants to build their career inside a Montessori community — regardless of
              the role.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map(({ category, items }) => (
              <div key={category} className="bg-white border border-[#E2DDD6] p-8">
                <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-5">{category}</p>
                <ul className="space-y-3">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                      <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's different */}
      <section className="bg-[#F2EDE6] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What&apos;s Missing</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Most job platforms weren&apos;t built for the way Montessori works.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Generic platforms filter for credentials and location. They don&apos;t
              ask whether a school&apos;s practice matches your philosophy — or whether the
              community you&rsquo;re joining shares what you believe.
            </p>
          </div>
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What&apos;s Different</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              MatchHub is built around philosophy alignment.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Every school on MatchHub has been through a vetting process. When you
              browse open roles here, you&rsquo;re not sifting through listings from
              schools that happen to have the word Montessori in the name — you&rsquo;re
              finding communities that share what you believe.
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What You Get</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Everything you need. Free to join.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Profiles are always free — no subscriptions, no pay-to-apply walls.
              Create your profile, tell your story, and connect with schools that are
              ready to hear it.
            </p>
          </div>
          <div className="max-w-3xl space-y-0">
            {features.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-6 py-5 border-b border-[#E2DDD6] last:border-0"
              >
                <span className="text-[#8A6014] text-xs tracking-[0.15em] uppercase flex-shrink-0 mt-0.5 w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[#374151] text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/matchhub/submit-profile"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors inline-block"
            >
              Submit Your Profile →
            </Link>
          </div>
        </div>
      </section>

      {/* Strategic Search */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Strategic Search — For Candidates</p>
            <h2 className="text-4xl md:text-5xl text-white leading-tight mb-8" style={serif}>
              When you want more than a job board.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-6">
              If you&rsquo;re ready for a meaningful transition — or you&rsquo;re a
              leader looking for the right headship or senior role —
              Strategic Search offers something different. Hannah personally
              facilitates, working with you to find a school that&rsquo;s a genuine
              philosophical and cultural match.
            </p>
            <p className="text-[#94A3B8] text-base leading-relaxed mb-10">
              This is not a resume-forwarding service. It&rsquo;s a relationship-led
              process built on deep knowledge of the Montessori landscape.
            </p>
            <a
              href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block"
            >
              Inquire About Strategic Search →
            </a>
          </div>
          <div className="space-y-0">
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">What Strategic Search includes</p>
            {strategicBenefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4 border-b border-white/10 last:border-0"
              >
                <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                <span className="text-white text-sm leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Searches */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-[#E2DDD6] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Current Searches</p>
              <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
                See what schools are looking for right now.
              </h2>
              <p className="text-[#374151] text-base leading-relaxed">
                Browse open roles from Montessori schools actively running searches
                through MatchHub. Positions range from classroom roles to
                school leadership.
              </p>
            </div>
            <Link
              href="/matchhub/open-roles"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors whitespace-nowrap flex-shrink-0"
            >
              Browse Open Roles →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF9F7] py-16 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Ready to Start</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              Your next school is looking for you, too.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Create your free profile and start connecting with Montessori schools
              that share your values — or inquire about Strategic Search if you want
              Hannah in your corner.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/matchhub/submit-profile"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap"
            >
              Submit Your Profile
            </Link>
            <Link
              href="/matchhub/open-roles"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              View Open Roles →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
