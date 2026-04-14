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

  const bullets = [
    'Leadership frameworks you can apply the same week',
    'Ecosystem updates and new tools — subscribers first',
    'Thinking on adult culture, hiring, and organizational design',
  ]

  return (
    <section className="relative border-t border-[#E2DDD6] overflow-hidden">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/montessori-study.jpg)' }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0e1a7a]/75" />

      <div className="relative py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: pitch */}
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              The Makers Network
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight mb-6"
              style={serif}
            >
              A weekly email for Montessori leaders and practitioners.
            </h2>
            <p className="text-[#CBD5E1] text-base leading-relaxed mb-8 max-w-prose">
              Free. No noise. Just what matters to people doing this work.
            </p>
            <div className="space-y-4">
              {bullets.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                  <span className="text-[#94A3B8] text-sm leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="flex items-center justify-center md:justify-end">
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
      </div>
    </section>
  )
}
