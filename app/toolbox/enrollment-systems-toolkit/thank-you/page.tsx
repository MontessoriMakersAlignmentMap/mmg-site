import Link from 'next/link'
const serif = { fontFamily: 'var(--font-heading)' }
export default function EnrollmentSystemsThankYouPage() {
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
              Your Enrollment Systems Toolkit is ready. Click below to download the toolkit.
            </p>
            <a href="/toolbox-downloads/enrollment-systems-toolkit.docx"
              download="MMG-Enrollment-Systems-Toolkit.docx"
              className="inline-block bg-[#d6a758] text-white text-[13px] px-12 py-5 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium mb-4">
              Download Your Toolkit &rarr;
            </a>
            <p className="text-[#64748B] text-sm">.docx file &mdash; opens in Word or Google Docs</p>
          </div>
        </div>
      </section>
      <section className="bg-[#F2EDE6] py-14 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">Getting Started</p>
          <p className="text-[#374151] text-base leading-relaxed">
            Start with the Enrollment Process Map before touching any individual component. Understanding the full
            pipeline determines which documents to implement first. Schools with inquiry volume problems start with
            the Inquiry Management Protocol; schools losing re-enrollments start at the end of the pipeline.
          </p>
        </div>
      </section>
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-5">Questions or Issues</p>
            <p className="text-[#374151] text-base leading-relaxed mb-5">
              If your download didn&rsquo;t work or you have questions, reach out directly.
            </p>
            <a href="mailto:info@montessorimakers.org" className="text-[#0e1a7a] font-semibold text-sm hover:underline">
              info@montessorimakers.org
            </a>
          </div>
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-5">Related Toolbox Resources</p>
            <ul className="space-y-3">
              {[
                { name: 'Annual Cycle Planning Toolkit', href: '/toolbox/annual-cycle-planning-toolkit' },
                { name: 'Montessori Family Handbook', href: '/toolbox/family-handbook' },
                { name: 'Leadership Operations Playbook', href: '/toolbox/leadership-operations-playbook' },
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
