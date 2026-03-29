import Link from 'next/link'
import { getActiveSearches } from '@/lib/db/searches'

const serif = { fontFamily: 'var(--font-heading)' }

export default async function CurrentSearchesPage() {
  const searches = await getActiveSearches()
  const activeWithRoles = searches.filter(s => s.roles && s.roles.length > 0)

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
            MatchHub · Strategic Search
          </p>
          <h1
            className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
            style={serif}
          >
            Current Searches
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
            Schools currently working with Montessori Makers on active guide and leadership placements.
            Each search is managed directly by Hannah Richardson.
          </p>
        </div>
      </section>

      {/* Listings */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {activeWithRoles.length === 0 ? (
            <div className="max-w-lg py-20">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Current Searches</p>
              <p className="text-[#374151] text-lg leading-relaxed mb-4">
                No active searches at this time.
              </p>
              <p className="text-[#64748B] text-base leading-relaxed">
                Check back soon, or reach out directly if your school is looking for support with a placement.
              </p>
              <div className="mt-8">
                <Link
                  href="/matchhub/strategic-search"
                  className="text-[#0e1a7a] text-sm font-medium hover:underline"
                >
                  Learn about Strategic Search →
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {activeWithRoles.map(search => (
                <div key={search.id} className="bg-white border border-[#E2DDD6]">
                  {/* School header */}
                  <div className="p-8 md:p-10 border-b border-[#E2DDD6]">
                    <div className="flex items-start gap-6">
                      {search.school_logo_url ? (
                        <img
                          src={search.school_logo_url}
                          alt={search.school_name}
                          className="w-14 h-14 object-contain flex-shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-[#F2EDE6] border border-[#E2DDD6] flex items-center justify-center flex-shrink-0">
                          <span className="text-[#8A6014] text-lg font-semibold">
                            {search.school_name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h2
                          className="text-2xl text-[#0e1a7a] font-semibold mb-1 leading-snug"
                          style={serif}
                        >
                          {search.school_name}
                        </h2>
                        {search.school_website && (
                          <a
                            href={search.school_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#d6a758] text-sm hover:underline"
                          >
                            {search.school_website.replace(/^https?:\/\//, '')} ↗
                          </a>
                        )}
                        {search.school_blurb && (
                          <p className="text-[#374151] text-base leading-relaxed mt-3">
                            {search.school_blurb}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Roles */}
                  <div className="p-8 md:p-10">
                    <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-5">
                      Open Positions
                    </p>
                    <div className="space-y-3">
                      {search.roles?.map(role => (
                        <Link
                          key={role.id}
                          href={`/matchhub/current-searches/${search.school_slug}/${role.role_slug}`}
                          className="flex items-center justify-between px-6 py-4 border border-[#E2DDD6] hover:border-[#0e1a7a] hover:bg-[#FAF9F7] transition-all group"
                        >
                          <span
                            className="text-[#0e1a7a] font-medium group-hover:underline"
                            style={serif}
                          >
                            {role.title}
                          </span>
                          <span className="text-[#8A6014] text-sm flex-shrink-0 ml-4">
                            View Position →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-white text-xl font-medium mb-3 leading-snug" style={serif}>
              Looking for a full search engagement?
            </p>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Hannah leads retained strategic searches for guide and leadership placements —
              sourcing, screening, references, and search management.
            </p>
          </div>
          <Link
            href="/matchhub/strategic-search"
            className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors whitespace-nowrap font-medium flex-shrink-0"
          >
            Learn About Strategic Search
          </Link>
        </div>
      </section>
    </>
  )
}
