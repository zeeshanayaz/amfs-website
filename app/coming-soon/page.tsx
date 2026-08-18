import { Metadata } from 'next'
import {ComingSoon} from '@/app/coming-soon/coming-soon-page'

export const metadata: Metadata = {
  title: 'Coming Soon | Al Musleh Foundation School',
  description:
    'Al Musleh Foundation School\'s new website is coming soon. Stay connected on Facebook, Instagram, and YouTube for updates.',
}

export default function ComingSoonPage() {
  return (
    <>
      <ComingSoon />
    </>
  )
}
