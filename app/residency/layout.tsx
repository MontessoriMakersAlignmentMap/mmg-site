import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import ResidencyNav from './components/ResidencyNav'
import ResidencyFooter from './components/ResidencyFooter'
import './residency.css'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Montessori Makers Residency',
    template: '%s — Montessori Makers Residency',
  },
  description: 'A teacher residency program built on the belief that Montessori educators deserve rigorous, respectful preparation.',
  manifest: '/residency-manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MMR',
  },
  themeColor: '#0e1a7a',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function ResidencyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${montserrat.variable} residency-root`}>
      <ResidencyNav />
      <main className="residency-main">{children}</main>
      <ResidencyFooter />
    </div>
  )
}
