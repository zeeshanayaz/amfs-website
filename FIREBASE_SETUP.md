# Firebase Integration Guide - AMFS Website

## Overview

This document provides a comprehensive guide for managing Firebase Analytics and Remote Config in the AMFS website.

## Project Details

- **Project ID**: `firebase-amfs`
- **Firebase Console**: [https://console.firebase.google.com/project/firebase-amfs](https://console.firebase.google.com/project/firebase-amfs)

---

## Architecture

### Firebase Modules

1. **Analytics** (`lib/firebase/analytics.ts`)
   - Automatically initialized on client-side
   - Tracks page views, custom events, and user engagement
   - No configuration needed beyond initialization

2. **Remote Config** (`lib/firebase/remote-config.ts`)
   - Manages dynamic feature flags and content configuration
   - Allows instant updates without code deployment
   - Values are fetched and cached locally

3. **Provider** (`lib/firebase/provider.tsx`)
   - React component that initializes Firebase on app load
   - Wraps the entire app in `layout.tsx`

4. **Hook** (`lib/firebase/use-remote-config.ts`)
   - React hook to access Remote Config values
   - Must be used in client components only

---

## Remote Config Keys

All keys should be created in Firebase Console > Remote Config > Add parameters.

### Page Routing

#### **`app_root_page_mode`** (String)
**Purpose**: Controls which page displays at root route (`/`)

**Allowed Values**:
- `home` - Display main home page (default)
- `coming_soon` - Display coming soon page
- `maintenance` - Display maintenance page

**Default**: `home`

**Example Firebase Console Value**:
```
home
```

**Implementation**:
The root page (`app/page.tsx`) checks this value and renders accordingly:
```typescript
const { pageMode } = useRemoteConfig() // Returns: 'home' | 'coming_soon' | 'maintenance'
```

---

### Feature Flags

#### **`feature_enable_admissions`** (Boolean)
**Purpose**: Enable/disable admissions page

**Default**: `true`

#### **`feature_enable_careers`** (Boolean)
**Purpose**: Enable/disable careers page

**Default**: `true`

#### **`feature_enable_gallery`** (Boolean)
**Purpose**: Enable/disable gallery page

**Default**: `true`

#### **`feature_enable_news_events`** (Boolean)
**Purpose**: Enable/disable news & events page

**Default**: `true`

---

### Content Management

#### **`content_hero_title`** (String)
**Purpose**: Dynamic hero section title

**Default**: `"Nurturing Minds, Building Futures"`

#### **`content_hero_subtitle`** (String)
**Purpose**: Dynamic hero section subtitle

**Default**: `"Quality education rooted in Islamic values"`

#### **`content_cta_text`** (String)
**Purpose**: Dynamic call-to-action button text

**Default**: `"Learn More"`

---

### Maintenance Management

#### **`app_enable_maintenance`** (Boolean)
**Purpose**: Enable maintenance mode globally

**Default**: `false`

**Note**: Set `app_root_page_mode` to `"maintenance"` instead for cleaner implementation.

#### **`app_maintenance_message`** (String)
**Purpose**: Custom maintenance message to display

**Default**: `"We're performing scheduled maintenance. We'll be back soon!"`

---

## How to Use in Firebase Console

### Step 1: Access Remote Config
1. Go to [Firebase Console](https://console.firebase.google.com/project/firebase-amfs)
2. Navigate to **Engage** > **Remote Config**
3. Click **Create configuration** (if first time)

### Step 2: Add a Parameter
1. Click **Add parameter**
2. Fill in the details:
   - **Parameter key**: Copy exact key from above (e.g., `app_root_page_mode`)
   - **Parameter description**: Explain what it does
   - **Default value**: Set the default value
   - **Value type**: String, Number, or Boolean
3. Click **Add condition** if you want different values for different scenarios (optional)
4. Click **Save**

### Step 3: Publish Changes
1. Review all parameters
2. Click **Publish** (blue button top-right)
3. Changes are live immediately on clients

---

## Example Scenarios

### Scenario 1: Show Coming Soon Page
1. Open Firebase Console > Remote Config
2. Set `app_root_page_mode` = `coming_soon`
3. Click **Publish**
4. Reload website - coming soon page displays

### Scenario 2: Enable Maintenance Mode
1. Open Firebase Console > Remote Config
2. Set `app_root_page_mode` = `maintenance`
3. Set `app_maintenance_message` = "System upgrades in progress..."
4. Click **Publish**
5. Reload website - maintenance page displays

### Scenario 3: Show Home Page with Feature Flags
1. Open Firebase Console > Remote Config
2. Set `app_root_page_mode` = `home`
3. Set `feature_enable_admissions` = `true`
4. Set `feature_enable_careers` = `false`
5. Click **Publish**
6. Home page loads, careers page is hidden

---

## Using Analytics

### Track Page Views

```typescript
import { trackPageView } from '@/lib/firebase/analytics'

// In your page component
useEffect(() => {
  trackPageView('home', 'Home Page')
}, [])
```

### Track Custom Events

```typescript
import { trackEvent } from '@/lib/firebase/analytics'

// Track button click
<button onClick={() => trackEvent('cta_clicked', { button: 'admissions' })}>
  Apply Now
</button>
```

### Available Tracking Functions

- `trackEvent(eventName, params)` - Track any custom event
- `trackPageView(pageName, pageTitle)` - Track page view
- `trackEngagement(action, label)` - Track user engagement

---

## Development Notes

### Minimum Fetch Interval
- Remote Config values are cached locally for **1 hour** by default
- To change: Edit `lib/firebase/remote-config.ts` line 8
  ```typescript
  remoteConfig.settings.minimumFetchIntervalMillis = 3600000 // 1 hour in ms
  ```

### Environment Variables
All Firebase config is stored in `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

### Client-Side Only
- Firebase Analytics and Remote Config are client-side only
- Cannot be used in Next.js Server Components
- Always use hooks in `'use client'` components

---

## Required Firebase Console Setup

✅ **Already Enabled**:
- Analytics
- Remote Config
- Firebase Hosting

---

## Troubleshooting

### Remote Config values not updating?
1. Check cache interval in `lib/firebase/remote-config.ts`
2. Clear browser cache and reload
3. Verify values are **Published** in Firebase Console

### Analytics not tracking?
1. Ensure component has `'use client'` directive
2. Check browser console for Firebase errors
3. Verify Analytics is enabled in Firebase Console

### Wrong page showing on root?
1. Check value of `app_root_page_mode` in Firebase Console
2. Click **Publish** if changes were made
3. Wait for cache to expire or reduce `minimumFetchIntervalMillis`
4. Reload page with hard refresh (Ctrl+Shift+R)

---

## Summary of Key Points

| Key | Type | Purpose | Default |
|-----|------|---------|---------|
| `app_root_page_mode` | String | Control root page (home/coming_soon/maintenance) | `home` |
| `feature_enable_admissions` | Boolean | Show/hide admissions page | `true` |
| `feature_enable_careers` | Boolean | Show/hide careers page | `true` |
| `feature_enable_gallery` | Boolean | Show/hide gallery page | `true` |
| `feature_enable_news_events` | Boolean | Show/hide news page | `true` |
| `content_hero_title` | String | Hero section title | `"Nurturing Minds..."` |
| `content_hero_subtitle` | String | Hero section subtitle | `"Quality education..."` |
| `content_cta_text` | String | CTA button text | `"Learn More"` |
| `app_maintenance_message` | String | Maintenance message | `"We're under maintenance..."` |

---

## Next Steps

1. ✅ Firebase is set up and configured
2. 📋 Create the Remote Config parameters in Firebase Console (listed above)
3. 🔄 Test by changing `app_root_page_mode` and publishing
4. 📊 Monitor Analytics in Firebase Console > Analytics dashboard
5. 🎯 Add more feature flags as needed for future features

---

For any questions or issues, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Remote Config Guide](https://firebase.google.com/docs/remote-config)
- [Firebase Analytics Guide](https://firebase.google.com/docs/analytics)
