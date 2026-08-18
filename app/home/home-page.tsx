import { Navbar } from '@/components/navbar'
import { HomeHero } from '@/components/home-hero'
import { HomeAbout } from '@/components/home-about'
import { CoreValuesSection } from '@/components/core-values-section'
import { CampusesSection } from '@/components/campuses-section'
import { CtaSection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { DiscoverVideoSection } from '@/components/discover-video-section'


export function Home() {
    return (
        <>
            <Navbar />
            <main id="main-content">
                <HomeHero />
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
