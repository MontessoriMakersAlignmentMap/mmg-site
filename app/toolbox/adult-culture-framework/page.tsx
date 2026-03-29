import Link from 'next/link'
import Image from 'next/image'

const serif = { fontFamily: 'var(--font-heading)' }

export default function AdultCultureFrameworkPage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Frameworks &middot; Montessori Makers Toolbox
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={serif}
            >
              Adult Culture Framework
            </h1>
            <p className="text-[11px] tracking-[0.14em] uppercase text-white/50 mb-2">
              Prepared Adult Institution&trade;
            </p>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              Replace informal norms with principled, Montessori-aligned adult infrastructure.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>
              $695
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://buy.stripe.com/bJe28t1rGc9i1gr9VL2cg0N"
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
              src="/images/toolbox/adult-culture-framework.png"
              alt="Adult Culture Framework — Montessori Makers Toolbox"
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
              Schools invest in the prepared environment for children. Almost nothing goes into the
              prepared environment for adults.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                Adult culture in most Montessori schools is built on informal norms, institutional
                habits, and the personalities of whoever has been there the longest. This creates
                real organizational fragility: when those people leave, the culture leaves with them.
                When conflict arises, there is no principled framework for addressing it &mdash; only
                personality and politics.
              </p>
              <p>
                The result is a school where adults are expected to demonstrate the same
                intentionality and prepared-environment thinking they bring to children&rsquo;s
                spaces &mdash; but where no equivalent structure exists for their own professional
                world. Communication norms are assumed, not stated. Conflict resolution is
                improvised. Professional development is uneven. Belonging is either experienced or
                it isn&rsquo;t, with no deliberate architecture supporting it.
              </p>
              <p>
                The Adult Culture Framework is a direct response to this pattern. It replaces
                informal norms with a coherent, written, principled architecture for adult culture
                &mdash; one that reflects Montessori values, organizational research, and the
                specific pressures of mission-driven schools. The framework is not a set of rules.
                It is a system for thinking, communicating, and deciding about adult experience in
                your school &mdash; one that holds even when the specific people in roles change.
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
            Everything you need to build principled adult culture.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            The Adult Culture Framework includes a 57-page field guide plus culture audit
            instruments, facilitation guides, and policy templates &mdash; structured for
            phased implementation across your whole school community.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: '57-Page Field Guide',
                desc:
                  'The core framework &mdash; covering adult culture theory, Montessori organizational philosophy, self-assessment tools, and implementation guidance across all major cultural domains including communication, trust, conflict, and professional development.',
              },
              {
                title: 'Culture Audit Instrument',
                desc:
                  'A structured diagnostic for assessing your school&rsquo;s current adult culture across the five domains of communication, trust, conflict, belonging, and professional development. Establishes a measurable baseline before you introduce change.',
              },
              {
                title: 'Leadership Self-Assessment',
                desc:
                  'A personal assessment for heads of school and directors evaluating their own contribution to adult culture. Built on the principle that culture work begins with leaders examining their own patterns before asking others to change.',
              },
              {
                title: 'Policy Templates (8)',
                desc:
                  'Draft policies covering professional conduct, conflict resolution, communication norms, confidentiality, and staff belonging &mdash; all written in Montessori-aligned language and editable for your school&rsquo;s specific context and jurisdiction.',
              },
              {
                title: 'Facilitation Guides (3)',
                desc:
                  'Structured guides for leading adult culture conversations with your full staff, leadership team, and board. Each guide includes framing language, discussion questions, and protocols for handling difficult responses.',
              },
              {
                title: 'Implementation Timeline',
                desc:
                  'A 90-day rollout framework for introducing the Adult Culture Framework to your school community &mdash; sequenced to build trust and buy-in rather than triggering resistance through premature disclosure.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white flex flex-col">
                <div className="h-1 bg-[#d6a758]" />
                <div className="p-7 flex-1">
                  <h3
                    className="text-[#0e1a7a] text-lg font-semibold mb-3 leading-snug"
                    style={serif}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
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
                Leaders ready to move from informal norms to intentional culture.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                The Adult Culture Framework is built for school leaders who recognize that
                organizational culture doesn&rsquo;t maintain itself &mdash; and that the informal
                systems currently holding their school together are more fragile than they appear.
                This is a tool for leaders who want to build something that outlasts any one person.
              </p>
            </div>
            <div>
              <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
                {[
                  'Heads of school building or rebuilding leadership team infrastructure',
                  'Directors managing adult culture across a program or campus',
                  'Schools experiencing persistent communication breakdown or conflict',
                  'Schools with high staff turnover seeking to understand the cultural root',
                  'Schools preparing for leadership transition where culture continuity matters',
                  'Leadership teams that have inherited norms they didn&rsquo;t design and can&rsquo;t defend',
                  'New heads of school wanting to assess and articulate the culture they&rsquo;ve inherited',
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
              The Framework is designed for phased implementation over 90 days. Begin with the
              Culture Audit to establish a baseline before you introduce any of the framework to
              staff. Use the Leadership Self-Assessment before those conversations &mdash; it will
              reframe what you hear. The Facilitation Guides are structured to run with your
              existing meeting rhythms, so no separate retreat or off-site is required. Most
              leadership teams find the first 30 days produce more insight than action &mdash;
              that is by design.
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
            Adult Culture Framework
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>
            $695
          </p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            One investment. A cultural architecture that holds through transitions,
            conflicts, and growth.
          </p>
          <a
            href="https://buy.stripe.com/bJe28t1rGc9i1gr9VL2cg0N"
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
                  'The operational infrastructure every Montessori leadership team needs &mdash; meeting rhythms, decision protocols, and accountability systems that turn a group of capable leaders into a functioning organizational structure.',
              },
              {
                title: 'Performance Concerns & Separation Toolkit',
                slug: 'performance-separation-toolkit',
                desc:
                  'When adult culture breaks down in specific relationships, this toolkit provides the structured frameworks for performance management and separation &mdash; with dignity and legal grounding.',
              },
              {
                title: 'Staff Handbook Toolkit',
                slug: 'staff-handbook',
                desc:
                  'A 124-page editable staff handbook template that codifies the cultural expectations the Adult Culture Framework helps you define &mdash; turning norms into written policy.',
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
