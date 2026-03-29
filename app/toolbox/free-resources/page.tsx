import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const guides = [
  {
    number: '01',
    name: 'Growing Your Montessori School',
    desc: 'Growth changes everything &mdash; and most schools discover that only after they&apos;ve started. This guide covers enrollment growth strategy, expansion planning, staffing for scale, community communication during growth phases, and the organizational questions schools often skip in the rush to grow. It treats growth not as a marketing challenge but as a leadership and systems challenge: how do you scale a Montessori community without losing what makes it work?',
    audience: 'Heads of school, boards, and leadership teams navigating enrollment increases, program expansion, or new campus development',
    format: 'Free PDF download',
    file: '/free-resources/growing-your-montessori-school.pdf',
  },
  {
    number: '02',
    name: 'Fundraising for Montessori Schools',
    desc: 'Fundraising in a Montessori school isn&apos;t just a revenue challenge &mdash; it&apos;s a culture challenge. This guide covers how to build a fundraising culture that reflects Montessori values, case for support development, donor communication, annual fund strategy, and the specific challenges of fundraising in mission-rich, resource-constrained schools. It is practical, honest about what is hard, and built for schools that want fundraising to feel like an extension of their mission &mdash; not a departure from it.',
    audience: 'Development leads, heads of school, and boards',
    format: 'Free PDF download',
    file: '/free-resources/fundraising-for-montessori-schools.pdf',
  },
  {
    number: '03',
    name: 'Creating Strong Financial Structures',
    desc: 'Financial health doesn&apos;t happen by accident &mdash; and in most Montessori schools, the people responsible for the finances didn&apos;t come from finance backgrounds. This guide covers budget development, financial reporting, reserve policy, cash flow planning, and how to build board financial literacy. It is practical, non-jargon, and designed for school leaders who need to understand and lead their financial systems without becoming accountants.',
    audience: 'Heads of school, business managers, and boards',
    format: 'Free PDF download',
    file: '/free-resources/creating-strong-financial-structures.pdf',
  },
]

export default function FreeResourcesPage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Free Resources
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-8"
              style={serif}
            >
              Start here. No cost required.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
              These free guides reflect the same commitment behind every paid tool: clarity,
              specificity, and real usefulness for Montessori school leaders. Download them, use
              them, share them.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. FREE GUIDES ───────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {guides.map((guide) => (
            <div
              key={guide.number}
              className="bg-white border border-[#E2DDD6] p-10 md:p-14"
            >
              <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
                <div>
                  <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-4">
                    Guide {guide.number}
                  </p>
                  <h2
                    className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight tracking-tight mb-6"
                    style={serif}
                  >
                    {guide.name}
                  </h2>
                  <p
                    className="text-[#374151] text-base leading-relaxed mb-6 max-w-3xl"
                    dangerouslySetInnerHTML={{ __html: guide.desc }}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 mb-2">
                    <div>
                      <p className="text-[#64748B] text-xs tracking-wide mb-1">For:</p>
                      <p className="text-[#374151] text-sm">{guide.audience}</p>
                    </div>
                    <div>
                      <p className="text-[#64748B] text-xs tracking-wide mb-1">Format:</p>
                      <p className="text-[#374151] text-sm">{guide.format}</p>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col items-start md:items-end gap-4 md:pt-2">
                  <a
                    href={guide.file}
                    download
                    className="bg-[#d6a758] text-white text-[13px] px-8 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium whitespace-nowrap"
                  >
                    Download Free
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. WHAT ELSE IS AVAILABLE ────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Need More Than a Guide?
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-4"
              style={serif}
            >
              The Toolbox has tools for every stage of the work.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              When you&apos;re ready to move from orientation to implementation, the paid toolkit
              library has what you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white border border-[#E2DDD6] p-8">
              <h3
                className="text-[#0e1a7a] text-xl font-semibold mb-3 leading-snug"
                style={serif}
              >
                Toolbox Store
              </h3>
              <p className="text-[#374151] text-base leading-relaxed mb-6">
                Browse the full library of paid toolkits for leadership, governance, hiring, and
                culture. Downloadable and editable &mdash; built for immediate implementation.
              </p>
              <Link
                href="/toolbox/store"
                className="text-[#0e1a7a] text-sm font-medium hover:underline"
              >
                Browse the Store &rarr;
              </Link>
            </div>

            <div className="bg-white border border-[#E2DDD6] p-8">
              <h3
                className="text-[#0e1a7a] text-xl font-semibold mb-3 leading-snug"
                style={serif}
              >
                Advisory
              </h3>
              <p className="text-[#374151] text-base leading-relaxed mb-6">
                Deeper advisory support for schools navigating real organizational challenges.
                Strategic partnership for leadership, culture, and systems work.
              </p>
              <Link
                href="/advisory"
                className="text-[#0e1a7a] text-sm font-medium hover:underline"
              >
                Explore Advisory &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BOTTOM CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4"
            style={serif}
          >
            Have a question about a resource?
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-md mx-auto">
            Reach out and we&apos;ll point you toward what fits your school&apos;s situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium"
            >
              Get in Touch
            </Link>
            <Link
              href="/toolbox/store"
              className="border border-white/30 text-white text-[13px] px-8 py-4 tracking-[0.07em] hover:border-white/60 hover:bg-white/5 transition-colors text-center"
            >
              Browse Paid Tools
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
