import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { ValuesSection } from '@/components/values-section'
import { SocialConnect } from '@/components/social-connect'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'

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
