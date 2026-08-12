import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Merriweather } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Al Musleh Foundation School — Nurturing Minds, Building Futures',
  description:
    'Al Musleh Foundation School offers quality education rooted in Islamic values and academic excellence across five campuses in Karachi.',
  keywords: [
    'Al Musleh Foundation School',
    'AMFS',
    'Islamic school',
    'coming soon',
    'admissions',
    'academics',
    'education',
  ],
  authors: [{ name: 'Al Musleh Foundation School' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
  openGraph: {
    title: 'Al Musleh Foundation School — Nurturing Minds, Building Futures',
    description:
      'Al Musleh Foundation School offers quality education rooted in Islamic values and academic excellence across five campuses in Karachi.',
    siteName: 'Al Musleh Foundation School',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#243C7D',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`light bg-background ${inter.variable} ${playfair.variable} ${merriweather.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased font-sans">{children}</body>
    </html>
  )
}
