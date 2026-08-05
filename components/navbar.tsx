'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

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
          <Link href="/" className="flex items-center gap-3 group" aria-label="Al Musleh Foundation School — Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.svg"
              alt="Al Musleh Foundation School official logo"
              width={160}
              height={168}
              className="object-contain h-12 sm:h-14 w-auto flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
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
          </Link>

          {/* Desktop nav + Coming Soon Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop nav links */}
            <nav className="hidden sm:flex sm:items-center sm:gap-1" aria-label="Main navigation">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'relative inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                      isActive
                        ? 'bg-brand-navy text-white shadow-sm shadow-brand-navy/20'
                        : 'text-brand-charcoal hover:bg-brand-light hover:text-brand-navy',
                    ].join(' ')}
                  >
                    {label}
                    {/* Gold underline dot for active state on non-pill */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-gold"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

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
                <span className="hidden xs:inline sm:inline">Coming Soon</span>
                <span className="sm:hidden">Soon</span>
              </span>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full text-brand-navy hover:bg-brand-light transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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

      {/* Mobile navigation drawer */}
      <div
        id="mobile-nav"
        aria-hidden={!mobileOpen}
        className={[
          'sm:hidden overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: mobileOpen ? '1px solid #D7DEE8' : 'none',
        }}
      >
        <nav
          aria-label="Mobile navigation"
          className="px-4 py-4 flex flex-col gap-1"
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-brand-navy text-white'
                    : 'text-brand-charcoal hover:bg-brand-light hover:text-brand-navy',
                ].join(' ')}
              >
                {isActive && (
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                )}
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
