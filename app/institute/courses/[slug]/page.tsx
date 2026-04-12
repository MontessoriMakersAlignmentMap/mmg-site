import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  getAllOfferings,
  getOfferingBySlug,
  FORMAT_CONFIG,
} from '@/lib/institute-catalog'
import { createServiceClient } from '@/lib/supabase/server'
import RegisterSidebar from './RegisterSidebar'

// Must be dynamic so registration status is always fresh
export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return getAllOfferings().map((o) => ({ slug: o.slug }))
}

const serif = { fontFamily: 'var(--font-heading)' }

async function getRegistrationOpen(slug: string): Promise<boolean> {
  try {
    const client = createServiceClient()
    const { data } = await client
      .from('institute_course_settings')
      .select('registration_open')
      .eq('course_slug', slug)
      .single()
    return data?.registration_open ?? false
  } catch {
    return false
  }
}

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
  const registrationOpen = await getRegistrationOpen(slug)

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
            <RegisterSidebar
              courseSlug={slug}
              courseTitle={offering.title}
              price={price}
              format={offering.format}
              dates={offering.dates}
              stripeHref={stripeHref}
              registrationOpen={registrationOpen}
            />
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
