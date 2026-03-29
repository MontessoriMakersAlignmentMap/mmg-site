import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const whoItIsFor = [
  'Schools committed to sustained change',
  'Leaders who want more than periodic support',
  'Boards and leadership teams navigating multi-year growth or transformation',
]

const included = [
  'Strategic planning and vision development',
  'Board development and governance coaching',
  'Adult culture and team dynamics work',
  'Equity work and inclusive systems design',
  'Hiring strategy and leadership succession',
  'Ongoing sounding board — available when things get complicated',
]

const useCases = [
  {
    name: 'The school that\'s grown past its systems',
    description:
      'Enrollment has grown, staff count has doubled, but the org chart and decision-making structure haven\'t changed since founding. Leadership is overwhelmed. Systems are improvised. Partnership provides the sustained support to build what was skipped.',
  },
  {
    name: 'The school in leadership transition',
    description:
      'A new head is in place, or one is coming. The board has big expectations and little structure. Partnership provides continuity, strategic support, and the external perspective needed to navigate change without losing what matters.',
  },
  {
    name: 'The school working through equity and culture',
    description:
      'The commitment is real. The work is harder than expected. ABAR work, adult culture reform, and equity systems change require long-term, embedded support—not a workshop and a handout.',
  },
  {
    name: 'The school preparing for significant change',
    description:
      'A campus expansion, a governance restructure, an accreditation cycle, a founding team departure. High-stakes moments require a trusted advisor who knows the school deeply and can hold the long view.',
  },
]

export default function PartnershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Strategic Partnership
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              An embedded thought partner. For the long term.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              A retained engagement that places advisory support directly inside your
              leadership work—over months or years. Not a consultant. A partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
>
  Book a Consultation
</a>
              <a
                href="#includes"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                What&apos;s Included
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Who It&apos;s For
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              For schools that are ready to go deep.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Strategic Partnership is not an entry-level engagement. It&apos;s for schools
              and leaders who have moved past the question of whether change is needed—and
              are ready to do the sustained work of building something that lasts.
            </p>
          </div>
          <div className="space-y-3">
            {whoItIsFor.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-3 border-b border-[#E2DDD6] last:border-0"
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                <span className="text-[#374151] text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              When Schools Come to Partnership
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              What this usually looks like in practice.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {useCases.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-[#E2DDD6] p-8"
              >
                <h3 className="text-[#0e1a7a] font-semibold text-base mb-3" style={serif}>
                  {item.name}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section
        id="includes"
        className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DDD6]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              What&apos;s Included
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Broad coverage. Deep engagement.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              A Strategic Partnership isn&apos;t a menu of services. It&apos;s a sustained
              relationship that brings advisory support to wherever your leadership work
              requires it most.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
            {included.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4 border-b border-[#E2DDD6] last:border-0 md:[&:nth-last-child(2)]:border-0"
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5 font-medium">—</span>
                <span className="text-[#374151] text-base leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it's different */}
      <section className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              How It&apos;s Different
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight"
              style={serif}
            >
              Advisory on demand vs. Strategic Partnership.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-white/20 p-8">
              <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-5">
                Most consulting
              </p>
              <ul className="space-y-3">
                {[
                  'Arrives, assesses, leaves a report.',
                  'Exits when the engagement ends.',
                  'Accountable to deliverables.',
                  'Works on the school from the outside.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#94A3B8] text-sm leading-relaxed">
                    <span className="flex-shrink-0 mt-0.5 text-[#64748B]">—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-[#d6a758]/40 bg-white/5 p-8">
              <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase mb-5">
                Strategic Partnership
              </p>
              <ul className="space-y-3">
                {[
                  'Present throughout the year.',
                  'Embedded in real decisions as they happen.',
                  'Accountable to outcomes alongside you.',
                  'Works with your leadership from the inside.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-white text-sm leading-relaxed">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Capacity note */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#374151] text-lg leading-[1.85]">
            Strategic Partnership is not available to all schools. Engagements are limited to ensure the depth of relationship this work requires. We typically work with 3–5 partner schools at a time.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
              Next Step
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4"
              style={serif}
            >
              Partnership starts with a conversation.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              We only take on a small number of Strategic Partnership engagements at a
              time. Apply to start the conversation about whether this is the right fit.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap"
>
  Book a Consultation
</a>
            <Link
              href="/advisory/mapping"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Start with Mapping →
            </Link>
          </div>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}
