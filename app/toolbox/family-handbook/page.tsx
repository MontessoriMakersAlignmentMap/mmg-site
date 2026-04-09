import Image from 'next/image'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function FamilyHandbookPage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Handbooks &middot; Montessori Makers Toolbox
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={serif}
            >
              Montessori Family Handbook
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              A comprehensive family handbook that reflects your philosophy, not a generic school
              district template.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>
              $197
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://buy.stripe.com/6oU4gB1rG1uEbV51pf2cg0H"
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
              src="/images/toolbox/family-handbook.png"
              alt="Montessori Family Handbook — Montessori Makers Toolbox"
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
              Most Montessori family handbooks struggle in one of two directions.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                They are either too vague to be useful &mdash; aspirational philosophy with no
                operational substance, written so carefully that nothing concrete is actually
                communicated &mdash; or they are copied wholesale from a non-Montessori school
                district template that strips out everything that makes Montessori communication
                different. In both cases, the result is a document families receive and ignore.
              </p>
              <p>
                A family handbook is one of the most important communication documents a school
                produces. It sets community expectations, establishes culture, and tells families
                &mdash; in written form &mdash; what kind of institution they&rsquo;ve joined. It
                is read most carefully during conflict, during confusion, and during onboarding.
                A handbook that doesn&rsquo;t speak clearly in those moments isn&rsquo;t doing its most important work.
              </p>
              <p>
                The Montessori Family Handbook Template gives schools a professionally written,
                philosophically grounded starting point they can adapt to their own voice and
                context. It explains Montessori in accessible language. It covers both the
                philosophy and the logistics. It establishes community standards that reflect
                Montessori values. And it reads like it was written by a school that knows
                exactly what it is &mdash; because it was.
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
            A complete 72-page editable handbook template.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Every section families need, written for Montessori schools specifically, and fully
            editable in Word and Google Docs so your school can make it genuinely yours.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Full 58-Page Template',
                desc:
                  'Covers welcome and philosophy, school mission and values, Montessori overview for new families, enrollment and re-enrollment, tuition and fees, daily schedules and operations, communication expectations, community participation, behavior and conflict resolution, technology and media, health and safety, and school policies.',
              },
              {
                title: 'Philosophy Section',
                desc:
                  'A Montessori overview written in accessible language &mdash; explaining the prepared environment, mixed ages, work cycles, and assessment in terms families can understand, share, and use to contextualize what they observe in their child&rsquo;s classroom.',
              },
              {
                title: 'Community Standards Language',
                desc:
                  'Draft community expectations language covering communication norms, social media, conflict resolution, and family-staff relationships &mdash; written to reflect Montessori values around respect, directness, and shared responsibility.',
              },
              {
                title: 'Editable in Word and Google Docs',
                desc:
                  'Fully editable so your school can adapt language, remove inapplicable sections, insert school-specific policies, and adjust the voice to match your community. Organized by section so updates are easy to locate and make.',
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
                Schools that deserve a handbook as good as their program.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                The Family Handbook Template is for schools that have invested deeply in their
                Montessori program and want their family-facing documentation to reflect that
                investment &mdash; rather than undermining it with a generic, borrowed template
                that communicates nothing distinctive about who you are.
              </p>
            </div>
            <div>
              <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
                {[
                  'Schools creating their first formal family handbook',
                  'Schools updating an outdated or generic handbook that no longer reflects current culture',
                  'Admissions and enrollment teams responsible for family-facing documentation',
                  'New heads of school inheriting inconsistent or absent family communication practices',
                  'Schools where family conflict regularly arises from unclear expectations',
                  'Schools preparing for accreditation that requires formal family communication policies',
                  'Enrollment teams who want a handbook that supports re-enrollment conversations',
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
              The template is organized into sections that can be adopted wholesale or adapted
              individually. Most schools find the Philosophy and Community Standards sections
              require the most customization &mdash; these should reflect your specific
              school&rsquo;s voice, values, and community culture rather than generic Montessori
              language. The Operations and Policies sections are designed to be used close to
              as-written, with your school&rsquo;s specific logistics inserted. Plan for an
              annual review cycle before the start of each school year &mdash; handbooks that
              drift from current practice are actively unhelpful.
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
            Montessori Family Handbook
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>
            $197
          </p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            A complete, professional family handbook template &mdash; ready to adapt, not
            rebuild from scratch.
          </p>
          <a
            href="https://buy.stripe.com/6oU4gB1rG1uEbV51pf2cg0H"
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
                title: 'Staff Handbook Toolkit',
                slug: 'staff-handbook',
                desc:
                  'The internal counterpart to the Family Handbook &mdash; a 234-page staff handbook template that codifies the adult culture expectations families experience when they interact with your team.',
              },
              {
                title: 'Adult Culture Framework',
                slug: 'adult-culture-framework',
                desc:
                  'The family handbook communicates culture to families; the Adult Culture Framework builds that culture among the adults who live it. Both documents are stronger when they&rsquo;re aligned.',
              },
              {
                title: 'Hiring & Selection Toolkit',
                slug: 'hiring-selection-toolkit',
                desc:
                  'The people families interact with matter as much as the documents they receive. The Hiring Toolkit ensures you&rsquo;re selecting guides and staff who can embody what your handbook promises.',
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
