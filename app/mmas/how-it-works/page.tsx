import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const steps = [
  {
    number: '01',
    title: 'Student Assessment',
    description:
      'The guide administers assessment directly with the student using provided materials. No specialist needed, no separate testing environment. Assessment happens naturally in the flow of the classroom.',
  },
  {
    number: '02',
    title: 'Skill Mapping',
    description:
      'The system maps student responses to the Montessori materials sequence. Each answer places the child precisely within the progression — not against a grade-level standard, but against the actual learning pathway.',
  },
  {
    number: '03',
    title: 'Teacher Insight',
    description:
      'The guide sees exactly where each student is and what comes next. No interpretation required. The insight is specific: this child is developing with digraphs, secure with initial blends, and ready for vowel teams.',
  },
  {
    number: '04',
    title: 'School Trends',
    description:
      'Leadership sees patterns across classrooms. Which materials are producing strong outcomes? Where are students consistently stalling? What does the school need to address at the program level?',
  },
]

const curriculumAreas = [
  {
    name: 'Language',
    detail: 'Phonemic awareness, phonics, reading fluency, vocabulary',
    badge: 'Assessed',
  },
  {
    name: 'Writing',
    detail: 'Handwriting, composition, grammar, written expression',
    badge: 'Assessed',
  },
  {
    name: 'Math',
    detail: 'Numeration, operations, fractions, word problems',
    badge: 'Assessed',
  },
  {
    name: 'Geometry',
    detail: 'Shapes, measurement, spatial reasoning',
    badge: 'Assessed',
  },
  {
    name: 'Research',
    detail: 'Information gathering, synthesis, presentation',
    badge: 'Assessed',
  },
  {
    name: 'Science',
    detail: 'Botany, zoology, physical science',
    badge: 'Observed',
  },
  {
    name: 'Sensorial',
    detail: 'Visual, auditory, and tactile discrimination',
    badge: 'Observed',
  },
  {
    name: 'Practical Life',
    detail: 'Fine motor, care of self, care of environment',
    badge: 'Observed',
  },
  {
    name: 'Geography & History',
    detail: 'Landforms, timelines, cultural studies',
    badge: 'Observed',
  },
]

const platformCapabilities = [
  {
    name: 'Adaptive Assessment Engine',
    description:
      '186 skill nodes mapped to 133 Montessori materials. Questions adapt in real time based on each child\'s responses — no fixed test form, no one-size-fits-all.',
  },
  {
    name: 'Flourishing Tracker',
    description:
      'Seven developmental indicators measured on a 1-5 scale: love of work, concentration, self-discipline, joyful community, joy in order, connection to reality, and independence. Tracked across all three assessment windows.',
  },
  {
    name: 'Work Cycle Logger',
    description:
      'Guides log morning and afternoon work periods with material choices, duration, and independence level. The work cycle itself becomes structured data — not just impressions.',
  },
  {
    name: 'Teacher Dashboard',
    description:
      'Class roster, individual result cards, lesson recommendations, Classroom Pull Lists, Skill Graph Maps, and cycle summary in one place. No interpretation required.',
  },
  {
    name: 'Parent Reports',
    description:
      'Auto-generated progress reports with narrative summaries, curriculum area breakdowns, a Flourishing snapshot, and At Home activity suggestions. Delivered through the platform or print-ready.',
  },
  {
    name: 'Student Login',
    description:
      'Students log in with a school code and 4-digit PIN — no email required. Primary students get large buttons, picture-based questions, and audio prompts. Upper elementary uses a text-based interface.',
  },
  {
    name: 'School Leadership View',
    description:
      'Patterns across classrooms: which materials are producing strong outcomes, where students are stalling, and what needs attention at the program level.',
  },
  {
    name: 'Standards Alignment',
    description:
      'Every Montessori skill node aligned to ~230 CCSS standards (Math K–8, ELA K–5). Communicate student progress in the language your families and boards expect.',
  },
  {
    name: 'Multi-Role Access',
    description:
      'Four role types — student, teacher, admin, parent — each with their own view, their own data, and their own level of access.',
  },
]

