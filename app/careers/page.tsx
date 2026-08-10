import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CareersPage } from '@/components/careers-page'

export const metadata: Metadata = {
  title: 'Careers | Al Musleh Foundation School',
  description: 'Join Al Musleh Foundation School and help shape confident, capable learners across Karachi.',
}

export default function CareersRoute() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <CareersPage />
      </main>
      <Footer />
    </>
  )
}
