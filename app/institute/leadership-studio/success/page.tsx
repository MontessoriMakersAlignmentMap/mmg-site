import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export default function LeadershipStudioSuccessPage() {
  return (
    <section className="bg-[#0e1a7a] min-h-screen flex items-center px-6 md:px-10">
      <div className="max-w-2xl mx-auto text-center py-32">

        {/* Check mark */}
        <div className="w-14 h-14 rounded-full bg-[#d6a758]/20 border border-[#d6a758]/40 flex items-center justify-center mx-auto mb-10">
          <span className="text-[#d6a758] text-2xl leading-none">✓</span>
        </div>

        <h1
          className="text-5xl md:text-6xl text-white leading-[1.05] mb-6"
          style={serif}
        >
          You&rsquo;re in.
        </h1>

        <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-4 max-w-lg mx-auto">
          Your place in the Leadership Studio cohort is confirmed.
        </p>

        <p className="text-[#64748B] text-sm leading-relaxed mb-12 max-w-sm mx-auto">
          You will receive cohort details, Zoom access, and onboarding
          information by email.
        </p>

        <Link
          href="/institute"
          className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium inline-block"
        >
          Back to Institute
        </Link>

      </div>
    </section>
  )
}
