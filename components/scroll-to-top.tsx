'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={[
        'fixed bottom-6 right-6 z-50',
        'w-11 h-11 rounded-full',
        'bg-brand-navy border border-brand-royal/40',
        'flex items-center justify-center',
        'text-white shadow-lg',
        'hover:bg-brand-royal hover:border-brand-royal hover:shadow-brand-royal/30 hover:shadow-xl',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2',
        'transition-all duration-300',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none',
      ].join(' ')}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  )
}
