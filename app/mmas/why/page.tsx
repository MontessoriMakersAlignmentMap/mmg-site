import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const problems = [
  {
    heading: 'Grade-level benchmarks penalize multi-age classrooms.',
    body: 'A child working two years ahead in math but still consolidating early reading doesn\'t fail — they\'re exactly where Montessori expects them to be. Standard assessments can\'t read this. They flag it as a gap.',
  },
  {
    heading: 'Age-based norms are irrelevant to individualized pacing.',
    body: 'Montessori is designed around the child\'s own developmental timeline. Measuring a child against their age cohort ignores everything that makes this approach work.',
  },
  {
    heading: 'Test prep is antithetical to deep work.',
    body: 'Many standardized assessments require preparation that pulls children out of authentic learning. The test itself becomes a disruption to the environment it was supposed to measure.',
  },
  {
    heading: 'Results don\'t connect to next steps in the materials.',
    body: 'Even when standard assessments produce useful data, guides can\'t act on it in a Montessori context. Knowing a child scored at "2.4 grade level" tells you nothing about which tray to pull next.',
  },
  {
    heading: 'Observation data stays invisible to leadership.',
    body: 'Guides develop deep knowledge of their students — but that knowledge lives in observation notes and memory, not in any system that allows school-level pattern recognition.',
  },
]

const whatMMASMakesPossible = [
  'Understand each child\'s exact position in the Montessori materials sequence',
  'Know precisely what lesson or material comes next — for every child, every domain',
  'Surface school-wide patterns without interrupting classroom rhythm',
  'Share developmental profiles with families in language that reflects Montessori values',
  'Demonstrate outcomes to boards and accreditation bodies on your own terms',
]

const materials = [
  {
    name: 'Sandpaper Letters',
    connection:
      'Letter–Sound Inventory maps directly to sandpaper letter mastery — which letters a child can identify by sound and symbol, and which need more work.',
  },
  {
    name: 'Moveable Alphabet',
    connection:
      'Phoneme–grapheme mapping and early decoding assessments track the progression from phonemic manipulation to encoding and decoding with the moveable alphabet.',
  },
  {
    name: 'Golden Beads',
    connection:
      'Mathematical understanding is assessed in relation to materials — from initial sensorial quantity work through exchange operations and place value.',
  },
  {
    name: 'Grammar Symbols',
    connection:
      'Writing and language development assessments track conceptual understanding of parts of speech as children work through the grammar materials sequence.',
  },
]

export default function MMASWhyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d6a758] flex-shrink-0" />
            <span className="text-white/80 text-xs tracking-[0.12em] uppercase">
              Currently in development
            </span>
          </div>
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-8">
            Why Montessori Needs This
          </p>
          <h1
            className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
            style={serif}
          >
            Every assessment system assumes a classroom. MMAS assumes a Montessori classroom.
          </h1>
          <p className="text-[#64748B] text-lg leading-relaxed mb-12">
            No grade levels. No test prep. Just insight into where children are
            in the materials sequence — and what comes next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/mmas/how-it-works"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block text-center"
            >
              See How It Works
            </Link>
            <Link
              href="/mmas/schools"
              className="border border-white text-white text-sm px-8 py-4 tracking-wide hover:bg-white hover:text-[#0e1a7a] transition-colors inline-block text-center"
            >
              For Schools
            </Link>
          </div>
        </div>
      </section>

      {/* Core argument */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              The Core Argument
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Most schools rely on assessments designed for traditional classrooms.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              These tests measure grade-level standards, pacing guides, and
              age-based expectations. But Montessori classrooms work differently.
              Multi-age groupings, self-directed work cycles, and materials-based
              progression all run directly counter to what standard assessments
              are built to measure.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              The result: data that doesn&apos;t fit, insights that can&apos;t be acted
              on, and guides who end up doing one kind of observation for the
              classroom and a completely different kind for compliance.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              Grade-level frameworks are not just inconvenient in a Montessori
              context. They&apos;re fundamentally incompatible with how the approach
              works. The solution isn&apos;t better translation — it&apos;s an assessment
              system built from the ground up on Montessori premises.
            </p>
          </div>
          <div>
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">
              What gets lost with standard assessments
            </p>
            <div className="space-y-0">
              {problems.map((problem, i) => (
                <div
                  key={i}
                  className="py-6 border-b border-[#E2DDD6] last:border-0"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-[#8A6014] flex-shrink-0 mt-1">—</span>
                    <div>
                      <p className="text-[#0e1a7a] font-semibold text-sm mb-2">
                        {problem.heading}
                      </p>
                      <p className="text-[#374151] text-sm leading-relaxed">
                        {problem.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What MMAS makes possible */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              What MMAS Makes Possible
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Insight that guides can actually use.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-0 border border-[#E2DDD6] max-w-4xl">
            {whatMMASMakesPossible.map((item, i) => (
              <div
                key={i}
                className={`p-8 flex items-start gap-4 border-b border-[#E2DDD6] ${
                  i % 2 === 0 ? 'md:border-r' : ''
                } last:border-b-0`}
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">→</span>
                <p className="text-[#374151] text-base leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials alignment */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Materials Alignment
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Assessment tracks materials mastery, not arbitrary standards.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Every MMAS assessment maps directly to the Montessori materials
              sequence. When a child is assessed, the result places them within
              the progression of actual classroom materials — so the guide knows
              not just where the child is, but which tray to pull next.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {materials.map((material) => (
              <div
                key={material.name}
                className="bg-white border border-[#E2DDD6] p-8"
              >
                <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-3">
                  {material.name}
                </p>
                <p className="text-[#374151] text-base leading-relaxed">
                  {material.connection}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MMAS vs Reading Assessment Hub */}
      <section className="bg-white py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
            A Note on Scope
          </p>
          <h2
            className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-6"
            style={serif}
          >
            MMAS and the Reading Assessment Hub: complementary, not competing.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-4">
            MMAS tracks developmental progression across all learning domains
            for ages 5–12. The Reading Assessment Hub — available on MML — is
            specifically phonics and literacy focused.
          </p>
          <p className="text-[#374151] text-base leading-relaxed">
            They serve different purposes. MMAS gives you a complete picture
            of a child&apos;s progression through the Montessori curriculum as a
            whole. The Reading Assessment Hub goes deep on the phonics
            sequence specifically. Many schools use both.
          </p>
        </div>
      </section>

      {/* CTAs */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p
            className="text-white text-2xl md:text-3xl max-w-xl leading-snug"
            style={serif}
          >
            Montessori-native assessment. In development now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center whitespace-nowrap"
            >
              Get in Touch
            </Link>
            <Link
              href="/mmas/how-it-works"
              className="border border-white text-white text-sm px-8 py-4 tracking-wide hover:bg-white hover:text-[#0e1a7a] transition-colors text-center whitespace-nowrap"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
