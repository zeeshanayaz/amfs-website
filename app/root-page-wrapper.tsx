'use client'

import { useEffect, useState } from 'react'
import { useRemoteConfig } from '@/lib/firebase/provider'
import { Home } from './home/home-page'
import { ComingSoon } from '@/app/coming-soon/coming-soon-page'
import { Maintenance } from '@/app/maintenance/maintenance-page'

/**
 * Root Page Component
 * Conditionally renders based on Remote Config app_root_page_mode
 * Modes:
 * - 'home': Display home page
 * - 'coming_soon': Display coming soon page
 * - 'maintenance': Display maintenance page
 */
export default function RootPageWrapper() {
  const { isReady, pageMode } = useRemoteConfig()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show nothing while loading (prevents hydration mismatch)
  if (!mounted || !isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-royal mx-auto mb-4" />
          <p className="text-brand-dark-gray">Loading...</p>
        </div>
      </div>
    )
  }

  // Render appropriate page based on mode
  switch (pageMode) {
    case 'maintenance':
      return <Maintenance />
    case 'coming_soon':
      return <ComingSoon />
    case 'home':
    default:
      return <Home />
  }
}
