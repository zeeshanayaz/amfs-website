import type { Metadata } from 'next'
import { ContactPage } from '@/components/contact-page'

export const metadata: Metadata = {
  title: 'Contact Us | Al Musleh Foundation School',
  description: 'Get in touch with Al Musleh Foundation School across our five Karachi campuses.',
}

export default function ContactRoute() {
    return <ContactPage />
}