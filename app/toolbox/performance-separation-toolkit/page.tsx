import Image from 'next/image'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function PerformanceSeparationToolkitPage() {
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
              Performance Concerns &amp; Separation Toolkit
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              Structured, dignified, and legally sound processes for the conversations no one
              prepares you for.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>
              $395
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://buy.stripe.com/bJedRb4DS8X61grc3T2cg0L"
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
              src="/images/toolbox/performance-concerns-separation-toolkit.png"
              alt="Performance Concerns &amp; Separation Toolkit — Montessori Makers Toolbox"
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
              No one trains Montessori leaders for performance management.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                The preparation is heavy on philosophy and light on the organizational reality
                that sometimes, someone is not performing &mdash; and the leader is responsible
                for addressing it. Most leaders improvise their way through performance
                conversations, hoping the situation resolves. When it doesn&rsquo;t, they find
                themselves in a separation process they were never prepared for, with no
                documentation and real legal exposure.
              </p>
              <p>
                The result isn&rsquo;t just organizational &mdash; it&rsquo;s deeply human.
                Poorly managed performance processes harm the employee, who deserves clarity
                and honest feedback rather than ambiguous signals and delayed accountability.
                They harm the team that watches an unresolved situation drag on and draws
                their own conclusions about whether standards are real. And they harm the
                leader who carries the weight of a problem they can&rsquo;t solve because they
                don&rsquo;t have the tools to approach it.
              </p>
              <p>
                The Performance Concerns &amp; Separation Toolkit provides the structure,
                language, and documentation framework to handle these situations with clarity,
                dignity, and appropriate legal grounding. It doesn&rsquo;t make hard
                conversations easy. It makes them possible to have well.
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
            112-page toolkit covering performance management through separation.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Every document in this toolkit was built to address a specific failure point in
            how Montessori schools handle performance concerns &mdash; from the first conversation
            through the final communication to staff.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Performance Concern Framework',
                desc:
                  'A structured model for identifying, categorizing, and responding to performance concerns &mdash; covering both conduct and practice issues, and distinguishing between concerns that require support, concerns that require accountability, and concerns that require both.',
              },
              {
                title: 'Progressive Discipline Templates (7)',
                desc:
                  'Documented templates for verbal warning, written warning, performance improvement plan, final warning, and separation &mdash; all editable and reviewed in structure for legal soundness. Each template includes framing language and documentation fields.',
              },
              {
                title: 'Performance Improvement Plan (PIP) Template',
                desc:
                  'A full PIP template with goal-setting, timeline, check-in structure, and documentation protocols &mdash; designed to give the employee a genuine pathway to improvement, not a pretext for termination.',
              },
              {
                title: 'Difficult Conversation Guide',
                desc:
                  'A framework for preparing and conducting performance conversations &mdash; covering opening framing, listening structure, and documentation follow-up. Includes sample language for the specific moments leaders most often freeze.',
              },
              {
                title: 'Separation Process Guide',
                desc:
                  'A step-by-step process for managing voluntary and involuntary separations &mdash; covering the conversation, documentation, communication to staff, final pay and logistics, and transition management in the aftermath.',
              },
              {
                title: 'Separation Communication Templates (5)',
                desc:
                  'Templates for communicating a staff departure to different audiences &mdash; direct team, full staff, families, and board &mdash; written to maintain community trust while respecting confidentiality.',
              },
              {
                title: 'Documentation Standards Guide',
                desc:
                  'Standards for how and what to document throughout a performance concern &mdash; protecting the school, the process, and the employee&rsquo;s dignity. The most frequently overlooked element of performance management.',
              },
              {
                title: 'Legal Compliance Checklist',
                desc:
                  'A reference checklist for common legal compliance considerations in performance management and separation. Note: this is structured guidance for knowing when to consult counsel, not legal advice itself.',
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
                Every leader who has ever delayed a performance conversation they knew was necessary.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                This toolkit is for any leader who has found themselves in a performance situation
                without the structure to address it well &mdash; and who recognizes that
                avoidance is its own form of harm. It is also for leaders who want to build the
                systems before they need them, so that when a difficult situation arises, the
                structure is already in place.
              </p>
            </div>
            <div>
              <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
                {[
                  'Heads of school managing their first serious performance situation',
                  'Directors responsible for staff performance across a program',
                  'Schools that have experienced an unmanaged performance situation and want better systems',
                  'HR leads building formal performance management infrastructure',
                  'Schools where a separation was handled poorly and trust was damaged',
                  'Leaders who want to be fair and clear but lack the tools to act on both',
                  'Boards wanting assurance that the head has defensible HR processes in place',
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
              Read the Performance Concern Framework and the Documentation Standards Guide before
              using any individual template. The framework will help you assess what stage
              you&rsquo;re in and which documents apply. Do not begin documentation after a
              concern has been identified &mdash; the most important insight in this toolkit is
              that documentation is a discipline built before you need it. If you are already
              in an active situation, consult your school&rsquo;s counsel alongside this toolkit;
              the Legal Compliance Checklist will help you identify where your jurisdiction may
              require specific steps.
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
            Performance Concerns &amp; Separation Toolkit
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>
            $395
          </p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            The structure to handle the hardest conversations &mdash; with clarity, dignity,
            and documentation that holds.
          </p>
          <a
            href="https://buy.stripe.com/bJedRb4DS8X61grc3T2cg0L"
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
                  'Most performance concerns are symptoms of cultural patterns. The Adult Culture Framework addresses the upstream conditions that produce performance problems downstream.',
              },
              {
                title: 'Staff Handbook Toolkit',
                slug: 'staff-handbook',
                desc:
                  'Performance management is much easier when expectations are written. The Staff Handbook Toolkit codifies the standards that make performance accountability defensible.',
              },
              {
                title: 'Hiring & Selection Toolkit',
                slug: 'hiring-selection-toolkit',
                desc:
                  'The best performance management is upstream: hiring the right people in the first place. The Hiring Toolkit reduces the frequency of performance situations by improving selection.',
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
