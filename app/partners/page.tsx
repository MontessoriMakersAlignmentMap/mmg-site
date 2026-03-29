import Image from 'next/image'
import Link from 'next/link'
import { getPublishedPartners } from '@/lib/db/partners'
import type { Partner } from '@/lib/types/partners'

const serif = { fontFamily: 'var(--font-heading)' }

const whoWeServe = [
  'Public, charter, and independent Montessori schools',
  'Start-up programs building strong foundations',
  'Established schools refining systems and leadership',
  'Networks, nonprofits, and mission-aligned organizations',
]

function PartnerLogo({ partner }: { partner: Partner }) {
  const inner = (
    <div className="bg-white border border-[#E2DDD6] p-8 flex flex-col items-center justify-center gap-4 hover:border-[#0e1a7a] transition-colors group min-h-[140px]">
      {partner.logo_image ? (
        <div className="relative w-full h-16">
          <Image
            src={partner.logo_image}
            alt={partner.partner_name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>
      ) : (
        <p className="text-[#0e1a7a] font-semibold text-center text-sm leading-snug" style={serif}>
          {partner.partner_name}
        </p>
      )}
      {partner.logo_image && (
        <p className="text-[#64748B] text-xs text-center leading-snug">{partner.partner_name}</p>
      )}
    </div>
  )

  if (partner.website_url) {
    return (
      <a href={partner.website_url} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  return inner
}

export default async function PartnersPage() {
  const partners = await getPublishedPartners()

  const featured = partners.filter((p) => p.is_featured)
  const regular = partners.filter((p) => !p.is_featured)

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">Partners</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            Partners in Purpose
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
            Working alongside the people shaping the future of Montessori.
          </p>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">About Our Partnerships</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Every partnership begins with trust, alignment, and shared purpose.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Montessori Makers collaborates with schools, nonprofits, networks, and organizations
              working to strengthen Montessori education through clarity, equity, sustainability, and
              meaningful design. We don&apos;t partner for visibility — we partner because the work
              matters and the alignment is real.
            </p>
          </div>
          <div>
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">Who We Serve</p>
            <div className="space-y-0">
              {whoWeServe.map((item, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-[#E2DDD6] last:border-0">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                  <p className="text-[#374151] text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {partners.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[#64748B] text-lg">Partner organizations coming soon.</p>
            </div>
          ) : (
            <>
              {featured.length > 0 && (
                <div className="mb-16">
                  <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-8">Featured Partners</p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {featured.map((p) => (
                      <PartnerLogo key={p.id} partner={p} />
                    ))}
                  </div>
                </div>
              )}

              {regular.length > 0 && (
                <div>
                  {featured.length > 0 && (
                    <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-8">Our Partners</p>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {regular.map((p) => (
                      <PartnerLogo key={p.id} partner={p} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── CLOSING ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-2xl">
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-8">
            Every collaboration is a chance to strengthen the movement — and build a Montessori
            future that works for more children, more adults, and more communities.
          </p>
          <Link
            href="/advisory"
            className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors inline-block font-medium"
          >
            Work With Us →
          </Link>
        </div>
      </section>
    </>
  )
}
