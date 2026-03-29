'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const serif = { fontFamily: 'var(--font-heading)' }

// ─── Inner component (reads search params + verifies session) ─────────────────

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const router = useRouter()

  type Status = 'verifying' | 'confirmed' | 'failed'
  const [status, setStatus] = useState<Status>('verifying')

  useEffect(() => {
    if (!sessionId) {
      router.replace('/matchhub/post-job')
      return
    }

    async function verify() {
      try {
        const res = await fetch('/api/verify-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })
        const data = await res.json()
        setStatus(res.ok && data.ok ? 'confirmed' : 'failed')
      } catch {
        setStatus('failed')
      }
    }

    verify()
  }, [sessionId])

  // ── Loading ───────────────────────────────────────────────────────────────

  if (status === 'verifying') {
    return (
      <section className="bg-[#0e1a7a] min-h-screen flex items-center justify-center px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center py-32">
          <div className="w-14 h-14 rounded-full bg-[#d6a758]/10 border border-[#d6a758]/20 flex items-center justify-center mx-auto mb-10 animate-pulse">
            <div className="w-3 h-3 rounded-full bg-[#d6a758]/60" />
          </div>
          <p className="text-[#64748B] text-sm tracking-wide">Confirming your payment…</p>
        </div>
      </section>
    )
  }

  // ── Failed / unpaid ───────────────────────────────────────────────────────

  if (status === 'failed') {
    return (
      <section className="bg-[#0e1a7a] min-h-screen flex items-center px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center py-32">
          <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-10">
            <span className="text-white/60 text-2xl leading-none">!</span>
          </div>
          <h1 className="text-4xl md:text-5xl text-white leading-tight mb-5" style={serif}>
            We couldn&rsquo;t confirm your payment.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-4 max-w-lg mx-auto">
            Your payment may not have completed, or the session has expired.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-12 max-w-sm mx-auto">
            If you were charged, please contact us and we&rsquo;ll resolve it promptly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/matchhub/post-job"
              className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
            >
              Try again
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-white text-sm px-10 py-4 tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors text-center"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // ── Confirmed ─────────────────────────────────────────────────────────────

  return (
    <section className="bg-[#0e1a7a] min-h-screen flex items-center px-6 md:px-10">
      <div className="max-w-2xl mx-auto text-center py-32">

        {/* Check mark */}
        <div className="w-14 h-14 rounded-full bg-[#d6a758]/20 border border-[#d6a758]/40 flex items-center justify-center mx-auto mb-10">
          <span className="text-[#d6a758] text-2xl">✓</span>
        </div>

        <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-5" style={serif}>
          Payment received.
        </h1>

        <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-4 max-w-lg mx-auto">
          Your job post has been submitted successfully and will be reviewed before going live.
        </p>

        <p className="text-[#64748B] text-sm leading-relaxed mb-4 max-w-sm mx-auto">
          You&rsquo;ll receive a confirmation email shortly. Most listings go live within one business day.
        </p>
        <p className="text-[#64748B] text-sm leading-relaxed mb-12 max-w-sm mx-auto">
          Your job post will be visible on MatchHub for 30 days from the date it is approved.
          You&rsquo;ll have the option to extend or repost your listing if needed.
        </p>

        {/* Upsell */}
        <p className="text-[#64748B] text-xs mb-10">
          Want more visibility?{' '}
          <Link href="/matchhub/pricing" className="text-[#d6a758] hover:underline">
            Upgrade your listing anytime.
          </Link>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/matchhub/post-job"
            className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
          >
            Post another role
          </Link>
          <Link
            href="/matchhub/talent"
            className="border border-white/30 text-white text-sm px-10 py-4 tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors text-center"
          >
            Browse talent
          </Link>
        </div>

      </div>
    </section>
  )
}

// ─── Page export ─────────────────────────────────────────────────────────────

export default function MatchHubSuccessPage() {
  return (
    <Suspense fallback={
      <section className="bg-[#0e1a7a] min-h-screen flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-[#d6a758]/20 border border-[#d6a758]/40 flex items-center justify-center animate-pulse">
          <div className="w-3 h-3 rounded-full bg-[#d6a758]/60" />
        </div>
      </section>
    }>
      <SuccessContent />
    </Suspense>
  )
}
