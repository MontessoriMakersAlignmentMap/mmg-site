import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/Logo'

const serif = { fontFamily: 'var(--font-heading)' }

type Product = {
  name: string
  slug: string
  image: string
  price: string
  docs: string
  desc: string
  audience: string
  stripeHref: string
}

const categories: { label: string; items: Product[] }[] = [
  {
    label: 'Culture & Adult Development',
    items: [
      {
        name: 'Adult Culture Framework',
        slug: 'adult-culture-framework',
        image: '/images/toolbox/adult-culture-framework.png',
        price: '$695',
        docs: '57-page field guide + supporting tools',
        desc: 'A principled architecture for the adult culture of your school. Replaces informal norms, personality-driven authority, and reactive conflict with coherent, Montessori-aligned structures for how adults lead, communicate, and hold one another accountable.',
        audience: 'Heads of school, directors, and leadership teams',
        stripeHref: 'https://buy.stripe.com/bJe28t1rGc9i1gr9VL2cg0N',
      },
      {
        name: 'Conflict & Feedback Protocol',
        slug: 'conflict-feedback-protocol',
        image: '/images/toolbox/conflict-feedback-protocol.png',
        price: '$210',
        docs: '7 tools + implementation guide',
        desc: 'An equity-centered system for navigating conflict and delivering feedback in Montessori schools — tiered, documented, and built for the real complexity of adult professional relationships.',
        audience: 'Heads of school, program directors, and instructional coaches',
        stripeHref: 'https://buy.stripe.com/dRm28tdaoa1a5wH6Jz2cg0O',
      },
      {
        name: 'Year-Long PD Planning Template',
        slug: 'year-long-planner',
        image: '/images/toolbox/year-long-planner.png',
        price: '$197',
        docs: 'Editable Excel workbook · 5 tabs',
        desc: 'A full-year professional development planning workbook with suggested weekly topics, differentiated tracks for guides and assistants, and a Beginning of Year tab for in-service planning. Editable in Excel or Google Sheets.',
        audience: 'Heads of school, instructional coaches, and PD leads',
        stripeHref: 'https://buy.stripe.com/5kQ3cx9Yc4GQbV5aZP2cg0X',
      },
    ],
  },
  {
    label: 'Leadership & Organizational Systems',
    items: [
      {
        name: 'Montessori Leadership Operations Playbook',
        slug: 'leadership-operations-playbook',
        image: '/images/toolbox/montessori-leadership-operations-playbook.png',
        price: '$595',
        docs: '40+ documents',
        desc: 'The operating infrastructure for a functioning Montessori leadership team. Meeting rhythms, decision protocols, delegation frameworks, and accountability systems — built to reduce friction and bring clarity to how your team actually works.',
        audience: 'Heads of school and senior leadership teams',
        stripeHref: 'https://buy.stripe.com/bJefZj6M0flu6ALec12cg0I',
      },
      {
        name: 'Montessori Hiring & Selection Toolkit',
        slug: 'hiring-selection-toolkit',
        image: '/images/toolbox/hiring-selection-toolkit.png',
        price: '$450',
        docs: '38+ documents',
        desc: 'Equitable, philosophy-aligned hiring from job description through offer letter. Structured to find candidates who align with your mission and values — not just your credential list.',
        audience: 'Heads of school, directors, and hiring committees',
        stripeHref: 'https://buy.stripe.com/8x2cN72vK5KUcZ9fg52cg0J',
      },
      {
        name: 'Leadership Transition & Succession Toolkit',
        slug: 'leadership-transition-toolkit',
        image: '/images/toolbox/leadership-transition-succession-toolkit.png',
        price: '$425',
        docs: '40 documents',
        desc: 'When a leader leaves, schools lose more than a person — they lose the invisible systems, institutional memory, and informal knowledge built over years. This toolkit structures the transition before, during, and after.',
        audience: 'Boards, heads of school, and leadership teams managing transitions',
        stripeHref: 'https://buy.stripe.com/8x25kF5HWc9i5wHc3T2cg0K',
      },
      {
        name: 'Performance Concerns & Separation Toolkit',
        slug: 'performance-separation-toolkit',
        image: '/images/toolbox/performance-concerns-separation-toolkit.png',
        price: '$395',
        docs: '33 documents',
        desc: 'Structured, dignified, and legally sound processes for managing performance concerns through to separation when needed. For the conversations no one prepares you for — with tools that help you handle them well.',
        audience: 'Heads of school, directors, and HR leads',
        stripeHref: 'https://buy.stripe.com/bJedRb4DS8X61grc3T2cg0L',
      },
    ],
  },
  {
    label: 'Governance & Community',
    items: [
      {
        name: 'Board Onboarding & Alignment Toolkit',
        slug: 'board-onboarding-toolkit',
        image: '/images/toolbox/board-onboarding-alignment-toolkit.png',
        price: '$325',
        docs: '21 documents',
        desc: 'Boards that govern well start with strong onboarding. This toolkit builds shared understanding of roles, culture, and expectations from the first meeting — so new members can contribute from day one.',
        audience: 'Board chairs, heads of school, and governance committees',
        stripeHref: 'https://buy.stripe.com/fZubJ33zOehqe3dec12cg0M',
      },
      {
        name: 'Montessori Staff Handbook Toolkit',
        slug: 'staff-handbook',
        image: '/images/toolbox/staff-handbook.png',
        price: '$297',
        docs: '124-page editable template',
        desc: 'A full editable staff handbook covering policies, culture, expectations, and procedures — written with Montessori adult culture in mind. Ready to adapt and implement in your school.',
        audience: 'Heads of school, directors, and HR leads',
        stripeHref: 'https://buy.stripe.com/14AaEZ3zO7T2f7hec12cg0G',
      },
      {
        name: 'Montessori Family Handbook',
        slug: 'family-handbook',
        image: '/images/toolbox/family-handbook.png',
        price: '$197',
        docs: '58-page editable template',
        desc: 'A comprehensive, editable family handbook built specifically for Montessori schools. Reflects your philosophy and community — not a generic school district template adapted to fit.',
        audience: 'Heads of school, directors, and enrollment teams',
        stripeHref: 'https://buy.stripe.com/6oU4gB1rG1uEbV51pf2cg0H',
      },
    ],
  },
]

