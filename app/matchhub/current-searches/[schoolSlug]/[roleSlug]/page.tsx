import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getRoleBySlug } from '@/lib/db/searches'
import RoleApplySection from './RoleApplySection'

const serif = { fontFamily: 'var(--font-heading)' }

export default async function RoleDetailPage({
  params,
}: {
  params: Promise<{ schoolSlug: string; roleSlug: string }>
}) {
  const { schoolSlug, roleSlug } = await params
  const result = await getRoleBySlug(schoolSlug, roleSlug)
  if (!result) notFound()
  const { search, role } = result

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
            <Link href="/matchhub/current-searches" className="hover:underline">
              Current Searches
            </Link>
            {' — '}
            {search.school_name}
          </p>
          <div className="max-w-3xl">
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              {role.title}
            </h1>
            <div className="flex items-center gap-4">
              {search.school_logo_url && (
                <img
                  src={search.school_logo_url}
                  alt={search.school_name}
                  className="w-10 h-10 object-contain flex-shrink-0"
                />
              )}
              <div>
                <p className="text-white font-medium">{search.school_name}</p>
                {search.school_website && (
                  <a
                    href={search.school_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#94A3B8] text-sm hover:underline"
                  >
                    {search.school_website.replace(/^https?:\/\//, '')} ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 items-start">
          {/* Description */}
          <div className="md:col-span-2 space-y-10">
            {search.school_blurb && (
              <div>
                <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
                  About the School
                </p>
                <p className="text-[#374151] text-base leading-relaxed">
                  {search.school_blurb}
                </p>
              </div>
            )}

            <div>
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
                Position Overview
              </p>
              {role.description ? (
                <div className="text-[#374151] text-base leading-relaxed whitespace-pre-wrap">
                  {role.description}
                </div>
              ) : (
                <p className="text-[#64748B] text-base leading-relaxed italic">
                  Full position details available upon inquiry.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-0">
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-5">
                About the School
              </p>
              {search.school_logo_url && (
                <img
                  src={search.school_logo_url}
                  alt={search.school_name}
                  className="h-10 object-contain mb-4"
                />
              )}
              <p className="text-[#0e1a7a] font-semibold text-sm mb-1">
                {search.school_name}
              </p>
              {search.school_website && (
                <a
                  href={search.school_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d6a758] text-xs hover:underline block mb-5"
                >
                  Visit website ↗
                </a>
              )}
              <div className="border-t border-[#E2DDD6] pt-5">
                <p className="text-[#64748B] text-xs tracking-[0.12em] uppercase mb-1">
                  Search managed by
                </p>
                <p className="text-[#374151] text-sm font-medium">
                  Montessori Makers Group
                </p>
              </div>
              <a
                href="#apply"
                className="block mt-6 bg-[#d6a758] text-white text-sm px-6 py-3 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Apply for This Role
              </a>
            </div>

            <div className="bg-[#0e1a7a] p-6 mt-4">
              <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-3">
                Other Open Roles
              </p>
              <Link
                href="/matchhub/current-searches"
                className="text-white text-sm hover:underline"
              >
                View all current searches →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Apply section — client component handles all three apply methods */}
      <RoleApplySection role={role} schoolName={search.school_name} />

      {/* Footer nav */}
      <section className="bg-[#FAF9F7] py-10 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/matchhub/current-searches"
            className="text-[#0e1a7a] text-sm hover:underline"
          >
            ← Back to Current Searches
          </Link>
        </div>
      </section>
    </>
  )
}
