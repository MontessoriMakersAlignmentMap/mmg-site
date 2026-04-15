import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export const metadata = {
  title: 'Privacy Policy — MMAP',
  description:
    'Montessori Makers Alignment Map privacy policy. FERPA, COPPA, and state student data privacy law compliance.',
}

export default function MmapPrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-6">
            MMAP Compliance
          </p>
          <h1
            className="text-4xl md:text-5xl text-white leading-[1.05] tracking-tight mb-6"
            style={serif}
          >
            Privacy Policy
          </h1>
          <p className="text-[#94A3B8] text-sm">
            Effective Date: April 15, 2026 · Version 2.0
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto prose prose-sm md:prose-base prose-neutral">
          <p>
            Montessori Makers Alignment Map (<strong>"MMAP," "we," "our,"</strong> or{' '}
            <strong>"the Platform"</strong>) is operated by Montessori Makers Group LLC.
            We provide a school management platform that Montessori schools use to run
            their operations: student records, classroom documentation, attendance,
            family communication, billing, and related educational functions.
          </p>
          <p>
            MMAP is designed from the ground up to comply with the Family Educational
            Rights and Privacy Act (<strong>FERPA</strong>), the Children's Online
            Privacy Protection Act (<strong>COPPA</strong>), and state student data
            privacy laws. If you have questions, contact{' '}
            <strong>privacy@montessorimakersalignmentmap.com</strong>.
          </p>

          <h2>1. Who this policy applies to</h2>
          <p>This policy applies to everyone who interacts with MMAP:</p>
          <ul>
            <li>Schools that license MMAP (our direct customers)</li>
            <li>Students whose records are maintained in MMAP by their school</li>
            <li>Parents and guardians accessing records via the family portal</li>
            <li>Teachers, guides, administrators, and staff of licensed schools</li>
            <li>Visitors to this marketing site</li>
          </ul>
          <p>
            When a school licenses MMAP, the <strong>school is the data controller</strong>.
            MMAP is a <strong>data processor</strong> acting on the school's behalf. The
            school decides what data to enter, who can see it, and how long it is kept.
          </p>

          <h2>2. FERPA: We act as a "school official"</h2>
          <p>
            Under FERPA (20 U.S.C. § 1232g; 34 C.F.R. § 99.31(a)(1)(i)(B)), schools may
            share student education records with a "school official" who has a
            "legitimate educational interest." When a school signs a Data Processing
            Agreement with us, the school{' '}
            <strong>designates MMAP as a school official</strong> performing a function
            the school would otherwise perform in-house.
          </p>
          <p>As a school official, we:</p>
          <ul>
            <li>Use student records <strong>only</strong> for school-authorized educational purposes</li>
            <li>Are under the <strong>direct control</strong> of the school</li>
            <li><strong>Do not re-disclose</strong> records except as permitted by FERPA</li>
            <li><strong>Do not use student records</strong> for advertising, marketing, or profiling</li>
          </ul>

          <h2>3. Information we collect</h2>
          <p>
            We collect only what is necessary to run the services the school has licensed.
            Data is entered by the school, authorized staff, or parents. We do not knowingly
            collect information directly from children.
          </p>
          <ul>
            <li>
              <strong>Student data:</strong> Name, DOB, grade, classroom, attendance,
              observations, lesson progress, assessments, health records, photos, and
              signed consents.
            </li>
            <li>
              <strong>Family data:</strong> Guardian names, contact info, household
              relationships, preferences, signed permission slips, billing contact.
            </li>
            <li>
              <strong>Staff data:</strong> Names, roles, employment records (where the
              HR module is used), appraisals, PTO.
            </li>
            <li>
              <strong>Technical data:</strong> IP address, user agent, session timestamps,
              school-level feature usage analytics.
            </li>
          </ul>
          <p>
            We do <strong>not</strong> collect biometric data, precise geolocation, social
            media profiles, or full credit card numbers (handled by Stripe under their own
            controls).
          </p>

          <h2>4. How we use information</h2>
          <p>We use data only for school-authorized purposes:</p>
          <ul>
            <li>Operating the platform — store, retrieve, display, and export records</li>
            <li>Communication between staff and families on the school's behalf</li>
            <li>Reporting and insights for school staff</li>
            <li>AI-assisted features (opt-in per school), run only on the school's own data</li>
            <li>Security, fraud prevention, and customer support</li>
            <li>Compliance with law and the school's written instructions</li>
          </ul>
          <p>
            We do <strong>not</strong> sell or rent personal data, use student data for
            advertising, share with advertising networks, build advertising profiles,
            train external ML models on school data, or provide data to data brokers.
          </p>

          <h2>5. AI processing</h2>
          <p>
            MMAP uses Anthropic's Claude API for optional features like summaries,
            translation, insights, and draft generation. When a school enables AI features:
            only the minimum data necessary is sent per request; AI providers do not retain
            or train on school data (contractually guaranteed via Anthropic's API terms);
            schools may disable AI features entirely at any time.
          </p>

          <h2>6. How we share information</h2>
          <ul>
            <li>
              <strong>With school-authorized users.</strong> Role-based access enforced at
              the database level.
            </li>
            <li>
              <strong>With sub-processors.</strong> Listed in our public{' '}
              <Link href="/mmap/sub-processors" className="underline">
                Sub-processor List
              </Link>
              . Each is contractually bound to terms no less protective than this policy.
              Schools get 30 days' notice before we add or replace a sub-processor.
            </li>
            <li>
              <strong>When legally required.</strong> We verify requests and, where legally
              permitted, notify the school before disclosure.
            </li>
            <li><strong>With school consent.</strong> When the school explicitly directs us.</li>
          </ul>

          <h2>7. Data security</h2>
          <ul>
            <li>TLS 1.2+ encryption in transit; AES-256 at rest</li>
            <li>Row-level security enforced at the database level for tenant isolation</li>
            <li>Multi-factor authentication required for admin accounts</li>
            <li>Nine distinct roles with scoped permissions</li>
            <li>Role-aware idle session timeout (30–120 minutes)</li>
            <li>Audit logging of write actions on student records</li>
            <li>Background checks on all personnel with production access</li>
            <li>SOC 2 Type II hosting (Supabase, Vercel); US data residency</li>
            <li>Daily backups with 7+ day retention</li>
          </ul>

          <h2>8. Data retention and deletion</h2>
          <p>
            Schools control retention. On termination, we will (at the school's election)
            return data in a structured format and/or delete it within 30 days (production)
            / 90 days (backup rotation). A certificate of destruction is provided on completion.
          </p>

          <h2>9. Parent rights (FERPA)</h2>
          <p>Parents and eligible students have the right to:</p>
          <ol>
            <li>Inspect and review their child's education records</li>
            <li>Request corrections to inaccurate records</li>
            <li>Consent (or decline) to disclosures beyond FERPA exceptions</li>
            <li>File a complaint with the U.S. Department of Education Student Privacy Policy Office</li>
          </ol>
          <p>
            <strong>How to exercise these rights:</strong> contact your school. Schools
            are the custodians of education records under FERPA. If your school is
            unresponsive, contact us at{' '}
            <strong>privacy@montessorimakersalignmentmap.com</strong>.
          </p>

          <h2>10. Children under 13 — COPPA</h2>
          <p>
            Children under 13 cannot create their own MMAP accounts. Under COPPA § M.1,
            schools may act as the parent's agent for consent when data collection is for
            school-authorized educational use. Parents retain the right to revoke consent
            by contacting the school.
          </p>

          <h2>11. State student privacy laws</h2>
          <ul>
            <li>New York Education Law § 2-d and 8 NYCRR Part 121</li>
            <li>California SOPIPA (Ed Code § 22584) and AB 1584</li>
            <li>Colorado HB 16-1423</li>
            <li>Connecticut student data privacy law</li>
          </ul>

          <h2>12. Cookies and analytics</h2>
          <p>
            We use authentication cookies to maintain your session. We do <strong>not</strong>{' '}
            use advertising cookies, tracking pixels, Google Analytics, or Meta Pixel.
          </p>

          <h2>13. Changes to this policy</h2>
          <p>
            For material changes, we will notify each licensed school at least 30 days in
            advance and update the Effective Date.
          </p>

          <h2>14. Contact</h2>
          <p>
            <strong>Privacy and FERPA requests:</strong>{' '}
            privacy@montessorimakersalignmentmap.com
            <br />
            <strong>Designated Privacy Officer:</strong> Hannah Richardson, Founder
            <br />
            <strong>FERPA complaints may also be filed with:</strong> U.S. Department of
            Education, Student Privacy Policy Office, 400 Maryland Avenue SW, Washington
            DC 20202-8520 · privacy@ed.gov
          </p>

          <hr />
          <p className="text-sm text-[#64748B]">
            See also:{' '}
            <Link href="/mmap/terms" className="underline">
              Terms of Service
            </Link>{' '}
            ·{' '}
            <Link href="/mmap/sub-processors" className="underline">
              Sub-processors
            </Link>{' '}
            ·{' '}
            <Link href="/mmap/security" className="underline">
              Security &amp; Compliance
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
