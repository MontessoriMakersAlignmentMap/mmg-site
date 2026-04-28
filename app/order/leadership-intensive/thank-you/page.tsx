import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function LeadershipIntensiveThankYouPage() {
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
              Your seat is held. Thank you.
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-xl">
              Your registration for the Leadership Intensive is confirmed.
              Within 48 hours you will receive a personal welcome email with
              the full schedule, location and travel details, pre-work, and
              everything you need to prepare. The intensive is designed for
              the leader who is ready to do real work, and we will be in
              touch personally before the dates arrive.
            </p>
            <div className="bg-white/5 border border-white/10 px-6 py-5 rounded-sm max-w-xl">
              <p className="text-white text-sm leading-relaxed">
                <span className="text-[#d6a758] font-semibold">
                  Need to reach Hannah directly?
                </span>{' '}
                Email{' '}
                <a
                  href="mailto:info@montessorimakers.org"
                  className="text-[#d6a758] underline hover:text-white"
                >
                  info@montessorimakers.org
                </a>{' '}
                with any questions about logistics, accessibility, or pre-work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F2EDE6] py-14 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            Begin Now
          </p>
          <p className="text-[#374151] text-base leading-relaxed">
            The intensive asks you to come ready. While you wait for your
            welcome email, begin a short reflection on the leadership
            question you most want to bring into the room with you. Hold it
            loosely. We will work with it together.
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
              Email directly for anything you need before the intensive.
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
              Continue the Work
            </p>
            <ul className="space-y-3">
              {[
                { name: 'Institute overview', href: '/institute' },
                { name: 'Advisory engagements', href: '/advisory' },
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
