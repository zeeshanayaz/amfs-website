import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { HomeHero } from '@/components/home-hero'
import { MarqueeBar } from '@/components/marquee-bar'
import { HomeAbout } from '@/components/home-about'
import { CoreValuesSection } from '@/components/core-values-section'
import { CampusesSection } from '@/components/campuses-section'
import { CtaSection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { DiscoverVideoSection } from '@/components/discover-video-section'

export const metadata: Metadata = {
  title: 'Al Musleh Foundation School — Nurturing Minds, Building Futures',
  description:
    'Al Musleh Foundation School offers quality education rooted in Islamic values and academic excellence across 5 campuses in Karachi. Empowering 1,500+ students to lead lives of purpose.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HomeHero />
        {/* <MarqueeBar /> */}
        <HomeAbout />
        <DiscoverVideoSection />
        <CoreValuesSection />
        <CampusesSection />
        <CtaSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
