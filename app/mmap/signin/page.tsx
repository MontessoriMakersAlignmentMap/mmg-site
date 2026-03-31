import Link from 'next/link'
import { Logo } from '@/components/Logo'

const serif = { fontFamily: 'var(--font-heading)' }

export default function MmapSignIn() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#070e3d' }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-6">
        <Link href="/mmap" className="opacity-60 hover:opacity-100 transition-opacity">
          <Logo name="mmap" heroWidth={80} heroHeight={28} />
        </Link>
        <Link
          href="/contact?source=MMAP"
          className="text-white/40 text-xs tracking-[0.15em] uppercase hover:text-white/70 transition-colors"
        >
          Request Access
        </Link>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">

        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: [
              'linear-gradient(rgba(214,167,88,0.04) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(214,167,88,0.04) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '60px 60px',
          }}
        />

        {/* Corner marks */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          {/* top-left */}
          <path d="M 40 80 L 40 40 L 80 40" stroke="#d6a758" strokeWidth="1" strokeOpacity="0.2" fill="none" strokeLinecap="square" />
          {/* top-right */}
          <path d="M calc(100% - 80px) 40 L calc(100% - 40px) 40 L calc(100% - 40px) 80" stroke="#d6a758" strokeWidth="1" strokeOpacity="0.2" fill="none" strokeLinecap="square" />
          {/* bottom-left */}
          <path d="M 40 calc(100% - 80px) L 40 calc(100% - 40px) L 80 calc(100% - 40px)" stroke="#d6a758" strokeWidth="1" strokeOpacity="0.2" fill="none" strokeLinecap="square" />
          {/* bottom-right */}
          <path d="M calc(100% - 80px) calc(100% - 40px) L calc(100% - 40px) calc(100% - 40px) L calc(100% - 40px) calc(100% - 80px)" stroke="#d6a758" strokeWidth="1" strokeOpacity="0.2" fill="none" strokeLinecap="square" />
        </svg>

        <div className="relative z-10 w-full max-w-sm text-center">

          {/* Pulse indicator */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 text-[#d6a758] text-[10px] tracking-[0.25em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d6a758] opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d6a758]" />
              </span>
              Platform Active
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl text-white mb-3 leading-tight"
            style={serif}
          >
            Welcome back.
          </h1>
          <p className="text-white/40 text-sm mb-10 tracking-wide">
            Sign in to your MMAP workspace.
          </p>

          {/* Primary CTA */}
          <a
            href="https://app.montessorimakersalignmentmap.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#d6a758] text-white text-sm font-medium px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors mb-4"
          >
            Sign In to MMAP &rarr;
          </a>

          <p className="text-white/25 text-xs tracking-wide">
            Don&rsquo;t have access?{' '}
            <Link
              href="/contact?source=MMAP"
              className="text-white/50 hover:text-[#d6a758] transition-colors underline underline-offset-2"
            >
              Request Early Access
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="flex items-center justify-between px-8 py-5 border-t border-white/5">
        <p className="text-white/20 text-[10px] tracking-[0.15em] uppercase">
          Montessori Makers Alignment Map
        </p>
        <Link
          href="/"
          className="text-white/20 text-[10px] tracking-[0.15em] uppercase hover:text-white/40 transition-colors"
        >
          montessorimakers.co
        </Link>
      </div>
    </div>
  )
}
