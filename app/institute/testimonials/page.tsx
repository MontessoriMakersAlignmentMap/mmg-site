import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const testimonials = [
  {
    quote:
      "I've been a head for eleven years. This was the first time someone helped me think about my leadership the way I think about the classroom environment \u2014 with the same level of intentionality. I didn\u2019t know I needed that until I experienced it.",
    name: 'Director of a Montessori charter network',
    role: '',
  },
  {
    quote:
      'The seminar on difficult conversations gave me a framework I still use every week. Not a script \u2014 a way of thinking about what\u2019s actually happening and what the conversation needs to do.',
    name: 'Head of School',
    role: 'Two years in role',
  },
  {
    quote:
      'The Leadership Intensive was the first leadership training I\u2019ve done where I didn\u2019t feel talked at. We were working \u2014 with real situations, real stakes, people in the room who understood what I was dealing with.',
    name: 'Associate Head',
    role: 'Transitioning to full headship',
  },
  {
    quote:
      "I was skeptical that any program could be genuinely Montessori-aligned and genuinely rigorous about organizational leadership. This was both. Hannah doesn\u2019t soften the hard parts.",
    name: 'Head of School',
    role: 'AMI-credentialed',
  },
  {
    quote:
      'The Residency changed how I make decisions. Not what decisions I make \u2014 how I think through them. That\u2019s a different kind of development than anything I\u2019d done before.',
    name: 'Head of School',
    role: 'Navigating governance crisis',
  },
  {
    quote:
      'Our retreat surfaced three things we\u2019d been talking around for two years. We left with commitments we actually kept. That\u2019s not typical for us.',
    name: 'Leadership team',
    role: 'Independent school',
  },
]

export default function InstituteTestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              From School Leaders
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              What changes when the work is real.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              School leaders on what the Institute gave them &mdash; not just what they learned,
              but what shifted.
            </p>
            <Link
              href="/institute"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block font-medium"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote>
            <p
              className="text-[#0e1a7a] text-2xl md:text-3xl leading-relaxed mb-8 italic"
              style={serif}
            >
              &ldquo;Usually I leave professional development with ideas. I left this with next
              steps &mdash; specific, actionable, grounded in the actual situation I was in.
              That&apos;s rare.&rdquo;
            </p>
            <footer>
              <p className="text-[#64748B] text-sm tracking-wide">
                &mdash; Head of School, Independent Montessori School
              </p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">School Leaders</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              In their words.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-[#E2DDD6] p-8">
                <p className="text-[#8A6014] text-5xl leading-none mb-4" style={serif}>&ldquo;</p>
                <p className="text-[#374151] text-base leading-relaxed italic mb-6">{t.quote}</p>
                <div>
                  <p className="text-[#0e1a7a] font-semibold text-sm">{t.name}</p>
                  {t.role && (
                    <p className="text-[#64748B] text-xs mt-0.5">{t.role}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Who Attends</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Leaders at every stage of the work.
            </h2>
          </div>
          <div className="space-y-5 pt-2">
            {[
              'First-year heads navigating the gap between preparation and reality',
              'Experienced leaders in periods of organizational change',
              'Leadership teams working to align before moving forward',
              'Emerging leaders building capacity before stepping into headship',
            ].map((item) => (
              <div key={item} className="flex items-start gap-4 py-3 border-b border-[#E2DDD6] last:border-0">
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&mdash;</span>
                <span className="text-[#374151] text-base leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-white leading-tight mb-6" style={serif}>
            See if a program is right for you.
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-12">
            Every pathway starts with a conversation about where you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/institute"
              className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
            >
              Find Your Program
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white text-sm px-10 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
