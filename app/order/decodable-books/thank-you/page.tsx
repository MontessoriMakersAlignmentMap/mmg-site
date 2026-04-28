import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function DecodableBooksThankYouPage() {
  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Montessori Makers Learning
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={serif}
            >
              Order received. Thank you.
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-xl">
              Your decodable books are on their way. Print and ship typically
              takes 5 to 7 business days, plus shipping time. You will receive
              a confirmation email with tracking information once your order
              ships.
            </p>
            <div className="bg-white/5 border border-white/10 px-6 py-5 rounded-sm max-w-xl">
              <p className="text-white text-sm leading-relaxed">
                <span className="text-[#d6a758] font-semibold">
                  Did you forget to add a shipping address?
                </span>{' '}
                Reply to your Stripe receipt or email{' '}
                <a
                  href="mailto:info@montessorimakers.org"
                  className="text-[#d6a758] underline hover:text-white"
                >
                  info@montessorimakers.org
                </a>{' '}
                with your name and ship-to address. We will not begin printing
                until we have a confirmed address.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F2EDE6] py-14 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            While You Wait
          </p>
          <p className="text-[#374151] text-base leading-relaxed">
            The decodable books are designed to pair with the Montessori
            phonics sequence. While you wait for your books, the free
            sight-word title list and accompanying research notes are
            available for download below.
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
              For shipping address changes, order questions, or any other
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
              Related Resources
            </p>
            <ul className="space-y-3">
              {[
                {
                  name: 'Free sight-word title list',
                  href: '/decodable-books-title-sight-word-list.pdf',
                },
                {
                  name: 'Reading research notes',
                  href: '/learning/decodable-books/research',
                },
                {
                  name: 'Browse all Montessori Makers Learning',
                  href: '/learning',
                },
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
