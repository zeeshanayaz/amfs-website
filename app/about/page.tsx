import type { Metadata } from 'next'
import { AboutPage } from '@/components/about-page'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ScrollToTop } from '@/components/scroll-to-top'

export const metadata: Metadata = {
  title: 'About Us | Al Musleh Foundation School',
  description: 'Learn about Al Musleh Foundation School, our story, values, vision, mission, campuses, and commitment to quality education in Karachi.',
}

export default function AboutRoute() {
  return (
    <>
      <Navbar />
      <AboutPage />
      <Footer />
      <ScrollToTop />
    </>
  )
}
