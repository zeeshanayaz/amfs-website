import { Mail, Phone, MapPin } from 'lucide-react'

const currentYear = new Date().getFullYear()

const contactItems = [
  {
    icon: MapPin,
    label: 'Head Campus — Muslehuddin Campus',
    value: 'MR1/38, Suleman Street\nMithadar, Karachi',
    href: undefined,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(+92) 21 324 10539',
    href: 'tel:+922132410539',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'almusleh.foundation@gmail.com',
    href: 'mailto:almusleh.foundation@gmail.com',
  },
]

const socialLinks = [
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/company/amfsedu/',
    ariaLabel: 'Visit our LinkedIn page (opens in new tab)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.123 2.062 2.062 0 0 1 0 4.123zM3.555 9h3.558v11.452H3.555V9zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    url: 'https://x.com/amfs_edu',
    ariaLabel: 'Follow us on Twitter (opens in new tab)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 3.875H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/amfs.edu',
    ariaLabel: 'Visit our Facebook page (opens in new tab)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.02 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.265h3.328l-.532 3.49h-2.796v8.437C19.612 23.093 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/amfs_edu',
    ariaLabel: 'Follow us on Instagram (opens in new tab)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@amfs_edu',
    ariaLabel: 'Subscribe on YouTube (opens in new tab)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-brand-navy text-white">
      {/* Top gold accent line */}
      <div aria-hidden="true" className="h-1 bg-brand-gold" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">

          {/* Column 1: Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 bg-white rounded-xl p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo.svg"
                  alt="Al Musleh Foundation School logo"
                  width={160}
                  height={168}
                  className="object-contain h-14 w-auto"
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-merriweather)',
                    fontSize: '22px',
                    lineHeight: '1.4',
                    letterSpacing: '0.05em',
                  }}
                  className="font-bold text-white uppercase"
                >
                  Al Musleh
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-merriweather)',
                    lineHeight: '1.4',
                    letterSpacing: '0.05em',
                  }}
                  className="text-white/60 text-xs uppercase"
                >
                  Foundation School
                </p>
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Nurturing minds, building character, and inspiring excellence through education
              grounded in Islamic values and academic integrity.
            </p>

            {/* Social icons */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-3 font-medium">
                Follow Us
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-royal flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="font-serif font-semibold text-white text-base mb-5 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="w-5 h-0.5 bg-brand-gold rounded-full"
              />
              Contact Us
            </h3>
            <address className="not-italic flex flex-col gap-4">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-royal/30 flex items-center justify-center mt-0.5"
                    aria-hidden="true"
                  >
                    <Icon size={14} className="text-brand-sky" />
                  </div>
                  <div>
                    <p className="text-white/50 text-[10px] uppercase tracking-widest font-medium mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-white/80 hover:text-white text-sm leading-snug transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-white/80 text-sm leading-snug whitespace-pre-line">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </address>
          </div>

          {/* Column 3: Quick links */}
          <div>
            <h3 className="font-serif font-semibold text-white text-base mb-5 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="w-5 h-0.5 bg-brand-gold rounded-full"
              />
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Our Campuses', href: '/#campuses' },
                  { label: 'Our Values', href: '/about#core-values' },
                  { label: 'Apply for Admission', href: '/admissions' },
                  { label: 'News & Events', href: '/news-events' },
                  { label: 'Testimonials', href: '/testimonials' },
                  { label: 'Contact Us', href: '/contact' },
                  { label: 'Careers', href: '/careers' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="flex items-center gap-2.5 text-white/70 hover:text-white text-sm transition-colors duration-150"
                    >
                      <span
                        aria-hidden="true"
                        className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0"
                      />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/50 text-xs text-center sm:text-left">
              &copy; {currentYear} Al Musleh Foundation School. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              Karachi, Pakistan
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
