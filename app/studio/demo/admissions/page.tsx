'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SchoolPage, C, serif } from '../_components/SchoolShell'

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

const steps = [
  { n: '01', label: 'Inquire', desc: 'Submit an inquiry form. We respond within two business days to answer initial questions and share more about the school.' },
  { n: '02', label: 'Attend an Open House or Tour', desc: 'Visit the school during a work cycle. See the classroom in motion. Meet the guides. Ask everything.' },
  { n: '03', label: 'Submit an Application', desc: 'Complete the application online. Applications are accepted on a rolling basis. Priority deadline: February 1.' },
  { n: '04', label: 'Student Visit Day', desc: 'Your child spends a morning in the classroom. This helps us understand fit — and gives your child a chance to experience the environment firsthand.' },
  { n: '05', label: 'Enrollment Decision', desc: 'Families receive decisions within two weeks of the student visit. Enrollment contracts and deposits are due within 14 days of acceptance.' },
]

const events = [
  { date: 'January 18, 2026',  name: 'Open House — Primary & Elementary', time: '9:00–11:00 am',  type: 'Open House' },
  { date: 'February 7, 2026',  name: 'Saturday Campus Tour',              time: '10:00–11:30 am', type: 'Tour' },
  { date: 'February 22, 2026', name: 'Open House — All Programs',         time: '9:00–11:00 am',  type: 'Open House' },
  { date: 'March 8, 2026',     name: 'Coffee Chat with the Head of School', time: '8:30–9:30 am', type: 'Event' },
  { date: 'March 21, 2026',    name: 'Saturday Campus Tour',              time: '10:00–11:30 am', type: 'Tour' },
]

const tuitionData = [
  { program: 'Primary — Half Day', tuition: '$14,800', note: 'Ages 3–6, 8:00 am–12:00 pm' },
  { program: 'Primary — Full Day', tuition: '$19,200', note: 'Ages 3–6, 8:00 am–3:15 pm' },
  { program: 'Lower Elementary',   tuition: '$21,500', note: 'Ages 6–9, 8:00 am–3:15 pm' },
  { program: 'Upper Elementary',   tuition: '$22,800', note: 'Ages 9–12, 8:00 am–3:30 pm' },
]

