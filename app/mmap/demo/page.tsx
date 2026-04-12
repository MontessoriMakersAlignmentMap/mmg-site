import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const videoGroups = [
  {
    id: 'admissions',
    label: 'Admissions',
    color: '#1D4ED8',
    description: 'How MMAP manages the full admissions pipeline — from inquiry to enrollment decision.',
    videos: [
      { title: 'Inquiry Intake & Lead Tracking', duration: '2 min' },
      { title: 'Application Review & Scoring', duration: '3 min' },
      { title: 'Family Communication Workflows', duration: '2 min' },
    ],
  },
  {
    id: 'enrollment-billing',
    label: 'Enrollment & Billing',
    color: '#2D6A4F',
    description: 'Enrollment contracts, tuition setup, and billing — all connected to the student record.',
    videos: [
      { title: 'Enrollment Contracts & e-Sign', duration: '2 min' },
      { title: 'Tuition Plans & Payment Scheduling', duration: '3 min' },
      { title: 'Billing Dashboard & Reconciliation', duration: '2 min' },
    ],
  },
  {
    id: 'classroom',
    label: 'Classroom & Lesson Tracking',
    color: '#d6a758',
    description: 'How guides track work cycles, lessons, and individual child progress — built for the Montessori method.',
    videos: [
      { title: 'Lesson Presentation Records', duration: '3 min' },
      { title: 'Observation Log & Child Profiles', duration: '2 min' },
      { title: 'Work Cycle Planning View', duration: '2 min' },
    ],
  },
  {
    id: 'admin-reporting',
    label: 'Admin & Reporting',
    color: '#7C3AED',
    description: 'Leadership dashboards, equity reporting, and the school-wide visibility directors actually need.',
    videos: [
      { title: 'School-Wide Attendance Dashboard', duration: '2 min' },
      { title: 'Equity Pattern Reporting', duration: '3 min' },
      { title: 'Leadership Insight Overview', duration: '2 min' },
    ],
  },
]

function VideoPlaceholder({ title, duration }: { title: string; duration: string }) {
  return (
    <div className="bg-[#0e1a7a]/5 border border-[#E2DDD6] rounded-sm overflow-hidden">
      <div className="aspect-video bg-[#0e1a7a]/8 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#d6a758]/20 border border-[#d6a758]/40 flex items-center justify-center">
          <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[12px] border-l-[#d6a758] ml-1" />
        </div>
        <p className="text-[#64748B] text-xs tracking-wide">Video coming soon</p>
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <p className="text-[#374151] text-sm font-medium">{title}</p>
        <span className="text-[#64748B] text-xs">{duration}</span>
      </div>
    </div>
  )
}

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
              Short videos grouped by function. Watch how each part of the platform
              works — admissions, billing, classroom tracking, and reporting.
            </p>
          </div>
        </div>
      </section>

      {/* Jump links */}
      <div className="bg-white border-b border-[#E2DDD6] px-6 md:px-10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto py-4 scrollbar-none">
          {videoGroups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="text-[#374151] text-xs tracking-wide whitespace-nowrap hover:text-[#0e1a7a] transition-colors pb-1 border-b-2 border-transparent hover:border-[#d6a758]"
            >
              {g.label}
            </a>
          ))}
        </div>
      </div>

      {/* Video groups */}
      {videoGroups.map((group, gi) => (
        <section
          key={group.id}
          id={group.id}
          className={`py-20 md:py-28 px-6 md:px-10 ${gi % 2 === 0 ? 'bg-[#FAF9F7]' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1 h-8 flex-shrink-0" style={{ backgroundColor: group.color }} />
              <h2 className="text-2xl md:text-3xl text-[#0e1a7a] font-semibold" style={serif}>
                {group.label}
              </h2>
            </div>
            <p className="text-[#64748B] text-base leading-relaxed mb-10 max-w-2xl ml-5">
              {group.description}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {group.videos.map((v) => (
                <VideoPlaceholder key={v.title} title={v.title} duration={v.duration} />
              ))}
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
