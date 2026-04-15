import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const routingCards = [
  {
    title: "I'm a school exploring the Alignment Map",
    body: "The demo request page is built for you. Request a walkthrough and we'll build the conversation around your school's systems and questions.",
    linkLabel: 'Request a Demo →',
    linkHref: '/mmap/demo',
    isAnchor: false,
  },
  {
    title: 'I have a general question',
    body: 'Use the contact form below for general questions about pricing, availability, technical requirements, or anything not covered in the platform materials.',
    linkLabel: 'Go to contact form ↓',
    linkHref: '#contact-form',
    isAnchor: true,
  },
  {
    title: "I'm interested in partnership",
    body: 'For technology partners, Montessori networks, AMI/AMS organizations, and researchers interested in the Alignment Map for research contexts.',
    linkLabel: 'Go to partnership inquiry ↓',
    linkHref: '#contact-form',
    isAnchor: true,
  },
]

const includeItems = [
  'Your school name and location (if applicable)',
  'A brief description of your question or interest',
  'The best way to reach you',
]

const moreLinks = [
  {
    title: 'Platform Tour',
    desc: 'See the system before you decide',
    href: '/mmap/tour',
  },
  {
    title: 'The Pathway',
    desc: 'Four tiers, one coherent system',
    href: '/mmap/pathway',
  },
  {
    title: 'Equity Features',
    desc: 'Equity embedded in the architecture',
    href: '/mmap/equity',
  },
  {
    title: 'About the Alignment Map',
    desc: 'What we built and why',
    href: '/mmap/about',
  },
]

export default function MMAPContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Alignment Map — Contact
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Questions, partnerships, and everything else.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              For schools with general questions about the Alignment Map, organizations interested in
              partnership, researchers studying Montessori technology, or anyone who doesn&apos;t
              fit the demo request flow.
            </p>
            <div>
              <Link
                href="/mmap/demo"
                className="inline-block bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium mb-4"
              >
                Request a Demo Instead
              </Link>
              <p className="text-[#94A3B8] text-sm">
                If you&apos;re a school exploring fit, the demo request is a better place to start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Routing Section */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Where to Start</p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-12 max-w-xl" style={serif}>
            Find the right path.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {routingCards.map((card) => (
              <div key={card.title} className="bg-white border border-[#E2DDD6] p-7">
                <h3 className="text-[#0e1a7a] font-semibold text-lg mb-3" style={serif}>
                  {card.title}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed mb-6">{card.body}</p>
                {card.isAnchor ? (
                  <a
                    href={card.linkHref}
                    className="text-[#0e1a7a] text-xs font-medium hover:underline"
                  >
                    {card.linkLabel}
                  </a>
                ) : (
                  <Link
                    href={card.linkHref}
                    className="text-[#0e1a7a] text-xs font-medium hover:underline"
                  >
                    {card.linkLabel}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Include Strip */}
      <section className="bg-[#F2EDE6] py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-8">When You Write In</p>
          <div className="grid md:grid-cols-3 gap-8">
            {includeItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                <p className="text-[#374151] text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Placeholder */}
      <section id="contact-form" className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto max-w-2xl">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Contact</p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
            Get in touch.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-10">
            Use the link below to reach our team. Include your question, school name, and the
            best way to follow up.
          </p>
          <Link
            href="/contact?source=MMAP"
            className="inline-block bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors font-medium mb-4"
          >
            Contact Our Team &rarr;
          </Link>
          <p className="text-[#64748B] text-sm mt-4">
            We typically respond within 2 business days.
          </p>
        </div>
      </section>

      {/* Secondary Links */}
      <section className="bg-white py-16 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-8">More About the Alignment Map</p>
          <div className="grid md:grid-cols-4 gap-4">
            {moreLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-[#E2DDD6] p-6 hover:border-[#0e1a7a]/30 transition-colors"
              >
                <p className="text-[#0e1a7a] text-sm font-semibold mb-1">{link.title}</p>
                <p className="text-[#64748B] text-xs leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
