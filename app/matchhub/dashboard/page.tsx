import Link from 'next/link'
import { RevalidateButton } from './RevalidateButton'

const serif = { fontFamily: 'var(--font-heading)' }

export default function MatchHubDashboardPage() {
  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">MatchHub Dashboard</p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-6" style={serif}>
              Welcome back.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              Post roles, browse the talent pool, and manage your school&rsquo;s hiring in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Post a Job */}
            <div className="bg-white border border-[#E2DDD6] p-10 flex flex-col gap-6">
              <div className="w-10 h-10 bg-[#0e1a7a]/8 flex items-center justify-center flex-shrink-0">
                <span className="text-[#0e1a7a] text-lg font-semibold" style={serif}>+</span>
              </div>
              <div>
                <h2 className="text-[#0e1a7a] font-semibold text-2xl mb-3" style={serif}>
                  Post a Job
                </h2>
                <p className="text-[#374151] text-sm leading-relaxed">
                  Create a new listing and reach Montessori-trained guides actively seeking placements.
                  Optional featured placement and social promotion available.
                </p>
              </div>
              <Link
                href="/matchhub/post-job"
                className="bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center mt-auto"
              >
                Post a Job &rarr;
              </Link>
            </div>

            {/* Browse Talent */}
            <div className="bg-white border border-[#E2DDD6] p-10 flex flex-col gap-6">
              <div className="w-10 h-10 bg-[#d6a758]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-[#d6a758] text-lg font-semibold" style={serif}>↗</span>
              </div>
              <div>
                <h2 className="text-[#0e1a7a] font-semibold text-2xl mb-3" style={serif}>
                  Browse Talent
                </h2>
                <p className="text-[#374151] text-sm leading-relaxed">
                  Explore guide profiles from Montessori-trained educators and leaders. Filter by training
                  level, age group, and location.
                </p>
              </div>
              <Link
                href="/matchhub/talent"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center mt-auto"
              >
                Browse Talent &rarr;
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Admin: force-refresh the open roles cache */}
      <section className="bg-white py-8 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <p className="text-[#64748B] text-xs">
            Just approved a role? Use this to make it appear on the site immediately.
          </p>
          <RevalidateButton />
        </div>
      </section>

      <section className="bg-[#F2EDE6] py-16 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-2">Need a retained search?</p>
            <p className="text-[#374151] text-base">
              Strategic Search is available for leadership and headship roles.
            </p>
          </div>
          <Link
            href="/matchhub/strategic-search"
            className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-3 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap flex-shrink-0"
          >
            Explore Strategic Search &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
