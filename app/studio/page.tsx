import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const offers = [
  {
    number: '01',
    name: 'Communication Audit & Clarity Map',
    tagline: 'Entry point',
    desc: 'A structured audit of your messaging, website, enrollment communication, and public presence. The result is a clear picture of where understanding breaks down — and what to build next.',
    href: '/studio/services#clarity-audit',
  },
  {
    number: '02',
    name: 'Communication Architecture',
    tagline: 'Flagship engagement',
    desc: 'A narrative system your whole organization can use. Voice and tone, messaging hierarchy, enrollment clarity, and the structural design of how your story moves through the world.',
    href: '/studio/services#communication-architecture',
  },
  {
    number: '03',
    name: 'Leadership Voice & Visibility',
    tagline: 'For leaders with ideas worth sharing',
    desc: 'Editorial infrastructure for school leaders building authority. Newsletter, LinkedIn, podcast positioning — a system that makes publishing consistent rather than occasional.',
    href: '/studio/services#leadership-voice',
  },
]

export default function StudioPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          <div className="max-w-2xl flex-1">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-3">
              Montessori Makers Studio
            </p>
            <p className="text-white/50 text-xs tracking-[0.15em] uppercase mb-8">
              Strategic communication and website design for Montessori organizations.
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-8"
              style={serif}
            >
              Communication is a prepared environment.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-3 max-w-2xl">
              We design how Montessori is understood &mdash; not just how it&rsquo;s presented.
            </p>
            <p className="text-[#7A8FA3] text-base leading-relaxed mb-12 max-w-xl">
              Most Montessori work is powerful. It just isn&rsquo;t always visible.
              Studio helps organizations close the gap between what they stand for
              and how it lands in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/studio/services#clarity-audit"
                className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Start with a Clarity Audit
              </Link>
              <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
>
  Book a Consultation
</a>
            </div>
          </div>
          {/* Hero logo — right column */}
          <div className="hidden md:flex items-center justify-end flex-shrink-0">
            <Logo name="studio" heroWidth={380} heroHeight={380} />
          </div>
        </div>
      </section>

      {/* ── THIS IS WHAT STUDIO DOES ──────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-6">
            This is what Studio does
          </p>
          <p className="text-[#0e1a7a] text-xl md:text-2xl leading-relaxed mb-5" style={serif}>
            If you&rsquo;ve spent time on this site, you&rsquo;ve already experienced Studio.
          </p>
          <p className="text-[#374151] text-base leading-relaxed mb-4">
            This is what it looks like when Montessori work is translated clearly &mdash; not
            simplified or diluted, but structured so it can be understood, felt, and chosen.
          </p>
          <p className="text-[#374151] text-base leading-relaxed">
            Studio exists to build that clarity for organizations.
          </p>
        </div>
      </section>

      {/* ── TRANSLATION PROBLEM ───────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-6">
              The Translation Gap
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              The work is usually stronger than the story being told about it.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              Most Montessori organizations aren&rsquo;t struggling because the work isn&rsquo;t good.
              They&rsquo;re struggling because the work is genuinely hard to translate &mdash; and
              translation is its own craft.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              Montessori is philosophically distinctive. But the language available for
              describing it often comes from traditional education marketing &mdash; a vocabulary
              that wasn&rsquo;t built for this work and tends to flatten what makes it different.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-8">
              Communication is a prepared environment. It needs to be designed with the
              same intentionality as the physical space &mdash; with a clear purpose,
              a coherent structure, and an eye toward the experience of the person
              moving through it.
            </p>
            <Link
              href="/studio/approach"
              className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
            >
              How we work: Meaning &rarr; Structure &rarr; Expression
            </Link>
          </div>
          <div className="bg-white border border-[#E2DDD6] p-8">
            <p className="text-[#64748B] text-[10px] tracking-[0.2em] uppercase mb-6">
              This might feel familiar
            </p>
            <div className="space-y-4">
              {[
                'It\u2019s hard to describe what you do in a way that feels both accurate and accessible.',
                'The online experience doesn\u2019t quite capture what families find when they walk through your door.',
                'You know the outcomes are real, but articulating them clearly feels harder than it should.',
                'Messaging decisions happen gradually, across many voices, without a clear through-line.',
                'Families arrive at tours with questions your enrollment materials were meant to answer.',
                'Your online presence is harder to differentiate than the actual experience inside your building.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&mdash;</span>
                  <p className="text-[#374151] text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE OFFERS ──────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-20 md:py-28 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-5">
              How Studio Works
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-5"
              style={serif}
            >
              Every engagement is shaped around you. These are the anchors.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              Studio is a strategic communication partner.
              Engagements begin with understanding what you actually stand for &mdash; and
              build from there. Most go beyond what any single package describes.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              This often includes full website design and build, ensuring that what families
              experience online reflects what actually happens in your classrooms.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {offers.map((offer) => (
              <div
                key={offer.number}
                className="bg-white border border-[#D4CEC6] p-8 flex flex-col hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,26,122,0.08)] transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[#8A6014] text-xs tracking-[0.2em] font-semibold">
                    {offer.number}
                  </span>
                  <span className="text-[#64748B] text-[10px] tracking-wide uppercase">
                    {offer.tagline}
                  </span>
                </div>
                <h3
                  className="text-[#0e1a7a] font-semibold text-base leading-snug mb-4 flex-1"
                  style={serif}
                >
                  {offer.name}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed mb-6">
                  {offer.desc}
                </p>
                <Link
                  href={offer.href}
                  className="text-[#0e1a7a] text-xs font-medium hover:underline tracking-wide"
                >
                  Learn more &rarr;
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/studio/services"
              className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
            >
              See all services in full &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── RECENT WORK ───────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-6">
              Recent Work
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight mb-4"
              style={serif}
            >
              The work speaks for itself.
            </h2>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
              These are active organizations doing real work in the field &mdash; not design exercises.
            </p>
            <div className="space-y-4">
              {[
                {
                  name: 'The Peace Rebellion',
                  type: 'Narrative architecture, brand identity, movement communication',
                },
                {
                  name: 'Public Montessori in Action',
                  type: 'Communication system, voice design, editorial infrastructure',
                },
              ].map((c) => (
                <div
                  key={c.name}
                  className="border border-white/15 p-5 hover:border-white/30 transition-colors"
                >
                  <p className="text-white font-medium mb-1">{c.name}</p>
                  <p className="text-[#94A3B8] text-sm">{c.type}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <Link
              href="/studio/services#clarity-audit"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
            >
              Start with a Clarity Audit
            </Link>
            <a
              href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
            >
              Book a Consultation
            </a>
            <Link
              href="/studio/portfolio"
              className="text-[#64748B] text-sm text-center hover:text-white transition-colors py-2"
            >
              View the Work &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── NAV STRIP ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-10 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6">
          {[
            { label: 'Our Offers', href: '/studio/services' },
            { label: 'How We Work', href: '/studio/approach' },
            { label: 'Portfolio', href: '/studio/portfolio' },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
            >
              {link.label} &rarr;
            </Link>
          ))}
          <a
            href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
          >
            Book a Consultation &rarr;
          </a>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}
