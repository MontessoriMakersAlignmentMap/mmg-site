import Image from 'next/image'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }
const STRIPE = 'https://buy.stripe.com/14A6oJ9Yc7T22kv7ND2cg1l'

export default function AnnualCyclePlanningToolkitPage() {
  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Leadership Tools &middot; Montessori Makers Toolbox
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6" style={serif}>
              Annual Cycle Planning Toolkit
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              A full-year operational planning system for Montessori school leaders &mdash; so the recurring work,
              the seasonal deadlines, and the board calendar are mapped, not improvised.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>$225</p>
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
            <Image src="/images/toolbox/montessori-leadership-operations-playbook.png"
              alt="Annual Cycle Planning Toolkit — Montessori Makers Toolbox"
              fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 40vw" />
          </div>
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">The Problem This Solves</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-10" style={serif}>
              The school year has the same shape every year. Most schools are still surprised by it.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                Re-enrollment opens. Accreditation preparation begins. Budget season hits. Staff evaluations are
                due. Board elections happen. Every year, at roughly the same time, the same demands arrive &mdash;
                and many schools are still caught unprepared. Not because the work is new, but because it was never
                mapped.
              </p>
              <p>
                Leaders who operate from a mapped annual cycle aren&rsquo;t doing less work. They&rsquo;re doing the
                same work with less stress, fewer dropped tasks, and a clearer view of what&rsquo;s coming. The
                delegation is easier. The board communication is clearer. The handoff when a leader transitions is
                dramatically smoother.
              </p>
              <p>
                The Annual Cycle Planning Toolkit builds that map &mdash; month by month, for the full school year
                &mdash; with templates you can adapt to your school&rsquo;s specific calendar and context.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">What&rsquo;s Included</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-6" style={serif}>
            A mapped school year, ready to make your own.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Every template is editable &mdash; built to be adapted to your school&rsquo;s specific calendar,
            governance structure, and operational context.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Month-by-Month Leadership Calendar', desc: 'A full-year operational calendar mapping the key leadership tasks, deadlines, and priorities for each month \u2014 from summer planning through end-of-year closeout. The organizing tool for everything else.' },
              { title: 'Board Annual Calendar Template', desc: 'A structured board calendar covering meeting cadence, agenda themes by month, committee deadlines, and the governance decisions that need to happen at specific points in the year. Editable for your board\u2019s structure.' },
              { title: 'Enrollment Rhythm Map', desc: 'A month-by-month map of enrollment activities \u2014 inquiry season, tour scheduling, decision timelines, re-enrollment window, waitlist management \u2014 so enrollment milestones are planned, not reactive.' },
              { title: 'Staff Cycle Planning Guide', desc: 'A planning framework for the staff-facing work that recurs annually \u2014 evaluations, compensation reviews, goal-setting, PD planning, and end-of-year documentation. Ensures these happen on a consistent schedule, not when someone remembers.' },
              { title: 'Budget Calendar Framework', desc: 'A structured timeline for the annual budget process \u2014 from initial projections through board approval \u2014 with milestones for each phase and the inputs that need to be gathered before each step.' },
              { title: 'Annual Reporting Template', desc: 'A framework for the annual report to the board and community \u2014 covering enrollment, financials, staff, program quality, and strategic progress. Structures the reporting work so it\u2019s assembled over the year, not scrambled at the end.' },
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
                Leaders who want the year to feel planned, not perpetually urgent.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                This toolkit is an excellent starting point for leaders who are new to their role, new to the school,
                or simply ready to build more operational clarity. It&rsquo;s also the right tool for schools
                preparing for a leadership transition &mdash; a mapped annual cycle is one of the most valuable
                things an outgoing leader can leave behind.
              </p>
            </div>
            <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
              {[
                'New heads of school building their first operational calendar',
                'Experienced leaders who want to systematize what they currently carry in their head',
                'Schools preparing for a leadership transition',
                'Boards who want the year\u2019s governance calendar visible and planned',
                'Leadership teams that want shared visibility into annual organizational rhythms',
                'Schools that use this as an entry-level purchase and build from there',
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
              Start with the Month-by-Month Leadership Calendar and adapt it to your school&rsquo;s specific calendar
              before building out the board and staff cycle templates. Do this work in August before the year begins
              &mdash; or, if you&rsquo;re mid-year, map the remainder of the current year first to get oriented, then
              do the full year before next August. Share the board calendar and enrollment rhythm map with the relevant
              stakeholders so it lives outside your head.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4" style={serif}>
            Annual Cycle Planning Toolkit
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>$225</p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            A mapped school year &mdash; so the recurring work is planned, not perpetually reactive.
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
              { title: 'Montessori Leadership Operations Playbook', slug: 'leadership-operations-playbook', desc: 'The Annual Cycle Planning Toolkit maps the year. The Leadership Operations Playbook structures how the leadership team works within it \u2014 meeting rhythms, decision protocols, and the operating infrastructure for the work.' },
              { title: 'Enrollment Systems Toolkit', slug: 'enrollment-systems-toolkit', desc: 'Enrollment has a specific seasonal rhythm that needs to be inside the annual cycle. The Enrollment Systems Toolkit goes deeper on the processes behind each enrollment milestone in the calendar.' },
              { title: 'Board Onboarding & Alignment Toolkit', slug: 'board-onboarding-toolkit', desc: 'The board calendar is one of the most important outputs of annual cycle planning. The Board Onboarding Toolkit structures the governance work that fills that calendar, including how new board members come up to speed.' },
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
