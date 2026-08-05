'use client'

// Social media platform definitions — add new platforms here without changing layout
interface SocialPlatform {
  id: string
  name: string
  handle: string
  url: string
  ariaLabel: string
  icon: React.ReactNode
}

const platforms: SocialPlatform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'amfs.edu',
    url: 'https://facebook.com/amfs.edu',
    ariaLabel: 'Follow Al Musleh Foundation School on Facebook (opens in new tab)',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-7 h-7"
      >
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.02 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.265h3.328l-.532 3.49h-2.796v8.437C19.612 23.093 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@amfs_edu',
    url: 'https://instagram.com/amfs_edu',
    ariaLabel: 'Follow Al Musleh Foundation School on Instagram (opens in new tab)',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-7 h-7"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@amfs_edu',
    url: 'https://youtube.com/@amfs_edu',
    ariaLabel: 'Subscribe to Al Musleh Foundation School on YouTube (opens in new tab)',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-7 h-7"
      >
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

// Per-platform CSS hover color variables applied via Tailwind-compatible data attributes
// Each card uses group-hover with data-[id] to apply the correct brand color
const platformStyles: Record<string, { iconHover: string; bgHover: string; borderHover: string }> = {
  facebook:  { iconHover: 'group-hover:text-[#1877F2]', bgHover: 'group-hover:bg-[#EBF2FF]', borderHover: 'group-hover:border-[#1877F2]' },
  instagram: { iconHover: 'group-hover:text-[#E1306C]', bgHover: 'group-hover:bg-[#FFF0F5]', borderHover: 'group-hover:border-[#E1306C]' },
  youtube:   { iconHover: 'group-hover:text-[#FF0000]', bgHover: 'group-hover:bg-[#FFF0F0]', borderHover: 'group-hover:border-[#FF0000]' },
}

function SocialCard({ id, name, handle, url, ariaLabel, icon }: SocialPlatform) {
  const styles = platformStyles[id] ?? {
    iconHover: 'group-hover:text-brand-royal',
    bgHover: 'group-hover:bg-brand-light',
    borderHover: 'group-hover:border-brand-royal',
  }

  return (
    <div className="group relative">
      {/* Tooltip */}
      <span
        role="tooltip"
        className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-charcoal text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
        aria-hidden="true"
      >
        {name}
        <span
          className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-charcoal"
          aria-hidden="true"
        />
      </span>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={[
          'flex flex-col items-center gap-4 p-7 sm:p-8',
          'bg-white rounded-2xl border border-brand-border',
          'hover:shadow-xl transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2',
          styles.bgHover,
          styles.borderHover,
        ].join(' ')}
      >
        {/* Icon */}
        <div
          className={[
            'text-brand-navy transition-colors duration-300',
            styles.iconHover,
          ].join(' ')}
          aria-hidden="true"
        >
          {icon}
        </div>

        {/* Platform info */}
        <div className="text-center">
          <p className="font-semibold text-brand-navy text-sm leading-tight">{name}</p>
          <p className="text-brand-dark-gray text-xs mt-0.5">{handle}</p>
        </div>

        {/* Follow label */}
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-royal border border-brand-royal/30 rounded-full px-3.5 py-1.5 group-hover:bg-brand-royal/10 transition-colors"
          aria-hidden="true"
        >
          Follow Us
        </span>
      </a>
    </div>
  )
}

export function SocialConnect() {
  return (
    <section
      id="social-connect"
      aria-labelledby="social-heading"
      className="bg-brand-off-white py-20 sm:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <header className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
            <span className="text-brand-sky text-[11px] font-semibold uppercase tracking-[0.3em]">
              Stay Connected
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-brand-gold" />
          </div>
          <h2
            id="social-heading"
            className="font-serif font-bold text-brand-navy text-3xl sm:text-4xl leading-tight text-balance mb-4"
          >
            Connect With Us
          </h2>
          <p className="text-brand-dark-gray text-base leading-relaxed">
            While our website is being built, follow our official channels to stay up to date
            with school news, events, and announcements.
          </p>
        </header>

        {/* Social cards — flexbox so new platforms can be added without layout changes */}
        <div
          role="list"
          className="flex flex-wrap justify-center gap-5 sm:gap-6"
        >
          {platforms.map((platform) => (
            <div
              key={platform.id}
              role="listitem"
              className="w-full sm:w-[calc(50%-12px)] md:w-[200px] lg:w-[220px]"
            >
              <SocialCard {...platform} />
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
