import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function LatestPulsePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-20 md:pt-40 md:pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Field Pulse &middot; March 2026
            </p>
            <h1
              className="text-4xl md:text-5xl text-white leading-[1.07] tracking-tight mb-8"
              style={serif}
            >
              Staffing isn&rsquo;t the problem.<br className="hidden sm:block" /> Stability is.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
              What&rsquo;s actually happening in Montessori schools right now.
              Not trends. Not opinions. Signals from leaders doing the work.
            </p>
          </div>
        </div>
      </section>

      {/* What We're Seeing */}
      <section className="bg-[#FAF9F7] py-16 md:py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
            What We&rsquo;re Seeing
          </p>
          <p className="text-[#0e1a7a] text-xl md:text-2xl leading-relaxed mb-6" style={serif}>
            March 2026 &mdash; The dominant theme this month: leaders are not primarily worried
            about whether they can fill open positions. They are worried about whether the
            people they have will still be there next year.
          </p>
          <p className="text-[#374151] text-base leading-relaxed mb-4">
            This is a different problem than hiring. It surfaces differently. It shows up in
            conversations about morale, in hesitation around delegation, in the emotional weight
            leaders carry about whether the people who built the school alongside them are staying.
          </p>
          <p className="text-[#374151] text-base leading-relaxed">
            When we aggregate check-ins across the field, the signal is consistent: staffing
            instability is not primarily an external labor market problem. It is an internal
            conditions problem.
          </p>
        </div>
      </section>

      {/* Pressure Building Underneath */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Pressure Building Underneath
            </p>
            <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              The retention signal is a leadership signal.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              Leaders who report high retention also report clearer role structures, more
              explicit decision-making norms, and consistent one-on-ones with key staff.
              The correlation isn&rsquo;t perfect. But it is present across enough schools
              to be directional.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              What we&rsquo;re hearing: the schools losing good people are not always losing
              them to better pay. They are losing them to clearer environments &mdash; places
              where expectations and support are better matched.
            </p>
          </div>
          <div className="space-y-3 md:pt-14">
            {[
              'Guides leaving mid-year cite unclear expectations more often than compensation.',
              'Leaders report spending more time re-hiring than on work that actually moves the school.',
              'Schools with high retention share one thing: leadership teams with clear lanes.',
              'The churn is concentrated — a small number of schools account for most of the instability.',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#FAF9F7] border border-[#E2DDD6] p-5">
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&mdash;</span>
                <p className="text-[#374151] text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What This Signal Points To */}
      <section className="bg-[#FAF9F7] py-16 md:py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
            What This Signal Points To
          </p>
          <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
            Stability is a structural outcome, not a culture outcome.
          </h2>
          <p className="text-[#374151] text-base leading-relaxed mb-4">
            The instinct is to treat retention as a culture problem &mdash; and to respond with
            retreats, recognition programs, and initiatives. These have their place. But what
            the data points to is more structural: people stay where they know what is expected,
            where their contributions are visible, and where leadership is consistent enough
            to be trusted.
          </p>
          <p className="text-[#374151] text-base leading-relaxed mb-8">
            The retention question, then, is not primarily about perks or programs. It is about
            whether the organizational conditions for stability exist &mdash; whether roles are
            clear, whether decisions get made in the right places, whether the head of school
            has enough margin to actually lead rather than react.
          </p>
          <div className="border-l-4 border-[#d6a758] pl-6">
            <p className="text-[#0e1a7a] text-xl leading-relaxed" style={serif}>
              &ldquo;When leaders are in constant triage, the conditions for retention deteriorate
              &mdash; even when everyone is working hard and trying.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* What Leaders Are Doing */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
            What Leaders Are Doing
          </p>
          <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
            The responses worth watching.
          </h2>
          <p className="text-[#374151] text-base leading-relaxed mb-6">
            Across the pulse, leaders are responding to instability in two distinct ways.
            One pattern is working. One is not.
          </p>
          <div className="space-y-4">
            <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-7">
              <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase font-medium mb-3">
                What&rsquo;s not working
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                Reacting to each departure individually. Treating every exit as its own event.
                Adding responsibilities to remaining staff without re-examining the structure.
                Assuming that if people are still showing up, things are basically fine.
              </p>
            </div>
            <div className="bg-[#F0F4FF] border border-[#0e1a7a]/15 p-7">
              <p className="text-[#0e1a7a] text-[10px] tracking-[0.18em] uppercase font-medium mb-3">
                What&rsquo;s working
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                Pausing to name the structural conditions generating turnover. Having explicit
                conversations with key staff about their experience of the role &mdash; not
                just their performance in it. Distinguishing between compensation issues (which
                require resources) and clarity issues (which require decisions).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What This Requires */}
      <section className="bg-[#F2EDE6] py-16 md:py-20 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
            What This Requires
          </p>
          <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
            The work underneath the work.
          </h2>
          <p className="text-[#374151] text-base leading-relaxed mb-4">
            The leaders making progress on stability are doing something that is harder than
            it looks: they are examining their own leadership before examining their staff&rsquo;s
            commitment.
          </p>
          <p className="text-[#374151] text-base leading-relaxed mb-4">
            This means asking: Are roles actually clear, or do we just think they are? Are we
            making decisions from the right places in the organization, or are we creating
            uncertainty by centralizing everything &mdash; or distributing it inconsistently?
          </p>
          <p className="text-[#374151] text-base leading-relaxed">
            The structural audit &mdash; not the culture audit &mdash; is what this month&rsquo;s
            signal points to.
          </p>
        </div>
      </section>

      {/* From Signal to Action */}
      <section className="bg-[#FAF9F7] py-16 md:py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-10">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              From Signal to Action
            </p>
            <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              Three things to consider this month.
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Not prescriptions. Prompts &mdash; questions worth sitting with given what this
              pulse is showing.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                num: '01',
                heading: 'Audit structure, not culture',
                body: 'Before any culture initiative, answer this: do people in your school know exactly which decisions they can make independently? If not, that is the work.',
              },
              {
                num: '02',
                heading: 'Have the retention conversation early',
                body: "Don\u2019t wait for the exit interview. Have a direct conversation with your key staff about their experience of the role \u2014 what\u2019s working, what isn\u2019t, what they need to stay.",
              },
              {
                num: '03',
                heading: 'Distinguish the problem you actually have',
                body: 'Compensation issues require resources. Clarity issues require decisions. They look similar from outside but have different solutions. Name which one you\u2019re dealing with.',
              },
            ].map((item) => (
              <div key={item.num} className="bg-white border border-[#E2DDD6] p-8">
                <p className="text-[#8A6014] text-xs tracking-[0.2em] font-medium mb-4">{item.num}</p>
                <h3 className="text-[#0e1a7a] text-lg font-semibold mb-3 leading-snug" style={serif}>
                  {item.heading}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribute CTA */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-white text-2xl leading-snug mb-3" style={serif}>
              Contribute to the April pulse.
            </p>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Three minutes. Anonymous. The pattern only becomes visible when more
              leaders add to it.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/field-intelligence/contribute"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium whitespace-nowrap"
            >
              Take the Current Pulse &rarr;
            </Link>
            <Link
              href="/field-intelligence"
              className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center whitespace-nowrap"
            >
              &larr; Back to Field Pulse
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
