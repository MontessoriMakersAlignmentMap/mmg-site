import { createServiceClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const revalidate = 60

const serif = { fontFamily: 'var(--font-heading)' }

export default async function PositionsPage() {
  const supabase = createServiceClient()

  const { data } = await supabase
    .from('crm_searches')
    .select('id, school_name, position_title, level, location_city, location_state, start_date, position_description, credential_required, role_type_required')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  const positions = data ?? []

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-20 md:pt-40 md:pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">MatchHub — Open Positions</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-6" style={serif}>
            Active placements.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
            These are positions Montessori Makers is actively placing through our retained executive search practice.
            If you are a qualified educator or leader interested in any of these roles, submit your profile below.
          </p>
        </div>
      </section>

      {/* Positions */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">

          {positions.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#64748B] text-lg mb-4">No active positions at this time.</p>
              <p className="text-[#94A3B8] text-sm">Check back soon, or submit your profile to be considered for future searches.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {positions.map(p => (
                <div key={p.id} className="bg-white border border-[#E2DDD6] p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl text-[#0e1a7a] font-semibold mb-1" style={serif}>
                        {p.position_title}
                      </h2>
                      <p className="text-[#374151] text-sm font-medium">{p.school_name}</p>
                    </div>
                    {p.level && (
                      <span className="text-[11px] font-medium bg-[#060d3a] text-white px-3 py-1 shrink-0">
                        {p.level}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4 text-xs text-[#64748B]">
                    {(p.location_city || p.location_state) && (
                      <span>📍 {[p.location_city, p.location_state].filter(Boolean).join(', ')}</span>
                    )}
                    {p.credential_required && (
                      <span>🎓 {p.credential_required} credential</span>
                    )}
                    {p.role_type_required && (
                      <span>💼 {p.role_type_required}</span>
                    )}
                    {p.start_date && (
                      <span>📅 Start {new Date(p.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    )}
                  </div>

                  {p.position_description && (
                    <p className="text-sm text-[#374151] leading-relaxed border-l-2 border-[#d6a758] pl-4">
                      {p.position_description}
                    </p>
                  )}

                  <div className="mt-5 pt-5 border-t border-[#E2DDD6]">
                    <Link href="/matchhub/submit-profile"
                      className="text-sm text-[#d6a758] font-medium hover:underline">
                      Submit your profile to be considered →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 border-t border-[#E2DDD6] pt-12 text-center">
            <p className="text-[#374151] text-sm mb-4">
              Don&rsquo;t see a match? Submit your profile and we&rsquo;ll keep you in mind for future searches.
            </p>
            <Link href="/matchhub/submit-profile"
              className="inline-block bg-[#0e1a7a] text-white text-sm px-8 py-3 hover:bg-[#060d3a] transition-colors">
              Submit a Profile
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
