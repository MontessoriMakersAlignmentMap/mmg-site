import Link from 'next/link'
const serif = { fontFamily: 'var(--font-heading)' }
export default function EquityAuditThankYouPage() {
  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">Montessori Makers Toolbox</p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6" style={serif}>
              Thank you for your purchase.
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-xl">
              Your Equity Audit: Toolbox Edition is ready. Click below to download the 48-page PDF.
            </p>
            <a href="/toolbox-downloads/equity-audit-toolbox.pdf"
              download="MMG-Equity-Audit-Toolbox-Edition.pdf"
              className="inline-block bg-[#d6a758] text-white text-[13px] px-12 py-5 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium mb-4">
              Download Your Audit &rarr;
            </a>
            <p className="text-[#64748B] text-sm">PDF &mdash; 48 pages, 38 diagnostic questions across 4 domains</p>
          </div>
        </div>
      </section>
      <section className="bg-[#F2EDE6] py-14 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">Before You Begin</p>
          <p className="text-[#374151] text-base leading-relaxed">
            Read the introduction and the seven-step process before assigning the diagnostic. Decide who is in the
            room. Confirm a facilitator who is not the head of school. Communicate the three commitments to the team
            before anyone opens the instrument: honest answers will not result in punitive consequences, the purpose
            is to look honestly, the head of school will be quiet when others have a closer view. The diagnostic
            depends on these conditions to produce useful evidence.
          </p>
        </div>
      </section>
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-5">Questions or Issues</p>
            <p className="text-[#374151] text-base leading-relaxed mb-5">
              If your download didn&rsquo;t work, or if your team completes the audit and decides you need outside
              support to take the next step, reach out directly.
            </p>
            <a href="mailto:info@montessorimakers.org" className="text-[#0e1a7a] font-semibold text-sm hover:underline">
              info@montessorimakers.org
            </a>
          </div>
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-5">Related Pathways</p>
            <ul className="space-y-3">
              {[
                { name: 'Facilitated Equity Audit (Advisory)', href: '/advisory/equity-audit' },
                { name: 'Adult Culture Framework', href: '/toolbox/adult-culture-framework' },
                { name: 'Conflict & Feedback Protocol', href: '/toolbox/conflict-feedback-protocol' },
                { name: 'Browse the full Toolbox', href: '/toolbox/store' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[#0e1a7a] text-sm font-medium hover:underline">
                    {item.name} &rarr;
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
