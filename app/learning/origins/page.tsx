import Link from 'next/link'
import Image from 'next/image'
import OriginsSamplePages from './OriginsSamplePages'

const serif = { fontFamily: 'var(--font-heading)' }

const suites = [
  {
    number: '01',
    slug: 'universe',
    name: 'Origins of the Universe',
    tagline: 'From singularity to solar system — with current cosmology.',
    image: '/learning/origins/origins-universe.png',
    description:
      'The classic "Coming of the Universe" story retold through contemporary astrophysics, indigenous cosmological knowledge systems, and the scientific contributions of astronomers from across the globe. Includes primary source materials, inquiry extensions, and a guide for facilitating wonder without asserting western cosmology as the only frame.',
    includes: [
      'Narrative arc aligned with current cosmological models',
      '13 impressionistic charts spanning particle formation through cosmic responsibility',
      'Multiple cultural creation frameworks presented with dignity',
      'Discussion and inquiry guide for the educator',
      'Extensions into physics, chemistry, and earth science',
    ],
    stripeHref: 'https://buy.stripe.com/00wfZjc6ka1a4sDfg52cg0R',
  },
  {
    number: '02',
    slug: 'life',
    name: 'Origins of Life',
    tagline: 'The emergence of life — accurate, awe-inspiring, global.',
    image: '/learning/origins/origins-life.jpg',
    description:
      'A scientifically updated account of life\'s origins that corrects outdated content in the traditional "Coming of Life" presentation, incorporates recent discoveries in microbiology and evolutionary biology, and centers the global scientific community that made these discoveries possible.',
    includes: [
      'Updated timeline of life with current paleontological science',
      '13 impressionistic charts from early Earth through humans as latecomers',
      'Corrected misconceptions from the original Great Lesson',
      'Emphasis on microbial life and evolutionary complexity',
      'Connections to environmental stewardship and ecology',
    ],
    stripeHref: 'https://buy.stripe.com/28EdRbb2g8X63oz4Br2cg0S',
  },
  {
    number: '03',
    slug: 'humanity',
    name: 'Origins of Humanity',
    tagline: 'Human origins — honest, global, decolonized.',
    image: '/learning/origins/origins-humanity.png',
    description:
      'The most extensively revised of the five suites. The original Great Lesson on human origins contained significant Eurocentric framing and outdated anthropological assumptions. This reconstruction centers African origins, honors the full breadth of early human societies, and presents the story of humanity as a genuinely global, communal achievement.',
    includes: [
      'African origin narrative centered from the start',
      '14 impressionistic charts including global migrations and cultural flourishing',
      'Global migration patterns and early human diversity',
      'Map materials, figurine guides, and cultural artifact connections',
      'Discussion framework for navigating sensitive history with children',
    ],
    stripeHref: 'https://buy.stripe.com/9B66oJ2vK2yI5wH6Jz2cg0T',
  },
  {
    number: '04',
    slug: 'writing',
    name: 'Origins of Writing',
    tagline: 'Writing systems from around the world — not just the Roman alphabet.',
    image: '/learning/origins/origins-writing.png',
    description:
      'The original lesson on writing disproportionately emphasized Greco-Roman alphabetic traditions. This suite traces writing from Sumerian cuneiform through Mayan glyphs, Chinese characters, Arabic calligraphy, and the Cherokee syllabary. Children encounter writing as a global human achievement — including systems almost never seen in Montessori classrooms.',
    includes: [
      'Timeline of writing systems across six world regions',
      '13 impressionistic charts including Arabic calligraphy and Cherokee syllabary',
      'Character and symbol cards for major writing traditions',
      'Stories of the people who developed and preserved writing systems',
      'Extension into linguistics and semiotics',
    ],
    stripeHref: 'https://buy.stripe.com/28E5kF9Yc5KU6AL5Fv2cg0U',
  },
  {
    number: '05',
    slug: 'mathematics',
    name: 'Origins of Mathematics',
    tagline: 'Mathematics as a global inheritance — not a Western invention.',
    image: '/learning/origins/origins-mathematics.png',
    description:
      'Mathematics has origins in every human civilization. This suite traces counting systems, geometry, algebra, and number theory through their actual histories: Babylonian mathematics, the zero from Indian scholars, African geometric traditions, Mayan calendrical mathematics, and the Islamic Golden Age contributions that shaped modern algebra. Children learn that math belongs to everyone because everyone made it.',
    includes: [
      'Historical timeline of mathematical development by region',
      '13 impressionistic charts — African Indigenous, Mayan, Islamic Golden Age, and more',
      'Profiles of mathematicians from six continents',
      'Number systems and base comparisons across cultures',
      'Extensions into architecture, music, and natural patterns',
    ],
    stripeHref: 'https://buy.stripe.com/dRm7sNfiw2yIf7hd7X2cg0V',
  },
]

