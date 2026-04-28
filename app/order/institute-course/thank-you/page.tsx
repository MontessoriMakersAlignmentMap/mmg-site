import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function InstituteCourseThankYouPage() {
  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Montessori Makers Institute
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={serif}
            >
              You are registered. Thank you.
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-xl">
              Your spot in the live Zoom course is confirmed. Within 24 hours
              you will receive a personal email with the Zoom link, the
              session schedule, and any prep materials you should review
              before the first session.
            </p>
            <div className="bg-white/5 border border-white/10 px-6 py-5 rounded-sm max-w-xl">
              <p className="text-white text-sm leading-relaxed">
                <span className="text-[#d6a758] font-semibold">
                  Have not received your Zoom link within 24 hours?
                </span>{' '}
                Email{' '}
                <a
                  href="mailto:info@montessorimakers.org"
                  className="text-[#d6a758] underline hover:text-white"
                >
                  info@montessorimakers.org
                </a>{' '}
                with the name of the course you registered for and we will
                send it directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F2EDE6] py-14 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            Before the First Session
          </p>
          <p className="text-[#374151] text-base leading-relaxed">
            Block the session time on your calendar now and protect it from
            other commitments. The live Zoom format is designed for active
            participation, not passive listening, and the value of the course
            depends on your full presence in the room.
          </p>
        </div>
      </section>

      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-5">
              Questions or Issues
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-5">
              For Zoom link questions, schedule changes, or any other
              concerns, please email directly.
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
              Explore the Institute
            </p>
            <ul className="space-y-3">
              {[
                { name: 'Other Institute courses', href: '/institute/courses' },
                { name: 'Leadership Intensive', href: '/institute/intensive' },
                { name: 'Residency program', href: '/residency' },
                { name: 'Browse the full Toolbox', href: '/toolbox/store' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#0e1a7a] text-sm font-medium hover:underline"
                  >
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
