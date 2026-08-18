import { analytics } from './config'
import { logEvent } from 'firebase/analytics'

/**
 * Track custom events in Firebase Analytics
 * @param eventName - Name of the event
 * @param eventParams - Event parameters
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (!analytics) return

  try {
    logEvent(analytics, eventName, eventParams)
  } catch (error) {
    console.error('Error logging event to Firebase Analytics:', error)
  }
}

/**
 * Track page view
 * @param pageName - Name of the page
 * @param pageTitle - Title of the page
 */
export function trackPageView(pageName: string, pageTitle: string) {
  trackEvent('page_view', {
    page_name: pageName,
    page_title: pageTitle,
  })
}

/**
 * Track user engagement
 * @param action - Type of engagement action
 * @param label - Additional label for the action
 */
export function trackEngagement(action: string, label?: string) {
  trackEvent('engagement', {
    action,
    label,
  })
}
