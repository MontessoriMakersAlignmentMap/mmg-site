'use client'

/**
 * NewsletterSignup
 *
 * Reusable Kit (ConvertKit) inline embed section.
 * Drop <NewsletterSignup /> anywhere on any page — typically just before the
 * footer. The Kit script is injected via useEffect so it renders inside the
 * component rather than being moved to <body> by next/script.
 *
 * Design: light warm background, center-aligned, consistent with site spacing.
 */

import { useEffect, useRef } from 'react'

const serif = { fontFamily: 'var(--font-heading)' }

export function NewsletterSignup() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    // Guard against double-injection (React Strict Mode / HMR)
    if (el.querySelector('script[data-uid="d04997ff7d"]')) return

    const script = document.createElement('script')
    script.src = 'https://montessori-makers-group.kit.com/d04997ff7d/index.js'
    script.async = true
    script.setAttribute('data-uid', 'd04997ff7d')
    el.appendChild(script)
  }, [])

  return (
    <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
            The Makers Network
          </p>

          {/* Headline */}
          <h2
            className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
            style={serif}
          >
            A weekly essay for Montessori leaders and practitioners.
          </h2>

          {/* Subtext */}
          <p className="text-[#64748B] text-base md:text-lg leading-relaxed mb-3 max-w-prose mx-auto">
            The Makers Network is a free Substack — one essay a week on leadership, organizational
            design, adult culture, and what it actually takes to run a Montessori school well.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-10 max-w-prose mx-auto">
            New tools, ecosystem updates, and thinking that doesn&apos;t fit anywhere else. No noise.
            Just what matters to people doing this work.
          </p>

          {/* Kit embed — script injected here by useEffect */}
          <div ref={containerRef} className="w-full" />
        </div>
      </div>
    </section>
  )
}
