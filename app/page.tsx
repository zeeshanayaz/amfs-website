import type { Metadata } from 'next'
import RootPageWrapper from './root-page-wrapper'

export const metadata: Metadata = {
  title: 'Al Musleh Foundation School - Nurturing Minds, Building Futures',
  description:
    'Al Musleh Foundation School offers quality education rooted in Islamic values and academic excellence across 5 campuses in Karachi. Empowering 1,500+ students to lead lives of purpose.',
}

export default function RootPage() {
  return <RootPageWrapper />
}
