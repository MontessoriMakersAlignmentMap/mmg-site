import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export const metadata = {
  title: 'Terms of Service — MMAP',
  description:
    'Montessori Makers Alignment Map terms of service. FERPA school-official designation and school data commitments.',
}

export default function MmapTermsPage() {
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
            Terms of Service
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
            These Terms of Service (<strong>"Terms"</strong>) are a legal agreement
            between <strong>Montessori Makers Group LLC</strong> (<strong>"MMAP," "we,"
            "us"</strong>) and the organization or individual accessing the Montessori
            Makers Alignment Map platform (<strong>"you," "School," "User"</strong>). By
            accessing or using the platform, you agree to these Terms.
          </p>
          <p>
            <strong>
              Student data is governed by our Data Processing Agreement and Privacy
              Policy.
            </strong>{' '}
            In the event of a conflict between these Terms and the DPA with respect to
            student data, the DPA controls.
          </p>

          <h2>1. Who can use MMAP</h2>
          <ul>
            <li>
              Montessori and Montessori-inspired schools, independent schools, public
              charter schools, and LEAs
            </li>
            <li>
              Authorized staff of licensed schools (guides, teachers, administrators,
              board, specialists)
            </li>
            <li>Parents and guardians of enrolled students, via the family portal</li>
            <li>
              Users 13+ years old (children under 13 may have records maintained but
              cannot create accounts)
            </li>
          </ul>

          <h2>2. FERPA — MMAP as a School Official</h2>
          <p>
            When a school licenses MMAP under a signed services agreement, the school
            designates MMAP as a <strong>"school official"</strong> with a{' '}
            <strong>"legitimate educational interest"</strong> under{' '}
            <strong>34 C.F.R. § 99.31(a)(1)(i)(B)</strong>.
          </p>
          <p>As a school official, MMAP:</p>
          <ul>
            <li>Performs an institutional service the school would otherwise perform in-house</li>
            <li>Is under the <strong>direct control</strong> of the school with respect to student records</li>
            <li>Is subject to <strong>34 C.F.R. § 99.33(a)</strong> governing re-disclosure</li>
            <li>Uses student records only for the educational purposes authorized by the school</li>
          </ul>
          <p>
            <strong>Data ownership.</strong> Schools retain full ownership of all student,
            family, and staff data entered into the platform. MMAP acts as a data
            processor on behalf of the school. We do not own school data and do not claim
            any commercial interest in it.
          </p>

          <h2>3. Your responsibilities</h2>
          <ul>
            <li>Provide accurate information when creating accounts and entering data</li>
            <li>Use the platform only for lawful educational purposes</li>
            <li>Keep login credentials secure; don't share them</li>
            <li>Enable multi-factor authentication when offered</li>
            <li>Notify us of any suspected unauthorized account access</li>
            <li>Respect the privacy of students, families, and staff</li>
            <li>Access only records you are authorized to view</li>
          </ul>

          <h2>4. Our commitments</h2>
          <ul>
            <li>Provide a secure, reliable platform</li>
            <li>Maintain student data in accordance with our DPA and Privacy Policy</li>
            <li><strong>Not sell or rent</strong> any student, family, or staff data</li>
            <li><strong>Not use student data for advertising</strong> or marketing</li>
            <li><strong>Not train external ML models</strong> on school data without explicit consent</li>
            <li><strong>Not build personal profiles</strong> of students beyond authorized educational use</li>
            <li>Notify schools of security incidents within <strong>72 hours</strong> of confirmation</li>
            <li>Return or delete student data within <strong>30 days</strong> of written request at end of term</li>
            <li>Maintain and publish the sub-processor list with 30 days' notice of changes</li>
          </ul>

          <h2>5. Prohibited uses</h2>
          <p>You may not:</p>
          <ul>
            <li>Attempt unauthorized access to the platform, other schools' data, or infrastructure</li>
            <li>Reverse engineer, decompile, or extract source code</li>
            <li>Upload malicious code, spam, or illegal content</li>
            <li>Harass, discriminate against, or harm others</li>
            <li>Violate any student's FERPA rights</li>
            <li>Scrape or bulk-extract data except via authorized export tools</li>
            <li>Resell or sublicense without written permission</li>
          </ul>

          <h2>6. Intellectual property</h2>
          <ul>
            <li>
              <strong>Our IP.</strong> The MMAP name, logo, platform, source code, and
              design are the intellectual property of Montessori Makers Group LLC.
            </li>
            <li>
              <strong>Your content.</strong> You (or your school) retain ownership of all
              content. You grant MMAP a limited, non-exclusive license to process content
              solely to provide the services.
            </li>
            <li>
              <strong>Feedback.</strong> Suggestions you provide may be used to improve
              the platform without obligation or attribution.
            </li>
          </ul>

          <h2>7. Service availability</h2>
          <p>
            We target <strong>99.5% monthly uptime</strong> excluding scheduled
            maintenance, force majeure, third-party outages outside our control, and
            issues caused by the school's own network or hardware. Planned maintenance
            is announced at least 48 hours in advance when possible.
          </p>

          <h2>8. Fees and payment</h2>
          <ul>
            <li>Fees are described in the school's signed Order Form or Services Agreement</li>
            <li>Billed in advance; non-refundable except where required by law</li>
            <li>Late payments may result in suspension after 30 days' notice</li>
            <li>Full credit card numbers are not stored; Stripe handles payment processing</li>
          </ul>

          <h2>9. Termination</h2>
          <p>
            <strong>By you:</strong> Schools may terminate per the Services Agreement.
            You retain 30 days of access to export data; we return or delete per the DPA.
          </p>
          <p>
            <strong>By us:</strong> We may suspend or terminate for material breach not
            cured within 30 days, non-payment after 30 days' notice, or activity that
            threatens platform security.
          </p>

          <h2>10. Disclaimer of warranties</h2>
          <p>
            Except as expressly stated in a signed Services Agreement, the platform is
            provided <strong>"as is"</strong> and <strong>"as available."</strong> We
            make no other warranties, express or implied.
          </p>

          <h2>11. Limitation of liability</h2>
          <ul>
            <li>
              MMAP and its affiliates are not liable for indirect, incidental,
              consequential, special, or punitive damages, even if advised of the
              possibility.
            </li>
            <li>
              Our total cumulative liability in any twelve-month period will not exceed
              the amount paid by the school for services during that period.
            </li>
            <li>
              These limitations do not apply to (a) gross negligence or willful
              misconduct, (b) indemnification obligations in a signed Services Agreement,
              or (c) breach of data security obligations under the DPA.
            </li>
          </ul>

          <h2>12. Indemnification</h2>
          <p>
            You agree to indemnify MMAP against third-party claims arising from your
            violation of these Terms, misuse of the platform, or violation of another
            person's rights. We will indemnify you against third-party claims that the
            platform infringes a valid US copyright, trademark, or patent, subject to
            Section 11 limits.
          </p>

          <h2>13. Governing law</h2>
          <p>
            These Terms are governed by the laws of the state where the licensing school
            is located, without regard to conflict-of-law principles.
          </p>

          <h2>14. Changes to these Terms</h2>
          <p>
            For material changes affecting schools' rights or data, we will give at
            least 30 days' written notice. Continued use constitutes acceptance of the
            revised Terms.
          </p>

          <h2>15. Contact</h2>
          <p>
            <strong>General inquiries:</strong> hello@montessorimakersalignmentmap.com
            <br />
            <strong>Privacy and FERPA:</strong> privacy@montessorimakersalignmentmap.com
            <br />
            <strong>Security issues:</strong> security@montessorimakersalignmentmap.com
          </p>

          <hr />
          <p className="text-sm text-[#64748B]">
            See also:{' '}
            <Link href="/mmap/privacy" className="underline">
              Privacy Policy
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
