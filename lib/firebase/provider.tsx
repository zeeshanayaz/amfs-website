'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  REMOTE_CONFIG_KEYS,
  initializeRemoteConfig,
  getPageMode,
  getRemoteConfigString,
  getRemoteConfigBoolean,
  getRemoteConfigNumber,
  type PageMode,
} from '@/lib/firebase/remote-config'

type RemoteConfigContextValue = {
  isReady: boolean
  pageMode: PageMode
  getString: typeof getRemoteConfigString
  getBoolean: typeof getRemoteConfigBoolean
  getNumber: typeof getRemoteConfigNumber
  keys: typeof REMOTE_CONFIG_KEYS
}

const RemoteConfigContext = createContext<RemoteConfigContextValue | null>(null)

/**
 * Firebase Provider Component
 * Initializes Remote Config once and exposes values to the app tree.
 */
export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const [pageMode, setPageMode] = useState<PageMode>('home')

  useEffect(() => {
    let cancelled = false

    initializeRemoteConfig().finally(() => {
      if (cancelled) {
        return
      }

      setPageMode(getPageMode())
      setIsReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <RemoteConfigContext.Provider
      value={{
        isReady,
        pageMode,
        getString: getRemoteConfigString,
        getBoolean: getRemoteConfigBoolean,
        getNumber: getRemoteConfigNumber,
        keys: REMOTE_CONFIG_KEYS,
      }}
    >
      {children}
    </RemoteConfigContext.Provider>
  )
}

export function useRemoteConfig(): RemoteConfigContextValue {
  const context = useContext(RemoteConfigContext)

  if (!context) {
    throw new Error('useRemoteConfig must be used within FirebaseProvider')
  }

  return context
}
