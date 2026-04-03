import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const STRIPE = 'https://buy.stripe.com/5kQ3cx9Yc4GQbV5aZP2cg0X'

export default function YearLongPlannerPage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Planning Tools &middot; Montessori Makers Toolbox
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={serif}
            >
              Year-Long PD Planning Template
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              An editable Excel workbook for planning a full year of Montessori professional
              development — with suggested topics, differentiated staff tracks, and a
              Beginning of Year tab.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>
              $197
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={STRIPE}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Buy Now &rarr;
              </a>
              <Link
                href="/toolbox/store"
                className="border border-white/30 text-white text-[13px] px-8 py-4 tracking-[0.07em] hover:border-white/60 hover:bg-white/5 transition-colors text-center"
              >
                Back to Toolbox
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THE PROBLEM ───────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: image */}
          <div className="relative aspect-[4/3] overflow-hidden shadow-[0_8px_32px_rgba(14,26,122,0.10)] border border-[#E2DDD6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/toolbox/year-long-planner.png"
              alt="Year-Long PD Planning Template — Montessori Makers Toolbox"
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Right: problem text */}
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              The Problem This Solves
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-10"
              style={serif}
            >
              Most Montessori PD calendars are built reactively.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                A problem surfaces. PD gets scheduled to address it. The year fills up with
                disconnected sessions that don&rsquo;t build toward anything, and by spring
                no one remembers what the through-line was supposed to be.
              </p>
              <p>
                Children experience the culture adults create. That culture is built, in part,
                through the professional development adults share &mdash; how it&rsquo;s
                structured, how consistently it runs, whether it treats guides as professionals
                with something worth building on. A year of reactive PD communicates something
                about how the school regards its staff.
              </p>
              <p>
                This template gives leadership teams a starting structure: a full calendar with
                suggested topics already placed, differentiated tracks for guides and assistants,
                and a separate Beginning of Year tab for in-service planning. The goal is not to
                constrain the calendar but to give it a spine so the year builds intentionally
                rather than by accident.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT'S INCLUDED ───────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            What&rsquo;s Included
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-6"
            style={serif}
          >
            Five tabs. One workbook. The whole year.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            A fully editable Excel workbook — compatible with Microsoft Excel and Google Sheets.
            Choose the planning template that fits how your school structures PD time, and
            adapt everything else to your school&rsquo;s context and annual focus.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Instructions Tab',
                desc: 'Overview of the workbook, guidance on which template to use, and a suggested topic sequence by quarter — from Back to School through End of Year.',
              },
              {
                title: 'Simple Template',
                desc: 'One PD topic per week. Best for schools with unified all-staff meetings. Columns for topic, who is leading, and notes. Clean and fast to fill in.',
              },
              {
                title: 'Medium Template',
                desc: 'Two time blocks per week — first half and second half — plus separate columns for Assistants and Specials. Best for 90-minute PD sessions with some differentiation.',
              },
              {
                title: 'Full Template',
                desc: 'Three time blocks (AM, Mid-Day, PM) with individual columns for Guides, Assistants, Learning Support, Programs, and Extensions. Built for schools with complex, multi-track PD structures.',
              },
              {
                title: 'Beginning of Year Tab',
                desc: 'A separate planning grid for in-service week — before the year-long calendar begins. Covers orientation, full-day PD, level-specific sessions, and supervisor meetings.',
              },
              {
                title: 'Suggested Topics Pre-Filled',
                desc: 'Every week of the school year has a suggested topic already placed — conference prep, assessment dives, progress reports, and full-day PD flags. Replace anything that doesn\'t fit.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white flex flex-col">
                <div className="h-1 bg-[#d6a758]" />
                <div className="p-7 flex-1">
                  <h3
                    className="text-[#0e1a7a] text-lg font-semibold mb-3 leading-snug"
                    style={serif}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#374151] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHO IT'S FOR ──────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            Who It&rsquo;s For
          </p>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2
                className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-6"
                style={serif}
              >
                For the person responsible for how adults grow.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                Whether you run PD yourself or coordinate it with a leadership team, this
                workbook gives you a planning structure that survives the school year intact
                &mdash; not something that gets abandoned by October because it was too rigid
                to adapt.
              </p>
            </div>
            <div>
              <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
                {[
                  'Heads of school planning the adult development arc for the year',
                  'Instructional coaches building a coherent weekly PD structure',
                  'Leadership teams that want guides, assistants, and specialists on differentiated tracks',
                  'Schools preparing for accreditation that requires documented PD planning',
                  'New administrators inheriting a school with no consistent PD history',
                  'Schools that have tried year-long planning before but lost the thread mid-year',
                  'Any leader who wants the year\'s PD to build toward something rather than react to things',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#d6a758]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. IMPLEMENTATION NOTE ───────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              How to Use It
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Start with the Instructions tab, then choose the template that fits your school&rsquo;s
              PD structure &mdash; Simple, Medium, or Full. Fill in your full-day PD dates first,
              since those anchor everything else. Then work backward from conferences, assessment
              windows, and progress report deadlines to place prep time. The suggested topics in
              column B are a starting point; adapt, rearrange, or replace based on your annual
              focus. Most schools find the Beginning of Year tab easiest to complete first, since
              those dates are usually fixed before the year-long calendar is fully built.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. PRICING + BUY ─────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4"
            style={serif}
          >
            Year-Long PD Planning Template
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>
            $197
          </p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            A complete, editable Excel workbook — ready to open, adapt, and use every week
            of the school year.
          </p>
          <a
            href={STRIPE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#d6a758] text-white text-[13px] px-12 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium mb-4"
          >
            Buy Now &rarr;
          </a>
          <p className="text-[#64748B] text-sm mb-8">
            .xlsx file &mdash; opens in Excel or Google Sheets. Download link provided after purchase.
          </p>
          <div>
            <Link
              href="/toolbox/store"
              className="text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              &larr; Back to Toolbox
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. RELATED ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] border-t border-[#E2DDD6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            Related Tools
          </p>
          <h2
            className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight tracking-tight mb-14"
            style={serif}
          >
            Tools that work alongside this one.
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              {
                title: 'Adult Culture Framework',
                slug: 'adult-culture-framework',
                desc: 'The PD calendar structures when adults learn together. The Adult Culture Framework builds the norms and expectations that make that learning possible.',
              },
              {
                title: 'Montessori Leadership Operations Playbook',
                slug: 'leadership-operations-playbook',
                desc: 'Meeting rhythms, delegation frameworks, and accountability systems that give the leadership team the structure to actually run the PD calendar you plan.',
              },
              {
                title: 'Staff Handbook Toolkit',
                slug: 'staff-handbook',
                desc: 'Professional development expectations belong in writing. The Staff Handbook Toolkit is where the PD commitments in your calendar get codified for staff.',
              },
            ].map((item) => (
              <div key={item.slug} className="bg-white border border-[#E2DDD6] p-7">
                <h3
                  className="text-[#0e1a7a] text-lg font-semibold mb-3 leading-snug"
                  style={serif}
                >
                  {item.title}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed mb-5">{item.desc}</p>
                <Link
                  href={`/toolbox/${item.slug}`}
                  className="text-[#0e1a7a] text-xs font-medium tracking-wide hover:underline"
                >
                  Learn more &rarr;
                </Link>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E2DDD6] pt-10">
            <p className="text-[#374151] text-base leading-relaxed max-w-2xl">
              For deeper organizational work, Advisory provides the strategic partnership to
              implement these tools alongside a broader engagement.{' '}
              <Link href="/advisory" className="text-[#0e1a7a] font-medium hover:underline">
                Learn about Advisory &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
