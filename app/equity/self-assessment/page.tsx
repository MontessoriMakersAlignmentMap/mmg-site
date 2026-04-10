import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function EquitySelfAssessmentPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#0e1a7a] pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/equity"
            className="text-[#94A3B8] text-xs tracking-[0.15em] uppercase hover:text-white transition-colors mb-8 inline-block"
          >
            ← Equity
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4">Self-Assessment</p>
              <h1 className="text-4xl md:text-5xl text-white leading-tight" style={serif}>
                School Equity<br className="hidden md:block" /> Self-Assessment
              </h1>
              <p className="text-[#94A3B8] text-base leading-relaxed mt-4 max-w-xl">
                A free diagnostic tool for Montessori schools to assess equity practice across admissions, curriculum, discipline, hiring, and family engagement.
              </p>
            </div>
            <a
              href="/equity-self-assessment.pdf"
              download="MMG-School-Equity-Self-Assessment.pdf"
              className="flex-shrink-0 bg-[#d6a758] text-white text-sm px-7 py-3 tracking-wide hover:bg-[#c09240] transition-colors font-medium whitespace-nowrap"
            >
              Download PDF ↓
            </a>
          </div>
        </div>
      </section>

      {/* PDF Viewer */}
      <section className="bg-[#FAF9F7] px-6 md:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="border border-[#E2DDD6] overflow-hidden" style={{ height: '85vh', minHeight: '600px' }}>
            <iframe
              src="/equity-self-assessment.pdf#toolbar=1&navpanes=0&scrollbar=1"
              className="w-full h-full"
              title="MMG School Equity Self-Assessment"
            />
          </div>
          <p className="text-[#94a3b8] text-xs mt-3 text-center">
            Use your browser&apos;s zoom controls to resize. Having trouble viewing?{' '}
            <a href="/equity-self-assessment.pdf" download className="underline hover:text-[#64748B]">
              Download the PDF directly.
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
