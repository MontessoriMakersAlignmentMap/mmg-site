import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const phases = [
  {
    number: '01',
    name: 'Meaning',
    headline: 'Discover what you actually stand for.',
    description:
      'Most organizations can describe what they do. Far fewer can articulate why it matters in a way that lands with someone hearing it for the first time. Phase 1 is about excavating what\'s true: what you stand for, what makes you genuinely distinct, and who you exist to serve.',
    what: [
      'Organizational listening sessions with leadership and guides',
      'Audience mapping — who you\'re actually trying to reach, and what they need to hear',
      'Core message distillation — the one thing you want people to walk away understanding',
      'Vocabulary and language audit — the words that are working and the ones that aren\'t',
    ],
    outcome:
      'A clear articulation of your organization\'s core message — the foundation everything else is built on.',
  },
  {
    number: '02',
    name: 'Structure',
    headline: 'Translate meaning into architecture.',
    description:
      'Once we know what you\'re trying to say, we build the system for saying it. This is the phase most organizations skip — they go straight from a vague sense of purpose to execution, and then wonder why the website or newsletter doesn\'t feel quite right. Structure is where meaning becomes navigable.',
    what: [
      'Site architecture — how your story flows across every page',
      'Messaging hierarchy — what\'s said first, what\'s said next, what can wait',
      'Narrative flow — the journey someone takes from first encounter to deep understanding',
      'Content system design — what you publish, how often, in what format',
    ],
    outcome:
      'A structural blueprint: every page, every section, every content channel mapped to a clear communicative purpose.',
  },
  {
    number: '03',
    name: 'Expression',
    headline: 'Execute with precision.',
    description:
      'This is where the work becomes visible — design, copy, systems. But because it\'s grounded in meaning and structured for clarity, expression in Phase 3 is fast and coherent. We\'re not making decisions by gut feel. Every visual and verbal choice has a reason.',
    what: [
      'Design: visual identity, layout, typography, color — the look of your organization in the world',
      'Copy: website, social, newsletters, presentations — the words that carry your message',
      'Systems: templates, workflows, editorial calendars — the infrastructure that makes consistency possible',
      'Handoff: documentation and training so your team can maintain the work independently',
    ],
    outcome:
      'A complete, coherent expression of your organization — ready to be seen.',
  },
]

const clientExperience = [
  'You stop describing your school differently every time someone asks.',
  'You stop making visual decisions by committee.',
  'Communication becomes a system, not a scramble.',
  'Families understand what you\'re about before the first tour.',
  'Your online presence actually reflects the environment you\'ve built.',
]

export default function StudioApproachPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
            Studio — How We Work
          </p>
          <h1
            className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
            style={serif}
          >
            We don&apos;t begin with graphics. We begin with understanding.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed">
            Three phases. One through-line. The result: people understand what you stand for &mdash; and trust you for it.
          </p>
        </div>
      </section>

      {/* The translation problem */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              The Opportunity
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Most organizations don&apos;t have a marketing problem. They have a translation opportunity.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              The work is good. The mission is real. The community knows it.
              The opportunity is in the design: building communication so that
              what you are actually reaches who you&apos;re trying to serve.
              Families visit your website and feel the environment they&apos;d
              find in your classrooms. Your newsletter moves people. Your school
              is unmistakably itself.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              This is specifically true for Montessori schools. The approach
              is philosophically distinctive — but the language for communicating
              that distinction is often borrowed from traditional education
              marketing, which flattens everything it touches.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              Communication is a prepared environment. It needs to be designed
              with the same intentionality as the physical space — with a clear
              purpose, a coherent structure, and an eye toward the experience
              of the person moving through it.
            </p>
          </div>
          <div className="bg-white border border-[#E2DDD6] p-8">
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">
              Signs the translation work is ready
            </p>
            <div className="space-y-4">
              {[
                'You describe your school differently every time someone asks',
                'Your website exists but you\'re not sure it\'s working',
                'Visual decisions get made by committee, slowly',
                'You\'re not sure what to post, so you post inconsistently',
                'Families ask questions about your program that your site should already answer',
                'You have strong outcomes but struggle to communicate them',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                  <p className="text-[#374151] text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3-phase process */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              The Process
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4"
              style={serif}
            >
              Meaning → Structure → Expression
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Three phases in order. This sequence is not negotiable — because
              doing expression first, without meaning and structure, produces
              work you eventually have to redo.
            </p>
          </div>
          <div className="space-y-0">
            {phases.map((phase, i) => (
              <div
                key={phase.number}
                className={`grid md:grid-cols-3 gap-12 py-16 ${
                  i < phases.length - 1 ? 'border-b border-[#E2DDD6]' : ''
                }`}
              >
                <div>
                  <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-3 font-mono">
                    Phase {phase.number}
                  </p>
                  <h3
                    className="text-2xl md:text-3xl text-[#0e1a7a] mb-3"
                    style={serif}
                  >
                    {phase.name}
                  </h3>
                  <p className="text-[#64748B] text-base italic">
                    {phase.headline}
                  </p>
                </div>
                <div>
                  <p className="text-[#374151] text-base leading-relaxed mb-6">
                    {phase.description}
                  </p>
                  <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-5">
                    <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-3">
                      Outcome
                    </p>
                    <p className="text-[#374151] text-sm leading-relaxed">
                      {phase.outcome}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">
                    What happens here
                  </p>
                  <ul className="space-y-3">
                    {phase.what.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-[#8A6014] flex-shrink-0 mt-0.5">→</span>
                        <span className="text-[#374151] text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why order matters */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Why This Order Matters
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              When meaning comes first, expression holds.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              The most common pattern: an organization needs a website, hires a
              designer, reviews mockups, launches. Two years later, the site
              needs evolution. It doesn&apos;t quite capture what the school has
              become. A redesign begins.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              The design itself wasn&apos;t the issue. It was the sequence. When you
              start with expression — just make us a logo, just build us a site —
              you&apos;re building a container before you know what it needs to hold.
              The container will eventually need reshaping to match who you&apos;ve become.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              When you start with meaning, expression becomes a function of
              understanding. Every design decision, every word, every structural
              choice has a reason. The work holds up.
            </p>
          </div>
          <div>
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">
              What clients experience
            </p>
            <div className="space-y-0">
              {clientExperience.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-5 border-b border-[#D4CEC6] last:border-0"
                >
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">→</span>
                  <p className="text-[#374151] text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p
            className="text-white text-2xl md:text-3xl max-w-xl leading-snug"
            style={serif}
          >
            Ready to start with understanding?
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/studio/services"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center whitespace-nowrap"
            >
              See Our Offers
            </Link>
            <Link
              href="/studio/portfolio"
              className="border border-white text-white text-sm px-8 py-4 tracking-wide hover:bg-white hover:text-[#0e1a7a] transition-colors text-center whitespace-nowrap"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
