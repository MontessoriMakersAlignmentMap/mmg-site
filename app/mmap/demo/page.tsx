import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const videos = [
  {
    id: 'run-school',
    number: '01',
    color: '#1D4ED8',
    title: 'Run the School',
    description: 'From inquiry to archive — the entire story of a child and the school in one system. Every enrollment, observation, and communication thread organized and connected.',
    src: '/videos/run-school.mp4',
  },
  {
    id: 'guide-workflow',
    number: '02',
    color: '#d6a758',
    title: 'Guide Workflow in Real Time',
    description: 'Guides document quickly without leaving the classroom mindset. Observations, lesson tracking, and material notes flow naturally — so the record reflects the work.',
    src: '/videos/guide-workflow.mp4',
  },
  {
    id: 'school-operations',
    number: '03',
    color: '#2D6A4F',
    title: 'School Operations & Coordination',
    description: 'Shared systems replace hallway memory. Attendance, scheduling, family communication, and daily operations — so nothing lives in one person\'s inbox.',
    src: '/videos/school-operations.mp4',
  },
  {
    id: 'leadership-visibility',
    number: '04',
    color: '#7C3AED',
    title: 'Leadership & Governance Visibility',
    description: 'Leadership sees patterns before they become problems. Financial dashboards, enrollment trends, board tools, and equity signals for values-aligned decisions.',
    src: '/videos/leadership-visibility.mp4',
  },
]

export default function MMAPDemoPage() {
  return (
    <>
      {/* Sticky demo CTA */}
      <div className="fixed top-5 right-5 z-50 hidden md:block">
        <Link
          href="/contact?source=MMAP"
          className="bg-[#d6a758] text-white text-xs px-5 py-2.5 tracking-wide hover:bg-[#c09240] transition-colors font-medium shadow-lg whitespace-nowrap"
        >
          Request Early Access
        </Link>
      </div>

      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <Link
              href="/mmap"
              className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase hover:underline mb-8 inline-block"
            >
              &larr; MMAP
            </Link>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-8 ml-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d6a758] flex-shrink-0" />
              <span className="text-white text-xs tracking-[0.15em] uppercase">Pilot Platform &mdash; Limited Early Access</span>
            </div>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-6" style={serif}>
              See MMAP in Action
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed max-w-2xl">
              Four walkthroughs covering the full platform — from running the school
              day-to-day, to classroom documentation, operations, and leadership visibility.
            </p>
          </div>
        </div>
      </section>

      {/* Jump links */}
      <div className="bg-white border-b border-[#E2DDD6] px-6 md:px-10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto py-4 scrollbar-none">
          {videos.map((v) => (
            <a
              key={v.id}
              href={`#${v.id}`}
              className="text-[#374151] text-xs tracking-wide whitespace-nowrap hover:text-[#0e1a7a] transition-colors pb-1 border-b-2 border-transparent hover:border-[#d6a758]"
            >
              {v.title}
            </a>
          ))}
        </div>
      </div>

      {/* Videos */}
      {videos.map((v, i) => (
        <section
          key={v.id}
          id={v.id}
          className={`py-20 md:py-28 px-6 md:px-10 ${i % 2 === 0 ? 'bg-[#FAF9F7]' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text — alternates sides */}
            <div className={i % 2 === 1 ? 'md:order-2' : ''}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold tracking-[0.2em]" style={{ color: v.color }}>{v.number}</span>
                <div className="w-6 h-px" style={{ backgroundColor: v.color, opacity: 0.4 }} />
              </div>
              <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-5" style={serif}>
                {v.title}
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                {v.description}
              </p>
            </div>
            {/* Video */}
            <div className={`rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(14,26,122,0.12)] ring-1 ring-black/5 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <video
                src={v.src}
                controls
                playsInline
                preload="metadata"
                className="w-full aspect-video bg-[#0a1260] object-cover"
              />
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="bg-[#0e1a7a] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-5">Ready to Go Deeper</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-5" style={serif}>
              Want a live walkthrough built around your school?
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              These videos show the platform. A live demo shows how it fits your school specifically &mdash;
              your systems, your gaps, your team. No commitment. No sales script.
            </p>
          </div>
          <div className="flex flex-col gap-4 flex-shrink-0">
            <Link
              href="/contact?source=MMAP"
              className="bg-[#d6a758] text-white text-sm px-12 py-5 tracking-wide hover:bg-[#c09240] transition-colors text-center whitespace-nowrap font-medium"
            >
              Request Early Access
            </Link>
            <Link
              href="/mmap"
              className="text-[#64748B] text-sm tracking-wide hover:text-white transition-colors text-center"
            >
              &larr; Back to MMAP Overview
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
