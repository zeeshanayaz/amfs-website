'use client'

import { usePathname } from 'next/navigation'
import { AdminProvider } from './admin-context'
import { AdminShell } from './admin-shell'

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()

  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    return children
  }

  return <AdminProvider><AdminShell>{children}</AdminShell></AdminProvider>
}
