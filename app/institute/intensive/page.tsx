import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const STRIPE_LINK = 'https://buy.stripe.com/9B628t0nCehq1gr2tj2cg0P'
const BOOKING_LINK = '/contact'

const domains = [
  {
    num: '01',
    title: 'Organizational Leadership',
    description:
      'How Montessori principles translate into organizational design \u2014 culture, decision-making structures, and accountability systems.',
  },
  {
    num: '02',
    title: 'Adult Culture',
    description:
      'The norms, structures, and leadership behaviors that create a thriving adult community \u2014 not by accident, but by design.',
  },
  {
    num: '03',
    title: 'Communication & Difficult Conversations',
    description:
      'The full arc of communication as a leadership tool \u2014 from faculty meetings to board reports to the conversation no one wants to have.',
  },
  {
    num: '04',
    title: 'Decision-Making Under Pressure',
    description:
      'Frameworks for making principled decisions when the stakes are high, the information is incomplete, and the pressure is real.',
  },
  {
    num: '05',
    title: 'Strategic Planning & Enrollment',
    description:
      'How to think about organizational direction, growth, and the relationship between mission clarity and enrollment health.',
  },
  {
    num: '06',
    title: 'Leading Change & Transition',
    description:
      'How to lead through change \u2014 planned and unplanned \u2014 without losing staff trust, community coherence, or organizational momentum.',
  },
]

const phases = [
  {
    label: 'Day 1 \u2014 Foundation',
    description:
      'Shared language for leadership grounded in Montessori and organizational dynamics.',
  },
  {
    label: 'Day 2 \u2014 Cases',
    description:
      'Real scenarios. Peer analysis. Facilitated synthesis.',
  },
  {
    label: 'Day 3 \u2014 Practice',
    description:
      'Your leadership plan \u2014 what changes, what stays, what starts now.',
  },
]

const outcomes = [
  'A leadership plan built around your actual context',
  'Frameworks that hold under real pressure',
  'Clear next steps with timelines',
  'A shared leadership language',
  'A cohort of peers who understand the work',
  'An accountability partner going into the year',
]

const whoFor = [
  'Heads in their first 5 years navigating the gap between credential and role',
  'Leaders preparing for headship who want to build capacity before stepping in',
  'Teams navigating growth, culture repair, or significant transition',
  'Leaders who want a peer cohort, not just a course',
]

const dailySchedule = [
  'Morning session (2 hours)',
  'Break for lunch',
  'Afternoon session (2 hours)',
  'Closing integration',
]

const registrationIncludes = [
  'confirmation of enrollment',
  'session details and calendar access',
  'preparation materials ahead of the Intensive',
]

