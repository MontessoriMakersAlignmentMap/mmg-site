import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const tourCards = [
  {
    number: '01',
    title: 'Run the School',
    desc: 'From inquiry to archive, the entire story of a child and the school lives in one system.',
    anchor: '#run-school',
  },
  {
    number: '02',
    title: 'Guide Workflow in Real Time',
    desc: 'Guides document quickly without leaving the classroom mindset.',
    anchor: '#guide-workflow',
  },
  {
    number: '03',
    title: 'School Operations & Coordination',
    desc: 'Shared systems replace hallway memory.',
    anchor: '#school-operations',
  },
  {
    number: '04',
    title: 'Leadership & Governance Visibility',
    desc: 'Leadership sees patterns before they become problems.',
    anchor: '#leadership-visibility',
  },
]

const tourSections = [
  {
    id: 'run-school',
    bg: 'bg-[#FAF9F7]',
    eyebrow: '01 — Run the School',
    heading: 'Run the School',
    body: 'From inquiry to archive, the entire story of a child and the school lives in one system. Every enrollment, every observation, every communication thread — organized, connected, and retrievable without the patchwork.',
    videoSrc: '/videos/run-school.mp4',
  },
  {
    id: 'guide-workflow',
    bg: 'bg-white',
    eyebrow: '02 — Guide Workflow in Real Time',
    heading: 'Guide Workflow in Real Time',
    body: 'Guides document quickly without leaving the classroom mindset. Observations, lesson tracking, and material notes flow naturally — so the record reflects the work, rather than replacing it.',
    videoSrc: '/videos/guide-workflow.mp4',
  },
  {
    id: 'school-operations',
    bg: 'bg-[#FAF9F7]',
    eyebrow: '03 — School Operations & Coordination',
    heading: 'School Operations & Coordination',
    body: 'Shared systems replace hallway memory. Attendance, scheduling, family communication, and daily operations run through one place — so nothing lives in one person\'s inbox or mental model.',
    videoSrc: '/videos/school-operations.mp4',
  },
  {
    id: 'leadership-visibility',
    bg: 'bg-white',
    eyebrow: '04 — Leadership & Governance Visibility',
    heading: 'Leadership & Governance Visibility',
    body: 'Leadership sees patterns before they become problems. Financial dashboards, enrollment trends, board tools, and equity signals surface the information that drives values-aligned decisions — not just compliance reporting.',
    videoSrc: '/videos/leadership-visibility.mp4',
  },
]

export default function MMAPTourPage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              MMAP Platform Tour
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.03] tracking-tight mb-8"
              style={serif}
            >
              See the platform.<br className="hidden sm:block" /> On your own terms.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              A self-guided tour through MMAP organized around real school use cases&mdash;not
              a feature list. See what Surveyor looks like for a guide during a work period.
              See what Atlas looks like for a head of school preparing for a board meeting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/mmap/demo"
                className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Schedule a Live Demo
              </Link>
              <a
                href="#tour-overview"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Explore the Tour &darr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tour Overview ─────────────────────────────────────────────────── */}
      <section id="tour-overview" className="bg-[#F2EDE6] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-5">
              Tour Overview
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Four use cases. One coherent system.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {tourCards.map((card) => (
              <a
                key={card.anchor}
                href={card.anchor}
                className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-4 hover:border-[#0e1a7a] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,26,122,0.08)] transition-all duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <p className="text-[#8A6014] text-[11px] tracking-[0.18em] uppercase font-medium">
                    {card.number}
                  </p>
                  <span className="text-[#8A6014] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    &darr;
                  </span>
                </div>
                <h3 className="text-[#0e1a7a] font-semibold text-lg leading-snug" style={serif}>
                  {card.title}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">{card.desc}</p>
                <p className="text-[#0e1a7a] text-xs font-medium tracking-wide mt-auto group-hover:underline">
                  Watch this section
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tour Sections ─────────────────────────────────────────────────── */}
      {tourSections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={`${section.bg} py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DDD6]`}
        >
          <div className="max-w-4xl mx-auto">

            {/* Section header */}
            <div className="mb-10">
              <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-4">
                {section.eyebrow}
              </p>
              <h2
                className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-5"
                style={serif}
              >
                {section.heading}
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed max-w-2xl">
                {section.body}
              </p>
            </div>

            {/* Video */}
            <div className="rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(14,26,122,0.12)] ring-1 ring-black/5">
                <div className="bg-[#F2EDE6] border border-[#E2DDD6] aspect-video flex flex-col items-center justify-center gap-3">
                  <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase">Video walkthrough coming soon</p>
                  <Link href="/mmap/demo" className="text-[#0e1a7a] text-xs font-medium hover:underline tracking-wide">
                    Request a Live Demo &rarr;
                  </Link>
                </div>
            </div>

            {/* Section navigation — not on last section */}
            {i < tourSections.length - 1 && (
              <div className="mt-10 flex justify-end">
                <a
                  href={`#${tourSections[i + 1].id}`}
                  className="text-[#64748B] text-xs tracking-wide hover:text-[#0e1a7a] transition-colors flex items-center gap-2"
                >
                  Next: {tourSections[i + 1].heading}
                  <span className="text-[#8A6014]">&darr;</span>
                </a>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ─── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-6">
              Ready to See More
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight mb-6"
              style={serif}
            >
              The self-guided tour shows you the system.<br className="hidden sm:block" />
              A live demo shows you how it works for your school.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-xl mx-auto">
              Bring your current systems, your questions, and what you wish your tools
              could do. We&apos;ll build the walkthrough around what matters most to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/mmap/demo"
                className="bg-[#d6a758] text-white text-sm px-12 py-5 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Schedule a Live Demo
              </Link>
              <Link
                href="/mmap/demo"
                className="border border-white/30 text-white text-sm px-12 py-4 tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors text-center"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
