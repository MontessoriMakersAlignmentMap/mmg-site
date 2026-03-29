import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const STRIPE = {
  singleJob: 'https://buy.stripe.com/9B63cxgmA1uEgbl2tj2cg0g',
  schoolUnlimited: 'https://buy.stripe.com/00w5kF6M01uEbV58RH2cg0h',
  pro: 'https://buy.stripe.com/bJecN7ees8X61grc3T2cg0i',
  featured: 'https://buy.stripe.com/8x23cx8U82yI2kvc3T2cg0j',
  socialBoost: 'https://buy.stripe.com/14A4gB4DS3CMaR1ec12cg0k',
}

type AddOn = { label: string; price: string }

type Plan = {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  addOns: AddOn[]
  isPro: boolean
  featured: boolean
  cta: string
}

const schoolPlans: Plan[] = [
  {
    name: 'Single Job Post',
    price: '$49',
    period: 'per 30-day listing',
    description:
      'Post a single role and reach the full MatchHub talent pool. Ideal for schools with an occasional opening and an internal hiring process already in place.',
    features: [
      'Single role listing, active for 30 days',
      'Access to Montessori-filtered talent pool',
      'Direct candidate contact',
      'Standard visibility in search results',
    ],
    addOns: [
      { label: 'Featured Placement', price: '+$59' },
      { label: 'Social Boost', price: '+$79' },
    ],
    isPro: false,
    featured: false,
    cta: 'Post a Role',
  },
  {
    name: 'School Unlimited',
    price: '$299',
    period: 'per year',
    description:
      'Post unlimited roles throughout the year with priority visibility. The right choice for schools with ongoing or seasonal hiring needs.',
    features: [
      'Unlimited job postings',
      'Priority visibility in search results',
      'Direct candidate contact',
      'Access to Montessori-filtered talent pool',
    ],
    addOns: [
      { label: 'Featured Placement', price: '+$59' },
      { label: 'Social Boost', price: '+$79' },
    ],
    isPro: false,
    featured: false,
    cta: 'Get Unlimited Posting',
  },
  {
    name: 'MatchHub Pro',
    price: '$499',
    period: 'per year',
    description:
      'Everything included, automatically. Unlimited posts with featured placement and social media promotion on every role — maximum visibility, zero add-ons.',
    features: [
      'Unlimited job postings',
      'Automatic featured placement on all jobs',
      'Automatic social media promotion for all jobs',
      'Priority visibility on the platform',
    ],
    addOns: [],
    isPro: true,
    featured: true,
    cta: 'Get Pro',
  },
]

const strategicLevels = [
  {
    name: 'Guide / Program Level',
    anchor: '#guide-level',
    description:
      'Lead Guides, Assistant Directors, Curriculum Coordinators, Program Directors. Philosophy vetting and a curated shortlist of 3–5 candidates.',
  },
  {
    name: 'Leadership Level',
    anchor: '#leadership-level',
    description:
      'Directors, Deans, Instructional Coaches. Deeper assessment, broader outreach, and a longer search horizon.',
  },
  {
    name: 'Executive Level',
    anchor: '#executive-level',
    description:
      'Heads of School, Executive Directors. Board partnership, succession context, and the most comprehensive search process we offer.',
  },
]

const faqs = [
  {
    question: "What's included in MatchHub Pro?",
    answer:
      "MatchHub Pro gives you unlimited job posts with automatic featured placement and social media promotion on every role — no add-ons needed, no decisions to make per posting. It also includes priority visibility on the platform. At $499/year, it's designed for schools that hire regularly and want maximum reach without managing individual upgrades.",
  },
  {
    question: "What's the difference between School Unlimited and MatchHub Pro?",
    answer:
      "Both plans include unlimited job postings. The difference is what happens automatically. With School Unlimited, featured placement and social promotion are optional add-ons you can choose per role. With Pro, they're included on every post — no extra cost, no extra steps.",
  },
  {
    question: 'How does Strategic Search pricing work?',
    answer:
      'Strategic Search is a retained engagement priced based on the level of the role and the scope of the search. Pricing is custom for each engagement and discussed during the initial discovery conversation. There are three levels: Guide/Program, Leadership, and Executive. Contact us to discuss which level fits your search and to get a quote.',
  },
  {
    question: 'Are add-ons available on all plans?',
    answer:
      'Featured Listing ($99) and Social Boost ($39) are available as optional add-ons on the Single Job Post and School Unlimited plans. On MatchHub Pro, both are automatically included on every job you post — no need to add them individually.',
  },
]

