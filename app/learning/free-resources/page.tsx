import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const freeResources = [
  {
    category: 'Literacy',
    title: 'Phonics Sequence Reference Guide',
    desc: 'A one-page reference mapping the Montessori reading materials sequence to the corresponding decodable text levels. For guides setting up a reading program or explaining the sequence to families.',
    for: 'Primary guides and literacy leads',
    format: 'PDF download',
    file: '/free-resources/phonics-sequence-reference-guide.pdf',
  },
  {
    category: 'Literacy',
    title: 'Reading Assessment Observation Checklist',
    desc: 'A printable checklist for documenting phonics skill development during individual reading conferences. Complements — but does not replace — the full Reading Assessment Hub.',
    for: 'Primary classroom guides',
    format: 'PDF download',
    file: '/free-resources/reading-assessment-observation-checklist.pdf',
  },
  {
    category: 'Curriculum',
    title: 'Origins Series: Sample Lesson Excerpt',
    desc: 'A sample excerpt from the Origins of the Universe suite, including the narrative guide opening and one visual anchor card. Shows the format, tone, and depth of the full lesson reconstructions.',
    for: 'Elementary guides evaluating the Origins Series',
    format: 'PDF download',
    file: '/free-resources/origins-series-sample-excerpt.pdf',
  },
  {
    category: 'Curriculum',
    title: 'Great Lessons Audit Worksheet',
    desc: 'A structured worksheet for evaluating your current Great Lessons presentations against current science and justice-centered criteria. Helps identify where existing materials need updating.',
    for: 'Elementary guides and curriculum coordinators',
    format: 'PDF worksheet',
    file: '/free-resources/great-lessons-audit-worksheet.pdf',
  },
  {
    category: 'Professional Development',
    title: 'Science of Reading: What Every Montessori Guide Needs to Know',
    desc: 'A concise reading covering the current state of reading science and its specific implications for Montessori guides — without requiring background in cognitive psychology or linguistics.',
    for: 'All Montessori guides working with reading materials',
    format: 'PDF reading (12 pages)',
    file: '/free-resources/science-of-reading-montessori-guide.pdf',
  },
  {
    category: 'Professional Development',
    title: 'Justice in Montessori: A Starting Framework',
    desc: 'A practical framework for evaluating and improving the justice dimensions of Montessori curriculum and materials. Not a checklist — a way of thinking.',
    for: 'Guides, curriculum leads, and school directors',
    format: 'PDF guide',
    file: '/free-resources/justice-in-montessori-starting-framework.pdf',
  },
]

const categories = ['Literacy', 'Curriculum', 'Professional Development']

export default function LearningFreeResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-20 pb-16 md:pt-24 md:pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-6">
              Free Resources
            </p>
            <h1
              className="text-4xl md:text-5xl text-white leading-[1.07] tracking-tight mb-6"
              style={serif}
            >
              Tools and resources. Available now.
            </h1>
            <p className="text-[#94A3B8] text-base leading-relaxed max-w-xl">
              Free educator resources reflecting the same commitments as every paid Montessori Makers Learning
              product &mdash; Montessori philosophy, modern research, and justice. No email required.
            </p>
          </div>
        </div>
      </section>

      {/* Resources by Category */}
      {categories.map((cat, ci) => {
        const catResources = freeResources.filter((r) => r.category === cat)
        return (
          <section
            key={cat}
            className={`${ci % 2 === 0 ? 'bg-[#FAF9F7]' : 'bg-white'} py-16 px-6 md:px-10 border-t border-[#E2DDD6]`}
          >
            <div className="max-w-7xl mx-auto">
              <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-8">{cat}</p>
              <div className="grid md:grid-cols-2 gap-5">
                {catResources.map((resource) => (
                  <div
                    key={resource.title}
                    className="bg-white border border-[#E2DDD6] p-7 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,26,122,0.07)] transition-all duration-200"
                  >
                    <div>
                      <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-2">
                        {resource.format}
                      </p>
                      <h3
                        className="text-[#0e1a7a] font-semibold text-base leading-snug"
                        style={serif}
                      >
                        {resource.title}
                      </h3>
                    </div>
                    <p className="text-[#374151] text-sm leading-relaxed flex-1">
                      {resource.desc}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#F2EDE6]">
                      <p className="text-[#64748B] text-xs">For: {resource.for}</p>
                      <a
                        href={resource.file}
                        download
                        className="text-[#0e1a7a] text-xs font-medium hover:underline tracking-wide flex-shrink-0 ml-4"
                      >
                        Download &rarr;
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Upgrade CTA */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-5">
              Ready for the Full Curriculum?
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight mb-5"
              style={serif}
            >
              These resources preview what the full products do.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              The Decodable Book Series, Origins Suites, Learning Lab courses, and Reading
              Assessment Hub are the full expression of this work. The free resources are a
              starting point.
            </p>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <Link
              href="/learning"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
            >
              Shop All Products &rarr;
            </Link>
            <Link
              href="/learning/decodable-books"
              className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
            >
              Explore Decodable Books
            </Link>
            <Link
              href="/learning/origins"
              className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
            >
              Shop Origins Series
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
