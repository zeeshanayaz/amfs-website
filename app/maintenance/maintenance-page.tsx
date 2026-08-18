import { CoreValuesSection } from '@/components/core-values-section'
import { SocialConnect } from '@/components/social-connect'
import { ScrollToTop } from '@/components/scroll-to-top'
import { MaintenanceHero } from '@/components/maintenance/maintenance-hero'



export function Maintenance() {
  return (
    <>
      <main id="main-content">
        {/* Section 1: Under Maintenance Hero (Full Page Height) */}
        <MaintenanceHero />

        {/* Section 2: Values Section */}
        <CoreValuesSection bgColor='white' />

        {/* Section 3: Social Connect */}
        <SocialConnect />
      </main>
      <ScrollToTop />
    </>
  )
}
