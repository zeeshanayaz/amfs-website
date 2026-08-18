import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getRemoteConfig, type RemoteConfig } from 'firebase/remote-config'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig)

let analytics: ReturnType<typeof getAnalytics> | undefined
let remoteConfigInstance: RemoteConfig | null = null

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}

export const REMOTE_CONFIG_DEFAULTS: Record<string, string | number | boolean> = {
  app_root_page_mode: 'home',
  app_enable_maintenance: false,
  app_maintenance_message: "We're under maintenance. Please check back soon.",
  app_coming_soon_enabled: false,
  feature_enable_admissions: true,
  feature_enable_careers: true,
  feature_enable_gallery: true,
  feature_enable_news_events: true,
  content_hero_title: 'Nurturing Minds, Building Futures',
  content_hero_subtitle: 'Quality education rooted in Islamic values',
  content_cta_text: 'Learn More',
}

export function getClientRemoteConfig(): RemoteConfig {
  if (typeof window === 'undefined') {
    throw new Error('Remote Config is only available in the browser')
  }

  if (!remoteConfigInstance) {
    remoteConfigInstance = getRemoteConfig(app)
    remoteConfigInstance.defaultConfig = REMOTE_CONFIG_DEFAULTS
    remoteConfigInstance.settings.fetchTimeoutMillis = 60000
    remoteConfigInstance.settings.minimumFetchIntervalMillis =
      process.env.NODE_ENV === 'development' ? 0 : 3600000
  }

  return remoteConfigInstance
}

export { app, analytics }
