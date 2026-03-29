import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  getAllOfferings,
  getOfferingBySlug,
  FORMAT_CONFIG,
} from '@/lib/institute-catalog'

export function generateStaticParams() {
  return getAllOfferings().map((o) => ({ slug: o.slug }))
}

const serif = { fontFamily: 'var(--font-heading)' }

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const offering = getOfferingBySlug(slug)
  if (!offering) notFound()

  const config = FORMAT_CONFIG[offering.format]
  const formatLabel = config ? config.label : offering.format
  const price = config ? config.price : ''
  const stripeHref = offering.stripeHref
  const isExternal = stripeHref?.startsWith('https://')

  // Extract season eyebrow from slug (e.g. "people-policies-by-design--spring-2026" → "Spring 2026")
  const seasonSlug = slug.split('--')[1] ?? ''
  const seasonEyebrow = seasonSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[#94A3B8] text-xs mb-8">
              <Link href="/institute/catalog" className="hover:text-white transition-colors">
                Catalog
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-white/60">{seasonEyebrow}</span>
            </nav>

            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4">
              {formatLabel} &nbsp;&mdash;&nbsp; {price}
            </p>
            <h1
              className="text-4xl md:text-5xl text-white leading-[1.08] mb-6"
              style={serif}
            >
              {offering.title}
            </h1>
            <p className="text-[#7A8FA3] text-sm leading-relaxed">
              {offering.dates}
            </p>
          </div>
        </div>
      </section>

      {/* ── Course Image ──────────────────────────────────────────────────── */}
      {offering.image && (
        <section className="bg-[#FAF9F7] pt-10 pb-0 px-6 md:px-10">
          <div className="max-w-xs mx-auto border border-[#d6a758] p-2">
            <div className="relative aspect-square w-full">
              <Image
                src={offering.image}
                alt={offering.title}
                fill
                className="object-contain"
                sizes="320px"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Description + Details ─────────────────────────────────────────── */}
      <section className={`${offering.image ? 'bg-[#FAF9F7]' : 'bg-[#FAF9F7] pt-14 md:pt-16'} pb-20 md:pb-24 px-6 md:px-10`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">

          {/* Main content */}
          <div className="md:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase font-medium mb-4">
                About This {formatLabel}
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                {offering.description}
              </p>
            </div>

            {/* Who it&rsquo;s for */}
            {offering.whoFor && (
              <div>
                <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase font-medium mb-4">
                  Who It&rsquo;s For
                </p>
                <p className="text-[#374151] text-base leading-relaxed">
                  {offering.whoFor}
                </p>
              </div>
            )}

            {/* What you leave with */}
            {offering.leaveWith && offering.leaveWith.length > 0 && (
              <div>
                <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase font-medium mb-4">
                  What You Leave With
                </p>
                <ul className="space-y-3">
                  {offering.leaveWith.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-[#374151] text-sm leading-relaxed">
                      <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&mdash;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white border border-[#E2DDD6] p-8 sticky top-8">
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase font-medium mb-6">
                Registration
              </p>

              <div className="space-y-4 mb-8 text-sm">
                <div>
                  <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">Format</p>
                  <p className="text-[#374151] font-medium">{offering.format}</p>
                </div>
                <div>
                  <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">Date</p>
                  <p className="text-[#374151]">{offering.dates}</p>
                </div>
                <div>
                  <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">Price</p>
                  <p className="text-[#374151] font-semibold text-lg">{price}</p>
                </div>
              </div>

              {stripeHref ? (
                isExternal ? (
                  <a
                    href={stripeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#d6a758] text-white text-sm px-6 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium mb-3"
                  >
                    Register &rarr;
                  </a>
                ) : (
                  <Link
                    href={stripeHref}
                    className="block w-full bg-[#d6a758] text-white text-sm px-6 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium mb-3"
                  >
                    Register &rarr;
                  </Link>
                )
              ) : (
                <span className="block w-full bg-[#E8E3DB] text-[#94A3B8] text-sm px-6 py-4 text-center cursor-default select-none mb-3">
                  Links Coming Soon
                </span>
              )}
              <a
                href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border border-[#0e1a7a] text-[#0e1a7a] text-xs px-6 py-3 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4">
              Institute Catalog
            </p>
            <p className="text-white text-2xl leading-snug mb-3" style={serif}>
              Browse all offerings.
            </p>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Workshops, intensives, and cohorts across six seasons &mdash; each one standalone.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link
              href="/institute/catalog"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium whitespace-nowrap"
            >
              View Full Catalog &rarr;
            </Link>
            <Link
              href="/institute/seminars"
              className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center whitespace-nowrap"
            >
              Applied Seminars &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
