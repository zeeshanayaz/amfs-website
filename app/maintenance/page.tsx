import type { Metadata } from 'next'
import { SocialConnect } from '@/components/social-connect'
import { ScrollToTop } from '@/components/scroll-to-top'
import { MaintenanceHero } from '@/components/maintenance/maintenance-hero'
import { CoreValuesSection } from '@/components/core-values-section'

export const metadata: Metadata = {
  title: 'Maintenance | Al Musleh Foundation School',
  description:
    'Al Musleh Foundation School\'s website is under maintenance. Please check back soon.',
}

export default function MaintenancePage() {
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
