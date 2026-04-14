import Link from 'next/link'
import { getApprovedJobs } from '@/lib/db/jobs'
import type { Job } from '@/lib/types/matchhub'

const serif = { fontFamily: 'var(--font-heading)' }

const levelBorderColor: Record<string, string> = {
  Primary: '#0e1a7a',
  'Lower Elementary': '#2D6A4F',
  'Upper Elementary': '#2D6A4F',
  Elementary: '#2D6A4F',
  'Head of School': '#d6a758',
  Leadership: '#d6a758',
  Director: '#d6a758',
  'Infant/Toddler': '#7C3AED',
  Infant: '#7C3AED',
  Toddler: '#7C3AED',
  Adolescent: '#64748B',
}

function JobCard({ job }: { job: Job }) {
  const borderColor = levelBorderColor[job.level] ?? '#0e1a7a'
  return (
    <div
      className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(14,26,122,0.09)] transition-all duration-200"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[#0e1a7a] font-semibold text-lg leading-snug" style={serif}>{job.job_title}</h3>
          <p className="text-[#64748B] text-sm mt-1">{job.school_name}</p>
        </div>
        <span
          className="text-[10px] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 flex-shrink-0"
          style={{ color: borderColor, backgroundColor: `${borderColor}12` }}
        >
          {job.level}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-[11px] text-[#374151] bg-[#F2EDE6] px-2.5 py-0.5">{job.location}</span>
        <span className="text-[11px] text-[#374151] bg-[#F2EDE6] px-2.5 py-0.5">{job.employment_type}</span>
        {job.compensation && <span className="text-[11px] text-[#374151] bg-[#F2EDE6] px-2.5 py-0.5">{job.compensation}</span>}
        {job.credential && <span className="text-[11px] text-[#374151] bg-[#F2EDE6] px-2.5 py-0.5">{job.credential}</span>}
      </div>
      <p className="text-[#374151] text-sm leading-relaxed line-clamp-3">{job.job_summary}</p>
      <div className="flex items-center justify-between pt-3 border-t border-[#F2EDE6]">
        <p className="text-[#94A3B8] text-xs">{job.school_type}</p>
        {job.application_link ? (
          <a href={job.application_link} target="_blank" rel="noopener noreferrer"
            className="text-xs font-medium tracking-wide text-[#0e1a7a] hover:underline">
            Apply →
          </a>
        ) : (
          <Link href="/contact" className="text-xs font-medium tracking-wide text-[#0e1a7a] hover:underline">
            Inquire →
          </Link>
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="py-20 flex flex-col items-center text-center max-w-xl mx-auto">
      <div className="w-12 h-12 rounded-full border border-[#E2DDD6] bg-white flex items-center justify-center mb-8">
        <div className="w-2 h-2 rounded-full bg-[#d6a758]" />
      </div>
      <h3 className="text-[#0e1a7a] text-2xl font-semibold mb-4 leading-snug" style={serif}>
        No open roles right now.
      </h3>
      <p className="text-[#374151] text-base leading-relaxed mb-3">
        New positions are added as schools submit and are reviewed. Check back soon.
      </p>
      <p className="text-[#64748B] text-sm mb-10">
        Are you a school looking to hire? Post a role today.
      </p>
      <Link href="/matchhub/post-job"
        className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors font-medium">
        Post a Job
      </Link>
    </div>
  )
}

export default async function MatchHubJobsPage() {
  const jobs = await getApprovedJobs()

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">Open Roles</p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.04] tracking-tight mb-7" style={serif}>
              Montessori roles, curated for alignment.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Every position listed here comes from a school that has gone through the MatchHub process. No generic postings. No misaligned roles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/matchhub/post-job"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium">
                Post a Role
              </Link>
              <Link href="/matchhub/talent"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors text-center">
                Browse Talent →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Curation bar */}
      <div className="bg-[#F2EDE6] border-b border-[#E2DDD6] px-6 md:px-10 py-5">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-0.5 h-7 bg-[#d6a758] flex-shrink-0" />
          <p className="text-[#374151] text-sm leading-relaxed">
            <span className="font-semibold text-[#0e1a7a]">All roles are reviewed before listing.</span>{' '}
            Schools post through MatchHub with context, not just a job description.
          </p>
        </div>
      </div>

      {/* Listings */}
      <section className="bg-[#FAF9F7] py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {jobs.length > 0 && (
            <div className="flex items-center justify-between mb-8">
              <p className="text-[#64748B] text-sm">{jobs.length} open {jobs.length === 1 ? 'role' : 'roles'}</p>
              <Link href="/matchhub/submit-profile" className="text-[#0e1a7a] text-xs font-medium hover:underline">
                Are you a guide? Submit your profile →
              </Link>
            </div>
          )}

          {jobs.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-4">For Schools</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-4" style={serif}>
              Ready to post?
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Single posts from $49. Unlimited posting with School Unlimited. Full-service with Strategic Search.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link href="/matchhub/post-job"
              className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium whitespace-nowrap">
              Post a Job
            </Link>
            <Link href="/matchhub/pricing"
              className="border border-white/30 text-white text-sm px-10 py-3 tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors text-center whitespace-nowrap">
              View Pricing →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