export default function MatchHubPricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              MatchHub Pricing
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Clear pricing. No surprises.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed max-w-2xl">
              Straightforward plans for schools at every stage of hiring. Guide profiles
              are always free. Strategic Search is quoted based on role and scope.
            </p>
          </div>
        </div>
      </section>

      {/* For Schools */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">For Schools</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Three ways to find the right guide.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Start with a single posting, go unlimited, or go Pro for automatic
              featured placement and social promotion on every role.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {schoolPlans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white border flex flex-col ${
                  plan.featured ? 'border-[#d6a758] shadow-md' : 'border-[#E2DDD6]'
                }`}
              >
                {plan.featured && (
                  <div className="bg-[#d6a758] px-8 py-2">
                    <p className="text-white text-xs tracking-[0.15em] uppercase font-medium">
                      Best value
                    </p>
                  </div>
                )}
                <div className="p-8 flex flex-col gap-6 flex-1">
                  <div>
                    <h3 className="text-[#0e1a7a] font-semibold text-xl mb-1" style={serif}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mt-3 mb-1">
                      <span className="text-4xl font-bold text-[#0e1a7a]" style={serif}>
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-[#64748B] text-xs">{plan.period}</p>
                  </div>
                  <p className="text-[#374151] text-sm leading-relaxed">{plan.description}</p>
                  <ul className="space-y-2 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                        <span className={`flex-shrink-0 mt-0.5 ${plan.isPro ? 'text-[#d6a758]' : 'text-[#8A6014]'}`}>—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {plan.isPro ? (
                    <div className="border-t border-[#E2DDD6] pt-5">
                      <p className="text-[#d6a758] text-xs tracking-[0.1em] uppercase font-medium mb-3">
                        All add-ons included
                      </p>
                      <ul className="space-y-2">
                        {['Featured Placement', 'Social Boost'].map((label, i) => (
                          <li key={i} className="flex items-center justify-between text-sm">
                            <span className="text-[#374151]">{label}</span>
                            <span className="text-[#2D6A4F] text-xs font-semibold tracking-wide">Included</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : plan.addOns.length > 0 ? (
                    <div className="border-t border-[#E2DDD6] pt-5">
                      <p className="text-[#64748B] text-xs tracking-[0.1em] uppercase mb-3">
                        Optional add-ons
                      </p>
                      <ul className="space-y-2">
                        {plan.addOns.map((addon, i) => (
                          <li key={i} className="flex items-center justify-between text-sm">
                            <span className="text-[#374151]">{addon.label}</span>
                            <span className="text-[#64748B] font-medium">{addon.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <a
                    href={
                      plan.name === 'Single Job Post'
                        ? STRIPE.singleJob
                        : plan.name === 'School Unlimited'
                        ? STRIPE.schoolUnlimited
                        : STRIPE.pro
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm px-6 py-3 tracking-wide transition-colors text-center mt-auto ${
                      plan.featured
                        ? 'bg-[#d6a758] text-white hover:bg-[#c09240]'
                        : 'bg-[#0e1a7a] text-white hover:bg-[#162270]'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Guides */}
      <section className="bg-[#F2EDE6] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-[#E2DDD6] p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">For Guides</p>
              <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
                Guide profiles are always free.
              </h2>
              <p className="text-[#374151] text-base leading-relaxed mb-4">
                Create your profile, tell your story, and get in front of Montessori
                schools that are actively hiring. No subscription, no pay-to-apply
                walls — ever.
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                If you want hands-on support finding the right school, Strategic Search
                for Guides is available as a separate, facilitated process led by Hannah.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-[#0e1a7a]" style={serif}>Free</span>
                <span className="text-[#64748B] text-sm">forever</span>
              </div>
              <ul className="space-y-2 mb-6">
                {[
                  'Full profile creation and visibility',
                  'Browse open positions at vetted Montessori schools',
                  'Filter by school type, philosophy, level, and location',
                  'Apply directly through the platform',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/matchhub/submit-profile"
                className="bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center"
              >
                Create Your Guide Profile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Search */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Strategic Search</p>
            <h2 className="text-4xl md:text-5xl text-white leading-tight mb-6" style={serif}>
              Custom pricing for retained search.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              Strategic Search is a retained, Hannah-led engagement. Pricing is
              custom for each search based on role level and scope. All three levels
              include philosophy vetting, a curated shortlist, and Hannah&apos;s
              direct involvement from discovery to placement.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {strategicLevels.map((level) => (
              <div key={level.name} className="bg-white/5 border border-white/10 p-8">
                <h3 className="text-white font-semibold text-lg mb-3" style={serif}>
                  {level.name}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                  {level.description}
                </p>
                <Link
                  href={`/matchhub/strategic-search${level.anchor}`}
                  className="text-[#8A6014] text-xs tracking-wide font-medium hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
            >
              Get a Quote
            </Link>
            <Link
              href="/matchhub/strategic-search"
              className="border border-white/30 text-white text-sm px-10 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
            >
              Learn About Strategic Search →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">FAQ</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight" style={serif}>
              Common questions.
            </h2>
          </div>
          <div className="max-w-3xl space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="py-8 border-b border-[#E2DDD6] last:border-0">
                <h3 className="text-[#0e1a7a] font-semibold text-lg mb-3" style={serif}>
                  {faq.question}
                </h3>
                <p className="text-[#374151] text-base leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Get Started</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              Ready to hire well?
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Start with the plan that fits your needs, or reach out to discuss
              Strategic Search for your next leadership hire.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap"
            >
              Get Started
            </Link>
            <Link
              href="/matchhub/strategic-search"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Learn About Strategic Search →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
