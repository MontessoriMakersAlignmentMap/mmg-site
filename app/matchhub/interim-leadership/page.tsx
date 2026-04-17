import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interim Leadership Placement | MatchHub · Montessori Makers Group',
  description: 'MMG places vetted Montessori interim leaders in schools navigating transitions — abrupt departures, accreditation, culture repair, and board realignment.',
}

const serif = { fontFamily: 'var(--font-heading)' }

const SCENARIOS = [
  {
    letter: 'A',
    title: 'Abrupt or emergency departure',
    body: 'Your head leaves suddenly — resignation, termination, or health. Staff morale drops fast. Families want answers. You need steady, experienced leadership in place within days, not months.',
  },
  {
    letter: 'B',
    title: 'Mid-accreditation loss of leadership',
    body: 'The visiting team arrives in four months. Records are incomplete, staff is unsettled, and the board is scrambling. An interim with accreditation experience can hold the process together.',
  },
  {
    letter: 'C',
    title: 'Culture erosion and fidelity drift',
    body: 'Years of permissive or avoidant leadership have left the school confused about what it is. Guides are inconsistent. Families are asking questions. You need someone who can restore coherence without blowing everything up.',
  },
  {
    letter: 'D',
    title: 'Board governance overreach',
    body: 'The board has been operating like management. A permanent head search will take time — and the next head needs to inherit a school where governance is clear. An experienced interim can reset those boundaries.',
  },
  {
    letter: 'E',
    title: 'Planned leadership transition',
    body: 'Your head is retiring or moving on. You want the search done right, but you can\'t leave the school without leadership for six months. An interim holds the school while you find the right permanent fit.',
  },
  {
    letter: 'F',
    title: 'Founding head stepping back',
    body: 'Founding leadership transitions are their own category. The school\'s identity is often wrapped up in one person. An interim can help the organization discover what it is without its founder — and build systems that don\'t depend on heroics.',
  },
]

const WHAT_WE_OFFER = [
  {
    title: 'A curated pool — not a directory',
    body: 'Every interim leader in our network has been in conversation with Hannah directly. We know their experience, their approach, and the situations they\'re actually equipped to handle.',
  },
  {
    title: 'Matched to your specific situation',
    body: 'Not every interim is right for every school. We match based on scenario type, level, credential, region, and culture — not just availability.',
  },
  {
    title: 'Leaders who know Montessori governance',
    body: 'Our interim leaders have managed boards, run accreditation visits, navigated staff separations, and led community communication through hard moments. They understand the unique dynamics of Montessori school culture.',
  },
  {
    title: 'Hannah manages the placement',
    body: 'This isn\'t a job board. We work directly with schools to understand the situation, identify the right match, and stay in contact through the engagement.',
  },
]

const LEADER_PROFILE = [
  'Current or former Heads of School and Assistant Heads',
  'AMI, AMS, and MACTE-credentialed leaders',
  'Experience across Primary, Elementary, Adolescent, and all-school leadership',
  'Backgrounds in Independent, Public, Charter, and Community Montessori',
  'Demonstrated experience with board governance and accreditation',
  'Engagements ranging from 3 months to 1 year, on-site and hybrid',
]

export default function InterimLeadershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
            MatchHub · Interim Leadership
          </p>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Interim leadership placement for Montessori schools.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-10">
              When a school needs steady, experienced leadership during a transition — abrupt or planned — we place vetted Montessori leaders who know how to walk into a complicated situation and hold it together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Talk to Hannah About Your School
              </Link>
              <Link
                href="/interim-leader-profile"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                I Want to Be an Interim Leader
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* When you need this */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-5">When Schools Call Us</p>
            <h2 className="text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Six situations where interim leadership makes the difference.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCENARIOS.map(s => (
              <div key={s.letter} className="bg-white border border-[#E2DDD6] p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="flex items-center justify-center w-7 h-7 text-[#d6a758] text-lg font-bold"
                    style={{ ...serif, background: '#0e1a7a', borderRadius: 0 }}
                  >
                    {s.letter}
                  </span>
                  <h3 className="text-[#0e1a7a] font-semibold text-base leading-snug" style={serif}>
                    {s.title}
                  </h3>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10 border-y border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-5">What Makes This Different</p>
            <h2 className="text-4xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              Not a directory. A placement.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              Most schools going through a leadership transition don&apos;t have time to post a job, sort applications, and negotiate terms. They need someone ready — someone who already understands what Montessori schools are and what can go wrong in them.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-10">
              We maintain a working network of interim leaders who have been in school leadership, understand board governance, and have experience navigating the specific kinds of crises that Montessori schools face. When a school calls, we match — not shuffle.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#162270] transition-colors font-medium"
            >
              Start the Conversation
            </Link>
          </div>
          <div className="space-y-6">
            {WHAT_WE_OFFER.map(item => (
              <div key={item.title} className="border-l-2 border-[#d6a758] pl-6">
                <h3 className="text-[#0e1a7a] font-semibold text-base mb-2" style={serif}>{item.title}</h3>
                <p className="text-[#374151] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leader profile */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-5">Our Interim Leader Network</p>
            <h2 className="text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Career leaders. Not career candidates.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              The leaders in our network are not between jobs and hoping for a short-term role. They are experienced Montessori leaders who have made an intentional choice to do interim work — because they are good at transitions, and because they want to contribute to schools that need it.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              They have sat in the chair you need filled. They know what it means to manage a board that doesn&apos;t understand governance, to rebuild a staff that has lost trust, and to communicate clearly with a parent community in a moment of uncertainty.
            </p>
          </div>
          <div className="bg-white border border-[#E2DDD6] p-8">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What Our Leaders Bring</p>
            <ul className="space-y-4">
              {LEADER_PROFILE.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#d6a758] rounded-full flex-shrink-0 mt-2" />
                  <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-[#E2DDD6]">
              <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                Are you an experienced Montessori leader interested in interim work?
              </p>
              <Link
                href="/interim-leader-profile"
                className="inline-block border border-[#0e1a7a] text-[#0e1a7a] text-xs px-5 py-2.5 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors font-medium"
              >
                Submit Your Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-14">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-5">How It Works</p>
            <h2 className="text-4xl text-white leading-tight" style={serif}>
              From your call to a leader in place.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'You reach out', body: 'Tell us what\'s happening — the situation, the timeline, what the school needs.' },
              { step: '02', title: 'We assess the fit', body: 'Hannah reviews the school context and identifies leaders from our network who match the specific scenario.' },
              { step: '03', title: 'Introduction and terms', body: 'We facilitate an introduction between the school and the interim. Engagement length, scope, and compensation are determined together.' },
              { step: '04', title: 'Leader in place', body: 'The interim begins. We stay in contact with both the school and the leader through the engagement.' },
            ].map(item => (
              <div key={item.step}>
                <p className="text-[#d6a758] text-3xl font-bold mb-4" style={serif}>{item.step}</p>
                <h3 className="text-white font-semibold text-base mb-3" style={serif}>{item.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl text-[#0e1a7a] font-semibold mb-3 leading-snug" style={serif}>
              Your school needs stable leadership now.
            </h2>
            <p className="text-[#64748B] text-base leading-relaxed">
              Reach out directly. Hannah will respond within one business day.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#162270] transition-colors font-medium text-center"
            >
              Contact Hannah
            </Link>
            <Link
              href="/matchhub/strategic-search"
              className="border border-[#E2DDD6] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:border-[#0e1a7a] transition-colors text-center"
            >
              Permanent Search →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
