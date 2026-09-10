import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { PageHeading } from '@/components/ui/page-heading'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ComingSoon } from '@/components/ui/coming-soon'

export const metadata: Metadata = {
    title: 'Alumini | Al Musleh Foundation School',
    description: 'Connect with our distinguished alumni and stay updated on their achievements and contributions to the community.',
}

export default function Alumini() {
    return (
        <>
            <Navbar />
            <main id="main-content" className="bg-brand-off-white text-brand-navy">
                <PageHeading
                    eyebrow="Distinguished Alumni"
                    title="AMFS Alumni"
                    description="Once an AMFS learner, always part of the AMFS family."
                />
                <ComingSoon />
            </main>
            <Footer />
            <ScrollToTop />
        </>
    )
}