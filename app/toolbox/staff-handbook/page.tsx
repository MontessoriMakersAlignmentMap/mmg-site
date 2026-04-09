import Image from 'next/image'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function StaffHandbookPage() {
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
              Montessori Staff Handbook Toolkit
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              A full staff handbook written with Montessori adult culture in mind &mdash; not
              adapted from corporate HR boilerplate.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>
              $297
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://buy.stripe.com/14AaEZ3zO7T2f7hec12cg0G"
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
              src="/images/toolbox/staff-handbook.png"
              alt="Montessori Staff Handbook Toolkit — Montessori Makers Toolbox"
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
              Staff handbooks are the most commonly neglected policy document in Montessori
              schools.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                Many schools don&rsquo;t have one. Many have one that was written 15 years ago
                and hasn&rsquo;t been touched since. Many have one that was copied from a school
                district template and feels entirely alien to the culture of a Montessori
                community &mdash; corporate language about performance improvement plans sitting
                next to aspirational language about the prepared adult, with no coherence between
                the two.
              </p>
              <p>
                This creates real risk &mdash; legal, cultural, and operational. When expectations
                aren&rsquo;t written down, they can&rsquo;t be enforced fairly. When policies
                aren&rsquo;t explicit, disputes are resolved inconsistently. When the handbook
                doesn&rsquo;t reflect the school&rsquo;s actual values, it communicates to staff
                that the written word and the real culture are two different things &mdash; and
                they respond accordingly.
              </p>
              <p>
                The Montessori Staff Handbook Toolkit is a complete, professionally structured
                staff handbook template &mdash; written with Montessori adult culture in mind,
                legally sound in structure, and fully editable so your school can make it
                genuinely yours. It covers everything a staff handbook needs to cover, and it
                does so in language that reflects the kind of institution you&rsquo;re trying
                to be.
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
            A complete 234-page editable staff handbook template.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Every policy domain a Montessori school needs to cover, written coherently,
            organized clearly, and structured to be legally defensible and culturally credible
            at the same time.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Full 124-Page Template',
                desc:
                  'Covers welcome and mission, employment policies, compensation and benefits, scheduling and attendance, professional development expectations, performance and evaluation, conduct and community standards, adult culture and belonging expectations, communication norms, conflict resolution, technology and media, leave policies, and separation procedures.',
              },
              {
                title: 'Adult Culture Chapter',
                desc:
                  'A dedicated chapter on adult culture expectations &mdash; written in language that reflects Montessori values around trust, communication, belonging, and professional conduct. The chapter most likely to distinguish this handbook from every other your staff has received.',
              },
              {
                title: 'Evaluation and Appraisal Section',
                desc:
                  'A structured performance review and appraisal framework built into the handbook &mdash; covering expectations, process, timeline, and documentation. Gives staff a clear picture of how performance is assessed before the review conversation happens.',
              },
              {
                title: 'Editable in Word and Google Docs',
                desc:
                  'Fully editable for your school&rsquo;s specific policies, voice, and legal jurisdiction. Organized with clear section headers and a table of contents so updates are easy to locate and make across annual review cycles.',
              },
              {
                title: 'Implementation Guide',
                desc:
                  'Notes throughout the document flagging sections that require school-specific decisions and sections that are designed to be used close to as-written. Reduces the time spent on adaptation without reducing the quality of the result.',
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
                Schools that want their policies to reflect who they actually are.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                The Staff Handbook Toolkit is for any school that recognizes the gap between
                what they say about adult culture and what their written policies actually
                communicate &mdash; and that wants to close it. A handbook that is coherent,
                current, and genuinely Montessori is an organizational asset. One that isn&rsquo;t
                is a liability.
              </p>
            </div>
            <div>
              <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
                {[
                  'Schools building a staff handbook for the first time',
                  'Schools with an outdated or generic handbook that doesn&rsquo;t reflect current culture',
                  'Heads of school and HR leads responsible for staff policy documentation',
                  'Schools that have experienced an employment dispute and recognize the documentation gap',
                  'Schools preparing for accreditation requiring formal employment policy documentation',
                  'New heads of school inheriting a handbook they didn&rsquo;t write and can&rsquo;t defend',
                  'Schools adding staff for the first time who need consistent onboarding documentation',
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
              Begin with a legal review of your jurisdiction&rsquo;s employment law requirements
              before finalizing the handbook &mdash; especially leave policies, at-will employment
              language (where applicable), and wage and hour provisions. The template is written
              to be legally sound in structure, but your school&rsquo;s counsel should review
              jurisdiction-specific language before distribution. Once the legal review is
              complete, plan a leadership team review of the Adult Culture and Conduct sections
              before sharing with staff &mdash; these are the sections most likely to generate
              questions. Plan for annual review and update at minimum; handbooks that fall out
              of date undermine the culture they&rsquo;re meant to support.
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
            data="/toolbox-previews/staff-handbook-toolkit-preview.pdf#toolbar=0&navpanes=0"
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
            Montessori Staff Handbook Toolkit
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>
            $297
          </p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            A complete, credible staff handbook &mdash; ready to adapt, legal in structure,
            and coherent with the culture you&rsquo;re building.
          </p>
          <a
            href="https://buy.stripe.com/14AaEZ3zO7T2f7hec12cg0G"
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
                  'The Staff Handbook codifies cultural expectations in writing; the Adult Culture Framework builds the shared understanding and infrastructure those expectations require to hold.',
              },
              {
                title: 'Performance Concerns & Separation Toolkit',
                slug: 'performance-separation-toolkit',
                desc:
                  'The handbook establishes the policies. The Performance Concerns Toolkit provides the process for what happens when those policies are not met &mdash; with documentation, structure, and legal grounding.',
              },
              {
                title: 'Family Handbook',
                slug: 'family-handbook',
                desc:
                  'The family-facing counterpart to the Staff Handbook &mdash; ensuring that the culture documented for staff is communicated consistently to the families who experience it.',
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
