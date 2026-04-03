import OpenRolesClient from './OpenRolesClient'
import Link from 'next/link'
import type { Job } from '@/lib/types/matchhub'

export const revalidate = 60

const serif = { fontFamily: 'var(--font-heading)' }

async function fetchJobs(): Promise<Job[]> {
  try {
    const res = await fetch(
      'https://lroxicwzhtzaitfkvzlv.supabase.co/functions/v1/get-public-jobs',
      { next: { revalidate: 300 } }
    )
    if (!res.ok) return []
    const data: Array<{
      id: string
      title: string
      role_type: string
      program_level: string
      employment_type: string
      location: string
      description: string
      salary_range: string | null
      apply_url: string | null
      published_at: string | null
      schools: { name: string; city: string; state: string } | null
    }> = await res.json()
    return data.map((j): Job => ({
      id: j.id,
      job_title: j.title,
      school_name: j.schools?.name ?? '',
      location: j.schools
        ? [j.schools.city, j.schools.state].filter(Boolean).join(', ')
        : (j.location ?? ''),
      level: j.program_level ?? '',
      employment_type: j.employment_type ?? '',
      school_type: j.role_type ?? '',
      compensation: j.salary_range ?? '',
      job_summary: j.description ?? '',
      application_link: j.apply_url ?? '',
      // fields not in public API
      contact_name: '',
      contact_email: '',
      start_date: null,
      credential: '',
      school_description: '',
      plan_type: '',
      payment_status: null,
      status: 'approved',
      approved_at: j.published_at ?? null,
      expires_at: null,
      notes: null,
      source: null,
      created_at: j.published_at ?? '',
    }))
  } catch {
    return []
  }
}

export default async function OpenRolesPage() {
  const jobs = await fetchJobs()

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
            MatchHub · Open Roles
          </p>
          <h1
            className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
            style={serif}
          >
            Open Roles
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl mb-10">
            Opportunities shared by schools seeking aligned Montessori educators and leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#roles"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
            >
              Browse Roles
            </a>
            <Link
              href="/matchhub/submit-profile"
              className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
            >
              Create Your Guide Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Framing */}
      <section id="roles" className="bg-white py-16 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">How This Works</p>
            <p className="text-[#374151] text-base leading-relaxed">
              Roles listed here are posted directly by Montessori schools on MatchHub.
              Each listing has been reviewed and approved before going live.
              Apply through the school's own portal or submit your guide profile to be
              considered for future opportunities.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link
              href="/matchhub/talent-pool"
              className="text-[#0e1a7a] text-sm font-medium hover:underline whitespace-nowrap"
            >
              Browse Talent Pool →
            </Link>
            <Link
              href="/matchhub/strategic-search"
              className="text-[#0e1a7a] text-sm font-medium hover:underline whitespace-nowrap"
            >
              Strategic Search →
            </Link>
          </div>
        </div>
      </section>

      {/* Roles grid — client component handles filtering + modal */}
      <OpenRolesClient jobs={jobs} />
    </>
  )
}
