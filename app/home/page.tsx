import {Home} from '@/app/home/home-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Al Musleh Foundation School | Nurturing Minds, Building Futures',
  description: 'Discover how Al Musleh Foundation School nurtures learning, character, and confidence across five Karachi campuses.',
}

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  )
}
