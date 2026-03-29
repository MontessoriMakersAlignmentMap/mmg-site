import Link from 'next/link'
import { FORMAT_CONFIG, type Offering } from '@/lib/institute-catalog'

const serif = { fontFamily: 'var(--font-heading)' }

function RegisterButton({
  stripeHref,
  cta,
}: {
  stripeHref?: string
  cta?: string
}) {
  if (!stripeHref) {
    return (
      <span className="bg-[#E8E3DB] text-[#94A3B8] text-xs px-4 py-2 tracking-wide text-center cursor-default select-none">
        Links Coming Soon
      </span>
    )
  }
  if (stripeHref.startsWith('https://')) {
    return (
      <a
        href={stripeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#d6a758] text-white text-xs px-4 py-2 tracking-wide hover:bg-[#c09240] transition-colors text-center"
      >
        {cta ?? 'Register'} &rarr;
      </a>
    )
  }
  return (
    <Link
      href={stripeHref}
      className="bg-[#d6a758] text-white text-xs px-4 py-2 tracking-wide hover:bg-[#c09240] transition-colors text-center"
    >
      {cta ?? 'Register'} &rarr;
    </Link>
  )
}

export function CatalogCard({
  format,
  title,
  dates,
  description,
  slug,
  cta,
  stripeHref,
}: Offering) {
  const config = FORMAT_CONFIG[format]
  const typeLabel = config ? `${config.label} \u2014 ${config.price}` : format
  const detailHref = `/institute/courses/${slug}`

  return (
    <div className="group bg-white border border-[#E2DDD6] flex flex-col md:flex-row md:items-start gap-6 p-6 md:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] relative overflow-hidden">
      {/* Gold accent line — slides in on hover */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] bg-[#d6a758] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
        aria-hidden="true"
      />

      <div className="md:w-52 flex-shrink-0">
        <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase font-medium mb-2">
          {typeLabel}
        </p>
        <h3 className="text-[#0e1a7a] font-semibold text-base leading-snug mb-2" style={serif}>
          {title}
        </h3>
        <p className="text-[#64748B] text-xs leading-relaxed">{dates}</p>
      </div>

      <div className="flex-1">
        <p className="text-[#374151] text-sm leading-relaxed">{description}</p>
      </div>

      <div className="md:w-48 flex-shrink-0 md:text-right flex flex-col gap-3">
        <Link
          href={detailHref}
          className="border border-[#0e1a7a] text-[#0e1a7a] text-xs px-4 py-2 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
        >
          View Description &rarr;
        </Link>
        <RegisterButton stripeHref={stripeHref} cta={cta} />
      </div>
    </div>
  )
}
