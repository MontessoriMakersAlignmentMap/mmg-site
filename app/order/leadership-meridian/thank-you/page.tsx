import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function LeadershipMeridianThankYouPage() {
  return (
    <>
      <section className="bg-[#0a1260] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Leadership Meridian
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={serif}
            >
              You are in. Welcome.
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-xl">
              Your subscription is active. Within a few minutes you will
              receive a welcome email with your access link to the Leadership
              Meridian app. If you do not see it, check your spam folder
              first.
            </p>
            <a
              href="https://montessorimakersleadershipmeridian.com/Montessori%20Makers%20Leadership%20Meridian.html?subscription=success"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#d6a758] text-white text-[13px] px-12 py-5 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium mb-4"
            >
              Open Leadership Meridian &rarr;
            </a>
            <p className="text-white/50 text-sm">
              Sign in with the email you used to subscribe.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F2EDE6] py-14 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            Where to Begin
          </p>
          <p className="text-[#374151] text-base leading-relaxed">
            On your first session, the app will walk you through the
            grounding ritual and offer a starting protocol based on what you
            are working on. The voice reflection feature is meant for
            drive-time, walk-time, and the parking lot before a hard day.
            Use it.
          </p>
        </div>
      </section>

      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-5">
              Cannot Sign In?
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-5">
              If your access link does not work or your subscription is not
              recognized in the app, email directly and we will resolve it
              the same day.
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
              In the Same Ecosystem
            </p>
            <ul className="space-y-3">
              {[
                { name: 'About Leadership Meridian', href: '/leadership-meridian' },
                { name: 'MMAP', href: '/mmap' },
                { name: 'Field Guide', href: '/field-guide' },
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
