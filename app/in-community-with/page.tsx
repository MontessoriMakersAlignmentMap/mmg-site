import Image from 'next/image'
import { getPublishedCommunityOrgs } from '@/lib/db/community'
import type { CommunityOrg } from '@/lib/types/community'

export const dynamic = 'force-dynamic'

const serif = { fontFamily: 'var(--font-heading)' }

function OrgCard({ org }: { org: CommunityOrg }) {
  const card = (
    <div className="bg-white border border-[#E2DDD6] p-8 flex flex-col gap-5 hover:border-[#0e1a7a] transition-colors group h-full">
      {org.logo_url ? (
        <div className="relative h-14 w-full">
          <Image
            src={org.logo_url}
            alt={org.name}
            fill
            className="object-contain object-left"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="h-14 flex items-center">
          <p className="text-[#0e1a7a] font-semibold text-base leading-snug" style={serif}>
            {org.name}
          </p>
        </div>
      )}
      <div className="flex-1">
        {org.logo_url && (
          <p className="text-[#0e1a7a] font-semibold text-sm mb-2" style={serif}>{org.name}</p>
        )}
        {org.blurb && (
          <p className="text-[#374151] text-sm leading-relaxed">{org.blurb}</p>
        )}
      </div>
      {org.website_url && (
        <p className="text-[#8A6014] text-xs tracking-wide group-hover:underline">
          Visit →
        </p>
      )}
    </div>
  )

  if (org.website_url) {
    return (
      <a href={org.website_url} target="_blank" rel="noopener noreferrer" className="flex flex-col">
        {card}
      </a>
    )
  }
  return <div className="flex flex-col">{card}</div>
}

export default async function InCommunityWithPage() {
  const orgs = await getPublishedCommunityOrgs()

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">In Community With</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            Part of a broader movement.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
            Montessori does not exist in isolation. We are part of a broader movement toward dignity,
            justice, belonging, and aligned systems for children and adults. This page highlights
            organizations whose work we respect and are glad to uplift.
          </p>
        </div>
      </section>

      {/* ── DISTINCTION NOTE ──────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-10 px-6 md:px-10 border-b border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto flex items-start gap-4">
          <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
          <p className="text-[#374151] text-sm leading-relaxed max-w-2xl">
            This is not a list of contracted partners or paid collaborations. These are organizations
            we believe in, learn from, and want to see thrive. Our{' '}
            <a href="/partners" className="text-[#0e1a7a] underline underline-offset-2 hover:text-[#8A6014] transition-colors">
              Partners page
            </a>{' '}
            reflects organizations we have worked with directly.
          </p>
        </div>
      </section>

      {/* ── ORGANIZATIONS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {orgs.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[#64748B] text-lg leading-relaxed max-w-xl mx-auto">
                This page is being curated thoughtfully. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {orgs.map((org) => (
                <OrgCard key={org.id} org={org} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CLOSING ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto max-w-2xl">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Work Continues</p>
          <p className="text-[#374151] text-lg leading-relaxed">
            If you know of an organization doing work that belongs on this page, we&apos;d genuinely
            like to hear about it.
          </p>
          <a
            href="/contact"
            className="inline-block mt-8 border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  )
}
