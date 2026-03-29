import { getApprovedJobs } from '@/lib/db/jobs'
import OpenRolesClient from './OpenRolesClient'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default async function OpenRolesPage() {
  const jobs = await getApprovedJobs()

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
