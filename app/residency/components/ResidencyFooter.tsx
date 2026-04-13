import Image from 'next/image'
import Link from 'next/link'

export default function ResidencyFooter() {
  return (
    <footer style={{
      background: 'var(--r-navy)',
      color: 'rgba(255,255,255,0.7)',
      padding: '3rem 0 2rem',
      marginTop: 'auto',
    }}>
      <div className="r-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          <div>
            <Image
              src="/mmr-logo-dark.png"
              alt="Montessori Makers Institute Residency"
              width={160}
              height={80}
              style={{ objectFit: 'contain', objectPosition: 'left', marginBottom: '0.75rem' }}
            />
            <p style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>
              A program of Montessori Makers Institute within the Montessori Makers Group ecosystem.
            </p>
          </div>
          <div>
            <h5 style={{ color: 'var(--r-white)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Platform
            </h5>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link href="/residency/curriculum" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.8125rem' }}>
                Curriculum Library
              </Link>
              <Link href="/residency/portal" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.8125rem' }}>
                Resident Portal
              </Link>
              <Link href="/residency/auth/login" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.8125rem' }}>
                Sign In
              </Link>
            </nav>
          </div>
          <div>
            <h5 style={{ color: 'var(--r-white)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Ecosystem
            </h5>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8125rem' }}>Montessori Makers Group</span>
              <span style={{ fontSize: '0.8125rem' }}>Montessori Makers Institute</span>
              <span style={{ fontSize: '0.8125rem' }}>MatchHub</span>
            </nav>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1.5rem',
          fontSize: '0.75rem',
          textAlign: 'center',
        }}>
          &copy; {new Date().getFullYear()} Montessori Makers Group. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
