import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { JobContent } from '../JobContent'

const serif = { fontFamily: 'var(--font-heading)' }

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  'contract': 'Contract',
  'per-engagement': 'Per Engagement',
}

export const revalidate = 60

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = createServerClient()
  const { data: job } = await supabase
    .from('careers_jobs')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (!job) notFound()

  const subject = encodeURIComponent(`Application: ${job.title}`)
  const mailtoHref = `mailto:hannah@montessorimakers.org?subject=${subject}`
  const posted = new Date(job.created_at).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })

  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <Link href="/careers" className="text-[#94A3B8] text-xs tracking-wide hover:text-white transition-colors mb-8 inline-block">
            All Positions
          </Link>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-[10px] tracking-[0.12em] bg-[#d6a758]/20 text-[#d6a758] px-3 py-1">
              {TYPE_LABELS[job.job_type] ?? job.job_type}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl text-white leading-tight mb-4" style={serif}>{job.title}</h1>
          <p className="text-[#94A3B8] text-sm">{job.location} &middot; Posted {posted}</p>
        </div>
      </section>

      <section className="bg-[#FAF9F7] py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <JobContent html={job.content_html} />
          <div className="bg-[#0e1a7a] px-8 py-10">
            <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-4">Apply</p>
            <h2 className="text-2xl text-white mb-4" style={serif}>Ready to apply?</h2>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
              Send your materials to <span className="text-white">hannah@montessorimakers.org</span> with the subject line{' '}
              <span className="text-white">&ldquo;Application: {job.title}&rdquo;</span>.
            </p>
            <a href={mailtoHref} className="inline-block bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium">
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