const bundleStripeHref = 'https://buy.stripe.com/cNi8wRees8X64sD1pf2cg0W'
const suitePrice = '$110'
const bundlePrice = '$475'

const featuredCharts = [
  {
    key: 'OM-C02',
    label: 'African Indigenous Mathematics',
    suite: 'Origins of Mathematics',
    rotate: '-rotate-2',
    translate: 'md:translate-y-4',
  },
  {
    key: 'OM-C05',
    label: 'Mayan Mathematics',
    suite: 'Origins of Mathematics',
    rotate: 'rotate-3',
    translate: 'md:-translate-y-6',
  },
  {
    key: 'OW-C09',
    label: 'Arabic Calligraphy',
    suite: 'Origins of Writing',
    rotate: '-rotate-1',
    translate: 'md:translate-y-8',
  },
  {
    key: 'OW-C10',
    label: 'Cherokee Syllabary',
    suite: 'Origins of Writing',
    rotate: 'rotate-2',
    translate: 'md:-translate-y-3',
  },
  {
    key: 'OH-C11',
    label: 'Global Migrations',
    suite: 'Origins of Humanity',
    rotate: '-rotate-3',
    translate: 'md:translate-y-6',
  },
  {
    key: 'OU-C01',
    label: 'Particle Cooling',
    suite: 'Origins of the Universe',
    rotate: 'rotate-1',
    translate: 'md:-translate-y-5',
  },
]

