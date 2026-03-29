import Link from 'next/link'
import { Logo } from '@/components/Logo'

const serif = { fontFamily: 'var(--font-heading)' }

const differentiators = [
  {
    label: 'Materials-Aligned Tracking',
    desc: 'Every data point maps to a specific Montessori material or sequence step — not a grade level, standard, or age norm. Results tell guides which tray to pull next.',
  },
  {
    label: 'Progression-Based Language',
    desc: 'Development is described as movement: emerging → developing → secure → ready for next material. No grades. No judgment. Just clarity about where a child is in the sequence.',
  },
  {
    label: 'No Grade Levels. Ever.',
    desc: 'Traditional assessments force Montessori children into grade-level frameworks that contradict how the method works. MMAS is built on Montessori premises from the ground up.',
  },
  {
    label: 'Guide-Administered',
    desc: 'Assessment happens in the natural flow of the classroom. No testing specialist. No pulling children from authentic work. 10–15 minutes per student.',
  },
]

const whoFor = [
  {
    type: 'Public, Private & Charter Montessori Schools',
    desc: 'Schools that need to demonstrate outcomes on their own terms — not translated through grade-level frameworks that misrepresent how Montessori works.',
  },
  {
    type: 'School Leaders Seeking Clarity',
    desc: 'Heads and directors who want school-wide visibility into materials progression — without disrupting the classroom environment they&rsquo;ve built.',
  },
  {
    type: 'Guides Who Need Usable Data',
    desc: 'Teachers who already observe deeply but need a system that translates that observation into something shareable, documentable, and actionable.',
  },
]

const whyEarly = [
  {
    number: '01',
    heading: 'Help shape the platform.',
    body: 'Pilot schools work directly with the MMAS team during active development. Your feedback shapes assessment design, reporting, and integration — before the platform is locked.',
  },
  {
    number: '02',
    heading: 'Founding access and rates.',
    body: 'Pilot schools receive early access, founding rates, and priority onboarding when the platform moves to general availability. These terms are only available to schools in the current cohort.',
  },
  {
    number: '03',
    heading: 'Priority integration support.',
    body: 'Pilot schools working with MMAP receive first-priority integration support. Assessment data flows directly into lesson logs from day one of your pilot.',
  },
]

const howItWorksSteps = [
  {
    number: '01',
    title: 'Assessment',
    desc: 'The guide administers assessment directly with the student — no specialist, no separate testing environment. Assessment happens inside the normal classroom rhythm.',
  },
  {
    number: '02',
    title: 'Skill Mapping',
    desc: 'The system maps responses to the Montessori materials sequence. Each answer places the child precisely within the progression — not against a grade-level standard.',
  },
  {
    number: '03',
    title: 'Guide Insight',
    desc: 'The guide sees exactly where each student is and what comes next. Specific and actionable: this child is developing with digraphs, secure with initial blends, ready for vowel teams.',
  },
  {
    number: '04',
    title: 'School Trends',
    desc: 'Leadership sees patterns across classrooms. Which materials are producing strong outcomes? Where are students stalling? What does the program need at scale?',
  },
]