const freeResources = [
  {
    name: 'Growing Your Montessori School',
    file: '/free-resources/growing-your-montessori-school.pdf',
    desc: 'A practical guide to enrollment growth strategy, expansion planning, staffing for scale, and the organizational questions schools often skip in the rush to grow. Built for leaders navigating real increases in size and complexity.',
    audience: 'Heads of school, boards, and leadership teams',
  },
  {
    name: 'Fundraising for Montessori Schools',
    file: '/free-resources/fundraising-for-montessori-schools.pdf',
    desc: 'Covers how to build a fundraising culture that reflects Montessori values — including case for support development, donor communication, annual fund strategy, and the specific challenges of mission-rich, resource-constrained schools.',
    audience: 'Development leads, heads of school, and boards',
  },
  {
    name: 'Creating Strong Financial Structures',
    file: '/free-resources/creating-strong-financial-structures.pdf',
    desc: 'Budget development, financial reporting, reserve policy, and cash flow planning — practical and non-jargon, designed for school leaders who didn&apos;t come from finance backgrounds but need to build real financial health.',
    audience: 'Heads of school, business managers, and boards',
  },
]

export default function ToolboxPage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          <div className="max-w-2xl flex-1">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Montessori Makers Toolbox
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-8"
              style={serif}
            >
              Professional tools for Montessori leadership, systems, and culture.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              The Montessori Makers Toolbox is a growing library of downloadable resources for
              school leaders &mdash; handbooks, policies, surveys, frameworks, and leadership tools
              designed for real Montessori schools, not generic education systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/toolbox/store"
                className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Browse Tools
              </Link>
              <Link
                href="/toolbox/free-resources"
                className="border border-white/30 text-white text-[13px] px-8 py-4 tracking-[0.07em] hover:border-white/60 hover:bg-white/5 transition-colors text-center"
              >
                View Free Resources
              </Link>
            </div>
          </div>
          {/* Hero logo — right column */}
          <div className="hidden md:flex items-center justify-end flex-shrink-0">
            <Logo name="toolbox" heroWidth={380} heroHeight={380} />
          </div>
        </div>
      </section>

      {/* ── 2. FREE GUIDES ───────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Free Resources
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-5"
              style={serif}
            >
              Start here. No cost required.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              These free guides reflect the same rigor and specificity behind every paid tool.
              Download them, use them, and share them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {freeResources.map((r) => (
              <div
                key={r.name}
                className="bg-white border border-[#E2DDD6] p-8 flex flex-col"
              >
                <h3
                  className="text-[#0e1a7a] text-xl font-semibold mb-4 leading-snug"
                  style={serif}
                >
                  {r.name}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed mb-4 flex-1">
                  {r.desc}
                </p>
                <p className="text-[#64748B] text-xs tracking-wide mb-6">
                  For: {r.audience}
                </p>
                <a
                  href={r.file}
                  download
                  className="bg-[#d6a758] text-white text-[13px] px-6 py-3 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium self-start"
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
            See full free resources page &rarr;
          </Link>
        </div>
      </section>

      {/* ── 3. WHY TOOLBOX EXISTS ────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Why These Tools Exist
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-8"
              style={serif}
            >
              Schools don&apos;t need more theory. They need usable infrastructure.
            </h2>
            <div className="space-y-5">
              <p className="text-[#374151] text-lg leading-relaxed">
                Most Montessori schools are built by people who care deeply about the work &mdash;
                and are figuring out the organizational side as they go. Leaders inherit systems,
                reinvent documents, and carry institutional knowledge in their heads because no one
                built the structures beneath them.
              </p>
              <p className="text-[#374151] text-lg leading-relaxed">
                Every tool in the Toolbox was built because the problem it addresses kept showing
                up &mdash; in schools doing their best, with real commitment, but without the right
                infrastructure to sustain it. The goal is simple: reduce friction, improve clarity,
                and help adults feel prepared.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 border-t border-[#E2DDD6] pt-14">
            <div>
              <p
                className="text-[#0e1a7a] text-5xl font-semibold mb-4 tracking-tight"
                style={serif}
              >
                10 tools
              </p>
              <div className="w-8 h-0.5 bg-[#d6a758] mb-4" />
              <p className="text-[#374151] text-base leading-relaxed">
                A growing library, with more in development.
              </p>
            </div>
            <div>
              <div className="w-8 h-0.5 bg-[#d6a758] mb-4 mt-1" />
              <p className="text-[#374151] text-base leading-relaxed">
                Built for Montessori schools specifically &mdash; not adapted from generic
                education templates.
              </p>
            </div>
            <div>
              <div className="w-8 h-0.5 bg-[#d6a758] mb-4 mt-1" />
              <p className="text-[#374151] text-base leading-relaxed">
                Downloadable and editable &mdash; designed to be implemented, not filed away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. TOOLKITS BY CATEGORY ──────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Featured Toolkits
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight"
              style={serif}
            >
              Tools built from real school leadership experience.
            </h2>
          </div>

          <div className="space-y-16">
            {categories.map((cat) => (
              <div key={cat.label}>
                <div className="flex items-center gap-4 mb-8">
                  <h3
                    className="text-[#0e1a7a] text-2xl font-semibold tracking-tight"
                    style={serif}
                  >
                    {cat.label}
                  </h3>
                  <div className="flex-1 h-px bg-[#E2DDD6]" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {cat.items.map((p) => (
                    <div
                      key={p.slug}
                      className="bg-white border border-[#E2DDD6] flex flex-col hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(14,26,122,0.12)] transition-all duration-200"
                    >
                      <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-start gap-5 mb-5">
                          <div className="flex-1 min-w-0">
                            <h4
                              className="text-[#0e1a7a] text-xl font-semibold leading-snug"
                              style={serif}
                            >
                              {p.name}
                            </h4>
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

                        <p className="text-[#64748B] text-[11px] mb-1">For: {p.audience}</p>
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
            ))}
          </div>
        </div>
      </section>

      {/* ── FAMILY EDUCATION CROSS-SELL ──────────────────────────────────── */}
      <section className="bg-white py-12 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <div className="flex-1">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-3">
              Also in the MMG Learning collection
            </p>
            <h3 className="text-xl md:text-2xl text-[#0e1a7a] leading-tight mb-2" style={serif}>
              Looking for family-facing materials?
            </h3>
            <p className="text-[#374151] text-sm leading-relaxed max-w-xl">
              The Family Education Series is a ready-to-deliver 10-session program for schools to
              use at family nights and parent meetings. Includes slide decks and branded agenda
              handouts for every session &mdash; from Montessori orientation through transitions.
            </p>
          </div>
          <Link
            href="/learning/family-education"
            className="flex-shrink-0 bg-[#0e1a7a] text-white text-[13px] px-8 py-4 tracking-[0.07em] hover:bg-[#162394] transition-colors font-medium text-center"
          >
            See Family Education Series &rarr;
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-10">What leaders say</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'The Adult Culture Framework gave us a shared language we\'d been missing for years. It didn\'t just name the problems — it gave us a way to actually address them.',
                name: 'Head of School',
                school: 'Independent Montessori, Northeast',
                tool: 'Adult Culture Framework',
              },
              {
                quote: 'I used the Leadership Operations Playbook during our transition and it saved us. Months of institutional knowledge that would have walked out the door got documented in two weeks.',
                name: 'Outgoing Director',
                school: 'AMI school, Pacific Northwest',
                tool: 'Leadership Operations Playbook',
              },
              {
                quote: 'We\'d had two difficult separations in the past year and no consistent process for either. The Performance & Separation Toolkit changed how we handle this work — more fairly and with more clarity.',
                name: 'Program Director',
                school: 'Charter Montessori, Southwest',
                tool: 'Performance & Separation Toolkit',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-[#E2DDD6] p-8 flex flex-col">
                <p className="text-[#0e1a7a] text-base leading-snug mb-6 flex-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-[#374151] font-medium text-sm">{t.name}</p>
                  <p className="text-[#64748B] text-sm mt-0.5">{t.school}</p>
                  <span className="inline-block mt-2 text-[#8A6014] text-[9px] tracking-[0.18em] uppercase border border-[#8A6014]/30 px-2 py-0.5">
                    {t.tool}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ECOSYSTEM CONNECTION ──────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-6">
              Part of the Ecosystem
            </p>
            <h2
              className="text-4xl md:text-5xl text-white leading-tight tracking-tight mb-6"
              style={serif}
            >
              Toolbox is the practical layer of Montessori Makers Group.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              Every tool connects to deeper work available across the ecosystem. Schools working
              through Advisory use these frameworks in implementation. Schools hiring through
              MatchHub use the Hiring Toolkit to structure the process. Schools in transition use
              the Succession Toolkit as a foundation. The tools stand alone &mdash; and they go
              further when the work goes deeper.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Advisory', tagline: 'Consulting & alignment', href: '/advisory' },
              { name: 'Institute', tagline: 'Leadership formation', href: '/institute' },
              { name: 'MatchHub', tagline: 'Philosophy-aligned hiring', href: '/matchhub' },
              { name: 'Toolbox Store', tagline: 'All tools & resources', href: '/toolbox/store' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="border border-white/15 p-7 hover:border-white/30 transition-colors group block"
              >
                <p className="text-[#94A3B8] text-[10px] tracking-[0.16em] uppercase mb-2">
                  {item.tagline}
                </p>
                <p
                  className="text-white text-lg font-medium mb-4 group-hover:underline"
                  style={serif}
                >
                  {item.name}
                </p>
                <span className="text-[#d6a758] text-sm group-hover:translate-x-1 inline-block transition-transform">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] border-t border-[#E2DDD6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-5"
            style={serif}
          >
            Ready to build stronger systems?
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Browse the full toolkit library or explore free resources to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/toolbox/store"
              className="bg-[#0e1a7a] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#162270] transition-colors text-center font-medium"
            >
              Browse Tools
            </Link>
            <Link
              href="/advisory"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-[13px] px-8 py-4 tracking-[0.07em] hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
            >
              Need deeper support? Explore Advisory
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
