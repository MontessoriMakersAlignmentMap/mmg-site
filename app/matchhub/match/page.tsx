import { createServiceClient } from '@/lib/supabase/server'
import MatchClient, { type CRMSearch, type CRMCandidate } from './MatchClient'
import Link from 'next/link'

export const revalidate = 0

const serif = { fontFamily: 'var(--font-heading)' }

async function fetchSearches(): Promise<CRMSearch[]> {
  const client = createServiceClient()
  const { data, error } = await client
    .from('crm_searches')
    .select(
      'id, school_name, position_title, position_description, credential_required, levels_required, role_type_required, years_experience_min, location_city, location_state, location_flexible, languages_required, status, compensation_range'
    )
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  if (error) { console.error('fetchSearches:', error.message); return [] }
  return data ?? []
}

async function fetchCandidates(): Promise<CRMCandidate[]> {
  const client = createServiceClient()
  const { data, error } = await client
    .from('crm_candidates')
    .select(
      'id, full_name, email, phone, location_city, location_state, credential, levels_certified, years_experience, languages, role_types, open_to_role_types, actively_looking, notes, linkedin_url, resume_url'
    )
    .order('created_at', { ascending: false })
  if (error) { console.error('fetchCandidates:', error.message); return [] }
  return data ?? []
}

export default async function MatchPage() {
  const [searches, candidates] = await Promise.all([fetchSearches(), fetchCandidates()])

  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">MatchHub · Candidate Match Engine</p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-5" style={serif}>
              Who fits this role?
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              {candidates.length} candidates in the CRM matched against {searches.length} active{' '}
              {searches.length === 1 ? 'search' : 'searches'}. Set criteria per role, see who ranks highest, and draft
              outreach in one click.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF9F7] py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {searches.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#64748B] text-lg mb-6">No active searches found.</p>
              <Link
                href="/matchhub/dashboard"
                className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-3 hover:bg-[#0e1a7a] hover:text-white transition-colors"
              >
                Back to dashboard
              </Link>
            </div>
          ) : (
            <MatchClient searches={searches} candidates={candidates} />
          )}
        </div>
      </section>
    </>
  )
}
