import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const categories = [
  {
    eyebrow: 'Decodable Books',
    headline: '96 books. Built for the way Montessori teaches reading.',
    desc: 'Science of Reading grounded. Montessori bead color-aligned. Justice-centered stories that build voice, confidence, and agency — not just decoding skills.',
    for: 'Primary guides, literacy leads, and school directors',
    price: 'Sets available individually · Full series bulk pricing',
    cta: 'Shop Decodable Books',
    ctaHref: '/learning/decodable-books',
    secondary: 'See all 8 sets →',
    secondaryHref: '/learning/decodable-books',
    bg: 'bg-[#FAF9F7]',
    visual: [
      { label: 'Set 1 — CVC Words', color: '#B91C1C' },
      { label: 'Set 2 — Consonant Blends', color: '#1D4ED8' },
      { label: 'Set 3 — Digraphs', color: '#15803D' },
      { label: 'Set 4 — Long Vowel Patterns', color: '#B45309' },
      { label: 'Set 5 — R-Controlled Vowels', color: '#7E22CE' },
      { label: 'Set 6 — Diphthongs', color: '#BE185D' },
      { label: 'Set 7 — Complex Patterns', color: '#C2410C' },
      { label: 'Set 8 — Fluency & Integration', color: '#d6a758' },
    ],
  },
  {
    eyebrow: 'Reading Assessment Hub',
    headline: 'Track phonics mastery the way Montessori teaches it.',
    desc: 'A digital assessment platform aligned to the Montessori materials sequence. Connected directly to the Decodable Book Series. Clear, guide-friendly reports — not grade-level scores.',
    for: 'Individual guides · Small schools · Large programs',
    price: 'From $99/year · 6 tiers by enrollment · Free trial up to 10 students',
    cta: 'Purchase a License',
    ctaHref: '/learning/reading-assessment',
    secondary: 'See pricing tiers →',
    secondaryHref: '/learning/reading-assessment',
    bg: 'bg-white',
    pricingPreview: [
      { label: 'Teacher License', capacity: 'Up to 30 students', price: '$99/yr' },
      { label: 'Small School', capacity: 'Up to 50 students', price: '$249/yr' },
      { label: 'Standard School', capacity: '51–150 students', price: '$499/yr', highlight: true },
      { label: 'Large School', capacity: '151–300 students', price: '$799/yr' },
    ],
  },
  {
    eyebrow: 'Learning Lab',
    headline: 'Professional learning built on Montessori philosophy and modern research.',
    desc: 'Rigorous, self-paced courses for working Montessori educators. Five courses — all grounded in real classroom practice, each equivalent to a full-day professional development experience.',
    for: 'Primary and elementary Montessori guides, literacy leads, instructional coaches',
    price: '$250 per course · Lifetime access',
    cta: 'Browse Courses',
    ctaHref: '/learning/courses',
    secondary: 'See what\'s coming →',
    secondaryHref: '/learning/courses',
    bg: 'bg-[#FAF9F7]',
    courses: [
      {
        name: 'Montessori Meets Science of Reading',
        tagline: 'Reading instruction, Montessori philosophy, equity, and the science of reading.',
        price: '$250',
      },
      {
        name: 'Montessori Math: Materials to Mastery',
        tagline: 'Connecting the math materials to conceptual understanding.',
        price: '$250',
      },
    ],
  },
  {
    eyebrow: 'Origins Series',
    headline: 'The Great Lessons, rebuilt for the world children live in.',
    desc: 'Five justice-centered, scientifically accurate lesson suite reconstructions. Cosmic education with global human contributions at the center — not added on.',
    for: 'Elementary guides, curriculum leads, and school directors building a full program',
    price: 'Sold individually as downloadable suites · Full series bundle available',
    cta: 'Coming Soon',
    ctaHref: '/learning/origins',
    secondary: 'See all 5 suites →',
    secondaryHref: '/learning/origins',
    bg: 'bg-[#F2EDE6]',
    suites: [
      { num: '01', name: 'Origins of the Universe' },
      { num: '02', name: 'Origins of Life' },
      { num: '03', name: 'Origins of Humanity' },
      { num: '04', name: 'Origins of Writing' },
      { num: '05', name: 'Origins of Mathematics' },
    ],
  },
]

