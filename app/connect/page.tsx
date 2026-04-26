'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const serif = { fontFamily: 'var(--font-heading)' }

type Option = {
  label: string
  sub: string
  href: string
  external?: boolean
}

const options: Option[] = [
  {
    label: 'Send me the newsletter',
    sub: 'Weekly thinking on Montessori leadership, adult culture, and ecosystem updates. Free.',
    href: '#newsletter',
  },
  {
    label: 'Book a 15-min consultation',
    sub: 'A free intro call to talk through what you are working on and where MMG can help.',
    href: 'https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1',
    external: true,
  },
  {
    label: 'Walk me through MMAP',
    sub: 'The Montessori Makers Alignment Map. Implementation tracking and accountability for school leadership teams.',
    href: '/mmap',
  },
  {
    label: "I'm hiring — show me MatchHub",
    sub: 'Philosophy-aligned hiring for Montessori schools. Post a role, browse pre-screened candidates, or upgrade to Pro.',
    href: '/matchhub',
  },
  {
    label: 'I want to apply to Residency',
    sub: 'Year-long Montessori leadership formation. Cohort-based, mentor-supported, application-required.',
    href: '/residency/apply',
  },
  {
    label: 'Just send me the ecosystem overview',
    sub: 'A short tour of how Advisory, Institute, MatchHub, MMAP, and the Toolbox fit together.',
    href: '/about',
  },
]

export default function ConnectPage() {
  const newsletterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = newsletterRef.current
    if (!el) return
    if (el.querySelector('script[src*="beehiiv"]')) return

    const script = document.createElement('script')
    script.src = 'https://subscribe-forms.beehiiv.com/embed.js'
    script.async = true
    el.appendChild(script)
  }, [])

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] pt-24 pb-10 sm:pt-32 sm:pb-14 md:pt-40 md:pb-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-6">
            Tell us what you need
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-[#0e1a7a] leading-[1.05] tracking-tight"
            style={serif}
          >
            Pick what&rsquo;s{' '}
            <span className="inline-block border-b-4 border-[#d6a758] pb-1">
              actually useful.
            </span>
          </h1>
          <p className="text-[#374151] text-base sm:text-lg leading-relaxed mt-8 max-w-xl">
            One tap each. We will only send you what you asked for.
          </p>
        </div>
      </section>

      {/* ── OPTIONS LIST ──────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] pb-16 md:pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <ul className="border-t border-[#E2DDD6]">
            {options.map((opt) => {
              const inner = (
                <div className="flex items-start gap-4 sm:gap-5 py-6 sm:py-7">
                  <span
                    className="mt-1 flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 border-2 border-[#0e1a7a] group-hover:bg-[#0e1a7a]/5 group-active:bg-[#d6a758]/20 transition-colors"
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[#0e1a7a] text-lg sm:text-xl leading-snug group-hover:underline"
                      style={serif}
                    >
                      {opt.label}
                    </p>
                    <p className="text-[#64748B] text-sm leading-relaxed mt-1.5">
                      {opt.sub}
                    </p>
                  </div>
                  <span
                    className="text-[#d6a758] text-xl mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </div>
              )
              return (
                <li key={opt.label} className="border-b border-[#E2DDD6]">
                  {opt.external ? (
                    <a
                      href={opt.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block -mx-3 px-3 hover:bg-white/60 active:bg-white transition-colors"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={opt.href}
                      className="group block -mx-3 px-3 hover:bg-white/60 active:bg-white transition-colors"
                    >
                      {inner}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ── NEWSLETTER SIGNUP ─────────────────────────────────────────────── */}
      <section
        id="newsletter"
        className="bg-[#0e1a7a] py-16 md:py-24 px-6 md:px-10 scroll-mt-16"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-5">
            The Makers Network
          </p>
          <h2
            className="text-3xl sm:text-4xl text-white leading-tight tracking-tight mb-5"
            style={serif}
          >
            A weekly email for Montessori leaders.
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
            Free. No noise. Just what matters to people doing this work. Subscribers
            get new tools and ecosystem updates first.
          </p>
          <div ref={newsletterRef} className="bg-white">
            <iframe
              src="https://subscribe-forms.beehiiv.com/b50d619d-f1bb-4d63-bfb7-8f3c8db2d957"
              className="beehiiv-embed"
              data-test-id="beehiiv-embed"
              frameBorder={0}
              scrolling="no"
              title="Subscribe to The Makers Network"
              style={{
                width: '100%',
                maxWidth: '644px',
                height: '341px',
                margin: 0,
                borderRadius: 0,
                backgroundColor: 'transparent',
                boxShadow: 'none',
              }}
            />
          </div>
        </div>
      </section>

      {/* ── DIRECT CONTACT ────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-16 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#374151] text-base leading-relaxed">
            Want to talk to a person?{' '}
            <a
              href="mailto:info@montessorimakers.org"
              className="text-[#0e1a7a] font-semibold hover:underline"
            >
              info@montessorimakers.org
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
