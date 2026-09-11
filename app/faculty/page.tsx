import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { PageHeading } from '@/components/ui/page-heading'
import { ScrollToTop } from '@/components/scroll-to-top'
import { FacultyDirectory } from '@/components/faculty-directory'

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
                    eyebrow="Meet Our Expert Faculty"
                    title="AMFS Faculty"
                    description="Meet our dedicated and experienced faculty members."
                />
                <FacultyDirectory />
            </main>
            <Footer />
            <ScrollToTop />
        </>
    )
}