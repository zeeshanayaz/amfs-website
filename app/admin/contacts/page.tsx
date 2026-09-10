'use client'

import { ContactsSection } from '../contacts-section'
import { useAdmin } from '../admin-context'

export default function AdminContactsPage() {
  const admin = useAdmin()
  return <ContactsSection contacts={admin.contacts} onMarkRead={admin.markContact} />
}
