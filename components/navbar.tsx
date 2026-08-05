'use client'

import { useEffect, useState } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background: 'rgba(255, 255, 255, 0.55)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderBottom: '1px solid rgba(215, 222, 232, 0.5)',
              boxShadow:
                '0 4px 24px rgba(36, 60, 125, 0.08), 0 1.5px 0 rgba(246, 221, 36, 0.7)',
            }
          : {
              background: 'rgba(255, 255, 255, 0.97)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              borderBottom: '1px solid #D7DEE8',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo + School Name */}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.svg"
              alt="Al Musleh Foundation School official logo"
              width={160}
              height={168}
              className="object-contain h-12 sm:h-14 w-auto flex-shrink-0"
            />
            <div className="hidden sm:block">
              <p
                style={{
                  fontFamily: 'var(--font-merriweather)',
                  fontSize: '22px',
                  lineHeight: '1.3',
                  letterSpacing: '0.05em',
                }}
                className="text-brand-navy font-bold uppercase"
              >
                Al Musleh
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-merriweather)',
                  lineHeight: '1.2',
                  letterSpacing: '0.05em',
                }}
                className="text-brand-dark-gray text-xs uppercase"
              >
                Foundation School
              </p>
            </div>
          </div>

          {/* Coming Soon Badge */}
          <div className="flex items-center gap-2">
            <span
              aria-label="Website coming soon"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-navy text-white text-xs font-semibold tracking-wider uppercase select-none not-italic"
            >
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-brand-gold live-dot"
              />
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* Gold accent line */}
      <div
        aria-hidden="true"
        className="h-0.5 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, transparent, #F6DD24 30%, #F6DD24 70%, transparent)',
          opacity: scrolled ? 0.6 : 1,
        }}
      />
    </header>
  )
}
