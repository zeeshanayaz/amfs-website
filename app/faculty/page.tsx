import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { PageHeading } from '@/components/ui/page-heading'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ComingSoon } from '@/components/ui/coming-soon'

export const metadata: Metadata = {
    title: 'Faculty | Al Musleh Foundation School',
    description: 'Meet our dedicated and experienced faculty members.',
}

export default function Faculty() {
    return (
        <>
            <Navbar />
            <main id="main-content" className="bg-brand-off-white text-brand-navy">
                <PageHeading
                    eyebrow="Distinguished Faculty"
                    title="AMFS Faculty"
                    description="Meet our dedicated and experienced faculty members."
                />
                <ComingSoon />
            </main>
            <Footer />
            <ScrollToTop />
        </>
    )
}