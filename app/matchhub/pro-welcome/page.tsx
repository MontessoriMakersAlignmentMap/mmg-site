import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const includes = [
  'Full candidate profiles — complete summaries and experience detail',
  'Introduction requests for any educator in the pool',
  'Unlimited job posts on MatchHub',
  'Auto featured placement on every role',
  'Social promotion for each listing',
]

export default function ProWelcomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              MatchHub Pro — Active
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              You&rsquo;re in. Welcome to Pro.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Your subscription is active. You now have full access to every profile in the
              MatchHub talent pool — complete summaries, experience detail, and direct
              introduction requests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/matchhub/talent"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
              >
                Browse the Talent Pool →
              </Link>
              <Link
                href="/matchhub/post-job"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Post a Role
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What You Have Access To</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Everything in Pro, starting now.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              A confirmation email is on its way. To unlock your access in any browser,
              visit the talent pool and enter the email address you used to subscribe.
            </p>
          </div>
          <div className="max-w-2xl space-y-0">
            {includes.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-6 py-5 border-b border-[#E2DDD6] last:border-0"
              >
                <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                <p className="text-[#374151] text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activate access callout */}
      <section className="bg-[#F2EDE6] py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-[#E2DDD6] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Using a New Browser?</p>
              <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
                Enter your email to activate Pro access.
              </h2>
              <p className="text-[#374151] text-base leading-relaxed">
                Pro access is tied to your email. On any device or browser, visit the
                talent pool, click &ldquo;I already have Pro&rdquo;, and enter the email
                address you used when you subscribed.
              </p>
            </div>
            <Link
              href="/matchhub/talent"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors whitespace-nowrap flex-shrink-0"
            >
              Go to Talent Pool →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
