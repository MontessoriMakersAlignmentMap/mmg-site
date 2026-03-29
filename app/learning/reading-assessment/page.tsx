import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const HUB_URL = 'https://mmlreadingassessmenthub.com'

const pricingTiers = [
  {
    name: 'Teacher License',
    capacity: 'Up to 30 students',
    price: '$99',
    period: '/year',
    description: 'For individual classroom guides. Full feature access for one classroom.',
    highlight: false,
    stripeLink: 'https://buy.stripe.com/28E28t5HWb5e9MX6Jz2cg00',
  },
  {
    name: 'Small School',
    capacity: 'Up to 50 students',
    price: '$249',
    period: '/year',
    description: 'Ideal for small Montessori schools or multi-age classrooms.',
    highlight: false,
    stripeLink: 'https://buy.stripe.com/28EcN7ees5KU4sDaZP2cg01',
  },
  {
    name: 'Standard School',
    capacity: '51–150 students',
    price: '$499',
    period: '/year',
    description: 'The most common tier for established Montessori programs.',
    highlight: true,
    stripeLink: 'https://buy.stripe.com/aFa8wR5HW8X64sD0lb2cg02',
  },
  {
    name: 'Large School',
    capacity: '151–300 students',
    price: '$799',
    period: '/year',
    description: 'For growing programs and multi-campus schools tracking at scale.',
    highlight: false,
    stripeLink: 'https://buy.stripe.com/6oU5kF0nCehq5wH9VL2cg03',
  },
  {
    name: 'Extra Large',
    capacity: '301–500 students',
    price: '$999',
    period: '/year',
    description: 'Full administrative reporting and cross-classroom analysis.',
    highlight: false,
    stripeLink: 'https://buy.stripe.com/eVqcN78U8b5e2kv9VL2cg04',
  },
  {
    name: 'Unlimited Campus',
    capacity: '500+ students',
    price: '$1,499',
    period: '/year',
    description: 'Unlimited student enrollment. For large campuses and networks.',
    highlight: false,
    stripeLink: 'https://buy.stripe.com/8x28wR2vKflu6AL1pf2cg05',
  },
]

const features = [
  {
    title: 'Tracks Against the Decodable Book Sets',
    desc: 'Assessment entries are mapped directly to the eight sets of the Decodable Book Series — so a guide can see not just where a child is, but which books they are ready for next.',
  },
  {
    title: 'Phonics Mastery Progression',
    desc: 'Tracks each child\'s phonics skill development across the full sequence: short vowels, blends, digraphs, long vowel patterns, r-controlled vowels, and complex patterns.',
  },
  {
    title: 'Insight Reports for Guides',
    desc: 'Clear, visual reports showing where each student is in the phonics progression — not scores, but skill readiness. Designed for the guide-led conference and parent communication.',
  },
  {
    title: 'Administrator Oversight',
    desc: 'School administrators can view aggregate progress across classrooms, identify students needing additional support, and monitor program fidelity across the materials sequence.',
  },
  {
    title: 'Progress Over Time',
    desc: 'Track movement through the sequence over weeks, months, and years. Identify patterns across cohorts. Understand where the program is producing growth — and where to adjust.',
  },
  {
    title: 'Connects to the Montessori Materials Sequence',
    desc: 'Every tracking point is anchored to the Montessori reading materials. The Hub speaks the language guides already use — not standards-based grade levels.',
  },
]

