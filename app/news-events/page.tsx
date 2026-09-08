import type { Metadata } from 'next'
import { NewsEventsPage } from '@/components/news-events-page'

export const metadata: Metadata = {
  title: 'News & Events | Al Musleh Foundation School',
  description: 'Stay updated with the latest news and events from Al Musleh Foundation School across our five Karachi campuses.',
}

export default function NewsEventsRoute() {
  return <NewsEventsPage />
}
