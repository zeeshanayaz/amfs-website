import type { Metadata } from 'next'
import { AboutPage } from '@/components/about-page'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ScrollToTop } from '@/components/scroll-to-top'
import { SocialConnect } from '@/components/social-connect'

export const metadata: Metadata = {
  title: 'About Us | Al Musleh Foundation School',
  description: 'Discover how Al Musleh Foundation School nurtures learning, character, and confidence across five Karachi campuses.',
}

export default function AboutRoute() {
  return (
    <>
      <Navbar />
      <AboutPage />
      <SocialConnect />
      <Footer />
      <ScrollToTop />
    </>
  )
}
