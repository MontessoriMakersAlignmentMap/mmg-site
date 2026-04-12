import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Montserrat } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import MoselleWidget from '@/components/MoselleWidget'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Body font loaded via Google Fonts (variable-weight, latin subset only)
const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

// Heading font (TheSeasons) is loaded via @font-face in globals.css
// using local /public/fonts files — no external request needed

const BASE_URL = 'https://montessorimakersgroup.org'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? '/'
  const canonical = `${BASE_URL}${pathname === '/' ? '' : pathname}`

  return {
    metadataBase: new URL(BASE_URL),
    title: 'Montessori Makers Group — Leadership & Organizational Design',
    description:
      'Strategic advisory, leadership development, and organizational design for Montessori schools. When a school is aligned, everything works.',
    alternates: {
      canonical,
    },
    verification: {
      google: 'vD9PrWDsWTu6FhCPV7KlihlEZbEc4xURZubK_F3orGI',
    },
    icons: {
      icon: [
        { url: '/icon.png', sizes: '512x512', type: 'image/png' },
        { url: '/favicon.ico', sizes: '32x32' },
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? '/'
  // Marketing pages at /residency and /residency/sample-lessons use the MMG nav/footer.
  // All other /residency/* paths are the Residency platform (no MMG chrome).
  const MMR_MARKETING_PATHS = ['/residency', '/residency/sample-lessons']
  const isResidencyPlatform = pathname.startsWith('/residency') && !MMR_MARKETING_PATHS.includes(pathname)

  return (
    <html lang="en" className={`${montserrat.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {!isResidencyPlatform && <ScrollProgress />}
        {!isResidencyPlatform && <Nav />}
        <main className="flex-1">{children}</main>
        {!isResidencyPlatform && <Footer />}
        {!isResidencyPlatform && <MoselleWidget />}
        <Analytics />
      </body>
    </html>
  )
}
