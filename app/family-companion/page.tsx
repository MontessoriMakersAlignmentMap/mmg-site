'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/FadeIn'

const serif = { fontFamily: 'var(--font-heading)' }

const screenshots = [
  {
    src: '/images/family-companion/07-onboarding.png',
    label: 'Welcome',
    caption: 'A warm entry point designed for parents, not educators.',
  },
  {
    src: '/images/family-companion/01-home.png',
    label: 'Home',
    caption: 'Your child\'s chip, your weekly digest, and everything you need right at the top.',
  },
  {
    src: '/images/family-companion/02-entry-point.png',
    label: 'Your Questions',
    caption: 'Age-filtered answers. The same question shows you what it looks like for other ages too.',
  },
  {
    src: '/images/family-companion/03-article.png',
    label: 'Articles',
    caption: 'Real reading — written for you, not a textbook.',
  },
  {
    src: '/images/family-companion/04-journal.png',
    label: 'Observation Journal',
    caption: 'Add an observation. The app finds patterns and tells you what they mean.',
  },
  {
    src: '/images/family-companion/05-this-week.png',
    label: 'Weekly Digest',
    caption: 'What your child has been working on. What to try at home this week.',
  },
  {
    src: '/images/family-companion/06-practice.png',
    label: 'Practice',
    caption: 'Prepared environment, transitions, and behavior — in plain language.',
  },
]

const fiveQuestions = [
  {
    number: '01',
    question: 'Is my child learning?',
    answer: 'The weekly digest reflects what your child has been working on — written in language you can actually use.',
  },
  {
    number: '02',
    question: 'Are they on track?',
    answer: 'Every answer is calibrated to your child\'s exact age, from Nido through high school.',
  },
  {
    number: '03',
    question: 'What happens in the classroom?',
    answer: 'Articles and entry points are written by people who understand how Montessori actually works — not adapted from somewhere else.',
  },
  {
    number: '04',
    question: 'Will they be OK when they leave?',
    answer: 'Transition questions — to elementary, to middle school, to conventional settings — answered honestly.',
  },
  {
    number: '05',
    question: 'Am I supporting them right at home?',
    answer: 'Practice guides for the prepared environment, transitions, and big feelings — specific enough to actually use.',
  },
]

