import Link from 'next/link'
import Image from 'next/image'

const serif = { fontFamily: 'var(--font-heading)' }

export default function LeadershipTransitionToolkitPage() {
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
              Leadership Transition &amp; Succession Toolkit
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              Protect what your school has built when leadership changes.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>
              $425
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://buy.stripe.com/8x25kF5HWc9i5wHc3T2cg0K"
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
              src="/images/toolbox/leadership-transition-succession-toolkit.png"
              alt="Leadership Transition & Succession Toolkit — Montessori Makers Toolbox"
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
              Schools dramatically underestimate what they lose when a leader leaves.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                It isn&rsquo;t just the person &mdash; it&rsquo;s the institutional memory stored
                in their head, the invisible systems they&rsquo;ve been running informally, the
                relationships they&rsquo;ve been holding, and the cultural authority they&rsquo;ve
                accumulated over years. Without intentional transition work, these disappear.
                New leaders arrive into ambiguity. Boards fill the gap with anxiety. Staff
                improvise. Culture drifts.
              </p>
              <p>
                Most schools treat leadership transition as a staffing event: post the job, run
                the search, hire the person. What they miss is that transition is an
                organizational event that requires as much preparation before the departure as
                after the arrival. The outgoing leader needs to transfer knowledge they
                don&rsquo;t even know they hold. The incoming leader needs context that a job
                description cannot provide. The board needs a governance process for the
                in-between. Staff need communication that holds culture stable while change
                happens.
              </p>
              <p>
                The Leadership Transition &amp; Succession Toolkit is a structured response to
                this pattern. It provides the frameworks, documentation templates, and process
                guides that make leadership transition a managed organizational event &mdash; rather
                than an emergency. Whether a transition is planned or unplanned, voluntary or not,
                this toolkit gives schools the structure to protect what they&rsquo;ve built and
                give incoming leaders a real foundation to stand on.
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
            64-page toolkit across the full transition lifecycle.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            From proactive succession planning through the incoming leader&rsquo;s first 90 days,
            every stage of a leadership transition has structured support.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Succession Planning Framework',
                desc:
                  'A structured process for assessing succession readiness, identifying leadership pipelines, and planning ahead for inevitable transitions &mdash; designed to be used proactively, 12&ndash;24 months before a change.',
              },
              {
                title: 'Transition Readiness Audit',
                desc:
                  'A diagnostic for assessing how prepared your school is for leadership change &mdash; covering documentation gaps, systems dependencies, institutional knowledge concentration, and board readiness.',
              },
              {
                title: 'Knowledge Transfer Templates (8)',
                desc:
                  'Structured documents for capturing institutional memory &mdash; programs, systems, relationships, history, and informal practices that live in the outgoing leader&rsquo;s head and would otherwise leave with them.',
              },
              {
                title: 'Outgoing Leader Transition Guide',
                desc:
                  'A structured 60&ndash;90 day guide for departing leaders covering handoff priorities, documentation responsibilities, and stakeholder communication &mdash; making the departure a contribution rather than a loss.',
              },
              {
                title: 'Incoming Leader 90-Day Framework',
                desc:
                  'A structured onboarding and orientation guide for new leaders &mdash; covering culture orientation, relationship mapping, listening tour structure, and early decision frameworks that prevent the most common new-leader mistakes.',
              },
              {
                title: 'Board Communication Templates (5)',
                desc:
                  'Templates for announcing a transition, managing the search period, and communicating with families and staff &mdash; written to maintain institutional trust through the ambiguity of leadership change.',
              },
              {
                title: 'Interim Leadership Playbook',
                desc:
                  'A guide for running the school effectively during a leadership gap &mdash; covering decision protocols, culture maintenance, communication standards, and search management so nothing falls through.',
              },
              {
                title: 'Search Committee Guide',
                desc:
                  'A structured guide for boards running a leadership search &mdash; including process design, candidate evaluation criteria, finalist selection frameworks, and the debrief protocols that produce defensible decisions.',
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
                Use it before you need it. It also works after.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                The Toolkit is most powerful when used proactively &mdash; before any departure
                is on the horizon. But it was also designed to be useful in active transitions,
                including unplanned ones. If you&rsquo;re already in a transition, start with
                the Transition Readiness Audit and move from there.
              </p>
            </div>
            <div>
              <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
                {[
                  'Heads of school beginning to think about their own departure timeline',
                  'Boards anticipating or currently managing leadership change',
                  'Schools in the aftermath of an unplanned departure',
                  'Schools wanting to build transition readiness before it becomes urgent',
                  'Incoming leaders who want a structured framework for their first 90 days',
                  'Boards managing an interim period and needing governance clarity',
                  'Schools where critical institutional knowledge lives in one person&rsquo;s head',
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
              The Succession Planning Framework is designed to be used proactively &mdash; ideally
              12&ndash;24 months before a transition, when you can afford to be deliberate. If you
              are already in a transition, start with the Transition Readiness Audit and the
              Knowledge Transfer Templates; these two documents produce the most immediate clarity
              in an active situation. The Board Communication Templates can be adapted within
              hours for active search communications. Do not wait until the new leader is seated
              to begin using the 90-Day Framework &mdash; share it with them during the offer
              process.
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
            Leadership Transition &amp; Succession Toolkit
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>
            $425
          </p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            The structure to protect what you&rsquo;ve built &mdash; whether a transition is
            years away or happening now.
          </p>
          <a
            href="https://buy.stripe.com/8x25kF5HWc9i5wHc3T2cg0K"
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
                title: 'Leadership Operations Playbook',
                slug: 'leadership-operations-playbook',
                desc:
                  'The more documented your operating systems are, the more survives a transition. The Operations Playbook creates the infrastructure the Transition Toolkit helps you transfer.',
              },
              {
                title: 'Board Onboarding & Alignment Toolkit',
                slug: 'board-onboarding-toolkit',
                desc:
                  'Board governance during a leadership transition requires clarity of roles and process. The Board Onboarding Toolkit ensures your board is ready to lead a search without overstepping.',
              },
              {
                title: 'Hiring & Selection Toolkit',
                slug: 'hiring-selection-toolkit',
                desc:
                  'Once the Transition Toolkit structures the departure, the Hiring Toolkit provides the equitable, philosophy-aligned process for selecting the right incoming leader.',
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
