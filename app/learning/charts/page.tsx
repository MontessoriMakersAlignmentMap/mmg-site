import Image from 'next/image'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const sets = [
  {
    eyebrow: 'Origins Series',
    name: 'The Great Lessons: Impressionistic Chart Sets',
    desc: 'Five complete chart sets — one per Great Story. Each set reconstructs the original Montessori lesson with current science and globally representative cultural examples. Charts span particle formation, the emergence of life, human origins, global writing systems, and the full history of mathematics.',
    details: [
      '65 charts across five stories',
      '13–14 charts per suite',
      'Story PDF + facilitation guide included with each suite',
      'Sold individually ($110/suite) or as a complete bundle ($475)',
    ],
    cta: 'Shop Origins Series',
    href: '/learning/origins',
    suites: [
      'Origins of the Universe',
      'Origins of Life',
      'Origins of Humanity',
      'Origins of Writing',
      'Origins of Mathematics',
    ],
    available: true,
  },
  {
    eyebrow: 'Fundamental Needs',
    name: 'Fundamental Needs of Humans: Impressionistic Chart Set',
    desc: 'Thirteen charts covering all twelve fundamental needs — Food, Shelter, Clothing, Defense, Transportation, Art and Music, Religion and Spirituality, Communication, Self-Adornment, Love and Community, Health and Healing, and Education. Each chart features seven culturally diverse examples spanning six continents.',
    details: [
      '13 high-resolution PDF charts',
      'Seven global cultural examples per chart',
      'Print-ready at poster size',
      'Complete set $68 · Individual chart $8',
    ],
    cta: 'Shop Fundamental Needs',
    href: '/learning/fundamental-needs',
    suites: [
      'Overview',
      'Food',
      'Shelter',
      'Clothing',
      'Defense',
      'Transportation',
      'Art and Music',
      'Religion and Spirituality',
      'Communication',
      'Self-Adornment',
      'Love and Community',
      'Health and Healing',
      'Education',
    ],
    available: true,
  },
]

export default function ChartSetsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">MMG Learning</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            Impressionistic chart sets for equity-centered Montessori classrooms.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed">
            Globally representative, pedagogically rigorous, beautifully illustrated.
            Every chart set is built to show children the full breadth of human contribution —
            not a Eurocentric default.
          </p>
        </div>
      </section>

      {/* Chart Sets */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {sets.map((set, i) => (
            <div
              key={set.href}
              className={`border border-[#E2DDD6] flex flex-col md:flex-row overflow-hidden ${i % 2 === 0 ? 'bg-white' : 'bg-[#F2EDE6]'}`}
            >
              <div className="flex-1 p-8 md:p-12">
                <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-4">
                  {set.eyebrow}
                </p>
                <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
                  {set.name}
                </h2>
                <p className="text-[#374151] text-base leading-relaxed mb-6">{set.desc}</p>

                <ul className="space-y-2 mb-8">
                  {set.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="text-[#8A6014] flex-shrink-0 mt-0.5 text-xs">—</span>
                      <span className="text-[#374151] text-sm">{d}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={set.href}
                  className="inline-block bg-[#d6a758] text-white text-sm px-8 py-3.5 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
                >
                  {set.cta} →
                </Link>
              </div>

              <div className="md:w-72 lg:w-80 flex-shrink-0 border-t md:border-t-0 md:border-l border-[#E2DDD6] p-8 md:p-10">
                <p className="text-[#64748B] text-[10px] tracking-[0.15em] uppercase mb-4">
                  In this set
                </p>
                <ul className="space-y-2">
                  {set.suites.map((s, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <span className="text-[#8A6014] text-[10px] tracking-[0.1em] w-5 flex-shrink-0">
                        {String(j).padStart(2, '0')}
                      </span>
                      <span className="text-[#374151] text-xs">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer nav */}
      <section className="bg-[#F2EDE6] py-12 px-6 md:px-10 border-t border-[#E2DDD6]">
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
