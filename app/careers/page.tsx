import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CareersPage } from '@/components/careers-page'
import { getActiveJobs, isSupabaseConfigured } from '@/lib/supabase/client'

export const metadata: Metadata = {
  title: 'Careers | Al Musleh Foundation School',
  description: 'Join Al Musleh Foundation School and help shape confident, capable learners across Karachi.',
}

export const dynamic = 'force-dynamic'

export default async function CareersRoute() {
  const jobs = isSupabaseConfigured() ? (await getActiveJobs()).data ?? [] : []

  return (
    <>
      <Navbar />
      <main id="main-content">
        <CareersPage jobs={jobs} />
      </main>
      <Footer />
    </>
  )
}