export default function OriginsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">Origins Series</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            The Great Lessons, rebuilt for the world children live in.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-12">
            Cosmic education for the world children live in — accurate, global, human.
            Justice woven into cosmic education, not added on. Available as individual downloadable
            suites or as a complete bundle.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={bundleStripeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block font-medium"
            >
              Shop the Complete Bundle — {bundlePrice}
            </a>
            <a
              href="#suites"
              className="border border-white text-white text-sm px-8 py-4 tracking-wide hover:bg-white hover:text-[#0e1a7a] transition-colors inline-block"
            >
              Browse Individual Suites
            </a>
          </div>
        </div>
      </section>

      {/* Bundle Emphasis */}
      <section className="bg-[#F2EDE6] py-14 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-3">
                Complete Bundle
              </p>
              <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-3" style={serif}>
                All five suites. 65 charts. Every Great Story.
              </h2>
              <p className="text-[#374151] text-base leading-relaxed">
                Each suite is a complete lesson reconstruction — narrative guide, 13 impressionistic
                charts, inquiry extensions, and a facilitation guide. Purchase individually or save
                with the full bundle.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <a
                href={bundleStripeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium whitespace-nowrap"
              >
                Shop the Complete Bundle — {bundlePrice}
              </a>
              <a
                href="#suites"
                className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
              >
                Shop Individual Suites — {suitePrice} each
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Why These Were Rebuilt</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              The original Great Lessons were revolutionary. They also reflected the scientific understanding and cultural perspective of their time.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              Montessori&apos;s Great Lessons — the five cosmic education stories at the heart of
              the elementary program — gave children a framework for understanding their place in
              the universe. That framework was extraordinary. It also reflected the scientific
              consensus and cultural assumptions of mid-twentieth-century Europe.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              Science has advanced since the original lessons were written. Contemporary
              anthropology now centers more complete and globally representative perspectives.
              The children in Montessori classrooms today are global citizens — and the
              Great Lessons now reflect that.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              Montessori isn&apos;t frozen in time — it&apos;s a living framework for curiosity,
              independence, and justice.
            </p>
          </div>
          <div className="space-y-0">
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">What was revised</p>
            {[
              { issue: 'Eurocentric framing', fix: 'Global perspectives centered from the opening narrative, not added as supplements' },
              { issue: 'Outdated scientific content', fix: 'Every suite reviewed against current consensus in the relevant scientific field' },
              { issue: 'Missing cultural contributions', fix: 'Mathematical, linguistic, and scientific achievements from across the globe restored to their rightful place' },
              { issue: 'Anthropological assumptions', fix: 'Human origins story decolonized; African origins centered; diversity of early human life honored' },
            ].map((item, i) => (
              <div key={i} className="py-5 border-b border-[#E2DDD6] first:border-t">
                <p className="text-[#0e1a7a] font-semibold text-sm mb-1">{item.issue}</p>
                <p className="text-[#374151] text-sm leading-relaxed">{item.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Justice Woven In */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">What Justice-Centered Means</p>
          <h2 className="text-3xl md:text-4xl text-white leading-tight mb-8" style={serif}>
            Justice woven in, not added on.
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-6">
            Many curriculum revisions add a diversity insert — a callout box noting contributions
            from non-Western scientists, a sidebar on indigenous knowledge. The Origins Series
            doesn&apos;t work that way.
          </p>
          <p className="text-[#94A3B8] text-base leading-relaxed mb-6">
            Justice-centered design means the architecture of each lesson suite assumes global
            human contribution from the first sentence. There is no &ldquo;main story&rdquo; and
            then a diverse supplement. There is one story, told honestly — and that story includes
            everyone who actually shaped it.
          </p>
          <p className="text-[#94A3B8] text-base leading-relaxed">
            This is not a political position. It is an accurate one.
          </p>
        </div>
      </section>

      {/* The 5 Suites */}
      <section id="suites" className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Five Suites</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Each suite is a complete lesson reconstruction.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Sold individually as downloadable suites at {suitePrice} each. Each includes a
              narrative guide, 13 impressionistic charts, inquiry extensions, and a facilitation
              guide for the educator.
            </p>
          </div>

          <div className="space-y-6">
            {suites.map((suite) => (
              <div
                key={suite.number}
                className="bg-white border border-[#E2DDD6] flex flex-col md:flex-row overflow-hidden"
              >
                {/* Cover image */}
                <div className="relative w-full md:w-48 lg:w-56 flex-shrink-0 aspect-[3/4] md:aspect-auto">
                  <Image
                    src={suite.image}
                    alt={suite.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 224px"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-8 md:p-10">
                  {/* Number bar */}
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-[#8A6014] text-xs tracking-[0.2em] font-semibold flex-shrink-0">
                      {suite.number}
                    </span>
                    <div className="flex-1 h-px bg-[#E2DDD6]" />
                  </div>

                  {/* Title + description + includes grid */}
                  <div className="grid md:grid-cols-2 gap-8 flex-1">
                    <div>
                      <h3
                        className="text-[#0e1a7a] text-xl font-semibold mb-1 leading-snug"
                        style={serif}
                      >
                        {suite.name}
                      </h3>
                      <p className="text-[#64748B] text-sm italic mb-4">{suite.tagline}</p>
                      <p className="text-[#374151] text-sm leading-relaxed">{suite.description}</p>
                    </div>

                    <div>
                      <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">
                        What&apos;s included
                      </p>
                      <ul className="space-y-2">
                        {suite.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-[#8A6014] flex-shrink-0 mt-0.5 text-xs">—</span>
                            <span className="text-[#374151] text-xs leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-6 border-t border-[#E2DDD6] flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-[#64748B] text-xs">
                        Downloadable suite &mdash; story PDF + 13 impressionistic charts + facilitation guide
                      </p>
                      <p className="text-[#0e1a7a] text-lg font-semibold mt-1" style={serif}>
                        {suitePrice}
                      </p>
                    </div>
                    <a
                      href={suite.stripeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#d6a758] text-white text-xs px-6 py-2.5 tracking-wide hover:bg-[#c09240] transition-colors font-medium whitespace-nowrap flex-shrink-0"
                    >
                      Purchase Suite &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Pages */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-4">Inside the Series</p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
            See what you are getting.
          </h2>
          <p className="text-[#374151] text-base leading-relaxed mb-12 max-w-2xl">
            A few pages from each suite — pulled from different sections to show the range
            of content, style, and depth. Click any page to zoom in.
          </p>
          <OriginsSamplePages />
        </div>
      </section>

      {/* Chart Showcase */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-6">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-4">
              65 Impressionistic Charts
            </p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              These charts tell the real story.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-3">
              The Story of Mathematics doesn&apos;t begin with Greece. The Story of Writing
              doesn&apos;t stop at cuneiform and hieroglyphics. These charts exist because
              children deserve to see the truth: that every civilization on every continent
              contributed to the knowledge we hold today.
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Thirteen charts per story, spanning all five Great Stories. Click any chart to zoom in.
            </p>
          </div>

          {/* Scattered chart thumbnails */}
          <div className="relative flex flex-wrap justify-center gap-6 md:gap-0 md:flex-nowrap md:items-end md:h-[400px] my-12">
            {featuredCharts.map((chart, i) => (
              <div
                key={chart.key}
                className={`relative flex-shrink-0 w-[140px] md:w-[175px] ${chart.rotate} ${chart.translate} transition-transform duration-300 hover:scale-105 hover:z-50 hover:rotate-0`}
                style={{ zIndex: i === 2 ? 30 : i % 2 === 0 ? 10 : 20 }}
              >
                <div className="shadow-xl border border-[#D4CEC6] bg-white">
                  <Image
                    src={`/learning/origins/charts/origins-chart-${chart.key}.png`}
                    alt={chart.label}
                    width={612}
                    height={792}
                    className="w-full h-auto block"
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-[10px] text-[#64748B] tracking-[0.1em] uppercase leading-tight">
                    {chart.label}
                  </p>
                  <p className="text-[9px] text-[#94A3B8] tracking-wide mt-0.5">
                    {chart.suite}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <a
              href={bundleStripeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
            >
              Shop the Complete Bundle — {bundlePrice}
            </a>
            <a
              href="#suites"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors"
            >
              Browse Individual Suites
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Pricing</p>
            <h2 className="text-3xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Individual suites or the complete bundle.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-8">
              Purchase the lesson you need now and add others as your program grows.
              Or start with the complete bundle and have all five ready for your curriculum year.
              All suites are downloadable immediately after purchase.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between border border-[#E2DDD6] px-5 py-4 bg-white">
                <div>
                  <p className="text-[#374151] text-sm font-medium">Individual Suite</p>
                  <p className="text-[#64748B] text-xs">Story PDF + 13 charts + facilitation guide</p>
                </div>
                <p className="text-[#0e1a7a] text-xl font-semibold" style={serif}>{suitePrice}</p>
              </div>
              <div className="flex items-center justify-between border-2 border-[#d6a758] px-5 py-4 bg-white">
                <div>
                  <p className="text-[#374151] text-sm font-medium">Complete Bundle</p>
                  <p className="text-[#64748B] text-xs">All five suites — 65 charts total</p>
                </div>
                <p className="text-[#0e1a7a] text-xl font-semibold" style={serif}>{bundlePrice}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={bundleStripeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Shop the Complete Bundle
              </a>
              <a
                href="#suites"
                className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
              >
                Browse Individual Suites
              </a>
            </div>
          </div>

          <div>
            <div className="bg-white p-8 border-l-4 border-[#d6a758] mb-6 border border-[#E2DDD6]">
              <p className="text-[#0e1a7a] font-semibold mb-3">What&apos;s included in each suite</p>
              <ul className="space-y-2">
                {[
                  'Narrative guide for the educator (complete lesson text)',
                  '13 impressionistic charts — illustrated, print-ready PDFs',
                  'Visual anchor materials and timeline or map materials',
                  'Inquiry and extension activities (primary and upper elementary)',
                  'Facilitation guide — what to anticipate, how to respond',
                  'Background reading for guides on the relevant science',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                    <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[#64748B] text-xs leading-relaxed">
              Suites are updated when new scientific evidence or pedagogical guidance warrants revision.
              Purchasers receive updates at no additional cost.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
