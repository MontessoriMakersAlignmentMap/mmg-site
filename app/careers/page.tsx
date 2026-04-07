import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'

const serif = { fontFamily: 'var(--font-heading)' }

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  'contract': 'Contract',
  'per-engagement': 'Per Engagement',
}

export const revalidate = 60

export default async function CareersPage() {
  const supabase = createServerClient()
  const { data: jobs } = await supabase
    .from('careers_jobs')
    .select('id, title, location, job_type, teaser, created_at')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const activeJobs = jobs ?? []

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
            Montessori Makers Group
          </p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            Work With Us
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed">
            We are building something different in Montessori education. If you have the depth,
            the drive, and the values to match, we want to hear from you.
          </p>
        </div>
      </section>

      {/* Positions */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          {activeJobs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#374151] text-lg mb-4">No open positions right now.</p>
              <p className="text-[#64748B] text-base">
                Check back soon, or email{' '}
                <a href="mailto:hannah@montessorimakers.org"
                  className="text-[#0e1a7a] underline hover:no-underline">
                  hannah@montessorimakers.org
                </a>{' '}
                to introduce yourself.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {activeJobs.map(job => (
                <div key={job.id}
                  className="bg-white border border-[#E2DDD6] p-8 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                    <h2 className="text-[#0e1a7a] text-xl font-semibold leading-snug" style={serif}>
                      {job.title}
                    </h2>
                    <span className="text-[10px] tracking-[0.12em] bg-[#F5E8CC] text-[#8A6014] px-3 py-1 flex-shrink-0">
                      {TYPE_LABELS[job.job_type] ?? job.job_type}
                    </span>
                  </div>
                  <p className="text-[#64748B] text-xs tracking-wide mb-3">{job.location}</p>
                  <p className="text-[#374151] text-sm leading-relaxed flex-1 mb-6">{job.teaser}</p>
                  <Link
                    href={`/careers/${job.id}`}
                    className="self-start border border-[#0e1a7a] text-[#0e1a7a] text-xs px-5 py-2.5 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
