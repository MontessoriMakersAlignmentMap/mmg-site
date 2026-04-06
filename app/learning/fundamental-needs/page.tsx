import Image from 'next/image'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const stripeHref = 'https://buy.stripe.com/28E9AV2vK3CMe3dec12cg1f'
const price = '$68'

const charts = [
  { number: '00', name: 'Overview', desc: 'The Fundamental Needs of Humans — what they are and why every civilization has addressed them.' },
  { number: '01', name: 'Food', desc: 'Farming, foraging, fishing, and food preparation across six continents and thousands of years.' },
  { number: '02', name: 'Shelter', desc: 'From stilt houses in Borneo to earthen homes in Mali — how humans have built for place and climate.' },
  { number: '03', name: 'Clothing', desc: 'Textiles, fibers, and adornment traditions from the Andes to the Arctic.' },
  { number: '04', name: 'Defense', desc: 'How communities have protected themselves — from architecture to diplomacy to social organization.' },
  { number: '05', name: 'Transportation', desc: 'Canoes, caravans, roads, and the technologies of movement across land, sea, and ice.' },
  { number: '06', name: 'Art and Music', desc: 'Indigenous, African, Asian, and SWANA artistic traditions — beauty as a universal human need.' },
  { number: '07', name: 'Religion and Spirituality', desc: 'The full range of human spiritual practice and the meaning-making that connects all cultures.' },
  { number: '08', name: 'Communication', desc: 'Writing systems, oral traditions, and forms of expression most chart sets ignore entirely.' },
  { number: '09', name: 'Self-Adornment', desc: 'Body art, jewelry, and ornamentation as identity, culture, and communication across civilizations.' },
  { number: '10', name: 'Love and Community', desc: 'The structures humans build for connection — kinship, ritual, celebration, and belonging.' },
  { number: '11', name: 'Health and Healing', desc: 'Ayurvedic medicine, Indigenous plant knowledge, and healing traditions beyond Western biomedicine.' },
  { number: '12', name: 'Education', desc: 'How humans have transmitted knowledge across generations — formal and informal, oral and written.' },
]