export default function MMASPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          <div className="max-w-2xl flex-1">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d6a758] flex-shrink-0" />
              <span className="text-white/80 text-xs tracking-[0.12em] uppercase">
                Currently in development
              </span>
            </div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Montessori Makers Assessment System
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-8"
              style={serif}
            >
              The first assessment platform built for the Montessori learning progression.
            </h1>
            <div className="space-y-2 mb-10">
              {[
                'Understand where children are.',
                'Know what lesson comes next.',
                'See which Montessori materials actually drive learning.',
              ].map((line, i) => (
                <p key={i} className="text-[#64748B] text-lg leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://app.montessorimakersassessmentsystem.com/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Explore the Demo
              </a>
              <Link
                href="/mmas/how-it-works"
                className="border border-white/20 text-white/70 text-sm px-8 py-4 tracking-wide hover:border-white/40 hover:text-white transition-colors text-center"
              >
                See How It Works &rarr;
              </Link>
            </div>
          </div>
          {/* Hero logo — right column */}
          <div className="hidden md:flex items-center justify-end flex-shrink-0">
            <Logo name="mmas" heroWidth={560} heroHeight={160} />
          </div>
        </div>
      </section>

      {/* ── DEMO CTA (primary) ────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-12 md:py-14 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-5">
          <p className="text-[#374151] text-base leading-relaxed sm:flex-1">
            See how assessment connects directly to Montessori materials.
          </p>
          <a
            href="https://app.montessorimakersassessmentsystem.com/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center font-medium whitespace-nowrap"
          >
            Explore the Demo
          </a>
        </div>
      </section>

      {/* ── PRODUCT PREVIEW ───────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#64748B] text-[10px] tracking-[0.2em] uppercase mb-8">
            What a guide sees
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Student card 1 */}
            <div className="bg-white border border-[#E2DDD6] p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[#0e1a7a] font-semibold text-sm" style={serif}>Amara T.</p>
                  <p className="text-[#64748B] text-xs mt-0.5">Primary · Age 6</p>
                </div>
                <span className="bg-[#F2EDE6] text-[#8A6014] text-[10px] tracking-wide px-2 py-1 font-medium">Active</span>
              </div>
              <div className="space-y-3">
                {[
                  { domain: 'Phonics', status: 'Developing', stage: 2 },
                  { domain: 'Early Math', status: 'Secure', stage: 3 },
                  { domain: 'Writing', status: 'Emerging', stage: 1 },
                ].map((item) => (
                  <div key={item.domain}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#374151] text-xs">{item.domain}</span>
                      <span className="text-[#64748B] text-[10px]">{item.status}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((s) => (
                        <div
                          key={s}
                          className="h-1.5 flex-1 rounded-full"
                          style={{ backgroundColor: s <= item.stage ? '#0e1a7a' : '#E2DDD6' }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-[#F2EDE6]">
                <p className="text-[#8A6014] text-[10px] tracking-wide font-medium uppercase">Next material</p>
                <p className="text-[#374151] text-xs mt-1">Set 3 — Digraphs</p>
              </div>
            </div>

            {/* Student card 2 */}
            <div className="bg-white border border-[#E2DDD6] p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[#0e1a7a] font-semibold text-sm" style={serif}>Elias R.</p>
                  <p className="text-[#64748B] text-xs mt-0.5">Primary · Age 5</p>
                </div>
                <span className="bg-[#F2EDE6] text-[#8A6014] text-[10px] tracking-wide px-2 py-1 font-medium">Active</span>
              </div>
              <div className="space-y-3">
                {[
                  { domain: 'Phonics', status: 'Emerging', stage: 1 },
                  { domain: 'Early Math', status: 'Developing', stage: 2 },
                  { domain: 'Writing', status: 'Emerging', stage: 1 },
                ].map((item) => (
                  <div key={item.domain}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#374151] text-xs">{item.domain}</span>
                      <span className="text-[#64748B] text-[10px]">{item.status}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((s) => (
                        <div
                          key={s}
                          className="h-1.5 flex-1 rounded-full"
                          style={{ backgroundColor: s <= item.stage ? '#0e1a7a' : '#E2DDD6' }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-[#F2EDE6]">
                <p className="text-[#8A6014] text-[10px] tracking-wide font-medium uppercase">Next material</p>
                <p className="text-[#374151] text-xs mt-1">Set 1 — CVC Words (review)</p>
              </div>
            </div>

            {/* Class summary card */}
            <div className="bg-[#0e1a7a] p-6 flex flex-col">
              <p className="text-[#d6a758] text-[10px] tracking-[0.2em] uppercase mb-5">Classroom View</p>
              <div className="space-y-4 flex-1">
                {[
                  { label: 'Ready for next material', count: 8, pct: 53 },
                  { label: 'Developing — on track', count: 5, pct: 33 },
                  { label: 'Emerging — needs attention', count: 2, pct: 14 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white/70 text-xs">{item.label}</span>
                      <span className="text-white text-xs font-semibold">{item.count}</span>
                    </div>
                    <div className="bg-white/10 h-1.5 rounded-full">
                      <div
                        className="bg-[#d6a758] h-1.5 rounded-full"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/15">
                <p className="text-white/50 text-[10px] uppercase tracking-wide mb-1">Progression language</p>
                <p className="text-white/70 text-xs">
                  emerging &rarr; developing &rarr; secure &rarr; ready for next material
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHERE MMAS IS RIGHT NOW ───────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-6">
              Where MMAS Is Right Now
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              In development. Moving toward launch.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              MMAS is a platform in active development. The core assessment engine is built. We are refining assessment design, reporting, and MMAP integration ahead of launch.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-8">
              Interested in being among the first schools to access the platform when it becomes available? Get in touch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center font-medium"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { status: 'Complete', label: 'Core assessment engine', desc: 'All assessment types built and validated against the Montessori materials sequence.' },
              { status: 'In Progress', label: 'Reporting & profiles', desc: 'Guide-facing dashboards and share-ready student profiles in active development.' },
              { status: 'In Progress', label: 'MMAP integration', desc: 'Assessment data flow into MMAP lesson logs in active development.' },
              { status: 'Upcoming', label: 'General availability', desc: 'Platform launches to schools when development milestones are met.' },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-[#E2DDD6] p-6 flex items-start gap-5">
                <div className="flex-shrink-0 pt-0.5">
                  <span
                    className={`text-[10px] tracking-[0.12em] uppercase font-semibold px-2 py-1 ${
                      item.status === 'Complete'
                        ? 'bg-[#0e1a7a] text-white'
                        : item.status === 'In Progress'
                        ? 'bg-[#d6a758]/15 text-[#d6a758]'
                        : 'bg-[#F2EDE6] text-[#64748B]'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div>
                  <p className="text-[#0e1a7a] font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-[#374151] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-6">
              The Context
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Most assessment systems were designed for a different kind of classroom.
            </h2>
            <div className="space-y-5">
              {[
                {
                  heading: 'Traditional assessments weren&rsquo;t built for Montessori',
                  body: 'Grade-level benchmarks, pacing guides, and age-based norms are designed for schools where every child progresses on the same timeline. Montessori follows a different path — and deserves tools that understand it.',
                },
                {
                  heading: 'Material progression vs. grade levels',
                  body: 'A child working two years ahead in math while consolidating early reading is exactly where they&rsquo;re supposed to be in Montessori. Standard assessments aren&rsquo;t designed to see this — so they can&rsquo;t capture it accurately.',
                },
                {
                  heading: 'Observation is rich — and hard to share',
                  body: 'Guides develop deep, real knowledge of their students. A system that makes that knowledge visible to leadership and families — without disrupting classroom rhythm — is what&rsquo;s been missing.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-[#F2EDE6] last:border-0">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                  <div>
                    <p
                      className="text-[#0e1a7a] font-semibold text-sm mb-1"
                      dangerouslySetInnerHTML={{ __html: item.heading }}
                    />
                    <p
                      className="text-[#374151] text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.body }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-6">
              The Solution
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              MMAS translates Montessori observation into actionable insight.
            </h2>
            <div className="space-y-3 mb-8">
              {[
                'Tracks development across all Montessori materials domains',
                'Identifies readiness for next lessons — specifically, by material',
                'Reveals learning patterns across classrooms and the whole school',
                'Produces share-ready profiles in Montessori language',
                'Connects classroom practice to outcomes without disrupting it',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&rarr;</span>
                  <span className="text-[#374151] text-base leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/mmas/why"
              className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
            >
              Why Montessori needs this &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES MMAS DIFFERENT ─────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-5">
              What Makes MMAS Different
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Built on Montessori premises. Not adapted from something else.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {differentiators.map((d) => (
              <div key={d.label} className="bg-white border border-[#E2DDD6] p-8">
                <div className="w-0.5 h-6 bg-[#d6a758] mb-5" />
                <h3
                  className="text-[#0e1a7a] font-semibold text-base mb-3"
                  style={serif}
                >
                  {d.label}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/mmas/why"
              className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
            >
              See the full case for Montessori-native assessment &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── MMAP INTEGRATION ─────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-6">
              MMAP Integration
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight mb-6"
              style={serif}
            >
              Lesson data + assessment data = real insight.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-5">
              MMAP is the Montessori school operating system. MMAS is the assessment platform. When they work together, assessment results don&rsquo;t stay in reports — they flow directly into lesson logs and planning sequences.
            </p>
            <p className="text-[#7A8FA3] text-base leading-relaxed mb-8">
              Leadership can see which lessons are driving growth, which materials are producing consistent outcomes, and where the program needs to adjust — across every classroom.
            </p>
            <div className="space-y-3 mb-8">
              {[
                'Assessment results populate MMAP lesson logs automatically',
                'No double entry, no disconnected systems',
                'School-wide visibility from assessment to planning',
                'Identifies which lessons and materials drive outcomes',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#d6a758] flex-shrink-0 mt-0.5">&rarr;</span>
                  <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/mmap"
              className="text-white text-sm border-b border-white/30 pb-0.5 hover:border-white/70 transition-colors"
            >
              Learn about MMAP &rarr;
            </Link>
          </div>
          <div className="bg-white/8 border border-white/15 p-8">
            <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-6">How data moves</p>
            {[
              { step: '01', text: 'Guide administers MMAS assessment in the classroom' },
              { step: '02', text: 'Responses mapped to Montessori materials sequence' },
              { step: '03', text: 'Insight appears in MMAS dashboard — guide & admin views' },
              { step: '04', text: 'Data flows into MMAP lesson logs automatically' },
              { step: '05', text: 'Leadership sees school-wide patterns across materials' },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full bg-[#d6a758]/20 border border-[#d6a758]/40 flex items-center justify-center">
                    <span className="text-[#8A6014] text-[10px] font-semibold">{item.step}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px h-5 bg-white/15 my-1" />
                  )}
                </div>
                <p className="text-white/70 text-sm leading-relaxed pt-1 pb-4 last:pb-0">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-5">
              How It Works
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Four steps from observation to school-wide clarity.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {howItWorksSteps.map((step) => (
              <div key={step.number} className="bg-white border border-[#E2DDD6] p-7">
                <p className="text-[#8A6014] text-xs tracking-[0.2em] font-semibold mb-4">{step.number}</p>
                <h3
                  className="text-[#0e1a7a] font-semibold text-base mb-3"
                  style={serif}
                >
                  {step.title}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/mmas/how-it-works"
              className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
            >
              See the full assessment process &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── DEMO CTA (mid-page) ───────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-12 md:py-14 px-6 md:px-10 border-t border-[#D4CEC6] border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-5">
          <p className="text-[#374151] text-base leading-relaxed sm:flex-1">
            Ready to see the platform in action?
          </p>
          <a
            href="https://app.montessorimakersassessmentsystem.com/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center font-medium whitespace-nowrap"
          >
            Explore the Demo
          </a>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-5">
              Who This Is For
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Built for schools that take Montessori seriously.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whoFor.map((item) => (
              <div key={item.type} className="border-l-2 border-[#d6a758] pl-7">
                <h3
                  className="text-[#0e1a7a] font-semibold text-base mb-3"
                  style={serif}
                >
                  {item.type}
                </h3>
                <p
                  className="text-[#374151] text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <h2
              className="text-3xl md:text-4xl text-white leading-tight mb-5"
              style={serif}
            >
              The assessment system Montessori schools deserve.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              MMAS is currently in development. If you&apos;d like to stay informed about availability or discuss fit for your school, we&apos;d love to hear from you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium whitespace-nowrap"
            >
              Get in Touch
            </Link>
            <Link
              href="/mmas/how-it-works"
              className="border border-white/20 text-white/70 text-sm px-8 py-4 tracking-wide hover:border-white/40 hover:text-white transition-colors text-center whitespace-nowrap"
            >
              See How It Works &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
