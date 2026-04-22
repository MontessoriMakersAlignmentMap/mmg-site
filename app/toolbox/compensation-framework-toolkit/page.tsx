import Image from 'next/image'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }
const STRIPE = 'https://buy.stripe.com/28EaEZ5HW1uE8ITd7X2cg1h'

export default function CompensationFrameworkToolkitPage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Leadership Tools &middot; Montessori Makers Toolbox
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6" style={serif}>
              Compensation Framework Toolkit
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              An equitable, transparent compensation system for Montessori schools &mdash; built so that pay decisions
              are principled, defensible, and communicated with clarity.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>$395</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={STRIPE} target="_blank" rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium">
                Buy Now &rarr;
              </a>
              <Link href="/toolbox/store"
                className="border border-white/30 text-white text-[13px] px-8 py-4 tracking-[0.07em] hover:border-white/60 hover:bg-white/5 transition-colors text-center">
                Back to Toolbox
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THE PROBLEM ───────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(14,26,122,0.10)]">
            <Image src="/images/toolbox/compensation-framework-toolkit.png"
              alt="Compensation Framework Toolkit — Montessori Makers Toolbox"
              fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 40vw" />
          </div>
          <div>
            {/* ── METADATA PANEL ──── */}
            <div className="bg-[#F2EDE6] border-l-4 border-[#d6a758] px-6 py-5 mb-10">
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">What&rsquo;s Inside</p>
              <p className="text-[#0e1a7a] text-sm font-semibold mb-3">8 components &middot; DOCX + Excel workbook</p>
              <ul className="space-y-1.5">
                {['Compensation Philosophy Guide', 'Salary Banding Framework', 'Salary Banding Workbook (Excel)', 'Annual Review Cycle Framework', 'Compensation Communication Templates (4)', 'Board Presentation Framework', 'Equity Audit Checklist', 'Staff FAQ Document'].map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[#374151] text-sm leading-snug">
                    <span className="text-[#d6a758] font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">The Problem This Solves</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-10" style={serif}>
              Most Montessori schools don&rsquo;t have a compensation system. They have a history of decisions.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                Pay decisions accumulate over time &mdash; a raise here to keep someone, a starting salary set by
                what the budget allowed that year, a stipend added without a framework. The result is a compensation
                structure that can&rsquo;t be explained coherently to staff, creates quiet resentment when people
                compare notes, and puts the school at legal and reputational risk.
              </p>
              <p>
                The problem isn&rsquo;t that school leaders are unfair. It&rsquo;s that they&rsquo;re making individual
                decisions without a system &mdash; and individual decisions without a system produce inequitable
                outcomes, even with good intentions. Staff experience those outcomes directly.
              </p>
              <p>
                The Compensation Framework Toolkit builds the infrastructure that turns compensation from a series of
                uncomfortable conversations into a principled system with clear logic, documented bands, and an annual
                review process staff can understand and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT'S INCLUDED ───────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">What&rsquo;s Included</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-6" style={serif}>
            Every component of a functioning compensation system.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Includes both written framework documents and an Excel workbook for salary banding and annual review
            calculations &mdash; the combination that gives the system real operational weight.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Compensation Philosophy Guide', desc: 'A written articulation of how and why your school approaches pay &mdash; the values, the commitments, and the constraints. The document staff and board reference when compensation decisions are made or questioned.' },
              { title: 'Salary Banding Framework', desc: 'A role-by-role banding structure that groups positions by scope, responsibility, and credential requirements &mdash; giving pay decisions a principled anchor instead of leaving them to negotiation and precedent.' },
              { title: 'Salary Banding Workbook (Excel)', desc: 'An editable Excel workbook for building and maintaining salary bands &mdash; with inputs for role type, band floor and ceiling, market reference, and current staff placement. The tool that makes the framework operational.' },
              { title: 'Annual Review Cycle Framework', desc: 'A structured process for conducting salary reviews &mdash; including timing, criteria, documentation, and how to communicate decisions to staff. Replaces ad hoc raises with a predictable, documented system.' },
              { title: 'Compensation Communication Templates (4)', desc: 'Templates for communicating compensation decisions to individual staff members &mdash; annual increase letters, promotional adjustment letters, and the difficult communication when the answer is no increase.' },
              { title: 'Board Presentation Framework', desc: 'A structure for presenting compensation decisions to the board &mdash; including how to frame equity considerations, budget constraints, and the rationale behind band placement.' },
              { title: 'Equity Audit Checklist', desc: 'A structured review process for identifying pay disparities by role type, credential level, and length of service &mdash; and a framework for how to address gaps found in that review over time.' },
              { title: 'Staff FAQ Document', desc: 'A plain-language FAQ for staff that explains how compensation decisions are made at the school &mdash; what factors matter, how bands work, and what the review process looks like. Reduces informal speculation and builds trust.' },
            ].map((item) => (
              <div key={item.title} className="bg-white flex flex-col">
                <div className="h-1 bg-[#d6a758]" />
                <div className="p-7 flex-1">
                  <h3 className="text-[#0e1a7a] text-lg font-semibold mb-3 leading-snug" style={serif}>{item.title}</h3>
                  <p className="text-[#374151] text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.desc }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHO IT'S FOR ──────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">Who It&rsquo;s For</p>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-6" style={serif}>
                Any leader who has struggled to explain why someone is paid what they&rsquo;re paid.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                This toolkit is for schools that want to build a compensation system before the lack of one causes a
                retention problem, a legal exposure, or a staff morale crisis. It is also for leaders who are already
                managing the fallout from inconsistent pay and need a path back to something defensible.
              </p>
            </div>
            <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
              {[
                'Heads of school building a compensation system for the first time',
                'Schools where compensation inequities have become visible or contentious',
                'Leaders preparing to present a compensation plan to their board',
                'Schools growing their staff and needing bands that will scale',
                'HR leads or business managers building formal pay infrastructure',
                'Schools that have lost staff to better-paying alternatives and want to understand why',
                'Boards wanting assurance that the school\u2019s compensation approach is defensible',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#d6a758]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. HOW TO USE IT ─────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">How to Use It</p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Start with the Compensation Philosophy Guide &mdash; before building bands or running the workbook,
              the school needs to agree on its values and commitments around pay. The philosophy anchors every other
              decision. From there, use the Salary Banding Framework to define role groups, then populate the Excel
              workbook with your actual staff. The equity audit comes after the bands are built &mdash; not before &mdash;
              so you have something to measure against.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. BUY CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4" style={serif}>
            Compensation Framework Toolkit
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>$395</p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            A principled compensation system &mdash; from philosophy through banding, review cycle, and communication.
          </p>
          <a href={STRIPE} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-[#d6a758] text-white text-[13px] px-12 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium mb-8">
            Buy Now &rarr;
          </a>
          <div>
            <Link href="/toolbox/store" className="text-white/50 text-sm hover:text-white/80 transition-colors">
              &larr; Back to Toolbox
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. RELATED ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] border-t border-[#E2DDD6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">Related Tools</p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight tracking-tight mb-14" style={serif}>
            Tools that work alongside this one.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Performance Concerns & Separation Toolkit', slug: 'performance-separation-toolkit', desc: 'Compensation and performance are linked. When pay decisions are principled, performance accountability becomes clearer. The Performance Toolkit handles the conversations that happen when performance doesn\'t meet standard.' },
              { title: 'Staff Retention Toolkit', slug: 'staff-retention-toolkit', desc: 'Compensation is one of the most significant drivers of retention. The Staff Retention Toolkit addresses the full picture of why staff stay or leave \u2014 and how to build the conditions that keep good people.' },
              { title: 'Adult Culture Framework', slug: 'adult-culture-framework', desc: 'The adult culture of a school shapes how compensation conversations are received. The Adult Culture Framework builds the relational and communicative infrastructure that makes those conversations land well.' },
            ].map((item) => (
              <div key={item.slug} className="bg-white border border-[#E2DDD6] p-7">
                <h3 className="text-[#0e1a7a] text-lg font-semibold mb-3 leading-snug" style={serif}>{item.title}</h3>
                <p className="text-[#374151] text-sm leading-relaxed mb-5">{item.desc}</p>
                <Link href={`/toolbox/${item.slug}`} className="text-[#0e1a7a] text-xs font-medium tracking-wide hover:underline">
                  Learn more &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
