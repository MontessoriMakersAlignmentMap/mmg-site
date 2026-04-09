import Link from 'next/link'
import Image from 'next/image'

const serif = { fontFamily: 'var(--font-heading)' }

const products = [
  // ── Culture & Adult Development ──────────────────────────────────────────
  {
    name: 'Adult Culture Framework',
    category: 'Culture & Adult Development',
    slug: 'adult-culture-framework',
    image: '/images/toolbox/adult-culture-framework.png',
    price: '$695',
    docs: '55-page field guide + supporting tools',
    desc: 'A principled architecture for the adult culture of your school. Replaces informal norms and reactive conflict with coherent, Montessori-aligned structures for how adults lead, communicate, and hold one another accountable.',
    stripeHref: 'https://buy.stripe.com/bJe28t1rGc9i1gr9VL2cg0N',
  },
  {
    name: 'Conflict & Feedback Protocol',
    category: 'Culture & Adult Development',
    slug: 'conflict-feedback-protocol',
    image: '/images/toolbox/conflict-feedback-protocol.png',
    price: '$210',
    docs: '26-page protocol + tools',
    desc: 'An equity-centered system for navigating conflict and delivering feedback in Montessori schools — tiered, documented, and built for the real complexity of adult professional relationships.',
    stripeHref: 'https://buy.stripe.com/dRm28tdaoa1a5wH6Jz2cg0O',
  },
  {
    name: 'Year-Long PD Planning Template',
    category: 'Culture & Adult Development',
    slug: 'year-long-planner',
    image: '/images/toolbox/year-long-planner.png',
    price: '$197',
    docs: 'Editable Excel workbook · 5 tabs',
    desc: 'A full-year professional development planning workbook with suggested weekly topics, differentiated tracks for guides and assistants, and a Beginning of Year tab for in-service planning. Editable in Excel or Google Sheets.',
    stripeHref: 'https://buy.stripe.com/5kQ3cx9Yc4GQbV5aZP2cg0X',
  },
  // ── Leadership & Organizational Systems ─────────────────────────────────
  {
    name: 'Montessori Leadership Operations Playbook',
    category: 'Leadership & Organizational Systems',
    slug: 'leadership-operations-playbook',
    image: '/images/toolbox/montessori-leadership-operations-playbook.png',
    price: '$595',
    docs: '65-page playbook',
    desc: 'The operating infrastructure for a functioning Montessori leadership team. Meeting rhythms, decision protocols, delegation frameworks, and accountability systems built to reduce friction and bring clarity.',
    stripeHref: 'https://buy.stripe.com/bJefZj6M0flu6ALec12cg0I',
  },
  {
    name: 'Montessori Hiring & Selection Toolkit',
    category: 'Leadership & Organizational Systems',
    slug: 'hiring-selection-toolkit',
    image: '/images/toolbox/hiring-selection-toolkit.png',
    price: '$450',
    docs: '26-page toolkit',
    desc: 'Equitable, philosophy-aligned hiring from job description through offer letter. Structured to find candidates who align with your mission and values &mdash; not just your credential list.',
    stripeHref: 'https://buy.stripe.com/8x2cN72vK5KUcZ9fg52cg0J',
  },
  {
    name: 'Leadership Transition & Succession Toolkit',
    category: 'Leadership & Organizational Systems',
    slug: 'leadership-transition-toolkit',
    image: '/images/toolbox/leadership-transition-succession-toolkit.png',
    price: '$425',
    docs: '64-page toolkit',
    desc: 'When a leader leaves, schools lose more than a person. This toolkit structures the transition before, during, and after &mdash; protecting institutional memory and keeping the school stable through change.',
    stripeHref: 'https://buy.stripe.com/8x25kF5HWc9i5wHc3T2cg0K',
  },
  {
    name: 'Performance Concerns & Separation Toolkit',
    category: 'Leadership & Organizational Systems',
    slug: 'performance-separation-toolkit',
    image: '/images/toolbox/performance-concerns-separation-toolkit.png',
    price: '$395',
    docs: '112-page toolkit',
    desc: 'Structured, dignified, and legally sound processes for managing performance concerns through to separation when needed. For the conversations no one prepares you for.',
    stripeHref: 'https://buy.stripe.com/bJedRb4DS8X61grc3T2cg0L',
  },
  // ── Governance & Community ───────────────────────────────────────────────
  {
    name: 'Board Onboarding & Alignment Toolkit',
    category: 'Governance & Community',
    slug: 'board-onboarding-toolkit',
    image: '/images/toolbox/board-onboarding-alignment-toolkit.png',
    price: '$325',
    docs: '61-page toolkit',
    desc: 'Builds shared understanding of roles, culture, and expectations from the first board meeting. So new members can contribute from day one and governance stays strong over time.',
    stripeHref: 'https://buy.stripe.com/fZubJ33zOehqe3dec12cg0M',
  },
  {
    name: 'Montessori Staff Handbook Toolkit',
    category: 'Governance & Community',
    slug: 'staff-handbook',
    image: '/images/toolbox/staff-handbook.png',
    price: '$297',
    docs: '234-page editable template',
    desc: 'A full editable staff handbook covering policies, culture, expectations, and procedures &mdash; written with Montessori adult culture in mind. Ready to adapt and implement.',
    stripeHref: 'https://buy.stripe.com/14AaEZ3zO7T2f7hec12cg0G',
  },
  {
    name: 'Montessori Family Handbook',
    category: 'Governance & Community',
    slug: 'family-handbook',
    image: '/images/toolbox/family-handbook.png',
    price: '$197',
    docs: '72-page editable template',
    desc: 'A comprehensive, editable family handbook built specifically for Montessori schools. Reflects your philosophy and community &mdash; not a generic school district template adapted to fit.',
    stripeHref: 'https://buy.stripe.com/6oU4gB1rG1uEbV51pf2cg0H',
  },
]

