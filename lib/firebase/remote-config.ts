import { getClientRemoteConfig } from './config'
import { fetchAndActivate, getValue } from 'firebase/remote-config'

/**
 * Remote Config Keys for AMFS Website
 * These keys manage the application's runtime behavior
 */
export const REMOTE_CONFIG_KEYS = {
  // Page routing and features
  ROOT_PAGE_MODE: 'app_root_page_mode', // 'maintenance' | 'coming_soon' | 'home'
  ENABLE_MAINTENANCE: 'app_enable_maintenance', // boolean
  MAINTENANCE_MESSAGE: 'app_maintenance_message', // string
  COMING_SOON_ENABLED: 'app_coming_soon_enabled', // boolean

  // Feature flags
  ENABLE_ADMISSIONS: 'feature_enable_admissions', // boolean
  ENABLE_CAREERS: 'feature_enable_careers', // boolean
  ENABLE_GALLERY: 'feature_enable_gallery', // boolean
  ENABLE_NEWS_EVENTS: 'feature_enable_news_events', // boolean

  // Content and messaging
  HERO_TITLE: 'content_hero_title', // string
  HERO_SUBTITLE: 'content_hero_subtitle', // string
  CTA_TEXT: 'content_cta_text', // string
} as const

export type PageMode = 'maintenance' | 'coming_soon' | 'home'

let initPromise: Promise<boolean> | null = null

function getRemoteConfigInstance() {
  if (typeof window === 'undefined') {
    return null
  }

  return getClientRemoteConfig()
}

/**
 * Fetch and activate Remote Config (deduplicated singleton).
 * Safe to call from multiple components; only one fetch runs.
 */
export async function initializeRemoteConfig(): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false
  }

  if (!initPromise) {
    initPromise = (async () => {
      const remoteConfig = getClientRemoteConfig()

      try {
        const activated = await fetchAndActivate(remoteConfig)
        const pageMode = getValue(
          remoteConfig,
          REMOTE_CONFIG_KEYS.ROOT_PAGE_MODE,
        ).asString()

        console.log('[Remote Config] fetchAndActivate complete', {
          activated,
          pageMode,
          source: getValue(remoteConfig, REMOTE_CONFIG_KEYS.ROOT_PAGE_MODE)
            .getSource(),
        })

        return true
      } catch (error) {
        console.error('[Remote Config] fetch failed, using in-app defaults:', error)
        initPromise = null
        return false
      }
    })()
  }

  return initPromise
}

/**
 * Get a string value from Remote Config
 */
export function getRemoteConfigString(
  key: string,
  defaultValue: string = '',
): string {
  try {
    const remoteConfig = getRemoteConfigInstance()
    if (!remoteConfig) {
      return defaultValue
    }

    const value = getValue(remoteConfig, key).asString().trim()
    return value || defaultValue
  } catch (error) {
    console.error(`Error getting Remote Config string for key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Get a boolean value from Remote Config
 */
export function getRemoteConfigBoolean(
  key: string,
  defaultValue: boolean = false,
): boolean {
  try {
    const remoteConfig = getRemoteConfigInstance()
    if (!remoteConfig) {
      return defaultValue
    }

    return getValue(remoteConfig, key).asBoolean()
  } catch (error) {
    console.error(`Error getting Remote Config boolean for key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Get a number value from Remote Config
 */
export function getRemoteConfigNumber(
  key: string,
  defaultValue: number = 0,
): number {
  try {
    const remoteConfig = getRemoteConfigInstance()
    if (!remoteConfig) {
      return defaultValue
    }

    return getValue(remoteConfig, key).asNumber()
  } catch (error) {
    console.error(`Error getting Remote Config number for key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Get the current app page mode
 * Determines which page to display on root route
 */
export function getPageMode(): PageMode {
  const mode = getRemoteConfigString(
    REMOTE_CONFIG_KEYS.ROOT_PAGE_MODE,
    'home',
  )

  if (mode === 'maintenance' || mode === 'coming_soon' || mode === 'home') {
    return mode
  }

  console.warn(
    `[Remote Config] Invalid app_root_page_mode "${mode}", falling back to "home"`,
  )
  return 'home'
}