export default function AdmissionsPage() {
  const intro = useReveal(0.15)
  const stepsR = useReveal(0.08)
  const eventsR = useReveal(0.08)
  const tuitionR = useReveal(0.08)
  const faqR = useReveal(0.08)

  return (
    <SchoolPage>
      {/* Hero */}
      <section style={{ position: 'relative', height: '55vh', minHeight: 360, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', paddingBottom: 64, paddingTop: 164 }}>
        <Image
          src="/demo/admissions-hero.png"
          alt="Children at MMS"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(61,36,16,0.88) 0%, rgba(61,36,16,0.25) 70%)' }} />
        <div className="relative px-8 md:px-16" style={{ zIndex: 2, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <p style={{ color: C.sage, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 16 }}>
            <Link href="/studio/demo" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> &nbsp;/&nbsp; Admissions
          </p>
          <h1 style={{ ...serif, fontSize: 'clamp(40px,6vw,80px)', color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
            Your MMS Journey<br />Begins Here.
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section style={{ background: C.white, padding: '80px 64px' }}>
        <div ref={intro.ref} className="grid grid-cols-1 md:grid-cols-2 gap-16" style={{ maxWidth: 1200, margin: '0 auto', opacity: intro.visible ? 1 : 0, transition: 'opacity 1s ease' }}>
          <div>
            <p style={{ ...serif, fontSize: 'clamp(22px,2.8vw,34px)', color: C.text, lineHeight: 1.4 }}>
              We don&rsquo;t believe in competitive admissions.<br />We believe in good fit.
            </p>
          </div>
          <div>
            <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Every family who joins MMS starts with a conversation. We want to understand your child,
              your questions, and what you&rsquo;re looking for in a school — before you ever fill out an application.
            </p>
            <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8 }}>
              If MMS is the right environment, that will be clear. If it isn&rsquo;t, we&rsquo;ll tell you honestly —
              and help you think through what might be.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ background: C.cream, padding: '100px 64px', borderTop: `1px solid rgba(0,0,0,0.06)` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div ref={stepsR.ref} style={{ opacity: stepsR.visible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
            <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 16 }}>How to Apply</p>
            <h2 style={{ ...serif, fontSize: 'clamp(26px,3.5vw,44px)', color: C.text, marginBottom: 56, lineHeight: 1.1 }}>
              Five steps to enrollment.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, padding: '36px 0',
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                  opacity: stepsR.visible ? 1 : 0,
                  transform: stepsR.visible ? 'none' : 'translateY(20px)',
                  transition: `all 0.7s ease ${0.1 + i * 0.1}s`,
                }}
              >
                <p style={{ ...serif, fontSize: 40, color: C.copper, lineHeight: 1 }}>{s.n}</p>
                <div>
                  <p style={{ ...serif, fontSize: 20, color: C.text, marginBottom: 8 }}>{s.label}</p>
                  <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.75 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 40 }}>
            <Link
              href="#"
              style={{ background: C.copper, color: '#fff', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '16px 44px', textDecoration: 'none', display: 'inline-block' }}
            >
              Begin Your Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" style={{ background: C.slate, padding: '100px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div ref={eventsR.ref} style={{ opacity: eventsR.visible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
            <p style={{ color: C.sage, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 16 }}>Upcoming Events</p>
            <h2 style={{ ...serif, fontSize: 'clamp(26px,3.5vw,44px)', color: '#fff', marginBottom: 48, lineHeight: 1.1 }}>
              Open Houses &amp; Tours
            </h2>
          </div>
          <div>
            {events.map((ev, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.1)',
                  flexWrap: 'wrap', gap: 16,
                  opacity: eventsR.visible ? 1 : 0,
                  transition: `opacity 0.6s ease ${0.1 + i * 0.08}s`,
                }}
              >
                <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
                  <p style={{ color: C.sage, fontSize: 12, minWidth: 160 }}>{ev.date}</p>
                  <div>
                    <p style={{ color: '#fff', fontSize: 15 }}>{ev.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{ev.time}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <span style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px' }}>{ev.type}</span>
                  <a href="#" style={{ color: C.copper, fontSize: 12, letterSpacing: '0.06em', textDecoration: 'none' }}>RSVP &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tuition */}
      <section id="tuition" style={{ background: C.white, padding: '100px 64px', borderTop: `1px solid rgba(0,0,0,0.06)` }}>
        <div ref={tuitionR.ref} style={{ maxWidth: 1200, margin: '0 auto', opacity: tuitionR.visible ? 1 : 0, transition: 'opacity 1s ease' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 20 }}>Tuition &amp; Aid</p>
              <h2 style={{ ...serif, fontSize: 'clamp(26px,3.5vw,44px)', color: C.text, lineHeight: 1.1, marginBottom: 24 }}>
                Transparent pricing.<br />Real financial support.
              </h2>
              <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
                MMS is committed to making Montessori education accessible to families across Chicago.
                Approximately 28% of our students receive financial aid in some form.
              </p>
              <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8 }}>
                Aid applications are reviewed on a need-blind basis and are processed through FACTS.
                The deadline for aid consideration is February 15.
              </p>
            </div>
            <div>
              {tuitionData.map((t, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.08)', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: C.text, fontSize: 15, fontWeight: 500 }}>{t.program}</p>
                    <p style={{ color: C.muted, fontSize: 12 }}>{t.note}</p>
                  </div>
                  <p style={{ ...serif, fontSize: 22, color: C.text }}>{t.tuition}</p>
                </div>
              ))}
              <p style={{ color: C.muted, fontSize: 12, marginTop: 16 }}>
                Tuition rates are for the 2025–2026 academic year. Sibling discounts available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: C.cream, padding: '100px 64px', borderTop: `1px solid rgba(0,0,0,0.06)` }}>
        <div ref={faqR.ref} style={{ maxWidth: 900, margin: '0 auto', opacity: faqR.visible ? 1 : 0, transition: 'opacity 1s ease' }}>
          <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 16 }}>Common Questions</p>
          <h2 style={{ ...serif, fontSize: 'clamp(26px,3vw,40px)', color: C.text, marginBottom: 48, lineHeight: 1.1 }}>
            Admissions FAQ
          </h2>
          {[
            { q: 'Do you accept children who have never been in a Montessori environment?', a: 'Yes. The majority of our Primary students join with no prior Montessori experience. The environment is designed for orientation — children find their footing naturally.' },
            { q: 'What is the age cutoff for Primary enrollment?', a: 'Children entering Primary must be 3 years old by September 1 and must be fully toilet independent.' },
            { q: 'Is there a waitlist?', a: 'Yes. For the current academic year, Primary and Lower Elementary have active waitlists. We encourage families to inquire early and to attend an open house even before applying.' },
            { q: 'Do you offer extended day care?', a: 'Yes. Extended day runs from 3:15–6:00 pm for Elementary students and from 12:00–3:15 pm for half-day Primary families. An additional fee applies.' },
            { q: 'How do you handle children who need additional support?', a: 'MMS serves children with a range of learning profiles. We work closely with families and, where appropriate, with outside specialists. We do not offer a dedicated special education program.' },
          ].map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: C.copper, padding: '80px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ ...serif, fontSize: 'clamp(24px,3vw,40px)', color: '#fff', marginBottom: 16 }}>
            Questions? Just ask.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>
            Our admissions team is available Monday–Friday, 8:00 am–4:30 pm.
            We respond to all inquiries within two business days.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:7735550142" style={{ background: '#fff', color: C.copper, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              (773) 555-0142
            </a>
            <a href="mailto:admissions@montessorimakersschool.org" style={{ border: '1px solid rgba(255,255,255,0.5)', color: '#fff', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '16px 36px', textDecoration: 'none', display: 'inline-block' }}>
              Email Admissions
            </a>
          </div>
        </div>
      </section>
    </SchoolPage>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', textAlign: 'left', padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}
      >
        <p style={{ color: C.text, fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>{q}</p>
        <span style={{ color: C.copper, fontSize: 20, flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 24 }}>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8 }}>{a}</p>
        </div>
      )}
    </div>
  )
}