const categories = [
  'Culture & Adult Development',
  'Leadership & Organizational Systems',
  'Governance & Community',
]

const categoryHeadlines: Record<string, string> = {
  'Culture & Adult Development': 'Building the people and practices that make a school work',
  'Leadership & Organizational Systems': 'Infrastructure for how leaders lead and organizations run',
  'Governance & Community': 'Board, staff, and family-facing tools',
}

const freeResources = [
  {
    name: 'Growing Your Montessori School',
    file: '/free-resources/growing-your-montessori-school.pdf',
    desc: 'Enrollment growth strategy, expansion planning, staffing for scale, and the organizational questions schools often skip in the rush to grow.',
    audience: 'Heads of school, boards, and leadership teams',
  },
  {
    name: 'Fundraising for Montessori Schools',
    file: '/free-resources/fundraising-for-montessori-schools.pdf',
    desc: 'Build a fundraising culture that reflects Montessori values &mdash; case for support, donor communication, annual fund strategy, and mission-aligned development.',
    audience: 'Development leads, heads of school, and boards',
  },
  {
    name: 'Creating Strong Financial Structures',
    file: '/free-resources/creating-strong-financial-structures.pdf',
    desc: 'Budget development, financial reporting, reserve policy, and cash flow planning. Practical and non-jargon &mdash; designed for leaders who didn&apos;t come from finance.',
    audience: 'Heads of school, business managers, and boards',
  },
]

const faqs = [
  {
    q: 'Are these templates or finished documents?',
    a: 'These are editable, implementation-ready templates &mdash; not locked PDFs. Every product comes with a Word or Google Docs editable version designed to be adapted to your school&apos;s voice and context.',
  },
  {
    q: 'Do I need to be working with Montessori Makers Advisory to use these?',
    a: 'No. Each tool is designed to stand alone. That said, schools working with Advisory often use these as implementation resources during engagements.',
  },
  {
    q: 'Are these appropriate for all Montessori schools?',
    a: 'Yes &mdash; public, independent, and charter. The tools are built around Montessori organizational values, not a specific AMI or AMS framework.',
  },
  {
    q: 'What format do the files come in?',
    a: 'Products are delivered as PDF + editable Word/Google Docs files. You receive download access immediately after purchase.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'Because these are digital downloads, all sales are final. If you have questions about whether a product is right for your school, reach out before purchasing.',
  },
]

