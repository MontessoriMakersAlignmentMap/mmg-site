import Image from 'next/image'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }
const STRIPE = 'https://buy.stripe.com/cNi9AVfiwa1a0cn3xn2cg1m'

export default function FinancialLiteracyToolkitPage() {
  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Governance &amp; Stewardship &middot; Montessori Makers Toolbox
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6" style={serif}>
              Financial Literacy for Montessori Leaders
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              A deep, actionable guide to school finance for leaders who didn&rsquo;t come from finance &mdash; built
              for heads of school who need to understand, communicate, and manage the financial health of their school.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>$275</p>
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

      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(14,26,122,0.10)]">
            <Image src="/images/toolbox/financial-literacy-toolkit.png"
              alt="Financial Literacy for Montessori Leaders — Montessori Makers Toolbox"
              fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 40vw" />
          </div>
          <div>
            {/* ── METADATA PANEL ──── */}
            <div className="bg-[#F2EDE6] border-l-4 border-[#d6a758] px-6 py-5 mb-10">
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">What&rsquo;s Inside</p>
              <p className="text-[#0e1a7a] text-sm font-semibold mb-3">7 components &middot; Editable DOCX</p>
              <ul className="space-y-1.5">
                {['Reading Your Financial Statements', 'Budget Construction Guide', 'Cash Flow Management Framework', 'Reserve Policy Framework', 'Board Finance Conversation Guide', 'Financial Health Diagnostic', 'Capital Planning Primer'].map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[#374151] text-sm leading-snug">
                    <span className="text-[#d6a758] font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">The Problem This Solves</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-10" style={serif}>
              Most Montessori leaders are managing a multi-million-dollar organization without financial training.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                Leadership preparation programs focus heavily on pedagogy, philosophy, and organizational culture.
                Financial management &mdash; the thing that determines whether the school can continue to do any
                of that work &mdash; is treated as someone else&rsquo;s job. Until it isn&rsquo;t.
              </p>
              <p>
                Heads of school who don&rsquo;t understand their financial statements make avoidable decisions. They
                accept budget presentations they can&rsquo;t interrogate. They don&rsquo;t recognize early warning
                signs of financial stress. They can&rsquo;t have a credible conversation with their board about
                reserve policy or capital planning because they lack the vocabulary.
              </p>
              <p>
                This toolkit goes beyond the basics already available for free. It builds the practical financial
                competence that heads of school need to lead their organization &mdash; not just nod through the
                finance committee report.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">What&rsquo;s Included</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-6" style={serif}>
            Financial competence for school leaders &mdash; practical and specific.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Every section covers a specific competency that school leaders need &mdash; not general financial
            literacy, but the specific financial knowledge that shapes school leadership decisions.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Reading Your Financial Statements', desc: 'A detailed guide to understanding the three core financial statements \u2014 income statement, balance sheet, and cash flow statement \u2014 with Montessori school examples and the specific line items that most often mislead school leaders.' },
              { title: 'Budget Construction Guide', desc: 'A step-by-step guide to building an annual operating budget \u2014 from revenue assumptions through expense categories, enrollment-based projections, and how to build in realistic contingency. For leaders who own the budget process, not just receive it.' },
              { title: 'Cash Flow Management Framework', desc: 'A framework for understanding and managing cash flow in a school context \u2014 seasonal patterns, the gap between revenue recognition and cash availability, and the indicators that signal cash stress before it becomes a crisis.' },
              { title: 'Reserve Policy Framework', desc: 'A guide to building and maintaining a reserve policy \u2014 what reserve targets are appropriate for different school types, how to communicate reserve decisions to the board, and how to build reserves without sacrificing operating investment.' },
              { title: 'Board Finance Conversation Guide', desc: 'A framework for the financial conversations that heads of school need to have with their boards \u2014 how to present financial information, how to frame difficult conversations about deficits or capital needs, and what questions to ask the finance committee.' },
              { title: 'Financial Health Diagnostic', desc: 'A set of key financial ratios and indicators for assessing the financial health of a Montessori school \u2014 with benchmarks where available and a framework for understanding what the numbers mean for the school\u2019s sustainability.' },
              { title: 'Capital Planning Primer', desc: 'An introduction to capital planning for school leaders \u2014 facility needs assessment, capital campaign basics, debt considerations, and how to think about long-term capital investments in the context of operating sustainability.' },
            ].map((item) => (
              <div key={item.title} className="bg-white flex flex-col">
                <div className="h-1 bg-[#d6a758]" />
                <div className="p-7 flex-1">
                  <h3 className="text-[#0e1a7a] text-lg font-semibold mb-3 leading-snug" style={serif}>{item.title}</h3>
                  <p className="text-[#374151] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">Who It&rsquo;s For</p>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-6" style={serif}>
                Every head of school who has ever nodded through a financial report they didn&rsquo;t fully understand.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                This toolkit is priced so that heads of school can buy it without board approval &mdash; because
                financial literacy is a personal professional development investment, not a school expense. The
                competence it builds pays dividends in every board meeting, every budget cycle, and every strategic
                conversation about the school&rsquo;s future.
              </p>
            </div>
            <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
              {[
                'Heads of school in their first or second year who own the budget for the first time',
                'Leaders transitioning from pedagogical roles into executive responsibility',
                'Heads who feel uncertain in financial conversations with their board',
                'Program directors being prepared for a head of school role',
                'New board members who want to understand school finance specifically',
                'Schools whose business manager is the only person who understands the finances',
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

      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">How to Use It</p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Begin with Reading Your Financial Statements and work through it alongside your school&rsquo;s actual
              financials &mdash; the learning is most effective when the examples are your own numbers, not hypothetical
              ones. The Budget Construction Guide is most useful when read before budget season, not during it. The
              Board Finance Conversation Guide is worth reviewing before every finance committee meeting until the
              conversations feel natural.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4" style={serif}>
            Financial Literacy for Montessori Leaders
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>$275</p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            The financial competence to lead your school &mdash; not just manage it.
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

      <section className="bg-[#FAF9F7] border-t border-[#E2DDD6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">Related Tools</p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight tracking-tight mb-14" style={serif}>
            Tools that work alongside this one.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Board Onboarding & Alignment Toolkit', slug: 'board-onboarding-toolkit', desc: 'Financial literacy is most valuable when the head and board are working from shared understanding. The Board Onboarding Toolkit builds that shared foundation, including how the board approaches its financial oversight role.' },
              { title: 'Montessori Leadership Operations Playbook', slug: 'leadership-operations-playbook', desc: 'Financial decision-making is embedded in the operating infrastructure of a school. The Leadership Operations Playbook structures how financial decisions are made, delegated, and reported within the leadership team.' },
              { title: 'Annual Cycle Planning Toolkit', slug: 'annual-cycle-planning-toolkit', desc: 'The budget cycle, reserve review, and annual financial reporting all have specific moments in the school year. The Annual Cycle Planning Toolkit maps those moments so financial work happens on schedule.' },
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
