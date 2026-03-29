import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const whoItIsFor = [
  'Heads of school and directors',
  'Associate heads and senior leaders',
  'Emerging leaders preparing for headship',
  'Leaders in their first 2 years of a senior role',
]

const howItWorks = [
  {
    name: 'Starting Point',
    description:
      'We begin with where you are, not where you should be.',
  },
  {
    name: 'Monthly sessions',
    description:
      "Real-time support around the actual challenges you're navigating.",
  },
  {
    name: 'Accountability structures',
    description:
      'Clear goals, honest reflection, forward momentum.',
  },
  {
    name: 'The long view',
    description:
      'Building the leadership capacity that outlasts any individual crisis.',
  },
]

const coachingFormats = [
  {
    name: 'Leadership Coaching',
    description:
      'For heads of school and senior directors navigating the full complexity of leading a Montessori organization. Ongoing 1:1 support built around real decisions, real teams, and the specific demands of mission-driven leadership.',
    format: '2 × 60-min sessions/month, min. 6 months',
  },
  {
    name: 'Executive Coaching',
    description:
      'For executive directors and multi-site leaders managing organizational scale, board dynamics, and strategic complexity. Deeper engagement, longer arc.',
    format: '2 × 75-min sessions/month, min. 6 months',
  },
  {
    name: 'Cohort Coaching',
    description:
      'For leadership teams of 2–4 people working through shared challenges—succession, restructuring, first-year leadership teams. Structured group sessions with individual support.',
    format: 'Monthly group session + 1 individual session/month, min. 4 months',
  },
]

const whatMakesDifferent = [
  'Understanding of Montessori organizational culture',
  'Familiarity with AMI/AMS governance and philosophy',
  'Experience with school boards and parent communities',
  'Background in equity and adult culture work',
  'No need to explain what Montessori actually is',
]

export default function CoachingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Leadership Coaching
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              Support for the hardest parts of leadership.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Ongoing 1:1 coaching for heads of school and senior leaders navigating
              complex decisions, team dynamics, and personal leadership development.
              Grounded in Montessori philosophy and organizational reality.
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
                href="#how-it-works"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                See How It Works
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
              For the leaders carrying the weight.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              School leadership is one of the most complex jobs in education. Coaching
              provides a dedicated space to think clearly, make better decisions, and
              build the kind of leadership that sustains—rather than depletes—you.
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

      {/* Three Coaching Formats */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Coaching Formats
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Not all coaching looks the same.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Coaching is tailored to the level and nature of the leadership situation. Three formats address different needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {coachingFormats.map((item) => (
              <div
                key={item.name}
                className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-5"
              >
                <div className="w-1 h-8 bg-[#d6a758]" />
                <div>
                  <h3 className="text-[#0e1a7a] font-semibold text-xl mb-2" style={serif}>
                    {item.name}
                  </h3>
                  <p className="text-[#374151] text-sm leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#EDE8E1]">
                  <p className="text-[#64748B] text-xs tracking-[0.1em]">
                    <span className="font-medium text-[#374151]">Format: </span>
                    {item.format}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How coaching works */}
      <section
        id="how-it-works"
        className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DDD6]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              How Coaching Works
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              A space designed for your actual work.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Coaching isn&apos;t a training program or a performance review. It&apos;s a
              structured partnership built around the challenges you&apos;re living right now.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {howItWorks.map((item) => (
              <div
                key={item.name}
                className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-4"
              >
                <div className="w-1 h-8 bg-[#d6a758]" />
                <h3 className="text-[#0e1a7a] font-semibold text-xl">{item.name}</h3>
                <p className="text-[#374151] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What leaders say */}
      <section className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              What Leaders Say
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight mb-6"
              style={serif}
            >
              Somewhere to think, not just react.
            </h2>
          </div>
          <div className="space-y-8">
            <figure>
              <blockquote className="border-l-2 border-[#d6a758] pl-6">
                <p
                  className="text-white text-lg md:text-xl leading-relaxed mb-4"
                  style={serif}
                >
                  &ldquo;I finally had somewhere to think, not just react.&rdquo;
                </p>
                <figcaption className="text-[#94A3B8] text-sm">
                  — Head of school
                </figcaption>
              </blockquote>
            </figure>
            <div className="border-l-2 border-[#d6a758] pl-6">
              <p className="text-[#94A3B8] text-base leading-relaxed">
                The problems don&apos;t disappear, but my relationship to them does.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement structure */}
      <section className="bg-[#F2EDE6] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Engagement Structure
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Consistent support, built around you.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Coaching is most effective as a sustained practice—not a one-time
              session. The structure below reflects what actually works.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                label: 'Monthly',
                detail: '2 × 60-min sessions + async support',
              },
              {
                label: 'Commitment',
                detail: 'Minimum 6-month engagement',
              },
              {
                label: 'Optional add-on',
                detail: 'Team coaching for direct reports',
              },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-start gap-6 py-4 border-b border-[#E2DDD6] last:border-0"
              >
                <span className="text-[#64748B] text-xs tracking-[0.15em] uppercase w-28 flex-shrink-0 mt-0.5">
                  {row.label}
                </span>
                <span className="text-[#374151] text-base">{row.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              How This Differs
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight mb-6"
              style={serif}
            >
              Montessori-specific. Not generic leadership coaching.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              Most executive coaching is industry-agnostic. The frameworks are designed to work in any organization—which means they&apos;re rarely optimized for any specific one. Coaching here is built around the specific pressures of Montessori leadership: the tension between philosophy and operations, the challenge of adult culture in a child-centered environment, the weight of mission in the face of institutional pressure.
            </p>
          </div>
          <div className="space-y-3 md:pt-16">
            {whatMakesDifferent.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-3 border-b border-white/10 last:border-0"
              >
                <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                <span className="text-white text-base">{item}</span>
              </div>
            ))}
          </div>
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
              Start with a free call.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              We&apos;ll spend 30 minutes talking about your leadership situation and
              whether coaching is the right support.
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
              href="/advisory/partnership"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Explore Strategic Partnership →
            </Link>
          </div>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}