export default function StorePage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Toolbox Store
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-8"
              style={serif}
            >
              The full toolkit library.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              Downloadable resources for school leaders &mdash; frameworks, handbooks, governance
              tools, and leadership systems. Built for Montessori schools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#catalog"
                className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Browse the Catalog
              </a>
              <Link
                href="/toolbox/free-resources"
                className="border border-white/30 text-white text-[13px] px-8 py-4 tracking-[0.07em] hover:border-white/60 hover:bg-white/5 transition-colors text-center"
              >
                Free Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CATALOG ───────────────────────────────────────────────────── */}
      <section id="catalog" className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-24">
          {categories.map((category) => {
            const categoryProducts = products.filter((p) => p.category === category)
            return (
              <div key={category}>
                <div className="mb-12">
                  <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-3">
                    {category}
                  </p>
                  <h2
                    className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight tracking-tight"
                    style={serif}
                  >
                    {categoryHeadlines[category]}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {categoryProducts.map((p) => (
                    <div
                      key={p.slug}
                      className="bg-white border border-[#E2DDD6] flex flex-col hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(14,26,122,0.12)] transition-all duration-200"
                    >
                      <div className="p-8 flex flex-col flex-1">
                        {/* Header: category+title left, small thumbnail right */}
                        <div className="flex items-start gap-5 mb-5">
                          <div className="flex-1 min-w-0">
                            <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-2">
                              {p.category}
                            </p>
                            <h3
                              className="text-[#0e1a7a] text-xl font-semibold leading-snug"
                              style={serif}
                            >
                              {p.name}
                            </h3>
                          </div>
                          <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden shadow-sm">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              className="object-cover object-top"
                              sizes="64px"
                            />
                          </div>
                        </div>

                        <p className="text-[#374151] text-sm leading-relaxed mb-4 flex-1">
                          {p.desc}
                        </p>

                        <p className="text-[#64748B] text-xs mb-5">{p.docs}</p>

                        <div className="flex items-center justify-between pt-5 border-t border-[#E2DDD6]">
                          <p
                            className="text-[#0e1a7a] text-2xl font-semibold tracking-tight"
                            style={serif}
                          >
                            {p.price}
                          </p>
                          <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-3">
                              <Link
                                href={`/toolbox/${p.slug}`}
                                className="border border-[#0e1a7a] text-[#0e1a7a] text-[11px] px-4 py-2 tracking-[0.07em] hover:bg-[#0e1a7a] hover:text-white transition-colors font-medium"
                              >
                                Learn More
                              </Link>
                              <a
                                href={p.stripeHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#d6a758] text-white text-[11px] px-4 py-2 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium"
                              >
                                Buy Now
                              </a>
                            </div>
                            <p className="text-[#94A3B8] text-[9px]">Digital toolkit. Immediate download after purchase.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 3. FREE RESOURCES ────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Free Downloads
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-4"
              style={serif}
            >
              No purchase required.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Three free guides built with the same rigor behind every paid tool.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {freeResources.map((r) => (
              <div
                key={r.name}
                className="bg-white border border-[#E2DDD6] p-8 flex flex-col"
              >
                <h3
                  className="text-[#0e1a7a] text-lg font-semibold mb-3 leading-snug"
                  style={serif}
                >
                  {r.name}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed mb-3 flex-1">
                  {r.desc}
                </p>
                <p className="text-[#64748B] text-xs mb-6">For: {r.audience}</p>
                <a
                  href={r.file}
                  download
                  className="bg-[#d6a758] text-white text-[12px] px-5 py-2.5 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium self-start"
                >
                  Download Free
                </a>
              </div>
            ))}
          </div>

          <Link
            href="/toolbox/free-resources"
            className="text-[#0e1a7a] text-sm font-medium hover:underline"
          >
            See all free resources &rarr;
          </Link>
        </div>
      </section>

      {/* ── 4. FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Questions
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight"
              style={serif}
            >
              Common questions about Toolbox.
            </h2>
          </div>

          <div className="max-w-3xl divide-y divide-[#E2DDD6]">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-8">
                <p
                  className="text-[#0e1a7a] font-semibold text-base mb-3"
                  dangerouslySetInnerHTML={{ __html: faq.q }}
                />
                <p
                  className="text-[#374151] text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.a }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. BOTTOM CTA ────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4"
            style={serif}
          >
            Not sure which tool fits?
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Start with a conversation. Advisory can help identify which tools support the work
            your school is doing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/advisory"
              className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium"
            >
              Explore Advisory &rarr;
            </Link>
            <Link
              href="/toolbox/free-resources"
              className="border border-white/30 text-white text-[13px] px-8 py-4 tracking-[0.07em] hover:border-white/60 hover:bg-white/5 transition-colors text-center"
            >
              Browse Free Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
