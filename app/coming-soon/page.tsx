import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { ValuesSection } from '@/components/values-section'
import { SocialConnect } from '@/components/social-connect'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'

export const metadata: Metadata = {
  title: 'Coming Soon | Al Musleh Foundation School',
  description:
    'Al Musleh Foundation School\'s new website is coming soon. Stay connected on Facebook, Instagram, and YouTube for updates.',
}

export default function ComingSoonPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ValuesSection />
        <SocialConnect />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
