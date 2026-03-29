import Link from 'next/link'
import Image from 'next/image'

const serif = { fontFamily: 'var(--font-heading)' }

export default function LeadershipOperationsPlaybookPage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Leadership Tools &middot; Montessori Makers Toolbox
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={serif}
            >
              Montessori Leadership Operations Playbook
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              The operating infrastructure every Montessori leadership team needs but rarely has.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>
              $595
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://buy.stripe.com/bJefZj6M0flu6ALec12cg0I"
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
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(14,26,122,0.10)]">
            <Image
              src="/images/toolbox/montessori-leadership-operations-playbook.png"
              alt="Montessori Leadership Operations Playbook — Montessori Makers Toolbox"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 40vw"
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
              Most Montessori leadership teams run on inherited practices, improvised systems, and
              whoever has been there longest.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                Meeting rhythms are inconsistent. Decision-making protocols exist informally at
                best. Accountability systems are either absent or applied unevenly. When things
                work, they work because of specific people &mdash; not because of the structure.
                This means when those people leave, or get promoted, or burn out, the coordination
                breaks down with them.
              </p>
              <p>
                The gap is not one of commitment or intelligence. Montessori leadership teams are
                typically led by deeply mission-driven people who are simply not trained in
                organizational systems &mdash; and who inherited institutions that didn&rsquo;t
                have them either. The result is a leadership team that works hard and coordinates
                poorly: duplicated effort, dropped decisions, unclear ownership, and reactive
                meetings that consume time without producing clarity.
              </p>
              <p>
                The Leadership Operations Playbook addresses the infrastructure gap directly. It
                provides the frameworks, templates, and systems that turn a leadership team from a
                group of capable individuals into a functioning organizational structure &mdash; one
                that holds through transitions, scales with growth, and reflects Montessori values
                at every level of operation.
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
            40+ documents across 6 operational domains.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Every document addresses a specific operational failure mode common in Montessori
            leadership teams. Together they form a complete operating system for a functioning
            leadership structure.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Meeting Architecture Templates (8)',
                desc:
                  'Structured templates for leadership team meetings, all-staff meetings, board meetings, parent town halls, and one-on-ones &mdash; including agenda formats, decision logs, and follow-up protocols that ensure every meeting produces a record.',
              },
              {
                title: 'Decision Protocol Framework',
                desc:
                  'A clear framework for mapping decision rights across roles &mdash; what gets decided where, by whom, and with whose input. Eliminates the most common source of leadership team friction: unclear ownership of consequential decisions.',
              },
              {
                title: 'Delegation Framework',
                desc:
                  'A structured approach to delegation that reduces leader bottlenecks and builds capacity across the team. Includes a delegation readiness assessment, handoff protocols, and a follow-up system that avoids the common failure of delegating without supporting.',
              },
              {
                title: 'Accountability System Templates (6)',
                desc:
                  'Check-in structures, goal-tracking frameworks, and performance accountability systems built for Montessori organizational culture &mdash; firm on outcomes, human in approach, and clear enough to be applied consistently across the team.',
              },
              {
                title: 'Leadership Calendar Template',
                desc:
                  'An annual leadership rhythm covering strategic planning cycles, review periods, board cycles, and staff development planning &mdash; structured so your team is never caught unprepared for known annual transitions and decision points.',
              },
              {
                title: 'Communication Protocols (7)',
                desc:
                  'Internal communication norms, escalation paths, and documentation standards for leadership teams. Addresses the specific failure modes of Montessori institutions: over-reliance on email, under-documentation of decisions, and inconsistent escalation.',
              },
              {
                title: 'Role Clarity Templates (5)',
                desc:
                  'RACI frameworks, role definition templates, and responsibility mapping tools for leadership team members. Designed to surface and resolve the role ambiguity that creates unnecessary conflict and duplicated effort.',
              },
              {
                title: 'Onboarding Supplement',
                desc:
                  'A leadership onboarding checklist and 90-day integration guide for new leadership team members &mdash; covering system orientation, relationship mapping, decision-making context, and culture entry protocols.',
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
                  <p
                    className="text-[#374151] text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
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
                Leadership teams that work hard but coordinate poorly.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                The Playbook is for schools whose leadership teams are capable and committed but
                operating without infrastructure. It&rsquo;s built for the moment when a leader
                looks at their team and sees talent that isn&rsquo;t being channeled well &mdash;
                and recognizes that the missing ingredient is structure, not effort.
              </p>
            </div>
            <div>
              <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
                {[
                  'Heads of school building or rebuilding leadership team infrastructure',
                  'Leadership teams experiencing coordination failures, duplicate efforts, or unclear accountability',
                  'Schools preparing for growth that requires stronger organizational foundations',
                  'New heads of school inheriting a team without defined operating systems',
                  'Schools where leadership coordination breaks down during high-stress periods',
                  'Leadership teams whose meetings are consuming more time than they&rsquo;re producing value',
                  'Schools that have experienced a near-miss on a major decision due to unclear ownership',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#d6a758]" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
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
              Start with the Decision Protocol Framework and Meeting Architecture &mdash; these two
              systems address the most common leadership coordination failures and produce visible
              results within two to three meeting cycles. The Delegation Framework and
              Accountability System can be introduced once meeting rhythms are established.
              Avoid introducing all six domains at once; sequenced implementation sustains buy-in
              and avoids the reform fatigue common in schools that try to change everything
              simultaneously. Most leadership teams are able to implement the core system within
              60 days.
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
            Montessori Leadership Operations Playbook
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>
            $595
          </p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            The operating infrastructure for a functioning leadership team. One investment
            that pays returns in every meeting, decision, and transition.
          </p>
          <a
            href="https://buy.stripe.com/bJefZj6M0flu6ALec12cg0I"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#d6a758] text-white text-[13px] px-12 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium mb-8"
          >
            Buy Now &rarr;
          </a>
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
                desc:
                  'The Playbook handles operational structure; the Adult Culture Framework handles the cultural norms that determine how well operational systems are actually followed.',
              },
              {
                title: 'Leadership Transition & Succession Toolkit',
                slug: 'leadership-transition-toolkit',
                desc:
                  'Once you&rsquo;ve documented how your leadership team operates, the Transition Toolkit ensures that infrastructure survives when team members change.',
              },
              {
                title: 'Hiring & Selection Toolkit',
                slug: 'hiring-selection-toolkit',
                desc:
                  'When you need to add to your leadership team, the Hiring Toolkit ensures you&rsquo;re selecting for the alignment and capability your operating system requires.',
              },
            ].map((item) => (
              <div key={item.slug} className="bg-white border border-[#E2DDD6] p-7">
                <h3
                  className="text-[#0e1a7a] text-lg font-semibold mb-3 leading-snug"
                  style={serif}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#374151] text-sm leading-relaxed mb-5"
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                />
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
