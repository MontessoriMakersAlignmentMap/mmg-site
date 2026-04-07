'use client'

import { useEffect, useRef } from 'react'

const serif = { fontFamily: 'var(--font-heading)' }

export function NewsletterSignup() {
  const scriptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scriptRef.current
    if (!el) return
    if (el.querySelector('script[src*="beehiiv"]')) return

    const script = document.createElement('script')
    script.src = 'https://subscribe-forms.beehiiv.com/embed.js'
    script.async = true
    el.appendChild(script)
  }, [])

  return (
    <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
            The Makers Network
          </p>
          <h2
            className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
            style={serif}
          >
            A weekly email for Montessori leaders and practitioners.
          </h2>
          <p className="text-[#64748B] text-base md:text-lg leading-relaxed mb-3 max-w-prose mx-auto">
            The Makers Network is a free weekly email on leadership, organizational
            design, adult culture, and what it actually takes to run a Montessori school well.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-10 max-w-prose mx-auto">
            New tools, ecosystem updates, and thinking that doesn&apos;t fit anywhere else. No noise.
            Just what matters to people doing this work.
          </p>

          <div ref={scriptRef} />
          <iframe
            src="https://subscribe-forms.beehiiv.com/b50d619d-f1bb-4d63-bfb7-8f3c8db2d957"
            className="beehiiv-embed"
            data-test-id="beehiiv-embed"
            frameBorder={0}
            scrolling="no"
            style={{
              width: '644px',
              height: '341px',
              margin: 0,
              borderRadius: 0,
              backgroundColor: 'transparent',
              boxShadow: 'none',
              maxWidth: '100%',
            }}
          />
        </div>
      </div>
    </section>
  )
}
