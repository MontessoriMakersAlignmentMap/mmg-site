import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const suites = [
  {
    slug: 'universe',
    name: 'Origins of the Universe',
    zipFile: 'origins-universe.zip',
    charts: 13,
  },
  {
    slug: 'life',
    name: 'Origins of Life',
    zipFile: 'origins-life.zip',
    charts: 13,
  },
  {
    slug: 'humanity',
    name: 'Origins of Humanity',
    zipFile: 'origins-humanity.zip',
    charts: 14,
  },
  {
    slug: 'writing',
    name: 'Origins of Writing',
    zipFile: 'origins-writing.zip',
    charts: 13,
  },
  {
    slug: 'mathematics',
    name: 'Origins of Mathematics',
    zipFile: 'origins-mathematics.zip',
    charts: 13,
  },
]

export default function BundleThankYouPage() {
  return (
    <section className="bg-[#FAF9F7] min-h-screen py-32 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-4">
          Origins Series — Complete Bundle
        </p>
        <h1
          className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6"
          style={serif}
        >
          Your download is ready.
        </h1>
        <p className="text-[#374151] text-lg leading-relaxed mb-12">
          All five suite downloads are below. Each includes the complete story and guide PDF
          plus all 13 impressionistic charts for that story. Download each suite individually.
        </p>

        <div className="space-y-3 mb-16">
          {suites.map((suite, i) => (
            <div
              key={suite.slug}
              className="bg-white border border-[#E2DDD6] flex items-center justify-between px-6 py-5 gap-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-[#8A6014] text-xs tracking-[0.15em] font-semibold flex-shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-[#0e1a7a] font-medium text-sm" style={serif}>
                    {suite.name}
                  </p>
                  <p className="text-[#64748B] text-xs mt-0.5">
                    Story PDF + {suite.charts} impressionistic charts
                  </p>
                </div>
              </div>
              <a
                href={`/toolbox-files/${suite.zipFile}`}
                download
                className="bg-[#0e1a7a] text-white text-xs px-5 py-2.5 tracking-wide hover:bg-[#1a2b8a] transition-colors font-medium whitespace-nowrap flex-shrink-0"
              >
                Download →
              </a>
            </div>
          ))}
        </div>

        <div className="bg-[#F2EDE6] border-l-4 border-[#d6a758] px-6 py-5 mb-8">
          <p className="text-[#374151] text-sm leading-relaxed">
            <span className="font-semibold text-[#0e1a7a]">Save this page.</span>{' '}
            Bookmark this URL or forward this email for future access.
            Files are available here permanently.
          </p>
        </div>

        <p className="text-[#64748B] text-xs leading-relaxed">
          Questions? Reach us at{' '}
          <a
            href="mailto:hannah@montessorimakers.org"
            className="text-[#0e1a7a] underline hover:no-underline"
          >
            hannah@montessorimakers.org
          </a>
          . Suites are updated when new scientific evidence or pedagogical guidance warrants
          revision — purchasers receive updates at no additional cost.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E2DDD6]">
          <Link
            href="/learning/origins"
            className="text-[#64748B] text-xs tracking-wide hover:text-[#0e1a7a] transition-colors"
          >
            ← Back to Origins Series
          </Link>
        </div>
      </div>
    </section>
  )
}
