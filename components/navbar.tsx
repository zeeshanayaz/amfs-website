'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home', external: false },
  { href: '/about', label: 'About', external: false },
  { href: '/admissions', label: 'Admissions', external: false },
  { href: '#', label: 'Academic Calendar', external: false },
  { href: '/news-events', label: 'News & Events', external: false },
  { href: '/contact', label: 'Contact', external: false },
  { href: '/careers', label: 'Careers', external: false },
  // { href: '/#campuses', label: 'Campuses' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const normalizePath = (p?: string) => {
    if (!p) return '/'
    const trimmed = p.replace(/\/+$/g, '')
    return trimmed === '' ? '/' : trimmed
  }

  const isActiveFor = (href: string, currentPath?: string) => {
    const nHref = normalizePath(href)
    const nPath = normalizePath(currentPath)
    if (nHref === nPath) return true
    // treat nested routes as active for parent route (e.g. /admin/login -> /admin)
    return nHref !== '/' && nPath.startsWith(nHref + '/')
  }

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
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Al Musleh Foundation School — Home"
          >
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

          {/* Desktop nav + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop nav links */}
            <nav className="hidden sm:flex sm:items-center sm:gap-0.5" aria-label="Main navigation">
              {navLinks.map(({ href, label, external }) => {
                // Hash links (/#campuses) are scroll anchors — never mark as "active page".
                const isActive = !external && !href.includes('#') && isActiveFor(href, pathname)
                return (
                  <Link
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'relative inline-flex items-center px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-brand-navy text-white font-semibold shadow-sm shadow-brand-navy/20'
                        : 'text-brand-charcoal hover:bg-brand-light hover:text-brand-navy',
                    ].join(' ')}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* Apply Now CTA — desktop */}
            {/* <a
              href="/#join-amfs"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-brand-gold px-4 py-2 text-xs font-bold text-brand-navy shadow-sm shadow-brand-gold/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-gold/25"
            >
              Apply Now
            </a> */}

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
          background:
            'linear-gradient(90deg, transparent, #F6DD24 30%, #F6DD24 70%, transparent)',
          opacity: scrolled ? 0.6 : 1,
        }}
      />

      {/* Mobile navigation drawer */}
      <div
        id="mobile-nav"
        aria-hidden={!mobileOpen}
        className={[
          'sm:hidden overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-[calc(100vh-4.5rem)] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0',
        ].join(' ')}
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: mobileOpen ? '1px solid #D7DEE8' : 'none',
        }}
      >
        <nav
          aria-label="Mobile navigation"
          className="px-4 py-4 flex flex-col gap-1 pb-6"
        >
          {navLinks.map(({ href, label, external }) => {
            // Hash links are scroll anchors — never mark as active.
            const isActive = !external && !href.includes('#') && isActiveFor(href, pathname)
            return (
              <Link
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-brand-navy text-white'
                    : 'text-brand-charcoal hover:bg-brand-light hover:text-brand-navy',
                ].join(' ')}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0"
                  />
                )}
                {label}
              </Link>
            )
          })}
          {/* Apply Now in mobile */}
          {/* <a
            href="/#join-amfs"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-4 py-3 text-sm font-bold text-brand-navy"
          >
            Apply Now
          </a> */}
        </nav>
      </div>
    </header>
  )
}
