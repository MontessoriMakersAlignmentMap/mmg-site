import Link from 'next/link'
import Image from 'next/image'

const serif = { fontFamily: 'var(--font-heading)' }

export default function HiringSelectionToolkitPage() {
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
              Montessori Hiring &amp; Selection Toolkit
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              Equitable, philosophy-aligned hiring &mdash; from job description through offer.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>
              $450
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://buy.stripe.com/8x2cN72vK5KUcZ9fg52cg0J"
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
              src="/images/toolbox/hiring-selection-toolkit.png"
              alt="Montessori Hiring & Selection Toolkit — Montessori Makers Toolbox"
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
              Most Montessori schools are hiring with tools built for traditional schools.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                Generic job descriptions that don&rsquo;t capture what Montessori culture fit
                actually means. Interview questions that test credential recall instead of
                pedagogical philosophy. Evaluation rubrics that reward confidence over alignment.
                The result: hires that look good on paper and struggle in the environment &mdash;
                not because they lack skill, but because the hiring process was never designed to
                surface philosophy alignment as a real hiring criterion.
              </p>
              <p>
                There is also an equity problem embedded in most school hiring processes. When
                evaluation criteria are informal, well-networked or confident candidates get
                through regardless of alignment. Candidates who would thrive in a Montessori
                environment &mdash; but who don&rsquo;t perform in unstructured interviews or who
                don&rsquo;t know the right vocabulary yet &mdash; get screened out. The result is
                a hiring system that reproduces the same profile over and over, regardless of
                whether that profile is actually the best fit.
              </p>
              <p>
                The Hiring &amp; Selection Toolkit is built for the specific challenge of
                Montessori hiring &mdash; finding people who don&rsquo;t just hold a credential
                but understand, live, and can contribute to the philosophy of your school. Every
                document was built with equity and alignment as twin design principles: reducing
                the bias that causes good candidates to be overlooked, and surfacing the philosophy
                alignment that determines whether a hire succeeds.
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
            26-page toolkit across the full hiring cycle.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            From the moment you define a role through the day a new hire starts, every stage of
            the process has a structured, Montessori-aligned tool to support it.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Job Description Templates (12)',
                desc:
                  'Role-specific JDs for classroom guides, assistant guides, program directors, curriculum coordinators, administrative staff, and leadership roles &mdash; all written to communicate Montessori culture expectations, not just credential requirements.',
              },
              {
                title: 'Interview Question Bank (60+ questions)',
                desc:
                  'Organized by domain &mdash; philosophy, culture fit, adult relationships, classroom practice, leadership, and equity &mdash; with scoring rubrics for each question. Structured so panels can pull 8&ndash;10 questions per role rather than using everything at once.',
              },
              {
                title: 'Candidate Evaluation Rubrics (6)',
                desc:
                  'Structured rubrics for rating candidates across philosophy alignment, cultural fit, competency, and equity dimensions. Designed for use in panel debrief after interviews &mdash; not during the interview &mdash; to reduce real-time bias.',
              },
              {
                title: 'Reference Check Guides (3)',
                desc:
                  'Structured reference check questions organized by role type, with follow-up probe questions that surface philosophy alignment and culture fit signals that candidates rarely volunteer in interviews.',
              },
              {
                title: 'Offer Letter Templates (4)',
                desc:
                  'Role-appropriate offer letter templates covering compensation, expectations, and onboarding timeline &mdash; written to begin the cultural integration process before a candidate&rsquo;s first day.',
              },
              {
                title: 'Onboarding Checklist',
                desc:
                  'A 30-60-90 day onboarding checklist designed to integrate new hires into Montessori culture &mdash; not just orientation logistics. Covers philosophy immersion, relationship building, and early practice feedback.',
              },
              {
                title: 'Equitable Hiring Process Guide',
                desc:
                  'A standalone guide to designing a hiring process that reduces structural bias and improves candidate experience. Covers job posting strategy, application review protocols, panel composition, and evaluation calibration.',
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
                Anyone who has made a hire that looked right and wasn&rsquo;t.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                The Toolkit is for school leaders who understand that hiring is the highest-stakes
                organizational decision they make &mdash; and who want a process that is rigorous
                enough to find the right person, equitable enough to avoid systematic exclusion,
                and grounded enough in Montessori philosophy to actually work in their environment.
              </p>
            </div>
            <div>
              <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
                {[
                  'Heads of school and directors responsible for hiring decisions',
                  'HR leads managing hiring processes across multiple roles or campuses',
                  'Schools that have experienced poor hiring outcomes and want to understand why',
                  'Schools building their first formal hiring system from scratch',
                  'Hiring committees wanting a structured, equitable evaluation process',
                  'Schools that have relied on referrals and intuition &mdash; and want to add rigor',
                  'Schools where turnover in the first year signals an onboarding or fit problem',
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
              Start with the Job Description Templates and the Equitable Hiring Process Guide
              before you open a search &mdash; these set the structural conditions for everything
              that follows. The Interview Question Bank is organized so you can pull 8&ndash;10
              questions per role rather than using the full bank; resist the temptation to ask
              everything. The Candidate Evaluation Rubrics are designed for use during panel
              debrief, not during the interview itself &mdash; this distinction matters for
              reducing real-time bias. Save the Reference Check Guides for finalists, and use the
              Onboarding Checklist from day one of the offer, not the first day of work.
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
            Montessori Hiring &amp; Selection Toolkit
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>
            $450
          </p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Build a hiring process that finds the right people &mdash; and stops losing the
            ones your school actually needs.
          </p>
          <a
            href="https://buy.stripe.com/8x2cN72vK5KUcZ9fg52cg0J"
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
                  'When a leadership role opens, the Transition Toolkit structures the search process and incoming leader onboarding that the Hiring Toolkit sets in motion.',
              },
              {
                title: 'Performance Concerns & Separation Toolkit',
                slug: 'performance-separation-toolkit',
                desc:
                  'When a hire doesn&rsquo;t work out, this toolkit provides the structured frameworks for managing performance and, when necessary, separation with dignity and legal grounding.',
              },
              {
                title: 'Adult Culture Framework',
                slug: 'adult-culture-framework',
                desc:
                  'The culture new hires enter matters as much as who you select. The Adult Culture Framework ensures the environment is worth hiring into.',
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