export default function FundamentalNeedsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">MMG Learning</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            Every civilization. Every continent. One shared humanity.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-12">
            Thirteen impressionistic charts that finally show children the full, global story of
            how humans meet their fundamental needs. Built for equity-centered Montessori classrooms.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={stripeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block font-medium"
            >
              Get the Complete Set — {price}
            </a>
            <a
              href="#charts"
              className="border border-white text-white text-sm px-8 py-4 tracking-wide hover:bg-white hover:text-[#0e1a7a] transition-colors inline-block"
            >
              Preview the Charts
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Work</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              The materials we inherited were incomplete. Now they are not.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              Every child deserves to see themselves in the story of humanity. These thirteen
              impressionistic charts bring the Fundamental Needs of Humans to life through globally
              diverse cultural examples, moving beyond the Eurocentric defaults that have shaped
              Montessori materials for decades.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              Each chart features seven carefully researched cultural examples spanning six continents
              and thousands of years of human ingenuity — from the stilt houses of Borneo to the oral
              storytelling traditions of West Africa, from Ayurvedic healing in South Asia to the
              quipu record-keeping of the Inca Empire.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              These charts are not decorative. They are pedagogical tools designed to spark the kind
              of wonder and questioning that cosmic education demands. When a child sees that people
              in every part of the world found brilliant, distinct ways to meet the same universal
              needs, something shifts. That is the work.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-[#E2DDD6] px-6 py-5">
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">What&apos;s Included</p>
              <ul className="space-y-3">
                {[
                  '13 high-resolution PDF charts, print-ready at poster size',
                  'Overview chart introducing the full scope of fundamental needs',
                  'One chart per need — all twelve Montessori fundamental needs covered',
                  'Seven diverse cultural examples per chart, spanning six continents',
                  'Original impressionistic illustrations on clean white backgrounds',
                  'Painterly style honoring the Montessori tradition of beautiful materials',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5 text-xs">—</span>
                    <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-[#E2DDD6] px-6 py-5">
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-2">Built By</p>
              <p className="text-[#374151] text-sm leading-relaxed">
                A Montessori educator with 25 years of experience across independent, public,
                charter, and justice-centered schools. These charts exist because the materials
                we inherited were incomplete.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Preview */}
      <section id="charts" className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-4">
              From the Set
            </p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Art and Music — a sample chart.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Indigenous, African, Asian, and SWANA artistic traditions — beauty as a universal
              human need. This chart is one of thirteen in the complete set.
            </p>
          </div>

          <div className="max-w-2xl">
            <div className="shadow-2xl border border-[#D4CEC6]">
              <Image
                src="/learning/fundamental-needs/fn-chart-art-music.png"
                alt="Art and Music — Fundamental Needs Impressionistic Chart"
                width={612}
                height={792}
                className="w-full h-auto block"
              />
            </div>
            <p className="mt-4 text-[#64748B] text-xs tracking-[0.1em] uppercase">
              Chart 06 — Art and Music · Fundamental Needs of Humans Chart Set
            </p>
          </div>
        </div>
      </section>

      {/* All 13 Charts */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-4">The Complete Set</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Thirteen charts. Every fundamental need.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {charts.map((chart) => (
              <div key={chart.number} className="bg-white border border-[#E2DDD6] px-6 py-5">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[#8A6014] text-xs tracking-[0.15em] font-semibold flex-shrink-0">
                    {chart.number}
                  </span>
                  <div className="flex-1 h-px bg-[#E2DDD6]" />
                </div>
                <h3 className="text-[#0e1a7a] text-base font-semibold mb-2" style={serif}>
                  {chart.name}
                </h3>
                <p className="text-[#374151] text-xs leading-relaxed">{chart.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Pricing</p>
            <h2 className="text-3xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              One set. Every classroom.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-8">
              Purchase the complete set for your classroom, or license for your whole school or
              training program. All charts are downloadable immediately after purchase.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { label: 'Complete Set', sub: '13 charts — personal classroom use', price: '$68', highlight: true, href: stripeHref },
                { label: 'Individual Chart', sub: 'Any single chart', price: '$8', highlight: false, href: null },
                { label: 'School Site License', sub: 'Full set, one campus, unlimited classrooms', price: '$175', highlight: false, href: null },
                { label: 'Training Program License', sub: 'Full set, one training center, enrolled students', price: '$325', highlight: false, href: null },
              ].map((tier) => (
                <div
                  key={tier.label}
                  className={`flex items-center justify-between px-5 py-4 bg-white ${tier.highlight ? 'border-2 border-[#d6a758]' : 'border border-[#E2DDD6]'}`}
                >
                  <div>
                    <p className="text-[#374151] text-sm font-medium">{tier.label}</p>
                    <p className="text-[#64748B] text-xs">{tier.sub}</p>
                  </div>
                  <p className="text-[#0e1a7a] text-xl font-semibold" style={serif}>{tier.price}</p>
                </div>
              ))}
            </div>

            <p className="text-[#64748B] text-xs leading-relaxed mb-2">
              Individual chart and license purchases — email{' '}
              <a href="mailto:hannah@montessorimakers.org" className="text-[#0e1a7a] underline hover:no-underline">
                hannah@montessorimakers.org
              </a>
              .
            </p>
          </div>

          <div className="bg-[#0e1a7a] px-8 py-10">
            <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-4">
              Complete Set
            </p>
            <p className="text-white text-4xl font-semibold mb-2" style={serif}>{price}</p>
            <p className="text-[#94A3B8] text-sm mb-8">13 charts · Instant download · Personal classroom use</p>

            <ul className="space-y-3 mb-10">
              {[
                '13 high-resolution PDF charts',
                'Print-ready at poster size',
                'Overview + all twelve fundamental needs',
                '7 global cultural examples per chart',
                'Licensed for your classroom',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#d6a758] flex-shrink-0 mt-0.5 text-xs">—</span>
                  <span className="text-[#94A3B8] text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={stripeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium text-center"
            >
              Get the Complete Set — {price}
            </a>
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <section className="bg-[#FAF9F7] py-12 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/learning"
            className="text-[#64748B] text-xs tracking-wide hover:text-[#0e1a7a] transition-colors"
          >
            ← Back to MMG Learning
          </Link>
          <p className="text-[#64748B] text-xs">
            Questions?{' '}
            <a href="mailto:hannah@montessorimakers.org" className="text-[#0e1a7a] underline hover:no-underline">
              hannah@montessorimakers.org
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