export default function FamilyCompanionPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          <div className="max-w-2xl flex-1">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Family Companion
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={serif}
            >
              The Montessori friend in your pocket.
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-8">
              For the parents who open their phone at 10pm wondering if they&rsquo;re doing it right.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Open Family Companion &rarr;
              </a>
            </div>
            <p className="text-white/30 text-xs mt-5 tracking-wide">
              $12/month &nbsp;&middot;&nbsp; $99/year &nbsp;&middot;&nbsp; Works as an app on your phone
            </p>
          </div>

          {/* Hero screenshot */}
          <div className="hidden md:block flex-shrink-0">
            <div className="relative">
              <div className="w-[220px] rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                <Image
                  src="/images/family-companion/07-onboarding.png"
                  alt="Family Companion welcome screen"
                  width={440}
                  height={880}
                  className="w-full h-auto"
                  priority
                />
              </div>
              {/* Floating second phone */}
              <div className="absolute -right-16 top-10 w-[180px] rounded-[1.75rem] overflow-hidden border-4 border-white/8 shadow-xl opacity-70">
                <Image
                  src="/images/family-companion/01-home.png"
                  alt="Family Companion home screen"
                  width={360}
                  height={720}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY COPY ─────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-6">
              What It Is
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-7"
              style={serif}
            >
              Built around the five questions every Montessori parent actually has.
            </h2>
            <div className="space-y-5 text-[#374151] text-base leading-relaxed">
              <p>
                Family Companion is built around the five questions every Montessori parent actually has — is my child learning, are they on track, what happens in the classroom, will they be OK when they leave, am I supporting them right at home. Each answer is written for your child&rsquo;s exact age, from Nido through high school.
              </p>
              <p>
                Add an observation when you notice something. The app spots patterns — independence coming up, order, big feelings — and tells you what they mean in plain language. Your weekly digest shows you what your child has been working on and gives you one or two things to try that week.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {fiveQuestions.map((item, i) => (
              <FadeIn key={item.number} delay={i * 0.07}>
                <div className="bg-white border border-[#E2DDD6] p-6 flex gap-5">
                  <span className="text-[#8A6014] text-xs tracking-[0.18em] font-semibold flex-shrink-0 pt-0.5">
                    {item.number}
                  </span>
                  <div>
                    <p className="text-[#0e1a7a] font-semibold text-sm mb-1.5" style={serif}>
                      {item.question}
                    </p>
                    <p className="text-[#374151] text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCREENSHOT GALLERY ────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-12">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-5">
              Inside the App
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Everything a Montessori parent needs, in one place.
            </h2>
          </div>

          {/* 7-up phone grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {screenshots.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.06}>
                <motion.div
                  className="flex flex-col"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <div className="rounded-2xl overflow-hidden border border-[#E2DDD6] shadow-sm bg-[#FAF9F7] mb-3">
                    <Image
                      src={s.src}
                      alt={s.caption}
                      width={390}
                      height={780}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-[#8A6014] text-[10px] tracking-[0.16em] uppercase font-semibold mb-1">
                    {s.label}
                  </p>
                  <p className="text-[#64748B] text-xs leading-relaxed">{s.caption}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── OBSERVATION JOURNAL ───────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-6">
              Observation Journal
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Notice something. Write it down. See what it means.
            </h2>
            <div className="space-y-4 mb-8 text-[#374151] text-base leading-relaxed">
              <p>
                Add an observation when you notice something — a word your child used, how they handled a frustration, what they chose to do first thing in the morning. Family Companion reads across your entries and surfaces patterns.
              </p>
              <p>
                Independence coming up. Order. Big feelings. It tells you what the pattern means in plain language — and connects it to what&rsquo;s developmentally happening at this age.
              </p>
            </div>
            <div className="space-y-3">
              {[
                'Pattern detection across your observations',
                'Developmentally-grounded explanations',
                'Tagged by theme — independence, order, big feelings, transitions',
                'Searchable across your full journal',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&rarr;</span>
                  <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-[260px] rounded-[2rem] overflow-hidden border border-[#D4CEC6] shadow-lg">
              <Image
                src="/images/family-companion/04-journal.png"
                alt="Family Companion observation journal showing pattern detection"
                width={520}
                height={1040}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── WEEKLY DIGEST ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="w-[260px] rounded-[2rem] overflow-hidden border border-[#E2DDD6] shadow-lg">
              <Image
                src="/images/family-companion/05-this-week.png"
                alt="Family Companion weekly digest"
                width={520}
                height={1040}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-6">
              Weekly Digest
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              What your child has been working on. What to try this week.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              Every week, Family Companion pulls together what you&rsquo;ve been seeing — your observations, the patterns that have come up, and one or two things to try at home that connect to your child&rsquo;s current work. Not a list of activities. A thread from what&rsquo;s actually happening.
            </p>
            <div className="space-y-3">
              {[
                'What you\'ve been seeing — the week\'s patterns in plain language',
                'A recommended read matched to your child\'s age and themes',
                'One or two things to try at home this week',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&rarr;</span>
                  <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-6">
              Pricing
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight mb-6"
              style={serif}
            >
              $12/month or $99/year.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-8">
              Start on your phone. Works as an app. Everything included — no add-ons, no tiers, no locked content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Open Family Companion &rarr;
              </a>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                label: 'Everything in the app',
                items: [
                  'Five question pathways — age-filtered for your child',
                  'Observation journal with pattern detection',
                  'Weekly digest — what you\'ve seen, what to try',
                  'Practice guides: environment, transitions, behavior',
                  'Full article library from Nido through high school',
                ],
              },
              {
                label: 'Works where you are',
                items: [
                  'Start in any browser — no download required',
                  'Install as an app on your phone or tablet',
                  'Your observations sync across all your devices',
                ],
              },
            ].map((block) => (
              <div key={block.label} className="bg-white/8 border border-white/15 p-7">
                <p className="text-white text-sm font-semibold mb-4" style={serif}>
                  {block.label}
                </p>
                <ul className="space-y-2.5">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#d6a758] flex-shrink-0 mt-0.5 text-sm">&rarr;</span>
                      <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
          <div className="flex-1 max-w-2xl">
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-5"
              style={serif}
            >
              The Montessori friend in your pocket.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Built for the parents who want to understand what&rsquo;s happening — not a newsletter, not a course, not a parenting book. A companion that knows your child&rsquo;s age and shows up every week.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <a
              href="/contact"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center font-medium"
            >
              Open Family Companion &rarr;
            </a>
            <p className="text-[#64748B] text-xs text-center">
              $12/month &nbsp;&middot;&nbsp; $99/year
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
