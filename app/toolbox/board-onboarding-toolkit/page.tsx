import Image from 'next/image'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function BoardOnboardingToolkitPage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Governance &amp; Stewardship &middot; Montessori Makers Toolbox
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={serif}
            >
              Board Onboarding &amp; Alignment Toolkit
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              Build shared understanding of roles, culture, and expectations from day one.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>
              $325
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://buy.stripe.com/fZubJ33zOehqe3dec12cg0M"
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
              src="/images/toolbox/board-onboarding-alignment-toolkit.png"
              alt="Board Onboarding &amp; Alignment Toolkit — Montessori Makers Toolbox"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          {/* Right: problem text */}
          <div>
            {/* ── METADATA PANEL ──── */}
            <div className="bg-[#F2EDE6] border-l-4 border-[#d6a758] px-6 py-5 mb-10">
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">What&rsquo;s Inside</p>
              <p className="text-[#0e1a7a] text-sm font-semibold mb-3">61 pages &middot; Editable DOCX</p>
              <ul className="space-y-1.5">
                {['Board Orientation Program', 'Board Member Handbook Template', 'Role Clarity Guide', 'Governance Self-Assessment', 'New Member Onboarding Checklist', 'Meeting Structure Templates (4)', 'Head/Board Relationship Guide', 'Board Culture Assessment'].map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[#374151] text-sm leading-snug">
                    <span className="text-[#d6a758] font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              The Problem This Solves
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-10"
              style={serif}
            >
              Most board dysfunction doesn&rsquo;t start with a crisis. It starts with
              onboarding that never happened.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                New board members arrive without a shared understanding of what governance
                actually means in a Montessori school. They receive bylaws, a welcome email,
                and a seat at the table. What they don&rsquo;t receive: a clear picture of their
                role versus the head&rsquo;s role, the culture of the board they&rsquo;re joining,
                the school&rsquo;s financial position and strategic context, or the philosophical
                framework that makes this institution different from other schools they may have
                served.
              </p>
              <p>
                The gaps created by absent onboarding compound over time. Board members default
                to operational involvement because governance is never clearly defined. Heads of
                school spend time managing board dynamics that should be productive. Committees
                drift. Annual giving gets confused with philanthropic strategy. And the board&rsquo;s
                capacity to govern well &mdash; to hold the mission, support the head, and make
                good long-range decisions &mdash; erodes under the weight of unaddressed
                misalignment.
              </p>
              <p>
                The Board Onboarding &amp; Alignment Toolkit is a response to this structural
                problem. It provides the materials and processes to onboard board members well
                &mdash; and to align an existing board around shared understanding of governance,
                culture, and responsibility. It is equally useful for schools building their
                first onboarding program and for schools with an existing board that has never
                been formally aligned.
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
            61-page toolkit for board culture, onboarding, and governance alignment.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            From the first orientation session through annual self-assessment, every major
            governance touchpoint has a structured tool to support it.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Board Orientation Program',
                desc:
                  'A structured 2-session board orientation program covering Montessori governance philosophy, the head/board relationship, fiduciary responsibility, and board culture &mdash; designed to run in 90-minute sessions that can be facilitated by the head or an external facilitator.',
              },
              {
                title: 'Board Member Handbook Template',
                desc:
                  'A comprehensive handbook for new board members covering governance expectations, meeting structure, communication norms, and conflict of interest policy &mdash; written to be the reference document members return to throughout their term.',
              },
              {
                title: 'Role Clarity Guide',
                desc:
                  'A clear document defining the board chair, committee chair, individual member, and head of school roles &mdash; with explicit boundaries between governance and management. The single most-requested document in schools experiencing board friction.',
              },
              {
                title: 'Governance Self-Assessment',
                desc:
                  'An annual board self-assessment tool for evaluating board effectiveness, meeting quality, culture, and alignment &mdash; structured to produce honest, actionable data rather than affirmative responses.',
              },
              {
                title: 'New Member Onboarding Checklist',
                desc:
                  'A structured 60-day onboarding checklist for new board members covering orientation, reading, introductions, and first meeting preparation &mdash; so new members arrive ready to contribute rather than catching up.',
              },
              {
                title: 'Meeting Structure Templates (4)',
                desc:
                  'Agenda templates for regular board meetings, committee meetings, executive sessions, and strategic planning sessions &mdash; each designed to focus board time on governance rather than operational reporting.',
              },
              {
                title: 'Head/Board Relationship Guide',
                desc:
                  'A structured guide for clarifying and maintaining the head-board relationship &mdash; covering communication rhythms, role boundaries, and annual review structure. Reduces the most common source of governance dysfunction.',
              },
              {
                title: 'Board Culture Assessment',
                desc:
                  'A diagnostic for assessing the current culture of your board &mdash; trust, communication, engagement, and alignment. Designed for use at the start of a governance improvement process or at annual retreat.',
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
                Boards that want to govern well &mdash; and heads who want them to.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                The Toolkit is for any school where the board is a source of energy or a
                source of friction &mdash; because in both cases, the alignment work matters.
                Strong boards get stronger with structure. Struggling boards get clarity they
                can work from. The investment is modest; the organizational return is
                substantial.
              </p>
            </div>
            <div>
              <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
                {[
                  'Heads of school responsible for board development and governance',
                  'Board chairs building board culture and member effectiveness',
                  'Schools preparing to onboard a cohort of new board members',
                  'Schools experiencing board dysfunction or head/board role confusion',
                  'Governance committees responsible for board recruitment and orientation',
                  'Schools in leadership transition where board clarity is especially critical',
                  'Boards that have never formally examined their own effectiveness',
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
              Start with the Role Clarity Guide and the Head/Board Relationship Guide &mdash;
              these are the most frequently requested documents in schools experiencing board
              friction, and they produce immediate clarity regardless of where your board is
              currently. The Board Orientation Program is designed to run in two sessions of
              90 minutes each and can be facilitated by the head of school or an external
              facilitator. For existing boards, the Board Culture Assessment and the Governance
              Self-Assessment can be used as standalone diagnostics before you introduce any
              structural changes.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. PRICING + BUY ─────────────────────────────────────────────── */}

      {/* ── PREVIEW ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-4">
              Inside the Toolkit
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight tracking-tight"
              style={serif}
            >
              A look inside.
            </h2>
          </div>
          <object
            data="/toolbox-previews/board-onboarding-toolkit-preview.pdf#toolbar=0&navpanes=0"
            type="application/pdf"
            className="w-full border border-[#E2DDD6]"
            style={{ height: '960px' }}
          >
            <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-8 text-center">
              <p className="text-[#374151] text-sm">PDF preview not available in this browser.</p>
            </div>
          </object>
        </div>
      </section>
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4"
            style={serif}
          >
            Board Onboarding &amp; Alignment Toolkit
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>
            $325
          </p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Give your board the foundation to govern well &mdash; from the first meeting through
            the most consequential decisions.
          </p>
          <a
            href="https://buy.stripe.com/fZubJ33zOehqe3dec12cg0M"
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
                title: 'Leadership Transition & Succession Toolkit',
                slug: 'leadership-transition-toolkit',
                desc:
                  'When the board is managing a leadership transition, this toolkit provides the process structure for the search, interim period, and incoming leader onboarding.',
              },
              {
                title: 'Leadership Operations Playbook',
                slug: 'leadership-operations-playbook',
                desc:
                  'The board&rsquo;s governance effectiveness depends partly on the operational clarity of the leadership team it oversees. The Operations Playbook builds the infrastructure the board needs to see.',
              },
              {
                title: 'Adult Culture Framework',
                slug: 'adult-culture-framework',
                desc:
                  'Board culture is adult culture. The Adult Culture Framework addresses the organizational dynamics that shape how boards communicate, trust, and make decisions together.',
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