export default function MMASHowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d6a758] flex-shrink-0" />
            <span className="text-white/80 text-xs tracking-[0.12em] uppercase">
              Demo live now
            </span>
          </div>
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-8">
            MMAS — How It Works
          </p>
          <h1
            className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
            style={serif}
          >
            Assessment that speaks Montessori.
          </h1>
          <p className="text-[#64748B] text-lg leading-relaxed mb-12">
            Four steps from assessment to insight — with every signal mapped to
            the Montessori materials sequence, not a grade-level framework.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block text-center"
            >
              Get in Touch
            </Link>
            <Link
              href="/mmas/schools"
              className="border border-white text-white text-sm px-8 py-4 tracking-wide hover:bg-white hover:text-[#0e1a7a] transition-colors inline-block text-center"
            >
              For Schools &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 4-step process */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              The Process
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Four steps from observation to school-wide clarity.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white border border-[#E2DDD6] p-8"
              >
                <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4 font-mono">
                  {step.number}
                </p>
                <h3
                  className="text-xl text-[#0e1a7a] mb-4"
                  style={serif}
                >
                  {step.title}
                </h3>
                <p className="text-[#374151] text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Areas */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Curriculum Coverage
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              186 skills. 9 curriculum areas. One platform.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              MMAS covers the full Montessori curriculum — not just literacy.
              Every skill node is mapped to real Montessori materials and
              sequenced according to the actual developmental pathway.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-0 border border-[#E2DDD6] mb-6">
            {curriculumAreas.map((area, i) => (
              <div
                key={area.name}
                className={`p-6 border-[#E2DDD6] ${
                  i % 3 !== 2 ? 'md:border-r' : ''
                } ${i < curriculumAreas.length - (curriculumAreas.length % 3 || 3) ? 'border-b' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[#0e1a7a] text-base font-semibold" style={serif}>
                    {area.name}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 tracking-wide ${
                    area.badge === 'Assessed'
                      ? 'bg-[#0e1a7a]/10 text-[#0e1a7a]'
                      : 'bg-[#8A6014]/10 text-[#8A6014]'
                  }`}>
                    {area.badge}
                  </span>
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {area.detail}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[#64748B] text-xs tracking-wide">
            Assessed subjects use adaptive question-based assessment. Observed subjects use structured teacher observation entry.
          </p>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Platform Capabilities
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Built for every person in the building.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              MMAS is not a single assessment tool — it is a full school data
              platform with distinct views and workflows for students, teachers,
              administrators, and families.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-0 border border-[#E2DDD6]">
            {platformCapabilities.map((cap, i) => (
              <div
                key={cap.name}
                className={`p-8 border-[#E2DDD6] ${
                  i % 3 !== 2 ? 'md:border-r' : ''
                } ${i < 6 ? 'border-b' : ''}`}
              >
                <h3
                  className="text-[#0e1a7a] text-base font-semibold mb-3"
                  style={serif}
                >
                  {cap.name}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progression language */}
      <section className="bg-[#F2EDE6] py-20 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Progression Language
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Development described as movement, not judgment.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-6">
              MMAS uses a four-stage progression that mirrors how children
              actually develop — not whether they&apos;re on grade level, but
              where they are in the sequence and what they&apos;re ready for next.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {['emerging', 'developing', 'secure', 'ready for next material'].map(
                (stage, i, arr) => (
                  <div key={stage} className="flex items-center gap-3">
                    <span className="text-[#0e1a7a] text-sm font-medium px-4 py-2 bg-white border border-[#E2DDD6]">
                      {stage}
                    </span>
                    {i < arr.length - 1 && (
                      <span className="text-[#8A6014]">→</span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="bg-white border border-[#E2DDD6] p-8">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
              MMAP Integration
            </p>
            <p
              className="text-[#0e1a7a] text-xl leading-snug mb-4"
              style={serif}
            >
              Assessment signals flow directly into MMAP lesson logs.
            </p>
            <p className="text-[#374151] text-sm leading-relaxed mb-6">
              If your school uses MMAP, assessment results don&apos;t stay in
              MMAS. They populate lesson logs, inform planning sequences, and
              give school leadership real-time visibility into materials
              progression across every classroom.
            </p>
            <Link
              href="/mmas/schools"
              className="text-[#0e1a7a] text-sm border-b border-[#0e1a7a] pb-0.5 hover:text-[#8A6014] hover:border-[#d6a758] transition-colors"
            >
              Learn more about school-wide integration →
            </Link>
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
            See what MMAS looks like in a real Montessori classroom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center whitespace-nowrap"
            >
              Get in Touch
            </Link>
            <Link
              href="/mmas/schools"
              className="border border-white/20 text-white/70 text-sm px-8 py-4 tracking-wide hover:border-white/40 hover:text-white transition-colors text-center whitespace-nowrap"
            >
              For Schools &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
