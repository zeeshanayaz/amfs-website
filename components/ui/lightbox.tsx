'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

type LightboxProps = {
  open: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
}

export function Lightbox({ open, title, onClose, children }: LightboxProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Preview'}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-brand-navy/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-7xl rounded-[32px] bg-background p-4 shadow-2xl shadow-brand-navy/30"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-sm transition hover:bg-brand-light"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-h-[85vh] overflow-hidden rounded-[28px] bg-brand-off-white p-2">
          {children}
        </div>
      </div>
    </div>
  )
}
