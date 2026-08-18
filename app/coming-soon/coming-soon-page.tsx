import { CoreValuesSection } from '@/components/core-values-section'
import { SocialConnect } from '@/components/social-connect'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ComingSoonHero } from '@/components/coming_soon/coming-soon-hero'


export function ComingSoon() {
  return (
    <>
      <main id="main-content">
        {/* Section 1: Under Maintenance Hero (Full Page Height) */}
        <ComingSoonHero />

        {/* Section 2: Values Section */}
        <CoreValuesSection bgColor='white' />

        {/* Section 3: Social Connect */}
        <SocialConnect />
      </main>
      <ScrollToTop />
    </>
  )
}
