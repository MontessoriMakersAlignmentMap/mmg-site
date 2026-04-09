import Link from 'next/link'
import Image from 'next/image'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const whatItDoes = [
  'Establishes a shared, tiered framework that distinguishes peer conflict from leadership-level conflict and routes each appropriately',
  'Provides a step-by-step protocol for initiating, facilitating, and closing conflict conversations with documented outcomes',
  'Decouples feedback from evaluation, creating separate structures for each that protect both parties',
  'Embeds equity checkpoints at each stage of the protocol to surface patterns, reduce inconsistency, and interrupt harm',
  'Reduces over-reliance on individual personalities or informal norms to manage difficult dynamics',
  'Creates documentation infrastructure that is transparent, defensible, and useful for institutional learning — not just compliance',
]

const whatsIncluded = [
  'Full Conflict & Feedback Protocol guide — PDF and editable format',
  'Conflict intake template for documenting concerns before a formal conversation begins',
  'Stage-by-stage facilitation framework with prompts for each phase of the conversation',
  'Peer feedback guide and supervisor feedback guide — separate tools for separate contexts',
  'Equity review checklist for use before and after each protocol activation',
  'Administrator implementation guide covering rollout, team training, and policy integration',
  'Definitions and terms glossary for establishing shared language before the protocol is needed',
]

const whoItsFor = [
  'Heads of school and executive directors who manage adult conflict as a direct responsibility',
  'Program directors navigating tension within teaching teams or between staff and leadership',
  'Instructional coaches who give regular, high-stakes feedback to guides',
  'HR and operations leads responsible for documentation consistency and equity in process',
  'Leadership teams designing or overhauling the conflict and feedback sections of a staff handbook',
  'Any school in a season of adult culture repair or organizational reset',
]

export default function ConflictFeedbackProtocolPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end gap-12 md:gap-20">
            {/* Text */}
            <div className="flex-1 max-w-2xl">
              <Link
                href="/toolbox"
                className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase hover:underline mb-8 inline-block"
              >
                &larr; Toolbox
              </Link>
              <p className="text-[#94A3B8] text-[11px] tracking-[0.2em] uppercase mb-5">
                Frameworks &nbsp;&middot;&nbsp; The Prepared Adult Institution&trade;
              </p>
              <h1
                className="text-5xl md:text-6xl text-white leading-[1.04] tracking-tight mb-8"
                style={serif}
              >
                Conflict &amp; Feedback Protocol&trade;
              </h1>
              <p className="text-[#94A3B8] text-xl leading-relaxed mb-10">
                Most Montessori schools have values. Few have a system for what happens
                when those values are tested between adults.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <a
                  href="https://buy.stripe.com/dRm28tdaoa1a5wH6Jz2cg0O"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium"
                >
                  Buy Now &mdash; $210
                </a>
                <p className="text-[#64748B] text-sm self-center">
                  26-page protocol + tools
                </p>
              </div>
            </div>

            {/* Cover image */}
            <div className="relative w-52 md:w-64 flex-shrink-0 shadow-2xl self-center md:self-auto">
              <Image
                src="/images/toolbox/conflict-feedback-protocol.png"
                alt="Conflict & Feedback Protocol — Montessori Makers Toolbox"
                width={400}
                height={520}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── DESCRIPTION ───────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
                About This Tool
              </p>
              <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
                <p>
                  Conflict in schools is not a sign of dysfunction &mdash; it is a sign of people
                  doing meaningful work in close proximity. The problem is not that conflict exists.
                  The problem is that most organizations handle it inconsistently, inequitably, and
                  without a shared framework that everyone can trust.
                </p>
                <p>
                  The Conflict &amp; Feedback Protocol&trade; is a complete organizational system
                  for navigating conflict and delivering feedback in ways that uphold dignity,
                  protect trust, and produce genuine resolution. It is built for the specific terrain
                  of Montessori schools: multi-role leadership structures, high relational investment,
                  and the particular dissonance that arises when institutions committed to human
                  dignity fail to model it in their adult culture.
                </p>
                <p>
                  This is not a mediation script or a sensitivity training supplement. It is a
                  working framework &mdash; documented, tiered, and equity-checked &mdash; that
                  gives leadership teams, program directors, and coaches a consistent way to handle
                  the hardest professional conversations in school life.
                </p>
              </div>
            </div>

            {/* Why It Matters */}
            <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-10">
              <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
                Why It Matters
              </p>
              <p className="text-[#374151] text-base leading-relaxed mb-6">
                Montessori&apos;s vision of the prepared environment has always implied a prepared
                adult &mdash; one who brings self-awareness, clarity, and relational integrity to the
                work. But that vision rarely extends to the organizational systems that govern how
                adults treat each other when something goes wrong.
              </p>
              <p className="text-[#374151] text-base leading-relaxed mb-6">
                Schools without a shared conflict and feedback framework don&apos;t simply have
                uncomfortable conversations &mdash; they have inconsistent ones. The same situation
                is handled differently depending on who is involved, who holds power, and how
                comfortable the people in the room are with direct communication.
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                That inconsistency compounds over time: it concentrates harm, creates distrust, and
                produces exactly the kind of adult culture that cannot hold a healthy environment for
                children. This protocol is designed to close that gap.
              </p>
              <div className="mt-8 pt-8 border-t border-[#E2DDD6]">
                <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-3">
                  Part of
                </p>
                <p className="text-[#0e1a7a] text-sm font-semibold tracking-wide">
                  The Prepared Adult Institution&trade;
                </p>
                <p className="text-[#64748B] text-xs mt-1 tracking-wide uppercase">
                  Clarity &middot; Directness &middot; Boundaries &middot; Repair
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IT DOES + WHAT'S INCLUDED ────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          {/* What This Tool Does */}
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-8">
              What This Tool Does
            </p>
            <ul className="space-y-5">
              {whatItDoes.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="text-[#d6a758] flex-shrink-0 font-semibold mt-0.5 text-base leading-none">
                    &mdash;
                  </span>
                  <span className="text-[#374151] text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What's Included */}
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-8">
              What&apos;s Included
            </p>
            <ul className="space-y-5">
              {whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="text-[#d6a758] flex-shrink-0 font-semibold mt-0.5 text-base leading-none">
                    &mdash;
                  </span>
                  <span className="text-[#374151] text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ──────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Who It&apos;s For
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight"
              style={serif}
            >
              Built for leaders carrying the hard work of adult culture.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whoItsFor.map((item) => (
              <div
                key={item}
                className="border border-[#E2DDD6] p-6"
              >
                <span className="text-[#d6a758] font-semibold text-base leading-none block mb-3">
                  &mdash;
                </span>
                <p className="text-[#374151] text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PURCHASE CTA ──────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h2
              className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-5"
              style={serif}
            >
              Ready to build a consistent conflict and feedback system?
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              One protocol. Consistent outcomes. A healthier adult culture.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center flex-shrink-0">
            <a
              href="https://buy.stripe.com/dRm28tdaoa1a5wH6Jz2cg0O"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-white text-[13px] px-12 py-5 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium text-center whitespace-nowrap"
            >
              Buy Now &mdash; $210
            </a>
            <Link
              href="/toolbox"
              className="text-[#64748B] text-xs tracking-wide hover:text-white transition-colors"
            >
              &larr; Back to Toolbox
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  )
}
