import Image from 'next/image'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }
const STRIPE = 'https://buy.stripe.com/bJefZjc6k4GQ1gr4Br2cg1k'

export default function StaffRetentionToolkitPage() {
  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Leadership Tools &middot; Montessori Makers Toolbox
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6" style={serif}>
              Staff Retention Toolkit
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              A practical system for understanding, measuring, and improving staff retention &mdash; built for Montessori
              schools where culture, compensation, and working conditions all shape whether good people stay.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>$325</p>
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
            <Image src="/images/toolbox/adult-culture-framework.png"
              alt="Staff Retention Toolkit — Montessori Makers Toolbox"
              fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 40vw" />
          </div>
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">The Problem This Solves</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-10" style={serif}>
              Schools invest heavily in finding good guides. Almost none invest in keeping them.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                Staff turnover in Montessori schools is expensive in every dimension. The direct costs of recruiting
                and onboarding are real. The indirect costs &mdash; to continuity, to children who have built
                relationships with their guide, to the team that absorbs the disruption &mdash; are much larger.
              </p>
              <p>
                Most schools respond to turnover reactively: someone leaves, the school scrambles to replace them,
                and the cycle continues. The leaders who break that cycle aren&rsquo;t doing something exotic. They
                are doing something systematic &mdash; understanding why people leave, identifying the conditions
                that make people stay, and acting on that information before someone hands in notice.
              </p>
              <p>
                The Staff Retention Toolkit gives schools the tools to do that work proactively &mdash; with stay
                interviews, working conditions assessments, exit analysis, and a retention-centered culture framework.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">What&rsquo;s Included</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-6" style={serif}>
            The tools to understand retention and act on it.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Both diagnostic tools to understand your current retention landscape and system tools for building the
            conditions that make good people want to stay.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Retention Risk Framework', desc: 'A framework for assessing retention risk by role, tenure, and school context \u2014 identifying the staff members most likely to leave before they decide to, and the factors that most influence that risk.' },
              { title: 'Stay Interview Protocol', desc: 'A structured conversation guide for stay interviews \u2014 the proactive conversations leaders have with staff who are doing well, to understand what keeps them engaged and what would make them consider leaving. The most underused retention tool in schools.' },
              { title: 'Working Conditions Assessment', desc: 'A diagnostic tool for assessing the working conditions that most affect retention \u2014 workload, autonomy, feedback, recognition, and physical environment \u2014 with a framework for prioritizing what to address.' },
              { title: 'Exit Interview Framework', desc: 'A structured exit interview protocol designed to capture honest information from departing staff \u2014 what to ask, how to ask it, and how to use the patterns that emerge to inform retention strategy.' },
              { title: 'Retention Data Tracker', desc: 'A simple tracking structure for retention metrics \u2014 turnover rate by role and tenure, exit themes, stay interview findings \u2014 so retention is reported on systematically rather than assessed anecdotally after each departure.' },
              { title: 'Retention-Centered Culture Guide', desc: 'A framework for the cultural practices that most strongly predict staff retention in Montessori schools \u2014 covering how adults experience their work, how they are seen and valued, and the relational conditions that make people feel like they belong.' },
              { title: 'Manager Practices Guide', desc: 'A practical guide for the day-to-day leadership behaviors most strongly associated with staff retention \u2014 recognition, feedback quality, workload management, and the small interactions that accumulate into whether someone feels valued.' },
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
                Leaders who want to keep the people they worked hard to find.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                This toolkit is most effective when used proactively &mdash; before a retention crisis, not after one.
                Schools that use stay interviews and working conditions assessments regularly have a significantly
                different experience of turnover than those that rely on exit interviews and replacement searches.
              </p>
            </div>
            <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
              {[
                'Heads of school experiencing turnover they don\u2019t fully understand',
                'Schools that have lost key guides or directors in the past two years',
                'Leaders who want to build retention systems before the next departure',
                'Schools where staff satisfaction is unclear or hard to assess',
                'HR leads or directors responsible for staff experience and culture',
                'Schools pairing this with the Adult Culture Framework or Compensation Toolkit',
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
              Start with the Retention Risk Framework to get a clear picture of where your school is most vulnerable
              before deciding what to act on first. Then run the Working Conditions Assessment &mdash; this gives you
              structural data to complement the individual-level picture from stay interviews. Begin stay interviews
              with your highest-risk, highest-impact staff first. The Retention Data Tracker is most useful when
              started now and maintained over time &mdash; it takes 18 months of data to see the patterns clearly.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4" style={serif}>
            Staff Retention Toolkit
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>$325</p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            The tools to understand why staff stay or leave &mdash; and build the conditions that keep the right people.
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
              { title: 'Adult Culture Framework', slug: 'adult-culture-framework', desc: 'Retention is downstream of culture. The Adult Culture Framework addresses the structural conditions \u2014 norms, accountability, communication \u2014 that determine whether staff feel they can do their best work.' },
              { title: 'Compensation Framework Toolkit', slug: 'compensation-framework-toolkit', desc: 'Compensation is one of the most significant retention drivers. Pairing the Staff Retention Toolkit with the Compensation Framework gives you both the diagnostic and the systemic lever for improving retention.' },
              { title: 'Conflict & Feedback Protocol', slug: 'conflict-feedback-protocol', desc: 'Unresolved conflict and poor feedback practices are among the most common reasons staff leave. The Conflict & Feedback Protocol gives schools the tools to address both before they become departure drivers.' },
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
