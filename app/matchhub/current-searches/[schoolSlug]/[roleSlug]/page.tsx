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
                  About the Organization
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

              {/* Brief intro text if available */}
              {role.description && (
                <div className="text-[#374151] text-base leading-relaxed whitespace-pre-wrap mb-8">
                  {role.description}
                </div>
              )}

              {/* Full PDF description — embedded inline */}
              {role.job_description_pdf ? (
                <div>
                  <object
                    data={role.job_description_pdf}
                    type="application/pdf"
                    className="w-full border border-[#E2DDD6]"
                    style={{ height: '860px' }}
                  >
                    {/* Fallback for browsers that can't embed PDFs */}
                    <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-8 text-center">
                      <p className="text-[#374151] text-sm mb-4">Your browser cannot display the PDF inline.</p>
                      <a
                        href={role.job_description_pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#0e1a7a] text-white text-sm px-6 py-3 hover:bg-[#060d3a] transition-colors"
                      >
                        Open Full Position Description (PDF)
                      </a>
                    </div>
                  </object>
                  <a
                    href={role.job_description_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sm text-[#64748B] hover:text-[#0e1a7a] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                    </svg>
                    Open PDF in new tab
                  </a>
                </div>
              ) : !role.description ? (
                <div className="space-y-4">
                  <p className="text-[#374151] text-base leading-relaxed">
                    Montessori Makers Group is conducting a retained search for this position.
                    Full role details including compensation are shared with qualified candidates after an initial conversation.
                  </p>
                  <p className="text-[#374151] text-base leading-relaxed">
                    To learn more, reach out at{' '}
                    <a href="mailto:hello@montessorimakersgroup.org" className="text-[#d6a758] hover:underline">
                      hello@montessorimakersgroup.org
                    </a>.
                  </p>
                </div>
              ) : null}
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
