import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function YearLongPlannerDownloadPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Montessori Makers Toolbox
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={serif}
            >
              Thank you for your purchase.
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-xl">
              Your Year-Long PD Planning Template is ready. Click below to download the
              Excel workbook.
            </p>

            <a
              href="/free-resources/year-long-pd-planning-template.xlsx"
              download="Year-Long-PD-Planning-Template-MMG.xlsx"
              className="inline-block bg-[#d6a758] text-white text-[13px] px-12 py-5 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium mb-4"
            >
              Download Your Template →
            </a>

            <p className="text-[#64748B] text-sm">
              .xlsx file &mdash; opens in Excel or Google Sheets
            </p>
          </div>
        </div>
      </section>

      {/* Instructions strip */}
      <section className="bg-[#F2EDE6] py-14 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto max-w-2xl">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            Getting Started
          </p>
          <div className="space-y-4 text-[#374151] text-base leading-relaxed">
            <p>
              The workbook has five tabs. Start with the <strong>Instructions</strong> tab,
              then choose the planning template that fits how your school structures PD time
              &mdash; Simple (one topic per week), Medium (two time blocks), or Full (three
              blocks across all staff groups).
            </p>
            <p>
              The <strong>Beginning of Year</strong> tab is separate from the year-long
              calendar &mdash; use it to plan your in-service week before school opens.
              Suggested topics are pre-filled throughout; replace anything that doesn&rsquo;t
              fit your school&rsquo;s context.
            </p>
          </div>
        </div>
      </section>

      {/* Support + related */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-5">
              Questions or Issues
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-5">
              If your download didn&rsquo;t work or you have questions about using the
              template, reach out directly.
            </p>
            <a
              href="mailto:info@montessorimakers.org"
              className="text-[#0e1a7a] font-semibold text-sm hover:underline"
            >
              info@montessorimakers.org
            </a>
          </div>

          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-5">
              Related Toolbox Resources
            </p>
            <ul className="space-y-3">
              {[
                { name: 'Staff Handbook Toolkit', href: '/toolbox/staff-handbook' },
                { name: 'Adult Culture Framework', href: '/toolbox/adult-culture-framework' },
                { name: 'Hiring & Selection Toolkit', href: '/toolbox/hiring-selection-toolkit' },
                { name: 'Browse the full Toolbox', href: '/toolbox/store' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#0e1a7a] text-sm font-medium hover:underline"
                  >
                    {item.name} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>
    </>
  )
}
