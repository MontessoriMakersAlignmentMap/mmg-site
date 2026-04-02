import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Montserrat } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { CursorCube } from '@/components/CursorCube'
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <CursorCube />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