export default function LearningPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-20 pb-16 md:pt-24 md:pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase">
              Montessori Makers Learning
            </p>
            <div className="hidden md:block">
              <Logo name="learning" heroWidth={560} heroHeight={160} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h1
                className="text-4xl md:text-5xl text-white leading-[1.07] tracking-tight mb-6"
                style={serif}
              >
                Cosmic education for the world children live in.
              </h1>
              <p className="text-[#94A3B8] text-base leading-relaxed mb-2 max-w-lg">
                Accurate. Global. Human. Beautiful. Rigorous. Justice-aligned.
              </p>
              <p className="text-[#7A8FA3] text-sm leading-relaxed max-w-lg">
                Curriculum, materials, assessment, and professional learning built where
                Montessori philosophy meets modern research and real communities.
              </p>
            </div>

            {/* 4 CTA Cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Shop Decodable Books', sub: '96 books · 8 sets', href: '/learning/decodable-books' },
                { label: 'Reading Assessment Hub', sub: 'From $99/year', href: '/learning/reading-assessment' },
                { label: 'Browse Courses', sub: '$250 each · Lifetime access', href: '/learning/courses' },
                { label: 'Origins Series', sub: 'Coming soon', href: '/learning/origins' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-white/8 border border-white/15 p-5 hover:bg-white/14 hover:border-white/30 transition-all duration-200 group"
                >
                  <p className="text-white text-sm font-medium leading-snug mb-2 group-hover:text-[#8A6014] transition-colors" style={serif}>
                    {item.label}
                  </p>
                  <p className="text-[#7A8FA3] text-xs leading-relaxed">{item.sub}</p>
                  <p className="text-[#8A6014] text-xs mt-3 font-medium">Shop →</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SECTIONS ─────────────────────────────────────────────── */}

      {/* 1. Decodable Books */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-5">
              Decodable Books
            </p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-5" style={serif}>
              96 books. Built for the way Montessori teaches reading.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              Science of Reading grounded. Bead color-aligned. Justice-centered stories that build
              voice, confidence, and agency &mdash; not just decoding skills.
            </p>
            <p className="text-[#64748B] text-xs tracking-wide uppercase mb-1 mt-6">For</p>
            <p className="text-[#374151] text-sm mb-5">Primary guides, literacy leads, and school directors</p>
            <p className="text-[#64748B] text-xs tracking-wide uppercase mb-1">Pricing</p>
            <p className="text-[#374151] text-sm mb-8">Sets available individually &middot; Full series bulk pricing at store</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/learning/decodable-books"
                className="bg-[#d6a758] text-white text-sm px-8 py-3.5 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
              >
                Shop Decodable Books
              </Link>
              <Link
                href="/learning/decodable-books"
                className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-6 py-3.5 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors"
              >
                See all 8 sets &rarr;
              </Link>
            </div>
          </div>
          {/* Visual: 8 bead-color set strips */}
          <div className="space-y-1.5">
            {[
              { label: 'Set 1 — Short Vowels & CVC', color: '#B91C1C', bead: 'Red' },
              { label: 'Set 2 — Consonant Blends', color: '#1D4ED8', bead: 'Blue' },
              { label: 'Set 3 — Digraphs', color: '#15803D', bead: 'Green' },
              { label: 'Set 4 — Long Vowel Patterns', color: '#B45309', bead: 'Yellow' },
              { label: 'Set 5 — R-Controlled Vowels', color: '#7E22CE', bead: 'Purple' },
              { label: 'Set 6 — Diphthongs & Variant Vowels', color: '#BE185D', bead: 'Pink' },
              { label: 'Set 7 — Soft Sounds & Complex Patterns', color: '#C2410C', bead: 'Orange' },
              { label: 'Set 8 — Fluency & Integration', color: '#d6a758', bead: 'Gold' },
            ].map((set, i) => (
              <div key={i} className="bg-white border border-[#E2DDD6] flex items-center gap-4 px-5 py-3">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: set.color }} />
                <span className="text-xs font-semibold flex-shrink-0" style={{ color: set.color }}>{set.bead}</span>
                <span className="text-[#374151] text-xs flex-1">{set.label}</span>
                <span className="text-[#64748B] text-xs flex-shrink-0">12 books</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Reading Assessment Hub */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Visual: pricing preview */}
          <div className="space-y-2">
            <p className="text-[#64748B] text-[10px] tracking-[0.2em] uppercase mb-4">License Tiers</p>
            {[
              { label: 'Teacher License', capacity: 'Up to 30 students', price: '$99/yr', highlight: false },
              { label: 'Small School', capacity: 'Up to 50 students', price: '$249/yr', highlight: false },
              { label: 'Standard School', capacity: '51–150 students', price: '$499/yr', highlight: true },
              { label: 'Large School', capacity: '151–300 students', price: '$799/yr', highlight: false },
              { label: 'Extra Large', capacity: '301–500 students', price: '$999/yr', highlight: false },
              { label: 'Unlimited Campus', capacity: '500+ students', price: '$1,499/yr', highlight: false },
            ].map((tier, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-3 border ${
                  tier.highlight
                    ? 'bg-[#0e1a7a] border-[#0e1a7a]'
                    : 'bg-[#FAF9F7] border-[#E2DDD6]'
                }`}
              >
                <div>
                  <span className={`text-sm font-semibold ${tier.highlight ? 'text-white' : 'text-[#0e1a7a]'}`}>
                    {tier.label}
                  </span>
                  <span className={`text-xs ml-3 ${tier.highlight ? 'text-[#64748B]' : 'text-[#64748B]'}`}>
                    {tier.capacity}
                  </span>
                  {tier.highlight && (
                    <span className="text-[#8A6014] text-[10px] tracking-widest uppercase ml-3 font-medium">Most Popular</span>
                  )}
                </div>
                <span className={`text-sm font-semibold ${tier.highlight ? 'text-[#8A6014]' : 'text-[#0e1a7a]'}`}>
                  {tier.price}
                </span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-5">
              Reading Assessment Hub
            </p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-5" style={serif}>
              Track phonics mastery the way Montessori teaches it.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              A digital assessment platform aligned to the Montessori materials sequence.
              Connected to the Decodable Book Series. Clear, guide-friendly reports &mdash;
              not grade-level scores.
            </p>
            <p className="text-[#64748B] text-xs tracking-wide uppercase mb-1 mt-6">For</p>
            <p className="text-[#374151] text-sm mb-5">Individual guides, small schools, and large programs</p>
            <p className="text-[#64748B] text-xs tracking-wide uppercase mb-1">Pricing</p>
            <p className="text-[#374151] text-sm mb-8">From $99/year &middot; 6 tiers &middot; Free trial (up to 10 students)</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/learning/reading-assessment#pricing"
                className="bg-[#d6a758] text-white text-sm px-8 py-3.5 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
              >
                Purchase a License
              </Link>
              <Link
                href="/learning/reading-assessment"
                className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-6 py-3.5 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors"
              >
                Learn more &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Learning Lab / Courses */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-5">
              Learning Lab
            </p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-5" style={serif}>
              Professional learning built on Montessori philosophy and modern research.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              Rigorous, self-paced courses for working Montessori educators — built for people doing the real work. Total time: 6.5–7 hours each.
            </p>
            <p className="text-[#64748B] text-xs tracking-wide uppercase mb-1 mt-6">For</p>
            <p className="text-[#374151] text-sm mb-5">Primary and elementary guides, literacy leads, instructional coaches</p>
            <p className="text-[#64748B] text-xs tracking-wide uppercase mb-1">Pricing</p>
            <p className="text-[#374151] text-sm mb-8">$250 per course &middot; Lifetime access</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/learning/courses"
                className="bg-[#d6a758] text-white text-sm px-8 py-3.5 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
              >
                Register for a Course
              </Link>
              <Link
                href="/learning/courses"
                className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-6 py-3.5 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors"
              >
                Browse courses &rarr;
              </Link>
            </div>
          </div>
          {/* Visual: 2 course cards */}
          <div className="space-y-4">
            {[
              {
                name: 'Montessori Meets Science of Reading',
                tagline: 'Reading instruction, Montessori philosophy, equity, and the science of reading — in one rigorous course.',
                price: '$250',
                meta: '6.5–7 hrs · Async · Self-paced',
              },
              {
                name: 'Montessori Math: Materials to Mastery',
                tagline: 'Connecting the math materials to conceptual understanding — and knowing when a child has actually gotten there.',
                price: '$250',
                meta: '6.5–7 hrs · Async · Self-paced',
              },
            ].map((course, i) => (
              <div key={i} className="bg-white border border-[#E2DDD6] p-6 flex flex-col gap-3">
                <div className="w-0.5 h-6 bg-[#d6a758]" />
                <h3 className="text-[#0e1a7a] font-semibold text-base leading-snug" style={serif}>
                  {course.name}
                </h3>
                <p className="text-[#64748B] text-xs italic leading-relaxed">{course.tagline}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[#F2EDE6]">
                  <span className="text-[#0e1a7a] text-xl font-semibold" style={serif}>{course.price}</span>
                  <span className="text-[#64748B] text-xs">{course.meta}</span>
                </div>
              </div>
            ))}
            <Link
                href="/learning/courses"
                className="text-[#8A6014] text-xs pl-1 hover:underline"
              >
                View all five courses →
              </Link>
          </div>
        </div>
      </section>

      {/* 4. Origins Series */}
      <section className="bg-[#F2EDE6] py-20 md:py-28 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Visual: 5 suites */}
          <div className="space-y-3">
            {[
              { num: '01', name: 'Origins of the Universe', tagline: 'From singularity to solar system — with current cosmology.' },
              { num: '02', name: 'Origins of Life', tagline: 'The emergence of life — accurate, awe-inspiring, global.' },
              { num: '03', name: 'Origins of Humanity', tagline: 'Human origins — honest, global, decolonized.' },
              { num: '04', name: 'Origins of Writing', tagline: 'Writing systems from around the world — not just the Roman alphabet.' },
              { num: '05', name: 'Origins of Mathematics', tagline: 'Mathematics as a global inheritance — not a Western invention.' },
            ].map((suite) => (
              <div key={suite.num} className="bg-white border border-[#D4CEC6] flex items-start gap-5 px-6 py-4">
                <span className="text-[#8A6014] text-xs tracking-[0.2em] font-semibold flex-shrink-0 mt-0.5">{suite.num}</span>
                <div>
                  <p className="text-[#0e1a7a] text-sm font-semibold leading-snug" style={serif}>{suite.name}</p>
                  <p className="text-[#64748B] text-xs italic mt-0.5">{suite.tagline}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-5">
              Origins Series
            </p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-5" style={serif}>
              The Great Lessons, rebuilt for the world children live in.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              Five justice-centered, scientifically accurate lesson suite reconstructions.
              Cosmic education with global human contributions at the center &mdash; not added on.
            </p>
            <p className="text-[#64748B] text-xs tracking-wide uppercase mb-1 mt-6">For</p>
            <p className="text-[#374151] text-sm mb-5">Elementary guides, curriculum leads, and school directors</p>
            <p className="text-[#64748B] text-xs tracking-wide uppercase mb-1">Format</p>
            <p className="text-[#374151] text-sm mb-8">Sold individually as downloadable suites &middot; Full bundle available</p>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="bg-[#E8E3DB] text-[#94A3B8] text-sm px-8 py-3.5 tracking-wide font-medium cursor-default">
                Coming Soon
              </span>
              <Link
                href="/learning/origins"
                className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-6 py-3.5 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors"
              >
                See all 5 suites &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY (moved lower) ──────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-6">Our Approach</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-6" style={serif}>
              Montessori isn&apos;t frozen in time. It&apos;s a living framework.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed mb-4">
              Every MMG Learning product is built on three commitments: Montessori philosophy,
              modern research, and justice. Not as competing priorities &mdash; as one integrated approach.
            </p>
          </div>
          <div className="space-y-3">
            {[
              '&ldquo;Literacy as liberation.&rdquo; Not just decoding &mdash; confidence, voice, agency.',
              '&ldquo;Justice woven into cosmic education, not added on.&rdquo;',
              'Science of Reading, applied through a Montessori lens.',
              'Great Lessons rebuilt for the world children live in today.',
            ].map((quote, i) => (
              <div key={i} className="border border-white/15 p-5">
                <p
                  className="text-[#94A3B8] text-sm leading-relaxed italic"
                  dangerouslySetInnerHTML={{ __html: quote }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE RESOURCES CTA ───────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-16 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-3">Free Resources</p>
            <h2 className="text-xl md:text-2xl text-[#0e1a7a] leading-tight mb-3" style={serif}>
              Tools and resources available right now.
            </h2>
            <p className="text-[#4B5563] text-sm leading-relaxed">
              Free educator tools, templates, and assessment resources &mdash; reflecting the same
              commitments as every paid product.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/learning/free-resources"
              className="bg-[#0e1a7a] text-white text-sm px-8 py-3.5 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap font-medium"
            >
              Get Free Resources
            </Link>
            <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-6 py-3.5 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
>
  Book a Consultation
</a>
          </div>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}
