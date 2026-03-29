import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const features = [
  {
    title: 'Lesson Tracking & Presentation Logs',
    body: 'Track individual lesson presentations across curriculum areas. See what each child has worked with, what\'s been introduced, and what\'s ready for extension—without the overhead of a generic gradebook.',
  },
  {
    title: 'Observation Records',
    body: 'Document observations in a format that reflects Montessori practice. Timestamped, child-linked, searchable. The record that supports the guide\'s planning, not the administrator\'s audit.',
  },
  {
    title: 'Classroom Material Inventory',
    body: 'Track material availability, condition, and usage across the classroom. Know what\'s on the shelf, what\'s being used, and what needs to be repaired or replaced.',
  },
  {
    title: 'Individual Progress Visibility',
    body: 'A longitudinal view of each child\'s development across the curriculum—organized by area, not by grade level. See the continuum, not the checkboxes.',
  },
  {
    title: 'Guide Workflow & Planning Tools',
    body: 'Daily and weekly planning tools designed for the Montessori work cycle. Not period-by-period scheduling—time-blocked, child-responsive planning that respects the three-hour flow.',
  },
  {
    title: 'Cross-Classroom Data (with North Star)',
    body: 'When connected to North Star, observation data and child records flow between classroom and school systems. One record. No duplication.',
  },
]

const whoItIsFor = [
  'Classroom guides managing multi-age environments',
  'Lead guides mentoring assistants and tracking shared classroom data',
  'Curriculum coordinators overseeing documentation consistency',
  'New guides building documentation practices from the beginning',
  'Schools transitioning away from paper-based observation systems',
]

const callouts = [
  {
    title: 'No grade boxes',
    body: 'Progression documented on Montessori\'s own terms',
  },
  {
    title: 'No clipboard required',
    body: 'Observations recorded where the guide already is',
  },
  {
    title: 'No double entry',
    body: 'One record across classroom and school systems',
  },
]

export default function SurveyorPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d6a758] flex-shrink-0" />
              <span className="text-white text-xs tracking-[0.15em] uppercase">Pilot Platform &mdash; Limited Early Access</span>
            </div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-8">
              MMAP · Surveyor · Tier 01
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              The classroom layer. Built for how Montessori guides actually work.
            </h1>
            <p className="text-[#64748B] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Surveyor gives guides the tools to track, observe, and document learning in a way that reflects Montessori practice. Not retrofitted from generic lesson plan software. Built for the three-hour work cycle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/mmap/demo"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
              >
                Request Early Access
              </Link>
              <Link
                href="/mmap/pathway"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Explore the Full Pathway &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Surveyor Is */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Tier 01</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Classroom visibility without datafication.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Surveyor is the classroom layer of MMAP. It supports the guide&apos;s daily work—tracking lesson presentations, recording observations, maintaining material inventory, and holding each child&apos;s progress in a system that understands the continuum. No checklists that betray the philosophy. No grade boxes that flatten development into levels. Just the documentation that helps guides know what each child needs next.
            </p>
          </div>
          <div className="bg-[#F2EDE6] border border-[#E2DDD6] p-8">
            <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase mb-4">The design principle</p>
            <p className="text-[#374151] text-base leading-relaxed italic">
              &ldquo;The prepared environment requires a prepared guide. Surveyor supports that preparation—not by generating reports for administration, but by giving guides the visibility they need to serve the child.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Who It&apos;s For</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight max-w-2xl" style={serif}>
              For guides who want to see the whole child, not just the compliance record.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <p className="text-[#374151] text-lg leading-relaxed">
              Surveyor is built for classroom guides across all Montessori levels—from toddler to adolescent. It&apos;s designed for the guide who is tracking 25+ children across multiple curriculum areas and needs a system that holds that complexity without forcing artificial structure onto Montessori documentation. It is also for school administrators who want to support guides with tools that reduce overhead without creating a surveillance culture.
            </p>
            <ul className="space-y-4">
              {whoItIsFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#374151]">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                  <span className="text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What Surveyor Supports */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Core Features</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              What you can do inside Surveyor.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <div key={i} className="bg-[#FAF9F7] border border-[#E2DDD6] p-6">
                <h3 className="text-[#0e1a7a] font-semibold text-base mb-3" style={serif}>
                  {feature.title}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Feels in Practice */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">In Practice</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-8" style={serif}>
              A morning with Surveyor.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              A guide arrives and opens Surveyor. She can see at a glance which children haven&apos;t had a math presentation in two weeks, which materials have been heavily used, and where she left her observation notes from Thursday. During the work period, she records a brief observation—two sentences, one child—without pulling out a clipboard or interrupting the flow. At the end of the day, she logs three lesson presentations. It takes four minutes. The record is there. The child&apos;s development is visible. Nothing has been translated for a system that doesn&apos;t understand Montessori. The tool served the guide. The guide served the child.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {callouts.map((callout, i) => (
              <div key={i} className="border border-white/15 p-6 text-center">
                <p className="text-white font-semibold text-base mb-2">{callout.title}</p>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{callout.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Surveyor Grows Into */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Next in the Pathway</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Surveyor connects directly to North Star.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              When a school activates North Star, Surveyor data becomes part of the school-wide record. Child progress, observations, and classroom documentation connect to student profiles, family communication, and school operations—without migration, re-entry, or disconnected systems. The classroom data you&apos;ve been building in Surveyor is already there, already organized, already part of the whole.
            </p>
          </div>
          <div>
            <div className="bg-white border border-[#E2DDD6] p-7">
              <p className="text-[#8A6014] text-xs tracking-[0.15em] uppercase mb-3">North Star · Tier 02</p>
              <p className="text-[#374151] text-base leading-relaxed mb-5">
                Student records, attendance, family communication, and daily operations. The school layer that builds on Surveyor.
              </p>
              <Link
                href="/mmap/north-star"
                className="text-[#0e1a7a] text-sm font-medium hover:underline"
              >
                Explore North Star &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Ready to See Surveyor?</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Request a walkthrough built around your classroom.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              We&apos;ll walk through Surveyor in the context of your school&apos;s current documentation practices. Bring your questions about observation systems, lesson tracking, or the transition from paper.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/mmap/demo"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
            >
              Request a Walkthrough
            </Link>
            <Link
              href="/mmap/pathway"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
            >
              Explore the Full MMAP Pathway &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