export default function IntensivePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Leadership Intensive
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              Three days. Real cases. A cohort that carries you.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              A multi-day deep immersion into Montessori leadership practice.
              Not a workshop &mdash; a working cohort where leaders bring real
              situations, build shared language, and leave with decisions they
              can act on immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={STRIPE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
              >
                Reserve Your Spot
              </a>
              <a
                href="#what-to-expect"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                What to Expect &darr;
              </a>
            </div>
            <p className="text-[#64748B] text-xs mt-4">
              Secure checkout. Limited to 16 participants.
            </p>
          </div>
        </div>
      </section>

      {/* Framing */}
      <section className="bg-white py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <p className="text-[#374151] text-lg leading-relaxed">
            This Intensive is intentionally scheduled before the school year
            begins &mdash; while there is still space to think clearly, not
            just react.
          </p>
          <p className="text-[#374151] text-lg leading-relaxed">
            This is structured time to step out, examine your leadership in
            context, and enter the year with a plan &mdash; not just
            intentions.
          </p>
        </div>
      </section>

      {/* What Makes It Different */}
      <section
        id="what-to-expect"
        className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              What Makes It Different
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Not a workshop. Not a retreat. A working cohort.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-[#374151] text-lg leading-relaxed mb-6">
                Most leadership programs stay abstract. The Intensive works in
                the specific:
              </p>
              <div className="space-y-3">
                {['your situations', 'your team dynamics', 'your decisions'].map(
                  (item) => (
                    <div key={item} className="flex items-start gap-4">
                      <span className="text-[#8A6014] flex-shrink-0 mt-0.5">
                        &mdash;
                      </span>
                      <span className="text-[#374151] text-base">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <p className="text-[#374151] text-lg leading-relaxed mb-4">
                These are examined through Montessori principles and
                organizational frameworks that hold up under pressure.
              </p>
              <p className="text-[#374151] text-lg leading-relaxed">
                You leave with language that travels &mdash; and a cohort that
                understands exactly what you&rsquo;re navigating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Six Domains */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              What We Cover
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight"
              style={serif}
            >
              Six domains of Montessori leadership.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {domains.map((domain) => (
              <div
                key={domain.num}
                className="border border-white/20 p-8"
              >
                <p className="text-[#d6a758] text-sm font-medium mb-3">
                  {domain.num}
                </p>
                <h3
                  className="text-white font-semibold text-base mb-3"
                  style={serif}
                >
                  {domain.title}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  {domain.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-Day Structure */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Structure
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Three days. Three phases.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {phases.map((phase) => (
              <div
                key={phase.label}
                className="bg-white border border-[#E2DDD6] p-8"
              >
                <h3
                  className="text-[#0e1a7a] font-semibold text-base mb-4"
                  style={serif}
                >
                  {phase.label}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Outcomes
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              What you carry out of the room.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              The Intensive is designed for transfer &mdash; not just insight,
              but change. Leaders who attend consistently report the same cluster
              of outcomes.
            </p>
          </div>
          <div className="space-y-4 pt-2">
            {outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-4 py-3 border-b border-[#E2DDD6] last:border-0"
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">
                  &mdash;
                </span>
                <span className="text-[#374151] text-base">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Who It&rsquo;s For
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              For leaders ready to go deeper.
            </h2>
          </div>
          <div className="space-y-4 pt-2">
            {whoFor.map((person) => (
              <div
                key={person}
                className="flex items-start gap-4 py-3 border-b border-[#E2DDD6] last:border-0"
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">
                  &mdash;
                </span>
                <span className="text-[#374151] text-base">{person}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Cohort + Schedule + Investment + Registration */}
      <section className="bg-[#F2EDE6] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-10">
            Upcoming Cohort
          </p>
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Left — Dates, format, schedule detail */}
            <div>
              <div className="grid grid-cols-1 gap-0 mb-10">
                <div className="pb-6 border-b border-[#D4CEC6]">
                  <p className="text-[#64748B] text-xs uppercase tracking-widest mb-2">
                    Dates
                  </p>
                  <p
                    className="text-[#0e1a7a] text-2xl font-semibold"
                    style={serif}
                  >
                    July 22&ndash;24, 2026
                  </p>
                </div>
                <div className="py-6 border-b border-[#D4CEC6]">
                  <p className="text-[#64748B] text-xs uppercase tracking-widest mb-2">
                    Format
                  </p>
                  <p
                    className="text-[#0e1a7a] text-2xl font-semibold"
                    style={serif}
                  >
                    Live online
                  </p>
                </div>
                <div className="py-6 border-b border-[#D4CEC6]">
                  <p className="text-[#64748B] text-xs uppercase tracking-widest mb-2">
                    Schedule
                  </p>
                  <p
                    className="text-[#0e1a7a] text-xl font-semibold mb-1"
                    style={serif}
                  >
                    Wednesday&ndash;Friday
                  </p>
                  <p className="text-[#64748B] text-sm">
                    9:30 AM &ndash; 2:30 PM Central
                  </p>
                </div>
                <div className="py-6 border-b border-[#D4CEC6]">
                  <p className="text-[#64748B] text-xs uppercase tracking-widest mb-2">
                    Cohort Size
                  </p>
                  <p
                    className="text-[#0e1a7a] text-2xl font-semibold"
                    style={serif}
                  >
                    Limited to 16
                  </p>
                </div>
              </div>

              {/* Daily structure detail */}
              <div className="bg-white border border-[#E2DDD6] p-8">
                <p className="text-[#64748B] text-xs uppercase tracking-widest mb-4">
                  Each Day
                </p>
                <p className="text-[#374151] text-sm leading-relaxed mb-5">
                  Each day is structured in two working blocks:
                </p>
                <div className="space-y-3 mb-5">
                  {dailySchedule.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-[#8A6014] flex-shrink-0 mt-0.5">
                        &mdash;
                      </span>
                      <span className="text-[#374151] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  The pacing is intentional &mdash; enough time to do real
                  work, without losing clarity or energy.
                </p>
              </div>

              <p className="text-[#374151] text-sm leading-relaxed mt-8">
                Designed to create space for focused leadership work before the
                school year begins.
              </p>
            </div>

            {/* Right — Investment + Registration */}
            <div className="space-y-6">
              <div className="border border-[#E2DDD6] bg-white p-8">
                <h3
                  className="text-[#0e1a7a] text-lg font-semibold mb-6"
                  style={serif}
                >
                  Investment
                </h3>
                <p
                  className="text-5xl text-[#0e1a7a] font-medium mb-2"
                  style={serif}
                >
                  $900
                </p>
                <p className="text-[#64748B] text-xs uppercase tracking-widest mb-4">
                  Per Person
                </p>
                <p className="text-[#374151] text-sm leading-relaxed mb-3">
                  Includes 15 hours of facilitated cohort work across three
                  days, plus pre-session preparation and post-session
                  accountability resources.
                </p>
                <p className="text-[#374151] text-sm leading-relaxed">
                  This is not a passive training. It is structured working
                  time &mdash; with real decisions, real cases, and real
                  outcomes.
                </p>
              </div>

              <div className="border border-[#E2DDD6] bg-white overflow-hidden">
                <img
                  src="/institute/leadership-intensive.png"
                  alt="Leadership Intensive — Three-Day Immersive Experience"
                  className="w-full block"
                />
                <div className="p-8">
                <h3
                  className="text-[#0e1a7a] text-lg font-semibold mb-4"
                  style={serif}
                >
                  Registration
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed mb-5">
                  Registration is completed through secure checkout. Once you
                  reserve your spot, you will receive:
                </p>
                <div className="space-y-3 mb-5">
                  {registrationIncludes.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-[#8A6014] flex-shrink-0 mt-0.5">
                        &mdash;
                      </span>
                      <span className="text-[#374151] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed mb-8">
                  Cohort size is intentionally limited to 16. When the cohort
                  is full, registration closes.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={STRIPE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
                  >
                    Reserve Your Spot
                  </a>
                  <a
                    href={BOOKING_LINK}
                    className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
                  >
                    Not sure yet? Schedule a conversation
                  </a>
                </div>
                </div>{/* end inner p-8 */}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p
              className="text-[#0e1a7a] text-2xl font-medium leading-snug mb-4"
              style={serif}
            >
              Real cases. Real cohort. Real work.
            </p>
            <p className="text-[#64748B] text-base leading-relaxed">
              July 22&ndash;24, 2026 &middot; Live online &middot; 16 participants
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={STRIPE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center whitespace-nowrap"
            >
              Reserve Your Spot
            </a>
            <a
              href={BOOKING_LINK}
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Schedule a Conversation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
