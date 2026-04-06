import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function FundamentalNeedsThankYouPage() {
  return (
    <section className="bg-[#FAF9F7] min-h-screen py-32 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-4">
          Fundamental Needs of Humans — Complete Chart Set
        </p>
        <h1
          className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6"
          style={serif}
        >
          Your download is ready.
        </h1>
        <p className="text-[#374151] text-lg leading-relaxed mb-12">
          All 13 impressionistic charts are included in the zip below — the overview chart
          plus one chart for each of the twelve fundamental needs.
        </p>

        <div className="bg-white border border-[#E2DDD6] flex items-center justify-between px-6 py-5 gap-6 mb-16">
          <div>
            <p className="text-[#0e1a7a] font-medium text-sm" style={serif}>
              Fundamental Needs of Humans: Complete Chart Set
            </p>
            <p className="text-[#64748B] text-xs mt-0.5">
              Overview + 12 fundamental needs charts — 13 PDFs total
            </p>
          </div>
          <a
            href="/toolbox-files/fundamental-needs-charts.zip"
            download
            className="bg-[#0e1a7a] text-white text-xs px-5 py-2.5 tracking-wide hover:bg-[#1a2b8a] transition-colors font-medium whitespace-nowrap flex-shrink-0"
          >
            Download →
          </a>
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
          . Charts are updated when new content or corrections warrant revision —
          purchasers receive updates at no additional cost.
        </p>

        <div className="mt-12 pt-8 border-t border-[#E2DDD6]">
          <Link
            href="/learning/fundamental-needs"
            className="text-[#64748B] text-xs tracking-wide hover:text-[#0e1a7a] transition-colors"
          >
            ← Back to Fundamental Needs
          </Link>
        </div>
      </div>
    </section>
  )
}