export default function ReadingAssessmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">Reading Assessment Hub</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            Track phonics mastery the way Montessori teaches it.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-12">
            A digital assessment platform designed specifically for phonics and literacy tracking
            in Montessori programs — aligned to the materials sequence, connected to the
            Decodable Book Series.
          </p>
          <p className="text-[#7A8FA3] text-base leading-relaxed mb-12">
            From $99/year for individual classroom guides. Free trial available for up to 10 students &mdash; no credit card required.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="#pricing"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block"
            >
              Purchase a License
            </Link>
            <a
              href={`${HUB_URL}/login`}
              className="border border-white text-white text-sm px-8 py-4 tracking-wide hover:bg-white hover:text-[#0e1a7a] transition-colors inline-block"
            >
              Sign In
            </a>
            <Link
              href="/mmas"
              className="border border-white/50 text-white/70 text-sm px-8 py-4 tracking-wide hover:bg-white/10 transition-colors inline-block"
            >
              Learn About MMAS
            </Link>
          </div>
        </div>
      </section>

      {/* MMAS Distinction Callout */}
      <section className="bg-[#F2EDE6] py-10 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 items-start max-w-4xl">
            <div className="w-1 flex-shrink-0 self-stretch bg-[#d6a758] rounded-full" />
            <div>
              <p className="text-[#0e1a7a] font-semibold text-sm mb-1">
                Reading Assessment Hub vs. MMAS — an important distinction
              </p>
              <p className="text-[#374151] text-sm leading-relaxed">
                The Reading Assessment Hub is specifically for phonics and literacy tracking. It
                follows the Montessori reading materials sequence and connects directly to the
                Decodable Book Series. If you&apos;re looking for whole-child developmental
                assessment across all domains — math, language, practical life, social-emotional
                development — see{' '}
                <Link href="/mmas" className="text-[#0e1a7a] font-semibold hover:underline">
                  MMAS →
                </Link>{' '}
                The two tools are complementary, not duplicative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What It Is */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What It Is</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Assessment that speaks the language of Montessori reading.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              The Reading Assessment Hub was built because Montessori programs needed a phonics
              tracking tool that actually understood how Montessori teaches reading — not a
              generic literacy platform with a Montessori label.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              Every data point in the Hub corresponds to a real skill in the Montessori phonics
              sequence. Every report is designed to help a guide make the next instructional
              decision — which set to introduce, which child needs reinforcement, which patterns
              are emerging across the class.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              Start with a free trial for up to 10 students. Upgrade when you&apos;re ready for
              full classroom or school use.
            </p>
          </div>
          <div className="space-y-4">
            {features.map((feature, i) => (
              <div key={i} className="bg-white border border-[#E2DDD6] p-6">
                <h3 className="text-[#0e1a7a] font-semibold text-sm mb-2">{feature.title}</h3>
                <p className="text-[#374151] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section id="pricing" className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Pricing</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Simple, transparent tiers.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              All tiers include full feature access. Pricing scales with the number of students
              enrolled. Annual billing only.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-8 border flex flex-col gap-4 ${
                  tier.highlight
                    ? 'bg-[#0e1a7a] border-[#0e1a7a]'
                    : 'bg-white border-[#E2DDD6]'
                }`}
              >
                {tier.highlight && (
                  <span className="text-[#8A6014] text-xs tracking-[0.15em] uppercase font-semibold">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3
                    className={`font-semibold text-base mb-1 ${
                      tier.highlight ? 'text-white' : 'text-[#0e1a7a]'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {tier.capacity}
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-3xl font-semibold ${
                      tier.highlight ? 'text-white' : 'text-[#0e1a7a]'
                    }`}
                    style={serif}
                  >
                    {tier.price}
                  </span>
                  <span className="text-sm text-[#64748B]">
                    {tier.period}
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed flex-1 ${
                    tier.highlight ? 'text-[#64748B]' : 'text-[#374151]'
                  }`}
                >
                  {tier.description}
                </p>
                <a
                  href={tier.stripeLink}
                  className={`text-xs tracking-wide font-medium px-4 py-2 transition-colors text-center ${
                    tier.highlight
                      ? 'bg-[#d6a758] text-white hover:bg-[#c09240]'
                      : 'border border-[#0e1a7a] text-[#0e1a7a] hover:bg-[#0e1a7a] hover:text-white'
                  }`}
                >
                  Purchase License &rarr;
                </a>
                <p className="text-[#94A3B8] text-[10px] text-center mt-1">
                  After purchase, you&apos;ll receive instructions to create your account at mmlreadingassessmenthub.com.
                </p>
              </div>
            ))}
          </div>
          <p className="text-[#64748B] text-xs mt-6">
            Not sure which tier fits? Start with the Teacher License and upgrade at any time.
            Volume pricing for networks and multi-campus schools available — contact us.
          </p>
        </div>
      </section>

      {/* Getting Started */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Getting Started</p>
            <h2 className="text-3xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Try free. Upgrade when you&apos;re ready.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-8">
              New accounts start with a free tier supporting up to 10 students — enough to learn
              the platform, run your first assessments, and see how tracking integrates with your
              materials work. No credit card required to start.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#pricing"
                className="bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#162270] transition-colors inline-block"
              >
                Purchase a License
              </Link>
              <a
                href={`${HUB_URL}/login`}
                className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors inline-block"
              >
                Sign In to Hub
              </a>
            </div>
          </div>
          <div className="bg-[#F2EDE6] p-8 border-l-4 border-[#d6a758]">
            <p className="text-[#0e1a7a] font-semibold mb-4">Also in the Learning ecosystem</p>
            <div className="space-y-4">
              <div className="py-4 border-b border-[#D4CEC6]">
                <p className="text-[#0e1a7a] text-sm font-semibold mb-1">Decodable Book Series</p>
                <p className="text-[#374151] text-xs leading-relaxed mb-2">
                  96 books, 8 sets — the series the Hub tracks against.
                </p>
                <Link href="/learning/decodable-books" className="text-[#0e1a7a] text-xs hover:underline">
                  Learn more →
                </Link>
              </div>
              <div className="py-4">
                <p className="text-[#0e1a7a] text-sm font-semibold mb-1">Montessori Meets Science of Reading</p>
                <p className="text-[#374151] text-xs leading-relaxed mb-2">
                  The 7-hour course for guides on reading instruction, equity, and Montessori philosophy.
                </p>
                <Link href="/learning/courses" className="text-[#0e1a7a] text-xs hover:underline">
                  See the course →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
